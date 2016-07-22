var css = require('./app.css');
let _ = require('lodash');

const fetchUrl = 'http://gateway.marvel.com/v1/public/comics?apikey=fc67721c305c84f50f7c6646c9b8d9d0';

// 1. Fetch the data
fetch('http://gateway.marvel.com/v1/public/comics?apikey=fc67721c305c84f50f7c6646c9b8d9d0')
.then((response) => response.json());

