export function generatePluginPath(plugin) {
  return location.origin + location.pathname + plugin;
}
export const officialPlugins = [
  {
    name: "IED",
    src: generatePluginPath("plugins/src/editors/IED.js"),
    icon: "developer_board",
    activeByDefault: true,
    kind: "editor",
    requireDoc: true
  },
  {
    name: "Open project",
    src: generatePluginPath("plugins/src/menu/OpenProject.js"),
    icon: "folder_open",
    activeByDefault: true,
    kind: "menu",
    requireDoc: false,
    position: "top"
  },
  {
    name: "New project",
    src: generatePluginPath("plugins/src/menu/NewProject.js"),
    icon: "create_new_folder",
    activeByDefault: true,
    kind: "menu",
    requireDoc: false,
    position: "top"
  },
  {
    name: "Plugin Store",
    src: "https://sprinteins.github.io/oscd-plugin-store/index.js",
    icon: "create_new_folder",
    activeByDefault: true,
    kind: "menu",
    requireDoc: false,
    position: "bottom"
  }
];
