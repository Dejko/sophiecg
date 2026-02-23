export default class ContextMenuComponent extends HTMLElement {
    constructor() {
        super()

        this.patch = {};

        this.inkValues = {};
    }


    connectedCallback() {
        this.render();
    }

    updateMenuData(patch) {
        this.patch = patch;
        this.render();
    }

    render() {
        const { _row, col, inkValues } = this.patch;

        // Check if inkValues is an object before rendering
        const inkItems = (typeof inkValues === 'object' && inkValues !== null)
            ? Object.entries(inkValues).map(([key, value]) => {
                // Render each inkValue in an input field, making the value editable
                return `
            <div class="ink-item">
                <label for="${key}">${key}:</label>
                <input class='input-element' type="number" id="${key}" name="${key}" value="${value}" step="0.005" required max='1' min='0' />
            </div>
        `;
            }).join('') // Join all input fields into a single string
            : `<div>No ink values available</div>`; // Fallback if inkValues isn't an object



        this.innerHTML = `
        <style>
        .cm-header {
                text-align: center;
                font-size: 14px;
                font-weight: bold;
                padding-bottom: 8px;
        }

        .ink-values{
        
            display: flex;
            flex-direction: column;  /* Stack inputs vertically */
            align-items: stretch;    /* Make all inputs same width */
                    /* Adjust width as needed */
            margin: 0 auto; 
        }

        .ink-item {
                display:flex;
                align-items: center;
                align-content: center;
                padding-bottom: 6px;
                margin: 0 auto; 
        }

        .input-element {
            font-size: 16px;
            width: 60px;
          margin-left: 4px;
        }
        .cm-footer{
                padding-top: 6px;
                text-align: center;
        }

        #confirm-button{
        
        }
        </style>
        <div class='cm-header'>
            ${_row}, ${col}
        </div>
        <div class='ink-values'>
               ${inkItems}</div>
                 <div class='cm-footer'>
            <button id="confirm-button">Confirm</button>
        </div>

        `;

        if (typeof inkValues !== 'undefined') {
            Object.keys(inkValues).forEach(key => {
                const inputElement = this.querySelector(`#${key}`);
                if (inputElement) {

                    this.inkValues[key] = parseFloat(inputElement.value)

                    inputElement.addEventListener('input', (event) => {
                        let updatedValue = parseFloat(event.target.value).toFixed(3); // Ensure 3 decimal places

                        if (updatedValue > 1) {
                            updatedValue = 1; // Force max value
                        }
                        this.inkValues[key] = parseFloat(updatedValue); // Update inkValues with the new value
                    });
                }
            })
        }

        // Add an event listener for the Confirm button
        const confirmButton = this.querySelector("#confirm-button");
        if (confirmButton) {
            confirmButton.addEventListener('click', () => {
                // Handle the confirm button click
                this.confirmChanges();
            });
        }





    }

    confirmChanges() {

        this.patch.inkValues = this.inkValues

        this.dispatchEvent(new CustomEvent('grid-updated', {
            detail: this.patch,
            bubbles: true,
            composed: true
        }));
        // console.log('Ink values confirmed:', this.patch);
        this.patch = {}
        this.inkValues = {};
    }


}


customElements.define("contextmenu-component", ContextMenuComponent);