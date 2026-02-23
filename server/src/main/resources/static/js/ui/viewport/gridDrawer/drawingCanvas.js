import { BaseCanvas } from "../../baseCanvas.js";
import { cmToPixels } from "../../../util/helpers.js";

import { globalStateController } from "../../../store/stateController.js";
import { zoomTool } from "../infoTool/zoomTool.js";
import TapeRuler from "../gridRulers/TapeRuler.js";
import GridMatrix from "../gridMatrix/gridMatrix.js";

// Subclass that implements zoom functionality
export class DrawingCanvas extends BaseCanvas {
    constructor(canvasId, widthCm, heightCm) {
        super(canvasId);  // Calls the parent constructor and adjusts canvas size/scale
        this.widthCm = widthCm; // Allow dynamic width in cm
        this.heightCm = heightCm; // Allow dynamic height in cm
        this.zoomLevel = 1; // Initial zoom level (1 represents 100% scale)
        this.matrix = {};  // Initialize matrix as an empty array
        this.zoomTool = zoomTool;
        this.state = {}
        this.customMenu = document.getElementById('contextMenu');

        this.clickedX = 0;          // clickeding X position of the mouse
        this.clickedY = 0;          // clickeding Y position of the mouse
        this.currentX = 0;        // Current X position of the mouse
        this.currentY = 0;        // Current Y position of the mouse
        this.tapeRuler = new TapeRuler('rulerCanvas')
        this.cm = 3.77952755906; // Pixels per cm (based on 96 DPI)
        this.patchSelection = []
        this.startPatch = {};
        this.canvas.tabIndex = 0;
        this.init();


    }

    init() {
        this.setCanvasSize();
        this.addZoomListener();

        this.initZoomControls();
        this.addEventListeners();
    }

