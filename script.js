"use strict";

const bodyEl = document.querySelector("body");
const noteEl = document.querySelector(".note");
const startEl = document.querySelector(".start-input");
const endEl = document.querySelector(".end-input");
const hearthEl = document.querySelector(".hearth-input");
const applyEl = document.querySelector(".apply");

const titleEl = document.querySelector(".title");
const minEl = document.querySelector(".min");
const maxEl = document.querySelector(".max");
const restartEl = document.querySelector(".restart");
const numberEl = document.querySelector(".number");
const guessEl = document.querySelector(".guess");
const checkEl = document.querySelector(".check");
const messageEl = document.querySelector(".message");
const scoreEl = document.querySelector(".score");
const highscoreEl = document.querySelector(".highscore");

let min = 1;
let max = 20;
let secretNumber = random(min, max);
let score = 20;
let highscore = 0;

displayAlert();
displayScore();
highscoreEl.textContent = highscore; // display highscore

let start = (startEl.value = min);
let end = (endEl.value = max);
let hearth = (hearthEl.value = score);

function displayScore() {
  scoreEl.textContent = score;
}
function displayMessage(message) {
  messageEl.textContent = message;
}
function displayNote(note) {
  noteEl.textContent = note;
}
function displayAlert() {
  minEl.textContent = min;
  maxEl.textContent = max;
}
function show(target) {
  const popup = document.getElementById(target);
  popup.classList.toggle("popup-show");
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function startGame() {
  const guess = Number(guessEl.value);

  if (!guess) {
    displayMessage("🚫 No number");
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!");
    numberEl.textContent = secretNumber;
    bodyEl.style.backgroundColor = "#60b347";
    numberEl.style.width = "30rem";
    if (score > highscore) {
      highscoreEl.textContent = score;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too lower!");
      score--;
      displayScore();
    } else {
      displayMessage("☠️ You lose");
      bodyEl.style.backgroundColor = "#8a2511";
    }
  } else {
    displayMessage("???");
  }
}
function restartGame(bgcolor, minnum, maxnum, scorenum) {
  min = Number(minnum) || 1;
  max = Number(maxnum) || 20;
  score = Number(scorenum) || 20;
  secretNumber = random(min, max);
  guessEl.value = null;
  displayAlert();
  displayScore();
  displayMessage("Start guessing...");
  bodyEl.style.backgroundColor = `#${bgcolor}`;
  numberEl.style.width = "15rem";
  numberEl.textContent = "?";
}

checkEl.addEventListener("click", function () {
  startGame();
});

restartEl.addEventListener("click", function () {
  restartGame("222", 1, 20, 20);
  titleEl.textContent = "Guess My Number!";
});

applyEl.addEventListener("click", function () {
  start = startEl.value;
  end = endEl.value;
  hearth = hearthEl.value;

  if (start > end) {
    displayNote("Please fill the end input more higher");
  } else if (hearth < 1) {
    displayNote("minimum use 1 hearth");
  } else if (end > start) {
    displayNote("");
    restartGame("1a619f", start, end, hearth);
    titleEl.textContent = "Guess My Number! (Custom)";
  } else if (start === end) {
    displayNote("Start input must be lower than end input");
  }
});
