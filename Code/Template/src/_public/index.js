import io from "socket.io-client";
import "./app.css";
import { configs } from "../_server/static/configs.js";
import { drawPcp } from "./newpcp.js";
import * as d3 from "d3";

let hostname = window.location.hostname;
let protocol = window.location.protocol;
const socketUrl = `${protocol}//${hostname}:${configs.port}`;

export const socket = io(socketUrl);

socket.on("connect", () => {
  console.log("Connected to " + socketUrl + ".");
});

socket.on("disconnect", () => {
  console.log("Disconnected from " + socketUrl + ".");
});

/**
 * Request data from the server based on parameters.
 * @param {*} parameters
 */
let requestData = (parameters) => {
  console.log(`Requesting data from webserver with parameters:`, parameters);
  socket.emit("getData", { parameters });
};

/**
 * Handle data received from the server.
 * @param {*} payload
 */
let handleData = (payload) => {
  console.log("Data received from server:", payload);
  data.pcp = payload.data;
  drawPcp(data.pcp);
};

socket.on("freshData", handleData);

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

    const parameters = { top_rank, category, mechanic };

    // Call the function to request data based on the selected parameters
    requestData(parameters);
  };
});

/**
 * Object that will store the loaded data.
 */
let data = {
  pcp: undefined,
};
