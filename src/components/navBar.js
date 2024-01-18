import Dom from '../modules/DOMInteraction';
import projectData from '../modules/projectManagement.js';
import inputWindow from './popUp.js';

export default function() {
    const navBar = document.createElement('div');
    navBar.id = 'nav-bar';

    Dom.appendElement(navBar, createNavBar());

    return navBar;
}

function createNavBar() {
    const logo = document.createElement('h1');
    logo.id = 'logo';
    logo.textContent = 'To-Doodle';

    const projectsTab = document.createElement('span');
    projectsTab.textContent = 'Projects';

    const calendarTab = document.createElement('span');
    calendarTab.textContent = 'Calendar';

    const contactinfoTab = document.createElement('span');
    contactinfoTab.textContent = 'Contact Info';

    const createTaskButton = document.createElement('button');
    createTaskButton.id = 'create-task';
    createTaskButton.textContent = 'Create Task';
    createTaskButton.addEventListener('click', () => {
        Dom.showPopUp(inputWindow.task())
    });

    return [ logo, projectsTab, calendarTab, contactinfoTab, createTaskButton ]
}

//nav-bar will contain multiple tabs including to do section, calendar, and contact info