    addEventListeners() {

        this.canvas.addEventListener('dblclick', (event) => {
            this.onDbleClick(event);
        });

        this.canvas.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'd') {
                event.preventDefault();
                this.patchSelection = [];
                this.startPatch = {};
                // console.log('Ctrl + D Pressed detected!');
                this.clearCanvas()
                this.drawGrid();
            }
        });

        this.canvas.addEventListener('mousedown', (event) => {
            if (event.ctrlKey && event.button === 0) {
                this.onCtrlLeftClick(event)
                //console.log('Ctrl + Left Click detected!');
            }
        });

        this.canvas.addEventListener('mousedown', (event) => {

            if (event.ctrlKey && event.button === 2) {
                event.preventDefault();  // Prevent the default context menu
                event.stopPropagation(); // Stop the event from propagating
                this.onCtrlRightClick(event)
            }
        });


        this.canvas.addEventListener('contextmenu', (event) => {

            if (event.ctrlKey && event.button === 2) {
                event.preventDefault();  // Prevent the default context menu
                event.stopPropagation(); // Stop the event from propagating
                this.onCtrlRightClick(event)
            }
        });




        this.canvas.addEventListener('contextmenu', (event) => {

            // Prevent the context menu from appearing for normal right-click (without Ctrl key)
            if (!event.ctrlKey) {
                event.preventDefault();
                this.onRightClick(event);
                console.log('Right Click detected!');
            }
        });
        this.canvas.addEventListener('click', (e) => {
            if (!this.customMenu.contains(e.target)) {
                this.hideCustomMenu();
            }
        })
    }

    setMatrix(matrix) {
        this.matrix = matrix
    }

    returnMatrix() {
        return this.matrix;
    }


    setCanvasSize() {
        // Convert dynamic width and height from cm to pixels based on DPI (dots per inch)
        const pixelWidth = this.widthCm * this.cm
        const pixelHeight = this.heightCm * this.cm

        // Apply zoom level to canvas size
        const zoomedWidth = pixelWidth * this.DPR * this.zoomLevel;
        const zoomedHeight = pixelHeight * this.DPR * this.zoomLevel;

        //Update the canvas element size to reflect the zoom level
        this.canvas.width = zoomedWidth;
        this.canvas.height = zoomedHeight;

        // Dynamically adjust the CSS of the canvas element based on zoom level
        this.canvas.style.width = `${pixelWidth * this.zoomLevel}px`;
        this.canvas.style.height = `${pixelHeight * this.zoomLevel}px`;

        //report to ruler

        //create ruler class make adjust method, feed this.canvas size and getboundingrect to the method

        /*
                const colorGridElement = document.getElementById('colorGrid');
                if (colorGridElement) {
                    colorGridElement.style.width = `${pixelWidth * this.zoomLevel}px`;
                    colorGridElement.style.height = `${pixelHeight * this.zoomLevel}px`;
                }*/

        // Adjust the context scaling based on zoom level
        this.ctx.setTransform(this.DPR * this.zoomLevel, 0, 0, this.DPR * this.zoomLevel, 0, 0);



    }


    // Initialize zoom controls
    initZoomControls() {
        const negativeZoom = document.getElementById('negativeZoom');
        const positiveZoom = document.getElementById('positiveZoom');
        const zoomLevelDisplay = document.getElementById('zoomLevel');

        negativeZoom.addEventListener('click', () => this.zoomOut());
        positiveZoom.addEventListener('click', () => this.zoomIn());

        // Ensure the zoom level text is updated when zoomed in or out
        this.updateZoomDisplay();
    }

    // Update the zoom level display on the UI
    updateZoomDisplay() {
        const zoomLevelDisplay = document.getElementById('zoomLevel');
        zoomLevelDisplay.textContent = `${parseInt(this.zoomLevel * 100)}`;
    }

    // Zoom in
    zoomIn() {
        // console.log('Zoom In')
        if (this.zoomLevel < 1.3) {  // Set a maximum zoom level
            this.zoomLevel += 0.1;  // Increase zoom level by 10%
            this.setCanvasSize();  // Recalculate canvas size and scale
            this.drawGrid();  // Redraw the grid with updated zoom level
            this.tapeRuler.drawRuler(this.zoomLevel);
            this.updateZoomDisplay()
        }
    }

    // Zoom out
    zoomOut() {
        //  console.log('Zoom Out')
        if (this.zoomLevel > 0.2) {  // Set a minimum zoom level
            this.zoomLevel -= 0.1;  // Decrease zoom level by 10%
            this.setCanvasSize();  // Recalculate canvas size and scale
            this.drawGrid();  // Redraw the grid with updated zoom level
            this.tapeRuler.drawRuler(this.zoomLevel);
            this.updateZoomDisplay()
        }
    }




    addZoomListener() {

        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();

            const zoomFactor = 0.1;
            let newZoomLevel = this.zoomLevel;

            // Zooming in and out based on wheel direction
            if (e.deltaY < 0.2) {  // Zoom in
                newZoomLevel += zoomFactor;
            } else if (e.deltaY > 1.3) {  // Zoom out
                newZoomLevel -= zoomFactor;
            }

            // Set zoom limits
            newZoomLevel = Math.max(0.1, Math.min(3, newZoomLevel));

            if (newZoomLevel !== this.zoomLevel) {
                this.zoomLevel = newZoomLevel;
                this.setCanvasSize();  // Recalculate canvas size and scale
                this.drawGrid();  // Redraw the grid with updated zoom level
                this.tapeRuler.drawRuler(this.zoomLevel);
                this.updateZoomDisplay()
            }
        });
    }

    setMatrix(matrix) {

        // Ensure the canvas is cleared correctly with the new zoom
        this.matrix = matrix; // Store the matrix in the canvas object
        this.drawGrid(); // Redraw the grid based on the new matrix
    }

    drawGrid() {

        this.clearCanvas;
        this.setCanvasSize()
        // Get current canvas dimensions

        // Clear the canvas before drawing new grid
        // Loop through each row and column of the matrix
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                const patch = this.matrix[row][col];

                /*Calculate patch size based on current canvas dimensions and zoom level
                const length = (patch.cell.length * 3.78) * this.zoomLevel;
                const height = (patch.cell.height * 3.78) * this.zoomLevel;
                const gap = (patch.cell.gap * 3.78) * this.zoomLevel;
*/
                const length = (patch.cell.length * 3.78);
                const height = (patch.cell.height * 3.78);
                const gap = (patch.cell.gap * 3.78)

                // Calculate the position of each patch, scaling based on zoom level
                const x = col * (length + gap);
                const y = row * (height + gap);
                const offset = parseInt(globalStateController.getStateKey('frontOffset') * 3.78)
                const sideMargin = parseInt(globalStateController.getStateKey('sideMargin') * 3.78)

                patch.coords = patch.coords || {}; // Ensure that the patch state exists
                patch.coords.x = x + offset;
                patch.coords.x1 = x + offset + length;
                patch.coords.y = y + sideMargin;
                patch.coords.y2 = y + sideMargin + height;

                // Render the patch at the calculated position
                patch.render(this.ctx, x + offset, y + sideMargin, length, height);
            }
        }

    }


    getPatchAt(x, y) {

        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                const patch = this.matrix[row][col];
                const coords = patch.coords;  // Assume patch has `coords: { x, x1, y, y2 }`

                // Check if the (x, y) falls within the bounds of the patch
                if (x >= (coords.x * this.zoomLevel) && x <= coords.x1 * this.zoomLevel && y >= coords.y * this.zoomLevel && y <= coords.y2 * this.zoomLevel) {
                    return patch;  // Return the patch if the coordinates match
                }
            }
        }
        return null;  // Return null if no patch was found at the coordinates
    }

    onDbleClick(event) {

        const { offsetX, offsetY } = event;
        const patch = this.getPatchAt(offsetX, offsetY);
        console.log('Double Click detected!');
        console.log(patch);
    }


    onRightClick(event) {
        //event.preventDefault();
        const { offsetX, offsetY } = event;
        const patch = this.getPatchAt(offsetX, offsetY);

        // console.log(patch)
        this.showCustomMenu(event, patch);

        document.dispatchEvent(new CustomEvent('RightClickPatch', {
            detail: patch,
            bubbles: true,
            composed: true
        }));
    }


    onCtrlRightClick(event) {

        const { offsetX, offsetY } = event;
        const patch = this.getPatchAt(offsetX, offsetY);

        this.showCustomMenu2(event, patch);

        const size = {
            width: this.canvas.width,
            height: this.canvas.height,
            zoomLevel: this.zoomLevel.toFixed(1),
            patch: patch,
            canvasTransform: this.ctx.getTransform()
        }

        document.dispatchEvent(new CustomEvent('ctrlRightClick', {
            detail: size,
            bubbles: true,
            composed: true
        }));

        //console.log('zoom:', this.zoomLevel)
        //this.showCustomMenu(event, patch);

    }

    onCtrlLeftClick(event) {
        event.preventDefault();
        const { offsetX, offsetY } = event;
        const clickedPatch = this.getPatchAt(offsetX, offsetY);


        //clickedPatch measurements
        const cell = clickedPatch.cell;
        const x1 = cell.length;
        const x2 = cell.height;

        if (this.patchSelection.includes(clickedPatch)) {
            console.log('Patch already included')
            return
        }

        this.patchSelection.push(clickedPatch);

        this.clearCanvas();
        this.drawGrid();




        if (this.patchSelection.length == 1) {
            this.startPatch = this.patchSelection[0]
            const startPatch = this.startPatch
            startPatch.drawOutline(this.ctx, startPatch.coords.x, startPatch.coords.y, x1 * this.cm, x2 * this.cm);
        }


        else if (this.patchSelection.length > 1) {

            let minRow = Infinity, maxRow = -Infinity;
            let minCol = Infinity, maxCol = -Infinity;

            this.patchSelection.forEach(patch => {

                const { row, col } = patch;

                minRow = Math.min(minRow, row);
                maxRow = Math.max(maxRow, row);
                minCol = Math.min(minCol, col);
                maxCol = Math.max(maxCol, col);
            });

            // Step 5: Add patches in between to the selection
            for (let row = minRow; row <= maxRow; row++) {
                for (let col = minCol; col <= maxCol; col++) {
                    // Assuming getPatchAtPosition(row, col) retrieves a patch at row,col
                    const patch = this.getPatchAtPosition(row, col); // Implement this method as needed

                    if (patch && !this.patchSelection.includes(patch)) {
                        this.patchSelection.push(patch);

                    }
                }
            }

            this.patchSelection.forEach((patch) => {
                const cell = patch.cell;
                const x1 = cell.length;
                const x2 = cell.height;
                // Draw outline for each patch added to the selection
                patch.drawOutline(this.ctx, patch.coords.x, patch.coords.y, x1 * this.cm, x2 * this.cm);
            })
        }

        // Log the selected patches
        //console.log(this.patchSelection);
    }

    getPatchAtPosition(row, col) {
        return this.matrix[row] && this.matrix[row][col]; // Assuming patchGrid is a 2D array
    }

    showCustomMenu(event, patch) {
        // Create or find the custom context menu component

        let customMenuComponent = document.querySelector("contextmenu-component");
        /* if (!customMenu) {
             customMenu = document.createElement("contextmenu-component");
             document.body.appendChild(customMenu); // Append to the body or another container
         }*/

        // Show the menu by positioning it based on the event
        this.customMenu.style.display = 'flex';
        this.customMenu.style.left = `${event.clientX - 9}px`;
        this.customMenu.style.top = `${event.clientY - 15}px`;

        // Update the context menu with data
        customMenuComponent.updateMenuData(patch);
    }

    hideCustomMenu() {
        this.customMenu.style.display = 'none';
        this.canvas.focus();
    }


    highlightPatch(patch) {
        this.clearCanvas();
        this.drawGrid();
        const cell = patch.cell;
        const x1 = cell.length;
        const x2 = cell.height;
        patch.drawOutline(this.ctx, patch.coords.x, patch.coords.y, x1 * this.cm, x2 * this.cm);
        //console.log('highlightPatch', patch)

    }



    clearCanvas() {
        //   console.log('Clearing canvas and redrawing grid...');

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default DrawingCanvas;