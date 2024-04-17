export const officialPlugins = [
  {
    name: 'IED',
    src: '/open-scd/src/editors/IED.js',
    icon: 'developer_board',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Substation',
    src: '/open-scd/src/editors/Substation.js',
    icon: 'margin',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Single Line Diagram',
    src: '/open-scd/src/editors/SingleLineDiagram.js',
    icon: 'edit',
    default: false,
    kind: 'editor',
  },
  {
    name: 'Subscriber Message Binding (GOOSE)',
    src: '/open-scd/src/editors/GooseSubscriberMessageBinding.js',
    icon: 'link',
    default: false,
    kind: 'editor',
  },
  {
    name: 'Subscriber Data Binding (GOOSE)',
    src: '/open-scd/src/editors/GooseSubscriberDataBinding.js',
    icon: 'link',
    default: false,
    kind: 'editor',
  },
  {
    name: 'Subscriber Later Binding (GOOSE)',
    src: '/open-scd/src/editors/GooseSubscriberLaterBinding.js',
    icon: 'link',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Subscriber Message Binding (SMV)',
    src: '/open-scd/src/editors/SMVSubscriberMessageBinding.js',
    icon: 'link',
    default: false,
    kind: 'editor',
  },
  {
    name: 'Subscriber Data Binding (SMV)',
    src: '/open-scd/src/editors/SMVSubscriberDataBinding.js',
    icon: 'link',
    default: false,
    kind: 'editor',
  },
  {
    name: 'Subscriber Later Binding (SMV)',
    src: '/open-scd/src/editors/SMVSubscriberLaterBinding.js',
    icon: 'link',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Communication',
    src: '/open-scd/src/editors/Communication.js',
    icon: 'settings_ethernet',
    default: true,
    kind: 'editor',
  },
  {
    name: '104',
    src: '/open-scd/src/editors/Protocol104.js',
    icon: 'settings_ethernet',
    default: false,
    kind: 'editor',
  },
  {
    name: 'Templates',
    src: '/open-scd/src/editors/Templates.js',
    icon: 'copy_all',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Publisher',
    src: '/open-scd/src/editors/Publisher.js',
    icon: 'publish',
    default: false,
    kind: 'editor',
  },
  {
    name: 'Cleanup',
    src: '/open-scd/src/editors/Cleanup.js',
    icon: 'cleaning_services',
    default: false,
    kind: 'editor',
  },
  {
    name: 'Open project',
    src: '/open-scd/src/menu/OpenProject.js',
    icon: 'folder_open',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'top',
  },
  {
    name: 'New project',
    src: '/open-scd/src/menu/NewProject.js',
    icon: 'create_new_folder',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'top',
  },
  {
    name: 'Save project',
    src: '/open-scd/src/menu/SaveProject.js',
    icon: 'save',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'top',
  },
  {
    name: 'Validate Schema',
    src: '/open-scd/src/validators/ValidateSchema.js',
    icon: 'rule_folder',
    default: true,
    kind: 'validator',
  },
  {
    name: 'Validate Templates',
    src: '/open-scd/src/validators/ValidateTemplates.js',
    icon: 'rule_folder',
    default: true,
    kind: 'validator',
  },
  {
    name: 'Import IEDs',
    src: '/open-scd/src/menu/ImportIEDs.js',
    icon: 'snippet_folder',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Create Virtual IED',
    src: '/open-scd/src/menu/VirtualTemplateIED.js',
    icon: 'developer_board',
    default: false,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Subscriber Update',
    src: '/open-scd/src/menu/SubscriberInfo.js',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Update desc (ABB)',
    src: '/open-scd/src/menu/UpdateDescriptionABB.js',
    default: false,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Update desc (SEL)',
    src: '/open-scd/src/menu/UpdateDescriptionSEL.js',
    default: false,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Merge Project',
    src: '/open-scd/src/menu/Merge.js',
    icon: 'merge_type',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Update Substation',
    src: '/open-scd/src/menu/UpdateSubstation.js',
    icon: 'merge_type',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Compare IED',
    src: '/open-scd/src/menu/CompareIED.js',
    icon: 'compare_arrows',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Show SCL History',
    src: '/open-scd/src/menu/SclHistory.js',
    icon: 'history_toggle_off',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'bottom',
  },
  {
    name: 'Help',
    src: '/open-scd/src/menu/Help.js',
    icon: 'help',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'bottom',
  },
  {
    name: 'Export Communication Section',
    src: '/open-scd/src/menu/ExportCommunication.js',
    icon: 'sim_card_download',
    default: false,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
];
