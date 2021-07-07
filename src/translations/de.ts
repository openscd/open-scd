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
    DA: 'Datenattribut',
    DO: 'Datenobjekt',
    DAType: 'Datenattribut Typ',
    DOType: 'Datenobjekt Typ',
    CDC: ' Datenklasse nach 7-3',
    Report: 'Report',
    LN: 'Logischer Knoten',
    bType: 'Basic type',
    type: 'Type',
    sAddr: 'Short address',
    valKind: 'Value kind',
    valImport: 'Import value',
    fc: 'Funktionale Einschränkung',
    LNodeType: 'Logischer Knoten Type',
    lnClass: 'Klasse logischer Knoten',
    accessControl: 'Zugriffskontrolle',
    transient: 'Datenpunkt transient',
  },
  settings: {
    title: 'Einstellungen',
    language: 'Sprache',
    languages: { de: 'Deutsch', en: 'Englisch (English)' },
    dark: 'Dunkles Design',
    mode: 'Profimodus',
  },
  menu: {
    title: 'Menü',
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
  validate: {
    title: 'Projekt validieren',
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
    menu: 'Menüeintrag',
    requireDoc: 'Benötigt Dokument',
    top: 'oben',
    middle: 'mittig',
    bottom: 'unten',
    validator: 'Validator',
    add: {
      heading: 'Benutzerdefinierte Erweiterung',
      warning: `Hier können Sie benutzerdefinierte Erweiterungen hinzufügen.
                OpenSCD übernimmt hierfür keine Gewähr.`,
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
        add: 'SDO hinzufügen',
        edit: 'SDO bearbeiten',
      },
    },
  },
  do: {
    wizard: {
      title: {
        add: 'DO hinzufügen',
        edit: 'DO bearbeiten',
      },
    },
  },
  dotype: {
    wizard: {
      title: {
        add: 'DOType hinzufügen',
        edit: 'DOType bearbeiten',
      },
      enums: 'Standard Enumerations',
    },
  },
  lnodetype: {
    wizard: {
      title: {
        add: 'LNodeType hinzufügen',
        edit: 'LNodeType bearbeiten',
        select: 'Data Objects auswählen',
      },
    },
    autoimport: 'Aus Template laden',
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
    title: 'Vereinigen',
    defaultTitle: '{{ tag }} {{ source }} mit {{ sink }} vereinigen',
    log: '{{ tag }} {{ source }} mit {{ sink }} vereinigt',
    children: 'Kindelemente',
  },
  import: {
    title: 'IEDs importieren',
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
  subscriber: {
    title: 'Subscriber Update',
    description: 'GOOSE Ziele aktualisieren: ',
    nonewitems: 'keine neuen IEDName Elemente notwendig',
    message: '{{updatenumber}} IEDName Element(e) hinzugefügt',
  },
  commMap: {
    title: 'Kommunikationszuordnung',
    connectCB: '{{CbType}} verbinden',
    connectToIED: 'Verbinden mit {{iedName}}',
    sourceIED: 'Quellgerät',
    sinkIED: 'Zielgerät',
  },
  updatesubstation: {
    title: 'Schaltanlage aktualisieren',
  },
  code: {
    log: 'Element im XML Editor angepasst:  {{id}}',
  },
  add: 'Hinzufügen',
  new: 'Neu',
  remove: 'Entfernen',
  edit: 'Bearbeiten',
  move: 'Verschieben',
  create: 'Erstellen',
  save: 'Speichern',
  saveAs: 'Speichern unter',
  open: 'Öffnen',
  reset: 'Zurücksetzen',
  cancel: 'Abbrechen',
  close: 'Schließen',
  filter: 'Filter',
  undo: 'Rückgängig',
  redo: 'Wiederholen',
  duplicate: 'Klonen',
  connect: 'Verbinden',
  disconnect: 'Trennen',
};
