/**
 * The combination of name and kind uniquely identifies the plugin to be configured.
 * If config is null, the plugin is removed. Otherwise, the plugin is added or reconfigured.
 */
export function newConfigurePluginEvent(name, kind, config) {
    return new CustomEvent('oscd-configure-plugin', {
        bubbles: true,
        composed: true,
        detail: { name, kind, config },
    });
}
//# sourceMappingURL=plugin.events.js.map