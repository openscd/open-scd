export const en = {
  settings: {
    name: 'Settings',
    language: 'Language',
    languages: { de: 'German (Deutsch)', en: 'English' },
    dark: 'Dark theme',
  },
  menu: {
    name: 'Menu',
    open: 'Open project',
    new: 'New project',
    importIED: 'Import IED',
    save: 'Save project',
    validate: 'Validate project',
    viewLog: 'View log',
  },
  openSCD: {
    loading: 'Loading project {{ name }}',
    loaded: '{{ name }} loaded',
    readError: 'Error reading {{ name }}',
    readAbort: 'Aborted reading {{ name }}',
  },
  editing: {
    created: 'Added {{ name }}',
    deleted: 'Removed {{ name }}',
    moved: 'Moved {{ name }}',
    updated: 'Edited {{ name }}',
    error: {
      create: 'Could not add {{ name }}',
      update: 'Could not edit {{ name }}',
      move: 'Could not move {{ name }}',
      duplicate: 'Could not copy {{name}}',
      nameClash:
        'Parent {{ parent }} already contains a {{ child }} named "{{ name }}"',
    },
  },
  validating: {
    valid: '{{ name }} validation succesful',
    invalid: '{{ name }} validation failed',
    fatal: 'Fatal validation error',
    loadError: 'Could not load schema {{ name }}',
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
  add: 'Add',
  remove: 'Remove',
  edit: 'Edit',
  move: 'Move',
  create: 'Create',
  save: 'Save',
  saveAs: 'Save as',
  reset: 'Reset',
  cancel: 'Cancel',
  close: 'Close',
  filter: 'Filter',
  undo: 'Undo',
  redo: 'Redo',
  duplicate: 'Clone',
};
