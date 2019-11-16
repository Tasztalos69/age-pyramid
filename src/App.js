import React from "react";
import "./App.css";
import axios from "axios";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { countries: [], years: [] };
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
	render() {
		return (
			<div className='App'>
				<h1>Age pyramid</h1>

				<ul>
					{this.state.years.map((country) => {
						return <li>{country.name}</li>;
					})}
				</ul>
				<footer>
					<p>
						Created by BMK. <br /> Licensed under MIT License.
					</p>
				</footer>
			</div>
		);
	}
}
