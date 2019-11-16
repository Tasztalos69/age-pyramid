import React from "react";
import "./App.css";
import axios from "axios";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";

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
	initGraph(e) {
		e.preventDefault();
		console.log("Show graph");
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

		const geometry = new THREE.BoxGeometry(3, 3, 3);
		const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		camera.position.z = 5;

		const controls = new TrackballControls(camera, renderer.domElement);
		controls.rotateSpeed = 15.0;
		controls.zoomSpeed = 1.2;
		controls.panSpeed = 0.8;
		controls.keys = [65, 83, 68];
		controls.maxDistance = 10;
		controls.minDistance = 4;
		// controls.target.set(0, 0, 0);
		controls.addEventListener("change", () => {
			console.log("Changed");

			renderer.render(scene, camera);
		});

		const animate = () => {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
		};
		animate();
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
					<input type='submit' value='Submit' onClick={this.initGraph} />
				</form>
				<footer>
					<p>
						Created by BMK. <br /> Licensed under MIT License.
					</p>
				</footer>
			</div>
		);
	}
}
