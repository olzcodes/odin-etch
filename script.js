const h1 = document.querySelector("h1");
const sketchContainer = document.querySelector(".sketch-container");
const rangeSlider = document.querySelector(".range-slider");
const sliderControl = document.querySelector("#slider-control");
const sliderValue = document.querySelector(".slider-value");
const btnReset = document.querySelector(".button.reset");
const btnColorPicker = document.querySelector(".color-picker");
const btnEraser = document.querySelector(".button.eraser");
const btnShading = document.querySelector(".button.shading");
const btnGlow = document.querySelector(".button.glow");
const btnRainbow = document.querySelector(".button.rainbow");
let canvasBlank = true;
let canvasSize = 32;
let brushMode = "default";
let glowMode = false;
let brushCounter = 0;
let gridStyle = 0;
const gridStyles = {
  0: "1px solid lightgrey",
  1: "1px dashed lightgrey",
  2: "none",
};
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
const hexOpacityLevels = [
  "00",
  "11",
  "22",
  "33",
  "44",
  "55",
  "66",
  "77",
  "88",
  "99",
  "AA",
  "BB",
  "CC",
  "DD",
  "EE",
  "FF",
];

const generateTiles = function (canvasSize) {
  for (i = 0; i < canvasSize; i++) {
    sketchContainer.innerHTML += `<div class="column-${i + 1}"></div>`;
    let column = document.querySelector(`.column-${i + 1}`);
    let sketchContainerWidth = sketchContainer.clientWidth;
    column.style.width = `${sketchContainerWidth / canvasSize}px`;
    for (j = 0; j < canvasSize; j++) {
      column.innerHTML += `<div class="tile column-${i + 1} row-${
        j + 1
      }"></div>`;
      let tile = document.querySelector(`.tile.column-${i + 1}.row-${j + 1}`);
      tile.style.height = `${sketchContainerWidth / canvasSize}px`;
    }
  }
  canvasBlank = true;
  sliderValue.textContent = `${canvasSize} x ${canvasSize}`;
};

generateTiles(canvasSize);

const deleteTiles = function () {
  sketchContainer.innerHTML = ``;
};

const changeResolution = function () {
  if (!canvasBlank) {
    const clear = confirm("This will clear the canvas. Continue?");
    if (!clear) {
      return;
    }
  }
  canvasSize = this.value;
  sliderControl.setAttribute("value", canvasSize);
  deleteTiles();
  generateTiles(canvasSize);
};

const windowResizeHandler = function () {
  let sketchContainerWidth = sketchContainer.clientWidth;
  const tile = document.querySelectorAll(".tile");
  tile.forEach((tile) => {
    tile.style.height = `${sketchContainerWidth / canvasSize}px`;
    tile.style.width = `${sketchContainerWidth / canvasSize}px`;
  });
};

const toggleGridStyle = function () {
  gridStyle++;
  if (gridStyle > 2) gridStyle = 0;
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.style.border = `${gridStyles[gridStyle]}`;
  });
};

const rainbowColor = function () {
  let colorNumber = brushCounter % rainbowColors.length;
  return rainbowColors[colorNumber];
};

const applyBrush = function (e) {
  if (e.target.classList.contains("sketch-container")) return;

  if (brushMode === "default") {
    e.target.dataset.hexOpacityLevel = 15;
    e.target.dataset.hexColor = btnColorPicker.value;
    e.target.style.backgroundColor = e.target.dataset.hexColor;
    if (glowMode) {
      e.target.style.boxShadow = `0px 0px 30px 6px ${btnColorPicker.value}`;
    }
  } else if (brushMode === "rainbow") {
    brushCounter += 1;
    e.target.dataset.hexOpacityLevel = 15;
    e.target.dataset.hexColor = `${rainbowColor()}`;
    e.target.style.backgroundColor = e.target.dataset.hexColor;
    if (glowMode) {
      e.target.style.boxShadow = `0px 0px 30px 6px ${rainbowColor()}`;
    }
  } else if (brushMode === "eraser") {
    e.target.style.backgroundColor = "silver";
    e.target.style.boxShadow = "";
    e.target.dataset.hexOpacityLevel = 0;
    e.target.dataset.hexColor = 0;
  } else if (brushMode === "shading") {
    if (!e.target.dataset.hexColor || e.target.dataset.hexColor === "0") {
      e.target.dataset.hexOpacityLevel = 1;

      e.target.dataset.hexColor =
        btnColorPicker.value +
        hexOpacityLevels[e.target.dataset.hexOpacityLevel];

      e.target.style.backgroundColor = e.target.dataset.hexColor;
    } else {
      if (e.target.dataset.hexColor.slice(0, 7) !== btnColorPicker.value) {
        e.target.dataset.hexOpacityLevel = 5;
      }
      if (e.target.dataset.hexOpacityLevel < 15) {
        e.target.dataset.hexOpacityLevel =
          parseInt(e.target.dataset.hexOpacityLevel) + 1;

        e.target.dataset.hexColor =
          btnColorPicker.value +
          hexOpacityLevels[e.target.dataset.hexOpacityLevel];

        e.target.style.backgroundColor = e.target.dataset.hexColor;
      }
    }
    if (glowMode) {
      e.target.style.boxShadow = `0px 0px 30px 0px ${btnColorPicker.value}`;
    }
  }
};

