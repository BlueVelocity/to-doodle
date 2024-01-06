

const projects = {1: {name: 'default'}};
let projectsCounter = 1;

function createProject(name) {
    projects[`${projectsCounter}`] = {name};
}
//must have an Id property that is shared with corresponding todo's

//will contain to-dos. User will have option to create new projects and move to-dos between projects