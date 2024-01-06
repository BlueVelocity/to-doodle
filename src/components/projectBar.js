import Dom from '../modules/DOMInteraction';
import popUp from './popUp';
import projectWidgets from './projectWidget';

export default { projectBar }

function projectBar() {
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

    Dom.appendElement(projectWidgetContainer, projectWidgets.constructWidgets())

    return [ createProjectButton, projectWidgetContainer ]
}

//will need function to insert new projectWidget component
function displayProjectWidgets() {

}

function refreshWidgets() {

}

//side bar to contain separate project tabs