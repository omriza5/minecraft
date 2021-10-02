import { world } from "./worldMatrix.js";

const NUMBER_OF_TOOLS = 4;
const tools = document.querySelector(".tools");
const picaxe = document.querySelector("#picaxe");
const shovel = document.querySelector("#shovel");
const axe = document.querySelector("#axe");
const inventory = document.querySelector("#inventory");
const inventoryCounter = document.querySelector("#inventory-counter");

/** instance variables */
let selectedTool = "";

const inventoryArr = [];

/** functions  */
export default function bulidWorld() {
  for (let row = 0; row < world.length; row++) {
    for (let col = 0; col < world[row].length; col++) {
      let tile = document.createElement("div");
      tile.classList.add("tile");
      tile.setAttribute("segmentValue", world[row][col]);
      tile.addEventListener("click", handleSegmentClick);
      populateCell(world[row][col], tile);
      document.querySelector(".game").appendChild(tile);
    }
  }
}

function handleSegmentClick(e) {
  if (!selectedTool) return;

  const segment = e.target.attributes.segmentValue.nodeValue;

  if (selectedTool === "inventory" && inventoryArr.length > 0) {
    addSegment(segment, e);
  } else {
    removeSegment(segment, e.currentTarget);
  }
}

function addSegment(segment, element) {
  if (segment !== "0") return;

  /** update element segment value  */
  element.srcElement.attributes[1].nodeValue =
    inventoryArr[inventoryArr.length - 1];

  /** store last element inserted(stack behavior) */
  const lastSegmentInserted = inventoryArr[inventoryArr.length - 1];
  inventoryArr.pop();
  updateInventoryCounter();
  updateInventoryBackground();

  switch (lastSegmentInserted) {
    case "1":
      element.target.style.background = "#fff";
      break;
    case "2":
      element.target.style.background = "url('../img/soil.png')";
      break;
    case "3":
      element.target.style.background = "url('../img/grass.png')";
      break;
    case "4":
      element.target.style.background = "url('../img/stone.png')";
      break;
    case "5":
      element.target.style.background = "url('../img/treeTrunck.png')";
      break;
    case "6":
      element.target.style.background = "url('../img/treeBranch.jpeg')";
      break;

    default:
      return null;
  }
}

function removeSegment(segment, element) {
  if (selectedTool === "inventory") return;
  element.attributes[1].nodeValue = "0";

  switch (segment) {
    case "1":
    case "2":
    case "3":
      removeDirt(element, segment);
      break;
    case "4":
      removeStone(element, segment);

      break;
    case "5":
    case "6":
      removeTree(element, segment);
      break;
    default:
      return null;
  }
}

function populateCell(segment, element) {
  switch (segment) {
    case 0:
      element.style.background = "rgb(131, 183, 238)";
      break;
    case 1:
      element.style.background = "#fff";
      break;
    case 2:
      element.style.background = "url('../img/soil.png')";
      break;
    case 3:
      element.style.background = "url('../img/grass.png')";
      break;
    case 4:
      element.style.background = "url('../img/stone.png')";
      break;
    case 5:
      element.style.background = "url('../img/treeTrunck.png')";
      break;
    case 6:
      element.style.background = "url('../img/treeBranch.jpeg')";
      break;

    default:
      return null;
  }
}

function onToolClick(e) {
  const tool = e.target.id;

  /** exit the the function when tapping more than once on a tool */
  if (selectedTool === tool) return;

  selectedTool = tool;

  highlightTool(tool);
}

function highlightTool(tool) {
  removePreviousHighlight();

  for (let i = 0; i < NUMBER_OF_TOOLS; i++) {
    if (tools.children[i].id === tool) {
      tools.children[i].classList.add("selected-tool");
    }
  }
}

/** helper function to remove css class */
function removePreviousHighlight() {
  for (let i = 0; i < NUMBER_OF_TOOLS; i++)
    tools.children[i].classList.remove("selected-tool");
}

function removeDirt(element, segment) {
  if (selectedTool !== "shovel") return;
  inventoryArr.push(segment);
  updateInventoryCounter();
  updateInventoryBackground();
  element.style.background = "rgb(131, 183, 238)";
}
function removeStone(element, segment) {
  if (selectedTool !== "axe") return;

  inventoryArr.push(segment);
  updateInventoryCounter();
  updateInventoryBackground();
  element.style.background = "rgb(131, 183, 238)";
}
function removeTree(element, segment) {
  if (selectedTool !== "picaxe") return;
  inventoryArr.push(segment);
  updateInventoryCounter();
  updateInventoryBackground();
  element.style.background = "rgb(131, 183, 238)";
}

function updateInventoryCounter() {
  inventoryCounter.innerHTML = inventoryArr.length;
}

/** change the background img of the inventory box to be the last element of inventoryArr */
function updateInventoryBackground() {
  const lastSegmentInserted = inventoryArr[inventoryArr.length - 1];
  switch (lastSegmentInserted) {
    case "1":
      inventory.style.background = "#fff";
      inventoryCounter.style.color = "black";
      break;
    case "2":
      inventory.style.background = "url('../img/soil.png')";
      inventoryCounter.style.color = "#fff";
      break;
    case "3":
      inventory.style.background = "url('../img/grass.png')";
      inventoryCounter.style.color = "#fff";
      break;
    case "4":
      inventory.style.background = "url('../img/stone.png')";
      inventoryCounter.style.color = "#fff";
      break;
    case "5":
      inventory.style.background = "url('../img/treeTrunck.png')";
      inventoryCounter.style.color = "#fff";
      break;
    case "6":
      inventory.style.background = "url('../img/treeBranch.jpeg')";
      inventoryCounter.style.color = "#fff";
      break;
    default:
      inventory.style.background = "black";
      inventoryCounter.style.color = "#fff";
  }
}

/** Event listeners */
picaxe.addEventListener("click", onToolClick);
shovel.addEventListener("click", onToolClick);
axe.addEventListener("click", onToolClick);
inventory.addEventListener("click", onToolClick);
