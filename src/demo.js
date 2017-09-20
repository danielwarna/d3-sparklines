import Sparklines from "./Sparklines.js";

const data = [
  5, 7, 10, 22, 23, 31,100
  ];

var spark = new Sparklines("#elm", data, {
  renderer:"bar",
});