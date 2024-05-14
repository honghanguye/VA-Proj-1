import {
  select,
  scaleLinear,
  scalePoint,
  scaleOrdinal,
  schemeCategory10,
  extent,
  line,
  brushY,
  axisBottom,
  hcl

} from 'd3';

import * as d3 from "d3"


export function drawPCP(data) {

  const margin = {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50,
  }
  let width = parseInt(svg.style("width"))
  let height = parseInt(svg.style("height"))

  /**
   * Setting the viewBox for automatic rescaling when the window is resized.
   */
  svg.attr("viewBox", `0 0 ${width} ${height}`)
  // const variables = ["Year", "Min Players", "Max Players", "Min Playtime", "Max Playtime", "Min Age", "Rating", "Number of Reviews"];

  const variables = ["Year", "Min Players", "Max Players", "Min Playtime", "Max Playtime", "Min Age"];

  const xScale = d3.scalePoint()
    .domain(variables)
    .range([margin.left, width - margin.right]);

  // const yScale ={}
  const yearScale = d3.scaleLinear()
    .domain([1876, 2021]) // Adjust as needed
    .range([margin.top, height - margin.bottom]);

  const minPlayersScale = d3.scaleLinear()
    .domain([1, 3]) // Adjust as needed
    .range([margin.top, height - margin.bottom]);

  const maxPlayersScale = d3.scaleLinear()
    .domain([2, 8]) // Adjust as needed
    .range([margin.top, height - margin.bottom]);

  const minPlaytimeScale = d3.scaleLinear()
    .domain([5, 240]) // Adjust as needed
    .range([margin.top, height - margin.bottom]);
  const maxPlayTimeScale = d3.scaleLinear()
    .domain([20, 1000]) // Adjust as needed
    .range([margin.top, height - margin.bottom]);

  const minAgeScale = d3.scaleLinear()
    .domain([8, 17]) // Adjust as needed
    .range([margin.top, height - margin.bottom]);

  const ratingScale = d3.scaleLinear()
    .domain([7.69, 8.67]) // Adjust as needed
    .range([margin.top, height - margin.bottom]);

  const numReviewsScale = d3.scaleLinear()
    .domain([5157, 96520]) // Adjust as needed
    .range([margin.top, height - margin.bottom]);



  function path(d) {
    return lineGenerator(variables.map(v => {
      switch (v) {
        case "Year":
          return [xScale(v), yearScale(d["year"])];
        case "Min Players":
          return [xScale(v), minPlayersScale(d["minplayers"])];
        case "Max Players":
          return [xScale(v), maxPlayersScale(d["maxplayers"])];
        case "Min Playtime":
          return [xScale(v), minPlaytimeScale(d["minplaytime"])];
        case "Max Playtime":
          return [xScale(v), maxPlayTimeScale(d["maxplaytime"])];
        case "Min Age":
          return [xScale(v), minAgeScale(d["minage"])];
        default:
          return null;
      }
    }));
  }
  svg.selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", "steelblue");

    d3.selection
  .append('g')
  .attr('transform', `translate(0,${height})`)
  .call(axisBottom(xScale));

  




}


