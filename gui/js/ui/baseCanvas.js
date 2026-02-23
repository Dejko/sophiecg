export class BaseCanvas {
    constructor(canvasId) {
        if (new.target === BaseCanvas) {
            throw new Error("Cannot instantiate an abstract class.");
        }

        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas with ID ${canvasId} not found.`);
        }
        this.ctx = this.canvas.getContext('2d'); // 2D context for drawing
        if (!this.ctx) {
            throw new Error("Unable to get canvas context.");
        }

        // Initialize base canvas settings
        this.DPR = window.devicePixelRatio || 1;
        this.adjustCanvas();
    }

    // Abstract method that must be implemented by subclasses
    redraw() {
        throw new Error("Method 'redraw()' must be implemented.");
    }

    // Adjust canvas size and scaling to match device pixel ratio
    adjustCanvas() {
        const dpi = this.DPR;
        const parent = this.canvas.parentElement;

        // Resize the canvas based on the parent element's dimensions
        const width = parent.offsetWidth;
        const height = parent.offsetHeight;

        // Set canvas size (including DPI scaling)
        this.canvas.width = width * dpi;
        this.canvas.height = height * dpi;

        // Get the 2d context and apply scaling to match device pixel ratio
        this.ctx.scale(dpi, dpi);
    }

    // Helper method to clear the canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Resize canvas to fit the window if needed
    resizeToFit() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}