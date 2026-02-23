class UIElement {
    constructor({
        type = '',
        id = '',
        classNames = [],
        styles = {},
        children = [],
        content = '',
        events = {},
        dataAttributes = {}  // New option for data- attributes
    }) {
        this.type = type;
        this.classNames = classNames;
        this.styles = styles;
        this.id = id;
        this.children = children;
        this.content = content;
        this.events = events;
        this.dataAttributes = dataAttributes;  // Store data- attributes

        this.element = document.createElement(this.type);
        this._applyAttributes();
    }

    _applyAttributes() {
        // Apply standard attributes
        if (this.id) this.element.id = this.id;

        if (this.classNames.length) this.element.classList.add(...this.classNames);

        Object.assign(this.element.style, this.styles);

        if (typeof this.content === 'string') this.element.innerHTML = this.content;
        else if (this.content instanceof HTMLElement) this.element.appendChild(this.content);

        this.children.forEach(child => {
            if (child instanceof HTMLElement) this.element.appendChild(child);
            else if (typeof child === 'string') this.element.appendChild(document.createTextNode(child));
        });

        // Apply events
        for (const [event, handler] of Object.entries(this.events)) {
            this.element.addEventListener(event, handler);
        }

        // Apply data- attributes
        for (const [key, value] of Object.entries(this.dataAttributes)) {
            this.element.setAttribute(`data-${key}`, value);
        }
    }

    render() {
        return this.element;
    }
}

export { UIElement };