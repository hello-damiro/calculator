import {
    numbersAllowed,
    operandsAllowed,
    updateNumberPressed,
    updateEquation,
    finalizeCalculation,
    deleteLastChar,
    clearAll,
} from '../script.js';

export function getKeyPressed() {
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
