let numbersAllowed = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
let operandsAllowed = ['*', '/', '+', '-']; // MDAS

let lineOneDisplay = []; // 25 chars
let lineTwoDisplay = []; // 12 chars, 14 incl 1 and period

let pressedKeysArray = [];
let equationArray = [];

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

    document.querySelector('.equal').addEventListener('click', finalizeCalculation);
    document.querySelector('.c').addEventListener('click', deleteLastChar);
    document.querySelector('.ac').addEventListener('click', clearAll);

    // KEYBOARD
    document.addEventListener('keydown', function (event) {
        // TODO: on key press animate GUI
        const key = event.key;
        if (numbersAllowed.includes(key)) {
            let btns = document.querySelectorAll('.number');
            btns.forEach((btn) => {
                if (btn.getAttribute('value') === key) btn.classList.add('pressed');
            });
            updateNumberPressed(key);
        } else if (operandsAllowed.includes(key)) {
            let btns = document.querySelectorAll('.operand');
            btns.forEach((btn) => {
                if (btn.getAttribute('value') === key) btn.classList.add('pressed');
            });
            updateEquation(key);
        } else if (key === '=' || key === 'Enter') {
            let btn = document.querySelector('.equal');
            btn.classList.add('pressed');
            finalizeCalculation();
        } else if (key === 'Backspace') {
            let btn = document.querySelector('.c');
            btn.classList.add('pressed');
            deleteLastChar();
        } else if (key === 'Delete') {
            let btn = document.querySelector('.ac');
            btn.classList.add('pressed');
            clearAll();
        }
    });

    document.addEventListener('keyup', function (event) {
        let keys = document.querySelectorAll('.key');
        keys.forEach((key) => {
            key.classList.remove('pressed');
        });
    });
}

function roundOff(value, round) {
    return parseInt(value * 10 ** (round + 1)) - parseInt(value * 10 ** round) * 10 > 4
        ? parseFloat(parseInt((value + parseFloat(1 / 10 ** round)) * 10 ** round)) / 10 ** round
        : parseFloat(parseInt(value * 10 ** round)) / 10 ** round;
}

function finalizeCalculation() {
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

            lineTwoText.textContent = roundOff(result, 14 - (index + 1)); // result TODO: limit to character display

            equationArray = [];
            pressedKeysArray = [];
            pressedKeysArray.push(result);
        } else {
            // Do nothing on simultaneous = press
        }
    }

    // console.log('FIN: ' + equationArray + ' | ' + pressedKeysArray);
}

function updateEquation(operand) {
    if (pressedKeysArray.length == 0) {
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
    // console.log('UEQ: ' + equationArray + ' | ' + pressedKeysArray);
}

function performCalculation(varB) {
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
    // console.log('Calculating: ' + varA + ' ' + operand + ' ' + varB + ' = ' + result);
    return result;
}

function deleteLastChar() {
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

function updateNumberPressed(number) {
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
    }
    updateLineTwo();
}

function clearAll() {
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
