import projectData from '../modules/projectManagement';

export default { constructWidgets }

function constructWidgets() {
    const projects = projectData.getProjects();

    const projectWidgets = projects.map( (projectData) => {
        const projectWidget = document.createElement('div');
        
        projectWidget.classList = 'project-widget';
        projectWidget.textContent = projectData.name;
        projectWidget.id = projectData.Id;

        return projectWidget;
    })
        
    return projectWidgets;
}



//need function to add project with attached identifier to tasks.  Add data-project attribute to both the project and related todo widgets

//contains the styling for the widget and incorporates the logic from the project management module