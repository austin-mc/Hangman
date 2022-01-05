"use strict";

const wordList = [
  "HANGMAN",
  "TEST",
  "JAVASCRIPT",
  "PROGRAMMING",
  "HTML",
  "MEMORY",
  "COMPUTER",
  "ARIZONA",
];

let targetWord = getRandWord();
const wordEl = document.querySelector(".word");
const headerEl = document.querySelector("h1");
const subheaderEl = document.querySelector("h3");
let gameBoard = "";
let numWrong = 0;

document.addEventListener("keypress", (e) => {
  const keyPress = e.key.toUpperCase();
  if (checkGuess(keyPress)) {
    for (let i = 0; i < targetWord.length; i++) {
      if (targetWord.charAt(i) === keyPress) {
        gameBoard = replaceStringCharacter(gameBoard, i, keyPress);
      }
    }
    wordEl.textContent = gameBoard;
    checkGame();
  } else {
    wrongGuess();
    checkGame();
  }
});

function getRandWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function setHTMLWord(i) {
  if (!i) {
    const str = "_";
    gameBoard = str.repeat(targetWord.length);
    wordEl.textContent = gameBoard;
  } else {
    const oldWordEl = wordEl.textContent;
    const newWordEl = replaceStringCharacter(oldWordEl, i, currentGuess);
    wordEl.textContent = newWordEl;
  }
}

function replaceStringCharacter(word, i, newLetter) {
  let firstString = word.slice(0, i);
  let secondString = word.slice(i + 1);
  return firstString + newLetter + secondString;
}

function checkGuess(guess) {
  for (const char of targetWord) {
    if (guess === char) return 1;
  }
  return 0;
}

function wrongGuess() {
  numWrong++;
  switch (numWrong) {
    case 1:
      removeHidden(".face");
      break;
    case 2:
      removeHidden(".torso");
      break;
    case 3:
      removeHidden(".rightarm");
      break;
    case 4:
      removeHidden(".leftarm");
      break;
    case 5:
      removeHidden(".rightleg");
      break;
    case 6:
      removeHidden(".leftleg");
      break;
  }
}

function removeHidden(objectClass) {
  document.querySelector(objectClass).classList.remove("hidden");
}

function checkGame() {
  if (gameBoard === targetWord) {
    headerEl.textContent = "WINNER!";
    subheaderEl.textContent = "Click the button below to play again!";
  } else if (numWrong === 6) {
    headerEl.textContent = "You Lose! Please Try Again";
    subheaderEl.textContent = "Click the button below to play again!";
  }
}

function resetGameState() {
  headerEl.textContent = "Hangman!";
  subheaderEl.textContent = "Guess a randomly generated word.";
  targetWord = getRandWord();
  setHTMLWord();
  let divs = document.querySelectorAll(".person");
  for (let i = 0; i < divs.length; i++) {
    divs[i].classList.add("hidden");
  }
  numWrong = 0;
}

setHTMLWord();
