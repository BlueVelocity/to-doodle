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
    taskWidgetsContainer.classList = 'to-do-widget-container';

    // Dom.appendElement(taskWidgetsContainer, taskWidgets());

    // const taskInformationContainer = document.createElement('div');
    // taskInformationContainer.classList = 'to-do-information-container';
    // Dom.appendElement(taskInformationContainer, taskInformation());

    return [ taskWidgetsContainer ]
}
//will show to do information under each project