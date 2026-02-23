export class StateController {
    constructor(initialState = {}) {
        if (StateController.instance) {
            return StateController.instance;  // Return the same instance if already exists
        }

        // Set initial state
        if (Object.keys(initialState).length === 0) {
            this.defaultState();  // Call defaultState if no initialState is provided
        } else {
            this.state = initialState;
        }


        this.listeners = [];
        StateController.instance = this; // Store the instance globally
    }

    updateState(key, value) {
        this.state[key] = value;
        this.notifyListeners();
    }

    getState() {
        return { ...this.state };
    }

    getStateKey(key) {
        return this.state[key];
    }

    addListeners() {
        this.listeners.forEach(listener => (this.getState()))
    }


    // Register a listener (callback function)
    addListener(listener) {
        if (typeof listener === 'function') {
            this.listeners.push(listener); // Add listener to array
        }
    }


    // Notify all registered listeners about state changes
    notifyListeners() {
        this.listeners.forEach(listener => listener(this.getState()));
    }

    defaultState() {
        this.state = {
            "gridName": "default",
            "frameLength": 950,
            "substrateWidth": 320,
            "sideMargin": 1,
            "frontOffset": 0,
            "patchLength": 20,
            "patchHeight": 20,
            "patchGap": 1,
            "matrix": {},
            "inkSet": [
                "cyan",
                "magenta",
                "yellow",
                "black"
            ],
            "fill": "empty"
        }
    }
}


export const globalStateController = new StateController();