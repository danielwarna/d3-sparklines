import * as d3 from "d3";
import BaseChart from "./Basechart";

class NumberLabel extends BaseChart{
    constructor(element, data, config) {
        super(element, data, config);
        // console.log("New sparkline numberLabel");

        let height = this.height = this.config.height || 16;
        this.scale =d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height]);

        this.heightFunc = () => {
            return (height*0.9)+"px";
            // return (height*0.9)+"px";
        };
    }

    render(offset) {
        this.svg.selectAll('text').data([this.data])
        .enter().append("text")
        .attr("width","3px")
        .attr("x", (d, i) => { return i*4;})
        .attr("y", () => { return this.config.height;})
        .attr("font-size", this.heightFunc)
        .attr("font-family", "sans-serif")
        .text((d) => {return d} )
        .style("fill", this.color);

        this.svg.attr("transform", "translate(" + offset + "," + 0 +")")
    }
}

export default NumberLabel;
