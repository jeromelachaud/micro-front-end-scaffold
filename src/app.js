var css = require('./app.css');
let _ = require('lodash');

const fetchUrl = 'http://gateway.marvel.com/v1/public/comics?apikey=fc67721c305c84f50f7c6646c9b8d9d0';

// 1. Fetch the data
fetch(fetchUrl)
.then((response) => response.json());

// 2. Filter the data so that it only includes comics with less than 100 pages
// Vanilla
fetch(fetchUrl)
.then((response) => response.json())
.then((response) => {
  const myArrayOfComicsObjects = response.data.results;
  myArrayOfComicsObjects.forEach((arrayItem) => {
    if (arrayItem.pageCount < 100) {
      arrayItem;
    }
  });
});

// 2. Filter the data so that it only includes comics with less than 100 pages
// lodash
fetch(fetchUrl)
.then((response) => response.json())
.then((response) => {
  const myArrayOfComicsObjects = response.data.results;
  _.filter(myArrayOfComicsObjects, o => o.pageCount < 100);
});

// 3. Filter the data so that it only includes comics that cost less than 4 dollars
// Vanilla
fetch(fetchUrl)
.then((response) => response.json())
.then((response) => {
  const myArrayOfComicsObjects = response.data.results;
  myArrayOfComicsObjects.forEach((arrayItem) => {
    const myArrayOfPricesObjects = arrayItem.prices;
    myArrayOfPricesObjects.forEach((arrayItem) => {
      if (arrayItem.price < 4) {
        arrayItem;
      }
    });
  });
});

// 3. Filter the data so that it only includes comics that cost less than 4 dollars
// lodash
fetch(fetchUrl)
.then((response) => response.json())
.then((response) => {
  const myArrayOfComicsObjects = response.data.results;
  _.map(myArrayOfComicsObjects, 'prices[0].price')
  .filter((price) => price < 4);
});
