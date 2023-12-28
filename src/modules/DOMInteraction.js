export default { appendElement };

//Accepts an element | variable as first argument, followed by the elements | array to append
function appendElement(parentElement, elements) {
    elements.forEach(element => parentElement.appendChild(element))
}