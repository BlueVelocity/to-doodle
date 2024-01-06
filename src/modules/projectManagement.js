export default { getProjects, createProject };

const projects = { 1: {title: 'Default'} }
let projectsCounter = 2;

function createProject(title) {
    projects[`${projectsCounter}`] = { title }
    projectsCounter++;
}

function getProjects() {
    return projects;
}
//must have an Id property that is shared with corresponding todo's

//will contain to-dos. User will have option to create new projects and move to-dos between projects