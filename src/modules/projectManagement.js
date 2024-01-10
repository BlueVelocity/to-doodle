export default { setCurrentProject, setCurrentToLastProject, getProjects, getCurrentProjectNum, createProject, addTaskToProject, deleteProjectById };

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
    setCurrentProject(Object.keys(projects)[-1])
}

function addTaskToProject(projectId, task) {
    projects[`${projectId}`].tasks.push(task);
}

function deleteProjectById(id) {
    delete projects[`${id}`];
    console.log(`Project with ID no. ${id} deleted`);
}

//creates default project
createProject('Task A');