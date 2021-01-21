'use strict'

var isMarkCoveredCell = false;
var gSafeClickCount = 2;

function markCoveredCell(elButton) {
    if (gSafeClickCount < 0) return;
    var count = 1;

    while (count > 0) {
        var rowIdx = getRandomInt(0, gLevel.SIZE);
        var colIdx = getRandomInt(0, gLevel.SIZE);
        var currCell = gBoard[rowIdx][colIdx];
        var elCurrCell = document.querySelector(`.cell${rowIdx}-${colIdx}`);
        if (!currCell.isMine && !currCell.isShown) {
            isMarkCoveredCell = true;
            elCurrCell.classList.add('mark');
            elButton.innerText = 'Safe Click: ' + gSafeClickCount;
            gSafeClickCount--;
            count--;
            setTimeout(() => {
                isMarkCoveredCell = false;
                elCurrCell.classList.remove('mark');
            }, 1000);
        } 
    }
}