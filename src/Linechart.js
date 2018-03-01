import * as d3 from "d3";

class Linechart {
    constructor(svg, data, config) {
        console.log("New sparkline");
        let self = this;

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
            // .curve(d3.curveCatmullRom.alpha(0.5));

        svg.append("g").append("text").text(data[0]);


        svg.append("g").append("text").text(data[data.lenght -1]);
        
    }
    
    render() {
        this.svg.append("g").selectAll('path')
            .data(this.data)
            .enter().append("svg:path")
            // .attr("width","3px")
            // .attr("height", heightFunc)
            // .attr("x", function(d, i) { return i*4;})
            // .attr("y", function(d, i) { return 0+config.height-scale(d);})
            .attr("d", this.lineRender(this.data))
            .style("stroke", "red")
            .style("fill", "none");
        
        this.svg.data(this.data);
    }

    /**
     * Return bound box size;
     * @return {[type]} [description]
     */
    getOffset() {
        return 100;
        // return this.svg.selectAll("rect")[0].getBBox().width;
    }
}

export default Linechart;
