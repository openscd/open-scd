import { Translations } from './loader.js';

export const de: Translations = {
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
  import: {
    log: {
      parsererror: 'Parser Fehler',
      loaderror: 'Datei kann nicht geladen werden',
      importerror: 'IED Element kann nicht importiert werden',
      missingied: 'Kein IED Element in der Datei',
      nouniqueied: 'IED Element {{ name }} bereits geladen',
    },
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
};
