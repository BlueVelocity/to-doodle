import Dom from '../modules/DOMInteraction';
import ToDoWidgets from './toDoWidgets.js';
import ToDoInformation from './toDoInformation.js';

export default function() {
    const mainContent = document.createElement('div');
    mainContent.classList = 'main-content';

    Dom.appendElement(mainContent, createMainContent());

    return mainContent;
}

function createMainContent() {
    const toDoWidgetsContainer = document.createElement('div');
    toDoWidgetsContainer.classList = 'to-do-widget-container';

    // Dom.appendElement(toDoWidgetsContainer, ToDoWidgets());

    // const toDoInformationContainer = document.createElement('div');
    // toDoInformationContainer.classList = 'to-do-information-container';
    // Dom.appendElement(toDoInformationContainer, ToDoInformation());

    return [ toDoWidgetsContainer ]
}
//will show to do information under each project