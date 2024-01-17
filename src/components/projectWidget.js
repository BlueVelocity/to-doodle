import Dom from '../modules/DOMInteraction';
import projectBar from './projectBar';
import taskContent from './taskContent';
import taskInfo from './taskInformation';
import projectData from '../modules/projectManagement';
import trashIcon from '../icons/garbage_3234849.png';
import taskManagement from '../modules/taskManagement';
import storage from '../modules/storageManagement.js';

export default { generateWidgets }

function generateWidgets() {
    const projects = projectData.getProjects();

    const keys = Object.keys(projects);

    const projectWidgets = keys.map( (projectKey) => {
        const projectWidget = document.createElement('div');
        projectWidget.id = projectKey;

        if (projectData.getCurrentProjectNum() == projectKey) {
            projectWidget.classList = 'project-widget selected';
        } else {
            projectWidget.classList = 'project-widget';
        }

        projectWidget.addEventListener('click', (event) => {
            if (!event.target.classList.contains('selected')) {
                const projectWidgets = document.querySelectorAll('.project-widget');
                projectWidgets.forEach( element => element.classList = 'project-widget');
                
                const selectedWidget = event.target;
                selectedWidget.classList = 'project-widget selected';
    
                projectData.setCurrentProject(event.target.id);
                taskContent.loadProjectTasks(event.target.id);

                taskInfo.removeTaskInfo();
                if ((projectData.getProjects())[`${projectData.getCurrentProjectNum()}`].tasks.length != 0) {
                    taskManagement.setCurrentTask((projectData.getProjects())[`${event.target.id}`].tasks[0].taskId);
                    taskInfo.showTaskInfo();
                }
            }
        })

        const title = document.createElement('p');
        title.textContent = projects[`${projectKey}`][`title`];

        //delete button attached to widget
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.classList = 'delete-button';

        const img = new Image();
        img.src = trashIcon;
        deleteButton.appendChild(img);

        deleteButton.addEventListener('click', event => {
            event.stopPropagation();
            projectData.deleteProjectById(event.target.parentElement.getAttribute('id'));

            storage.setStorage();

            if (event.target.parentElement.getAttribute('id') == projectData.getCurrentProjectNum()) {
                taskContent.clearWidgets();

                if (Object.keys(projectData.getProjects()).length > 0 && event.target.parentElement.getAttribute('id') ) {
                    const projectsKeys = Object.keys(projectData.getProjects());
                    projectData.setCurrentProject(projectsKeys[projectsKeys.length -1]);
                    taskContent.loadProjectTasks();
                }
            }
            projectBar.regenerateProjects();
        })

        Dom.appendElement(projectWidget, [ deleteButton, title ])

        return projectWidget;
    })

    return projectWidgets;
}