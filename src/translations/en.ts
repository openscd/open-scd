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
    fc: 'Function constraint',
    LNodeType: 'Logical Node Type',
    lnClass: 'Logical Node Class',
    accessControl: 'Access control',
    transient: 'Transient data',
    Val: 'Default value',
    dchg: 'Trigger on data change',
    qchg: 'Trigger on quality change',
    dupd: 'Trigger on data update',
    fixedOffs: 'Fixed offset',
    securityEnable: 'Security enabled',
    DataSet: 'Dataset',
    Communication: 'Communication',
    TrgOps: 'Trigger options',
    OptFields: 'Optional fields',
    multicast: 'SMV acc. to IEC 61850 9-2',
    smpMod: 'Sample mode',
    smpRate: 'Sample rate',
    nofASDU: 'Samples per paket',
  },
  settings: {
    title: 'Settings',
    language: 'Language',
    languages: { de: 'German (Deutsch)', en: 'English' },
    dark: 'Dark theme',
    mode: 'Pro mode',
    showieds: 'Show IEDs in substation editor',
    selectFileButton: 'Select file',
    loadNsdTranslations: 'Uploading NSDoc files',
    invalidFileNoIdFound: 'Invalid NSDoc; no \'id\' attribute found in file',
    invalidNsdocVersion: 'The version of {{ id }} NSD ({{ nsdVersion }}) does not correlate with the version of the corresponding NSDoc ({{ nsdocVersion }})'
  },
  menu: {
    new: 'New project',
    title: 'Menu',
    viewLog: 'View log',
    viewDiag: 'View diagnostics',
  },
  wizard: {
    title: {
      select: 'Select {{tagName}}',
      edit: 'Edit {{tagName}}',
      add: 'Add {{tagName}}',
    },
  },
  openSCD: {
    loading: 'Loading project {{ name }}',
    loaded: '{{ name }} loaded',
    readError: 'Error reading {{ name }}',
    readAbort: 'Aborted reading {{ name }}',
  },
  zeroline: {
    iedsloading: 'Loading IEDs...',
    showieds: 'Show/hide IEDs in substation editor',
    commmap: 'Communication mapping',
    reportcontrol: 'Show all Reports',
    gsecontrol: 'Show all GOOSEs',
    smvcontrol: 'Show all Sampled Values',
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
  diag: {
    name: 'Diagnostics',
    zeroissues: 'No errors found in the project',
    placeholder: 'Issues found during validation will show up here',
    missingnsd:
      'Cannot validate DataTypeTemplates. The version of the project must be higher than or equal to 2007B3',
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
      valid: '{{ name }} XML schema validation successful',
      invalid: '{{ name }} XML schema validation failed',
      fatal: 'Fatal validation error',
      loadError: 'Could not load XML schema {{ name }}',
    },
    templates: {
      title: 'Validate templates',
      mandatoryChild:
        '{{ tag }} {{ id }} is missing mandatory child {{ childTag }} {{ childId }}',
      missingAttribute:
        'The attribute {{attr}} is required but missing in {{element}}',
      incorrectAttribute:
        'The attribute {{attr}} is incorrect in the element {{element}}.',
      missingReference:
        '{{tag}}:{{name}} has a invalid reference - type attribute cannot be connected to a template',
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
  iededitor: {
    searchHelper: 'Select IED',
    searchHelperDesc: '({{description}})',
    missing: 'No IED',
    toggleChildElements: 'Toggle child elements',
  },
  ied: {
    wizard: {
      nameHelper: 'IED name',
      descHelper: 'IED description',
      title: {
        edit: 'Edit IED',
      },
    },
    action: {
      updateied: 'Edited IED "{{iedName}}"',
    },
  },
  powertransformer: {
    wizard: {
      nameHelper: 'Power transformer name',
      descHelper: 'Power transformer description',
      title: {
        edit: 'Edit power transformer',
      },
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
  connectivitynode: {
    name: 'Connectivity Node',
    wizard: {
      nameHelper: 'Connectivity node name',
      pathNameHelper: 'Connectivity node pathname',
      title: {
        add: 'Add Connectivity node',
        edit: 'Edit Connectivity node',
      },
    },
  },
  terminal: {
    name: 'Terminal',
    wizard: {
      nameHelper: 'Terminal name',
      connectivityNodeHelper: 'Terminal connectivity node',
      cNodeNameHelper: 'Terminal connectivity node name',
      title: {
        add: 'Add Terminal',
        edit: 'Edit Terminal',
      },
    },
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
      description: `IEDs often contain more controllable logical nodes than switchgear in the field. \n You can select the control model(s) used specific for switchgear.`,
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
    },
    action: {
      addaddress: 'Edit Address ({{iedName}} - {{apName}})',
    },
  },
  gse: {
    action: {
      addaddress: 'Edit GSE ({{identity}})',
    },
  },
  smv: {
    action: {
      addaddress: 'Edit SMV ({{identity}})',
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
  updatedesc: {
    abb: 'Added signal descriptions to ABB IEDs',
    sel: 'Added signal descriptions to SEL IEDs',
  },
  sld: {
    substationSelector: 'Select a substation',
    wizard: {
      xCoordinateHelper: 'X-Coordinate for Single Line Diagram',
      yCoordinateHelper: 'Y-Coordinate for Single Line Diagram',
    },
  },
  userinfo: {
    loggedInAs: 'Logged in as {{name}}'
  },
  add: 'Add',
  new: 'New',
  remove: 'Remove',
  delete: 'Delete',
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

  compas: {
    loading: 'Loading...',
    comment: 'Comment',
    notExists: 'Project no longer exists in CoMPAS!',
    noSclTypes: 'No types found in CoMPAS',
    noScls: 'No projects found in CoMPAS',
    noSclVersions: 'No versions found for this project in CoMPAS',
    error: {
      type: 'Unable to determine type from document name!',
      server: 'Error communicating with CoMPAS Server',
      serverDetails: '{{type}}: {{message}}',
    },
    changeset: {
      major: 'Major change',
      minor: 'Minor change',
      patch: 'Patch change',
    },
    open: {
      title: 'Open project',
      localTitle: 'Local',
      selectFileButton: 'Open file...',
      compasTitle: 'CoMPAS',
      listSclTypes: 'Select type of project',
      listScls: 'Select project ({{ type }})',
      otherTypeButton: 'Other type...',
    },
    save: {
      title: 'Save project',
      localTitle: 'Local',
      saveFileButton: 'Save to file...',
      compasTitle: 'CoMPAS',
      addSuccess: 'Project added to CoMPAS.',
      updateSuccess: 'Project updated in CoMPAS',
    },
    updateSubstation: {
      title: 'Update substation',
    },
    importIEDS: {
      title: 'Import IED\'s',
    },
    merge: {
      title: 'Merge project',
    },
    autoAlignment: {
      title: 'Auto align SLD for selected substations',
      button: 'Execute',
      missing: 'No substations',
      success: 'Updated X/Y Coordinates for substation(s)',
    },
    uploadVersion: {
      title: 'Upload new version of project to CoMPAS',
      selectButton: 'Select file...',
      filename: 'Filename',
      updateSuccess: 'Project uploaded in CoMPAS',
    },
    versions: {
      title: 'CoMPAS Versions',
      addVersionButton: 'Add version',
      confirmRestoreTitle: 'Restore version?',
      confirmRestore: 'Are you sure to restore version {{version}}?',
      restoreVersionSuccess: 'Restored version {{version}} of project',
      deleteProjectButton: 'Delete project',
      confirmDeleteTitle: 'Delete project?',
      confirmDelete: 'Are you sure to delete all version(s)?',
      deleteSuccess: 'Removed project from CoMPAS',
      confirmDeleteVersionTitle: 'Delete version?',
      confirmDeleteVersion: 'Are you sure to delete version {{version}}?',
      deleteVersionSuccess: 'Removed version {{version}} of project from CoMPAS',
      confirmButton: 'Confirm',
      compareButton: 'Compare versions',
      selectTwoVersionsTitle: 'Select two versions?',
      selectTwoVersionsMessage: 'Select maximum two versions to compare with each other. Currently selected: {{size}}.',
      compareCurrentButton: 'Compare version (current)',
      selectOneVersionsTitle: 'Select one version?',
      selectOneVersionsMessage: 'Select maximum one version to compare the current project against. Currently selected: {{size}}.',
    },
    compare: {
      title: 'Compare version {{oldVersion}} with version {{newVersion}}',
      attributes: 'Attributes from',
      children: 'Child elements from',
    },
    settings: {
      title: 'CoMPAS Settings',
      sclDataServiceUrl: 'CoMPAS SCL Data Service URL',
      cimMappingServiceUrl: 'CoMPAS CIM Mapping Service URL',
      sclAutoAlignmentServiceUrl: 'CoMPAS SCL Auto Alignment Service URL',
    },
    session: {
      headingExpiring: 'Your session is about to expire!',
      explainExpiring: 'Because of inactivity ({{expiringSessionWarning}} minutes), your session with the CoMPAS Systems is about to expire. <br>' +
        'If you want to continue working press the button \'Continue\'. Otherwise the session will expire in {{timeTillExpire}} minutes.',
      continue: 'Continue',
      headingExpired: 'Your session is expired!',
      explainExpiredWithProject: 'Because of inactivity ({{expiredSessionMessage}} minutes), your session with the CoMPAS Systems is expired. <br>' +
        'To continue working you need to reload the browser to login again, but modifications to the project are lost. <br>' +
        'To prevent this you can first save the project to your local filesystem using the button \'Save project\'. <br>' +
        'After loading the original project from CoMPAS you can add this file as new version using the tab \'CoMPAS Versions\'.',
      explainExpiredWithoutProject: 'Because of inactivity ({{expiredSessionMessage}} minutes), your session with the CoMPAS Systems is expired. <br>' +
        'To continue working you need to reload the browser to login again.',
      saveProject: 'Save project',
    },
  },
  locamation: {
    vmu: {
      ied: {
        title: 'Configure Locamation VMUs',
        missing: 'No Locamation IEDs with Logica Devices found',
        name: 'IED',
      },
      ldevice: {
        name: 'Logical Device',
      },
      ln: {
        title: 'Configure Locamation VMUs (IED)',
        editTitle: 'Edit VMU',
        name: 'Logical Node',
      },
      version: 'Locamation VMU Version',
      identifier: 'Identifier',
      identifierHelper: 'The address of the sensor. The address is constructed of 3 numbers, separated by dots. The range of each number is 0-255.',
      sum: 'Sum',
      sumHelper: 'The collection of three channel numbers for which the sum of currents or voltages will be calculated. The numbers are separated by commas. Values for the current sensor range from 0 - 5, for the voltage sensor 0-2.',
      channel: 'Channel',
      channelHelper: 'The channel number on the sensor. Values for the current sensor range from 0 - 5, for the voltage sensor 0-2.',
      transformPrimary: 'TransformPrimary',
      transformPrimaryHelper: 'The nominator of the ratio of the measement transformer.',
      transformSecondary: 'TransformSecondary',
      transformSecondaryHelper: 'The denominator of the ratio of the measement transformer.',
      updateAction: 'Locamation private fields updated for Logica Node {{lnName}}',
    },
  },
};
