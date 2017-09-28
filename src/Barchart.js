import * as d3 from "d3";

class Barchart {
    constructor(svg, data, config) {
        console.log("New sparkline");
        let self = this;

        this.svg = svg;
        this.data = data;
        this.config = config;

        let height = 16;
        this.scale =d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height]);

        this.heightFunc = (h) => {
            return this.scale(h)+"px";
        };

        svg.append("g").append("text").text(data[0]);

        
        svg.append("g").append("text").text(data[data.lenght -1]);
        
    }

    render() {
        this.svg.selectAll('rect').data(this.data)
            .enter().append("rect")
                .attr("width","3px")
                .attr("height", this.heightFunc)
                .attr("x", function(d, i) { return i*4;})
                .attr("y", (d, i) => { return 0+this.config.height-this.scale(d);})
                .style("fill", "red");

        this.svg.data(this.data);
    }
}

export default Barchart;
