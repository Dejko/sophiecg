import { BaseCanvas } from "../../baseCanvas.js";
import { cmToPixels } from "../../../util/helpers.js";
import PatchRuler from "../gridRulers/PatchRuler.js";
import { globalStateController } from "../../../store/stateController.js";
import { zoomTool } from "../infoTool/zoomTool.js";

// Subclass that implements zoom functionality
export class DrawingCanvas extends BaseCanvas {
    constructor(canvasId, widthCm, heightCm) {
        super(canvasId);  // Calls the parent constructor and adjusts canvas size/scale
        this.widthCm = widthCm; // Allow dynamic width in cm
        this.heightCm = heightCm; // Allow dynamic height in cm
        this.zoomLevel = 1; // Initial zoom level (1 represents 100% scale)
        this.matrix = {};  // Initialize matrix as an empty array
        this.patchRuler = new PatchRuler('rangeCanvas', globalStateController)
        this.zoomTool = zoomTool;
        this.state = {}
        this.customMenu = document.getElementById('contextMenu');
        this.isDragging = false;  // Flag to check if the user is dragging
        this.startX = 0;          // Starting X position of the mouse
        this.startY = 0;          // Starting Y position of the mouse
        this.currentX = 0;        // Current X position of the mouse
        this.currentY = 0;        // Current Y position of the mouse
        this.init();


    }

    init() {
        this.setCanvasSize();
        this.addZoomListener();
        this.updateRulerDimensions
        this.initZoomControls();
        this.addEventListeners();
    }

    addEventListeners() {

        this.canvas.addEventListener('mousedown', (event) => {
            this.isDragging = true; // Start dragging
            this.startX = event.offsetX; // Store the start position
            this.startY = event.offsetY;
        });

        this.canvas.addEventListener('mousemove', (event) => {
            if (this.isDragging) {
                // Update the current position
                this.currentX = event.offsetX;
                this.currentY = event.offsetY;

                // Redraw the canvas and the selection box
                this.drawGrid();
                this.drawSelectionBox();
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.isDragging = false; // Stop dragging
                // Optionally, handle the selection area (for example, you could log the selected area)
                console.log(`Selected area: 
                    X: ${Math.min(this.startX, this.currentX)}, 
                    Y: ${Math.min(this.startY, this.currentY)}, 
                    Width: ${Math.abs(this.currentX - this.startX)}, 
                    Height: ${Math.abs(this.currentY - this.startY)}`);
            }
        });

        this.canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            this.onRightClick(event);
        })

        this.canvas.addEventListener('click', (e) => {
            if (!this.customMenu.contains(e.target)) {
                this.hideCustomMenu();
            }
        })
    }

    // Function to draw the selection box
    drawSelectionBox() {
        const width = this.currentX - this.startX;
        const height = this.currentY - this.startY;

        // Draw the selection box with a filled background and a border
        this.ctx.beginPath();

        // Fill the selection box with a semi-transparent color (background)
        this.ctx.fillStyle = 'rgba(0, 0, 255, 0.3)'; // Semi-transparent blue fill
        this.ctx.fillRect(this.startX, this.startY, width, height);  // Fill the rectangle

        // Draw the border of the selection box
        this.ctx.strokeStyle = 'blue';  // Border color
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([6, 6]);  // Optional: Dashed border lines
        this.ctx.strokeRect(this.startX, this.startY, width, height);  // Border of the rectangle
    }


    updateRulerDimensions() {
        // Get the current dimensions (e.g., from globalStateController or elsewhere)
        const pixelWidth = cmToPixels(this.widthCm);
        const pixelHeight = cmToPixels(this.heightCm);

        // Apply zoom factor
        const zoomedFrameLength = pixelWidth * this.zoomLevel;
        const zoomedSubstrateWidth = pixelHeight * this.zoomLevel;

        // Pass the zoomed dimensions to redraw
        this.patchRuler.redraw(zoomedFrameLength, zoomedSubstrateWidth, this.zoomLevel);
    }


    setCanvasSize() {
        // Convert dynamic width and height from cm to pixels based on DPI (dots per inch)
        const pixelWidth = cmToPixels(this.widthCm);
        const pixelHeight = cmToPixels(this.heightCm);

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
        console.log('Zoom In')
        if (this.zoomLevel < 2) {  // Set a maximum zoom level
            this.zoomLevel += 0.1;  // Increase zoom level by 10%
            this.setCanvasSize();  // Recalculate canvas size and scale
            this.drawGrid();  // Redraw the grid with updated zoom level
            this.updateRulerDimensions();
            this.updateZoomDisplay()
        }
    }

    // Zoom out
    zoomOut() {
        console.log('Zoom Out')
        if (this.zoomLevel > 0.2) {  // Set a minimum zoom level
            this.zoomLevel -= 0.1;  // Decrease zoom level by 10%
            this.setCanvasSize();  // Recalculate canvas size and scale
            this.drawGrid();  // Redraw the grid with updated zoom level
            this.updateRulerDimensions();
            this.updateZoomDisplay()
        }
    }




    addZoomListener() {

        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();

            const zoomFactor = 0.1;
            let newZoomLevel = this.zoomLevel;

            // Zooming in and out based on wheel direction
            if (e.deltaY < 0) {  // Zoom in
                newZoomLevel += zoomFactor;
            } else if (e.deltaY > 0) {  // Zoom out
                newZoomLevel -= zoomFactor;
            }

            // Set zoom limits
            newZoomLevel = Math.max(0.1, Math.min(3, newZoomLevel));

            if (newZoomLevel !== this.zoomLevel) {
                this.zoomLevel = newZoomLevel;
                this.setCanvasSize();  // Recalculate canvas size and scale
                this.drawGrid();  // Redraw the grid with updated zoom level
                this.updateRulerDimensions();
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


    onRightClick(event) {
        event.preventDefault();
        const { offsetX, offsetY } = event;
        const patch = this.getPatchAt(offsetX, offsetY);
        console.log(patch)
        this.showCustomMenu(event);
    }

    showCustomMenu(event) {
        this.customMenu.style.display = 'block';
        this.customMenu.style.left = `${event.clientX}px`;
        this.customMenu.style.top = `${event.clientY}px`;
    }

    hideCustomMenu() {
        this.customMenu.style.display = 'none';
        this.canvas.focus();
    }



    clearCanvas() {
        console.log('Clearing canvas and redrawing grid...');

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default DrawingCanvas;