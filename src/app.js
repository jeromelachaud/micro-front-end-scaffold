let css = require('./app.css');

// function fullScreen(element) {
//   let newElement = document.createElement(element);
//   newElement.style.height = '100vh';
//   document.body.appendChild(newElement);
//   return newElement;
// }
//
// function input(inputEvent, DOMElement, callback) {
//   DOMElement.addEventListener(inputEvent, (e) => {
//     let x = e.clientX;
//     let y = e.clientY;
//     callback(DOMElement, x, y);
//   });
// }
//
// function output(element, x, y) {
//   element.textContent  = `${x}${y}`;
//   element.style.backgroundColor = `rgb(${x},${y}, 100)`;
// }
//
// input('mousemove', fullScreen('main'),output);

////////////////////////////////////
function time() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  let arr = [hours, minutes, seconds].map((num) => {
    return num < 10 ? '0' +num : num.toString();
  });
  hours = arr[0];
  minutes = arr[1];
  seconds = arr[2];

  return hours + minutes + seconds;
}

function output (time) {
  let color = '#' + time;
  let body = document.body;
  body.bgColor = color;
  body.textContent = color;
  body.style.color = 'white';
  body.style.height = '100vh';
}

function startClick(callback) {
  document.body.addEventListener('dblclick', () => {callback();});
}

function stopClick(callback, name) {
  document.body.addEventListener('click', () => {callback(name);});
}

function init() {
  let tick = setInterval(() => {
    output(time());
  }, 1000);
  stopClick(clearInterval, tick);
  startClick(init);
}

init();
