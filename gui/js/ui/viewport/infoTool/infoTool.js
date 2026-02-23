import { UIElement } from "../../UIElement.js";
import { viewport } from "../viewport.js";

const infoTool = new UIElement({
    type: 'div',
    id: 'infoTool',
    classNames: ['infoTool'],
    styles: {
        position: 'absolute',
        left: '40px',
        bottom: '70px',
        height: '120px',
        width: '100px',
        backgroundColor: 'rgb(235, 235, 235, 0.8)',
        color: 'black',
        fontSize: '14px',
        fontFamily: 'Verdana',
        fontWeight: 'bold',
        padding: '6px',
        lineHeight: '22px',
        zIndex: 15,

    },
    content: ``
})



document.addEventListener('info-updated', (e) => {
    const info = e.detail;  // This will contain the info object passed from the event

    // Set the content to the infoTool
    //infoTool.content = `Rows: ${info.rows} <br>Cols: ${info.cols} <br>Patches: ${info.patches} <br>`;

    // Get the DOM element for infoTool
    const infoToolElement = infoTool.render(); // Ensure render() returns a DOM element

    // Update the innerHTML of the rendered infoTool element
    infoToolElement.innerHTML = `Rows: ${info.rows} <br>Cols: ${info.cols} <br>Patches: ${info.patches} <br>`;

    // Log to check the data being passed
    //console.log(info);

    // Check if infoTool is already appended, then append it
    if (!viewport.element.contains(infoToolElement)) {
        viewport.element.appendChild(infoToolElement); // Append to the viewport if not already appended
    }
});



export { infoTool }