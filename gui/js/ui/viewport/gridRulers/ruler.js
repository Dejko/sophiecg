import { globalStateController } from "../../../store/stateController.js";
import { cmToPixels } from "../../../util/helpers.js";
import { UIElement } from "../../UIElement.js";
import TapeRuler from "./TapeRuler.js";



const ruler = new UIElement({
    type: 'canvas',
    id: 'rulerCanvas',
    styles: {
        backgroundColor: 'transparent',
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 4,
        display: 'block'
    },

})

export { ruler }


window.addEventListener('stateInitialized', () => {

    const ruler = new TapeRuler('rulerCanvas')


    /*
    const state = globalStateController.getState()
    const { frameLength, substrateWidth } = state

    const rulerCanvasWidthPx = cmToPixels(frameLength);
    const rulerCanvasHeightPx = cmToPixels(substrateWidth);

    const canvas = document.getElementById('rulerCanvas');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();
    // Set the "actual" size of the canvas
    canvas.width = rulerCanvasWidthPx;
    canvas.height = rulerCanvasHeightPx;

    // Scale the context to ensure correct drawing operations
    ctx.scale(dpr, dpr);

    // Set the "drawn" size of the canvas
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
    // The number of pixels for 1 cm at 96 DPI

    const cm = 37.7952755906; // Pixels per cm (based on 96 DPI)
    const rulerSize = 23;

    ctx.fillStyle = 'white';
    ctx.font = '9px Arial';

    // rect = canvas.getBoundingClientRect()

    //  draw rect.x as 0 start horizontal
    //  draw rect.right as 980 or end
    /*  draw rect.y as 0 or start vertical

    const canva = document.getElementById('colorGrid')
    const canvaCoords = canva.getBoundingClientRect()

    console.log(canvaCoords)



    for (let i = 0; i < (canvas.width / dpr - rulerSize) / cm; i++) {
        let x = i * cm + rulerSize;
        ctx.fillRect(x - 0.3, 0, 0.3, rulerSize);
        if (i > 0) ctx.fillText(i * 1, x + 4, rulerSize - 8);
    }

    for (let i = 0; i < (canvas.height / dpr - rulerSize) / cm; i++) {
        let y = i * cm + rulerSize;
        ctx.fillRect(0, y - 0.3, rulerSize, 0.3);
        if (i > 0) ctx.fillText(i * 1, 2, y - 8);
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, rulerSize, rulerSize);

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.2;

    ctx.beginPath();
    ctx.moveTo(rulerSize - 0.3, rulerSize - 0.3);
    ctx.lineTo(canvas.width / dpr, rulerSize);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rulerSize - 0.3, rulerSize - 0.3);
    ctx.lineTo(rulerSize, canvas.height / dpr);
    ctx.stroke();*/
});




