import './style.css'
import Dom from './modules/DOMInteraction.js'
import navBar from './components/navBar.js';

const loadPage = (function() {
    const content = document.getElementById('content');

    content.appendChild(navBar())
})();