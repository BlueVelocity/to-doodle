import Dom from '../modules/DOMInteraction.js';
import taskData from '../modules/taskManagement.js';
import projectData from '../modules/projectManagement.js';

export default { generateProjectWidgets }

function generateWidgetElement(task) {
    const widget = document.createElement('div');
    widget.classList = 'task-widget';

    function generateWidgetContent() {
        const title = document.createElement('p');
        title.textContent = task.title;

        const dueDate = document.createElement('p');
        dueDate.textContent = task.dueDate;
    
        const checkBox = Dom.createBasicInput('input', `task-completed`, `task-completed`)
        checkBox.type = 'checkbox';
        checkBox.textContent = 'checkBox';
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        return [ title, dueDate, checkBox, deleteButton ]
    }

    Dom.appendElement(widget, generateWidgetContent());

    return widget;
}

function generateProjectWidgets() {
    const projects = projectData.getProjects();
    return projects[`${projectData.getCurrentProjectNum()}`].tasks.map( (task) => {
        return generateWidgetElement(task);
    });
}

//will display the title and date of the todo, along wih an edit and delete button