import Dom from '../modules/DOMInteraction';
import projectWidget from './projectWidget';

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

    const defaultProjectWidget = document.createElement('div');
    defaultProjectWidget.classList = 'project-widget';

    const defaultProjectWidget1 = document.createElement('div');
    defaultProjectWidget1.classList = 'project-widget';
    const defaultProjectWidget2 = document.createElement('div');
    defaultProjectWidget2.classList = 'project-widget';
    const defaultProjectWidget3 = document.createElement('div');
    defaultProjectWidget3.classList = 'project-widget';
    const defaultProjectWidget4 = document.createElement('div');
    defaultProjectWidget4.classList = 'project-widget';
    const defaultProjectWidget5 = document.createElement('div');
    defaultProjectWidget5.classList = 'project-widget';

    Dom.appendElement(projectWidgetContainer, [ defaultProjectWidget, defaultProjectWidget1, defaultProjectWidget2,defaultProjectWidget3,defaultProjectWidget4,defaultProjectWidget5 ])

    return [ addProjectButton, projectWidgetContainer ]
}
//side bar to contain separate project tabs