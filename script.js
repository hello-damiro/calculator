let lineOneArray = []; // 25 chars
let lineTwoArray = []; // 14 chars
let pressedArray = [];
let equationArray = [];

let lineOneText = document.querySelector('#lcd > h2');
let lineTwoText = document.querySelector('#lcd > h3');
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

    key.addEventListener('click', () => {
        pressedArray.push(key.getAttribute('value'));
        lineTwoText.innerHTML = lineTwoArray;
        // console.log(pressedArray);
    });
});

function keyActions() {}
