import * as d3 from "d3";
import BaseChart from "./Basechart";

class ScatterPlot extends BaseChart{
    constructor(element, data, config) {
        super(element, data, config);

        console.log("New sparkline");

        let height = config.height;
        this.scale =d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height * this.heightScale]);

        this.heightFunc = (h) => {
            return this.scale(h)+"px";
        };

        this.radius = 2*(1+(height/300)) + "px"
    }

    render(offset) {
        this.svg.selectAll('circle').data(this.data)
            .enter().append("circle")
                .attr("r", this.radius)
                // .attr("height", this.heightFunc)
                .attr("cx", (d, i) => { return i*8;})
                .attr("cy", (d) => { return 0+this.config.height-this.scale(d);})
                .style("fill", this.color);

        this.svg.data(this.data);

        this.svg.attr("transform", "translate(" + offset + "," + 0 + ")")
    }
}

export default ScatterPlot;
