import { Translations } from './loader.js';

export const de: Translations = {
  scl: {
    id: 'ID',
    name: 'Name',
    desc: 'Beschreibung',
    ord: 'Rang',
    value: 'Wert',
    EnumVal: 'Enum Wert',
    EnumType: 'Enum Typ',
    DAType: 'Datenattribut Typ',
    DOType: 'Datenobjekt Typ',
    Report: 'Report',
    LN: 'Logischer Knoten',
  },
  settings: {
    name: 'Einstellungen',
    language: 'Sprache',
    languages: { de: 'Deutsch', en: 'Englisch (English)' },
    dark: 'Dunkles Design',
  },
  menu: {
    name: 'Menü',
    open: 'Projekt öffnen',
    new: 'Neues Projekt',
    importIED: 'IED importieren',
    save: 'Projekt speichern',
    subscriberinfo: 'Empfänger aktualisieren',
    validate: 'Projekt validieren',
    viewLog: 'Protokoll anzeigen',
  },
  openSCD: {
    loading: 'Lade Projekt {{ name }}',
    loaded: '{{ name }} geladen',
    readError: '{{ name }} Lesefehler',
    readAbort: '{{ name }} Leseabbruch',
  },
  editing: {
    created: '{{ name }} hinzugefügt',
    deleted: '{{ name }} entfernt',
    moved: '{{ name }} verschoben',
    updated: '{{ name }} bearbeitet',
    import: '{{name}} importiert',
    error: {
      create: 'Konnte {{ name }} nicht hinzufügen',
      update: 'Konnte {{ name }} nicht bearbeiten',
      move: 'Konnte {{ name }} nicht verschieben',
      duplicate: 'Konnte {{name}} nicht kopieren',
      nameClash:
        '{{ parent }} enthält bereits ein {{ child }} Kind namens "{{ name }}"',
    },
  },
  validating: {
    valid: '{{ name }} erfolgreich validiert',
    invalid: '{{ name }} Validierung fehlgeschlagen',
    fatal: 'Fataler Validierungsfehler',
    loadError: 'Konnte Schema {{ name }} nicht laden',
  },
  textfield: {
    required: 'Pflichtfeld',
    nonempty: 'Darf nicht leer sein',
    noMultiplier: 'keiner',
    unique: 'Darf sich nicht wiederholen',
  },
  log: {
    name: 'Protokoll',
    placeholder:
      'Hier werden Änderungen, Fehler und andere Meldungen angezeigt.',
    snackbar: {
      show: 'Anzeigen',
      placeholder: 'Keine Fehler',
    },
  },
  plugins: {
    heading: 'Erweiterungen',
    editor: 'Editor',
    triggered: 'Menüeintrag',
    add: {
      heading: 'Benutzerdefinierte Erweiterung',
      warning: `Hier können Sie benutzerdefinierte Erweiterungen hinzufügen.
                OpenSCD übernimm hierfür keine Gewähr.`,
      name: 'Name',
      nameHelper: 'Lokaler Name der Erweiterung (frei wählbar)',
      src: 'URL',
      srcHelper: 'Die Erweiterungs-URL des Herstellers',
    },
  },
  substation: {
    name: 'Schaltanlage',
    missing: 'Keine Schaltanlage',
    wizard: {
      nameHelper: 'Name der Schaltanlage',
      descHelper: 'Beschreibung der Schaltanlage',
      title: {
        add: 'Schaltanlage hinzufügen',
        edit: 'Schaltanlage bearbeiten',
      },
    },
    action: {
      addvoltagelevel: 'Spannungsebene hinzufügen',
    },
  },
  voltagelevel: {
    name: 'Spannungsebene',
    wizard: {
      nameHelper: 'Name der Spannungsebene',
      descHelper: 'Beschreibung der Spannungsebene',
      nomFreqHelper: 'Nennfrequenz',
      numPhaseHelper: 'Phasenanzahl',
      voltageHelper: 'Nennspannung',
      title: {
        add: 'Spannungsebene hinzufügen',
        edit: 'Spannungsebene bearbeiten',
      },
    },
  },
  bay: {
    name: 'Feld',
    wizard: {
      nameHelper: 'Feldname',
      descHelper: 'Beschreibung des Feldes',
      title: {
        add: 'Feld hinzufügen',
        edit: 'Feld bearbeiten',
      },
    },
  },
  conductingequipment: {
    name: 'Primärelement',
    wizard: {
      nameHelper: 'Name des Primärelements',
      descHelper: 'Beschreibung des Primärelements',
      typeHelper: 'Type des Primärelements',
      title: {
        add: 'Primärelement hinzufügen',
        edit: 'Primärelement bearbeiten',
      },
    },
    unknownType: 'Unbekannter Typ',
  },
  templates: {
    name: 'Data Type Templates',
    missing: 'DataTypeTemplates fehlen',
    add: 'DataTypeTemplates hinzufügen',
  },
  'enum-val': {
    wizard: {
      title: {
        add: 'EnumVal hinzufügen',
        edit: 'EnumVal bearbeiten',
      },
    },
  },
  enum: {
    wizard: {
      title: {
        add: 'EnumType hinzufügen',
        edit: 'EnumType bearbeiten',
      },
    },
  },
  datype: {
    wizard: {
      title: {
        add: 'DAType hinzufügen',
        edit: 'DAType bearbeiten',
      },
    },
  },
  bda: {
    wizard: {
      title: {
        add: 'BDA hinzufügen',
        edit: 'BDA bearbeiten',
      },
      bType: 'Basistyp',
      type: 'Typ',
      sAddr: 'Kurze Adresse',
      valKind: 'Art von Wert',
      valImport: 'Wert importierbar',
    },
  },
  lnode: {
    wizard: {
      title: {
        selectIEDs: 'Auswahl IEDs',
        selectLDs: 'Auswahl logische Geräte',
        selectLNs: 'Auswahl logische Knoten',
      },
      placeholder: 'Bitte laden Sie eine SCL-Datei, die IED-Elemente enthält.',
    },
    tooltip: 'Referenz zu logischen Knoten erstellen',
  },
  guess: {
    wizard: {
      primary: 'Inhalt erraten',
      title: 'Auswahl Steuerungsmodel(ctlModel)',
      description: `Schaltgeräten im Feld können oftmals bestimmten Steuerungsmodellen zugeordnet werden. \n Damit wird die Abschätzung oftmals genauer.`,
    },
  },
  merge: {
    action: 'Vereinigen',
    defaultTitle: '{{ tag }} {{ source }} mit {{ sink }} vereinigen',
    log: '{{ tag }} {{ source }} mit {{ sink }} vereinigt',
    children: 'Kindelemente',
  },
  import: {
    log: {
      successful: 'IED {{name}} geladen',
      parsererror: 'Parser Fehler',
      loaderror: 'Datei kann nicht geladen werden',
      importerror: 'IED Element kann nicht importiert werden',
      missingied: 'Kein IED Element in der Datei',
      nouniqueied: 'IED Element {{ name }} bereits geladen',
    },
  },
  communication: {
    name: 'Netzwerkkonfiguration',
    missing: 'Kein Subnetzwerk',
  },
  subnetwork: {
    name: 'Subnetzwerk',
    wizard: {
      nameHelper: 'Name des Subnetzwerkes',
      descHelper: 'Beschreibung des Subnetzwerkes',
      typeHelper: 'Netzwerktyp (Bsp. 8-MMS)',
      bitrateHelper: 'Übertragungsrate',
      title: {
        add: 'Subnetzwerk hinzufügen',
        edit: 'Subnetzwerk bearbeiten',
      },
    },
  },
  connectedap: {
    name: 'Schnittstelle',
    wizard: {
      addschemainsttype: 'XMLSchema-instance type hinzufügen',
      title: {
        connect: 'Schnittstelle verbinden',
        edit: 'Schnittstelle bearbeiten',
      },
    },
    action: {
      addaddress: 'Adressfeld bearbeitet ({{iedName}} - {{apName}})',
    },
  },
  transform: {
    subscriber: {
      description: 'GOOSE Ziele aktualisieren: ',
      nonewitems: 'keine neuen IEDName Elemente notwendig',
      message: '{{updatenumber}} IEDName Element(e) hinzugefügt',
    },
    'comm-map': {
      wizard: { title: 'Kommunikationszuordnung' },
      connectCB: '{{CbType}} verbinden',
      connectToIED: 'Verbinden mit {{iedName}}',
      sourceIED: 'Quellgerät',
      sinkIED: 'Zielgerät',
    },
  },
  updatesubstation: {
    title: 'Schaltanlage aktualisieren',
  },
  add: 'Hinzufügen',
  remove: 'Entfernen',
  edit: 'Bearbeiten',
  move: 'Verschieben',
  create: 'Erstellen',
  save: 'Speichern',
  saveAs: 'Speichern unter',
  reset: 'Zurücksetzen',
  cancel: 'Abbrechen',
  close: 'Schließen',
  filter: 'Filter',
  undo: 'Rückgängig',
  redo: 'Wiederholen',
  duplicate: 'Klonen',
  connect: 'Verbinden',
  disconnect: 'Trennen',

  compas: {
    changeset: {
      major: "???",
      minor: "???",
      patch: "???",
    },
    open: {
      listSclTypes: '???',
      noSclTypes: '???',
      listScls: '??? ({{ type }})',
      noScls: "???",
    },
    saveTo: {
      title: "???",
      addError: '???',
      addSuccess: '???',
      updateError: '???',
      updateSuccess: '???',
    },
    settings: {
      name: "CoMPAS Einstellungen",
      sclDataServiceUrl: "CoMPAS SCL Data Service"
    }
  },
};
