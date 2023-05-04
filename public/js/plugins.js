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
    default: true,
    kind: 'editor',
  },
  {
    name: 'Single Line Diagram',
    src: '/src/editors/SingleLineDiagram.js',
    icon: 'edit',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Subscriber Message Binding (GOOSE)',
    src: '/src/editors/GooseSubscriberMessageBinding.js',
    icon: 'link',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Subscriber Data Binding (GOOSE)',
    src: '/src/editors/GooseSubscriberDataBinding.js',
    icon: 'link',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Subscriber Later Binding (GOOSE)',
    src: '/src/editors/GooseSubscriberLaterBinding.js',
    icon: 'link',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Subscriber Message Binding (SMV)',
    src: '/src/editors/SMVSubscriberMessageBinding.js',
    icon: 'link',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Subscriber Data Binding (SMV)',
    src: '/src/editors/SMVSubscriberDataBinding.js',
    icon: 'link',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Subscriber Later Binding (SMV)',
    src: '/src/editors/SMVSubscriberLaterBinding.js',
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
    name: '104',
    src: '/src/editors/Protocol104.js',
    icon: 'settings_ethernet',
    default: false,
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
    name: 'CoMPAS Versions',
    src: '/src/compas-editors/CompasVersions.js',
    icon: 'copy_all',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Publisher',
    src: '/src/editors/Publisher.js',
    icon: 'publish',
    default: false,
    kind: 'editor',
  },
  {
    name: 'Cleanup',
    src: '/src/editors/Cleanup.js',
    icon: 'cleaning_services',
    default: false,
    kind: 'editor',
  },
  {
    name: 'Open project',
    src: '/src/menu/CompasOpen.js',
    icon: 'folder_open',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'top',
  },
  {
    name: 'New project',
    src: '/src/menu/NewProject.js',
    icon: 'create_new_folder',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'top',
  },
  {
    name: 'Project from CIM',
    src: '/src/menu/CompasCimMapping.js',
    icon: 'input',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'top',
  },
  {
    name: 'Import from API',
    src: '/src/menu/CompasImportFromApi.js',
    icon: 'cloud_download',
    default: false,
    kind: 'menu',
    requireDoc: false,
    position: 'top',
  },
  {
    name: 'Save project',
    src: '/src/menu/CompasSave.js',
    icon: 'save',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'top',
  },
  {
    name: 'Save project as',
    src: '/src/menu/CompasSaveAs.js',
    icon: 'save',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'top',
  },
  {
    name: 'Save as version',
    src: '/src/menu/CompasSaveAsVersion.js',
    icon: 'save',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'top',
  },
  {
    name: 'Validate using OCL',
    src: '/src/validators/CompasValidateSchema.js',
    icon: 'rule_folder',
    default: true,
    kind: 'validator',
  },
  {
    name: 'Validate Schema',
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
    kind: 'validator',
  },
  {
    name: 'Import IEDs',
    src: '/src/menu/CompasImportIEDs.js',
    icon: 'snippet_folder',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Create Virtual IED',
    src: '/src/menu/VirtualTemplateIED.js',
    icon: 'developer_board',
    default: false,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Subscriber Update',
    src: '/src/menu/SubscriberInfo.js',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Update desc (ABB)',
    src: '/src/menu/UpdateDescriptionABB.js',
    default: false,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Update desc (SEL)',
    src: '/src/menu/UpdateDescriptionSEL.js',
    default: false,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Merge Project',
    src: '/src/menu/CompasMerge.js',
    icon: 'merge_type',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Update Substation',
    src: '/src/menu/CompasUpdateSubstation.js',
    icon: 'merge_type',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Compare IED',
    src: '/src/menu/CompasCompareIED.js',
    icon: 'compare_arrows',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Auto Align SLD',
    src: '/src/menu/CompasAutoAlignment.js',
    icon: 'dashboard',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Export IED Params',
    src: '/src/menu/ExportIEDParams.js',
    icon: 'download',
    default: false,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Locamation VMU',
    src: '/src/menu/LocamationVMU.js',
    icon: 'edit_note',
    default: false,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Show SCL History',
    src: '/src/menu/SclHistory.js',
    icon: 'history_toggle_off',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'bottom',
  },
  {
    name: 'CoMPAS Settings',
    src: '/src/menu/CompasSettings.js',
    icon: 'settings',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'bottom',
  },
  {
    name: 'Help',
    src: '/src/menu/Help.js',
    icon: 'help',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'bottom',
  },
  {
    name: 'Export Communication Section',
    src: '/src/menu/ExportCommunication.js',
    icon: 'sim_card_download',
    default: false,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
  {
    name: 'Sitipe',
    src: '/src/editors/Sitipe.js',
    icon: 'precision_manufacturing',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Autogen Substation',
    src: '/src/editors/substation/autogen-substation/autogen-substation.js',
    icon: 'playlist_add_circle',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle',
  },
];
