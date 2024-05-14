import * as d3 from 'd3';

export function drawPCP(data) {
    const margin = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
    };
    let width = parseInt(svg.style("width"));
    let height = parseInt(svg.style("height"));


    svg.attr("viewBox", `0 0 ${width} ${height}`);
    const attributes = ["Year", "Min Players", "Max Players", "Min Playtime", "Max Playtime", "Min Age"];
    x = d3.scalePoint(attributes, [margin.left, width - margin.right]);

y ={
    "Year": d3.scaleLinear().domain([1995, 2021]).range([margin.top, height - margin.bottom]),
    "Min Players": d3.scaleLinear().domain([1, 3]).range([margin.top, height - margin.bottom]),
    "Max Players": d3.scaleLinear().domain([2, 8]).range([margin.top, height - margin.bottom]),
    "Min Playtime": d3.scaleLinear().domain([5, 240]).range([margin.top, height - margin.bottom]),
    "Max Playtime": d3.scaleLinear().domain([20, 1000]).range([margin.top, height - margin.bottom]),
    "Min Age": d3.scaleLinear().domain([5, 18]).range([margin.top, height - margin.bottom])
};



}

}