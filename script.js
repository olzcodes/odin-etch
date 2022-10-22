const sketchContainer = document.querySelector(".sketch-container");

const createTiles = function () {
  for (i = 0; i < 16; i++) {
    sketchContainer.innerHTML += `<div class="column-${i + 1}"></div>`;
    let column = document.querySelector(`.column-${i + 1}`);
    for (j = 0; j < 16; j++) {
      column.innerHTML += `<div class="tile column-${i + 1} row-${
        j + 1
      }"></div>`;
    }
  }
};

createTiles();

let tiles = document.querySelectorAll(".tile");

tiles.forEach((tile) =>
  tile.addEventListener("mouseover", function (e) {
    tile.classList.add("shaded");
  })
);
