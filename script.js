let keys = document.querySelectorAll('.key');
keys.forEach((key) => {
    key.addEventListener('click', () => {
        console.log(key.getAttribute('value'));
    });
});
