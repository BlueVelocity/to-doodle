import projectData from '../modules/projectManagement';

export default { generateWidgets }

function generateWidgets() {
    const projects = projectData.getProjects();

    const keys = Object.keys(projects);

    const projectWidgets = keys.map( (projectKey) => {
        const projectWidget = document.createElement('div');
        
        projectWidget.classList = 'project-widget';
        projectWidget.textContent = projects[`${projectKey}`][`title`];
        //data id identifier used to get object 
        projectWidget.id = projectKey;

        projectWidget.addEventListener('click', (event) => {
            const projectWidgets = document.querySelectorAll('.project-widget');
            projectWidgets.forEach( element => element.classList = 'project-widget');
            
            const selectedWidget = event.target;
            selectedWidget.classList = 'project-widget selected';
        })

        return projectWidget;
    })

    return projectWidgets;
}