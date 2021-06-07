export const officialPlugins = [
  {
    name: 'Open file',
    src: '/src/triggered/OpenFile.js',
    icon: 'folder_open',
    default: true,
    kind: 'triggered'
  },
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
    name: "Open from CoMPAS",
    src: "/src/triggered/OpenCompas.js",
    icon: "folder_open",
    default: true,
    kind: "triggered"
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
