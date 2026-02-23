
import { globalStateController } from "../../../store/stateController.js";
import { cmToPixels } from "../../../util/helpers.js";

class TapeRuler {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.dpr = window.devicePixelRatio;
        this.cm = 37.7952755906; // Pixels per cm (based on 96 DPI)


        setTimeout(() => {
            this.state = globalStateController.getState()
            this.drawRuler(1)
        }, 500)


    }


    drawRuler(zoomLevel) {

        this.canvas.height = cmToPixels(this.state.substrateWidth) * 2;
        this.canvas.width = cmToPixels(this.state.frameLength) * 1.3;

        const rulerSize = 23;

        this.ctx.fillStyle = 'white';
        this.ctx.font = '9px Arial';


        // Draw horizontal ruler ticks, scaling based on zoom level
        for (let i = 0; i < (this.canvas.width / this.dpr - rulerSize) / (this.cm); i++) {
            let x = i * (this.cm) + rulerSize;
            this.ctx.fillRect(x - 0.3, 0, 0.3, rulerSize);
            if (i > 0) this.ctx.fillText((i / zoomLevel).toFixed(1), x + 4, rulerSize - 8);
        }

        // Draw vertical ruler ticks, scaling based on zoom level
        for (let i = 0; i < (this.canvas.height / this.dpr - rulerSize) / (this.cm); i++) {
            let y = i * (this.cm) + rulerSize;
            this.ctx.fillRect(0, y - 0.3, rulerSize, 0.3);
            if (i > 0) this.ctx.fillText((i / zoomLevel).toFixed(1), 2, y - 8);
        }

        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, rulerSize, rulerSize);

        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 0.2;

        this.ctx.beginPath();
        this.ctx.moveTo(rulerSize - 0.3, rulerSize - 0.3);
        this.ctx.lineTo(this.canvas.width / this.dpr, rulerSize);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(rulerSize - 0.3, rulerSize - 0.3);
        this.ctx.lineTo(rulerSize, this.canvas.height / this.dpr);
        this.ctx.stroke();
    }
}

export default TapeRuler