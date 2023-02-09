const body = document.body;
const board = document.querySelector(".sketch-board");
const btnClear = document.querySelector(".btn-clear");
const wrapper = document.querySelector(".sketch-container");
const colorPicker = document.querySelector("#color-input");

let clicked = false;
let color = colorPicker.value;
let tilesCount = 10;

const changeTilesCount = (size) => {
  tilesCount = 10;
  clearBoard();
  return (tilesCount += size);
};

const spinner = Draggable.create("#btn-rounded-size", {
  type: "rotation",
  inertia: true,
  bounds: { minRotation: 0, maxRotation: -90 },
  onDrag: () => {
    // console.log(Math.round((spinner[0].rotation / -90) * 48));
  },
  onRelease: () => {
    changeTilesCount(Math.round((spinner[0].rotation / -90) * 20));
    renderTilesCount();
  },
});

const spinner2 = Draggable.create("#btn-rounded-color", {
  type: "rotation",
  inertia: true,
  bounds: { minRotation: 0, maxRotation: 90 },
  onDrag: () => {
    console.log(spinner2[0].rotation);
  },
});

// let tileWidth = board.clientWidth / 10;

const renderTilesCount = () => {
  board.style.gridTemplateColumns = `repeat(${tilesCount}, auto)`;
  for (let i = 1; i <= tilesCount * tilesCount; i++) {
    const tileElement = document.createElement("div");
    tileElement.style.width = `auto`;
    tileElement.classList.add("tile");

    tileElement.addEventListener("dragstart", (event) => {
      event.preventDefault();
    });

    tileElement.addEventListener("drop", (event) => {
      event.preventDefault();
    });

    tileElement.addEventListener("mousedown", () => {
      tileElement.style.backgroundColor = color;
    });

    tileElement.addEventListener("mousemove", () => {
      if (clicked) {
        tileElement.style.backgroundColor = color;
      }
    });

    board.append(tileElement);
  }
};

const clearBoard = () => {
  Array.from(board.children).forEach((element) => {
    element.style.backgroundColor = "transparent";
  });
};

btnClear.addEventListener("click", () => {
  Array.from(board.children).forEach((element) => {
    element.style.backgroundColor = "transparent";
  });
});

body.addEventListener("mousedown", () => {
  clicked = true;
});

body.addEventListener("mouseup", () => {
  clicked = false;
});

wrapper.addEventListener("dragstart", (event) => {
  event.preventDefault();
});

wrapper.addEventListener("drop", (event) => {
  event.preventDefault();
});

colorPicker.addEventListener("input", () => {
  color = colorPicker.value;
  console.log(color);
});

renderTilesCount();
