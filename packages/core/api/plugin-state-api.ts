type PluginState = {
  [key: string]: unknown
}

export class PluginStateApi {
  private static state: { [tag: string]: PluginState | null } = {};
  private pluginTag: string;

  constructor(tag: string) {
    this.pluginTag = tag;
  }

  public setState(state: PluginState | null): void {
    this.setPluginState(state);
  }

  public getState(): PluginState | null {
    return this.getPluginState();
  }

  public updateState(partialState: Partial<PluginState>): void {
    const pluginState = this.getPluginState();
    const patchedState = {
      ...pluginState,
      ...partialState
    };
    this.setPluginState(patchedState);
  }

  private setPluginState(state: PluginState | null): void {
    PluginStateApi.state[this.pluginTag] = state;
  }

  private getPluginState(): PluginState | null {
    return PluginStateApi.state[this.pluginTag] ?? null;
  }
}
