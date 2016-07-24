const css = require('./app.css');
const _ = require('lodash');

const fetchUrl = 'http://gateway.marvel.com/v1/public/comics?apikey=fc67721c305c84f50f7c6646c9b8d9d0';

// 1. Fetch the data
fetch(fetchUrl)
.then((response) => response.json());

// 2. Filter the data so that it only includes comics with less than 100 pages
// Vanilla
fetch(fetchUrl)
.then((response) => response.json())
.then((response) => {
  const arrayOfObjects = response.data.results;
  arrayOfObjects.filter((arrayItem) => arrayItem.pageCount < 100);
});

// 2. Filter the data so that it only includes comics with less than 100 pages
// lodash
fetch(fetchUrl)
.then((response) => response.json())
.then((response) => {
  const arrayOfObjects = response.data.results;
  _.filter(arrayOfObjects, o => o.pageCount < 100);
});

// 3. Filter the data so that it only includes comics that cost less than 4 dollars
// Vanilla
fetch(fetchUrl)
.then((response) => response.json())
.then((response) => {
  const arrayOfObjects = response.data.results;
  arrayOfObjects.map((arrayItem) => arrayItem.prices);
  arrayOfObjects.filter((arrayItem) => arrayItem.price < 4);
});

// 3. Filter the data so that it only includes comics that cost less than 4 dollars
// lodash
fetch(fetchUrl)
.then((response) => response.json())
.then((response) => {
  const arrayOfObjects = response.data.results;
  _.map(arrayOfObjects, 'prices[0].price')
  .filter((price) => price < 4);
});

// 4. Display the title and first image for each comic
// Vanilla
fetch(fetchUrl)
.then((response) => response.json())
.then((response) => {
  const arrayOfObjects = response.data.results;
  const comicsList = document.getElementById('comics');

  arrayOfObjects.map((arrayItem) => {
    const liNode = document.createElement('li');
    comicsList.appendChild(liNode);

    const comicTitle = arrayItem.title;
    const comicUrl = arrayItem.urls[0].url;
    const urlTag = document.createElement('a');
    urlTag.innerHTML = JSON.stringify(comicTitle);
    urlTag.setAttribute('href', comicUrl);
    liNode.appendChild(urlTag);

    const firstImage = arrayItem.images[0];
    const imgPath = firstImage.path;
    const imgExtension = firstImage.extension;
    const imgFullUrl = `${imgPath}.${imgExtension}`;
    const imgTag = document.createElement('img');
    imgTag.setAttribute('src', imgFullUrl);
    urlTag.appendChild(imgTag);
  });
});

// 6.1. Fetch the data using
// XMLHttpRequest and Promises
function getFetch(url) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', url);

    request.onload = () => {
      if (request.status == 200) {
        resolve(request.response);
      } else {
        reject(Error(request.StatusText));
      }
    };

    request.onerror = () => reject(Error('Network Error'));
    request.send();
  });
}
getFetch(fetchUrl);
