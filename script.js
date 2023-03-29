import { getKeyPressed } from './js/getKeyPressed.js';

export let numbersAllowed = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
export let operandsAllowed = ['*', '/', '+', '-']; // MDAS

export let lineOneDisplay = []; // 25 chars
export let lineTwoDisplay = []; // 12 chars, 14 incl 1 and period

export let pressedKeysArray = [];
export let equationArray = [];

getKeyPressed();

let lineOneText = document.querySelector('#lcd > h2');
let lineTwoText = document.querySelector('#lcd > h3');

export function deleteLastChar() {}

export function updateEquation(operand) {}

export function updateNumberPressed(number) {
    pressedKeysArray.push(number);

    const lcdLineTwoLength = 14;
    if (pressedKeysArray.length >= lcdLineTwoLength) {
        lineTwoDisplay = pressedKeysArray.slice(
            pressedKeysArray.length - lcdLineTwoLength,
            pressedKeysArray.length
        );
    } else {
        lineTwoDisplay = pressedKeysArray.slice(0, lcdLineTwoLength);
    }

    lineTwoText.textContent = lineTwoDisplay.join('');
}

export function clearAll() {
    pressedKeysArray = [];
    equationArray = [];
    lineOneText.textContent = '';
    lineTwoText.textContent = '0';
}

export function performCalculation() {
    console.log('performing calculation ...');
}
