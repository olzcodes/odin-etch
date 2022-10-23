const sketchContainer = document.querySelector(".sketch-container");
const rangeSlider = document.querySelector(".range-slider");
const sliderControl = document.querySelector("#slider-control");
const sliderValue = document.querySelector(".slider-value");
let tiles = [];

const generateTiles = function (input) {
  for (i = 0; i < input; i++) {
    sketchContainer.innerHTML += `<div class="column-${i + 1}"></div>`;
    let column = document.querySelector(`.column-${i + 1}`);
    column.style.width = `${100 / input}vmin`;
    for (j = 0; j < input; j++) {
      column.innerHTML += `<div class="tile column-${i + 1} row-${
        j + 1
      }"></div>`;
      let tile = document.querySelector(`.tile.column-${i + 1}.row-${j + 1}`);
      tile.style.height = `${100 / input}vmin`;
    }
  }
};

const deleteTiles = function () {
  sketchContainer.innerHTML = ``;
};

const prepareTiles = function () {
  sketchContainer.addEventListener("mouseover", function (e) {
    e.target.classList.add("shaded");
  });
};

const getSliderValue = function () {
  let value = sliderControl.getAttribute("value");
  sliderValue.textContent = `${value} x ${value}`;
};

getSliderValue();

sliderControl.addEventListener("click", function () {
  sliderControl.setAttribute("value", this.value);
  getSliderValue();
  deleteTiles();
  generateTiles(this.value);
  prepareTiles();
});

generateTiles(16);
prepareTiles();
