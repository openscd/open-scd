export const en = {
  scl: {
    id: 'ID',
    name: 'Name',
    desc: 'Description',
    ord: 'Ordinal',
    value: 'Value',
    EnumVal: 'Enum Value',
    EnumType: 'Enum Type',
    DA: 'Data attribute',
    DO: 'Data object',
    DAType: 'Data Attribute Type',
    DOType: 'Data Object Type',
    CDC: 'Common data class',
    Report: 'Report',
    LN: 'Logical Node',
    bType: 'Basic type',
    type: 'Type',
    sAddr: 'Short address',
    valKind: 'Value kind',
    valImport: 'Import value',
    fc: 'Function contraint',
    LNodeType: 'Logical Node Type',
    lnClass: 'Logical node class',
    accessControl: 'Access control',
    transient: 'Transient data',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    languages: { de: 'German (Deutsch)', en: 'English' },
    dark: 'Dark theme',
    mode: 'Pro mode',
    showieds: 'Show IEDs in substation editor',
  },
  menu: {
    title: 'Menu',
    viewLog: 'View log',
  },
  openSCD: {
    loading: 'Loading project {{ name }}',
    loaded: '{{ name }} loaded',
    readError: 'Error reading {{ name }}',
    readAbort: 'Aborted reading {{ name }}',
  },
  zeroline: {
    iedsloading: 'Loading IEDs...',
    showieds: 'Display/hide IEDs',
    commmap: 'Communication mapping',
  },
  editing: {
    created: 'Added {{ name }}',
    deleted: 'Removed {{ name }}',
    moved: 'Moved {{ name }}',
    updated: 'Edited {{ name }}',
    import: 'Imported {{name}}',
    error: {
      create: 'Could not add {{ name }}',
      update: 'Could not edit {{ name }}',
      move: 'Could not move {{ name }}',
      duplicate: 'Could not copy {{ name }}',
      nameClash:
        'Parent {{ parent }} already contains a {{ child }} named "{{ name }}"',
    },
  },
  textfield: {
    required: 'Required',
    nonempty: 'Must not be empty',
    noMultiplier: 'none',
    unique: 'Must be unique',
  },
  log: {
    name: 'Log',
    placeholder: 'Edits, errors, and other notifications will show up here.',
    snackbar: {
      show: 'Show',
      placeholder: 'No errors',
    },
  },
  plugins: {
    heading: 'Extensions',
    editor: 'Editor tab',
    menu: 'Menu entry',
    requireDoc: 'Requires loaded document',
    top: 'top',
    middle: 'middle',
    bottom: 'bottom',
    validator: 'Validator',
    add: {
      heading: 'Add custom extension',
      warning: `Here you may add remote extensions directly from a custom URL.
                You do this at your own risk.`,
      name: 'Name',
      nameHelper: 'Your preferred extension name',
      src: 'URL',
      srcHelper: 'The vendor supplied extension URL',
    },
  },
  validator: {
    schema: {
      title: 'Validate project',
      valid: '{{ name }} validation successful',
      invalid: '{{ name }} validation failed',
      fatal: 'Fatal validation error',
      loadError: 'Could not load schema {{ name }}',
    },
    templates: {
      title: 'Validate templates',
      mandatoryChild:
        '{{ tag }} {{ id }} is missing mandatory child {{ childTag }} {{ childId }}',
      missingCoDO: 'Control service related DA of type {{ type }} is missing',
      missingCtlModelDef:
        'Missing ctlModel definition. Cannot validate {{ childTag }} {{ childId }} within {{ tag }} {{ id }}',
    },
  },
  substation: {
    name: 'Substation',
    missing: 'No substation',
    wizard: {
      nameHelper: 'Substation name',
      descHelper: 'Substation description',
      title: {
        add: 'Add substation',
        edit: 'Edit substation',
      },
    },
    action: {
      addvoltagelevel: 'Add voltage level',
    },
  },
  voltagelevel: {
    name: 'Voltage level',
    wizard: {
      nameHelper: 'Voltage level name',
      descHelper: 'Voltage level description',
      nomFreqHelper: 'Nominal frequency',
      numPhaseHelper: 'Number of phases',
      voltageHelper: 'Nominal voltage',
      title: {
        add: 'Add voltage level',
        edit: 'Edit voltage level',
      },
    },
  },
  bay: {
    name: 'Bay',
    wizard: {
      nameHelper: 'Bay name',
      descHelper: 'Bay description',
      title: {
        add: 'Add bay',
        edit: 'Edit bay',
      },
    },
  },
  conductingequipment: {
    name: 'Conducting Equipment',
    wizard: {
      nameHelper: 'Conducting equipment name',
      descHelper: 'Conducting equipment description',
      typeHelper: 'Conducting equipment type',
      title: {
        add: 'Add conducting equipment',
        edit: 'Edit conducting equipment',
      },
    },
    unknownType: 'Unknown type',
  },
  templates: {
    name: 'Data Type Templates',
    missing: 'DataTypeTemplates missing',
    add: 'Add DataTypeTemplates',
  },
  'enum-val': {
    wizard: {
      title: {
        add: 'Add EnumVal',
        edit: 'Edit EnumVal',
      },
    },
  },
  enum: {
    wizard: {
      title: {
        add: 'Add EnumType',
        edit: 'Edit EnumType',
      },
    },
  },
  datype: {
    wizard: {
      title: {
        add: 'Add DAType',
        edit: 'Edit DAType',
      },
    },
  },
  bda: {
    wizard: {
      title: {
        add: 'Add BDA',
        edit: 'Edit BDA',
      },
    },
  },
  da: {
    wizard: {
      title: {
        add: 'Add DA',
        edit: 'Edit DA',
      },
    },
  },
  sdo: {
    wizard: {
      title: {
        add: 'Add SDO',
        edit: 'Edit SDO',
      },
    },
  },
  do: {
    wizard: {
      title: {
        add: 'Add DO',
        edit: 'Edit DO',
      },
    },
  },
  dotype: {
    wizard: {
      title: {
        add: 'Add DOType',
        edit: 'Edit DOType',
      },
      enums: 'Default enumerations',
    },
  },
  lnodetype: {
    wizard: {
      title: {
        add: 'Add LNodeType',
        edit: 'Edit LNodeType',
        select: 'Select Data Objects',
      },
    },
    autoimport: 'Use LN class from OpenSCD template',
    missinglnclass: 'Missing pre-defined LN class',
  },
  lnode: {
    wizard: {
      title: {
        selectIEDs: 'Select IEDs',
        selectLDs: 'Select logical devices',
        selectLNs: 'Select logical nodes',
      },
      placeholder: 'Please load an SCL file that contains IED elements.',
    },
    tooltip: 'Create logical nodes reference',
  },
  guess: {
    wizard: {
      primary: 'Guess content',
      title: 'Select control model (ctlModel)',
      description: `IEDs often contain more controlable logical nodes than switch gear in the field. \n You can select the control model(s) used specific for switch gear.`,
    },
  },
  merge: {
    title: 'Merge',
    defaultTitle: 'Merge {{ source }} into {{ sink }} ({{ tag }})',
    log: 'Merged {{ tag }} {{ source }} into {{ sink }}',
    children: 'Child elements',
  },
  import: {
    title: 'Import IEDs',
    log: {
      successful: 'IED {{ name }} loaded',
      parsererror: 'Parser error',
      loaderror: 'Could not load file',
      importerror: 'Could not import IED',
      missingied: 'No IED element in the file',
      nouniqueied: 'IED element {{ name }} already in the file',
    },
  },
  communication: {
    name: 'Network Configuration',
    missing: 'No subnetwork',
  },
  subnetwork: {
    name: 'Subnetwork',
    wizard: {
      nameHelper: 'Subnetwork name',
      descHelper: 'Subnetwork description',
      typeHelper: 'Network type (e.g. 8-MMS)',
      bitrateHelper: 'Bit rate',
      title: {
        add: 'Add subnetwork',
        edit: 'Edit subnetwork',
      },
    },
  },
  connectedap: {
    name: 'Connected access point',
    wizard: {
      addschemainsttype: 'Add XMLSchema-instance type',
      title: {
        connect: 'Connect access point',
        edit: 'Edit access point',
      },
    },
    action: {
      addaddress: 'Edit Address ({{iedName}} - {{apName}})',
    },
  },
  subscriber: {
    title: 'Subscriber update',
    description: 'Subscriber update: ',
    nonewitems: 'no new IEDName elements to add',
    message: '{{updatenumber}} IEDName elements added to the project',
  },
  commmap: {
    title: 'Communication mapping',
    connectCB: 'Connect {{cbType}}',
    connectToIED: 'Connect to {{iedName}}',
    sourceIED: 'Source IED',
    sinkIED: 'Sink IED',
  },
  updatesubstation: {
    title: 'Update substation',
  },
  code: {
    log: 'Changed element in XML editor: {{id}}',
  },
  add: 'Add',
  new: 'New',
  remove: 'Remove',
  edit: 'Edit',
  move: 'Move',
  create: 'Create',
  save: 'Save',
  saveAs: 'Save as',
  open: 'Open',
  reset: 'Reset',
  cancel: 'Cancel',
  close: 'Close',
  filter: 'Filter',
  undo: 'Undo',
  redo: 'Redo',
  duplicate: 'Clone',
  connect: 'Connect',
  disconnect: 'Disconnect',
  next: 'Next',
};
