/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, currentScore, activePlayer, gamePlaying;
const diceDOM = document.querySelector(".dice");
let winValue = 100;
let diceArray = [];
newGame();

// document.querySelector(`#current-${activePlayer}`).textContent = dice;
// document.querySelector(`#current-${activePlayer}`).innerHTML = `<em>${dice}<em>`

document.querySelector(".btn-set").addEventListener("click", () => {
  winValue = document.getElementById("winvalue").value;
});

document.querySelector(".dice").style.display = "none";

document.querySelector("#score-0").textContent = scores[0];
document.querySelector("#score-1").textContent = scores[1];
document.querySelector("#current-0").textContent = "0";
document.querySelector("#current-1").textContent = "0";

document.querySelector(".btn-roll").addEventListener("click", () => {
  if (gamePlaying) {
    let dice = Math.floor(Math.random() * 6) + 1;
    //   document.querySelector(`#current-${activePlayer}`).textContent = dice;
    //display the img for the number

    diceDOM.style.display = "block";
    diceDOM.src = `dice-${dice}.png`;

    // if dice != 1 update currentScore
    if (dice != 1) {
      // update score
      //variable to save previusRoll
      diceArray.push(dice);
      let previusRoll = diceArray[diceArray.length - 2];

      currentScore += dice;
      document.querySelector(
        `#current-${activePlayer}`
      ).textContent = currentScore;
      //if previusRoll && dice == 6
      if (previusRoll == 6 && dice == 6) {
        // //total score =0
        scores[activePlayer] = 0;
        // //other player turn
        document.querySelector("#score-" + activePlayer).textContent =
          scores[activePlayer];
        nextPlayer();
      }
    } else {
      // next player
      nextPlayer();
    }
  }
});

// hold button
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += currentScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= winValue) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-new").addEventListener("click", newGame);

function nextPlayer() {
  //Next player
  diceArray = [];
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  currentScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector(".dice").style.display = "none";
}

function newGame() {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  gamePlaying = true;
  winValue = 100;
  document.getElementById("winvalue").value = 100;
  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

// //if previusRoll && dice == 6
// //total score =0
// //other player turn
// nextPlayer();
