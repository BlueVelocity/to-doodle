import Dom from '../modules/DOMInteraction';
import popUp from './popUp';
import projectWidgets from './projectWidget';

export default function() {
    const projectBar = document.createElement('div');
    projectBar.id = 'side-bar';

    Dom.appendElement(projectBar, createProjectBar());

    return projectBar;
}

function createProjectBar() {
    const createProjectButton = document.createElement('button');
    createProjectButton.id = 'create-project';
    createProjectButton.textContent = 'Create Project';
    createProjectButton.addEventListener('click', () => {
        Dom.showPopUp(popUp.project())
    });

    const projectWidgetContainer = document.createElement('div');
    projectWidgetContainer.classList = 'project-widget-container';

    Dom.appendElement(projectWidgetContainer, projectWidgets())

    

    return [ createProjectButton, projectWidgetContainer ]
}

//will need function to insert new projectWidget component

//side bar to contain separate project tabs