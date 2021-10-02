import buildWorld from "./world.js";

const startBtn = document.querySelector("#startBtn");
const gameContainer = document.querySelector(".game-container");
const landingPage = document.querySelector(".landing-page");
const smallGridBtn = document.querySelector("#small-grid-btn");
const largeGridBtn = document.querySelector("#large-grid-btn");
let size = "small";

function main() {
  buildWorld();
}

function launchGame() {
  document.body.removeChild(landingPage);
  gameContainer.style.display = "flex";
  main();
}

function setGameSize(e) {
  const userSizeSelection = e.path[0].value;
  if (userSizeSelection === "Large") {
    size = "large";
    gameContainer.style.width = "100vw";
  } else {
    size = "small";
  }

  toggleButton();
}

function toggleButton() {
  if (size === "large") {
    largeGridBtn.classList.add("selected");
    smallGridBtn.classList.remove("selected");
  } else {
    smallGridBtn.classList.add("selected");
    largeGridBtn.classList.remove("selected");
  }
}

/** Event Listeners */
startBtn.addEventListener("click", launchGame);
smallGridBtn.addEventListener("click", setGameSize);
largeGridBtn.addEventListener("click", setGameSize);
