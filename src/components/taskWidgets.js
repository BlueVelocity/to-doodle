import Dom from '../modules/DOMInteraction.js';
import taskData from '../modules/taskManagement.js';
import projectData from '../modules/projectManagement.js';
import trashIcon from '../icons/garbage_3234849.png';
import taskContent from './taskContent.js';
import taskInfo from './taskInformation.js';
import storage from '../modules/storageManagement.js';

export default { generateProjectWidgets, checkCurrentCheckbox, uncheckCurrentCheckbox }

function loadTaskInfoFromParentId(event) {
    const taskWidgets = document.querySelectorAll('.task-widget');
    taskWidgets.forEach( element => element.classList = 'task-widget');
    
    const selectedWidget = event.target.parentElement;
    selectedWidget.classList = 'task-widget selected';

    taskData.setCurrentTask(Number(selectedWidget.getAttribute('data-task-id')))

    taskInfo.showTaskInfo();
}

function generateWidgetElement(task) {
    const taskWidget = document.createElement('div');
    if (task.taskId == taskData.getCurrentTaskNum()) {
        taskWidget.classList = 'task-widget selected';
    } else {
        taskWidget.classList = 'task-widget';
    }
    taskWidget.setAttribute('data-task-id', `${task.taskId}`);

    function generateWidgetContent() {
        const title = document.createElement('p');
        title.textContent = task.title;

        const dueDate = document.createElement('p');
        dueDate.textContent = task.dueDate;

        title.addEventListener('click', event => loadTaskInfoFromParentId(event));
        dueDate.addEventListener('click', event => loadTaskInfoFromParentId(event));

        taskWidget.addEventListener('click', (event) => {
            const taskWidgets = document.querySelectorAll('.task-widget');
            taskWidgets.forEach( element => element.classList = 'task-widget');
            
            const selectedWidget = event.target;
            selectedWidget.classList = 'task-widget selected';
    
            taskData.setCurrentTask(Number(selectedWidget.getAttribute('data-task-id')))
    
            taskInfo.showTaskInfo();
        })
    
        const checkBox = Dom.createBasicInput('input', `task-completed`, `task-completed`);
        checkBox.setAttribute('data-task-checkbox-id', task.taskId);
        checkBox.type = 'checkbox';
        checkBox.textContent = 'checkBox';
        if (task.completed === true) {
            checkBox.checked = true;
        }

        checkBox.addEventListener('click', event => {
            if (projectData.getTaskById(Number(event.target.getAttribute('data-task-checkbox-id'))).completed === true) {
                projectData.getTaskById(Number(event.target.getAttribute('data-task-checkbox-id'))).completed = false;
                event.target.checked = false;
                if (Number(event.target.parentElement.getAttribute('data-task-id')) === taskData.getCurrentTaskNum()) {
                    const taskCompleteButton = document.getElementById('task-complete-button');
                    taskCompleteButton.textContent = 'Incomplete';
                    taskCompleteButton.classList = 'task-incomplete';
                }
            } else if (projectData.getTaskById(Number(event.target.getAttribute('data-task-checkbox-id'))).completed === false) {
                projectData.getTaskById(Number(event.target.getAttribute('data-task-checkbox-id'))).completed = true;
                event.target.checked = true;
                if (Number(event.target.parentElement.getAttribute('data-task-id')) === taskData.getCurrentTaskNum()) {
                    const taskCompleteButton = document.getElementById('task-complete-button');
                    taskCompleteButton.textContent = 'Complete';
                    taskCompleteButton.classList = '';
                }
            }
            
            storage.setStorage();
        })
    
        const deleteButton = document.createElement('button');
        deleteButton.classList = 'delete-button';

        const img = new Image();
        img.src = trashIcon;
        deleteButton.appendChild(img);

        deleteButton.addEventListener('click', event => {
            const widgetTaskId = Number(event.target.parentElement.getAttribute('data-task-id'))
            
            taskData.deleteTask(widgetTaskId);
            taskContent.removeTaskById(event.target.parentElement.getAttribute('data-task-id'));

            storage.setStorage();

            if (widgetTaskId === taskData.getCurrentTaskNum()) {
                taskInfo.removeTaskInfo();
            }
        })

        Dom.multiStopPropogation(title, dueDate, checkBox, deleteButton);

        return [ title, dueDate, checkBox, deleteButton ]
    }

    taskWidget.addEventListener('click', (event) => {
        const taskWidgets = document.querySelectorAll('.task-widget');
        taskWidgets.forEach( element => element.classList = 'task-widget');
        
        const selectedWidget = event.target;
        selectedWidget.classList = 'task-widget selected';

        taskData.setCurrentTask(Number(selectedWidget.getAttribute('data-task-id')))

        taskInfo.showTaskInfo();
    })

    Dom.appendElement(taskWidget, generateWidgetContent());

    return taskWidget;
}

function generateProjectWidgets() {
    const project = projectData.getProjects()[`${projectData.getCurrentProjectNum()}`];

    function checkIfCurrentTaskIsPresent() {
        let answer = false;
        project.tasks.forEach( task => {
            if (task.taskId === taskData.getCurrentTaskNum()) {
                answer = true;
            }
        })
        return answer;
    }

    const tasks = project.tasks.map( (task) => {
        return generateWidgetElement(task);
    });

    if (tasks.length > 0 && !checkIfCurrentTaskIsPresent()) {
        tasks[0].classList = 'task-widget selected';
    } else if (checkIfCurrentTaskIsPresent()){
        const taskWidgetElement = document.querySelectorAll(`[data-task-id="${taskData.getCurrentTaskNum()}"]`);
        taskWidgetElement.classList = 'task-widget selected'
    }
    
    return tasks
}

function checkCurrentCheckbox() {
    document.querySelector(`[data-task-checkbox-id='${taskData.getCurrentTaskNum()}']`).checked = true;
}

function uncheckCurrentCheckbox() {
    document.querySelector(`[data-task-checkbox-id='${taskData.getCurrentTaskNum()}']`).checked = false;
}