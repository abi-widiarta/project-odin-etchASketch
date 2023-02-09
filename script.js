// ELEMENT SELECTION
const body = document.body;
const board = document.querySelector(".sketch-board");
const btnClear = document.querySelector(".btn-clear");
const wrapper = document.querySelector(".sketch-container");
const colorPicker = document.querySelector("#color-input");
const sizeIndicator = document.querySelector(".size-display");
const colorModeIndicator = document.querySelector(".color-mode-display");

// GLOBAL VAR
let clicked = false;
let color = colorPicker.value;
let colorRainbow = false;
let tilesCount = 10;

// SPINNABLE BUTTON
const spinner = Draggable.create("#btn-rounded-size", {
  type: "rotation",
  inertia: true,
  bounds: { minRotation: 0, maxRotation: 90 },
  onDrag: () => {
    let sizeDisplay = Math.round((spinner[0].rotation / 90) * 54) + 10;
    sizeIndicator.textContent = `${sizeDisplay} x ${sizeDisplay}`;
  },
  onRelease: () => {
    changeTilesCount(Math.round((spinner[0].rotation / 90) * 54));
    renderTilesCount();
  },
});

const spinner2 = Draggable.create("#btn-rounded-color", {
  type: "rotation",
  inertia: true,
  bounds: { minRotation: 0, maxRotation: 90 },
  onDrag: () => {},
  onRelease: () => {
    changeColorMode(spinner2[0].rotation);
  },
});

// FUNCTIONS
const changeTilesCount = (size) => {
  tilesCount = 10;
  clearBoard();
  return (tilesCount += size);
};

const getRandomColorNum = () => {
  return Math.round(Math.random() * 255);
};

const getRandomRainbowColor = () => {
  let red = getRandomColorNum();
  let green = getRandomColorNum();
  let blue = getRandomColorNum();

  return `rgb(${red},${green},${blue})`;
};

const changeColorMode = (value) => {
  if (value >= 45) {
    colorRainbow = true;
    colorModeIndicator.textContent = "Rainbow";
  } else {
    colorRainbow = false;
    colorModeIndicator.textContent = "Solid";
  }
};

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

    tileElement.addEventListener("mouseenter", () => {
      let randomNum;
      if (clicked) {
        if (colorRainbow) {
          randomNum = getRandomColorNum();
          console.log(randomNum);
          tileElement.style.backgroundColor = getRandomRainbowColor();
          console.log(colorRainbow, "yes");
        } else {
          tileElement.style.backgroundColor = color;
          console.log(colorRainbow);
        }
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
