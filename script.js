(function(){
    const createPlayer = (name, symbol) => {
        return {
            name,
            symbol
        };
    }

    const gameBoard = (() => {

    let board = Array(9).fill("");

    const checkWin = (symbol) => {
        const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]  
    ];
    return winPatterns.some(pattern => pattern.every(index => symbol === board[index]));
    }

    const resetBoard = () => {
        board = Array(9).fill("");
    }

    const getBoard = () => {
        return [...board];
    }

    const makeMove = (symbol, index) => {
        if(board[index] === ""){
            board[index] = symbol;
            return checkWin(symbol);
        }
        return false;
    }
    return {checkWin, resetBoard, getBoard, makeMove};
    })();

})();