
import { globalStateController } from "../../../store/stateController.js";
import { SPOTLIST } from "../../../constants/constants.js";
import { handleState } from "../../../store/initializeState.js";
import { openModal } from "../../modal/modal.js";


export default class gridTabComponent extends HTMLElement {

    constructor() {
        super();

        this.state = globalStateController.getState();

        this.innerHTML = `

        <style>
            #generateGridButton:hover {
                    color: #36ec91 !important;
                }
        </style>
        <div class="row" style=" margin-top:25px">
            <span class="label">NAME</span>
            <input id="gridName" type="text" class="text" placeholder="default"/>
        </div>
        <div class="row" style=" background-color:#2c2c2c4b">
            <span class="label" style=" width:100%; padding: 5px; margin-left:4px">Print Area</span>
        </div>
        <div class="row">
            <span class="label">LENGTH</span>
            <input id="frameLength" step="any" type="number" class="number" min="100" max="2000" />
        </div>
        <div class="row">
            <span class="label">WIDTH</span>
            <input id="substrateWidth" type="number" class="number" min="100" max="900" />
        </div>
        <div class="row">
            <span class="label">SIDE MARGIN</span>
            <input id="sideMargin" type="number" class="number" min="1" max="500" />
        </div>
           <div class="row">
            <span class="label">OFFSET</span>
            <input id="frontOffset" type="number" class="number" min="1" max="500" />
        </div>
        <div class="row" style=" background-color:#2c2c2c4b">
            <span class="label" style=" width:100%; padding: 5px; margin-left:4px">Patch Dimensons</span>
        </div>
        <div class="row">
            <span class="label">LENGTH</span>
            <input id="patchLength" step="any" type="number" class="number" min="5" max="1000"  />
        </div>
        <div class="row">
            <span class="label">Height</span>
            <input id="patchHeight" type="number" class="number" min="5" max="1000" />
        </div>
        <div class="row">
            <span class="label">GAP</span>
            <input id="patchGap" type="number" class="number" min="1
            " max="100" />
        </div>
          <div class="row" style=" background-color:#2c2c2c4b">
            <span class="label" style=" width:100%; padding: 5px; margin-left:4px">Inkset</span>
        </div>
          <div class="row">
            <span class="label">PROCESS</span>
              <ul class="patch-ul flex">
            <li class="inkSet-item" value='cyan' >C</li>
            <li class="inkSet-item" value='magenta' >M</li>
            <li class="inkSet-item" value='yellow' >Y</li>
            <li class="inkSet-item" value='black' style="color: ; -webkit-text-stroke: 1px gray;">K</li>
        </ul>
            </div>
            <div class="row">
            <span class="label">SPOT</span>
            <ul class="patch-ul flex">
            <li class="inkSet-item" value='spot'>i1</li>
            <li class="inkSet-item" value='spot'>i2</li>
            <li class="inkSet-item" value='spot'>i3</li>
            <li class="inkSet-item" value='spot'>i4</li>
        </ul>
        </div>
           <div class="row">
            <span class="label">FILL</span>
                 <ul class="patch-ul flex">
            <li class="inkFill-item" value="random">Random</li>
            <li class="inkFill-item" value="empty">Empty</li>
            <li class="inkFill-item" value="custom">Custom</li>
            </ul>
        </div>
        <div class="row" style=" background-color:#2c2c2c4b">
            <span id="generateGridButton" class="label" style=" width:100%; padding: 15px; text-align:center; cursor: pointer">GENERATE GRID</span>
        </div>
        `;

    }

    connectedCallback() {



        // Set initial values on load
        this.setInitialValues();

        /* Asynchronously load state if needed
        loadStateFromIDB().then((loadedState) => {
            const resultObject = loadedState.reduce((acc, item) => {
                acc[item.id] = item.value; // Set the id as the key and value as the value
                return acc;
            }, {});
            this.state = resultObject || this.state;
            this.setInitialValues();
        });*/

        // Listen to changes in input fields
        this.addEventListeners();

        // Listen for click on GENERATE GRID button
        this.querySelector("#generateGridButton").addEventListener('click', () => {
            this.generateGrid();
        });

        // Add scroll-wheel functionality
        this.addWheelScrollListener();
    }

