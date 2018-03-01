import * as d3 from "d3";

class Linechart {
    constructor(svg, data, config) {
        console.log("New sparkline");
        let self = this;

        let height = config.height;
        let scale =d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height]);

        let l = d3.line(data)
            .x((i,j) => {
                return j*4;
            })
            .y((i) => { 
                return 0 + config.height - scale(i);
            });
            // .curve(d3.curveCatmullRom.alpha(0.5));

        svg.append("g").append("text").text(data[0]);

        svg.append("g").selectAll('path')
            .data(data)
            .enter().append("svg:path")
                // .attr("width","3px")
                // .attr("height", heightFunc)
                // .attr("x", function(d, i) { return i*4;})
                // .attr("y", function(d, i) { return 0+config.height-scale(d);})
                .attr("d", l(data))
                .style("stroke", "red")
                .style("fill", "none")

        svg.append("g").append("text").text(data[data.lenght -1]);
        
        svg.data(data);


    }
}

export default Linechart;
