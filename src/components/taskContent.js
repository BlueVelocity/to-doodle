import Dom from '../modules/DOMInteraction.js';
import taskWidgets from './taskWidgets.js';
import taskInformation from './taskInformation.js';
import projectData from '../modules/projectManagement.js';

export default { firstLoad, clearWidgets, loadProjectTasks };

function firstLoad() {
    const mainContent = document.createElement('div');
    mainContent.classList = 'main-content';

    Dom.appendElement(mainContent, createMainContent());

    return mainContent;
}

function createMainContent() {
    const taskWidgetsContainer = document.createElement('div');
    taskWidgetsContainer.classList = 'task-widget-container';
    Dom.appendElement(taskWidgetsContainer, taskWidgets.generateProjectWidgets());

    const taskInformationContainer = document.createElement('div');
    taskInformationContainer.classList = 'task-information-container';

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