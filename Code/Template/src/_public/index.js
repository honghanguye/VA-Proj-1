import io from "socket.io-client"
import "./app.css"
import {configs} from "../_server/static/configs.js"
import { drawPCP } from "./pcp.js"
import * as d3 from "d3"

let hostname = window.location.hostname
let protocol = window.location.protocol
const socketUrl = protocol + "//" + hostname + ":" + configs.port

export const socket = io(socketUrl)
socket.on("connect", () => {
  console.log("Connected to " + socketUrl + ".")
})
socket.on("disconnect", () => {
  console.log("Disconnected from " + socketUrl + ".")
})

/**
 * Callback, when the button is pressed to request the data from the server.
 * @param {*} parameters
 */
let requestData = (parameters) => {
  console.log(`requesting data from webserver (every 2sec)`)

  socket.emit("getData", {
    parameters,
  })
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("load_data_button").onclick = () => {
    // Get the selected category
    const categoryElement = document.getElementById("category");
    const category = categoryElement ? categoryElement.value : null;

    // Get the selected top_rank
    const topRankedElement = document.getElementById("top_rank");
    const top_rank = topRankedElement ? parseInt(topRankedElement.value) : Infinity;

    // Get the selected mechanic
    const mechanicElement = document.getElementById("mechanic");
    const mechanic = mechanicElement ? mechanicElement.value : null;

    const parameters = {
      top_rank, // Renamed variable
      category,
      mechanic
    };

    // Call the function to request data based on the selected category
    requestData(parameters);
  };
});


let requestDataByCategory = (parameters) => {
  console.log(`requesting data from webserver (every 2sec)`);

  socket.emit("getDataByCategory", {
    parameters,
  });
};

// 

// document.addEventListener("DOMContentLoaded", function() {
//   document.getElementById("minmax").onclick = () => {
//     getMinMax();
//   }
// });


// document.addEventListener("DOMContentLoaded", function() {
//   document.getElementById("load_data_button").onclick = () => {
//     // Get the selected category
//     const category = document.getElementById("category").value;
    
//     // Call the function to request data based on the selected category
//     requestDataByCategory(category);
//   }
// });



/**
 * Assigning the callback to request the data on click.
 */
// document.getElementById("load_data_button").onclick = () => {
//   let max_weight = document.getElementById("max_weight").value
//   if (!isNaN(max_weight)) {
//     max_weight = parseFloat(max_weight)
//   } else {
//     max_weight = Infinity
//   }
//   requestData({ max_weight })
// }

/**
 * Object, that will store the loaded data.
 */
let data = {
  pcp : undefined,
}

/**
 * Callback that is called, when the requested data was sent from the server and is received in the frontend (here).
 * @param {*} payload
 */
let handleData = (payload) => {
  console.log(`Fresh data from Webserver:`)
  console.log(payload)
  // Parse the data into the needed format for the d3 visualizations (if necessary)
  // Here, the barchart shows two bars
  // So the data is preprocessed accordingly

  

socket.on("freshData", handleData)
}
// let width = 0
// let height = 0

// /**
//  * This is an example for visualizations, that are not automatically scalled with the viewBox attribute.
//  *
//  * IMPORTANT:
//  * The called function to draw the data must not do any data preprocessing!
//  * To much computational load will result in stuttering and reduced responsiveness!
//  */
// let checkSize = setInterval(() => {
//   let container = d3.select(".visualizations")
//   let newWidth = parseInt(container.style("width"))
//   let newHeight = parseInt(container.style("height"))
//   if (newWidth !== width || newHeight !== height) {
//     width = newWidth
//     height = newHeight
//     if (data.scatterplot) draw_scatterplot(data.scatterplot)
//   }
// }, 100)