    setInitialValues() {

        // Set initial values from state
        this.querySelector("#gridName").value = this.state.gridName;
        this.querySelector("#frameLength").value = this.state.frameLength;
        this.querySelector("#substrateWidth").value = this.state.substrateWidth;
        this.querySelector("#sideMargin").value = this.state.sideMargin;
        this.querySelector("#frontOffset").value = this.state.frontOffset;
        this.querySelector("#patchLength").value = this.state.patchLength;
        this.querySelector("#patchHeight").value = this.state.patchHeight;
        this.querySelector("#patchGap").value = this.state.patchGap;

        let unmatchedInkSet = [...this.state.inkSet];
        this.querySelectorAll('.inkSet-item').forEach((item) => {
            const itemValue = item.getAttribute('value');

            if (unmatchedInkSet.includes(itemValue)) {
                item.classList.add('selected')
                item.style.color = itemValue
                unmatchedInkSet = unmatchedInkSet.filter(value => value !== itemValue)

            }
            else if (itemValue === 'spot' && unmatchedInkSet.length > 0) {
                const color = unmatchedInkSet.shift()
                item.classList.add('selected')
                item.style.color = color  //asiggn those that didnt match in first condition
                item.setAttribute('value', `${color}`)
                item.innerHTML = color[0].toUpperCase()
            }
        });





    }

    addEventListeners() {
        this.querySelectorAll('.inkFill-item').forEach((item) => {
            item.addEventListener('click', (e) => {
                const itemValue = e.target.getAttribute('value');

                if (itemValue == 'custom') {
                    openModal("Enter custom ink values",
                        "This is the body content.",
                        'Some footer',
                        { width: '40%', height: '200px' },
                        { top: '10%', left: '20%' });

                }
                this.state.fill = itemValue;
                this.updateState()
                console.log(itemValue)
            })

        });

        this.querySelectorAll('.inkSet-item').forEach((item) => {
            item.addEventListener('click', (e) => {
                const itemValue = e.target.getAttribute('value');
                if (item.classList.contains('selected')) {
                    addOrRemoveInk(itemValue, this.state.inkSet)
                    item.classList.remove('selected')
                    item.style.color = 'gray'
                } else {
                    item.classList.add('selected')
                    addOrRemoveInk(itemValue, this.state.inkSet)
                    if (itemValue === 'spot') {
                        const enteredSpot = prompt(`

                            Please enter a color name:
                            Available: ${SPOTLIST}
                            
                            `).toLocaleLowerCase();
                        if (enteredSpot !== null && SPOTLIST.includes(enteredSpot)) {
                            item.style.color = enteredSpot
                            item.setAttribute('value', `${enteredSpot}`)
                            item.innerHTML = enteredSpot[0].toUpperCase()
                            addOrRemoveInk(enteredSpot, this.state.inkSet)
                            console.log("You entered: " + enteredSpot);  // Output the value entered
                        } else {
                            console.log("User canceled the prompt.");
                        }

                    } else {
                        item.style.color = itemValue
                    }
                }
            })

        })


        // Add event listeners to inputs for normal changes
        this.querySelector("#gridName").addEventListener('input', (e) => {
            this.state.gridName = e.target.value;
            this.updateState();
        });

        this.querySelector("#frameLength").addEventListener('input', (e) => {
            this.state.frameLength = parseInt(e.target.value);
            this.updateState();
        });

        this.querySelector("#substrateWidth").addEventListener('input', (e) => {
            this.state.substrateWidth = parseInt(e.target.value);
            this.updateState();
        });

        this.querySelector("#sideMargin").addEventListener('input', (e) => {
            this.state.sideMargin = parseInt(e.target.value);
            this.updateState();
        });

        this.querySelector("#frontOffset").addEventListener('input', (e) => {
            this.state.frontOffset = parseInt(e.target.value);
            this.updateState();
        });

        this.querySelector("#patchLength").addEventListener('input', (e) => {
            this.state.patchLength = parseInt(e.target.value);
            this.updateState();
        });

        this.querySelector("#patchHeight").addEventListener('input', (e) => {
            this.state.patchHeight = parseInt(e.target.value);
            this.updateState();
        });

        this.querySelector("#patchGap").addEventListener('input', (e) => {
            this.state.patchGap = parseInt(e.target.value);
            this.updateState();
        });
    }

