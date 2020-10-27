**[open-scd](../README.md)**

> [Globals](../globals.md) / "translations/loader"

# Module: "translations/loader"

## Index

### Type aliases

* [Language](_translations_loader_.md#language)
* [Translations](_translations_loader_.md#translations)

### Functions

* [loader](_translations_loader_.md#loader)

### Object literals

* [languages](_translations_loader_.md#languages)

## Type aliases

### Language

Ƭ  **Language**: \"en\" \| \"de\"

*Defined in [src/translations/loader.ts:5](https://github.com/openscd/open-scd/blob/12e7252/src/translations/loader.ts#L5)*

___

### Translations

Ƭ  **Translations**: *typeof* [\_\_type](_translations_loader_.md#__type)

*Defined in [src/translations/loader.ts:8](https://github.com/openscd/open-scd/blob/12e7252/src/translations/loader.ts#L8)*

## Functions

### loader

▸ **loader**(`lang`: string): Promise\<Strings>

*Defined in [src/translations/loader.ts:10](https://github.com/openscd/open-scd/blob/12e7252/src/translations/loader.ts#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`lang` | string |

**Returns:** Promise\<Strings>

## Object literals

### languages

▪ `Const` **languages**: object

*Defined in [src/translations/loader.ts:6](https://github.com/openscd/open-scd/blob/12e7252/src/translations/loader.ts#L6)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`de` | object | { add: string = "Add"; cancel: string = "Cancel"; close: string = "Close"; edit: string = "Edit"; redo: string = "Redo"; reset: string = "Reset"; save: string = "Save"; undo: string = "Undo"; bay: { wizard: { descHelper: string = "Bay Description"; nameHelper: string = "Bay Name"; title: { add: string = "Add Bay"; edit: string = "Edit Bay" }  }  } ; conductingequipment: { wizard: { descHelper: string = "Conducting Equipment Description"; nameHelper: string = "Conducting Equipment Name"; typeHelper: string = "Conducting Equipment Type"; title: { add: string = "Add Conducting Equipment"; edit: string = "Edit Conducting Equipment" }  }  } ; editing: { created: string = "{{ name }} added"; deleted: string = "{{ name }} removed"; moved: string = "{{ name }} moved"; updated: string = "{{ name }} edited" } ; log: { name: string = "Log"; placeholder: string = "Edits, errors, and other notifications will show up here."; snackbar: { placeholder: string = "No errors"; show: string = "Show" }  } ; menu: { importIED: string = "Import IED"; name: string = "Menu"; new: string = "New project"; open: string = "Open project"; save: string = "Save project"; validate: string = "Validate project"; viewLog: string = "View log" } ; openSCD: { invalidated: string = "{{ name }} validation failed"; loaded: string = "{{ name }} loaded"; loading: string = "Loading project {{ name }}"; readAbort: string = "{{ name }} read aborted"; readError: string = "{{ name }} read error"; validated: string = "{{ name }} validation succesful" } ; settings: { dark: string = "Dark theme"; language: string = "Language"; name: string = "Settings"; languages: { de: string = "German (Deutsch)"; en: string = "English" }  } ; substation: { missing: string = "No Substation"; name: string = "Substation"; action: { addvoltagelevel: string = "Add Voltage Level" } ; wizard: { descHelper: string = "Substation Description"; nameHelper: string = "Substation Name"; title: { add: string = "Add Substation"; edit: string = "Edit Substation" }  }  } ; textfield: { noMultiplier: string = "none"; nonempty: string = "Must not be empty"; required: string = "Required" } ; voltagelevel: { wizard: { descHelper: string = "Voltage Level Description"; nameHelper: string = "Voltage Level Name"; nomFreqHelper: string = "Nominal Frequency"; numPhaseHelper: string = "Number of Phases"; voltageHelper: string = "Nominal Voltage"; title: { add: string = "Add Voltage Level"; edit: string = "Edit Voltage Level" }  }  }  } |
`en` | object | { add: string = "Add"; cancel: string = "Cancel"; close: string = "Close"; edit: string = "Edit"; redo: string = "Redo"; reset: string = "Reset"; save: string = "Save"; undo: string = "Undo"; bay: { wizard: { descHelper: string = "Bay Description"; nameHelper: string = "Bay Name"; title: { add: string = "Add Bay"; edit: string = "Edit Bay" }  }  } ; conductingequipment: { wizard: { descHelper: string = "Conducting Equipment Description"; nameHelper: string = "Conducting Equipment Name"; typeHelper: string = "Conducting Equipment Type"; title: { add: string = "Add Conducting Equipment"; edit: string = "Edit Conducting Equipment" }  }  } ; editing: { created: string = "{{ name }} added"; deleted: string = "{{ name }} removed"; moved: string = "{{ name }} moved"; updated: string = "{{ name }} edited" } ; log: { name: string = "Log"; placeholder: string = "Edits, errors, and other notifications will show up here."; snackbar: { placeholder: string = "No errors"; show: string = "Show" }  } ; menu: { importIED: string = "Import IED"; name: string = "Menu"; new: string = "New project"; open: string = "Open project"; save: string = "Save project"; validate: string = "Validate project"; viewLog: string = "View log" } ; openSCD: { invalidated: string = "{{ name }} validation failed"; loaded: string = "{{ name }} loaded"; loading: string = "Loading project {{ name }}"; readAbort: string = "{{ name }} read aborted"; readError: string = "{{ name }} read error"; validated: string = "{{ name }} validation succesful" } ; settings: { dark: string = "Dark theme"; language: string = "Language"; name: string = "Settings"; languages: { de: string = "German (Deutsch)"; en: string = "English" }  } ; substation: { missing: string = "No Substation"; name: string = "Substation"; action: { addvoltagelevel: string = "Add Voltage Level" } ; wizard: { descHelper: string = "Substation Description"; nameHelper: string = "Substation Name"; title: { add: string = "Add Substation"; edit: string = "Edit Substation" }  }  } ; textfield: { noMultiplier: string = "none"; nonempty: string = "Must not be empty"; required: string = "Required" } ; voltagelevel: { wizard: { descHelper: string = "Voltage Level Description"; nameHelper: string = "Voltage Level Name"; nomFreqHelper: string = "Nominal Frequency"; numPhaseHelper: string = "Number of Phases"; voltageHelper: string = "Nominal Voltage"; title: { add: string = "Add Voltage Level"; edit: string = "Edit Voltage Level" }  }  }  } |
