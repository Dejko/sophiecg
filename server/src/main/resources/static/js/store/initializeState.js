import { saveStateToIDB } from './dbStore.js'
import { globalStateController } from './stateController.js';
// Function to fetch data from a given URL



async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error, status = ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to handle the state and store it in localStorage
export function handleState(data) {

    //console.log(data)
    // Validate the provided data
    if (!data || typeof data !== 'object') {
        console.error("Invalid data provided");
        return;
    }

    // Update the global state controller with the new state
    Object.keys(data).forEach(key => {
        globalStateController.updateState(key, data[key]);
    });

    // saveStateToIDB(globalStateController.getState())
    //localStorage.setItem('state', JSON.stringify(state));
}


// Function to handle the state and store it in localStorage
export function handleStateOnLoad(data) {

    //console.log(data)
    // Validate the provided data
    if (!data || typeof data !== 'object') {
        console.error("Invalid data provided");
        return;
    }

    // Update the global state controller with the new state
    Object.keys(data).forEach(key => {
        globalStateController.updateState(key, data[key]);
    });

}

// Modular function to initialize the state from a URL
export async function initializeStateFromUrl(url) {
    try {
        const data = await fetchData(url);

        //implement prompt to confirm loading default state or saved state in database

        handleState(data);

    } catch (error) {
        console.error('Failed to initialize state:', error);
    }
}


