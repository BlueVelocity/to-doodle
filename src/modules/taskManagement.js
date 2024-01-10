import { format, compareAsc } from 'date-fns';
import projectData from './projectManagement';

export default { createTask };

function validateInputs(title, dueDate, description, priority, notes) {
    function checkTitle(title) {
        if ( title.length > 0 && title.length <= 28) {
            return true;
        } else {
            return false;
        }
    }

    function checkDueDate(dueDate) {
        if (dueDate) {
            const creationDate = format(new Date(), "yyyy-MM-dd");

            return (compareAsc(creationDate, dueDate) === -1 || compareAsc(creationDate, dueDate) === 0)
        } else {
            return false;
        }
    }

    function checkDescription(desc) {
        return true;
    }

    function checkPriority(priority) {
        if (priority >= 1 && priority <= 5) {
            return true;
        } else {
            return false;
        }
    }

    function checkNotes(notes) {
        return true;
    }

    return ![checkTitle(title), checkDueDate(dueDate), checkDescription(description), 
        checkPriority(priority), checkNotes(notes)].includes(false);
}

function createTask(title, dueDate, description, priority, notes) {
    const creationDate = format(new Date(), "yyyy-MM-dd");

    if (Object.keys(projectData.getProjects()).length === 0) {
        console.log('Error: No projects, can\'t create task');
    } else if (validateInputs(title, dueDate, description, priority, notes)) {
        const currentProjectId = projectData.getCurrentProjectNum()
        projectData.addTaskToProject(currentProjectId, { title, creationDate, dueDate, description, priority, notes, currentProjectId });
    } else {
        console.log('Form filled out improperly!')
    }
}