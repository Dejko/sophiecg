import { UIElement } from "../../UIElement.js";

const patchRange = new UIElement({
    type: 'canvas',
    id: 'rangeCanvas',
    styles: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 4,
        display: 'none'
    },

})


window.addEventListener('stateInitialized', () => {




    document.addEventListener('swap-ruler', () => {
        // Call the function to update the state when the event is received
        //updateRulerState();
    });



});

export { patchRange }