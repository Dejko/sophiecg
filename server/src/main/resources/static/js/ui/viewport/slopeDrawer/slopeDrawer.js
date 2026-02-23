import { globalStateController } from "../../../store/stateController.js";
import { BaseCanvas } from "../../baseCanvas.js";


export class SlopeDrawerCanvas {
    constructor(canvasId, patch, zoomLevel, transform) {
        this.canvas = document.getElementById(canvasId)
        this.ctx = this.canvas.getContext('2d');
        this.state = globalStateController.getState();
        this.cm = 3.7952755906;
        this.canvas.height = parseInt(this.state.substrateWidth * this.cm);
        this.canvas.width = parseInt(this.state.frameLength * this.cm);

        this.origin = patch;
        this.coords = patch.coords
        this.inkSet = patch.inkSet;

        this.zoomLevel = zoomLevel;
        this.transform = transform;
        this.DPR = window.devicePixelRatio || 1;
        this.init();
    }


    init() {
        //this.ctx.setTransform(this.transform);
        this.drawLines("horizontal");

    }


    drawChannel(ink, index) {
        const x = parseInt(this.coords.x.toFixed(1)); // This seems unused in the current context but kept here.
        const y = parseInt(this.coords.y.toFixed(1)); // This will be the starting point of the Y position.

        const gap = index * (100 + 20); // Add 20px gap between each channel

        // Create a mapping of shorthand ink names to their full names
        const inkNames = {
            C: "cyan",
            M: "magenta",
            Y: "yellow",
            K: "black",
            O: "orange",
            G: "green",
            W: "white",
            V: "violet",
            S: "silver"
        };

        // Get the full ink name from the inkNames map based on the shorthand (key)
        const fullInkName = inkNames[ink] || ink; // Default to key if not found in inkNames

        // Set the fill color for the icon using the full ink name
        this.ctx.fillStyle = `${fullInkName}`; // Assuming `value` is a color code or color name


        // Draw the icon (rectangle) at the new position with the appropriate gap
        this.ctx.fillRect(0, y + gap, this.canvas.width, 100); // Adjust the size of the rectangle as needed
    }

    drawLines(direction) {
        // Get the coordinates (rounded to one decimal place)
        const x = parseInt(this.coords.x.toFixed(1));
        const x1 = parseInt(this.coords.x1.toFixed(1));

        const y = parseInt(this.coords.y.toFixed(1));
        const y2 = parseInt(this.coords.y2.toFixed(1));

        // Set up the dashed line pattern (you can adjust the dash length and gap)
        this.ctx.setLineDash([5, 2]); // 5px dash, 2px gap (adjust this pattern as needed)

        // Begin the path for the line
        this.ctx.beginPath();

        // Draw either a vertical or horizontal dashed line based on direction
        if (direction === "vertical") {
            // Vertical line: Draw from the top to the bottom of the canvas
            this.ctx.moveTo(x, 0); // Start at (x, 0) - top of canvas
            this.ctx.lineTo(x, this.canvas.height); // End at (x, canvas height) - bottom of canvas

            this.ctx.moveTo(x1, 0); // Start at (x, 0) - top of canvas
            this.ctx.lineTo(x1, this.canvas.height); // End at (x, canvas height) - bottom of canvas
        } else if (direction === "horizontal") {
            // Horizontal line: Draw from the left to the right of the canvas
            this.ctx.moveTo(0, y); // Start at (0, y) - left side of canvas
            this.ctx.lineTo(this.canvas.width, y); // End at (canvas width, y) - right side of canvas

            this.ctx.moveTo(0, y2); // Start at (0, y) - left side of canvas
            this.ctx.lineTo(this.canvas.width, y2); // End at (canvas width, y) - right side of canvas
        }

        // Actually draw the line
        this.ctx.stroke();

        // Reset line dash pattern to solid line (optional)
        this.ctx.setLineDash([]); // Reset to solid line after drawing
    }


    // direction horizontal or vertical



    drawIcons() {
        console.log(this.coords)
        console.log(this.coords.y2); // Log y1 to see if it's defined
        // Get the fixed coordinates (rounded to one decimal place)
        const x = parseInt(this.coords.x.toFixed(1));
        const y = parseInt(this.coords.y.toFixed(1));

        // Create a mapping of shorthand ink names to their full names
        const inkNames = {
            C: "cyan",
            M: "magenta",
            Y: "yellow",
            K: "black",
            O: "orange",
            G: "green",
            W: "white",
            V: "violet",
            S: "silver"
        };

        // Loop through each ink type and its corresponding color in inkSet
        Object.entries(this.inkSet).forEach(([key, value], index) => {

            this.drawChannel(value, index);
            // Calculate new x and y based on index
            const offsetX = x + (index * 55);;  // Increase x by 50px for each icon (adjust this value as needed)
            const offsetY = y  // Increase y by 50px for each icon (adjust this value as needed)

            // Get the full ink name from the inkNames map based on the shorthand (key)
            const fullInkName = inkNames[value] || value; // Default to key if not found in inkNames

            // Set the fill color for the icon using the full ink name
            this.ctx.fillStyle = `${fullInkName}`; // Assuming `value` is a color code or color name
            // Draw the icon (rectangle) at the new position
            this.ctx.fillRect(offsetX, offsetY, 40, 40); // Adjust the size of the rectangle as needed

            // Optionally log the full ink name for debugging
            console.log(`Drawing ${fullInkName} at position: (${offsetX}, ${offsetY})`);
        });

        // Optionally log the transform matrix or state
        console.log(this.transform);
    }

    // Helper method to get the color based on the ink set
    getColor() {
        // Map ink types to colors (adjust based on your need)
        const colorMap = patch.inkSet;  // Assuming patch.inkSet is an object with ink types as keys and colors as values
        let Inkset = {}; // Initialize Inkset as an empty object

        // Loop through the entries of colorMap and populate Inkset
        for (const [key, value] of Object.entries(colorMap)) {
            Inkset[key] = value; // Add key-value pairs to Inkset
        }

        // Return the color for the given ink type, defaulting to "gray" if not found
        return Inkset[ink] || "gray";
    }

    originPoint() {

    }

    drawSlope() {

    }
}