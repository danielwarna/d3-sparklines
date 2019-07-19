/* eslint-disable */

import Sparklines from "./Sparklines.js";

const data = [
    5, 30, 25, 20, 50,75,80,100
];

var spark_bar = new Sparklines("#bar", data, {
    renderer:"bar",
    height:48
});

var spark_line = new Sparklines("#line", data, {
    renderer:"line",
    height:68
});

var spark_line = new Sparklines("#scatter", data, {
    renderer:"scatter",
    height:68
});

var spark_inline_bar = new Sparklines("#bar-inline", data, {
    renderer:"bar",
});

var spark_inline_line = new Sparklines("#line-inline", data, {
    renderer:"line",
});

var line_custom = new Sparklines("#line-customheight", data, {
    renderer:"line",
    height:28
});

var line_inline = new Sparklines("#inline-line", data, {
    renderer:"line"
});

var line_inline2 = new Sparklines("#inline-line2", data, {
    renderer:"line"
});