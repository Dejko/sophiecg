import { UIElement } from "../../UIElement.js";
import DrawingCanvas from "./drawingCanvas.js";
import GridMatrix from "../gridMatrix/gridMatrix.js";
import { globalStateController } from "../../../store/stateController.js";
import { saveStateToIDB } from "../../../store/dbStore.js";

let drawingCanvas;



const colorGrid = new UIElement({
    type: 'canvas',
    id: 'colorGrid',
    styles: {
        width: ``, // Convert back to pixels for the actual width
        height: ``, // Convert back to pixels for the actual height
        position: 'absolute',  // Use absolute positioning to keep the grid in the same place
        top: '23px',           // Top offset (adjust as needed)
        left: '23px',          // Left offset (adjust as needed)
        zIndex: -9000,             // Lower z-index to keep it behind other elements
        backgroundColor: 'rgb(73, 73, 73)',
        //pointerEvents: 'none', // Prevent the canvas from intercepting mouse events
        transformOrigin: 'top left', // Ensure zooming happens from the top-left corner
    }
});




window.addEventListener('stateInitialized', () => {

    const state = globalStateController.getState()
    const { frameLength, substrateWidth, matrix } = state

    drawingCanvas = new DrawingCanvas('colorGrid', frameLength, substrateWidth);
    if (matrix) {
        drawingCanvas.setMatrix(matrix)
        const info = {
            rows: matrix.length,                  // Number of rows in the matrix
            cols: matrix[0].length,               // Number of columns in the first row of the matrix
            patches: matrix.length * matrix[0].length  // Total number of patches (rows * cols)
        };
        // Dispatch a custom event with `info` in the detail
        const event = new CustomEvent('info-updated', {
            detail: info
        });
        document.dispatchEvent(event);
    }
});



document.addEventListener('DOMContentLoaded', () => {
    // Set up a MutationObserver to detect when gridtab-component is added to the DOM
    const observer = new MutationObserver((mutationsList, observer) => {
        const gridTabComponent = document.querySelector('gridtab-component');
        const contextMenuComponent = document.querySelector('contextmenu-component');
        const selectionBarComponent = document.querySelector('selectionbar-component');



        if (gridTabComponent) {
            // The component has been added, so we can attach the event listener
            gridTabComponent.addEventListener('grid-generated', (e) => {

                const gridData = e.detail;
                const { gridName, frameLength, substrateWidth, sideMargin, frontOffset, patchLength, patchHeight, patchGap, inkSet, fill, inkValues } = gridData;
                const newMatrix = new GridMatrix(frameLength, substrateWidth, sideMargin, frontOffset, patchLength, patchHeight, patchGap, inkSet, fill, inkValues);

                let matrixData = newMatrix.generateGridMatrix();
                drawingCanvas.setMatrix(matrixData);

                Object.keys(gridData).forEach((key) => {
                    // console.log(key, gridData[key]); // Logs each key and its corresponding value
                    globalStateController.updateState(key, gridData[key])
                });


                globalStateController.updateState('matrix', matrixData);
                const info = newMatrix.getMatrixInfo();
                const fullState = globalStateController.getState()
                // console.log("this from fullsatte", fullState)
                saveStateToIDB(fullState)
                //console.log(`This is matrix: :`, matrixData);
                drawingCanvas = new DrawingCanvas('colorGrid', frameLength, substrateWidth);


                drawingCanvas.clearCanvas();
                drawingCanvas.setMatrix(matrixData);


                /*
                                Object.keys(gridData).forEach((key) => {
                                    console.log(key, gridData[key]); // Logs each key and its corresponding value
                                    globalStateController.updateState(key, gridData[key])
                                });*/
                // Store matrix info


                // Dispatch a custom event with `info` in the detail
                const event = new CustomEvent('info-updated', {
                    detail: info
                });

                // Dispatch the event on the `document` or any other relevant target
                document.dispatchEvent(event);

            });


            if (contextMenuComponent) {
                contextMenuComponent.addEventListener('grid-updated', (e) => {

                    drawingCanvas.hideCustomMenu();

                    drawingCanvas.clearCanvas();
                    drawingCanvas.drawGrid();
                    const newMatrix = drawingCanvas.returnMatrix();
                    //  console.log(`ewo data:`, newMatrix)
                    globalStateController.updateState('matrix', newMatrix)
                    const fullState = globalStateController.getState();
                    // console.log("this from fullsatte", fullState)
                    saveStateToIDB(fullState);

                })
            }


            if (selectionBarComponent) {

                selectionBarComponent.addEventListener('fill-patch', (e) => {
                    const patch = e.detail
                    //console.log('updated data for patch', patch)
                    drawingCanvas.clearCanvas();
                    drawingCanvas.drawGrid();
                    const newMatrix = drawingCanvas.returnMatrix();
                    //  console.log(`ewo data:`, newMatrix)
                    globalStateController.updateState('matrix', newMatrix)
                    const fullState = globalStateController.getState();
                    // console.log("this from fullsatte", fullState)
                    saveStateToIDB(fullState);

                })

            }


            // Stop observing once the component is found and the listener is added
            observer.disconnect();
        }
    });

    // Start observing the document body for the addition of gridtab-component
    observer.observe(document.body, { childList: true, subtree: true });
});





export { colorGrid, drawingCanvas };