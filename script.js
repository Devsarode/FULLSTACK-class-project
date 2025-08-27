const arraySize = 8;
let arr = new Array(arraySize).fill(null);
let secretPattern = [];
let level = 1;
let timer = 60;
let timerInterval;
let gameStarted = false;

// DOM
const arrayDiv = document.getElementById("array");
const feedback = document.getElementById("feedback");
const secretDisplay = document.getElementById("secretPattern");
const timerDisplay = document.getElementById("timer");
const levelDisplay = document.getElementById("level");

const beepSound = document.getElementById("beep");
const errorSound = document.getElementById("error");
const victorySound = document.getElementById("victory");

// Render array visually
function renderArray() {
  arrayDiv.innerHTML = "";
  arr.forEach(val => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = val !== null ? val : "";
    arrayDiv.appendChild(cell);
  });
}

// Generate random pattern based on level
function generatePattern() {
  let length = level === 1 ? 2 : 3;
  secretPattern = Array.from({length}, () => Math.floor(Math.random()*10));
  secretDisplay.textContent = `Secret Pattern: [ ${secretPattern.join(", ")} ]`;
}

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  arr = new Array(arraySize).fill(null);
  renderArray();
  level = 1;
  timer = 60;
  levelDisplay.textContent = "Level: 1";
  generatePattern();
  feedback.textContent = "Game Started!";
  timerInterval = setInterval(() => {
    timer--;
    timerDisplay.textContent = `Time: ${timer}s`;
    if (timer <= 0) {
      clearInterval(timerInterval);
      feedback.textContent = "⏳ Time's up! Game Over!";
    }
  }, 1000);
}

// Insert
document.getElementById("insertBtn").onclick = () => {
  if (!gameStarted) { feedback.textContent = "Click Start to begin!"; return; }
  let index = parseInt(document.getElementById("index").value);
  let value = parseInt(document.getElementById("value").value);
  if (isNaN(index) || isNaN(value) || index < 0 || index >= arraySize) {
    feedback.textContent = "Index out of bounds!";
    errorSound.play();
    return;
  }
  for (let i = arraySize-1; i > index; i--) arr[i] = arr[i-1];
  arr[index] = value;
  renderArray();
  beepSound.play();
  feedback.textContent = `Inserted ${value} at index ${index}!`;
};

// Delete
document.getElementById("deleteBtn").onclick = () => {
  if (!gameStarted) { feedback.textContent = "Click Start to begin!"; return; }
  let index = parseInt(document.getElementById("index").value);
  if (isNaN(index) || index < 0 || index >= arraySize || arr[index] === null) {
    feedback.textContent = "Invalid delete!";
    errorSound.play();
    return;
  }
  for (let i = index; i < arraySize-1; i++) arr[i] = arr[i+1];
  arr[arraySize-1] = null;
  renderArray();
  beepSound.play();
  feedback.textContent = `Deleted element at index ${index}.`;
};

// Search
document.getElementById("searchBtn").onclick = () => {
  if (!gameStarted) { feedback.textContent = "Click Start to begin!"; return; }
  let patternStr = document.getElementById("pattern").value.trim();
  if (!patternStr) {
    feedback.textContent = "Enter a valid pattern (e.g., 1,2,3)";
    errorSound.play();
    return;
  }
  let pattern = patternStr.split(",").map(Number);
  let found = false;

  for (let i = 0; i <= arr.length - pattern.length; i++) {
    let segment = arr.slice(i, i+pattern.length);
    if (segment.every((val, j) => val === pattern[j])) {
      found = true;
      victorySound.play();
      feedback.textContent = "Pattern Found!";
      if (pattern.join(",") === secretPattern.join(",")) {
        feedback.textContent = "🎉 Level Complete!";
        level++;
        if (level > 3) {
          clearInterval(timerInterval);
          feedback.textContent = "🏆 You cracked all levels!";
        } else {
          levelDisplay.textContent = "Level: " + level;
          generatePattern();
        }
      }
      break;
    }
  }
  if (!found) {
    feedback.textContent = "Pattern not found.";
    errorSound.play();
  }
};

// Reset
document.getElementById("resetBtn").onclick = () => {
  arr = new Array(arraySize).fill(null);
  renderArray();
  feedback.textContent = "Array reset!";
};

document.getElementById("startBtn").onclick = startGame;

// Initial render
renderArray();
