const sketchContainer = document.querySelector(".sketch-container");
const rangeSlider = document.querySelector(".range-slider");
const sliderControl = document.querySelector("#slider-control");
const sliderValue = document.querySelector(".slider-value");
const btnReset = document.querySelector(".button.reset");
const btnRainbow = document.querySelector(".button.rainbow");
const btnEraser = document.querySelector(".button.eraser");
let canvasBlank = true;
let canvasSize = 32;

const generateTiles = function (input) {
  for (i = 0; i < input; i++) {
    sketchContainer.innerHTML += `<div class="column-${i + 1}"></div>`;
    let column = document.querySelector(`.column-${i + 1}`);
    let sketchContainerWidth = sketchContainer.clientWidth;
    column.style.width = `${sketchContainerWidth / input}px`;
    for (j = 0; j < input; j++) {
      column.innerHTML += `<div class="tile column-${i + 1} row-${
        j + 1
      }"></div>`;
      let tile = document.querySelector(`.tile.column-${i + 1}.row-${j + 1}`);
      tile.style.height = `${sketchContainerWidth / input}px`;
    }
  }
  canvasBlank = true;
};

const deleteTiles = function () {
  sketchContainer.innerHTML = ``;
};

const showSliderValue = function () {
  sliderValue.textContent = `${canvasSize} x ${canvasSize}`;
};

showSliderValue();

const changeResolution = function () {
  if (!canvasBlank) {
    const reset = confirm("This will clear the canvas. Continue?");
    if (!reset) {
      return;
    }
  }
  canvasSize = this.value;
  sliderControl.setAttribute("value", canvasSize);
  showSliderValue();
  deleteTiles();
  generateTiles(canvasSize);
};

sliderControl.addEventListener("click", changeResolution);
sliderControl.addEventListener("touchstart", changeResolution);
sliderControl.addEventListener("touchend", changeResolution);

generateTiles(canvasSize);

const shadeTiles = function (e) {
  e.target.classList.add("shaded");
};

const activateBrush = function (e) {
  e.target.classList.add("shaded");
  sketchContainer.addEventListener("mouseover", shadeTiles);
  canvasBlank = false;
};

const deactivateBrush = function () {
  sketchContainer.removeEventListener("mouseover", shadeTiles);
};

sketchContainer.addEventListener("mousedown", activateBrush);
sketchContainer.addEventListener("mouseup", deactivateBrush);

sketchContainer.addEventListener("mouseover", function () {
  sketchContainer.style.cursor = "crosshair";
});

// For touch screens
sketchContainer.addEventListener("touchstart", shadeTiles);
sketchContainer.addEventListener("touchend", shadeTiles);

// Reset button
btnReset.addEventListener("click", function () {
  if (!canvasBlank) {
    const reset = confirm("This will clear the canvas. Continue?");
    if (!reset) return;
  }
  deleteTiles();
  generateTiles(canvasSize);
});

// Rainbow button
btnRainbow.addEventListener("click", function () {
  btnRainbow.classList.toggle("on");
  btnEraser.classList.remove("on");
});

// Eraser button
btnEraser.addEventListener("click", function () {
  btnEraser.classList.toggle("on");
  btnRainbow.classList.remove("on");
});
