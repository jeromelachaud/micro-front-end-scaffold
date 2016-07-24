const css = require('./app.css');
const _ = require('lodash');

const url = 'http://gateway.marvel.com/v1/public/comics?apikey=fc67721c305c84f50f7c6646c9b8d9d0';

// 1. Fetch the data
fetch(url)
.then((response) => response.json());

// 2. Filter the data so that it only includes comics with less than 100 pages
// Vanilla
fetch(url)
.then((response) => response.json())
.then((response) => {
  const results = response.data.results;
  results.filter((el) => el.pageCount < 100);
});

// 2. Filter the data so that it only includes comics with less than 100 pages
// lodash
fetch(url)
.then((response) => response.json())
.then((response) => {
  const results = response.data.results;
  _.filter(results, el => el.pageCount < 100);
});

// 3. Filter the data so that it only includes comics that cost less than 4 dollars
// Vanilla
fetch(url)
.then((response) => response.json())
.then((response) => {
  const results = response.data.results;
  results.map((el) => el.prices);
  results.filter((el) => el.price < 4);
});

// 3. Filter the data so that it only includes comics that cost less than 4 dollars
// lodash
fetch(url)
.then((response) => response.json())
.then((response) => {
  const results = response.data.results;
  _.map(results, 'prices[0].price')
  .filter((price) => price < 4);
});

// 4. Display the title and first image for each comic
// Vanilla
fetch(url)
.then((response) => response.json())
.then((response) => {
  const results = response.data.results;
  const comicsList = document.getElementById('comics');

  results.map((el) => {
    const liNode = document.createElement('li');
    comicsList.appendChild(liNode);

    const comicTitle = el.title;
    const comicUrl = el.urls[0].url;
    const urlTag = document.createElement('a');
    urlTag.innerHTML = JSON.stringify(comicTitle);
    urlTag.setAttribute('href', comicUrl);
    liNode.appendChild(urlTag);

    const firstImage = el.images[0];
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
function fetchUrl(url) {
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
fetchUrl(url);

// 6.2. Filter the data so that it only includes comics with less than 100 pages
// Vanilla
fetchUrl(url)
.then((response) => {
  response = JSON.parse(response);
  const results = response.data.results;
  results.filter(el => el.pageCount < 100);
})
.catch((err) => alert(err));

// 6.2. Filter the data so that it only includes comics with less than 100 pages
// lodash
fetchUrl(url)
.then((response) => {
  response = JSON.parse(response);
  const results = response.data.results;
  _.filter(results, el => el.pageCount < 100);
})
.catch((err) => alert(err));
