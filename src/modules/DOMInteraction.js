//Accepts an element | variable as first argument, followed by the elements | array to append
function appendElement(parentElement, elements) {
    elements.forEach(element => parentElement.appendChild(element))
}

const popUpState = (function() {
    const state = { popUpIsShown: false};

    const isShown = function() {
        return state.popUpIsShown;
    }

    const setFalse = function() {
        state.popUpIsShown = false;
    }

    const setTrue = function() {
        state.popUpIsShown = true;
    }

    return { isShown, setTrue, setFalse }
})();

//checks if a popUp exists and displays the popUp if it does not
function showPopUp(popUpElement) {
    if (!popUpState.isShown()) {
        document.body.appendChild(popUpElement);
        popUpState.setTrue();
    } else {
        console.log('Error: popUp present');
    }
}

function closePopUp(event) {
    event.preventDefault();

    var element = document.getElementById("popUp");
    element.innerHTML = null;
    element.parentNode.removeChild(element);
    popUpState.setFalse();
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

//takes in an arbitrary number of elements and returns a div containing the elements
function wrapInDiv(...args) {
    const div = document.createElement('div');
    appendElement(div, args);
    return div;
}

export default { appendElement, popUpState, showPopUp, closePopUp, createBasicLabel, createBasicInput, wrapInDiv };