/**
 * Helper function to preprocess the data
 */

/**
 * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
 *
 * !!!!! Here an below, you can/should edit the code  !!!!!
 * - you can modify the data preprocessing functions
 * - you can add other data preprocessing functions for other functionalities
 *
 * # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
 */
/**
 * Returns boolean value, whether given row meets parameter conditions
 * @param {*} parameters
 * @param {*} row
 * @returns boolean
 */
export function is_below_max_weight(parameters, row) {
  return row.weight < parameters.max_weight
}
/**
 * Calculates the bmi for a specific person
 * @param {age, height, name, weight} person
 * @returns {age, bmi, height, name, weight}
 */
export function calc_bmi(person) {
  person.bmi = person.weight / ((person.height / 100) * (person.height / 100))
  return person
}
/**
 * Converts all attribute values to float, than can be converted
 * @param {*} obj
 * @returns {*}
 */
export function parse_numbers(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (!isNaN(obj[key])) {
        obj[key] = parseFloat(obj[key])
      }
    }
  }
  return obj
}
/**
 * Test add function to demonstrate testing with jest in file preprocessing.test.js
 *
 * Adds the input numbers
 * @param {number} a 
 * @param {number} b
 * @returns number
 */
export function test_func_add(a, b) {
  return a + b
}


/**
 * Filters out the top X ranked games from the provided array of games.
 * @param {Array} games - The array of game objects.
 * @param {number} x - The number of top ranked games to filter.
 * @returns {Array} - An array containing the top X ranked games.
 */
export function filterTopRankedGames(games, x) {
  // Sort the games based on their ranks in ascending order
  const sortedGames = games.sort((a, b) => a.rank - b.rank);
  
  // Return the top X ranked games
  return sortedGames.slice(0, x);
}

/**
 * Selects games within a certain category from the provided array of games.
 * @param {Array} games - The array of game objects.
 * @param {string} category - The category to filter by.
 * @returns {Array} - An array containing games within the specified category.
 */
export function selectGamesByCategory(games, category) {
  if (category === 'all') {
    return games;
  } else {
   
    return games.filter(game => {
      
      return game.types.categories.some(cat => cat.name === category);
    });
  }
}


export function selectGamesByMechanic(games, mechanic) {
  if(mechanic === 'all') return games;
  else{
    return games.filter(game => {
    
      return game.types.mechanics.some(mech => mech.name === mechanic);
    });
  }
  
}

export function in_top_5_popular_categories(games) {
  const top_5_categories = [
    'Economic', 'Fantasy', 'Science Fiction', 'Adventure', 'Fighting'
  ];

  games.forEach(game => {
    game.in_top_5_cat = game.types.categories.some(cat => top_5_categories.includes(cat.name));
  });
}

export function in_top_5_popular_mechanics(games){
  let top_5_mechanics = [
    'Hand Management',
    'Solo / Solitaire Game',
    'Variable Player Powers',
    'Variable Set-up',
    'Worker Placement',
    
];
  games.forEach(game => {
    game.in_top_5_mech = game.types.mechanics.some(mech => top_5_mechanics.includes(mech.name));
  });
}

export function removeColumnsWithMissingValues(data){
  // if a column has under 990 non null values, remove it
  const threshold = 990;
  let columns = data.columns;
  let rows = data.rows;
  let columnsToRemove = [];
  columns.forEach(column => {
    let nonNullValues = rows.filter(row => row[column] !== null).length;
    if(nonNullValues < threshold){
      columnsToRemove.push(column);
    }
  })
  columnsToRemove.forEach(column => {
    delete data[column];
  })
  return data;
}

export function removeRowsWithMissingValues(data){
  let rows = data.rows;
  let columns = data.columns;
  let rowsToRemove = [];
  rows.forEach(row => {
    let missingValues = columns.filter(column => row[column] === null).length;
    if(missingValues > 0){
      rowsToRemove.push(row);
    }
  })
}
export function mergeTwoDatasets(data1,data2){
  //merge on left join, key is game_id from data1 and id from data2
  let mergedData = data1.map(row => {
    let row2 = data2.find(row2 => row2.bgg_id === row.ID);
    return {...row, ...row2};
  })
}
 





