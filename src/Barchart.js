import * as d3 from "d3";
import BaseChart from "./Basechart";

class Barchart extends BaseChart{
    constructor(element, data, config) {
        super(element, data, config);

        console.log("New sparkline");

        let height = config.height;
        this.scale =d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height]);

        this.heightFunc = (h) => {
            return this.scale(h)+"px";
        };
    }

    render(offset) {
        this.svg.selectAll('rect').data(this.data)
            .enter().append("rect")
                .attr("width","3px")
                .attr("height", this.heightFunc)
                .attr("x", (d, i) => { return i*4;})
                .attr("y", (d) => { return 0+this.config.height-this.scale(d);})
                .style("fill", this.color);

        this.svg.data(this.data);

        this.svg.attr("transform", "translate(" + offset + "," + 0 + ")")

    }
}

export default Barchart;
