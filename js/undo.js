'use strict'

var gDoneActions = [];

function backCell(i, j) {
    var elCell = document.querySelector(`.cell${i}-${j}`);
    elCell.innerHTML = EMPTY;

    if (gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = false;
        gGame.markedCount--;
    } else {
        gBoard[i][j].isShown = false;
        elCell.classList.remove('shown');
        gGame.shownCount--;
    }
}

function undoClicked() {
    if (gDoneActions.length <= 0 || !gGame.isOn) return;
    var i = gDoneActions.pop();

    for (i; i > 0; i--) {
        var row = gDoneActions.pop();
        var col = gDoneActions.pop();
        backCell(row, col);
    }
}

function addAction(i, j) {
    gDoneActions.push(j);
    gDoneActions.push(i);
}