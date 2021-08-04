class BaseChart {
    constructor(element, data, config) {
        this.svg = element;
        this.data = data;
        this.config = config;

        this.color = this.config.color || "#6ba8b4";
        this.accentcolor = this.config.accentcolor || "#4A7D69";
        this.heightScale = this.config.heightscale || 0.7;
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

export default BaseChart;
