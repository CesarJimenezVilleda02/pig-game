'use strict';

// se seleccionan al principio para no andar seleccionando como mecos a
// cada rato
// con el el especificamos que se hace referencia a todo el elemento
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// se definen
let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
    // si se definieran aqui adentro solo serían accesibles aqui
    // state
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    // reset GUI
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    // reset players states
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

// se asignan las condiciones iniciales
init();

const switchPayer = () => {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // la añade o la remueve si está o no está
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

// TIRAR DADO
// como no se reusa se puede escribir directamente
// generar roll aleatorio
// mostrar dado
// si es uno se cambia a otro jugador
btnRoll.addEventListener('click', () => {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        if (dice !== 1) {
            // añadir el dice al current score
            currentScore += dice;
            // current0El.textContent = currentScore;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPayer();
        }
    }
});

btnHold.addEventListener('click', () => {
    if (playing) {
        // añadir el current score a la del activo
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // revisar si el score y aes de 100 y terminar el juego,
        // sino cambiar al siguiente
        if (scores[activePlayer] >= 20) {
            playing = false;
            // recierda qu ecuando agarras por clase lleva un punto
            document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.toggle('player--winner');
        } else switchPayer();
    }
});

// va sin parentesis porque el que la llama es JS
btnNew.addEventListener('click', init);
