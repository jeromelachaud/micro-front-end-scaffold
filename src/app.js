var css = require('./app.css');
let _ = require('lodash');

const fetchUrl = 'http://gateway.marvel.com/v1/public/comics?apikey=fc67721c305c84f50f7c6646c9b8d9d0';

// 1. Fetch the data
fetch('http://gateway.marvel.com/v1/public/comics?apikey=fc67721c305c84f50f7c6646c9b8d9d0')
.then((response) => response.json());

// 2. Filter the data so that it only includes comics with less than 100 pages
// Vanilla
fetch('http://gateway.marvel.com/v1/public/comics?apikey=fc67721c305c84f50f7c6646c9b8d9d0')
.then((response) => response.json())
.then((response) => {
  let myArrayOfObj = response.data.results;
  myArrayOfObj.forEach((arrayItem) => {
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
  const myArrayOfComics = response.data.results;
  _.filter(myArrayOfComics, o => o.pageCount < 100);
});

