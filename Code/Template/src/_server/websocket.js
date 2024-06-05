//import * as csv from "csv-parser"
import { parse } from "csv-parse";
import * as fs from "fs"
import { print_clientConnected, print_clientDisconnected } from "./static/utils.js"
import { TSNE } from "./tsne.js";
// const preprocessing = require("./preprocessing.js")

import { filterTopRankedGames, selectGamesByCategory, selectGamesByMechanic, in_top_5_popular_categories, in_top_5_popular_mechanics } from "./preprocessing.js";
import { extractRelevantColumns,normalizeData, transformToKMeansInput,transformFromKMeansOutput} from "./preprocessing.js";
import { kMeans } from "./kmeans.js";
import { LDA } from "./druidExample.js";
import { get } from "http";

const file_path = "./data/"
const file_name = "boardgames_100.json"
const file_name_csv = "cleaned data ver 1.csv"



/**
 * Does some console.logs when a client connected.
 * Also sets up the listener, if the client disconnects.
 * @param {*} socket 
 */
export function setupConnection(socket) {
  print_clientConnected(socket.id)

  /**
   * Listener that is called, if client disconnects.
   */
  socket.on("disconnect", () => {
    print_clientDisconnected(socket.id)
  })

  socket.on("getDataByCategory", (obj) => {
    console.log(`Data request with properties ${JSON.stringify(obj)}...`)

    let parameters = obj.parameters

    let jsonArray = []

    // This is reading the .csv file line by line
    // So we can filter it line by line
    // This saves a lot of RAM and processing time
    fs.readFile(file_path + file_name, "utf8", (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      jsonArray = JSON.parse(data)

      let dataByCategory = selectGamesByCategory(jsonArray, parameters)

      socket.emit("DataByCategory", {
        timestamp: new Date().getTime(),
        data: dataByCategory,
        parameters: parameters,
      })
      console.log("Data by category:", dataByCategory);
    }
    )
  })






  socket.on("getData", (obj) => {
    console.log(`Data request with properties ${JSON.stringify(obj)}...`)




    let parameters = obj.parameters

    let jsonArray = []

    // This is reading the .csv file line by line
    // So we can filter it line by line
    // This saves a lot of RAM and processing time
    fs.readFile(file_path + file_name, "utf8", (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      jsonArray = JSON.parse(data)

      let filteredData = applyFilters(jsonArray, parameters);

      
      socket.emit("freshData", {
        timestamp: new Date().getTime(),
        data: filteredData,
        parameters: parameters,
      })
    })


  })

  




  socket.on("getLDA", (obj) => {
    console.log(`Data request with properties ${JSON.stringify(obj)}...`)

    let parameters = obj.parameters

    let jsonArray = []
    fs.readFile(file_path + file_name, "utf8", (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      jsonArray = JSON.parse(data)

      let dataFilter = applyFilters(jsonArray, parameters);
      // Add class in_top_10_cat
      in_top_5_popular_categories(dataFilter);
      in_top_5_popular_mechanics(dataFilter);

      // LDA
      let lda = LDA(dataFilter, parameters.setClass);

      socket.emit("freshLDA", {
        timestamp: new Date().getTime(),
        data: lda,
        parameters: parameters,
      })

    }
    )
  })

  socket.on("getRelevantData", (obj) => {
    let parameters = obj.parameters;
  
    let data = [];
    fs.createReadStream(file_path + file_name_csv)
      .pipe(parse({ delimiter: ',', columns: true }))
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', () => {
        let relevantData = filterTopRankedGames(data, parameters.top_rank);
         relevantData = extractRelevantColumns(relevantData, parameters.features);
        
        relevantData = normalizeData(relevantData);
        relevantData = transformToKMeansInput(relevantData);

        relevantData = kMeans(relevantData, parameters.k, parameters.importance,parameters.distanceFunction);
        // let tsneData = TSNE(relevantData);
        
        
        // console.log(relevantData);
        // console.log(tsneData);
        socket.emit("RelevantData", {
          timestamp: new Date().getTime(),
          data: relevantData,
          parameters: parameters,
        });
      });
  });

}

function applyFilters(data, filters) {
  let filteredData = data.slice(); // Copy the original data to avoid modifying it directly

  // Apply each filter function
  for (let filterName in filters) {
    if (filters.hasOwnProperty(filterName)) {
      const filterValue = filters[filterName];
      filteredData = applyFilter(filteredData, filterName, filterValue);
    }
  }

  return filteredData;
}

function applyFilter(data, filterName, filterValue) {
  switch (filterName) {
    case "category":
      return selectGamesByCategory(data, filterValue);
    case "top_rank":
      return filterTopRankedGames(data, filterValue);
    // Add more cases for additional filters as needed
    case "mechanic":
      return selectGamesByMechanic(data, filterValue);
    default:
      return data;
  }
}

