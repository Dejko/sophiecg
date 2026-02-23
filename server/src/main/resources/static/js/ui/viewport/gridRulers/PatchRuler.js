import GridMatrix from "../gridMatrix/gridMatrix.js";


class PatchRuler {
    constructor(canvasId, globalStateController) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.globalStateController = globalStateController;

        // Store clickable rectangles
        this.clickableRects = [];
        this.dpr = window.devicePixelRatio;
        this.cm = 3.77952755906; // Pixels per cm (based on 96 DPI)

        // Initial draw
        this.redraw();

        // Bind resize handler
        window.addEventListener('resize', () => this.redraw());
    }

    // Pass custom dimensions for redraw (for zoom)
    redraw(frameLength = 0, substrateWidth = 0, zoomLevel = 1) {

        // If custom dimensions are not provided, use the global state
        if (frameLength === 0 || substrateWidth === 0) {
            const state = this.globalStateController.getState();
            frameLength = state.frameLength;
            substrateWidth = state.substrateWidth;
        }

        const rulerCanvasWidthPx = this.cmToPixels(frameLength);
        const rulerCanvasHeightPx = this.cmToPixels(substrateWidth);

        // Set the "actual" size of the canvas
        this.canvas.width = rulerCanvasWidthPx;
        this.canvas.height = rulerCanvasHeightPx;

        // Scale the context to ensure correct drawing operations
        this.ctx.scale(this.dpr, this.dpr);

        // Set the "drawn" size of the canvas
        this.canvas.style.width = `${this.canvas.width}px`;
        this.canvas.style.height = `${this.canvas.height}px`;

        // Get matrix data
        const matrixData = this.globalStateController.getState();
        const data = matrixData.matrix;

        // Check if data exists
        if (!data || data.length < 1) return;

        const rows = data.length;
        const cols = data[0].length;

        // Get dimensions from cells
        const cellDimensions = data.map(row =>
            row.map(cell => ({
                length: cell.cell.length,
                height: cell.cell.height,
                gap: cell.cell.gap
            }))
        );

        const firstCellLength = cellDimensions[0][0].length * this.cm * zoomLevel;
        const firstCellHeight = cellDimensions[0][0].height * this.cm * zoomLevel;
        const firstCellGap = cellDimensions[0][0].gap * this.cm * zoomLevel;



        /*
                console.log(`Rows: ${rows}, Columns: ${cols}`);
                console.log("Cell Dimensions:", cellDimensions);
                console.log("First Cell Length:", firstCellLength);
                console.log("First Cell Height:", firstCellHeight);
                console.log("First Cell Gap:", firstCellGap);
        */

        const rulerSize = 23;
        this.ctx.fillStyle = 'gray';
        this.ctx.font = '10px Arial';

        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Clear previous clickable rects
        this.clickableRects = [];

        // Draw columns
        for (let i = 0; i < cols / this.dpr; i++) {
            let x = i * (firstCellLength + firstCellGap);

            // Define the position and size of each rectangle
            const rectX = x + rulerSize + firstCellGap / 2;
            const rectY = 3;
            const rectWidth = firstCellLength - firstCellGap;
            const rectHeight = rulerSize - 10;


            // Draw a rectangle at each column position
            this.ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

            // Store the rectangle's position and size for click detection
            this.clickableRects.push({
                x: rectX,
                y: rectY,
                width: rectWidth,
                height: rectHeight,
                index: i // Store the index for identifying the clicked rectangle
            });

            // Only draw the text after the first column
            if (i > 0) {
                // Set the font color to white for the text
                this.ctx.fillStyle = 'white';  // Change the font color to white

                // Adjust text position to fit within the ruler and move it slightly higher
                const textX = x;
                const textY = rulerSize - 10.5; // Move the text 2 pixels higher (adjust as needed)

                // Draw the text (number)
                this.ctx.fillText(i - 1, textX, textY);
            }
            this.ctx.fillStyle = 'gray';
        }

        // Draw rows
        for (let j = 0; j < rows / this.dpr; j++) {
            let y = j * (firstCellHeight + firstCellGap);

            // Define the position and size of each rectangle
            const rectX = 3;
            const rectY = y + rulerSize + firstCellGap / 2;
            const rectWidth = rulerSize - 10;
            const rectHeight = firstCellHeight - firstCellGap;

            // Draw a rectangle at each row position
            this.ctx.fillRect(rectX, rectY, rectWidth, rectHeight);

            // Store the rectangle's position and size for click detection
            this.clickableRects.push({
                x: rectX,
                y: rectY,
                width: rectWidth,
                height: rectHeight,
                index: String.fromCharCode(j + 65) // Store the index for identifying the clicked rectangle
            });

            // Only draw the text after the first row
            if (j > 0) {
                // Set the font color to white for the text
                this.ctx.fillStyle = 'white';  // Change the font color to white
                const letter = String.fromCharCode(j + 64);

                // Adjust text position to fit within the ruler and move it slightly higher
                const textX = rulerSize - 18;
                const textY = y; // Move the text 2 pixels higher (adjust as needed)

                // Draw the text (number)
                this.ctx.fillText(letter, textX, textY);
            }
            this.ctx.fillStyle = 'gray';
        }
    }

    cmToPixels(cm) {
        return cm * this.cm;
    }

    addClickListener() {
        // Add click event listener to the canvas
        this.canvas.addEventListener('click', (event) => {
            // Get mouse click position relative to the canvas
            const mouseX = event.offsetX;
            const mouseY = event.offsetY;

            // Loop through each clickable rectangle and check if the click is inside
            for (let rect of this.clickableRects) {
                if (
                    mouseX >= rect.x && mouseX <= rect.x + rect.width &&
                    mouseY >= rect.y && mouseY <= rect.y + rect.height
                ) {
                    // Handle the click (for example, log the index of the clicked rectangle)
                    console.log('Rectangle clicked:', rect.index);
                    // You can perform any other action here, like highlighting the rectangle, changing its color, etc.
                }
            }
        });
    }
}


export default PatchRuler