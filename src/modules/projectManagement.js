export default { getProjects };

const projects = [{Id: 1, name: 'Default'}];
let projectsCounter = 1;

function createProject(name) {
    projects[`${projectsCounter}`] = {name};
}

function getProjects() {
    return projects;
}
//must have an Id property that is shared with corresponding todo's

//will contain to-dos. User will have option to create new projects and move to-dos between projects