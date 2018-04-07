import * as d3 from "d3";
import Barchart from "./Barchart.js";
import Linechart  from "./Linechart.js";
import NumberLabel from "./NumberLabel";

class Sparklines {
    constructor(selector, data, config) {
        console.log("New sparkline");

        this.data = data; 	
        this.config = config;
        this._renderers = [];
        var elem = d3.select(selector);

        let svg = this.svg = elem.append("svg");

        this.config.height = this.height = 16;
        this.config.renderer = config.renderer || "bar";

        let chartRenderer = this.getRenderer(this.config.renderer);
        chartRenderer = new chartRenderer(this.svg.append('g'), this.data, this.config);

        this._renderers.push(chartRenderer);
        // this.loadChart();

        this.setNumberRenderers();

        console.log(this._renderers);

        this.render();
    }

    setNumberRenderers() {
        if (this._renderers.length < 1) {return }
        
        let startNumberLabel = new NumberLabel(this.svg.append("g"), this.data[0], this.config);
        let endNumberLabel = new NumberLabel(this.svg.append("g"), this.data[this.data.length-1], this.config);

        this._renderers.unshift(startNumberLabel);
        this._renderers.push(endNumberLabel);
        
    }

    loadChart() {
        if (this.config.type == "barchart") {
            this.chart = new Barchart(this.svg, this.data, this.config);
        }
    }

    getRenderer(renderer) {
        switch(renderer) {
        case "bar":
            return Barchart;
        case "line":
            return Linechart;
        case "number":
            return NumberLabel;
        case "scatter":
            break;
        }
    }

    render(){
        let offset = 0;
        this._renderers.forEach((r, idx) => {
            r.render(offset);
            offset += r.getWidth();
        });
    }
}

export default Sparklines;
