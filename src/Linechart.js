import * as d3 from "d3";

class Linechart {
    constructor(svg, data, config) {
        console.log("New sparkline");
        // let self = this;

        this.svg = svg;
        this.data = data;
        this.config = config;

        let height = config.height;
        let scale =d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height]);

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
            .style("stroke", "red")
            .style("fill", "none");
        
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
    }
}

export default Linechart;
