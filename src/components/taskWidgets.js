import Dom from '../modules/DOMInteraction.js';
import taskData from '../modules/taskManagement.js';
import projectData from '../modules/projectManagement.js';

export default function() {

    return taskData().map(toDo => {
        //create DOM elements that display:
        const toDoWidget = document.createElement('div');
        toDoWidget.classList = 'to-do-widget';
        toDoWidget.setAttribute('data-project', `${toDo.projectId}`);
        toDoWidget.setAttribute('data-toDoId', `${toDo.Id}`);
        //taskData.title
        const title = document.createElement('p');
        title.textContent = toDo.title;
        //taskData.date
        const creationDate = document.createElement('p');
        creationDate.textContent = toDo.date;
        //taskData.checkbox (toggleable)
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = projectData.Id + '-' + toDo.Id;

        //create DOM elements and listeners that allow for interaction with:
        //Todo view
        const viewButton = document.createElement('button');
        viewButton.classList = 'view-button';
        viewButton.textContent = 'View';
        //Todo edit
        const editButton = document.createElement('button');
        editButton.classList = 'edit-button';
        editButton.textContent = 'Edit';
        //Todo delete
        const deleteButton = document.createElement('button');
        deleteButton.classList = 'delete-button';
        deleteButton.textContent = 'Delete';

        //toDo.Id must be used
        //needs to have the same data-project attribute as the project
        Dom.appendElement(toDoWidget, [ title, creationDate, radio, viewButton, editButton, deleteButton ])

        return toDoWidget;
    })

}

//will display the title and date of the todo, along wih an edit and delete button