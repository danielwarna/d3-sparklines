import * as d3 from "d3";
import Barchart from "./Barchart.js";

class Sparklines {
	constructor(selector, data, config) {
		console.log("New sparkline");

		this.data = data;
		this.config = config;
		this.chart = null;
		var elem = d3.select(selector);

		let svg = this.svg = elem.append("svg");

		this.config.height = this.height = 16;


		this.loadChart();
	}

	loadChart() {
		if (this.config.type = "barchart") {
			this.chart = new Barchart(this.svg, this.data, this.config);
		}

	}
}

export default Sparklines;
