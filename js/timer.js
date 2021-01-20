'use strict'

var elTimer = document.querySelector(".timer");

var startTime = new Date().getTime();
var time;
var convertTime;
var timerRunning = false;

function convertMiliToFormat() {
    let min = Math.floor(time / (60 * 1000));
    if (min === 60)
    min = 0;
    let sec = Math.floor((time % (60 * 1000)) / 1000);
    if (sec === 60)
    sec = 0;
    let mil = Math.floor((time % 1000) / 10);
    if (mil === 100)
    mil = 0;
    convertTime = leadingZero(min) + ":" + leadingZero(sec) + ":" + leadingZero(mil);
    elTimer.innerHTML = convertTime; 
}

function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// start timer
function calcualtTimeInMili() {
    if (timerRunning) {
        time = new Date().getTime() - startTime;
        convertMiliToFormat();
    }
}

function updateTimer() {
    setInterval(calcualtTimeInMili, 10);
}

function resetTimer() {
    startTime = new Date().getTime();
}