import './style.css'
import navBar from './components/navBar.js';
import projectBar from './components/projectBar.js';
import taskContent from './components/taskContent.js';
import taskInfo from './components/taskInformation.js';
import storage from './modules/storageManagement.js';

const loadPage = (function() {
    const content = document.getElementById('content');

    content.appendChild(navBar());
    content.appendChild(projectBar.firstLoad());
    content.appendChild(taskContent.firstLoad());
    taskInfo.showTaskInfo();
})();