
import { SophieColorPatch } from "../gridPatches/sophiePatch.js";


export default class SelectionBar extends HTMLElement {

    constructor() {
        super();
        this.state = globalStateController.getState();
        this.matrix = this.state.matrix;
        this.origin = {};
        this.direction = 'horizontal'
        this.leftSidePatch = {}
        this.rightSidePatch = {}
        this.changeLeft = {}
        this.changeRight = {}
        this.innerHTML = `
        <style>
            .topbar{
               text-align: center;
               background-color: rgb(116, 116, 116);
               color: white;
               font-weight: bold;
               padding: 0.2rem;
               font-size: 1.2rem;
                border-radius: 4px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

                .direction-bar {
      display: flex;
 
    }

    .direction-btn {
      flex: 1;
      padding: 5px 7px;
      margin: 0 5px;
      cursor: pointer;
      text-align: center;
      background-color: #e0e0e0;
      border: 1px solid #bbb;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .direction-btn.active {
      background-color: #007BFF;
      color: white;
      border-color: #007BFF;
    }

    .direction-btn:hover {
      background-color: #d5d5d5;
    }

         /* Grid container styling */
        .main-container {
            display: grid;
            grid-template-columns: repeat(7, 1fr);  /* 7 equal columns */
            grid-template-rows: auto;    /* Row height adjusts based on content */
            gap: 10px; /* Space between grid items */
            width: 100%; /* Full width */ 
            padding-top: 2rem;
        }

        /* Grid item styling */
        .grid-item {
            display: flex;         /* Use flexbox to control item layout */
            flex-direction: column; /* Stack content vertically inside grid item */
            border: 1px solid #ccc; /* Optional border */
          
        }

        /* Styling for the complex grid item */
        .item-header {
            background-color:rgb(116, 116, 116);
            text-align: center;
            font-weight: bold;
        }

         .input-field {
                font-size: 18px;
                font-weight: bold;
                text-align: center;
                outline:none;
                border: none;
                width: 30px;
                background-color: transparent;
            }

        .item-content {
            flex-grow: 1;  /* Allows the content area to expand */
            padding: 5px;
            margin: auto;
        }

        .item-footer {
            background-color: #f1f1f1;
           
            text-align: center;
        }

        .fill-button {
        background-color: #4CAF50; /* Green */
        color: white;
        border: none;
        padding: 4px 8px;
        font-size: 14px;
        cursor: pointer;
        width: 100%;
    }

    .fill-button:hover {
        background-color: #45a049; /* Darker green on hover */
    }
        </style>
        <div class="topbar">  
        <div class="direction-bar">
            <div id="hbtn" class="direction-btn active" data-direction="horizontal">Horizontal</div>
            <div id="vbtn" class="direction-btn" data-direction="vertical">Vertical</div>
            </div>
        </div>
        <div class="main-container">
            <div class="grid-item">
                <div class="item-header"></div>
                <div class="item-content"></div>
                <div class="item-footer"></div>
            </div>
            <div id="startPatch" class="grid-item">
                 <div id="startPatch-header" class="item-header">
                    <input class="sh-row input-field" value="0"/>
                        <input class="sh-col input-field" value="0"/>
                 </div>
                <div id="startPatch-content" class="item-content"></div>
                <div id="startPatch-footer" class="item-footer"></div>
            </div>
            <div id="leftStep" class="grid-item">
                <div id="leftStep-header" class="item-header">Left step</div>
                <div id="leftStep-content" class="item-content"></div>
                <div id="leftStep-footer" class="item-footer"></div>
            </div>
            <div id="origin" class="grid-item">
                <div id="origin-header" class="item-header">
                       <input class="oh-row input-field" value="0"/>
                        <input class="oh-col input-field" value="0"/>
                
                </div>
                <div id="origin-content" class="item-content"></div>
                <div id="origin-footer" class="item-footer"></div>
            </div>
               <div id="rightStep" class="grid-item">
                <div id="rightStep-header" class="item-header">right step</div>
                <div id="rightStep-content" class="item-content"></div>
                <div id="rightStep-footer" class="item-footer"></div>
            </div>
             <div id="endPatch" class="grid-item">
                 <div id="endPatch-header" class="item-header">
                    <input class="eh-row input-field" value="0"/>
                        <input class="eh-col input-field" value="0"/>
                 </div>
                <div id="endPatch-content" class="item-content"></div>
                <div id="endPatch-footer" class="item-footer"></div>
            </div>
            <div class="grid-item">
                 <div class="item-header"></div>
                <div class="item-content"></div>
                <div class="item-footer"></div>
            </div>
        </div>
        `
        this.directionBtn = this.querySelector('.direction-btn');
        this.horizontalBtn = this.querySelector('#hbtn');
        this.verticalBtn = this.querySelector('#vbtn');
        this.originContainer = this.querySelector('#origin');
        this.originHeader = this.querySelector('#origin-header');
        this.originContent = this.querySelector('#origin-content');
        this.originFooter = this.querySelector('#origin-footer');
        this.ohRow = this.querySelector('.oh-row');
        this.ohCol = this.querySelector('.oh-col');
        this.startContainer = this.querySelector('#startPatch');
        this.startPatchHeader = this.querySelector('#startPatch-header');
        this.startPatchContent = this.querySelector('#startPatch-content');
        this.startPatchFooter = this.querySelector('#startPatch-footer');
        this.shRow = this.querySelector('.sh-row');
        this.shCol = this.querySelector('.sh-col');
        this.endContainer = this.querySelector('#endPatch');
        this.endPatchHeader = this.querySelector('#endPatch-header');
        this.endPatchContent = this.querySelector('#endPatch-content');
        this.endPatchFooter = this.querySelector('#endPatch-footer');
        this.ehRow = this.querySelector('.eh-row');
        this.ehCol = this.querySelector('.eh-col');
        this.leftStep = this.querySelector('#leftStep');
        this.leftStepContent = this.querySelector('#leftStep-content');
        this.leftStepHeader = this.querySelector('#leftStep-content');
        this.leftStepFooter = this.querySelector('#leftStep-footer');
        this.rightStep = this.querySelector('#rightStep');
        this.rightStepContent = this.querySelector('#rightStep-content');
        this.rightStepHeader = this.querySelector('#rightStep-content');
        this.rightStepFooter = this.querySelector('#rightStep-footer');

    }

