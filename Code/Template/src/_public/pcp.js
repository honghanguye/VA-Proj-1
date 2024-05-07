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
    hcl,
    line
  } from 'd3';
  
  import * as d3 from "d3"


  export function drawPCP(data) {
    const hueShift = (hueDelta) => (color) => {
        const newColor = hcl(color);
        newColor.h += hueDelta;
        return newColor.hex();
      };

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
  const variables = ["Year", "Min Players", "Max Players", "Min Playtime", "Max Playtime", "Min Age", "Rating", "Number of Reviews"];

const xScale = d3.scalePoint()
  .domain(variables)
  .range([margin.left, width - margin.right]);
  
    const yScale ={}
    const
}

