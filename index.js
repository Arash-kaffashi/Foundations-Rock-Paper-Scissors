const ALLOWED_PLAY = ["Rock", "Paper", "Scissors"];

/**
 * @link Source https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number} random number in the min-max range
 */
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @returns {String} either ‘Rock’, ‘Paper’ or ‘Scissors’
 */
function computerPlay() {
    return ALLOWED_PLAY[getRandomIntInclusive(0, 2)];
}

/** 
 * Plays a single round of Rock Paper Scissors
 * @param {String} playerSelection player's selection, it is case-insensitive
 * @param {String} computerSelection
 * @returns {String} declare winner
 */
function playRound(playerSelection, computerSelection) {
    if ( playerSelection === computerSelection ) return 0;
    return 3 * ALLOWED_PLAY.indexOf(playerSelection) + ALLOWED_PLAY.indexOf(computerSelection);
}

class Score {
    constructor() {
        this.player = 0;
        this.computer = 0;
    }
    reset() {
        this.player = 0;
        this.computer = 0;
    }
    addPlayer() {
        this.player++;
    }
    addComputer() {
        this.computer++;
    }
    get winner() {
        return this.player >= 5 ? "player" :
            this.computer >= 5 ? "computer" :
                null;
    }
}

/**
 * 
 * @param {String} message Message to display
 * @param {Boolean} user Indicates if the message is a log or a command typed
 * @returns {undefined}
 */
function logtoBoard(message, user = false) {
    let p = document.createElement("p");
    p.appendChild(document.createTextNode(message));
    p.classList.add(user ? "command" : "log");
    logboard.appendChild(p);
}

class State {
    constructor() {
        this.round = 0;
        this.score = new Score();
    }
}

let state = new State();
const logboard = document.querySelector(".log-board");
const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");
const updateBoard = function(score) {
    playerScore.textContent = score.player;
    computerScore.textContent = score.computer;
}
const controls = document.querySelectorAll('.controls input');

const handlePlayer = function(e) {
    e.stopPropagation();
    
    let playerchoice = this.value;
    let computerchoice = computerPlay();

    logtoBoard(`You played ${playerchoice}`, true);

    switch( playRound(playerchoice, computerchoice) ) {
        case 0:
            logtoBoard(`It was a draw!`);
            break;
        case 2:
        case 3:
        case 7:
            state.score.addPlayer();
            logtoBoard(`You Win! ${playerchoice} beats ${computerchoice}`);
            break;
        case 1:
        case 5:
        case 6:
            state.score.addComputer();
            logtoBoard(`You Lose! ${computerchoice} beats ${playerchoice}`);
            break;
    }
    updateBoard(state.score);
    state.round++;
    
    if (state.score.winner) {
        logtoBoard(`${state.score.winner} won!`);
        logtoBoard('---');
        controls.forEach(button => button.disabled = true);
    }
}

controls.forEach(button => button.addEventListener('click', handlePlayer));