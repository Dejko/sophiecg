import { globalStateController } from "../../../store/stateController.js";
import { SophieColorPatch } from "../gridPatches/sophiePatch.js";
import { drawingCanvas } from "../gridDrawer/drawingCanvasElement.js";
import { intToChar } from "../../../util/helpers.js";

export default class SophieBar extends HTMLElement {
    constructor() {
        super();
        this.state = globalStateController.getState();
        this.matrix = this.state.matrix;
        this.origin = this.matrix[0][0];
        this.direction = 'horizontal'
        this.leftSidePatch = {}
        this.rightSidePatch = {}
        this.changeLeft = {}
        this.changeRight = {}
        this.innerHTML = `
        <style>
        .container {
            width: 100%;
            display: flex;
            color: black;
            justify-content: center;
            align-items: center;
            margin: 0;
    }
    .col {
        flex: 1;
        text-align: center;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 0px 0px 4px 4px;
        margin: 0 5px;
        padding: 10px;
        box-sizing: border-box;
    }
         .input-field {
                font-size: 18px;
                font-weight: bold;
                text-align: center;
                outline:none;
                border: 1px solid #ccc;
                width: 30px;
                background-color: transparent;
            }
    .top-bar {
       text-align: center;
               background-color: rgb(116, 116, 116);
               color: white;
               font-weight: bold;
               margin: 0 5px;
        padding: 0.2rem;
               font-size: 1.2rem;
                border-radius: 4px 4px 0px 0px;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
    }

    .direction-btn {
        cursor: pointer;
        padding: 0.2rem 0.5rem;
        margin: 0 0.2rem;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        transition: background-color 0.3s;
        font-size: 0.7rem;
    }

      .direction-btn.active {
      background-color: #007BFF;
      color: white;
      border-color: #007BFF;
    }

    .direction-btn:hover {
      background-color: #d5d5d5;
    }

    #originRow, #originCol {
       cursor: ns-resize;
    }
        </style>
        <div class="top-bar">
            <div class="direction-btn active" data-direction="horizontal">Horizontal</div>
            <div class="direction-btn" data-direction="vertical">Vertical</div>
        
        </div>
        <div class="container">
            <div class="col"> Sophie Bar1 </div>
            <div id="origin" class="col"> 
                <div id="origin-header" class="item-header">
                       <input id="originRow" class="oh-row input-field"  value="0"/>
                        <input id="originCol" class="oh-col input-field"  value="0"/>
                </div>
                <div id="origin-content" class="item-content"></div>
                <div id="origin-footer" class="item-footer"></div>
         
            </div>
            <div class="col"> Sophie Bar3 </div>
        </div>
        `




    }



    connectedCallback() {

        this.originContainer = this.querySelector('#origin');
        this.originHeader = this.querySelector('#origin-header');
        this.originContent = this.querySelector('#origin-content');
        this.originFooter = this.querySelector('#origin-footer');
        this.ohRow = this.querySelector('.oh-row');
        this.ohCol = this.querySelector('.oh-col');
        this.originRow = this.querySelector('#originRow');
        this.originCol = this.querySelector('#originCol');

        this.originRow.addEventListener('wheel', (event) => {
            event.preventDefault();
            const delta = Math.sign(event.deltaY);
            let newRow_value = parseInt(this.origin.row) + delta;
            // newRow_value = Math.max(0, Math.min(newRow_value, this.matrix.length - 1));

            const maxRowIndex = this.matrix.length - 1;
            if (newRow_value < 0) {
                newRow_value = 0; // Prevent going above the first row
            } else if (newRow_value > maxRowIndex) {
                newRow_value = maxRowIndex; // Prevent going below the last row
            }

            const newRow = intToChar(newRow_value);
            this.ohRow.value = newRow;
            const col = parseInt(this.ohCol.value);
            const patch = this.matrix[newRow_value][col];
            if (patch) {
                this.showPatchDetails(patch);
                this.origin = patch;
                //this.showSidePatches(patch, this.direction)
                drawingCanvas.highlightPatch(patch);
            }
        });

        this.originCol.addEventListener('wheel', (event) => {
            event.preventDefault();
            const delta = Math.sign(event.deltaY);
            let newCol_value = parseInt(this.origin.col) + delta;
            // newCol_value = Math.max(0, Math.min(newCol_value, this.matrix[0].length - 1));   
            const maxColIndex = this.matrix[0].length - 1;
            if (newCol_value < 0) {
                newCol_value = 0; // Prevent going beyond the first column
            } else if (newCol_value > maxColIndex) {
                newCol_value = maxColIndex; // Prevent going beyond the last column
            }
            this.ohCol.value = newCol_value;
            const row = parseInt(this.origin.row);
            const patch = this.matrix[row][newCol_value];
            if (patch) {
                this.showPatchDetails(patch);
                this.origin = patch;
                //this.showSidePatches(patch, this.direction)
                drawingCanvas.highlightPatch(patch);
            }
        });


        const directionButtons = this.querySelectorAll('.direction-btn');

        directionButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove 'active' class from all buttons
                directionButtons.forEach(btn => btn.classList.remove('active'));
                // Add 'active' class to the clicked button
                button.classList.add('active');
                // Update the direction based on the clicked button's data attribute
                this.direction = button.getAttribute('data-direction');
                // Optionally, you can trigger an action based on the new direction
                console.log(`Direction changed to: ${this.direction}`);
                // If there's an origin patch already selected, update the side patches display
                if (this.origin && this.origin.row !== undefined && this.origin.col !== undefined) {
                    this.showSidePatches(this.origin, this.direction);
                }
            });
        });

        document.addEventListener('grid-updated', (event) => {
            const patch = event.detail;
            console.log('Grid updated event received in SophieBar:', patch);
            this.showPatchDetails(patch);
            this.origin = patch;
            // this.showSidePatches(patch, this.direction)
            drawingCanvas.highlightPatch(patch);
        });

        this.initializeOrigin(this.origin);
    }

    initializeOrigin(patch) {
        this.showPatchDetails(patch);
        this.showSidePatches(patch, this.direction)
        drawingCanvas.highlightPatch(this.origin);
    }


    showPatchDetails(patch) {
        const { inkValues, cell, row, _row, col } = patch;

        const { R, G, B } = patch.ink2rgb();
        this.originContainer.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
        this.originContent.innerHTML = Object.entries(inkValues)
            .map(([ink, value]) => `<p>${ink}: ${(value * 100).toFixed(1)} %</p>`)
            .join(""); // Join all <p> elements into one string

        this.ohRow.value = `${_row}`
        this.ohCol.value = `${col}`
    }





}

customElements.define('sophiebar-component', SophieBar);