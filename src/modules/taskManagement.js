import { format } from 'date-fns';

export default { createTask, editTask, deleteTask, getTasksByid };

let taskList = {};
let idCounter = 1;

const increaseIdCounter = function() {
    idCounter++;
}

function createTask(title, description, dueDate, priority, notes, checklist) {
    const creationDate = format(new Date(), "MM/dd/yyyy");
    enterNewTask({ title, description, dueDate, creationDate, priority, notes, checklist });
}

function editTask(id, title, description, dueDate, priority, notes, checklist) {
    const taskDate = taskList[`${id}`].creationDate;
    taskList[`${id}`] = {title, description, taskDate, dueDate, priority, notes, checklist};
}

function enterNewTask(task) {
    taskList[`${idCounter}`] = task;
    increaseIdCounter();
}

function deleteTask(taskId) {
    delete taskList[`${taskId}`];
}

//input task Id's | array, outputs tasks in array
function getTasksByid(taskIds) {
    return taskIds.map( id => {
        taskList[`${id}`]
    })
}

//data to include: title, description, dueDate, priority, notes, checklist, projectId, Id

//will display the information contained within the todo (title, description, dueDate, priority, notes, checklist, and a drawing(?))