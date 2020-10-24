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
    validated: '{{ name }} validation succesful',
    invalidated: '{{ name }} validation failed',
    readError: '{{ name }} read error',
    readAbort: '{{ name }} read aborted',
  },
  editing: {
    created: '{{ name }} added',
    deleted: '{{ name }} removed',
    moved: '{{ name }} moved',
    updated: '{{ name }} edited',
  },
  textfield: {
    required: 'Required',
    nonempty: 'Must not be empty',
    noMultiplier: 'none',
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
    missing: 'No Substation',
    wizard: {
      nameHelper: 'Substation Name',
      descHelper: 'Substation Description',
      title: {
        add: 'Add Substation',
        edit: 'Edit Substation',
      },
    },
    action: {
      addvoltagelevel: 'Add Voltage Level',
    },
  },
  voltagelevel: {
    wizard: {
      nameHelper: 'Voltage Level Name',
      descHelper: 'Voltage Level Description',
      nomFreqHelper: 'Nominal Frequency',
      numPhaseHelper: 'Number of Phases',
      voltageHelper: 'Nominal Voltage',
      title: {
        add: 'Add Voltage Level',
        edit: 'Edit Voltage Level',
      },
    },
  },
  bay: {
    wizard: {
      nameHelper: 'Bay Name',
      descHelper: 'Bay Description',
      title: {
        add: 'Add Bay',
        edit: 'Edit Bay',
      },
    },
  },
  conductingequipment: {
    wizard: {
      nameHelper: 'Conducting Equipment Name',
      descHelper: 'Conducting Equipment Description',
      typeHelper: 'Conducting Equipment Type',
      title: {
        add: 'Add Conducting Equipment',
        edit: 'Edit Conducting Equipment',
      },
    },
  },
  add: 'Add',
  edit: 'Edit',
  save: 'Save',
  reset: 'Reset',
  cancel: 'Cancel',
  close: 'Close',
  undo: 'Undo',
  redo: 'Redo',
};
