import Sparklines from "./Sparklines.js";

const data = [
    5, 30, 25, 20, 50,75,80,100 
];

var spark = new Sparklines("#elm", data, {
    renderer:"bar",
});

var line = new Sparklines("#line", data, {
    renderer:"line"
});