'use strict'

var gCountMinesUser = 0;

function placeMines(board, i, j) {
    var count = gLevel.MINES;

    while (count > 0) {
        var rowIdx = getRandomInt(0, gLevel.SIZE);
        var colIdx = getRandomInt(0, gLevel.SIZE);
        if (board[rowIdx][colIdx].isMine ||
           (rowIdx === i-1 || rowIdx === i || rowIdx === i + 1) && (colIdx === j - 1 || colIdx === j || colIdx === j + 1)) {
            continue;
        }
        board[rowIdx][colIdx].isMine = true;
        board[rowIdx][colIdx].minesAroundCount = MINE;
        count--;
    }
}

function placeMineByUser(elCell, i, j) {
    if (!isMineByUser) return;

    var count = gLevel.MINES - gCountMinesUser - 1;
    document.querySelector('.end').innerText = `You can put ${count} mines`;
    var currCell = gBoard[i][j];
    currCell.isMine = true;
    currCell.minesAroundCount = MINE;
    elCell.innerHTML = currCell.minesAroundCount;
    setTimeout(() => {
        elCell.innerHTML = EMPTY;
    }, 700);
    gCountMinesUser++;
    
    if (gCountMinesUser === gLevel.MINES) {
        document.querySelector('.end').innerText = `Play!`;
        isMineByUser = false;
        isMinesCreated = true;
    }
}

function minesByUser() {
    isMineByUser = true;
}