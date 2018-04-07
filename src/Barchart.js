import * as d3 from "d3";

class Barchart {
    constructor(element, data, config) {
        console.log("New sparkline");
        let self = this;

        this.svg = element;
        this.data = data;
        this.config = config;

        let height = config.height;
        this.scale =d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height]);

        this.heightFunc = (h) => {
            return this.scale(h)+"px";
        };

        // element.append("g").append("text").text(data[0]);
        // element.append("g").append("text").text(data[data.length -1]);
    }

    render(offset) {
        this.svg.selectAll('rect').data(this.data)
            .enter().append("rect")
                .attr("width","3px")
                .attr("height", this.heightFunc)
                .attr("x", function(d, i) { return i*4;})
                .attr("y", (d, i) => { return 0+this.config.height-this.scale(d);})
                .style("fill", "red");

        this.svg.data(this.data);

        this.svg.attr("transform", "translate(" + offset + "," + 0 + ")")

    }

    /**
     * Return bound box size;
     * @return {[type]} [description]
     */
    getWidth() {
        var bBox = this.svg.node().getBoundingClientRect();
        return bBox.width;
        // return this.data.length * 4;
        // return this.svg.selectAll("rect")[0].getBBox().width;
    }
}

export default Barchart;
