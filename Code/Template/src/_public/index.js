import io from "socket.io-client";
import "./app.css";
import { configs } from "../_server/static/configs.js";
import { drawPcp } from "./newpcp.js";
import { draw_scatterplot } from "./scatterplot.js";
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


let requestLDA = (parameters) =>{
  console.log(`Requesting data with this parameters: `, parameters)
  socket.emit("getLDA",{parameters});
}

let handleLDA = (payload) =>{
  console.log("Data received from server:", payload);
ldaData.scatterplot = payload.data;
draw_scatterplot(ldaData.scatterplot);


};
socket.on("freshLDA", handleLDA);



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
    const categoryElement = document.getElementById("category");
    const category = categoryElement ? categoryElement.value : null;

    const topRankedElement = document.getElementById("top_rank");
    const top_rank = topRankedElement ? parseInt(topRankedElement.value) : Infinity;

    const mechanicElement = document.getElementById("mechanic");
    const mechanic = mechanicElement ? mechanicElement.value : null;

    const parameters = { top_rank, category, mechanic };

    requestData(parameters);
  };

  document.getElementById("load_data_button2").onclick = () => {
    const selectElement = document.getElementById("classes");
    const setClass = selectElement.value;

    const categoryElement = document.getElementById("category");
    const category = categoryElement ? categoryElement.value : null;

    const topRankedElement = document.getElementById("top_rank");
    const top_rank = topRankedElement ? parseInt(topRankedElement.value) : Infinity;

    const mechanicElement = document.getElementById("mechanic");
    const mechanic = mechanicElement ? mechanicElement.value : null;

    const parameters = { top_rank, category, mechanic, setClass };

    requestLDA(parameters);
  };
});
/**
 * Object that will store the loaded data.
 */
let ldaData ={
  scatterplot : undefined,
};
let data = {
  pcp: undefined,
};
