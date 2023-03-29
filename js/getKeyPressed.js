import {
    numbersAllowed,
    operandsAllowed,
    updateNumberPressed,
    updateEquation,
    finalizeCalculation,
    deleteLastChar,
    clearAll,
} from '/script.js';

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
        const key = event.key; // "a", "1", "Shift", etc.
        if (numbersAllowed.includes(key)) updateNumberPressed(key);
        else if (operandsAllowed.includes(key)) updateEquation(key);
        else if ((key = '=')) finalizeCalculation();
        else if ((key = 'Backspace')) deleteLastChar();
        else if ((key = 'Delete')) clearAll();
    });
}
