import Dom from '../modules/DOMInteraction';
import projectWidgets from './projectWidget';

export default function() {
    const projectBar = document.createElement('div');
    projectBar.id = 'side-bar';

    Dom.appendElement(projectBar, createProjectBar());

    return projectBar;
}

function createProjectBar() {
    const addProjectButton = document.createElement('button');
    addProjectButton.textContent = 'Create Project';

    const projectWidgetContainer = document.createElement('div');
    projectWidgetContainer.classList = 'project-widget-container';

    Dom.appendElement(projectWidgetContainer, projectWidgets())

    return [ addProjectButton, projectWidgetContainer ]
}

//will need function to insert new projectWidget component

//side bar to contain separate project tabs