/**
 * The configure plugin event allows the plugin to request that OpenSCD core add, remove, or reconfigure a plugin.
 */
export type ConfigurePluginDetail = {
  name: string;
  kind: 'menu' | 'editor';
  config: Plugin | null;
};

export type ConfigurePluginEvent = CustomEvent<ConfigurePluginDetail>;

/**
 * The combination of name and kind uniquely identifies the plugin to be configured.
 * If config is null, the plugin is removed. Otherwise, the plugin is added or reconfigured.
 */
export function newConfigurePluginEvent(name: string, kind: 'menu' | 'editor', config: Plugin | null): ConfigurePluginEvent {
  return new CustomEvent<ConfigurePluginDetail>('oscd-configure-plugin', {
    bubbles: true,
    composed: true,
    detail: { name, kind, config },
  });
}
