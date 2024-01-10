export default { setCurrentProject, getProjects, getCurrentProjectNum, createProject, addTaskToProject, deleteProjectById };

const projects = {};
let projectsCounter = 1;
let currentProject = 1;

function createProject(title) {
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

function addTaskToProject(projectId, task) {
    projects[`${projectId}`].tasks.push(task);
}

function deleteProjectById(id) {
    delete projects[`${id}`];
    console.log(`Project with ID no. ${id} deleted`);
}

//creates default project
createProject('default');