import task from './taskManagement';

export default { setCurrentProject, setCurrentToLastProject, getProjects, getCurrentProjectNum, createProject, addTaskToProject, getTaskCount, deleteTaskFromProject, deleteProjectById };

const projects = {};
let projectsCounter = 1;
let currentProject = 1;

function createProject(title) {
    if (Object.keys(projects).length === 0) {
        currentProject = projectsCounter;
    }

    projects[`${projectsCounter}`] = { title, tasks: [] }
    projectsCounter++;
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

function addTaskToProject(projectId, task) {
    projects[`${projectId}`].tasks.push(task);
}

function deleteTaskFromProject(projectId, taskId) {
    projects[`${projectId}`].tasks.forEach((task, index) => {
        if (task.taskId = taskId) {
            delete projects[`${projectId}`].tasks.splice(index, 1);
        }
    })
}

function getTaskCount(projectId) {
    return projects[`${projectId}`].tasks.length;
}

function deleteProjectById(id) {
    delete projects[`${id}`];
    console.log(`Project with ID no. ${id} deleted`);
}

//creates default project and task
createProject('Project A');
task.createTask('Example Task', '2100-12-30', 'This is the task\'s description', '1', 'This is the task\'s notes')