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
            this.matrix = this.state.matrix
            this.Xstart = this.matrix[0][0].coords.x
            this.Ystart = this.matrix[0][0].coords.y
            this.drawRuler(this.Xstart, this.Ystart)
        }, 500)

        //console.log(`this is fro mtaperuler`, this.matrix[0][0].coords)
    }


    drawRuler(Xstart, Ystart) {

        this.canvas.height = cmToPixels(this.state.substrateWidth);
        this.canvas.width = cmToPixels(this.state.frameLength);

        /*
                const firstPatchCoords = this.matrix[0][0]
        
                const startX = firstPatchCoords.coords.x
                const startY = firstPatchCoords.coords.y
        
                this.ctx.scale(this.dpr, this.dpr);
        */
        const rulerSize = 23;

        this.ctx.fillStyle = 'white';
        this.ctx.font = '9px Arial';

        // rect = canvas.getBoundingClientRect()

        //  draw rect.x as 0 start horizontal
        //  draw rect.right as 980 or end
        /*  draw rect.y as 0 or start vertical
    
        const canva = document.getElementById('colorGrid')
        const canvaCoords = canva.getBoundingClientRect()
    
        console.log(canvaCoords)
    
    */

        for (let i = 0; i < (this.canvas.width / this.dpr - rulerSize) / this.cm; i++) {
            let x = i * this.cm + rulerSize;
            this.ctx.fillRect(x - 0.3 + Xstart, 0, 0.3, rulerSize);
            if (i > 0) this.ctx.fillText(i * 1, x + 4, rulerSize - 8);
        }

        for (let i = 0; i < (this.canvas.height / this.dpr - rulerSize) / this.cm; i++) {
            let y = i * this.cm + rulerSize;
            this.ctx.fillRect(0, y - 0.3 + Ystart, rulerSize, 0.3);
            if (i > 0) this.ctx.fillText(i * 1, 2, y - 8);
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