const activateBrush = function (e) {
  applyBrush(e);
  sketchContainer.addEventListener("mouseover", applyBrush);
  canvasBlank = false;
};

const deactivateBrush = function () {
  sketchContainer.removeEventListener("mouseover", applyBrush);
};

const changeCursorStyle = function () {
  if (brushMode === "eraser") {
    sketchContainer.style.cursor = "crosshair";
  } else {
    sketchContainer.style.cursor = "cell";
  }
};

const btnResetHandler = function () {
  if (!canvasBlank) {
    const clear = confirm("This will clear the canvas. Continue?");
    if (!clear) return;
  }
  deleteTiles();
  generateTiles(canvasSize);
};

const btnEraserHandler = function () {
  btnEraser.classList.toggle("on");
  btnRainbow.classList.remove("on");
  btnGlow.classList.remove("on");
  btnShading.classList.remove("on");
  h1.classList.remove("glowMode");
  h1.innerHTML = "miniSKETCH";
  h1.classList.toggle("eraserMode");
  sketchContainer.classList.toggle("eraser-active");
  brushMode !== "eraser" ? (brushMode = "eraser") : (brushMode = "default");
  glowMode === true ? (glowMode = false) : null;
};

const btnShadingHandler = function () {
  btnShading.classList.toggle("on");
  btnEraser.classList.remove("on");
  btnRainbow.classList.remove("on");
  sketchContainer.classList.remove("eraser-active");
  if (brushMode === "shading") {
    brushMode = "default";
    h1.innerHTML = "miniSKETCH";
  } else {
    brushMode = "shading";
    h1.innerHTML = shadingText(h1);
    h1.classList.remove("eraserMode");
  }
};

const shadingText = function (HTMLelement) {
  const plainText = HTMLelement.textContent;
  const array = plainText.split("");
  let RGBalpha = 1;
  let shadingTextHTML = "";
  array.forEach((letter) => {
    RGBalpha -= 0.08;
    shadingTextHTML += `<span style="color: rgba(255, 255, 255, ${RGBalpha})">${letter}</span>`;
  });
  return shadingTextHTML;
};

const btnGlowHandler = function () {
  btnGlow.classList.toggle("on");
  btnEraser.classList.remove("on");
  h1.classList.toggle("glowMode");
  h1.classList.remove("eraserMode");
  brushMode === "eraser" ? (brushMode = "default") : null;
  if (glowMode === true) {
    glowMode = false;
  } else {
    glowMode = true;
    if (brushMode === "default") h1.innerHTML = "miniSKETCH";
  }
};

const btnRainbowHandler = function () {
  btnRainbow.classList.toggle("on");
  btnEraser.classList.remove("on");
  btnShading.classList.remove("on");
  h1.classList.remove("eraserMode");
  sketchContainer.classList.remove("eraser-active");
  if (brushMode === "rainbow") {
    brushMode = "default";
    h1.innerHTML = "miniSKETCH";
  } else {
    brushMode = "rainbow";
    h1.innerHTML = rainbowText(h1);
  }
};

const rainbowText = function (HTMLelement) {
  const plainText = HTMLelement.textContent;
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

// Event Listener - Window

window.addEventListener("resize", windowResizeHandler);

// Event Listeners - Canvas

sketchContainer.addEventListener("mousedown", activateBrush);
document.addEventListener("mouseup", deactivateBrush);
sketchContainer.addEventListener("mouseover", changeCursorStyle);

// Event Listeners - Buttons

h1.addEventListener("click", toggleGridStyle);
sliderControl.addEventListener("click", changeResolution);
btnReset.addEventListener("click", btnResetHandler);
btnShading.addEventListener("click", btnShadingHandler);
btnEraser.addEventListener("click", btnEraserHandler);
btnGlow.addEventListener("click", btnGlowHandler);
btnRainbow.addEventListener("click", btnRainbowHandler);

// Event Listener - For touch screens

sketchContainer.addEventListener("touchstart", applyBrush);
sketchContainer.addEventListener("touchend", applyBrush);
sliderControl.addEventListener("touchstart", changeResolution);
sliderControl.addEventListener("touchend", changeResolution);
