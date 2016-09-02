const _ = require('lodash/fp');

const comics = [
  {pages: 100, price: 50},
  {pages: 100, price: 50},
  {pages: 50, price: 10}
];

const filterLt40 = _.filter(function(num) {
  return num <= 40;
});

const filterLt100 = _.filter(function(num) {
  return num < 100;
});

var filterPriceLt40 = _.flowRight([filterLt40, _.map(_.prop('price'))]);
var filterPagesLt100 = _.flowRight([filterLt100, _.map(_.prop('pages'))]);
console.log(filterPriceLt40(comics), 'filterPriceLt40');
console.log(filterPagesLt100(comics), 'filterPagesLt100');
