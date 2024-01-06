export default { setCurrentProject, getProjects, getCurrentProjectNum, createProject };

const projects = { 1: {title: 'Default'} }
let projectsCounter = 2;
let currentProject = 1;

function createProject(title) {
    projects[`${projectsCounter}`] = { title }
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
        currentProject =  projNum;
        console.log(`Current project set to Id: ${projNum}`);
    } else {
        console.log('Error: project number does not exist');
    }
}
//must have an Id property that is shared with corresponding todo's

//will contain to-dos. User will have option to create new projects and move to-dos between projects