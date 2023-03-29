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

export function deleteLastChar() {
    if (pressedKeysArray.length == 0) {
        // Get last variable in equationArray
        if (equationArray.length != 0) {
            if (operandsAllowed.includes(equationArray[equationArray.length - 1])) {
                equationArray.pop();
            } else {
                pressedKeysArray = [...equationArray[equationArray.length - 1]]; // string to array
                pressedKeysArray.pop();
                equationArray.pop();
            }
            updateLineOne();
        }
    } else {
        pressedKeysArray.pop();
    }
    updateLineTwo();
}

export function updateEquation(operand) {
    if (pressedKeysArray.length == 0) {
        equationArray.pop();
        equationArray.push(operand);
    } else {
        equationArray.push(pressedKeysArray.join(''));
        equationArray.push(operand);
    }

    updateLineOne();

    // Reset Display Line two
    lineTwoText.textContent = '';
    pressedKeysArray = [];
}

export function performCalculation() {
    console.log('performing calculation ...');
}

export function updateNumberPressed(number) {
    pressedKeysArray.push(number);
    updateLineTwo();
}

export function clearAll() {
    pressedKeysArray = [];
    equationArray = [];
    lineOneDisplay = [];
    lineTwoDisplay = [];
    lineOneText.textContent = '';
    lineTwoText.textContent = '0';
}

function updateLineTwo() {
    // Limit LCD display to 14 chars
    const lcdLineTwoLength = 14;
    if (pressedKeysArray.length >= lcdLineTwoLength) {
        lineTwoDisplay = pressedKeysArray.slice(
            pressedKeysArray.length - lcdLineTwoLength,
            pressedKeysArray.length
        );
    } else {
        lineTwoDisplay = pressedKeysArray.slice(0, lcdLineTwoLength);
    }

    // Display number pressed
    const pressedKeysString = lineTwoDisplay.join('');
    if (pressedKeysString == '') {
        lineTwoText.textContent = '0';
    } else {
        lineTwoText.textContent = pressedKeysString;
    }

    lineTwoDisplay = [];
}

function updateLineOne() {
    // Limit LCD display to 25 chars
    const lcdLineOneLength = 25;
    const equationString = equationArray.join('');
    if (equationString.length >= lcdLineOneLength) {
        lineOneDisplay = equationString.slice(
            equationString.length - lcdLineOneLength,
            equationString.length
        );
    } else {
        lineOneDisplay = equationString.slice(0, lcdLineOneLength);
    }

    // Display number pressed
    lineOneText.textContent = lineOneDisplay;
    lineOneDisplay = [];
}
