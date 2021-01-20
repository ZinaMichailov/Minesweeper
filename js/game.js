'use strict'

var gBoard;
var gLevel;
    
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

function initGame() {
    updateLevel(4, 2);
 
}

function restartGame(size) {
    var level = {
        SIZE: size,
        MINES: 0
    };
    switch(size) {
        case 4:
            level.MINES = 2
            break;
        case 8:
            level.MINES = 12
            break;
        case 12:
            level.MINES = 30
            break;
    }

    updateLevel(level.SIZE, level.MINES);  
}

function updateLevel(size, mines) {
    var levelUpdate = {
        SIZE: size,
        MINES: mines
    };
    gBoard = buildBoard(levelUpdate);
    setMinesNegsCount(gBoard);
    renderBoard(gBoard);

    timerRunning = false;
    resetTimer();
    document.querySelector('.timer').innerText = '00:00:00';

    return levelUpdate
}

function buildBoard(gLevel) {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([]);
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: true
            }
        }
    }
    var count = gLevel.MINES;

    while (count > 0) {
        var rowIdx = getRandomInt(0, gLevel.SIZE);
        var colIdx = getRandomInt(0, gLevel.SIZE);
        if (!board[rowIdx][colIdx].isMine) {
            board[rowIdx][colIdx].isMine = true;
            board[rowIdx][colIdx].minesAroundCount = '💥';
            count--;
        }
    }

    console.log(board)
    return board;
}

function setMinesNegsCount(board) {
    var count = 0;

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isMine) {
                for (var rowIdx = i - 1; rowIdx <= i + 1; rowIdx++) {
                    if (rowIdx < 0 || rowIdx >= board.length) continue;
                    for (var colIdx = j - 1; colIdx <= j + 1; colIdx++) {
                        if (colIdx < 0 || colIdx >= board[0].length) continue;
                        if (rowIdx === i && colIdx === j) continue;
                        var currCell = board[rowIdx][colIdx];
                        if (currCell.isMine) count++;
                    }
                }
                if (count !== 0) {
                    board[i][j].minesAroundCount = count;
                    count = 0;
                } else {
                    board[i][j].minesAroundCount = '';
                }
            }
        }
    }
}

function renderBoard(board) {
    var strHTML = '<table border="0"><tbody>';
    strHTML += `<tr><th colspan="${board.length}"><button onclick="restartGame(${board.length})">🙂</button>
    </th></tr>`;

    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`;
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = 'cell cell' + i + '-' + j;
            if (board[i][j].isMine) className += ' mine';
            strHTML += `\t<td class="${className}" onmousedown="cellClicked(this, ${i}, ${j})"></td>\n`;
        }
        strHTML += '</tr>\n'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector('.board-container');
    elContainer.innerHTML = strHTML;
    console.log(elContainer)
}

function cellClicked(elCell, i, j) {
    elCell.onmousedown = function(event) {
        if (event.which == 3) {
            alert("right clicked!");
        } else if (event.which == 1) {
            var cell = gBoard[i][j];
            cell.isShown = true;
            elCell.innerHTML = cell.minesAroundCount;
            timerRunning = true;
            updateTimer();
        }
    }
}

function cellMarked(elCell) {

}

function checkGameOver() {

}

function expandShown(board, elCell, i, j) {

}