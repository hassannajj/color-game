
function randomColor() {
    // Picks a random color for the goal by picking a random number
    // between 0 and 250 for red, green, and blue and combining it
    goalRed = Math.floor(Math.random() * 26) * 10;
    goalGreen = Math.floor(Math.random() * 26) * 10;
    goalBlue = Math.floor(Math.random() * 26) * 10;
    goal.style.cssText = `background-color: rgb(${goalRed},${goalGreen},${goalBlue})`;
}


function reset() {
    canvas.style.cssText = "background-color: rgb(0, 0, 0)";
    currRed = 0;
    currGreen = 0;
    currBlue = 0;
    updateScore();
    randomColor();
    win = false;
    winningText.textContent = "";
    seconds = -1;
}

function incrementTimer() {
    if (!win) {
        seconds += 1;
        timer.textContent = seconds;
    }
}


function changeRed(x) {
    currRed += x;
    if (currRed < 0 || currRed > 250) {
        currRed -= x;
    }
    updateContent();
}

function changeGreen(x) {
    currGreen += x;
    if (currGreen < 0 || currGreen > 250) {
        currGreen -= x;
    }
    updateContent();
}

function changeBlue(x) {
    currBlue += x;
    if (currBlue < 0 || currBlue > 250) {
        currBlue -= x;
    }
    updateContent();
}

function updateContent() {
    if (!win) {
        clickAudio.play();
        updateCanvas();
        updateScore();
        checkWin();
    } else {
        showEnd();
    }
}

function updateCanvas() {
    canvas.style.cssText = `background-color: rgb(${currRed},${currGreen},${currBlue})`;
    console.log(currRed, currGreen, currBlue);
}

function updateScore() {
    redScore.textContent = currRed;
    greenScore.textContent = currGreen;
    blueScore.textContent = currBlue;

}

function checkWin() {
    if (currRed == goalRed && currGreen == goalGreen && currBlue == goalBlue) {
        win = true;
    }
}

function showEnd() {
    winningText.textContent = '★You won!★';
    saveHighScore();
    highScore.textContent = localStorage['high-score'];
}

function saveHighScore() {
    if (! localStorage['high-score']) {
        localStorage['high-score'] = seconds;
    } else if (seconds < localStorage['high-score']) {
        localStorage['high-score'] = seconds;
    }
    
}

// Script
var goalRed;
var goalGreen;
var goalBlue;

var currRed = 0;
var currGreen = 0;
var currBlue = 0;

const canvas = document.getElementById('canvas');
const goal = document.getElementById('goal');

var clickAudio = new Audio('audio.wav');

const redScore = document.getElementById('red-score');
const greenScore = document.getElementById('green-score');
const blueScore = document.getElementById('blue-score');

const winningText = document.getElementById('you-won');
var win = false;

var seconds = 0;
var timerVar = setInterval(incrementTimer, 1000);
const timer = document.getElementById('timer');

const highScore = document.getElementById('high-score');
highScore.textContent = localStorage['high-score'];


randomColor();
