document.querySelector('#area').onclick = () => {
    debounce(init);
    throttle(init);
    init('normal');
}

const normalDisplay = document.querySelector('#normal');
const throttleDisplay = document.querySelector('#throttle');
const debounceDisplay = document.querySelector('#debounce');
let timerId, timerId2;

function debounce(func) {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
        func('debounce');
        timerId = undefined;
    }, 400);
}

function throttle(func) {
    if (timerId2) return;

    func('throttle');
    timerId2 = setTimeout(() => {
        timerId2 = undefined;
    }, 400);
}

function createElement() {
    const div = document.createElement('div');
    return div;
}

function init(id) {
    const newDiv = createElement()
    document.querySelector(`#${id}`).appendChild(newDiv)
}
