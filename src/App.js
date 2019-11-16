import React from "react";
import "./App.css";
import axios from "axios";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		let url =
				"https://cors-anywhere.herokuapp.com/https://data.un.org/ws/rest/data/DF_UNData_WPP/SP_POP_TOTL.A.Y_LT5.F._T.001.M?startPeriod=1995&endPeriod=1995",
			config = {
				headers: { Accept: "text/json" }
			};
		axios.get(url, config).then((res) => {
			console.log(res.data);
		});
		this.state = {};
	}
	render() {
		return (
			<div className='App'>
				<h1>Age pyramid</h1>
				<footer>
					<p>
						Created by BMK. <br /> Licensed under MIT License.
					</p>
				</footer>
			</div>
			// GPG test
		);
	}
}
