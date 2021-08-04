import * as d3 from "d3";
import BaseChart from "./Basechart";

class Linechart extends BaseChart {
    constructor(element, data, config) {
        super(element, data, config);

        if (!this.config.dots) {
            this.config.dots="last"
        }

        let height = config.height;
        let scale =d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height*this.heightScale]);

        this.scale = scale;

        this.lineRender = d3.line(data)
            .x((i,j) => {
                return j*4;
            })
            .y((i) => {
                return 0 + config.height - scale(i);
            });
    }

    render(offset) {
        this.svg.selectAll('path')
            .data(this.data)
            .enter().append("svg:path")
            .attr("d", this.lineRender(this.data))
            .style("stroke", this.color)
            .style("fill", "none");

        if (this.config.dots == "all") {
            this.renderDots();
        }
        if (this.config.dots == "last") {
            this.renderLastDot();
        }

        this.svg.data(this.data);

        this.svg.attr("transform", "translate(" + offset + "," + 0 + ")")

    }

    renderDots() {
        this.svg.selectAll(".dot")
            .data(this.data)
            .enter().append("circle")
            .style("fill", this.accentcolor)
            .attr("r", 1)
            .attr("cx", (d, i) => {
                // return this.scale(i)
                return i * 4
            })
            .attr("cy", (d, i) => {
                return 0 + this.config.height - this.scale(d);
            })
    }

    renderLastDot() {

        this.svg.selectAll(".dot")
            .data([this.data[this.data.length - 1]])
            .enter().append("circle")
            // .style("stroke", this.config.accentcolor)
            .style("stroke", this.accentcolor)
            .style("fill", this.accentcolor)
            .attr("r", 1)
            .attr("cx", (d, i) => {
                // return this.scale(i)
                return (this.data.length-1) * 4
            })
            .attr("cy", (d, i) => {
                return 0 + this.config.height - this.scale(d);
            })
    }
}

export default Linechart;
