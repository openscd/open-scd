import { PluginStateApi } from './plugin-state-api.js';
export class OscdApi {
    constructor(pluginTag) {
        this.pluginState = new PluginStateApi(pluginTag);
    }
}
//# sourceMappingURL=api.js.map