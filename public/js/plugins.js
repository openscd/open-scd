export const officialPlugins = [
  {
    name: 'Substation',
    src: '/src/editors/Substation.js',
    icon: 'margin',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Communication',
    src: '/src/editors/Communication.js',
    icon: 'settings_ethernet',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Templates',
    src: '/src/editors/Templates.js',
    icon: 'copy_all',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Open project',
    src: '/src/loaders/OpenProject.js',
    icon: 'folder_open',
    default: true,
    kind: 'loader'
  },
  {
    name: 'New project',
    src: '/src/loaders/NewProject.js',
    icon: 'create_new_folder',
    default: true,
    kind: 'loader'
  },
  {
    name: 'Save project',
    src: '/src/savers/SaveProject.js',
    icon: 'save',
    default: true,
    kind: 'saver'
  },
  {
    name: 'Validate project',
    src: '/src/validators/ValidateSchema.js',
    icon: 'rule_folder',
    default: true,
    kind: 'validator'
  },
  {
    name: 'Validate Templates',
    src: '/src/validators/ValidateTemplates.js',
    icon: 'rule_folder',
    default: true,
    kind: 'validator'
  },
  {
    name: "Import IEDs",
    src: "/src/triggered/ImportIEDs.js",
    icon: "snippet_folder",
    default: true,
    kind: "triggered"
  },
  {
    name: 'Subscriber Update',
    src: '/src/triggered/SubscriberInfo.js',
    default: true,
    kind: 'triggered',
  },
  {
    name: 'Merge Project',
    src: '/src/triggered/Merge.js',
    icon: 'merge_type',
    default: true,
    kind: 'triggered',
  },
  {
    name: 'Update Substation',
    src: '/src/triggered/UpdateSubstation.js',
    icon: 'merge_type',
    default: true,
    kind: 'triggered',
  },
  {
    name: 'Communication Mapping',
    src: '/src/triggered/CommunicationMapping.js',
    icon: 'sync_alt',
    default: true,
    kind: 'triggered',
  },
];
