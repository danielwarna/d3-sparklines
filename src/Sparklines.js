import * as d3 from "d3";
import Barchart from "./Barchart.js";
import Linechart  from "./Linechart.js";
import NumberLabel from "./NumberLabel";
import ScatterPlot from "./Scatterplot";

class Sparklines {
    constructor(selector, data, config) {
        console.log("New sparkline");

        this.data = data;
        this.config = config;
        this._renderers = [];
        var elem = d3.select(selector);

        this.svg = elem.append("svg");
        this.svg.attr("width", "0px");
        this.svg.attr("height", "0px");

        if (!this.config.height) {
            let height = getComputedStyle(elem.node().parentNode).getPropertyValue("font-size");
            this.config.height = Number(height.slice(0, -2));
        }

        this.height = this.config.height;

        this.config.renderer = config.renderer || "bar";

        let chartRenderer = this.getRenderer(this.config.renderer);
        chartRenderer = new chartRenderer(this.svg.append('g'), this.data, this.config);

        this._renderers.push(chartRenderer);

        this.setNumberRenderers();

        this.render();
        this.optimizeSvgSize();
    }

    /**
     * Generate number renderers base don the config
     */
    setNumberRenderers() {
        if (this._renderers.length < 1) {return }

        let startNumberLabel = new NumberLabel(this.svg.append("g"), this.data[0], this.config);
        let endNumberLabel = new NumberLabel(this.svg.append("g"), this.data[this.data.length-1], this.config);

        this._renderers.unshift(startNumberLabel);
        this._renderers.push(endNumberLabel);
    }

    /**
     *
     * @param {string} Renderer type
     * @returns Renderer object
     */
    getRenderer(renderer) {
        switch(renderer) {
        case "bar":
            return Barchart;
        case "line":
            return Linechart;
        case "number":
            return NumberLabel;
        case "scatter":
            return ScatterPlot
        }
    }

    /**
     * Set svg elemt size to match content
     */
    optimizeSvgSize() {
        this.svg.attr("width", this.totalWidth + "px");
        this.svg.attr("height", (this.height+1) + "px");
        this.svg.attr("style", "transform:translate(0,1px)");

    }

    /**
     * Render all components in this chart
     */
    render(){
        let offset = 0;
        this._renderers.forEach((r) => {
            r.render(offset);
            offset += r.getWidth();
        });

        this.totalWidth = offset;
    }
}

export default Sparklines;
