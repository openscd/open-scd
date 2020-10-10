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
    new: 'Neues Project',
    importIED: 'IED Importieren',
    save: 'Projekt speichern',
    validate: 'Projekt validieren',
    viewLog: 'Protokoll anzeigen',
  },
  openSCD: {
    loading: 'Lade Project {{ name }}',
    loaded: '{{ name }} geladen',
    validated: '{{ name }} erfolgreich validiert',
    invalidated: '{{ name }} Validierung fehlgeschlagen',
    readError: '{{ name }} Lesefehler',
    readAbort: '{{ name }} Leseabbruch',
  },
  editing: {
    created: '{{ name }} hinzugefügt',
    deleted: '{{ name }} entfernt',
    moved: '{{ name }} verschoben',
    updated: '{{ name }} bearbeitet',
  },
  textfield: {
    default: 'Standardwert: {{ value }}',
    noDefault: 'Kein Standardwert',
    required: 'Pflichtfeld',
    nonempty: 'Darf nicht leer sein',
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
  add: 'Hinzufügen',
  edit: 'Bearbeiten',
  save: 'Speichern',
  reset: 'Zurücksetzen',
  cancel: 'Abbrechen',
  close: 'Schließen',
  undo: 'Rückgängig',
  redo: 'Wiederholen',
};
