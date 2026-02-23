export class EventManager {
    constructor(canvas, drawingCanvas) {
        this.canvas = canvas;
        this.drawingCanvas = drawingCanvas;
        this.init();
    }

    init() {
        this.canvas.addEventListener('keydown', this.handleKeydown.bind(this));
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('contextmenu', this.handleRightClick.bind(this));
        this.canvas.addEventListener('click', this.handleClick.bind(this));
    }

    handleKeydown(event) {
        if (event.ctrlKey && event.key === 'd') {
            event.preventDefault();
            this.drawingCanvas.patchSelection = [];
            console.log('Ctrl + D Pressed detected!');
        }
    }

    handleMouseDown(event) {
        if (event.ctrlKey && event.button === 0) {
            this.drawingCanvas.onCtrlLeftClick(event);
        } else {
            this.drawingCanvas.onMouseDown(event);
        }
    }

    handleMouseMove(event) {
        this.drawingCanvas.onMouseMove(event);
    }

    handleMouseUp() {
        this.drawingCanvas.onMouseUp();
    }

    handleRightClick(event) {
        event.preventDefault();
        this.drawingCanvas.onRightClick(event);
    }

    handleClick(event) {
        if (!this.drawingCanvas.customMenu.contains(event.target)) {
            this.drawingCanvas.hideCustomMenu();
        }
    }
}