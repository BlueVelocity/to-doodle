import Dom from '../modules/DOMInteraction';
import projectBar from './projectBar';
import projectData from '../modules/projectManagement';
import taskContent from './taskContent';

export default { generateWidgets }

function generateWidgets() {
    const projects = projectData.getProjects();

    const keys = Object.keys(projects);

    const projectWidgets = keys.map( (projectKey) => {
        const projectWidget = document.createElement('div');
        
        if (projectData.getCurrentProjectNum() == projectKey) {
            projectWidget.classList = 'project-widget selected';
        } else {
            projectWidget.classList = 'project-widget';
        }
        projectWidget.textContent = projects[`${projectKey}`][`title`];
        //data id identifier used to get object 
        projectWidget.id = projectKey;

        projectWidget.addEventListener('click', (event) => {
            const projectWidgets = document.querySelectorAll('.project-widget');
            projectWidgets.forEach( element => element.classList = 'project-widget');
            
            const selectedWidget = event.target;
            selectedWidget.classList = 'project-widget selected';

            projectData.setCurrentProject(event.target.id);
            taskContent.loadProjectTasks(event.target.id);
        })

        //delete button attached to widget
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.classList = 'delete-button';
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', event => {
            event.stopPropagation();
            projectData.deleteProjectById(event.target.parentElement.getAttribute('id'));
            projectBar.regenerateProjects();
        })

        Dom.appendElement(projectWidget, [ deleteButton ])

        return projectWidget;
    })

    return projectWidgets;
}