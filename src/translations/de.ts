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
    Val: 'Standardwert',
    dchg: 'Detenänderung ist Auslöser',
    qchg: 'Qualitätsanderung ist Auslöser',
    dupd: 'Datenupdate ist Auslöser',
    fixedOffs: 'Fester Offset',
    securityEnable: 'Aktive Sicherungsmaßnahmen',
    DataSet: 'Datensetz',
    Communication: 'Kommunikation',
    TrgOps: 'Triggerbedingungen',
    OptFields: 'Optionale felder',
    multicast: 'SMV nach IEC 61850 9-2',
    smpMod: 'Abtast-Art',
    smpRate: 'Abtastrate',
    nofASDU: 'Abtastpunkte pro Datenpacket',
  },
  settings: {
    title: 'Einstellungen',
    language: 'Sprache',
    languages: { de: 'Deutsch', en: 'Englisch (English)' },
    dark: 'Dunkles Design',
    mode: 'Profimodus',
    showieds: 'Zeige IEDs im Substation-Editor',
  },
  menu: {
    new: 'Neues projekt',
    title: 'Menü',
    viewLog: 'Protokoll anzeigen',
    viewDiag: 'Daignose anzeigen',
  },
  wizard: {
    title: {
      select: '{{tagName}} auswählen',
      edit: '{{tagName}} bearbeiten',
      add: '{{tagName}} hinzufügen',
    },
  },
  openSCD: {
    loading: 'Lade Projekt {{ name }}',
    loaded: '{{ name }} geladen',
    readError: '{{ name }} Lesefehler',
    readAbort: '{{ name }} Leseabbruch',
  },
  zeroline: {
    iedsloading: 'IEDs werden geladen...',
    showieds: 'IEDs im Substation-Editor anzeigen/ausblenden',
    commmap: 'Kommunikationszuordnung',
    reportcontrol: 'Reports anzeigen',
    gsecontrol: 'GOOSEs anzeigen',
    smvcontrol: 'Sampled Values anzeigen',
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
  validator: {
    schema: {
      title: 'Projekt validieren',
      valid: '{{ name }} erfolgreich validiert gegen XML-Schema',
      invalid: '{{ name }} Schema-Validierung fehlgeschlagen',
      fatal: 'Fataler Validierungsfehler',
      loadError: 'Konnte XML-Schema {{ name }} nicht laden',
    },
    templates: {
      title: 'Templates validieren',
      mandatoryChild:
        '{{ tag }} {{ id }} fehlt ein obligatorisches {{ childTag }}-Kind {{ childId }}',
      missingAttribute:
        'Das Attribut {{attr}} ist verpflichted und fehlt in {{element}}',
      incorrectAttribute:
        'Das Attribut {{attr}} in Element {{element}} folgt nicht der Definition.',
      missingReference:
        '{{tag}} "{{name}}" hat eine ungültige Referenz - es fehlt der definierte Typ',
    },
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
  diag: {
    name: 'Daignoseübersicht',
    zeroissues: 'Es konnten keine Fehler in dem Projekt gefunden werden.',
    placeholder: 'Hier werden Validierungsfehler angezeigt.',
    missingnsd:
      'DataTypeTemplates können nicht validiert werden. Das Projekt muss die Version 2007B3 oder höher haben.',
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
  iededitor: {
    searchHelper: 'IED auswählen',
    searchHelperDesc: '({{description}})',
    missing: 'Kein IED vorhanden',
    toggleChildElements: '???',
  },
  ied: {
    wizard: {
      nameHelper: 'Name des IED',
      descHelper: 'Beschreibung des IED',
      title: {
        edit: 'IED bearbeiten',
      },
    },
    action: {
      updateied: 'IED "{{iedName}}" bearbeitet',
    },
  },
  powertransformer: {
    wizard: {
      nameHelper: '`Name des Leistungstransformators',
      descHelper: 'Beschreibung des Leistungstransformators',
      title: {
        edit: 'Leistungstransformator bearbeiten',
      },
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
  connectivitynode: {
    name: 'Verbindungsknoten',
    wizard: {
      nameHelper: 'Verbindungsknoten Name',
      pathNameHelper: 'Verbindungsknoten Beschreibung',
      title: {
        add: 'Verbindungsknoten hinzufügen',
        edit: 'Verbindungsknoten bearbeiten',
      },
    },
  },
  terminal: {
    name: 'Anschluss',
    wizard: {
      nameHelper: 'Anschluss Name',
      connectivityNodeHelper: 'Anschluss Verbindungsknoten',
      cNodeNameHelper: 'Anschluss Verbindungsknoten Name',
      title: {
        add: 'Anschlussknoten hinzufügen',
        edit: 'Anschlussknoten bearbeiten',
      },
    },
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
    autoimport: 'Vordefinierte OpenSCD LN Klasse verwenden',
    missinglnclass: 'Vordefinierte LN Klasse fehlt',
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
    },
    action: {
      addaddress: 'Adressfeld bearbeitet ({{iedName}} - {{apName}})',
    },
  },
  gse: {
    action: {
      addaddress: 'GSE bearbeitet ({{identity}})',
    },
  },
  subscriber: {
    title: 'Subscriber Update',
    description: 'GOOSE Ziele aktualisieren: ',
    nonewitems: 'keine neuen IEDName Elemente notwendig',
    message: '{{updatenumber}} IEDName Element(e) hinzugefügt',
  },
  commmap: {
    title: 'Kommunikationszuordnung',
    connectCB: '{{cbType}} verbinden',
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
  updatedesc: {
    abb: 'Signalbeschreibungen zu ABB IEDs hinzugefügt',
    sel: 'Signalbeschreibungen zu SEL IEDs hinzugefügt',
  },
  sld: {
    substationSelector: 'Schaltanlage auswählen',
    wizard: {
      xCoordinateHelper: 'X-Koordinate im Einphasenersatzschaltbild',
      yCoordinateHelper: 'Y-Koordinate im Einphasenersatzschaltbild',
    },
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
  next: 'Weiter',
};
