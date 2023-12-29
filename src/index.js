import './style.css'
import Dom from './modules/DOMInteraction.js'
import navBar from './components/navBar.js';
import sideBar from './components/sideBar.js';
import mainContent from './components/mainContent.js';

const loadPage = (function() {
    const content = document.getElementById('content');

    content.appendChild(navBar());
    content.appendChild(sideBar());
    content.appendChild(mainContent())
})();