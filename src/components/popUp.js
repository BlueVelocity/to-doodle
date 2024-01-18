import { format, compareAsc } from 'date-fns';
import Dom from '../modules/DOMInteraction.js';
import projectData from '../modules/projectManagement.js';
import projectBar from './projectBar.js';
import taskData from '../modules/taskManagement.js';
import taskContent from './taskContent.js';
import taskInfo from '../components/taskInformation.js';
import storage from '../modules/storageManagement.js';

export default { project, task, editTask };

const defaultPopUp = document.createElement('div');
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
            titleInput.required = true;
            titleInput.maxLength = 48;
            const title = Dom.wrapInDiv(titleLabel, titleInput);

            const submitBtn = submitButton(titleInput.value);
            submitBtn.addEventListener('click', event => {
                if (projectData.projectTitleValidation(titleInput.value)) {
                    alert(`Your title cannot contain a word that is too long(11+ letters)\nor no words because I don't like it\n\nDo better this time`)
                } else {
                    projectData.createProject(titleInput.value);
                    projectBar.regenerateProjects();

                    storage.setStorage();
                
                    Dom.closePopUp(event)
                }
            });

            //insert all form elements into form
            const form = document.createElement('form');
            Dom.appendElement(form, [ title, submitBtn ])

            return [ popUpHeader, form ]//array of input field elements
        }

        Dom.appendElement(popUp, inputFields());

        return popUp;//element
    }
}

function task() {
    if (!Dom.popUpState.isShown()) {
        const popUp = defaultPopUp;

        function inputFields() {
            const popUpHeader = header('Create Task');

            const titleLabel = Dom.createBasicLabel('Title:', 'task-title-input');
            const titleInput = Dom.createBasicInput('text', 'task-title-input', 'task-title-input');
            titleInput.required = true;
            titleInput.maxLength = 28;
            const title = Dom.wrapInDiv(titleLabel, titleInput);

            const dueDateLabel = Dom.createBasicLabel('Due Date:', 'task-due-date-input');
            const dueDateInput = Dom.createBasicInput('date', 'task-due-date-input', 'task-due-date-input');
            dueDateInput.required = true;

            dueDateInput.addEventListener('input', input => {
                const creationDate = format(new Date(), "yyyy-MM-dd");

                if (compareAsc(creationDate, input.target.value) === -1 || compareAsc(creationDate, input.target.value) === 0) {        
                    input.target.setCustomValidity("")
                } else {
                    input.target.setCustomValidity("Invalid field.")
                }
            })
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
            submitBtn.addEventListener('click', event => {
                if (taskData.validateInputs(titleInput.value, dueDateInput.value, descriptionInput.value, priorityInput.value, notesInput.value)) {
                    taskData.createTask(titleInput.value, dueDateInput.value, descriptionInput.value, priorityInput.value, notesInput.value);
                    taskContent.loadProjectTasks();
                    taskInfo.showTaskInfo();

                    storage.setStorage();

                    Dom.closePopUp(event);
                } else {
                    alert(`Please ensure the title is less than 28 characters \nand the due date is beyond today's date`)
                }
            });

            //insert all form elements into form
            const form = document.createElement('form');
            Dom.appendElement(form, [ title, dueDate, description, priority, notes, submitBtn ])

            return [ popUpHeader, form ]//array of input field elements
        }

        Dom.appendElement(popUp, inputFields());

        return popUp;//element
    }
}

function editTask() {
    if (!Dom.popUpState.isShown()) {
        const popUp = defaultPopUp;
        const currentTask = taskData.getCurrentTask();

        function inputFields() {
            const popUpHeader = header(`Edit Task: ${currentTask.title}`);

            const titleLabel = Dom.createBasicLabel('Title:', 'task-title-input');
            const titleInput = Dom.createBasicInput('text', 'task-title-input', 'task-title-input');
            titleInput.required = true;
            titleInput.maxLength = 28;
            const title = Dom.wrapInDiv(titleLabel, titleInput);

            const dueDateLabel = Dom.createBasicLabel('Due Date:', 'task-due-date-input');
            const dueDateInput = Dom.createBasicInput('date', 'task-due-date-input', 'task-due-date-input');
            dueDateInput.required = true;

            dueDateInput.addEventListener('input', input => {
                const creationDate = currentTask.creationDate;

                if (compareAsc(creationDate, input.target.value) === -1 || compareAsc(creationDate, input.target.value) === 0) {        
                    input.target.setCustomValidity("")
                } else {
                    input.target.setCustomValidity("Invalid field.")
                }
            })
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
            submitBtn.addEventListener('click', event => {
                if (taskData.validateInputs(titleInput.value, dueDateInput.value, descriptionInput.value, priorityInput.value, notesInput.value)) {
                    currentTask.appendTask(titleInput.value, dueDateInput.value, descriptionInput.value, priorityInput.value, notesInput.value);
                    taskContent.loadProjectTasks();
                    taskInfo.showTaskInfo();

                    storage.setStorage();

                    Dom.closePopUp(event);
                } else {
                    alert(`Please ensure the title is less than 28 characters \nand the due date is beyond today's date`)
                }
            });

            //insert all form elements into form
            const form = document.createElement('form');
            Dom.appendElement(form, [ title, dueDate, description, priority, notes, submitBtn ])

            return [ popUpHeader, form ]//array of input field elements
        }

        Dom.appendElement(popUp, inputFields());

        return popUp;//element
    }
}