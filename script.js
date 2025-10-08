const game = (function(){
     let board = Array(9).fill("");
     const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

     const createPlayer = (name, symbol) => {
        return {
            name,
            symbol
        };
     }

     const getBoard = () => {
        return[...board];
     }

     const resetBoard = () => {
        board = Array(9).fill("");
     }

     const checkWinner = (symbol) => {
        return winPatterns.some(pattern => pattern.every(index => board[index] === symbol));
     }

     const makeMove = (symbol, index) => {
        if(board[index] === ""){
            board[index] = symbol;
            return checkWinner(symbol);
        }
        else{
            return false;
        }
     }

     return{createPlayer, getBoard, resetBoard, checkWinner, makeMove};
})();


const doomInteracton = (function(){
    const boardContainer = document.querySelector('#table');
    const status = document.querySelector('#status');
    const resetBtn = document.querySelector('#restart-game');

    const player1 = game.createPlayer(prompt("Nume jucator 1: "), "X");
    const player2 = game.createPlayer(prompt("Nume jucator 2: "), "0");

    let currentPlayer = player1;
    let gameOver = false;

    const revealBoard = () => {
        const board = game.getBoard();
        document.querySelectorAll('.cell').forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    boardContainer.addEventListener('click', (e) => {
        const cell = e.target;
        if (!cell.classList.contains('cell') || gameOver) return;

        const index = parseInt(cell.dataset.index);
        const board = game.getBoard();

        if (board[index] !== "") return;

        const won = game.makeMove(currentPlayer.symbol, index);
        revealBoard();

        if (won) {
            status.textContent = `${currentPlayer.name} a castigat!`;
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            status.textContent = `Randul lui ${currentPlayer.name}`;
        }
    });

    resetBtn.addEventListener('click', () => {
        game.resetBoard();
        currentPlayer = player1;
        gameOver = false;
        revealBoard();
        status.textContent = `Randul lui ${currentPlayer.name}`;
    });
    
    revealBoard();
})();