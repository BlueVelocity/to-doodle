import task from './taskManagement';
import storage from './storageManagement';

export default { setCurrentProject, setCurrentToLastProject, getProjects, getCurrentProjectNum, createProject, getTaskById, 
                addTaskToProject, getTaskCount, deleteTaskFromProject, deleteProjectById,
                 projectTitleValidation };

let projects = {};
let projectsCounter = 1;
let currentProject = 1;

function createProject(title) {
    if (Object.keys(projects).length === 0) {
        currentProject = projectsCounter;
    }

    projects[`${projectsCounter}`] = { title, tasks: [] }
    projectsCounter++;

    storage.setStorage();
}

function getProjects() {
    return projects;
}

function getCurrentProjectNum() {
    return currentProject;
}

function setCurrentProject(projNum) {
    if (Object.keys(projects).includes(projNum)) {
        currentProject = projNum;
        console.log(`Current project set to Id: ${projNum}`);
    } else {
        console.log('Error: project number does not exist');
    }
}

function setCurrentToLastProject() {
    setCurrentProject(Object.keys(projects)[-1]);
}

function getTaskById(id) {;
    if (Object.keys(projects).length === 0) {
        console.log('No tasks to get');
    } else {
        return projects[`${currentProject}`].tasks.find( task => task.taskId === id);
    }
}

function addTaskToProject(projectId, task) {
    projects[`${projectId}`].tasks.push(task);

    storage.setStorage();
}

function deleteTaskFromProject(projectId, taskId) {
    projects[`${projectId}`].tasks.forEach((task, index) => {
        if (task.taskId === taskId) {
            delete projects[`${projectId}`].tasks.splice(index, 1);

            storage.setStorage();
        }
    })
}

function getTaskCount(projectId) {
    return projects[`${projectId}`].tasks.length;
}

function getHighestTaskNumber() {
    let counter = 0;
    Object.keys(projects).forEach(projKey => {
        projects[`${projKey}`].tasks.forEach(task => {
            if (task.taskId > counter) {
                counter = task.taskId;
            }
        });
    })
    return counter;
}

function deleteProjectById(id) {
    delete projects[`${id}`];
}

function projectTitleValidation(title) {
    const titleArray = title.split(' ');
    if (title.length === 0 || titleArray.some( value => value.length > 10)) {
        return true
    } 
}

function freshStartup(title) {
    if (Object.keys(projects).length === 0) {
        currentProject = projectsCounter;
    }

    projects[`${projectsCounter}`] = { title, tasks: [] }
    projectsCounter++;
}

//loads locally stored information or creates default project and task
const storedInfo = storage.getStorage();

if (storage.checkIfStorageIsAvailable() && storedInfo != undefined) {
    projects = storage.getStorage();
    projectsCounter = Object.keys(storedInfo).length + 1;
    task.setTaskIdCounter(getHighestTaskNumber() + 1);
    task.reapplyFunctionsToTasks();
} else {
    freshStartup('Project A');
    task.createTask('Example Task', '2100-12-30', 'This is the task\'s description', '1', 'This is the task\'s notes')
}