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

export function finalizeCalculation() {}

export function updateEquation(operand) {}

export function performCalculation(varB) {
    let varA = equationArray[0];
    let operand = equationArray[1];
    let result;

    if (operand == '+') {
        result = parseFloat(varA) + parseFloat(varB);
    } else if (operand == '-') {
        result = parseFloat(varA) - parseFloat(varB);
    } else if (operand == '*') {
        result = parseFloat(varA) * parseFloat(varB);
    } else if (operand == '/') {
        result = parseFloat(varA) / parseFloat(varB);
    }
    console.log('Calculating: ' + varA + ' ' + operand + ' ' + varB + ' = ' + result);
    return result;
}

export function deleteLastChar() {
    if (pressedKeysArray.length == 0) {
        // Get last variable in equationArray
        if (equationArray.length != 0) {
            if (!operandsAllowed.includes(equationArray[equationArray.length - 1])) {
                pressedKeysArray = [...equationArray[equationArray.length - 1]]; // string to array
                pressedKeysArray.pop();
            }
            equationArray.pop();
            updateLineOne();
        }
    } else {
        pressedKeysArray.pop();
    }
    updateLineTwo();
}

export function updateNumberPressed(number) {
    if (number == '.') {
        // Check perieod
        if (pressedKeysArray.includes('.')) return;
        pressedKeysArray.push(number);
    } else if (number == '-') {
        // Toggle sign
        if (pressedKeysArray.includes('-')) {
            pressedKeysArray.splice(0, 1); // remove minus sign
        } else {
            pressedKeysArray.splice(0, 0, '-'); // Add minus sign
        }
    } else {
        pressedKeysArray.push(number);
    }
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
