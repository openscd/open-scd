import { PluginStateApi } from './plugin-state-api.js';

export class OscdApi {
  public pluginState: PluginStateApi;

  constructor(pluginTag: string) {
    this.pluginState = new PluginStateApi(pluginTag);
  }
}
