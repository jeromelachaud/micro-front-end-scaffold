const _ = require('lodash');
const __ = require('lodash/fp');

const comics = [{pages: 100,price: 50},{pages: 100,price: 50},{pages: 50, price: 10}];

const filterLt40 = _.filter(function(num) {
  return num <= 40;
});

const filterLt100 = _.filter(function(num) {
  return num < 100;
});

const filterPriceLt40 = _.flowRight([filterLt40, _.map(__.prop('price'))]);
const filterPagesLt100 = _.flowRight([filterLt100, _.map(__.prop('pages'))]);

console.log(filterPriceLt40(comics));


const filterPrice = _.flowRight(_.map(_.prop('price')));

const filterPages = _.flowRight(_.map(_.prop('pages')));

// console.log(filterPages(comics));
