import Dom from '../modules/DOMInteraction';
import popUp from './popUp';
import projectWidgets from './projectWidget';
import projectData from '../modules/projectManagement';

export default { firstLoad, regenerateProjects }

const projectWidgetContainer = document.createElement('div');
projectWidgetContainer.classList = 'project-widget-container';

function firstLoad() {
    const projectBar = document.createElement('div');
    projectBar.id = 'side-bar';

    Dom.appendElement(projectBar, loadProjectBar());

    return projectBar;
}

function loadProjectBar() {
    const createProjectButton = document.createElement('button');
    createProjectButton.id = 'create-project';
    createProjectButton.textContent = 'Create Project';
    createProjectButton.addEventListener('click', () => {
        Dom.showPopUp(popUp.project())
    });

    Dom.appendElement(projectWidgetContainer, projectWidgets.generateWidgets())

    return [ createProjectButton, projectWidgetContainer ]
}

function regenerateProjects() {
    projectWidgetContainer.innerHTML = '';
    Dom.appendElement(projectWidgetContainer, projectWidgets.generateWidgets())
}