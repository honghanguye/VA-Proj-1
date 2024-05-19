import * as druid from "@saehrimnir/druidjs";

export function LDA(data, useClasses) {
  data = data.map(game => ({
    ...game,
    rating: game.rating.rating,
    num_of_reviews: game.rating.num_of_reviews
  }));

  const numberData = data.map(game => [
    game.year, game.minplayers, game.maxplayers, game.minplaytime,
    game.maxplaytime, game.minage, game.rating, game.num_of_reviews
  ]);

  console.log("numberData", numberData);
  
  const classes = data.map(game => game.in_top_10_cat);
  const classes_2 = data.map(game => game.in_top_10_mech);
  const labels = useClasses ? classes : classes_2;
  console.log("classes", labels);

  const X = druid.Matrix.from(numberData); // X is the data as object of the Matrix class.

  //https://saehm.github.io/DruidJS/LDA.html
  const reductionLDA = new druid.LDA(X, { labels: labels, d: 2 }); // 2 dimensions, can use more.
  const result = reductionLDA.transform();
  console.log("result", result);


  if (!Array.isArray(result)) {
    throw new Error("LDA transform did not return an array");
  }

  // const resultData = result.map((d, i) => ({
  //   x: d[0],
  //   y: d[1],
  //   label: labels[i],
  //   class_1: classes[i],
  //   class_2: classes_2[i],
  // }));

  return result;
}
