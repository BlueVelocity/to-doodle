import Dom from '../modules/DOMInteraction.js';
import projectManagement from '../modules/projectManagement.js';
import projectBar from './projectBar.js';
import taskManagement from '../modules/taskManagement.js';

export default { project, task };

const defaultPopUp = document.createElement('form');
defaultPopUp.id = 'popUp';

function header(title) {
    const headerTitle = document.createElement('h3');
    const exitButton = document.createElement('button');
    const header = Dom.wrapInDiv(headerTitle, exitButton);
    header.classList = 'popUp-header';
    headerTitle.textContent = title;
    exitButton.textContent = 'X';
    exitButton.classList = 'exit-button';
    exitButton.addEventListener('click', (event) => Dom.closePopUp(event));

    return header;
}

function submitButton() {
    const submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.classList = 'submit-button';
    submitButton.textContent = 'Submit';

    submitButton.addEventListener('click', (event) => Dom.closePopUp(event));


    return submitButton;
}

function project() {
    if (!Dom.popUpState.isShown()) {
        const popUp = defaultPopUp;
    popUp.classList.add('project-popUp');

    function inputFields() {
        const popUpHeader = header('Create Project');

        const titleLabel = Dom.createBasicLabel('Title:', 'project-title-input');
        const titleInput = Dom.createBasicInput('text', 'project-title-input', 'project-title-input');
        const title = Dom.wrapInDiv(titleLabel, titleInput);

        const submitBtn = submitButton(titleInput.value);
        submitBtn.addEventListener('click', () => {
            projectManagement.createProject(titleInput.value)
            projectBar.regenerateProjects();
        });

        return [ popUpHeader, title, submitBtn ]//array of input field elements
    }

    Dom.appendElement(popUp, inputFields());

    return popUp;//element
    }
}

function task() {
    if (!Dom.popUpState.isShown()) {
    const popUp = defaultPopUp;
    popUp.classList.add('task-popUp');

    function inputFields() {
        const popUpHeader = header('Create Task');

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

        const submitBtn = submitButton();
        submitBtn.addEventListener('click', () => {
            taskManagement.createTask(titleInput.value, dueDateInput.value, descriptionInput.value, priorityInput.value, notesInput.value);
        });

        return [ popUpHeader, title, dueDate, description, priority, notes, submitBtn ]//array of input field elements
    }

    Dom.appendElement(popUp, inputFields());

    return popUp;//element
    }
}