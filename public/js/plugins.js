export const officialPlugins = [
  {
    name: 'Substation',
    src: '/src/editors/Substation.js',
    icon: 'margin',
    default: true,
    kind: 'editor',
  },
  {
    name: 'IED',
    src: '/src/editors/IED.js',
    icon: 'developer_board',
    default: false,
    kind: 'editor',
  },
  {
    name: 'Single Line Diagram',
    src: '/src/editors/SingleLineDiagram.js',
    icon: 'edit',
    default: false,
    kind: 'editor',
  },
  {
    name: 'Sampled Values Subscriber',
    src: '/src/editors/SampledValues.js',
    icon: 'link',
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
    src: '/src/menu/OpenProject.js',
    icon: 'folder_open',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'top'
  },
  {
    name: 'New project',
    src: '/src/menu/NewProject.js',
    icon: 'create_new_folder',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'top'
  },
  {
    name: 'Save project',
    src: '/src/menu/SaveProject.js',
    icon: 'save',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'top'
  },
  {
    name: 'Validate project',
    src: '/src/validators/ValidateSchema.js',
    icon: 'rule_folder',
    default: true,
    kind: 'validator',
  },
  {
    name: 'Validate Templates',
    src: '/src/validators/ValidateTemplates.js',
    icon: 'rule_folder',
    default: true,
    kind: 'validator'
  },
  {
    name: 'Import IEDs',
    src: '/src/menu/ImportIEDs.js',
    icon: 'snippet_folder',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle'
  },
  {
    name: 'Subscriber Update',
    src: '/src/menu/SubscriberInfo.js',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle'
  },
  {
    name: 'Update desc (ABB)',
    src: '/src/menu/UpdateDescriptionABB.js',
    default: false,
    kind: 'menu',
    requireDoc: true,
    position: 'middle'
  },
  {
    name: 'Update desc (SEL)',
    src: '/src/menu/UpdateDescriptionSEL.js',
    default: false,
    kind: 'menu',
    requireDoc: true,
    position: 'middle'
  },
  {
    name: 'Merge Project',
    src: '/src/menu/Merge.js',
    icon: 'merge_type',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle'
  },
  {
    name: 'Update Substation',
    src: '/src/menu/UpdateSubstation.js',
    icon: 'merge_type',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle'
  },
  {
    name: 'Help',
    src: '/src/menu/Help.js',
    icon: 'help',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'bottom'
  },
];
