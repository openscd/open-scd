export class PluginStateApi {
    constructor() {
        this.state = null;
    }
    setState(state) {
        this.state = state;
    }
    getState() {
        return this.state;
    }
    updateState(partialState) {
        this.state = {
            ...this.state,
            ...partialState
        };
    }
}
//# sourceMappingURL=plugin-state-api.js.map