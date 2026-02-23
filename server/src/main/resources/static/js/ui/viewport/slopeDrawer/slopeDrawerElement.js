import { UIElement } from "../../UIElement.js";
import { SlopeDrawerCanvas } from "./slopeDrawer.js";

const slopeDrawer = new UIElement({
    type: 'canvas',
    id: 'slopeDrawer',
    styles: {
        width: ``, // Convert back to pixels for the actual width
        height: ``, // Convert back to pixels for the actual height
        position: 'absolute',  // Use absolute positioning to keep the grid in the same place
        top: '23px',           // Top offset (adjust as needed)
        left: '23px',          // Left offset (adjust as needed)
        zIndex: 1,             // Lower z-index to keep it behind other elements
        backgroundColor: 'rgba(145, 145, 145, 0.69)',
        //pointerEvents: 'none', // Prevent the canvas from intercepting mouse events
        transformOrigin: 'top left', // Ensure zooming happens from the top-left corner
        display: 'none'
    }
})





document.addEventListener('ctrlRightClick', (e) => {

    const drawerCanvas = new SlopeDrawerCanvas('slopeDrawer', e.detail.patch, e.detail.zoomLevel, e.detail.canvasTransform);

    const slopeDrawer = document.getElementById('slopeDrawer');
    slopeDrawer.addEventListener('contextmenu', (event) => {
        event.preventDefault();  // Prevent the default context menu
        event.stopPropagation(); // Stop the event from propagating
        if (event.ctrlKey && event.button === 2) {
            event.preventDefault();  // Prevent the default context menu
            event.stopPropagation(); // Stop the event from propagating
        }
    });




    slopeDrawer.style.display = 'block';

    // Set the width and height using the values from the event
    slopeDrawer.style.width = `${parseInt(e.detail.width)}px`;  // Convert to number and append 'px'
    slopeDrawer.style.height = `${parseInt(e.detail.height)}px`; // Convert to number and append 'px'
    drawerCanvas.drawIcons();
    console.log(e.detail, "got the click!")
})




export { slopeDrawer };