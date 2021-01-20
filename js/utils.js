'use strict'

function disableRightClick() {
    window.addEventListener(
        'contextmenu',
        function (e) {
            e.preventDefault();
        },
        false
    );
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}