import { format } from 'date-fns';
import ProjectData from './projectManagement.js';

export default { getToDoList, recordToDo };

let toDoList = [];

function getToDoList() {
    return toDoList;
}

function getToDoById(Id) {
    let selectedToDo;

    toDoList.forEach((toDo, index) => {
        if (toDo.Id === Id) {
            selectedToDo = [ toDo, index ];
        }
    });

    return selectedToDo;
}

function createToDo(title, description, dueDate, priority, notes, checklist) {
    const creationDate = format(new Date(), "MM/dd/yyyy");

    return{ title, description, dueDate, creationDate, priority, notes, checklist };
}

function recordToDo(...args) {
    const toDos = createToDo(...args);
    toDoList.push(toDos);
}

function editToDo(Id) {
    
}

function deleteToDo() {

}

//data to include: title, description, dueDate, priority, notes, checklist, projectId, Id

//will display the information contained within the todo (title, description, dueDate, priority, notes, checklist, and a drawing(?))