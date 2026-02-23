export default class FillComponent extends HTMLElement {

    constructor() {
        super();

        this.innerHTML = `
              <ul class="patch-ul flex">
            <li class="inkFill-item">Random</li>
            <li class="inkFill-item">Empty</li>
            <li class="inkFill-item">Custom</li>
            </ul>
        `
    }

    connectedCallback() {


    }
}


customElements.define('fill-component', FillComponent)