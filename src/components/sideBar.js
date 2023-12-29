import Dom from '../modules/DOMInteraction';
import projectWidgets from './projectWidgets';

export default function() {
    const sideBar = document.createElement('div');
    sideBar.id = 'side-bar';

    Dom.appendElement(sideBar, createSideBar());

    return sideBar;
}

function createSideBar() {
    const addProjectButton = document.createElement('button');
    addProjectButton.textContent = 'Create Project';

    const projectWidgetContainer = document.createElement('div');
    projectWidgetContainer.classList = 'project-widget-container';

    Dom.appendElement(projectWidgetContainer, projectWidgets())

    return [ addProjectButton, projectWidgetContainer ]
}

//will need function to insert new projectWidget component

//side bar to contain separate project tabs