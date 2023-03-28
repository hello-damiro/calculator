let lineOneDisplay = []; // 25 chars
let lineTwoDisplay = []; // 12 chars, 14 incl 1 and period
let pressedKeysArray = [];
let equationArray = [];

let numbersAllowed = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
let operandsAllowed = ['*', '/', '+', '-']; // MDAS

let lineOneText = document.querySelector('#lcd > h2');
let lineTwoText = document.querySelector('#lcd > h3');

getKeyPressed();

function getKeyPressed() {
    let keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
        key.addEventListener('mousedown', () => {
            key.classList.add('pressed');
        });
        key.addEventListener('mouseup', () => {
            key.classList.remove('pressed');
        });
        key.addEventListener('mouseleave', () => {
            key.classList.remove('pressed');
        });
    });

    // GUI
    let numbers = document.querySelectorAll('.number');
    numbers.forEach((number) => {
        number.addEventListener('click', () => {
            updateNumberPressed(number.getAttribute('value'));
        });
    });

    let operands = document.querySelectorAll('.operand');
    operands.forEach((operand) => {
        operand.addEventListener('click', () => {
            updateEquation(operand.getAttribute('value'));
        });
    });

    document.querySelector('.equal').addEventListener('click', performCalculation);
    document.querySelector('.c').addEventListener('click', deleteLastChar);
    document.querySelector('.ac').addEventListener('click', clearAll);

    // KEYBOARD
    document.addEventListener('keydown', function (event) {
        // TODO: on key press animate GUI
        const key = event.key; // "a", "1", "Shift", etc.
        if (numbersAllowed.includes(key)) updateNumberPressed(key);
        else if (operandsAllowed.includes(key)) updateEquation(key);
        else if ((key = '=')) performCalculation();
        else if ((key = 'Backspace')) deleteLastChar();
        else if ((key = 'Delete')) clearAll();
    });
}

function deleteLastChar() {
    equationArray.push(pressedKeysArray.join(''));
    lineTwoText.textContent = equationArray[equationArray.length - 1];
}

function clearAll() {
    pressedKeysArray = [];
    equationArray = [];
    lineOneText.textContent = '';
    lineTwoText.textContent = '0';
}

function performCalculation() {
    console.log('performing calculation ...');
}

function updateEquation(operand) {
    equationArray.push(pressedKeysArray.join(''));
    equationArray.push(operand);
    pressedKeysArray = [];
    lineTwoText.textContent = '';

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

    lineOneText.textContent = lineOneDisplay;
    console.log('equation: ' + equationArray);
}

function updateNumberPressed(number) {
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
