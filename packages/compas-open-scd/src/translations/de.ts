import { Translations } from './loader.js';

export const de: Translations = {
  protocol104: {
    export: {
      noSignalsFound: 'Export 104 hat keine Signale gefunden',
      invalidSignalWarning: 'Export 104 hat ein ungültiges Signal gefunden',
      errors: {
        tiOrIoaInvalid:
          'ti or ioa fehlen oder ioa hat weniger als 4 Zeichen, ti: "{{ ti }}", ioa: "{{ ioa }}"',
        unknownSignalType:
          'Unbekannter Signaltyp für ti: "{{ ti }}", ioa: "{{ ioa }}"',
        noDoi: 'Es wurde kein Eltern DOI Element gefunden für ioa: "{{ ioa }}"',
        noBay:
          'Es wurde kein Bay Element mit dem Namen "{{ bayName }}" für ioa: "{{ ioa }}" gefunden',
        noVoltageLevel:
          'Es wurde kein VoltageLevel Element für Bay "{{ bayName }}" gefunden für ioa "{{ ioa }}"',
        noSubstation:
          'Es wurde kein Substation Element gefunden für VoltageLevel "{{ voltageLevelName }}" für ioa "{{ ioa }}"',
      },
    },
  },
  userinfo: {
    loggedInAs: '???',
  },
  compas: {
    loading: '???',
    comment: '???',
    newLabel: '???',
    notExists: '???',
    noSclTypes: '???',
    noScls: '???',
    sclFilter: '???:',
    noFilteredScls: '???',
    noSclVersions: '???',
    sclType: '???',
    error: {
      type: '???',
      server: '???',
      serverDetails: '{{type}}: {{message}}',
    },
    warning: {
      nsdoc: 'NSDoc-Datei konnte nicht geladen werden',
      nsdocDetails: 'Die {{url}} kann nicht geladen werden',
    },
    changeset: {
      major: '???',
      minor: '???',
      patch: '???',
    },
    import: {
      title: '???',
    },
    label: {
      selectLabels: '???',
    },
    open: {
      title: '???',
      localTitle: '???',
      selectFileButton: '???',
      compasTitle: 'CoMPAS',
      listSclTypes: '???',
      listScls: '??? ({{ type }})',
      otherTypeButton: '???',
    },
    save: {
      saveTitle: '???',
      saveAsTitle: '???',
      saveAsVersionTitle: '???',
      localTitle: '???',
      saveFileButton: '???',
      compasTitle: 'CoMPAS',
      labelsTitle: 'CoMPAS ???',
      addSuccess: '???',
      updateSuccess: '???',
    },
    updateSubstation: {
      title: '???',
    },
    importIEDS: {
      title: '???',
    },
    merge: {
      title: '???',
    },
    autoAlignment: {
      title: '???',
      button: '???',
      missing: '???',
      success: '???',
    },
    uploadVersion: {
      title: '???',
      selectButton: '???...',
      filename: '???',
      updateSuccess: '???',
    },
    versions: {
      title: '???',
      sclInfo: '???: {{name}}, ???: {{version}}',
      addVersionButton: '???',
      confirmRestoreTitle: '???',
      confirmRestore: '??? {{version}}?',
      restoreVersionSuccess: '??? {{version}}',
      deleteProjectButton: '???',
      confirmDeleteTitle: '???',
      confirmDelete: '???',
      deleteSuccess: '???',
      confirmDeleteVersionTitle: '???',
      confirmDeleteVersion: '??? {{version}}?',
      deleteVersionSuccess: '??? {{version}}',
      confirmButton: '???',
      compareButton: '???',
      selectTwoVersionsTitle: '???',
      selectTwoVersionsMessage: '???',
      compareCurrentButton: '???',
      selectOneVersionsTitle: '???',
      selectOneVersionsMessage: '???',
    },
    scl: {
      wizardTitle: '???',
      filenameHelper: '???',
      labelsTitle: 'CoMPAS ???',
      updateAction: '???',
    },
    compare: {
      title: '???',
      titleCurrent: '???',
      noDiff: '???',
      attributes: 'Attribute',
      children: 'Kindelemente',
    },
    settings: {
      title: 'CoMPAS Einstellungen',
      sclDataServiceUrl: 'CoMPAS SCL Data Service URL',
      sclValidatorServiceUrl: 'CoMPAS SCL Validator Service URL',
      cimMappingServiceUrl: 'CoMPAS CIM Mapping Service URL',
      sclAutoAlignmentServiceUrl: 'CoMPAS SCL Auto Alignment Service URL',
      useWebsockets: '???',
    },
    exportIEDParams: {
      noIEDs: 'Keine IEDs in Projekt',
    },
    session: {
      headingExpiring: '???',
      explainExpiring: '???',
      continue: '???',
      headingExpired: '???',
      explainExpiredWithProject: '???',
      explainExpiredWithoutProject: '???',
      saveProject: '???',
    },
    autogensubstation: {
      substationAmount: '???',
      voltagelevelAmount: '???',
      bayAmount: '???',
      substationGen: '???',
    },
  },
  locamation: {
    vmu: {
      ied: {
        title: '???',
        missing: '???',
        name: '???',
      },
      ldevice: {
        name: '???',
      },
      ln: {
        title: '???',
        editTitle: '???',
        name: '???',
      },
      version: '???',
      identifier: '???',
      identifierHelper: '???',
      sum: '???',
      sumHelper: '???',
      channel: '???',
      channelHelper: '???',
      transformPrimary: '???',
      transformPrimaryHelper: '???',
      transformSecondary: '???',
      transformSecondaryHelper: '???',
      updateAction: '???',
    },
  },
};
