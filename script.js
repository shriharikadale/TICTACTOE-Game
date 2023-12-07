const board = document.getElementById('board');
const result = document.getElementById('result');
const newGameBtn = document.getElementById('newGameBtn');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function createCell(index) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', index);
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            gameActive = false;
            result.textContent = `Player ${currentPlayer} wins!`;
            showNewGameButton();
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        result.textContent = 'It\'s a draw!';
        showNewGameButton();
    }
}

function initializeGame() {
    for (let i = 0; i < 9; i++) {
        createCell(i);
    }

    newGameBtn.addEventListener('click', startNewGame);
}

function startNewGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    result.textContent = '';
    currentPlayer = 'X';

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
    });

    hideNewGameButton();
}

function showNewGameButton() {
    newGameBtn.style.display = 'block';
}

function hideNewGameButton() {
    newGameBtn.style.display = 'none';
}

initializeGame();
