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

function roundOff(value, round) {
    return parseInt(value * 10 ** (round + 1)) - parseInt(value * 10 ** round) * 10 > 4
        ? parseFloat(parseInt((value + parseFloat(1 / 10 ** round)) * 10 ** round)) / 10 ** round
        : parseFloat(parseInt(value * 10 ** round)) / 10 ** round;
}

export function finalizeCalculation() {
    if (pressedKeysArray.length == 0) {
        equationArray.pop();
    } else {
        if (equationArray.length >= 2) {
            // eqn complete
            const pressedKeysString = pressedKeysArray.join('');
            equationArray.push(pressedKeysString);

            const result = performCalculation(equationArray[2]);
            updateLineOne();

            let resultArray = [...String(result)];
            const index = resultArray.indexOf('.');
            console.log(index);

            lineTwoText.textContent = roundOff(result, 14 - (index + 1)); // result TODO: limit to character display

            equationArray = [];
            pressedKeysArray = [];
            pressedKeysArray.push(result);
        } else {
            console.log('equal nanaman?');
        }
    }

    console.log('FIN: ' + equationArray + ' | ' + pressedKeysArray);
}

export function updateEquation(operand) {
    if (pressedKeysArray.length == 0) {
        console.log('yah here?');
        equationArray.pop();
    } else {
        const pressedKeysString = pressedKeysArray.join('');
        equationArray.push(pressedKeysString);
    }

    if (equationArray.length != 0) {
        if (equationArray.length >= 2) {
            equationArray.splice(0, 3, performCalculation(equationArray[2]));
        }
        equationArray.push(operand);

        // Reset Display Line two
        lineTwoText.textContent = '';
        pressedKeysArray = [];
    }
    updateLineOne();
    console.log('UEQ: ' + equationArray + ' | ' + pressedKeysArray);
}

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
        if (equationArray.length == 0) {
            lineOneText.textContent = '';
        } else {
            if (!operandsAllowed.includes(equationArray[equationArray.length - 1])) {
                let lastVar = String(equationArray[equationArray.length - 1]);
                pressedKeysArray = [...lastVar]; // string to array
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
        const reArray = pressedKeysArray.join('');
        pressedKeysArray = [];
        pressedKeysArray = [...reArray];
        console.log(pressedKeysArray);
        // const rearray = pressedKeysArray.join('');
        // pressedKeysArray.push([...String(rearray)]);
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
