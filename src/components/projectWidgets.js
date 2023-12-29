import projectData from '../modules/projectManagement';

export default function() {
    const defaultProjectWidget = document.createElement('div');
    defaultProjectWidget.classList = 'project-widget';

    return [ defaultProjectWidget ];
}

//need function to add project with attached identifier to tasks.  Add data-project attribute to both the project and related todo widgets

//contains the styling for the widget and incorporates the logic from the project management module