export function newConfigurePluginEvent(name, kind, config) {
  return new CustomEvent("oscd-configure-plugin", {
    bubbles: true,
    composed: true,
    detail: {name, kind, config}
  });
}
