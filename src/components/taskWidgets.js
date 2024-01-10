import Dom from '../modules/DOMInteraction.js';
import taskData from '../modules/taskManagement.js';
import projectData from '../modules/projectManagement.js';

export default { generateProjectWidgets }

function generateWidgetElement(task) {
    const taskWidget = document.createElement('div');
    taskWidget.classList = 'task-widget';

    function generateWidgetContent() {
        const title = document.createElement('p');
        title.textContent = task.title;

        const dueDate = document.createElement('p');
        dueDate.textContent = task.dueDate;
    
        const checkBox = Dom.createBasicInput('input', `task-completed`, `task-completed`)
        checkBox.type = 'checkbox';
        checkBox.textContent = 'checkBox';
    
        const deleteButton = document.createElement('button');
        deleteButton.classList = 'delete-button';
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', event => {
            event.stopPropagation()
        })

        return [ title, dueDate, checkBox, deleteButton ]
    }

    taskWidget.addEventListener('click', (event) => {
        const taskWidgets = document.querySelectorAll('.task-widget');
        taskWidgets.forEach( element => element.classList = 'task-widget');
        
        const selectedWidget = event.target;
        selectedWidget.classList = 'task-widget selected';

        // projectData.setCurrentProject(event.target.id);
        // taskContent.loadProjectTasks(event.target.id);
    })

    Dom.appendElement(taskWidget, generateWidgetContent());

    return taskWidget;
}

function generateProjectWidgets() {
    const projects = projectData.getProjects();
    const tasks = projects[`${projectData.getCurrentProjectNum()}`].tasks.map( (task) => {
        return generateWidgetElement(task);
    });

    if (tasks.length > 0) {
        tasks[0].classList = 'task-widget selected';
    }
    
    return tasks
}

function loadTaskInformation() {

}

//will display the title and date of the todo, along wih an edit and delete button