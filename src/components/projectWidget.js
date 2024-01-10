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

        return projectWidget;
    })

    return projectWidgets;
}