'use strict'
const MINE = '💥';
const FLAG = '🚩';
const EMPTY = '';

var isFirstClick = true;
var gBoard;
var gLevel;

var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

function initGame() {
   updateLevel();

}

function restartGame(size) {
    var mine;

    switch (size) {
        case 4:
            mine = 2
            break;
        case 8:
            mine = 12
            break;
        case 12:
            mine = 30
            break;
    }

    updateLevel(size, mine);
}

function updateLevel(size = 4, mines = 2) {
    isFirstClick = true;
    gGame.isOn = true;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gGame.secsPassed = 0;
    gLevel = {
        SIZE: size,
        MINES: mines
    };
    gBoard = buildBoard(gLevel);
    renderBoard(gBoard);

    timerRunning = false;
    resetTimer();
    document.querySelector('.timer').innerText = '00:00:00';
    document.querySelector('.end').innerText = '';
    disableRightClick();
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
                isMarked: false
            }
        }
    }

    console.log(board)
    return board;
}

function placeMines(board) {
    console.log(gLevel);
    var count = gLevel.MINES;

    while (count > 0) {
        var rowIdx = getRandomInt(0, gLevel.SIZE);
        var colIdx = getRandomInt(0, gLevel.SIZE);
        if (!board[rowIdx][colIdx].isMine) {
            board[rowIdx][colIdx].isMine = true;
            board[rowIdx][colIdx].minesAroundCount = MINE;
            count--;
        }
    }
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
    strHTML += `<tr><th colspan="${board.length}"><button
    onclick="restartGame(${board.length})">🙂</button>
    </th></tr>`;

    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>\n`;
        for (var j = 0; j < board[0].length; j++) {
            var className = 'cell cell' + i + '-' + j;
            if (board[i][j].isMine) className += ' mine';
            strHTML += `\t<td class="${className}" onmousedown=
            "cellClicked(this, event, ${i}, ${j})"></td>\n`;
        }
        strHTML += '</tr>\n'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector('.board-container');
    elContainer.innerHTML = strHTML;
    console.log(elContainer)
}

function cellClicked(elCell, event, i, j) {
    if (!gGame.isOn) return;
    if (gBoard[i][j].isShown) return;
    if (isFirstClick) {
        placeMines(gBoard);
        setMinesNegsCount(gBoard);

        timerRunning = true;
        updateTimer();
        isFirstClick = false;
    }

    if (event.button === 2) {
        cellMarked(elCell, i, j);
    } else if (event.button === 0) {
        elCell.classList.add('shown');
        var cell = gBoard[i][j];
        cell.isShown = true;
        elCell.innerHTML = cell.minesAroundCount;
        gGame.shownCount++;
        switch(cell.minesAroundCount) {
            case MINE:
                gameOver();
                document.querySelector('.end').innerText = 'Game over!';
                break;
            case '':
                expandShown(gBoard, i, j);
                break;
            default:
                elCell.innerHTML = cell.minesAroundCount;
                break;
        }
    }

    checkGameOver();
}

function cellMarked(elCell, i, j) {
    if (gBoard[i][j].isMarked) {
        elCell.innerHTML = EMPTY;
        gGame.markedCount--;
        gBoard[i][j].isMarked = false;
    } else {
        elCell.innerHTML = FLAG;
        gGame.markedCount++;
        gBoard[i][j].isMarked = true;
    }
}

function gameOver(){
    gGame.isOn = false;

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].minesAroundCount === MINE) {
                var currCell = gBoard[i][j]
                currCell.isShown = true; 
                document.querySelector(`.cell${i}-${j}`).innerHTML = currCell.minesAroundCount;              
            }
        }
    }

    timerRunning = false;
    resetTimer();
}

function checkGameOver() {
    var countShownMarked = gGame.shownCount + gGame.markedCount 
    if (countShownMarked === gBoard.length * gBoard[0].length) {
        gameOver();
        document.querySelector('.end').innerText = 'Game done! 👌';
    } 
    else return;
}

function expandShown(board, i, j) {
    for (var rowIdx = i - 1; rowIdx <= i + 1; rowIdx++) {
        if (rowIdx < 0 || rowIdx >= board.length) continue;
        for (var colIdx = j - 1; colIdx <= j + 1; colIdx++) {
            if (colIdx < 0 || colIdx >= board[0].length) continue;
            if (rowIdx === i && colIdx === j) continue;
            var currCell = board[rowIdx][colIdx];
            console.log(rowIdx, colIdx, currCell)
            currCell.isShown = true;
            var elCurrCell = document.querySelector(`.cell${rowIdx}-${colIdx}`);
            elCurrCell.innerHTML = currCell.minesAroundCount;
            elCurrCell.classList.add('shown');
            gGame.shownCount++;
        }
    }
}