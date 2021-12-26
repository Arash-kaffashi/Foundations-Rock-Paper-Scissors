const ALLOWED_PLAY = ["rock", "paper", "scissors"];

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
 * 
 * @param {String} promptString 
 * @param {[String]} options 
 * @param {Boolean} caseSentive 
 * @returns answer within the options
 */
function getValidAnswer(promptString, options, caseSentive = false) {
    let valid = false;
    let answer;

    if (!caseSentive) {
        options = options.map(option => option.toLowerCase());
    } 

    do {
        answer = prompt(promptString);
        
        if (!caseSentive) answer = answer.toLowerCase();
        if (options.includes(answer)) valid = true;
        else alert("Your answer was invalid, try again!");
    } while (!valid);

    return answer;
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
    winner() {
        return this.player >= 3 ? "player" :
            this.computer >= 3 ? "computer" :
                null;
    }
}

/**
 * Runs the game 5 times
 */
function game() {
    let run = true;
    let currentScore = new Score();

    console.clear();
    do {
        let round = 0;
        currentScore.reset();
        console.log("New Game (Best of 5)");

        do {
            let playerchoice = getValidAnswer("What will you throw? (rock, paper, scissors)", ALLOWED_PLAY);
            let computerchoice = computerPlay();

            switch( playRound(playerchoice, computerchoice) ) {
                case 0:
                    console.log(`${round}. Draw!`);
                    break;
                case 2:
                case 3:
                case 7:
                    currentScore.addPlayer();
                    console.log(`${round}. You Win! ${playerchoice} beats ${computerchoice}`);
                    break;
                case 1:
                case 5:
                case 6:
                    currentScore.addComputer();
                    console.log(`${round}. You Lose! ${computerchoice} beats ${playerchoice}`);
                    break;
            }
            round++;
        } while (!currentScore.winner());
        console.log(`${currentScore.winner()} win!`);
        console.log('---');
        run = getValidAnswer("Do you want to play again? (y, n)", ['y', 'n']) === 'y' ? true : false;
    } while (run === true)
}

game();