import Dom from '../modules/DOMInteraction.js';
import taskData from '../modules/taskManagement.js';
import taskWidgets from './taskWidgets.js';
import storage from '../modules/storageManagement.js';

export default { showTaskInfo, removeTaskInfo };

function removeTaskInfo() {
    const container = document.querySelector('.task-information');
    container.innerHTML = '';
}

function showTaskInfo() {
    let currentTask = taskData.getCurrentTask();

    const title = document.createElement('li');
    title.classList = 'task-title';
    title.textContent = currentTask.title;

    const dateCreated = document.createElement('li');
    dateCreated.textContent = `Date Created: ${currentTask.creationDate}`;

    const dueDate = document.createElement('li');
    dueDate.textContent = `Due: ${currentTask.dueDate}`;

    const description = document.createElement('li');
    if(currentTask.description === '') {
        description.textContent = `Description: N/A`;
    } else {
        description.textContent = `Description: ${currentTask.description}`;
    }

    const priority = document.createElement('li');
    priority.textContent = `Priority: ${currentTask.priority}`;

    const notes = document.createElement('li');
    if(currentTask.notes === '') {
        notes.textContent = `Notes: N/A`;
    } else {
        notes.textContent = `Notes: ${currentTask.notes}`;
    }

    const completed = document.createElement('button');
    completed.id = 'task-complete-button';
    if(currentTask.completed === true) {
        completed.textContent = 'Completed';
    } else {
        completed.textContent = 'Incomplete';
        completed.classList = 'task-incomplete';
    }

    completed.addEventListener('click', event => {
        if (event.target.classList.value === 'task-incomplete') {
            completed.textContent = 'Completed';
            currentTask.completed = true;
            event.target.classList = '';
            taskWidgets.checkCurrentCheckbox();
        } else {
            completed.textContent = 'Incomplete';
            currentTask.completed = false;
            event.target.classList = 'task-incomplete';
            taskWidgets.uncheckCurrentCheckbox();
        }

        storage.setStorage();
    })

    const container = document.querySelector('.task-information');
    container.innerHTML = '';

    const taskInfoList = document.createElement('ul');

    Dom.appendElement(taskInfoList, [ title, dateCreated, dueDate, description, priority, notes, completed ])
    container.appendChild(taskInfoList);    
}