import Dom from '../modules/DOMInteraction.js';
import taskData from '../modules/taskManagement.js';
import taskWidgets from './taskWidgets.js';
import inputWindow from './popUp.js';
import storage from '../modules/storageManagement.js';
import icon from '../icons/edit.png';

export default { showTaskInfo, removeTaskInfo };

function removeTaskInfo() {
    const container = document.querySelector('.task-information');
    container.innerHTML = '';
}

function showTaskInfo() {
        if (taskData.getCurrentTask() != undefined) {
        let currentTask = taskData.getCurrentTask();

        const titleText = document.createElement('li');
        titleText.classList = 'task-title';
        titleText.textContent = currentTask.title;

        const editButton = document.createElement('button');
        const editIcon = new Image();
        editIcon.src = icon;
        editButton.appendChild(editIcon);

        editButton.addEventListener('click', () => Dom.showPopUp(inputWindow.editTask()))

        const title = Dom.wrapInDiv(titleText, editButton);

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
}