    addWheelScrollListener() {
        // Add wheel scroll event for inputs with class 'number'
        const inputs = this.querySelectorAll('input.number');

        inputs.forEach(input => {
            input.addEventListener('wheel', (e) => {
                e.preventDefault();  // Prevent default scrolling behavior
                let currentValue = parseFloat(input.value);  // Get current input value
                const minValue = parseFloat(input.min);  // Get the minimum allowed value

                // Scroll up (negative deltaY) -> increase value
                // Scroll down (positive deltaY) -> decrease value
                if (e.deltaY <= 0) {
                    // Scroll up, increase value
                    currentValue = (currentValue + 1).toFixed(2);  // Increase value by 1, adjust precision
                } else if (e.deltaY >= 0) {
                    // Scroll down, decrease value but prevent going below min
                    currentValue = (currentValue - 1).toFixed(2);  // Decrease value by 1, adjust precision

                    // Prevent going below the minimum value
                    if (currentValue < minValue) {
                        currentValue = minValue.toFixed(2);
                    }
                }

                // Set the new value to the input
                input.value = currentValue;

                // Update the state manually with the new value after scroll
                this.updateState(input.id, currentValue);
            });
        });
    }

    updateState(inputId, newValue) {
        // Manually update the state based on the changed input field
        if (inputId === "frameLength") {
            this.state.frameLength = parseFloat(newValue);
        } else if (inputId === "substrateWidth") {
            this.state.substrateWidth = parseFloat(newValue);
        } else if (inputId === "sideMargin") {
            this.state.sideMargin = parseFloat(newValue);
        } else if (inputId === "frontOffset") {
            this.state.frontOffset = parseFloat(newValue);
        } else if (inputId === "patchLength") {
            this.state.patchLength = parseFloat(newValue);
        } else if (inputId === "patchHeight") {
            this.state.patchHeight = parseFloat(newValue);
        } else if (inputId === "patchGap") {
            this.state.patchGap = parseFloat(newValue);
        } else if (inputId === "gridName") {
            this.state.gridName = newValue;
        }

        // Log the updated state
        console.log("Updated state:", this.state);
    }


    generateGrid() {
        // Gather the current values of the inputs into an object
        const gridData = {
            gridName: this.state.gridName,
            frameLength: this.state.frameLength,
            substrateWidth: this.state.substrateWidth,
            sideMargin: this.state.sideMargin,
            frontOffset: this.state.frontOffset,
            patchLength: this.state.patchLength,
            patchHeight: this.state.patchHeight,
            patchGap: this.state.patchGap,
            inkSet: this.state.inkSet,
            fill: this.state.fill

        };

        // Log the generated grid data or process it further
        console.log("Generated Grid Data:", gridData);

        // You can dispatch a custom event here to notify other parts of your app about the generated data
        this.dispatchEvent(new CustomEvent('grid-generated', {
            detail: gridData,
            bubbles: true,
            composed: true
        }));

        //handleState(gridData)
        // loadStateFromIDB()

    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
    }
}

customElements.define("gridtab-component", gridTabComponent);



function addOrRemoveInk(ink, inkset) {
    const inkIndex = inkset.indexOf(ink);

    // Prevent adding any value that starts with 'spot'
    if (ink.startsWith('spot')) {
        console.log('Cannot add any value starting with "spot" to the inkset array.');
        return;  // Early exit if the ink starts with 'spot'
    }

    if (inkIndex !== -1) {
        // If the ink is already in the set, remove it
        inkset.splice(inkIndex, 1);
        console.log(inkset);
    } else {
        // If the ink is not in the set, add it
        inkset.push(ink);
        console.log(inkset);
    }
}
