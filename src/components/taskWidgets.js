import Dom from '../modules/DOMInteraction.js';
import taskData from '../modules/taskManagement.js';
import projectData from '../modules/projectManagement.js';

export default { loadWidgets }

function generateWidgetElement() {
    const widget = document.createElement('div');
    widget.classList = 'task-widget';

    function generateWidgetContent(taskId) {
        const title = document.createElement('p');
        title.textContent = 'Title Working'

        const dueDate = document.createElement('p');
        dueDate.textContent = '00.00.00';
    
        const checkBox = Dom.createBasicInput('input', `task-${taskId}-completed`, `task-${taskId}-completed`)
        checkBox.type = 'checkbox';
        checkBox.textContent = 'checkBox'
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete'

        return [ title, dueDate, checkBox, deleteButton ]
    }

    Dom.appendElement(widget, generateWidgetContent())

    return [ widget ];
}

function loadWidgets(projectId) {
        return generateWidgetElement(2);
        //create DOM elements that display:

        //taskData.title

        //taskData.date

        //taskData.checkbox (toggleable)

        //create DOM elements and listeners that allow for interaction with:
        //Todo view

        //Todo edit

        //Todo delete

        //toDo.Id must be used
        //needs to have the same data-project attribute as the project
}

//will display the title and date of the todo, along wih an edit and delete button