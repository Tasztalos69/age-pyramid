import React from "react";
import axios from "axios";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ReactComponent as Loading } from "./loading.svg";
import { ReactComponent as Search } from "./search.svg";
import ReactTooltip from "react-tooltip";
import "./App.css";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			years: [{ name: "" }],
			countryInput: "",
			matchedCountries: [],
			selectedCountryId: null,
			selectedCountry: null,
			yearStart: "",
			yearEnd: "",
			modalDb: false,
			modalTech: false,
			modalAbout: false
		};
	}

	async componentDidMount() {
		var config = {
			headers: { Accept: "text/json" }
		};
		let initUrl =
			"https://cors-anywhere.herokuapp.com/https://data.un.org/ws/rest/data/DF_UNData_WPP/SP_POP_TOTL.A.Y_LT5.F._T..M";

		await axios
			.get(initUrl, config)
			.then((res) => {
				let cnt = res.data.structure.dimensions.series.filter((prop) => {
					return prop.id === "REF_AREA";
				})[0].values;
				let yrs = res.data.structure.dimensions.observation[0].values;
				this.setState({ countries: cnt, years: yrs });
			})
			.catch((err) => {
				console.error(err);
				document.querySelector("#loader-main").style.opacity = 0;
				document.querySelector("#error").style.display = "block";
				document.querySelector("#error").style.opacity = 1;
			});

		document.querySelector("#loader-main").style.opacity = 0;
		setTimeout(() => {
			document.querySelector("#loader-main").style.display = "none";
		}, 500);

		let height = document.querySelector("footer").offsetHeight + 5 + "px";
		let width = document.querySelector("footer").offsetWidth + "px";
		document.querySelector(".modalDb").style.bottom = height;
		document.querySelector(".modalTech").style.bottom = height;
		document.querySelector(".modalAbout").style.bottom = height;
		document.querySelector(".modalAbout").style.width = width;
	}

	searchCountry = (e) => {
		document.querySelector(".cnt-list").style.opacity = 1;
		this.setState({ countryInput: e.target.value });
		if (
			e.target.value === null ||
			e.target.value === "" ||
			e.target.value === undefined
		) {
			this.setState({ matchedCountries: [] });
		} else {
			const regex = new RegExp(`^${e.target.value}`, "gi");
			let matchedCountries = this.state.countries.filter((cnt) => {
				return cnt.name.match(regex);
			});
			this.setState({ matchedCountries: matchedCountries });
		}
	};

	handleYearChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};
	async initGraph(e) {
		e.preventDefault();
		if (
			this.state.selectedCountry === null ||
			this.state.yearStart === "" ||
			this.state.yearEnd === ""
		) {
			let inputNum = document.querySelectorAll(".input-number");
			inputNum[0].style.border = "2px solid #ff0000";
			inputNum[1].style.border = "2px solid #ff0000";
			if (this.state.selectedCountry === null)
				document.querySelector("#input-text").style.border =
					"2px solid #ff0000";
			setTimeout(() => {
				document.querySelector("#input-text").style.border =
					"2px solid transparent";
				inputNum[0].style.border = "2px solid transparent";
				inputNum[1].style.border = "2px solid transparent";
			}, 300);
		} else {
			let minYear = parseInt(this.state.years[0].name);
			let maxYear = parseInt(
				this.state.years[this.state.years.length - 1].name
			);
			if (
				parseInt(this.state.yearStart) < minYear ||
				parseInt(this.state.yearStart) > maxYear ||
				parseInt(this.state.yearEnd) < minYear ||
				parseInt(this.state.yearEnd) > maxYear ||
				parseInt(this.state.yearEnd) - parseInt(this.state.yearStart) > 75
			) {
				let inputNum = document.querySelectorAll(".input-number");
				document.querySelector(".years-minmax").style.color = "red";
				inputNum[0].style.border = "2px solid #ff0000";
				inputNum[1].style.border = "2px solid #ff0000";
				setTimeout(() => {
					inputNum[0].style.border = "2px solid transparent";
					inputNum[1].style.border = "2px solid transparent";
					document.querySelector(".years-minmax").style.color = "black";
				}, 800);
			} else {
				// Show loading indicator
				document.querySelector("#loader-form").style.opacity = 1;

				// Create main setup
				const scene = new THREE.Scene();
				const group = new THREE.Group();
				while (scene.children.length > 0) {
					scene.remove(scene.children[0]);
				}
				while (group.children.length > 0) {
					group.remove(group.children[0]);
				}
				scene.dispose();
				scene.background = new THREE.Color(0xffffff);
				const camera = new THREE.PerspectiveCamera(
					75,
					window.innerWidth / window.innerHeight,
					0.1,
					1000
				);
				const renderer = new THREE.WebGLRenderer({ antialias: true });
				renderer.setSize(window.innerWidth, window.innerHeight);
				document.body.appendChild(renderer.domElement);
				camera.position.z = 5;

				// Create center separator
				let lineZ =
					(parseInt(this.state.yearEnd) - parseInt(this.state.yearStart)) *
						0.05 +
					0.05;
				const centerLineGeometry = new THREE.BoxBufferGeometry(
					0.15,
					2.1,
					lineZ
				);
				const materialBlack = new THREE.MeshBasicMaterial({ color: 0x101010 });
				const materialWhite = new THREE.MeshBasicMaterial({ color: 0xffffff });
				const centerLine = new THREE.Mesh(centerLineGeometry, materialBlack);
				scene.add(centerLine);

				// Create bottom inforgaphic
				const bottomGeometry = new THREE.BoxBufferGeometry(6.15, 0.2, 0.05);
				const bottom = new THREE.Mesh(bottomGeometry, materialBlack);
				group.add(bottom);
				bottom.position.set(0, -1.15, 0);

				// Create bottom white separator
				const bottomLineGeometry = new THREE.BoxBufferGeometry(
					6.15,
					0.005,
					0.005
				);
				const bottomLine = new THREE.Mesh(bottomLineGeometry, materialWhite);
				group.add(bottomLine);
				bottomLine.position.set(0, -1.15, 0.025);

				//----------------------
				// Create pyramid
				//----------------------

				// request configuration
				let config = {
						headers: { Accept: "text/json" }
					},
					statsF = [],
					statsM = [];

				// Generate arrays
				for (let i = 0; i < 21; i++) {
					statsM[i] = [];
					statsF[i] = [];
				}

				// Year loop fn
				const loopYears = (sex, observations, placement) => {
					for (
						let i = 0;
						i <
						parseInt(this.state.yearEnd) - (parseInt(this.state.yearStart) - 1);
						i++
					) {
						let intake = observations[Object.keys(observations)[i]][0];
						if (sex === "M") {
							statsM[placement][i] = intake;
						} else {
							statsF[placement][i] = intake;
						}
					}
				};

				// Main url
				let mainUrl = `https://cors-anywhere.herokuapp.com/https://data.un.org/ws/rest/data/DF_UNData_WPP/SP_POP_TOTL.A.Y_LT5+Y5T10+Y10T14+Y15T19+Y20T24+Y25T29+Y30T34+Y35T39+Y40T44+Y45T49+Y50T54+Y55T59+Y60T64+Y65T69+Y70T74+Y75T79+Y80T84+Y85T89+Y90T94+Y95T99+Y_GE100.M._T.${this.state.selectedCountryId}.M?startPeriod=${this.state.yearStart}&endPeriod=${this.state.yearEnd}`;

				await axios
					.get(mainUrl, config)
					.then((res) => {
						let series = res.data.dataSets[0].series;
						for (let age = 0; age < 21; age++) {
							let observations = series[Object.keys(series)[age]].observations;
							if (age === 0) {
								loopYears("M", observations, 20);
							} else if (age === 1) {
								loopYears("M", observations, 0);
							} else if (age === 12) {
								loopYears("M", observations, 1);
							} else if (age <= 11) {
								loopYears("M", observations, age);
							} else {
								loopYears("M", observations, age - 1);
							}
						}
					})
					.catch((err) => {
						console.error(err);
						document.querySelector("#error").style.display = "block";
						document.querySelector("#error").style.opacity = 1;
					});

				mainUrl = `https://cors-anywhere.herokuapp.com/https://data.un.org/ws/rest/data/DF_UNData_WPP/SP_POP_TOTL.A.Y_LT5+Y5T10+Y10T14+Y15T19+Y20T24+Y25T29+Y30T34+Y35T39+Y40T44+Y45T49+Y50T54+Y55T59+Y60T64+Y65T69+Y70T74+Y75T79+Y80T84+Y85T89+Y90T94+Y95T99+Y_GE100.F._T.${this.state.selectedCountryId}.M?startPeriod=${this.state.yearStart}&endPeriod=${this.state.yearEnd}`;
				await axios
					.get(mainUrl, config)
					.then((res) => {
						let series = res.data.dataSets[0].series;
						for (let age = 0; age < 21; age++) {
							let observations = series[Object.keys(series)[age]].observations;
							if (age === 0) {
								loopYears("F", observations, 20);
							} else if (age === 1) {
								loopYears("F", observations, 0);
							} else if (age === 12) {
								loopYears("F", observations, 1);
							} else if (age <= 11) {
								loopYears("F", observations, age);
							} else {
								loopYears("F", observations, age - 1);
							}
						}
					})
					.catch((err) => {
						document.querySelector("#error").style.display = "block";
						document.querySelector("#error").style.opacity = 1;
						console.error(err);
					});

				// Get the longest value
				var maxRowM = statsM.map((row) => {
					return Math.max.apply(Math, row);
				});
				var maxM = Math.max.apply(null, maxRowM);
				var maxRowF = statsF.map((row) => {
					return Math.max.apply(Math, row);
				});
				var maxF = Math.max.apply(null, maxRowF);
				var max = Math.max(maxM, maxF);

				const texShort = new THREE.MeshBasicMaterial({
					map: new THREE.TextureLoader().load("texture_short.png")
				});
				const texLong = new THREE.MeshBasicMaterial({
					map: new THREE.TextureLoader().load("texture_long.png")
				});
				const texMed = new THREE.MeshBasicMaterial({
					map: new THREE.TextureLoader().load("texture_med.png")
				});
				const texMedLow = new THREE.MeshBasicMaterial({
					map: new THREE.TextureLoader().load("texture_med_low.png")
				});

				// Texture identifier fn
				const detTex = (width) => {
					let dashMat;
					if (width > 2) {
						dashMat = [texShort, texShort, texLong, texLong, texLong, texLong];
					} else if (width > 1) {
						dashMat = [texShort, texShort, texMed, texMed, texMed, texMed];
					} else if (width > 0.05) {
						dashMat = [
							texShort,
							texShort,
							texMedLow,
							texMedLow,
							texMedLow,
							texMedLow
						];
					} else {
						dashMat = [
							texShort,
							texShort,
							texShort,
							texShort,
							texShort,
							texShort
						];
					}
					return dashMat;
				};

				// Display Males
				for (let i = 0; i < statsM.length; i++) {
					for (let j = 0; j < statsM[i].length; j++) {
						if (statsM[i][j] > 0.01) {
							let width = (statsM[i][j] / max) * 3;
							let dashGeom = new THREE.BoxBufferGeometry(width, 0.1, 0.05);
							let dashMat = detTex(width);
							let dash = new THREE.Mesh(dashGeom, dashMat);
							group.add(dash);
							dash.position.set(
								width / -2 - 0.076,
								-1 + i * 0.1,
								0 + j * -0.05
							);
						}
					}
				}

				// Display Females
				for (let i = 0; i < statsF.length; i++) {
					for (let j = 0; j < statsF[i].length; j++) {
						if (statsF[i][j] > 0.01) {
							let width = (statsF[i][j] / max) * 3;
							let dashGeom = new THREE.BoxBufferGeometry(width, 0.1, 0.05);
							let dashMat = detTex(width);
							let dash = new THREE.Mesh(dashGeom, dashMat);
							group.add(dash);
							dash.position.set(width / 2 + 0.075, -1 + i * 0.1, 0 + j * -0.05);
						}
					}
				}

				// Display text-based information
				const fontLoader = new THREE.FontLoader();
				fontLoader.load("Comfortaa_Regular.json", (font) => {
					let textMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

					// Add age indicators
					for (let i = 0; i < 101; i += 10) {
						let text = new THREE.TextBufferGeometry(i.toString(), {
							font: font,
							size: 0.05,
							height: 0.01
						});
						text.center();
						let mesh = new THREE.Mesh(text, textMat);
						group.add(mesh);
						mesh.position.set(0, -1 + i * 0.02, 0.03);
					}
					// Draw male & female indicator
					let male = new THREE.TextBufferGeometry("Male", {
						font: font,
						size: 0.05,
						height: 0.01
					});
					let female = new THREE.TextBufferGeometry("Female", {
						font: font,
						size: 0.05,
						height: 0.01
					});
					male.center();
					female.center();
					let meshMale = new THREE.Mesh(male, textMat);
					let meshFemale = new THREE.Mesh(female, textMat);
					group.add(meshMale);
					group.add(meshFemale);
					meshMale.position.set(-1.5, -1.2, 0.03);
					meshFemale.position.set(1.5, -1.2, 0.03);

					// Draw population
					let maxMGeom = new THREE.TextBufferGeometry(maxM.toString(), {
						font: font,
						size: 0.05,
						height: 0.01
					});
					let maxFGeom = new THREE.TextBufferGeometry(maxF.toString(), {
						font: font,
						size: 0.05,
						height: 0.01
					});

					let halfMGeom = new THREE.TextBufferGeometry((maxM / 2).toString(), {
						font: font,
						size: 0.05,
						height: 0.01
					});
					halfMGeom.center();
					let halfFGeom = new THREE.TextBufferGeometry((maxF / 2).toString(), {
						font: font,
						size: 0.05,
						height: 0.01
					});
					halfFGeom.center();
					let zeroGeom = new THREE.TextBufferGeometry("0", {
						font: font,
						size: 0.05,
						height: 0.01
					});
					zeroGeom.center();
					let meshMaxM = new THREE.Mesh(maxMGeom, textMat);
					let meshMaxF = new THREE.Mesh(maxFGeom, textMat);
					let meshHalfM = new THREE.Mesh(halfMGeom, textMat);
					let meshHalfF = new THREE.Mesh(halfFGeom, textMat);
					let meshZero = new THREE.Mesh(zeroGeom, textMat);
					let meshZero2 = meshZero.clone();
					group.add(
						meshMaxM,
						meshMaxF,
						meshHalfM,
						meshHalfF,
						meshZero,
						meshZero2
					);
					meshMaxM.position.set(-3, -1.12, 0.03);
					meshMaxF.position.set(2.7, -1.12, 0.03);
					meshHalfM.position.set(-1.5, -1.1, 0.03);
					meshHalfF.position.set(1.5, -1.1, 0.03);
					meshZero.position.set(0.15, -1.1, 0.03);
					meshZero2.position.set(-0.15, -1.1, 0.03);
				});

				scene.add(group);
				var boundingBox = new THREE.Box3().setFromObject(group);
				group.position.set(0, 0, boundingBox.getSize().z / 2 - 0.025);

				// Add Orbit controller
				const controls = new OrbitControls(camera, renderer.domElement);
				controls.rotateSpeed = 0.5;
				controls.zoomSpeed = 1.2;
				controls.panSpeed = 0.8;
				controls.maxDistance = 10;
				controls.minDistance = 4;
				controls.enableDamping = true;

				// Render the scene
				const animate = () => {
					requestAnimationFrame(animate);
					controls.update();
					renderer.render(scene, camera);
				};
				animate();
				console.log(renderer.info);

				// Handle resizing
				window.addEventListener(
					"resize",
					() => {
						camera.aspect = window.innerWidth / window.innerHeight;
						camera.updateProjectionMatrix();
						renderer.setSize(window.innerWidth, window.innerHeight);
					},
					false
				);
				document.querySelector("#reset").addEventListener("click", () => {
					controls.reset();
				});
				setTimeout(() => {
					document.querySelector("form").style.opacity = 0;
					setTimeout(() => {
						document.querySelector("form").style.display = "none";
					}, 500);
				}, 500);
			}
		}
	}
	render() {
		return (
			<div className='App'>
				<ReactTooltip effect='solid' place='right' type='dark' />
				<div id='error'>
					<p>An error ocurred.</p>
					<button
						onClick={() => {
							window.location.reload();
						}}
					>
						Reload
					</button>
				</div>
				<div id='loader-main'>
					<Loading id='loader-gif' />
				</div>
				<h1>Age pyramid visualizer</h1>
				<form>
					<div className='form-wrapper'>
						<p>1. Select Country</p>
						<div className='cnt-input-wrapper'>
							<Search id='search' />
							<input
								id='input-text'
								type='text'
								name='country'
								value={this.state.countryInput}
								onChange={this.searchCountry}
								autoFocus
								autoComplete='off'
								required
							/>
							<ul
								className='cnt-list'
								style={{
									opacity: this.state.matchedCountries.length !== 0 ? 1 : 0
								}}
							>
								{this.state.matchedCountries.map((cnt) => {
									return (
										<li
											className={`cnt-list__li ${
												this.state.selectedCountry === cnt.name
													? "cnt-list__li-active"
													: ""
											}`}
											key={cnt.id}
											onClick={() => {
												this.setState({
													selectedCountryId: cnt.id,
													selectedCountry: cnt.name,
													countryInput: cnt.name,
													matchedCountries: []
												});
												document.querySelector(".cnt-list").style.opacity = 0;
											}}
										>
											{cnt.name}
										</li>
									);
								})}
							</ul>
							<i
								className='fas fa-info-circle'
								data-tip='Type in the country or region whose pyramids you want to display.'
							></i>
						</div>
						<p
							style={{ opacity: this.state.selectedCountryId !== null ? 1 : 0 }}
						>
							2. Specify start and end years
						</p>
						<div
							className='years-wrapper'
							style={{ opacity: this.state.selectedCountryId !== null ? 1 : 0 }}
						>
							<input
								type='number'
								name='yearStart'
								value={this.state.yearStart}
								onChange={this.handleYearChange}
								autoComplete='off'
								required
								className='input-number'
							/>
							<p>-</p>
							<input
								type='number'
								name='yearEnd'
								value={this.state.yearEnd}
								onChange={this.handleYearChange}
								autoComplete='off'
								required
								className='input-number'
							/>
							<p className='years-minmax'>
								Available years: {this.state.years[0].name} -{" "}
								{this.state.years[this.state.years.length - 1].name} | Max
								timespan: 75 years
							</p>
							<i
								className='fas fa-info-circle'
								data-tip='Type in the start and the end date of the pyramids.'
							></i>
						</div>
						<button
							onClick={this.initGraph.bind(this)}
							style={{
								opacity:
									this.state.yearStart !== "" && this.state.yearEnd !== ""
										? 1
										: 0
							}}
						>
							Submit
						</button>
						<Loading id='loader-form' />
					</div>
				</form>
				<div
					id='back'
					onClick={() => {
						window.location.reload();
					}}
				>
					<i className='fas fa-chevron-left'></i>
					<p>Modify query</p>
				</div>
				<footer>
					<p>
						Current Country: <b>{this.state.selectedCountry}</b>
						<br />
						Current Years:{" "}
						<b>
							{this.state.yearStart} - {this.state.yearEnd}
						</b>
						<br />
						<span id='reset'>
							<b>Reset view</b>
						</span>
					</p>
					<hr />
					<p>
						Created by{" "}
						<a
							href='https://github.com/Tasztalos69'
							style={{
								color: "black"
							}}
						>
							BMK.
						</a>{" "}
						<br /> Licensed under <b>MIT</b> License. <br />{" "}
						<u
							onClick={() => {
								this.setState({
									modalDb: !this.state.modalDb,
									modalTech: false,
									modalAbout: false
								});
							}}
						>
							Database
						</u>
						|
						<u
							onClick={() => {
								this.setState({
									modalTech: !this.state.modalTech,
									modalDb: false,
									modalAbout: false
								});
							}}
						>
							Technology
						</u>
						|
						<u
							onClick={() => {
								this.setState({
									modalAbout: !this.state.modalAbout,
									modalDb: false,
									modalTech: false
								});
							}}
						>
							About
						</u>
					</p>
				</footer>
				<div
					className='modals modalDb'
					style={{ opacity: this.state.modalDb ? 1 : 0 }}
				>
					<p>
						Database used:{" "}
						<a href={"https://data.un.org"}>https://data.un.org</a>
					</p>
				</div>
				<div
					className='modals modalTech'
					style={{ opacity: this.state.modalTech ? 1 : 0 }}
				>
					<h3>Technology used:</h3>
					<ul>
						<li>
							Framework:{" "}
							<a
								target='_blank'
								rel='noopener noreferrer'
								href='https://reactjs.org'
							>
								React
							</a>
						</li>

						<li>
							Renderer:{" "}
							<a
								target='_blank'
								rel='noopener noreferrer'
								href='https://threejs.org'
							>
								Three js
							</a>
						</li>
						<li>
							Requests:{" "}
							<a
								target='_blank'
								rel='noopener noreferrer'
								href='https://github.com/axios/axios'
							>
								Axios
							</a>
						</li>
					</ul>
				</div>
				<div
					className='modals modalAbout'
					style={{ opacity: this.state.modalAbout ? 1 : 0 }}
				>
					<p>
						Age pyramid visualizer is a tool, which draws the age pyramids of a
						country (or regions) in a specific time range, one after another.
						It's aim is to help the students and teachers understand the changes
						of a country's population.
					</p>
				</div>
			</div>
		);
	}
}
