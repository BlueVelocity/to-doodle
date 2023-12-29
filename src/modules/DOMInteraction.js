export default { appendElement, isWindowShown, showWindow, closeWindow };

const data = { windowIsShown: false}

//Accepts an element | variable as first argument, followed by the elements | array to append
function appendElement(parentElement, elements) {
    elements.forEach(element => parentElement.appendChild(element))
}

function isWindowShown() {
    return data.windowIsShown;
}

function showWindow(windowElement) {
    document.body.appendChild(windowElement);
    data.windowIsShown = true;
}

function closeWindow(windowElement) {
    data.windowIsShown = false;
}