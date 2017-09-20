import * as d3 from "d3";

class Sparklines {
	constructor(selector, data, config) {
		console.log("New sparkline");
		var elem = d3.select(selector);

		let svg = elem.append("svg").append("g");

		let height = 16;
		let scale =d3.scaleLinear()
			.domain([0, d3.max(data)])
			.range([0, height]);

		var heightFunc = function(h) {
			return scale(h)+"px";
		};

		svg.selectAll('rect').data(data)
			.enter().append("rect")
				.attr("width","3px")
				.attr("height", heightFunc)
				.attr("x", function(d, i) { return i*4;})
				.attr("y", function(d, i) { return 0+height-scale(d);})
				.style("fill", "red");

		svg.data(data);

	}
}

export default Sparklines;
