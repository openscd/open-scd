type PluginState = {
  [key: string]: unknown
}

export class PluginStateApi {
  private state: PluginState | null = null;

  public setState(state: PluginState): void {
    this.state = state;
  }

  getState(): PluginState | null {
    return this.state;
  }

  updateState(partialState: Partial<PluginState>): void {
    this.state = {
      ...this.state,
      ...partialState
    };
  }
}
