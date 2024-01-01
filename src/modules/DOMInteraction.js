//Accepts an element | variable as first argument, followed by the elements | array to append
function appendElement(parentElement, elements) {
    elements.forEach(element => parentElement.appendChild(element))
}

const windowState = (function() {
    const state = { windowIsShown: false};

    const isShown = function() {
        if (state.windowIsShown === false) {
            return false;
        } else {
            return true;
        }
    }

    const setFalse = function() {
        state.windowIsShown = false;
    }

    const setTrue = function() {
        state.windowIsShown = true;
    }

    return { isShown, setTrue, setFalse}
})();

function showWindow(windowElement) {
    if (!windowState.isShown()) {
        document.body.appendChild(windowElement);
        windowState.setTrue();
    } else {
        console.log('Error: Window present');
    }
}

function closeWindow(windowElement) {
    windowState.setFalse();
}

//takes in parameters| string and returns label element with attributes
function createBasicLabel(content, forInput) {
    const element = document.createElement('label');
    element.textContent = content;
    element.setAttribute('for', forInput);

    return element;
}

function createBasicInput(type, id, name) {
    const element = document.createElement('input');
    element.setAttribute('type', type);
    element.setAttribute('id', id);
    element.setAttribute('name', name);

    return element;
}

function wrapInDiv(...args) {
    const div = document.createElement('div');
    appendElement(div, args);
    return div;
}

export default { appendElement, windowState, showWindow, closeWindow, createBasicLabel, createBasicInput, wrapInDiv };