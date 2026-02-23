/*

import { UIElement } from "../../UIElement.js";

const cm = 37.7952755906; // Pixels per cm (based on 96 DPI)

// Calculate the width and height in pixels (based on 980px by 330px size and cm to pixels conversion)
export const widthInCm = parseInt(98 * cm);
export const heightInCm = parseInt(33 * cm);

let isDragging = false; // Flag to check if the user is currently dragging
let startX = 0; // Starting X position of the mouse
let startY = 0; // Starting Y position of the mouse
let offsetX = 0; // Offset from where the user clicked (for proper dragging)
let offsetY = 0; // Offset from where the user clicked (for proper dragging)

const colorGrid = new UIElement({
    type: 'canvas',
    id: 'colorGrid',
    styles: {
        width: `${widthInCm}px`, // Convert back to pixels for the actual width
        height: `${heightInCm}px`, // Convert back to pixels for the actual height
        position: 'absolute',  // Use absolute positioning to keep the grid in the same place
        top: '23px',           // Top offset (adjust as needed)
        left: '23px',          // Left offset (adjust as needed)
        zIndex: -9000,             // Lower z-index to keep it behind other elements
        backgroundColor: 'green',
        //pointerEvents: 'none', // Prevent the canvas from intercepting mouse events
        transformOrigin: 'top left', // Ensure zooming happens from the top-left corner
    },
    events: {
        wheel: (event) => handleZoom(event),
        mousedown: (event) => handleMouseDown(event),  // Start dragging
        mousemove: (event) => handleMouseMove(event),  // Move canvas during dragging
        mouseup: () => handleMouseUp(),  // Stop dragging
        mouseleave: () => handleMouseUp() // Stop dragging if mouse leaves the canvas
    }
});

export { colorGrid };

let zoomLevel = 1; // Initial zoom level
function handleZoom(event) {
    // Prevent default behavior (like scrolling the page)
    event.preventDefault();

    // Determine zoom direction (positive for zooming in, negative for zooming out)
    const zoomFactor = 0.1;
    if (event.deltaY < 0) {
        zoomLevel += zoomFactor; // Zoom in
    } else if (event.deltaY > 0) {
        zoomLevel -= zoomFactor; // Zoom out
    }

    // Limit zoom level to a reasonable range
    zoomLevel = Math.max(0.1, Math.min(3, zoomLevel)); // Keep zoom level between 0.1 and 3

    // Apply zoom to the viewport by adjusting the scale
    colorGrid.element.style.transform = `scale(${zoomLevel})`;

    // Optionally adjust the position to prevent any visual "drift"
    // This step ensures that when zooming, the grid stays visually in the same spot relative to the viewport
    const scaleFactor = zoomLevel * 100;
    colorGrid.element.style.top = `${23 - (scaleFactor - 100) / 2}px`;
    colorGrid.element.style.left = `${23 - (scaleFactor - 100) / 2}px`;


    const rect = document.getElementById('colorGrid').getBoundingClientRect();

    console.log(rect.x - 23);       // The x position (distance from left of the viewport)
    console.log(rect.y - 59);       // The y position (distance from top of the viewport)
    console.log(rect.width);   // The width of the element
    console.log(rect.height);  // The height of the element
    console.log(rect.top);     // The top position (same as rect.y)
    console.log(rect.right);   // The right position (rect.x + rect.width)
    console.log(rect.bottom);  // The bottom position (rect.y + rect.height)

    // Redraw content inside the viewport
    redrawContent();
}

// Handle Mouse Down (Start dragging)
function handleMouseDown(event) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;

    // Get the current position of the colorGrid canvas
    const rect = colorGrid.element.getBoundingClientRect();
    offsetX = rect.left - startX;
    offsetY = rect.top - startY;


}

// Handle Mouse Move (Move canvas while dragging)
function handleMouseMove(event) {
    if (!isDragging) return;

    // Calculate the new position of the colorGrid canvas
    const newLeft = event.clientX + offsetX;
    const newTop = event.clientY + offsetY;

    // Update the canvas position
    colorGrid.element.style.left = `${newLeft}px`;
    colorGrid.element.style.top = `${newTop}px`;



}

// Handle Mouse Up (Stop dragging)
function handleMouseUp() {
    isDragging = false;
}


document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('colorGrid');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();

    // Set the "actual" size of the canvas
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale the context to ensure correct drawing operations
    ctx.scale(dpr, dpr);

    // Set the "drawn" size of the canvas
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;



    // The number of pixels for 1 cm at 96 DPI
    const cm = 37.7952755906; // Pixels per cm (based on 96 DPI)
    const rulerSize = 23; // Size of the rectangle

    // Clear the canvas to start with a blank slate
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set the fill color for the rectangles
    ctx.fillStyle = '#000';

    // Draw the small rectangles in each corner
    // Top-left corner
    ctx.fillRect(10, 10, rulerSize, rulerSize);
    // Top-right corner (canvas.width - rulerSize)
    ctx.fillRect(canvas.width - rulerSize - 10, 10, rulerSize, rulerSize);
    // Bottom-left corner (canvas.height - rulerSize)
    ctx.fillRect(10, canvas.height - rulerSize - 10, rulerSize, rulerSize);
    // Bottom-right corner (canvas.width - rulerSize, canvas.height - rulerSize)
    ctx.fillRect(canvas.width - rulerSize - 10, canvas.height - rulerSize - 10, rulerSize, rulerSize);
});*/