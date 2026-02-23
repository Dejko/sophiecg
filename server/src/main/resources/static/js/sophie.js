import { UIElement } from "./ui/UIElement.js";
import { navbar } from "./ui/navbar/navbar.js";
import { viewport } from "./ui/viewport/viewport.js";
import { sidebar } from "./ui/sidebar/sidebar.js";

import loadData from "./store/loadData.js"

import modalBackground from "./ui/modal/modal.js";

// Function to initialize the app after state is loaded
async function initializeApp() {
    try {

        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = 'block';  // Ensure the loading spinner is visible
        }



        //await initializeStateFromUrl(url);
        await loadData(); // Await the resolved value from loadData()


        const app = new UIElement({
            type: 'div',
            id: 'app',
            styles: { width: '100vw', height: '100vh' },
            children: [
                navbar.render(),
                sidebar.render(),
                viewport.render(),
                modalBackground.render()
            ],
        }).render();

        // Append the app element to the document body
        document.body.appendChild(app);

        // Remove the loading animation after the app is rendered
        if (loadingElement) {
            loadingElement.classList.add('loadAnimation');
            setTimeout(() => {
                loadingElement.style.display = 'none';
            }, 4500);
        }
        // Dispatch custom event to indicate that the DOM is ready and state is initialized
        const event = new CustomEvent('stateInitialized', {
            detail: { message: 'State and canvases are ready.' },
            bubbles: true,
            composed: true
        });
        window.dispatchEvent(event);

    } catch (error) {
        console.error('Error initializing state:', error);
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }
}

// Wait for the page to load, then initialize the app
window.onload = initializeApp;







