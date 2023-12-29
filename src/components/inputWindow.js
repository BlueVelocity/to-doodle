import Dom from '../modules/DOMInteraction.js';

export default { taskInputWindow };

const defaultWindow = document.createElement('div');
defaultWindow.id = 'window';

function taskInputWindow() {
    const window = defaultWindow;
    window.classList.add('task-window');

    const working = document.createElement('p');
    working.textContent = 'The Task Input Window is Working!';

    window.appendChild(working);

    function inputFields() {
        
        return []//array of input field elements
    }

    return window;//element
}