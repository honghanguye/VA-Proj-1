import * as d3 from "d3"

export function draw_scatterplot(data) {

  data = data.map((d, i) => ({
    x: d[0],
    y: d[1],
    class_1 : d[2],
    class_2 : d[3],
    title: d[4]
  }))
 

  /**
   * Margins of the visualization.
   */
  const margin = {
    top: 50,
    bottom: 50,
    left: 80,
    right: 80,
  }

  
    const height = d3.select(".scatterplot_LDA").node().getBoundingClientRect().height;
    const width = height*3;




  /**
   * Selection of svg and groups to be drawn on.
   */
  
  /**
   * Scale function for the x-axis
   */
  const xScale = d3.scaleLinear()
  //rounds the domain values to 2 floating points
  .domain(d3.extent(data, d => d.x)).nice()
  .range([margin.left, width - margin.right]);

  const yScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.y)).nice()
  .range([height - margin.bottom, margin.top]);

  const color = d3.scaleOrdinal(data.map(d => d.class_1), d3.schemeCategory10);
  
  const symbols = [d3.symbolCircle, d3.symbolDiamond];
const shape = d3.scaleOrdinal(data.map(d => d.class_2), symbols.map(s => d3.symbol().type(s)()));

d3.select(".scatterplot_LDA").selectAll("*").remove();
const scatterplot = d3.select(".scatterplot_LDA")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

  //append the x-axis
  scatterplot.append("g")
  .attr("transform", `translate(0,${height - margin.bottom +10 })`)
  .call(d3.axisBottom(xScale))
  
  .append("text")
  .attr("fill", "black")
  .attr("x", width - margin.right)
  .attr("y", -6)
  .attr("text-anchor", "end")
  .text("Dimension 1");

  //append the y-axis
  scatterplot.append("g")
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft(yScale))
  
  
  .append("text")
  .attr("fill", "black")
  .attr("y", 6)
  .attr("dy", "0.71em")
  .attr("text-anchor", "end")

  .text("Dimension 2");

  const gameNameDiv = d3.select(".scatterplot_LDA").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("background-color", "lightblue")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "5px")
  .style("position", "absolute")
  .style("pointer-events", "none");

function handleMouseOver(event, d) {
  d3.select(this).attr("fill-opacity", 1).attr("stroke-opacity", 1);
  
  gameNameDiv.transition().duration(200).style("opacity", 1);
  gameNameDiv.html(`
      <strong>Title:</strong> ${d.title}<br>
     
      
  `)
  .style("left", (event.pageX + 10) + "px")
  .style("top", (event.pageY - 28) + "px");
}

function handleMouseOut(d) {
  d3.select(this).attr("fill-opacity", 0.6).attr("stroke-opacity", 0.6);
  gameNameDiv.transition().duration(500).style("opacity", 0);
}


  //append the points
  scatterplot.selectAll("path")
  .data(data)
  .join("path")
  .attr("transform", d => `translate(${xScale(d.x)},${yScale(d.y)})`)
  .attr("d", d => shape(d.class_2))
  .attr("fill", d => color(d.class_1))
  .attr("stroke", "black")
  .attr("stroke-width", 1)
  .attr("stroke-opacity", 0.6)
  .attr("fill-opacity", 0.6)
  .on("mouseover", handleMouseOver)
  .on("mouseout", handleMouseOut);


  // Create the legend group
const legend = scatterplot.append("g")
.attr("transform", `translate(${width - margin.right},${margin.top})`)
.selectAll("g")
.data(color.domain())
.join("g")
.attr("transform", (d, i) => `translate(0,${i * 20})`);

// Append the shapes with corresponding colors
legend.append("path")
.attr("d", (d, i) => shape(i))
.attr("fill", color)
.attr("transform", "translate(10, 10)"); 

// Append the text
legend.append("text")
.attr("fill", "black")
.attr("x", 20)
.attr("y", 15)
.text(d => d);



}

  
