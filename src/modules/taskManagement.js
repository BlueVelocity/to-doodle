import { format } from 'date-fns';
import projectData from './projectManagement.js';

export default { createTask, deleteTask };

let taskList = {};
let idCounter = 1;

const increaseIdCounter = function() {
    idCounter++;
}

function createTask(title, description, dueDate, priority, notes, checklist) {
    const creationDate = format(new Date(), "MM/dd/yyyy");
    appendTaskList({ title, description, dueDate, creationDate, priority, notes, checklist });
    console.log(getTaskList());
}

function appendTaskList(task) {
    taskList[`${idCounter}`] = task;
    increaseIdCounter();
}

function deleteTask(taskId) {
    delete taskList[`${taskId}`];
}

function editTask(Id, ) {
    
}

//data to include: title, description, dueDate, priority, notes, checklist, projectId, Id

//will display the information contained within the todo (title, description, dueDate, priority, notes, checklist, and a drawing(?))