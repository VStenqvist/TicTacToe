console.log("JS file Loading properly");
//gameboard module, controlls the gameboard and its parts
const GameBoard = (() => {
    let gameBoard = ['', '', '', '', '', '', '', '', '', ];
    let emptySpots = gameBoard.length;
    let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];


    return {
        gameBoard,
        emptySpots,
        winConditions
    }
})();


const playerFactory = (sign, name) => {

    return {
        sign,
        name
    };
};

const player1 = playerFactory('X',"Player 1");
const player2 = playerFactory('O', "Player 2");



//controller for the game, controlls the html aspects and the player functionalities
const GameController = (() => {
    let _Squares = document.querySelectorAll('.gameSquares');
    let restartBtn = document.querySelector('.restartBtn');
    let winnerMsgModal = document.querySelector('.winnerBanner');
    let playerSquare1 = document.querySelector('.player1');
    let playerSquare2 = document.querySelector('.player2');
    let startScreen = document.querySelector('.startScreen');
    let pvpBtn = document.querySelector('.PvPbtn');
    let pvaiBtn = document.querySelector('.PvAIbtn');
    let haveWinner = false;
    //Default active player is player1 || X character
    let activePlayer = player1;
    _Squares.forEach((element, index) => {
        element.addEventListener('click', (e) => {
            
            _checkIfFree(element, index);
            _declareDraw();
            // element.style.pointerEvents = "none";
        })
    });
    //Swap player function
    const _swapPlayer = () => {
        if (activePlayer === player1) {
            activePlayer = player2;
            playerSquare2.classList.add('activeSquare');
            playerSquare1.classList.remove('activeSquare');
        } else if (activePlayer === player2) {
            activePlayer = player1;
            playerSquare1.classList.add('activeSquare');
            playerSquare2.classList.remove('activeSquare');
        }
    };


    const _placeSign = (element, index) => {
        GameBoard.emptySpots--;

        element.innerHTML = activePlayer.sign;
        GameBoard.gameBoard[index] = activePlayer.sign;
        if (activePlayer === player1) {
           // console.log(player1.sign);

        } else if (activePlayer === player2) {
            //console.log(player2.sign);
        }
    };

    const _checkIfFree = (element, index) => {
        //Checks if the spot in the board is free and if it is, places activePlayers sign then swaps player
        if (element.innerHTML === "" || GameBoard.gameBoard[index] === "") {
           // console.log("empty");
            _placeSign(element, index);
            _checkWin();
            _swapPlayer();
        } else console.log("not empty so do nothing");
    }

    //function that checks if a player has won
    const _checkWin = () => {
        //Compare the positions in gameBoard array to winConditions array and see if there are activePlayers signs 3 in a row.
        GameBoard.winConditions.forEach((item,index) => {
            if (GameBoard.gameBoard[item[0]] === activePlayer.sign && GameBoard.gameBoard[item[1]] === activePlayer.sign && GameBoard.gameBoard[item[2]] === activePlayer.sign) {
                console.log(activePlayer.name + " wins!");
                haveWinner = true;
                _displayWinnerMessage();
            }
        });
    };
    //Function that checks for a draw scenario, Declares draw and declares win at the same time at the moment, need to check if wincondition is true first!!!!
    const _declareDraw = () => {
        if (GameBoard.emptySpots == 0 && haveWinner == false) {
            console.log("gameboard is full, and draw");
        } else {
           // console.log("Empty spots: " + GameBoard.emptySpots);
        }

    };


    const restartGame = () =>{
        GameBoard.gameBoard = ['', '', '', '', '', '', '', '', '', ];
        GameBoard.emptySpots =GameBoard.gameBoard.length;
        haveWinner = false;
        activePlayer = player1;
        _hideWinnerMessage();
        _Squares.forEach(element => {
            element.innerHTML = "";
        });
        playerSquare1.classList.add('activeSquare');
        playerSquare2.classList.remove('activeSquare');
    }

    const _displayWinnerMessage = () =>{
        console.log('winner message is displayed');
        winnerMsgModal.style.display= "flex";
        winnerMsgModal.innerHTML = `${activePlayer.sign} wins the round!`;
        console.log(winnerMsgModal);
    }

    const _hideWinnerMessage = () =>{
        winnerMsgModal.style.display = "none";
        winnerMsgModal.innerHTML = ``;
    }

    restartBtn.addEventListener('click',restartGame);
    pvpBtn.addEventListener('click', () =>{
        startScreen.style.display = "none";
    });
    pvaiBtn.addEventListener('click', () =>{
        startScreen.style.display = "none";
    });
    return {_displayWinnerMessage};
})();