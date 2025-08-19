export class PluginStateApi {
    constructor(tag) {
        this.pluginTag = tag;
    }
    setState(state) {
        this.setPluginState(state);
    }
    getState() {
        return this.getPluginState();
    }
    updateState(partialState) {
        const pluginState = this.getPluginState();
        const patchedState = {
            ...pluginState,
            ...partialState
        };
        this.setPluginState(patchedState);
    }
    setPluginState(state) {
        PluginStateApi.state[this.pluginTag] = state;
    }
    getPluginState() {
        var _a;
        return (_a = PluginStateApi.state[this.pluginTag]) !== null && _a !== void 0 ? _a : null;
    }
}
PluginStateApi.state = {};
//# sourceMappingURL=plugin-state-api.js.map