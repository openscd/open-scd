export const en = {
  userinfo: {
    loggedInAs: 'Logged in as {{name}}',
  },
  compas: {
    loading: 'Loading...',
    comment: 'Comment',
    newLabel: 'Add new label',
    notExists: 'Project no longer exists in CoMPAS!',
    noSclTypes: 'No types found in CoMPAS',
    noScls: 'No projects found in CoMPAS',
    sclFilter: 'Filter on:',
    noFilteredScls: 'No projects found matching the filter(s)',
    noSclVersions: 'No versions found for this project in CoMPAS',
    sclType: 'SCL Type',
    error: {
      type: 'Unable to determine type from document name!',
      server: 'Error communicating with CoMPAS Ecosystem',
      serverDetails: '{{type}}: {{message}}',
    },
    warning: {
      nsdoc: 'Could not load NSDoc file',
      nsdocDetails: 'Cannot load {{url}}',
    },
    changeset: {
      major: 'Major change',
      minor: 'Minor change',
      patch: 'Patch change',
    },
    import: {
      title: 'Import from API',
    },
    label: {
      selectLabels: 'Select labels to be show',
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
      saveTitle: 'Save project',
      saveAsTitle: 'Save as new project',
      saveAsVersionTitle: 'Save as new version to existing project',
      localTitle: 'Local',
      saveFileButton: 'Save to file...',
      compasTitle: 'CoMPAS',
      labelsTitle: 'CoMPAS Labels',
      addSuccess: 'Project added to CoMPAS.',
      updateSuccess: 'Project updated in CoMPAS',
    },
    updateSubstation: {
      title: 'Update substation',
    },
    importIEDS: {
      title: "Import IED's",
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
      sclInfo: 'Current project - Name: {{name}}, Version: {{version}}',
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
      deleteVersionSuccess:
        'Removed version {{version}} of project from CoMPAS',
      confirmButton: 'Confirm',
      compareButton: 'Compare versions',
      selectTwoVersionsTitle: 'Select two versions?',
      selectTwoVersionsMessage:
        'Select maximum two versions to compare with each other. Currently selected: {{size}}.',
      compareCurrentButton: 'Compare version (current)',
      selectOneVersionsTitle: 'Select one version?',
      selectOneVersionsMessage:
        'Select maximum one version to compare the current project against. Currently selected: {{size}}.',
    },
    scl: {
      wizardTitle: 'Edit SCL',
      filenameHelper: 'Filename used by CoMPAS when saving to a filesystem',
      labelsTitle: 'CoMPAS Labels',
      updateAction: 'Updated CoMPAS Private Element for SCL Element',
    },
    compare: {
      title: 'Compare version {{newVersion}} against version {{oldVersion}}',
      titleCurrent: 'Compare current project against version {{oldVersion}}',
      noDiff: 'No difference between versions',
      attributes: 'Attributes from',
      children: 'Child elements from',
    },
    settings: {
      title: 'CoMPAS Settings',
      sclDataServiceUrl: 'CoMPAS SCL Data Service URL',
      sclValidatorServiceUrl: 'CoMPAS SCL Validator Service URL',
      cimMappingServiceUrl: 'CoMPAS CIM Mapping Service URL',
      sclAutoAlignmentServiceUrl: 'CoMPAS SCL Auto Alignment Service URL',
      useWebsockets: 'Use Websockets',
    },
    exportIEDParams: {
      noIEDs: 'No IEDs found',
    },
    session: {
      headingExpiring: 'Your session is about to expire!',
      explainExpiring:
        'Because of inactivity ({{expiringSessionWarning}} minutes), your session with the CoMPAS Systems is about to expire. <br>' +
        "If you want to continue working press the button 'Continue'. Otherwise the session will expire in {{timeTillExpire}} minutes.",
      continue: 'Continue',
      headingExpired: 'Your session is expired!',
      explainExpiredWithProject:
        'Because of inactivity ({{expiredSessionMessage}} minutes), your session with the CoMPAS Systems is expired. <br>' +
        'To continue working you need to reload the browser to login again, but modifications to the project are lost. <br>' +
        "To prevent this you can first save the project to your local filesystem using the button 'Save project'. <br>" +
        "After loading the original project from CoMPAS you can add this file as new version using the tab 'CoMPAS Versions'.",
      explainExpiredWithoutProject:
        'Because of inactivity ({{expiredSessionMessage}} minutes), your session with the CoMPAS Systems is expired. <br>' +
        'To continue working you need to reload the browser to login again.',
      saveProject: 'Save project',
    },
    autogensubstation: {
      substationAmount: 'Found {{amount}} substation(s) to be created!',
      voltagelevelAmount: `Generating {{amount}} Voltage Level(s) for {{substationname}} substation!`,
      bayAmount: `Generating {{amount}} Bay Element(s) for {{voltagelevelname}} Voltage Level!`,
      substationGen: `Generated {{substationname}} substation with content!`,
    },
    export104: {
      noSignalsFound: 'Export 104 found no signals',
      invalidSignalWarning: 'Export 104 found invalid signal',
      errors: {
        tiOrIoaInvalid:
          'ti or ioa are missing or ioa is less than 4 digits, ti: "{{ ti }}", ioa: "{{ ioa }}"',
        unknownSignalType:
          'Unknown signal type for ti: "{{ ti }}", ioa: "{{ ioa }}"',
        noDoi: 'No parent DOI found for address with ioa: "{{ ioa }}"',
        noBay:
          'No Bay found bayname: "{{ bayName }}" for address with ioa: "{{ ioa }}"',
        noVoltageLevel:
          'No parent voltage level found for bay "{{ bayName }}" for ioa "{{ ioa }}"',
        noSubstation:
          'No parent substation found for voltage level "{{ voltageLevelName }}" for ioa "{{ ioa }}"',
      },
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
      identifierHelper:
        'The address of the sensor. The address is constructed of 3 numbers, separated by dots. The range of each number is 0-255.',
      sum: 'Sum',
      sumHelper:
        'The collection of three channel numbers for which the sum of currents or voltages will be calculated. The numbers are separated by commas. Values for the current sensor range from 0 - 5, for the voltage sensor 0-2.',
      channel: 'Channel',
      channelHelper:
        'The channel number on the sensor. Values for the current sensor range from 0 - 5, for the voltage sensor 0-2.',
      transformPrimary: 'TransformPrimary',
      transformPrimaryHelper:
        'The nominator of the ratio of the measement transformer.',
      transformSecondary: 'TransformSecondary',
      transformSecondaryHelper:
        'The denominator of the ratio of the measement transformer.',
      updateAction:
        'Locamation private fields updated for Logica Node {{lnName}}',
    },
  },
};
