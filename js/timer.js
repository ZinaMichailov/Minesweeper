'use strict'

var startTime = new Date().getTime();
var time;
var convertTime;
var timerRunning = false;

var bestTimeBeginner = null;
var convertBestTimeBeginner;

var bestTimeMedium = null;
var convertBestTimeMedium;

var bestTimeExpert = null;
var convertBestTimeExpert;


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

function updateBestTime(size) {

    switch (size) {
        case 4:
            updateBestTimeBeginner();
            break;
        case 8:
            updateBestTimeMedium();
            break;
        case 12:
            updateBestTimeExpert();
            break;
    }
}

function updateBestTimeBeginner(){
    if (bestTimeBeginner === null || bestTimeBeginner > time) {
        bestTimeBeginner = time;
        convertBestTimeBeginner = convertTime;
        localStorage.setItem('best time beginner', convertBestTimeBeginner);
        document.querySelector('.beginner').innerText = convertBestTimeBeginner;
    }
}

function updateBestTimeMedium(){
    if (bestTimeMedium  === null || bestTimeMedium  > time) {
        bestTimeMedium  = time;
        convertBestTimeMedium = convertTime;
        localStorage.setItem('best time medium', convertBestTimeMedium);
        document.querySelector('.medium').innerText = convertBestTimeMedium;
    }
}

function updateBestTimeExpert(){
    if (bestTimeExpert  === null || bestTimeExpert > time) {
        bestTimeExpert  = time;
        convertBestTimeExpert = convertTime;
        localStorage.setItem('best time expert', convertBestTimeExpert);
        document.querySelector('.expert').innerText = convertBestTimeExpert;
    }
}