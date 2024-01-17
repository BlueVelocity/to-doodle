import Dom from '../modules/DOMInteraction.js';
import taskWidgets from './taskWidgets.js';
import projectData from '../modules/projectManagement.js';

export default { firstLoad, clearWidgets, loadProjectTasks, removeTaskById };

function firstLoad() {
    const mainContent = document.createElement('div');
    mainContent.classList = 'main-content';

    Dom.appendElement(mainContent, createMainContent());

    return mainContent;
}

function createMainContent() {
    const taskWidgetsContainer = document.createElement('div');
    taskWidgetsContainer.classList = 'task-widget-container';

    if (Object.keys(projectData.getProjects()).length != 0) {
        Dom.appendElement(taskWidgetsContainer, taskWidgets.generateProjectWidgets());
    }

    const taskInformationContainer = document.createElement('div');
    taskInformationContainer.classList = 'task-information';

    return [ taskWidgetsContainer, taskInformationContainer ]
}

function clearWidgets() {
    const taskWidgetsContainer = document.querySelector('.task-widget-container');
    taskWidgetsContainer.innerHTML = '';
}

function loadProjectTasks() {
    clearWidgets();
    if (Object.keys(projectData.getProjects()).length != 0) {
        const taskWidgetsContainer = document.querySelector('.task-widget-container');
        Dom.appendElement(taskWidgetsContainer, taskWidgets.generateProjectWidgets());
    } else {
        console.log('Error: No projects to load task into');
    }
}

function removeTaskById(id) {
    document.querySelector(`[data-task-id='${id}']`).outerHTML = '';
}