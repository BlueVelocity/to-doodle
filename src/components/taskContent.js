import Dom from '../modules/DOMInteraction.js';
import taskWidgets from './taskWidgets.js';
import taskInformation from './taskInformation.js';

export default function() {
    const mainContent = document.createElement('div');
    mainContent.classList = 'main-content';

    Dom.appendElement(mainContent, createMainContent());

    return mainContent;
}

function createMainContent() {
    const taskWidgetsContainer = document.createElement('div');
    taskWidgetsContainer.classList = 'task-widget-container';
    Dom.appendElement(taskWidgetsContainer, taskWidgets.loadWidgets());

    const taskInformationContainer = document.createElement('div');
    taskInformationContainer.classList = 'task-information-container';

    return [ taskWidgetsContainer, taskInformationContainer ]
}
//will show to do information under each project