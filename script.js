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
    let howToGuide = document.querySelector('.modal-outer');
    let pvpBtn = document.querySelector('.PvPbtn');
    let pvaiBtn = document.querySelector('.PvAIbtn');
    let howToGuideBtn = document.querySelector('.howToIcon');
    let modalCloseBtn = document.getElementById('modalCloseBtn');
    let haveWinner = false;
    var gameMode = "";
    //Default active player is player1 || X character
    let activePlayer = player1;
    let aiPlayer;
    _Squares.forEach((element, index) => {
        element.addEventListener('click', (e) => {

            _placeSign(element, index, activePlayer);
            _checkGameMode();
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

const _checkGameMode = () =>{
    if (gameMode === "PvP") {
        
    }
    else if(gameMode === "PvAI"){
        //dont swap player.
        aiPlayer = player2;
        _aiMove();
        console.log("PvAI is selected so do nothing");
    }
}
    const _placeSign = (element, index, chosenPlayer) => {
       
        GameBoard.emptySpots--;
        let isSquareEmpty = _checkIfFree(element,index);

        if(isSquareEmpty === true){
            console.log("Square is empty");
            element.innerHTML = chosenPlayer.sign;
            GameBoard.gameBoard[index] = chosenPlayer.sign;
            _checkWin();
            _swapPlayer();
        }

        else if( isSquareEmpty === false){
            //Square is already filled so places nothing
            console.log("Square is not empty");
        }

    };

    const _checkIfFree = (element, index) => {
        //Checks if the spot in the board is free and if it is, places activePlayers sign then swaps player
        if (element.innerHTML === "" || GameBoard.gameBoard[index] === "") {
           // console.log("empty");
            return true;
            // if(gameMode == "PvP"){
            //     _swapPlayer();
            // }
            // else if(gameMode == "PvAI"){
            //     //AI makes its moves
            //     console.log("AI places Sign");
            //     _aiMove();
            // }

        } else return false;
    }

    const _aiMove = () =>{
        let move = Math.floor((Math.random() * 8) + 1);
        console.log("ai move is run");
        let isSquareEmpty = _checkIfFree(_Squares[move],move);
        _declareDraw();
        if(isSquareEmpty === true){
            _placeSign(_Squares[move],move,aiPlayer)
        }
        else if(isSquareEmpty === false && GameBoard.emptySpots >0){
            _aiMove();
        };
        
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

    const _selectPvP = () =>{
        startScreen.style.display = "none";
        gameMode = "PvP";
        console.log(gameMode);
    }

    const _selectPvAI = () =>{
        startScreen.style.display = "none";
        console.log(gameMode);
        gameMode = "PvAI";
    }
  
    restartBtn.addEventListener('click',restartGame);

    howToGuideBtn.addEventListener('click', () =>{
        howToGuide.style.display = "flex";
 
    });

    howToGuide.addEventListener('click', () =>{
        howToGuide.style.display = "none";
    });

    modalCloseBtn.addEventListener('click', () =>{
        howToGuide.style.display = "none";
    });

    pvpBtn.addEventListener('click',_selectPvP);

    pvaiBtn.addEventListener('click',_selectPvAI);
    return {_displayWinnerMessage, _aiMove,_placeSign};
})();