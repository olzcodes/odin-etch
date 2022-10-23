const sketchContainer = document.querySelector(".sketch-container");
const rangeSlider = document.querySelector(".range-slider");
const sliderControl = document.querySelector("#slider-control");
const sliderValue = document.querySelector(".slider-value");

const generateTiles = function (input) {
  for (i = 0; i < input; i++) {
    sketchContainer.innerHTML += `<div class="column-${i + 1}"></div>`;
    let column = document.querySelector(`.column-${i + 1}`);
    for (j = 0; j < input; j++) {
      column.innerHTML += `<div class="tile column-${i + 1} row-${
        j + 1
      }"></div>`;
    }
  }
};

generateTiles(16);

const deleteTiles = function () {
  sketchContainer.innerHTML = ``;
};

let tiles = document.querySelectorAll(".tile");

tiles.forEach((tile) =>
  tile.addEventListener("mouseover", function (e) {
    tile.classList.add("shaded");
  })
);

const getSliderValue = function () {
  sliderValue.textContent = sliderControl.getAttribute("value");
};

getSliderValue();

sliderControl.addEventListener("click", function () {
  sliderControl.setAttribute("value", this.value);
  getSliderValue();
  deleteTiles();
  generateTiles(this.value);
});
