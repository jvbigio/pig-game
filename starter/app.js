/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
const diceEl = document.querySelector('.dice');
let rollDiceEl = document.querySelector('.btn-roll');
//let roundScoreEl = document.querySelector(`#current-${activePlayer}`);
const player1GlobalScore = document.getElementById('score-0');
const player1RoundScore = document.getElementById('current-0');
const player2GlobalScore = document.getElementById('score-1');
const player2RoundScore = document.getElementById('current-1');
const player1PanelEl = document.querySelector('.player-0-panel');
const player2PanelEl = document.querySelector('.player-1-panel');
let holdBtnEl = document.querySelector('.btn-hold');
const newGameEl = document.querySelector('.btn-new');

// const globalScoreEl = document.querySelector(`#score-${activePlayer}`);
// document.querySelector(`#current-${activePlayer}`).textContent = dice;
// var x = document.querySelector('#score-0').textContent; // player 1 globalScore

let scores, roundScore, activePlayer, gamePlaying;

init();

rollDiceEl.addEventListener('click', _ => {
  if (gamePlaying) {
    // 1. Random number
    let dice = Math.floor(Math.random() *6) + 1;
    // 2. display result
    diceEl.style.display = 'block';
    diceEl.src = `dice-${dice}.png`;
    // 3. Update roundscore IF the rolled number !== 1
    if (dice !== 1) {
      roundScore += dice; // Add score
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
      //roundScoreEl.textContent = roundScore;
    } else {
      nextPlayer(); // 4. Next player
    }
  }
});

holdBtnEl.addEventListener('click', _ => {
  if (gamePlaying) {
    // Add current round score to global score
    scores[activePlayer] += roundScore;
    // Update UI
    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    // Check if player won the game
    if (scores[activePlayer] >= 15) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
      diceEl.style.display = 'none';
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      gamePlaying = false;
    } else {
      // next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    player1RoundScore.textContent = '0';
    player2RoundScore.textContent = '0';
    player1PanelEl.classList.toggle('active');
    player2PanelEl.classList.toggle('active');
    diceEl.style.display = 'none';
}

newGameEl.addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  diceEl.style.display = 'none';
  player1RoundScore.textContent = 0;
  player2RoundScore.textContent = 0;
  player1GlobalScore.textContent = 0;
  player2GlobalScore.textContent = 0;
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

// state var tells condition of a system, aka the state of something

/* Coding Challenges:
Change the game to follow these rules

1. A player loses ENTIRE score if rolls two 6's in a row. After that, it's the next player's
turn. (Hint: Always save the previous dice roll in a seperate variable)


*/