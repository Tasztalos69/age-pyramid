import React from "react";
import "./App.css";
import axios from "axios";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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
			yearEnd: ""
		};
	}

	componentDidMount() {
		var config = {
			headers: { Accept: "text/json" }
		};
		let cntUrl =
				"https://cors-anywhere.herokuapp.com/https://data.un.org/ws/rest/data/DF_UNData_WPP/SP_POP_TOTL.A.Y_LT5.F._T..M?startPeriod=1995&endPeriod=1995",
			yrsUrl =
				"https://cors-anywhere.herokuapp.com/https://data.un.org/ws/rest/data/DF_UNData_WPP/SP_POP_TOTL.A.Y_LT5.F._T.001.M";

		axios.get(cntUrl, config).then((res) => {
			let cnt = res.data.structure.dimensions.series.filter((prop) => {
				return prop.id === "REF_AREA";
			})[0].values;
			this.setState({ countries: cnt });
			console.log("Got countries");
		});

		axios.get(yrsUrl, config).then((res) => {
			let yrs = res.data.structure.dimensions.observation[0].values;
			this.setState({ years: yrs });
		});
	}

	searchCountry = (e) => {
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

		// Create main setup
		const scene = new THREE.Scene();
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
		const centerLineGeometry = new THREE.BoxGeometry(0.03, 3, 5);
		const materialBlack = new THREE.MeshBasicMaterial({ color: 0x101010 });
		const centerLine = new THREE.Mesh(centerLineGeometry, materialBlack);
		scene.add(centerLine);

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
				i < parseInt(this.state.yearEnd) - (parseInt(this.state.yearStart) - 1);
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
		let mainUrl = `https://cors-anywhere.herokuapp.com/https://data.un.org/ws/rest/data/DF_UNData_WPP/SP_POP_TOTL.A.Y_LT5+Y5T10+Y10T14+Y15T19+Y20T24+Y25T29+Y30T34+Y35T39+Y40T44+Y45T49+Y50T54+Y55T59+Y60T64+Y65T69+Y70T74+Y75T79+Y80T84+Y85T89+Y90T94+Y95T99+Y_GE100.M._T.001.M?startPeriod=${this.state.yearStart}&endPeriod=${this.state.yearEnd}`;

		await axios.get(mainUrl, config).then((res) => {
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
		});

		mainUrl = `https://cors-anywhere.herokuapp.com/https://data.un.org/ws/rest/data/DF_UNData_WPP/SP_POP_TOTL.A.Y_LT5+Y5T10+Y10T14+Y15T19+Y20T24+Y25T29+Y30T34+Y35T39+Y40T44+Y45T49+Y50T54+Y55T59+Y60T64+Y65T69+Y70T74+Y75T79+Y80T84+Y85T89+Y90T94+Y95T99+Y_GE100.F._T.001.M?startPeriod=${this.state.yearStart}&endPeriod=${this.state.yearEnd}`;
		await axios.get(mainUrl, config).then((res) => {
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
		});

		// Get the longest value
		var maxRowM = statsM.map((row) => {
			return Math.max.apply(Math, row);
		});
		var maxM = Math.max.apply(null, maxRowM);
		var maxRowF = statsM.map((row) => {
			return Math.max.apply(Math, row);
		});
		var maxF = Math.max.apply(null, maxRowF);
		var max = Math.max(maxM, maxF);

		for (let i = 0; i < statsM.length; i++) {
			console.group(`StatsM ${i}`);
			for (let j = 0; j < statsM[i].length; j++) {
				console.log(statsM[i][j]);
			}
			console.groupEnd();
		}

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
	}
	render() {
		return (
			<div className='App'>
				<h1>Age pyramid</h1>

				<form>
					<p>Country</p>
					<input
						type='text'
						name='country'
						value={this.state.countryInput}
						onChange={this.searchCountry}
						autoFocus
						autoComplete='off'
						required
					/>
					<ul className='cnt-list'>
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
											selectedCountry: cnt.name
										});
									}}
								>
									{cnt.name}
								</li>
							);
						})}
					</ul>
					<p>Year</p>
					<input
						type='number'
						name='yearStart'
						value={this.state.yearStart}
						onChange={this.handleYearChange}
						autoComplete='off'
						required
					/>
					<p>-</p>
					<input
						type='number'
						name='yearEnd'
						value={this.state.yearEnd}
						onChange={this.handleYearChange}
						autoComplete='off'
						required
					/>
					<p>
						min: {this.state.years[0].name} - max:{" "}
						{this.state.years[this.state.years.length - 1].name}
					</p>
					<input
						type='submit'
						value='Submit'
						onClick={this.initGraph.bind(this)}
					/>
				</form>
				<footer>
					<p>
						Current Country: <b>{this.state.selectedCountry}</b>
						<br />
						Current Years:{" "}
						<b>
							{this.state.yearStart} - {this.state.yearEnd}
						</b>
						<br />
						<span
							onClick={() => {
								console.log("reset");
							}}
						>
							<b>Reset view</b>
						</span>
					</p>
					<hr />
					<p>
						Created by BMK. <br /> Licensed under <b>MIT</b> License.
					</p>
				</footer>
			</div>
		);
	}
}