    connectedCallback() {

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
            this.showPatchDetails(patch);
            this.origin = patch;
            this.showSidePatches(patch, this.direction)
        });

        document.addEventListener('grid-generated', (event) => {
            event.preventDefault(); // Fix: Ensure event is properly handled

            // Reset state
            this.selection = {};
            this.origin = {};
            this.state = globalStateController.getState();
            this.matrix = this.state.matrix;
            this.leftSidePatch = {}
            this.rightSidePatch = {}
            this.changeLeft = {}
            this.changeRight = {}

            this.originContainer.style.backgroundColor = ``;
            this.originContent.innerHTML = ``
            this.startContainer.style.backgroundColor = ``;
            this.startPatchContent.innerHTML = ``;
            this.endContainer.style.backgroundColor = ``;
            this.endPatchContent.innerHTML = ``;
            this.leftStepContent.innerHTML = ``;
            this.rightStepContent.innerHTML = ``;
            this.leftStepFooter.innerHTML = ``
            this.rightStepFooter.innerHTML = ``
            this.ehRow.value = ``;
            this.ehCol.value = ``;
            this.shRow.value = ``;
            this.shCol.value = ``;
            this.ohRow.value = ``;
            this.ohCol.value = ``;
            console.log('Grid reset, selection cleared.');
        });

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

    showSidePatches(patch, direction) {
        const { inkValues, cell, row, _row, col } = patch;

        const leftSide = this.leftContainer;
        const rightSide = this.rightContainer;

        if (direction === 'horizontal') {
            const startPatch = this.matrix[row][0]; // Start patch at the left-most column
            const endPatch = this.matrix[row][this.matrix[row].length - 1]; // End patch at the right-most column

            this.leftSidePatch = startPatch;
            this.rightSidePatch = endPatch;

            const { R: startR, G: startG, B: startB } = startPatch.inkToRgb();
            this.startContainer.style.backgroundColor = `rgb(${startR}, ${startG}, ${startB})`;
            // Display ink values inside for the left-most patch
            this.startPatchContent.innerHTML = Object.entries(startPatch.inkValues)
                .map(([ink, value]) => `<p>${ink}: ${(value * 100).toFixed(1)} %</p>`)
                .join(""); // Join all <p> elements into one string
            this.shRow.value = `${startPatch._row}`;
            this.shCol.value = `${startPatch.col}`;

            const { R: endR, G: endG, B: endB } = endPatch.inkToRgb();
            this.endContainer.style.backgroundColor = `rgb(${endR}, ${endG}, ${endB})`;
            // Display ink values inside for the right-most patch
            this.endPatchContent.innerHTML = Object.entries(endPatch.inkValues)
                .map(([ink, value]) => `<p>${ink}: ${(value * 100).toFixed(1)} %</p>`)
                .join(""); // Join all <p> elements into one string
            this.ehRow.value = `${endPatch._row}`;
            this.ehCol.value = `${endPatch.col}`;

            const numLeftSteps = col; // Steps to the left-most patch
            const numRightSteps = this.matrix[row].length - col - 1; // Steps to the right-most patch

            const leftStep = this.calculateInkChangePerPatch(inkValues, startPatch.inkValues, numLeftSteps);
            const rightStep = this.calculateInkChangePerPatch(inkValues, endPatch.inkValues, numRightSteps);

            this.changeLeft = {
                from: patch,
                to: startPatch,
                numStep: numLeftSteps,
                step: leftStep
            }

            this.changeRight = {
                from: patch,
                to: endPatch,
                numStep: numRightSteps,
                step: rightStep
            }

            this.leftStepContent.innerHTML = Object.entries(leftStep)
                .map(([ink, value]) => `<p>${ink}: ${(value * 100).toFixed(1)} %</p>`)
                .join(""); // Join all <p> elements into one string
            if (this.leftStepContent.innerHTML.trim() !== "") {
                this.leftStepFooter.innerHTML = `<button class="fill-button" data-steps=${JSON.stringify(this.changeLeft)} >Fill ${numLeftSteps} patches</button>`;
            }

            this.rightStepContent.innerHTML = Object.entries(rightStep)
                .map(([ink, value]) => `<p>${ink}: ${(value * 100).toFixed(1)} %</p>`)
                .join(""); // Join all <p> elements into one string
            if (this.rightStepContent.innerHTML.trim() !== "") {
                this.rightStepFooter.innerHTML = `<button class="fill-button" data-steps=${JSON.stringify(this.changeRight)} >Fill ${numRightSteps} patches</button>`;
            }
        }
        else if (direction === 'vertical') {
            const startPatch = this.matrix[0][col]; // Start patch at the top-most row
            const endPatch = this.matrix[this.matrix.length - 1][col]; // End patch at the bottom-most row

            this.leftSidePatch = startPatch;
            this.rightSidePatch = endPatch;

            // Display ink values inside for the top-most patch
            this.startPatchContent.innerHTML = Object.entries(startPatch.inkValues)
                .map(([ink, value]) => `<p>${ink}: ${(value * 100).toFixed(1)} %</p>`)
                .join(""); // Join all <p> elements into one string
            this.shRow.value = `${startPatch._row}`;
            this.shCol.value = `${startPatch.col}`;

            // Display ink values inside for the bottom-most patch
            this.endPatchContent.innerHTML = Object.entries(endPatch.inkValues)
                .map(([ink, value]) => `<p>${ink}: ${(value * 100).toFixed(1)} %</p>`)
                .join(""); // Join all <p> elements into one string
            this.ehRow.value = `${endPatch._row}`;
            this.ehCol.value = `${endPatch.col}`;

            const numTopSteps = row; // Steps to the top-most patch
            const numBottomSteps = this.matrix.length - row - 1; // Steps to the bottom-most patch

            const upwardStep = this.calculateInkChangePerPatch(patch.inkValues, startPatch.inkValues, numTopSteps)
            const downwardStep = this.calculateInkChangePerPatch(patch.inkValues, endPatch.inkValues, numBottomSteps);

            this.leftStepContent.innerHTML = Object.entries(upwardStep)
                .map(([ink, value]) => `<p>${ink}: ${(value * 100).toFixed(1)} %</p>`)
                .join(""); // Join all <p> elements into one string
            if (this.leftStepContent.innerHTML.trim() !== "") {
                this.leftStepFooter.innerHTML = `<button class="fill-button">Fill ${numTopSteps} patches</button>`;
            }

            this.rightStepContent.innerHTML = Object.entries(downwardStep)
                .map(([ink, value]) => `<p>${ink}: ${(value * 100).toFixed(1)} %</p>`)
                .join(""); // Join all <p> elements into one string
            if (this.rightStepContent.innerHTML.trim() !== "") {
                this.rightStepFooter.innerHTML = `<button class="fill-button">Fill ${numBottomSteps} patches</button>`;
            }
        }

        document.addEventListener('click', (event) => {
            if (event.target && event.target.classList.contains('fill-button')) {
                // Get the value from the data attribute
                const changeString = event.target.getAttribute('data-steps');
                // Parse the object back into a JavaScript object
                const changeObject = JSON.parse(changeString);

                // Now you have access to the change object when the button is clicked
                //console.log(changeObject);

                this.handleFillAction(changeObject);
            }
        });

    }

    handleFillAction(changeObject) {
        const { from, to, step } = changeObject;

        const { row, col } = from;       // From patch (row, col)
        const { row: sideRow, col: sideCol } = to; // To patch (sideRow, sideCol)

        const totalSteps = Math.abs(sideCol - col); // Total steps between patches in the row

        // Check if we're moving to the right or to the left
        if (col < sideCol) {
            // Loop to the right, starting from col + 1 to sideCol
            for (let i = col + 1; i <= sideCol; i++) {
                Object.keys(from.inkValues).forEach(ink => {
                    // Calculate the step per patch
                    const stepValue = step[ink] * (i - col);
                    // Calculate the new ink value for the current patch
                    this.matrix[row][i].inkValues[ink] = parseFloat(
                        Math.max(0, from.inkValues[ink] + stepValue).toFixed(3)
                    );
                });
            }
        } else if (col > sideCol) {
            // Loop to the left, starting from col - 1 to sideCol
            for (let i = col - 1; i >= sideCol; i--) {
                Object.keys(from.inkValues).forEach(ink => {
                    // Calculate the step per patch
                    const stepValue = step[ink] * (col - i);

                    // Calculate the new ink value for the current patch
                    this.matrix[row][i].inkValues[ink] = parseFloat(
                        Math.max(0, from.inkValues[ink] + stepValue).toFixed(3)
                    );
                });
            }
        }

        const event = new CustomEvent('fill-patch', {
            detail: this.origin,  // Attach the 'patch' data to the event
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(event);
    }

    calculateInkChangePerPatch(originInkValues, sideInkValues, numPatches) {
        if (!originInkValues || !sideInkValues || numPatches <= 0) return {};

        let inkChange = {};

        Object.keys(originInkValues).forEach((ink) => {
            let originValue = originInkValues[ink] || 0;
            let sideValue = sideInkValues[ink] || 0;

            // Calculate the change per patch
            inkChange[ink] = ((sideValue - originValue) / numPatches).toFixed(3);
        });

        return inkChange;
    }


    copyRowUp(originPatch, direction) {

        const { inkValues, cell, row, _row, col } = originPatch;
        if (row <= 0) return; // No row above to copy to
        const targetPatch = this.matrix[row - 1][col];

        Object.keys(inkValues).forEach(ink => {
            targetPatch.inkValues[ink] = inkValues[ink];
        });

        console.log('Copy row triggered');
    }


}
customElements.define('selectionbar-component', SelectionBar);
