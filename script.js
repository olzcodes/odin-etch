const h1 = document.querySelector("h1");
const sketchContainer = document.querySelector(".sketch-container");
const rangeSlider = document.querySelector(".range-slider");
const sliderControl = document.querySelector("#slider-control");
const sliderValue = document.querySelector(".slider-value");
const btnReset = document.querySelector(".button.reset");
const colorPicker = document.querySelector(".color-picker");
const btnEraser = document.querySelector(".button.eraser");
const btnGlow = document.querySelector(".button.glow");
const btnRainbow = document.querySelector(".button.rainbow");
let canvasBlank = true;
let canvasSize = 32;
let mode = "default";
let glowMode = false;
let drawingCounter = 0;
const rainbowColors = [
  "#FFADAD",
  "#FFD6A5",
  "#FDFFB6",
  "#CAFFBF",
  "#9BF6FF",
  "#A0C4FF",
  "#BDB2FF",
  "#FFC6FF",
];

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

const showSliderValue = function () {
  sliderValue.textContent = `${canvasSize} x ${canvasSize}`;
};

showSliderValue();

generateTiles(canvasSize);

const deleteTiles = function () {
  sketchContainer.innerHTML = ``;
};

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

const rainbowColor = function () {
  let colorNumber = drawingCounter % rainbowColors.length;
  return rainbowColors[colorNumber];
};

const shadeTile = function (e) {
  drawingCounter += 1;
  if (e.target.classList.contains("sketch-container")) return;
  if (mode === "default") {
    e.target.style.backgroundColor = colorPicker.value;
    if (glowMode) {
      e.target.style.boxShadow = `0px 0px 30px 2px ${colorPicker.value}`;
    }
  } else if (mode === "rainbow") {
    e.target.style.backgroundColor = `${rainbowColor()}`;
    if (glowMode) {
      e.target.style.boxShadow = `0px 0px 10px 2px ${rainbowColor()}`;
    }
  } else if (mode === "eraser") {
    e.target.style.backgroundColor = "silver";
    e.target.style.boxShadow = "";
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

const changeCursorStyle = function () {
  if (mode === "eraser") {
    sketchContainer.style.cursor = "crosshair";
  } else {
    sketchContainer.style.cursor = "cell";
  }
};

const btnResetHandler = function () {
  if (!canvasBlank) {
    const reset = confirm("This will clear the canvas. Continue?");
    if (!reset) return;
  }
  deleteTiles();
  generateTiles(canvasSize);
};

const btnEraserHandler = function () {
  btnEraser.classList.toggle("on");
  btnRainbow.classList.remove("on");
  btnGlow.classList.remove("on");
  h1.classList.remove("glowMode");
  h1.innerHTML = "miniSKETCH";
  sketchContainer.classList.toggle("eraser-mode");
  mode !== "eraser" ? (mode = "eraser") : (mode = "default");
  glowMode === true ? (glowMode = false) : null;
};

const btnGlowHandler = function () {
  btnGlow.classList.toggle("on");
  btnEraser.classList.remove("on");
  h1.classList.toggle("glowMode");
  mode === "eraser" ? (mode = "default") : null;
  glowMode === false ? (glowMode = true) : (glowMode = false);
};

const btnRainbowHandler = function () {
  btnRainbow.classList.toggle("on");
  btnEraser.classList.remove("on");
  sketchContainer.classList.remove("eraser-mode");
  if (mode === "rainbow") {
    mode = "default";
    h1.innerHTML = "miniSKETCH";
  } else {
    mode = "rainbow";
    h1.innerHTML = rainbowText(h1);
  }
};

const rainbowText = function (HTMLelement) {
  plainText = HTMLelement.textContent;
  const array = plainText.split("");
  let letterNumber = 0;
  let rainbowTextHTML = "";
  array.forEach((letter) => {
    letterNumber++;
    let colorNumber = letterNumber % rainbowColors.length;
    rainbowTextHTML += `<span style="color: ${rainbowColors[colorNumber]}">${letter}</span>`;
  });
  HTMLelement.innerHTML = "";
  return rainbowTextHTML;
};

// Event Listeners - Canvas

sketchContainer.addEventListener("mousedown", activateBrush);
document.addEventListener("mouseup", deactivateBrush);
sketchContainer.addEventListener("mouseover", changeCursorStyle);

// Event Listeners - Buttons

sliderControl.addEventListener("click", changeResolution);
btnReset.addEventListener("click", btnResetHandler);
btnRainbow.addEventListener("click", btnRainbowHandler);
btnEraser.addEventListener("click", btnEraserHandler);
btnGlow.addEventListener("click", btnGlowHandler);

// Event Listener - For touch screens

sketchContainer.addEventListener("touchstart", shadeTile);
sketchContainer.addEventListener("touchend", shadeTile);
sliderControl.addEventListener("touchstart", changeResolution);
sliderControl.addEventListener("touchend", changeResolution);
