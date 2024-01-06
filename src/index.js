import './style.css'
import Dom from './modules/DOMInteraction.js'
import navBar from './components/navBar.js';
import projectBar from './components/projectBar.js';
import taskContent from './components/taskContent.js';

const loadPage = (function() {
    const content = document.getElementById('content');

    content.appendChild(navBar());
    content.appendChild(projectBar.projectBar());
    content.appendChild(taskContent())
})();