'use strict'

function hintClicked(elHint) {
    if (elHint.innerHTML === '🌟') return;
    elHint.innerHTML = '🌟';
    isHintClicked = true;
}

function hintRevealed(elCell, i, j) {
    elCell.innerHTML = gBoard[i][j].minesAroundCount;
    elCell.classList.add('shown');
    for (var rowIdx = i - 1; rowIdx <= i + 1; rowIdx++) {
        if (rowIdx < 0 || rowIdx >= gBoard.length) continue;
        for (var colIdx = j - 1; colIdx <= j + 1; colIdx++) {
            if (colIdx < 0 || colIdx >= gBoard[0].length) continue;
            if (rowIdx === i && colIdx === j) continue;
            var elCurrCell = document.querySelector(`.cell${rowIdx}-${colIdx}`);
            elCurrCell.innerHTML = gBoard[rowIdx][colIdx].minesAroundCount;
            elCurrCell.classList.add('shown');
        }
    }
}

function hintUnrevealed(elCell, i, j) {
    elCell.innerHTML = EMPTY;
    elCell.classList.remove('shown');
    for (var rowIdx = i - 1; rowIdx <= i + 1; rowIdx++) {
        if (rowIdx < 0 || rowIdx >= gBoard.length) continue;
        for (var colIdx = j - 1; colIdx <= j + 1; colIdx++) {
            if (colIdx < 0 || colIdx >= gBoard[0].length) continue;
            if (rowIdx === i && colIdx === j) continue;
            if (gBoard[rowIdx][colIdx].isShown) continue;
            var elCurrCell = document.querySelector(`.cell${rowIdx}-${colIdx}`);
            elCurrCell.innerHTML = EMPTY;
            elCurrCell.classList.remove('shown');
        }
    }
}