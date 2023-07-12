'use strict';

//Selecting the elements
const player0Element = document.querySelector('.player--0');
const current0Element = document.getElementById('current--0');
const score0Element = document.getElementById("score--0");
const player1Element = document.querySelector('.player--1');
const current1Element = document.getElementById('current--1');
const score1Element = document.getElementById("score--1");

const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// initial conditions of the game
let scores = [0, 0];
current0Element.textContent = 0;
current1Element.textContent = 0;
diceElement.classList.add("hidden");
let currentScore = 0;
let activePlayer = 0;
let playing = true;


const switchPlayer = () => {

    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');

}

// Rolling Dice
btnRoll.addEventListener('click', function () {
    if (playing) {

        const dice = Math.trunc(Math.random() * 6 + 1);
        diceElement.classList.remove('hidden');
        diceElement.src = `./DiceIcons/dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore
        }
        else { switchPlayer() }

    }
});

//Hold button 
btnHold.addEventListener('click', function () {
    if (playing) {

        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= 100) {

            playing = false;
            diceElement.classList.add('hidden');
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        }
        else { switchPlayer() }
    }
});

//Play again button 
btnNew.addEventListener('click', function () {

    document.getElementById(`score--0`).textContent = 0;
    document.getElementById(`score--1`).textContent = 0;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(".player--0").classList.add('player--active');

    currentScore = 0;
    scores = [0, 0];
    playing = true;

});