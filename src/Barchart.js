import * as d3 from "d3";

class Barchart {
    constructor(svg, data, config) {
        console.log("New sparkline");
        let self = this;

        let height = 16;
        let scale =d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height]);

        var heightFunc = function(h) {
            return scale(h)+"px";
        };

        svg.append("g").append("text").text(data[0]);

        svg.append("g").selectAll('rect').data(data)
            .enter().append("rect")
                .attr("width","3px")
                .attr("height", heightFunc)
                .attr("x", function(d, i) { return i*4;})
                .attr("y", function(d, i) { return 0+config.height-scale(d);})
                .style("fill", "red");

        svg.append("g").append("text").text(data[data.lenght -1]);
        
        svg.data(data);


    }
}

export default Barchart;
