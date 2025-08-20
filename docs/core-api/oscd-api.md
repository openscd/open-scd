# OSCD API

Open scd passes an API object as the property `oscdApi` to every plugin. At the moment the API only includes the plugin state API. Here is an example usage in a Lit based plugin.

```
import { OscdApi } from '@openscd/core';

class SomePlugin extends LitElement {

  @property()
  oscdApi: OscdApi | null = null;

  connectedCallback() {
    const pluginState = this.oscdApi?.pluginState.getState();

    ...
  }

  disconnectedCallback() {
    this.oscdApi?.pluginState.setState(someStateObject);
  }
}
```

⚠️ Be aware that not every open scd distribution provides this API, so your plugin should have a null check if you want it to be compatible with other distributions.

## Plugin state API

The plugin state API stores an arbitrary object as your plugin's state in memory. Be aware that this state is only persisted during the open scd distribution's runtime and will not be stored in local storage for example.

```
interface PluginStateApi {
  setState(state: PluginState | null): void;

  getState(): PluginState | null;

  updateState(partialState: Partial<PluginState>): void
}
```

