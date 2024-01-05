import Dom from '../modules/DOMInteraction.js';
import taskManagement from '../modules/taskManagement.js';

export default { task };

const defaultWindow = document.createElement('form');
defaultWindow.id = 'window';

function task() {
    if (!Dom.windowState.isShown()) {
        const window = defaultWindow;
    window.classList.add('task-window');

    function inputFields() {
        const headerTitle = document.createElement('h3');
        const exitButton = document.createElement('button');
        const header = Dom.wrapInDiv(headerTitle, exitButton);
        header.classList = 'window-header';
        headerTitle.textContent = 'Create Task';
        exitButton.textContent = 'X';
        exitButton.classList = 'exit-button';
        exitButton.addEventListener('click', Dom.closeWindow);
        
        const titleLabel = Dom.createBasicLabel('Title:', 'task-title-input');
        const titleInput = Dom.createBasicInput('text', 'task-title-input', 'task-title-input');
        const title = Dom.wrapInDiv(titleLabel, titleInput);

        const dueDateLabel = Dom.createBasicLabel('Due Date:', 'task-due-date-input');
        const dueDateInput = Dom.createBasicInput('date', 'task-due-date-input', 'task-due-date-input');
        const dueDate = Dom.wrapInDiv(dueDateLabel, dueDateInput);
                
        const descriptionLabel = Dom.createBasicLabel('Description:', 'task-description-input');
        const descriptionInput = Dom.createBasicInput('text', 'task-description-input', 'task-description-input');
        const description = Dom.wrapInDiv(descriptionLabel, descriptionInput);

        const priorityLabel = Dom.createBasicLabel('Priority:', 'task-priority-input');
        const priorityInput = Dom.createBasicInput('range', 'task-priority-input', 'task-priority-input');
        const priorityCounter = document.createElement('span');
        priorityInput.setAttribute('min', '1');
        priorityInput.setAttribute('max', '5');
        priorityInput.addEventListener('input', () => priorityCounter.textContent = priorityInput.value);
        priorityCounter.textContent = priorityInput.value;
        const priority = Dom.wrapInDiv(priorityLabel, Dom.wrapInDiv(priorityInput, priorityCounter));
        
        const notesLabel = Dom.createBasicLabel('Notes:', 'task-notes-input');
        const notesInput = Dom.createBasicInput('text', 'task-notes-input', 'task-notes-input');
        const notes = Dom.wrapInDiv(notesLabel, notesInput);

        const submitButton = document.createElement('button');
        submitButton.type = 'button';
        submitButton.classList = 'submit-button';
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', () => {
            taskManagement.createTask(titleInput.value, dueDateInput.value, description.value, priorityInput.value, notesInput.value);
        });

        return [ header, title, dueDate, description, priority, notes, submitButton ]//array of input field elements
    }

    Dom.appendElement(window, inputFields());

    return window;//element
    }
}