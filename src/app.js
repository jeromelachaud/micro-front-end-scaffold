const css = require('./app.css');
const _ = require('lodash');

const url = 'http://gateway.marvel.com/v1/public/comics?apikey=fc67721c305c84f50f7c6646c9b8d9d0';

// Fetch data with fetch API, filter results with vanilla
fetch(url)
.then((response) => response.json())
.then((response) => {
  const results = response.data.results;
  const filteredResults = results
  .filter((el) => el.pageCount < 100)
  .filter((el) => el.prices[0].price < 4);

  const comicsList = document.getElementById('comics');
  const docfrag = document.createDocumentFragment();

  filteredResults.map((el) => {
    const liNode = document.createElement('li');

    const comicTitle = el.title;
    const comicUrl = el.urls[0].url;
    const urlTag = document.createElement('a');
    urlTag.innerHTML = comicTitle;
    urlTag.setAttribute('href', comicUrl);
    liNode.appendChild(urlTag);

    const firstImage = el.images[0];
    const imgPath = firstImage.path;
    const imgExtension = firstImage.extension;
    const imgFullUrl = `${imgPath}.${imgExtension}`;
    const imgTag = document.createElement('img');
    imgTag.setAttribute('src', imgFullUrl);
    urlTag.appendChild(imgTag);
    docfrag.appendChild(liNode);
  });

  comicsList.appendChild(docfrag);
});

// Fetch data with fetch API, filter results with lodash
fetch(url)
.then((response) => response.json())
.then((response) => {
  const results = response.data.results;
  const filteredResults = _(results)
  .filter(el => el.pageCount < 100)
  .filter(el => el.prices[0].price < 4)
  .value();

  const comicsList = document.getElementById('comics');
  const docfrag = document.createDocumentFragment();

  filteredResults.map((el) => {
    const liNode = document.createElement('li');
    const comicUrl = el.urls[0].url;
    const comicTitle = el.title;
    const firstImage = el.images[0];
    const imgPath = firstImage.path;
    const imgExtension = firstImage.extension;
    const imgFullUrl = `${imgPath}.${imgExtension}`;

    const template = _.template('<a href=<%= url %>><%= title %><img src=<%= img %>></a>');
    const liNodeContent = template({
      url: comicUrl,
      title: comicTitle,
      img: imgFullUrl
    });

    liNode.innerHTML = liNodeContent;
    docfrag.appendChild(liNode);
  });

  comicsList.appendChild(docfrag);
});

// Fetch data with XMLHttpRequest and Promises
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

// Filter results with vanilla
fetchUrl(url)
.then((response) => {
  response = JSON.parse(response);
  const results = response.data.results;
  const filteredResults = results
  .filter((el) => el.pageCount < 100)
  .filter((el) => el.prices[0].price < 4);

  const comicsList = document.getElementById('comics');
  const docfrag = document.createDocumentFragment();

  filteredResults.map((el) => {
    const liNode = document.createElement('li');

    const comicTitle = el.title;
    const comicUrl = el.urls[0].url;
    const urlTag = document.createElement('a');
    urlTag.innerHTML = comicTitle;
    urlTag.setAttribute('href', comicUrl);
    liNode.appendChild(urlTag);

    const firstImage = el.images[0];
    const imgPath = firstImage.path;
    const imgExtension = firstImage.extension;
    const imgFullUrl = `${imgPath}.${imgExtension}`;
    const imgTag = document.createElement('img');
    imgTag.setAttribute('src', imgFullUrl);
    urlTag.appendChild(imgTag);
    docfrag.appendChild(liNode);
  });

  comicsList.appendChild(docfrag);
});

// Filter results with lodash
fetchUrl(url)
.then((response) => {
  response = JSON.parse(response);
  const results = response.data.results;
  const filteredResults = _(results)
  .filter(el => el.pageCount < 100)
  .filter(el => el.prices[0].price < 4)
  .value();

  const comicsList = document.getElementById('comics');
  const docfrag = document.createDocumentFragment();

  filteredResults.map((el) => {
    const liNode = document.createElement('li');
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/createDocumentFragment
    // look lodash templates
    const comicUrl = el.urls[0].url;
    const comicTitle = el.title;
    const firstImage = el.images[0];
    const imgPath = firstImage.path;
    const imgExtension = firstImage.extension;
    const imgFullUrl = `${imgPath}.${imgExtension}`;

    const template = _.template('<a href=<%= url %>><%= title %><img src=<%= img %>></a>');
    const liNodeContent = template({
      url: comicUrl,
      title: comicTitle,
      img: imgFullUrl
    });

    liNode.innerHTML = liNodeContent;
    docfrag.appendChild(liNode);
  });

  comicsList.appendChild(docfrag);
});
