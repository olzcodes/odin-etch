const body = document.querySelector("body");
const sketchContainer = document.querySelector(".sketch-container");
const rangeSlider = document.querySelector(".range-slider");
const sliderControl = document.querySelector("#slider-control");
const sliderValue = document.querySelector(".slider-value");
const btnReset = document.querySelector(".button.reset");
const btnRainbow = document.querySelector(".button.rainbow");
const btnEraser = document.querySelector(".button.eraser");
let canvasBlank = true;
let canvasSize = 32;
let mode = "default";
const rainbowColors = [
  "#FFADAD",
  "#FFD6A5",
  "#FDFFB6",
  "#CAFFBF",
  "#9BF6FF",
  "#A0C4FF",
  "#BDB2FF",
  "#FFC6FF",
  "#FFFFFC",
];
let drawingCounter = 0;

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

// Drawing functions

const rainbowColor = function () {
  let colorNumber = drawingCounter % 7;
  return rainbowColors[colorNumber];
};

const shadeTile = function (e) {
  if (mode === "default") {
    e.target.style.backgroundColor = "mediumslateblue";
  } else if (mode === "rainbow") {
    e.target.style.backgroundColor = `${rainbowColor()}`;
  } else if (mode === "eraser") {
    e.target.style.backgroundColor = "silver";
  }
};

const activateBrush = function (e) {
  shadeTile(e);
  sketchContainer.addEventListener("mouseover", shadeTile);
  canvasBlank = false;
};

const deactivateBrush = function () {
  sketchContainer.removeEventListener("mouseover", shadeTile);
};

// Event Listeners

sketchContainer.addEventListener("mousedown", activateBrush);
document.addEventListener("mouseup", deactivateBrush);

sketchContainer.addEventListener("mouseover", function (e) {
  drawingCounter += 1;
  if (mode === "eraser") {
    sketchContainer.style.cursor = "crosshair";
  } else {
    sketchContainer.style.cursor = "cell";
  }
});

// For touch screens
sketchContainer.addEventListener("touchstart", shadeTile);
sketchContainer.addEventListener("touchend", shadeTile);

// Buttons

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
  sketchContainer.classList.remove("eraser-mode");
  mode === "rainbow" ? (mode = "default") : (mode = "rainbow");
  console.log(mode);
});

// Eraser button
btnEraser.addEventListener("click", function () {
  btnEraser.classList.toggle("on");
  btnRainbow.classList.remove("on");
  sketchContainer.classList.toggle("eraser-mode");
  mode !== "eraser" ? (mode = "eraser") : (mode = "default");
  console.log(mode);
});
