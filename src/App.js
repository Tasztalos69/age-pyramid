import React from "react";
import "./App.css";
import axios from "axios";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			countries: [],
			years: [],
			countryInput: "",
			matchedCountries: [],
			selectedCountry: null
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
		if (e.target.value === null || e.target.value === "" || e.target.value === undefined) {
			this.setState({ matchedCountries: [] });
		} else {
			const regex = new RegExp(`^${e.target.value}`, "gi");
			let matchedCountries = this.state.countries.filter((cnt) => {
				return cnt.name.match(regex);
			});
			this.setState({ matchedCountries: matchedCountries });
		}
	};
	render() {
		return (
			<div className='App'>
				<h1>Age pyramid</h1>

				<form>
					<input
						type='text'
						name='country'
						value={this.state.countryInput}
						onChange={this.searchCountry}
						autoFocus
						autoComplete='off'
						required
					/>
					<ul>
						{this.state.matchedCountries.map((cnt) => {
							return (
								<li
									key={cnt.id}
									onClick={() => {
										this.setState({ selectedCountry: cnt.id });
									}}
								>
									{cnt.name}
								</li>
							);
						})}
					</ul>
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
