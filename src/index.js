import './style.css'
import Dom from './modules/DOMInteraction.js'
import navBar from './components/navBar.js';
import projectBar from './components/projectBar.js';
import toDoContent from './components/toDoContent.js';

const loadPage = (function() {
    const content = document.getElementById('content');

    content.appendChild(navBar());
    content.appendChild(projectBar());
    content.appendChild(toDoContent())
})();