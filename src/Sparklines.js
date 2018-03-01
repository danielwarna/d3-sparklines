import * as d3 from "d3";
import Barchart from "./Barchart.js";
import Linechart  from "./Linechart.js";

class Sparklines {
	constructor(selector, data, config) {
		console.log("New sparkline");

		this.data = data; 	
		this.config = config;
		this._renderers = [];
		var elem = d3.select(selector);

		let svg = this.svg = elem.append("svg");

		this.config.height = this.height = 16;
		this.config.renderer = config.renderer || "bar";

		let chartRenderer = this.getRenderer(this.config.renderer);
		chartRenderer = new chartRenderer(this.svg.append('g'), this.data, this.config);

		this._renderers.push(chartRenderer);
		// this.loadChart();
		// 
		this.render();
	}

	loadChart() {
		if (this.config.type == "barchart") {
			this.chart = new Barchart(this.svg, this.data, this.config);
		}
	}

	getRenderer(renderer) {
		switch(renderer) {
			case "bar":
				return Barchart;
			case "line":
				return Linechart;
			case "number":
				break;
			case "scatter":
				break;
		}
	}

	render(){
		let offset = 0;
		this._renderers.forEach((r) => {
			r.render(offset);
			offset += r.getOffset();
		});
	}
}

export default Sparklines;
