import * as d3 from "d3";

class NumberLabel {
    constructor(element, data, config) {
        console.log("New sparkline numberLabel");

        this.svg = element;
        this.data = data;
        this.config = config;

        let height = 16;
        this.scale =d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height]);

        this.heightFunc = (h) => {
            return this.scale(h)+"px";
        };
    }

    render(offset) {
        this.svg.selectAll('text').data([this.data])
        .enter().append("text")
        .attr("width","3px")
        .attr("height", this.heightFunc)
        .attr("x", function(d, i) { return i*4;})
        .attr("y", (d, i) => { return this.config.height;})
        .text((d) => {return d} )
        .style("fill", "red");
        
        this.svg.attr("transform", "translate(" + offset + "," + 0 + ")")
    }

    /**
     * Return bound box size;
     * @return {[type]} [description]
     */
    getWidth() {
        var bBox = this.svg.node().getBoundingClientRect();
        return bBox.width;
    }
}

export default NumberLabel;
