"use strict";

const wordList = [
  "HANGMAN",
  "JAVASCRIPT",
  "PROGRAMMING",
  "HTML",
  "MEMORY",
  "COMPUTER",
  "ARIZONA",
];

const wordEl = document.querySelector(".word");
const headerEl = document.querySelector("h1");
const subheaderEl = document.querySelector("h3");
let gameBoard = "";
let numWrong = 0;
let winLoss = false;

const getRandWord = () => wordList[Math.floor(Math.random() * wordList.length)];

const handleKeyPress = (e) => {
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
    if (!winLoss) {
      wrongGuess();
      checkGame();
    }
  }
};

const setHTMLWord = (i) => {
  if (!i) {
    const str = "_";
    gameBoard = str.repeat(targetWord.length);
    wordEl.textContent = gameBoard;
  } else {
    const oldWordEl = wordEl.textContent;
    const newWordEl = replaceStringCharacter(oldWordEl, i, currentGuess);
    wordEl.textContent = newWordEl;
  }
};

const replaceStringCharacter = (word, i, newLetter) => {
  let firstString = word.slice(0, i);
  let secondString = word.slice(i + 1);
  return firstString + newLetter + secondString;
};

const checkGuess = (guess) => {
  for (const char of targetWord) {
    if (guess === char) return 1;
  }
  return 0;
};

const wrongGuess = () => {
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
};

const removeHidden = (objectClass) => {
  document.querySelector(objectClass).classList.remove("hidden");
};

const checkGame = () => {
  if (gameBoard === targetWord) {
    winLoss = true;
    headerEl.textContent = "WINNER!";
    subheaderEl.textContent = "Click the button below to play again!";
  } else if (numWrong === 6) {
    winLoss = true;
    headerEl.textContent = "You Lose! Please Try Again";
    subheaderEl.textContent = "Click the button below to play again!";
  }
};

const resetGameState = () => {
  winLoss = false;
  headerEl.textContent = "Hangman!";
  subheaderEl.textContent = "Guess a randomly generated word.";
  targetWord = getRandWord();
  setHTMLWord();
  let divs = document.querySelectorAll(".person");
  for (let i = 0; i < divs.length; i++) {
    divs[i].classList.add("hidden");
  }
  numWrong = 0;
};

let targetWord = getRandWord();
document.addEventListener("keypress", handleKeyPress);
setHTMLWord();
