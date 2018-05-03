/* eslint-disable */

import Sparklines from "./Sparklines.js";

const data = [
    5, 30, 25, 20, 50,75,80,100 
];

var spark = new Sparklines("#elm", data, {
    renderer:"bar",
    height:48
});

var line = new Sparklines("#line", data, {
    renderer:"line",
    height:48
});

var line = new Sparklines("#inline-line", data, {
    renderer:"line"
});

var line = new Sparklines("#inline-line2", data, {
    renderer:"line"
});