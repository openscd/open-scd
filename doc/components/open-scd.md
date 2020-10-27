# open-scd

**Mixins:** Setting, Wizarding, Waiting, Editing, Logging

## Properties

| Property         | Attribute   | Modifiers | Type                                             | Default                                          | Description                                      |
|------------------|-------------|-----------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `activeTab`      | `activeTab` |           | `number`                                         | 0                                                | The currently active editor tab.                 |
| `canRedo`        |             | readonly  | `boolean`                                        |                                                  |                                                  |
| `canUndo`        |             | readonly  | `boolean`                                        |                                                  |                                                  |
| `currentAction`  |             |           | `number`                                         | -1                                               |                                                  |
| `darkThemeUI`    |             |           | `Switch`                                         |                                                  |                                                  |
| `doc`            | `doc`       |           | `XMLDocument`                                    | "newEmptySCD()"                                  | The `XMLDocument` being edited.                  |
| `fileUI`         |             |           | `HTMLInputElement`                               |                                                  |                                                  |
| `handleKeyPress` |             |           |                                                  |                                                  |                                                  |
| `history`        | `history`   |           | `LogEntry[]`                                     | []                                               |                                                  |
| `languageUI`     |             |           | `Select`                                         |                                                  |                                                  |
| `logUI`          |             |           | `Dialog`                                         |                                                  |                                                  |
| `menu`           |             |           | `MenuEntry[]`                                    | [{"icon":"folder_open","name":"menu.open","startsGroup":true,"actionItem":true},{"icon":"create_new_folder","name":"menu.new"},{"icon":"snippet_folder","name":"menu.importIED"},{"icon":"save","name":"save"},{"icon":"undo","name":"undo","startsGroup":true,"actionItem":true,"action":true},{"icon":"redo","name":"redo","actionItem":true,"action":true},{"icon":"rule_folder","name":"menu.validate","startsGroup":true},{"icon":"rule","name":"menu.viewLog","actionItem":true},{"icon":"settings","name":"settings.name","startsGroup":true}] |                                                  |
| `menuUI`         |             |           | `Drawer`                                         |                                                  |                                                  |
| `messageUI`      |             |           | `Snackbar`                                       |                                                  |                                                  |
| `name`           | `name`      | readonly  | `string \| null`                                 |                                                  |                                                  |
| `nextAction`     |             | readonly  | `number`                                         |                                                  |                                                  |
| `onLog`          |             |           |                                                  |                                                  |                                                  |
| `onPendingState` |             |           |                                                  |                                                  |                                                  |
| `plugins`        |             |           | `{ editors: { name: string; id: string; icon: TemplateResult; getContent: () => Promise<TemplateResult>; }[]; }` | {"editors":[{"name":"substation.name","id":"substation","icon":"zeroLineIcon"}]} |                                                  |
| `previousAction` |             | readonly  | `number`                                         |                                                  |                                                  |
| `redo`           |             |           |                                                  |                                                  |                                                  |
| `settings`       | `settings`  | readonly  | `Settings`                                       |                                                  |                                                  |
| `settingsUI`     |             |           | `Dialog`                                         |                                                  |                                                  |
| `src`            | `src`       |           | `string`                                         |                                                  | The current file's URL. `blob:` URLs are *revoked after parsing*! |
| `srcName`        | `srcName`   |           | `string`                                         | "untitled.scd"                                   | The name of the current file.                    |
| `undo`           |             |           |                                                  |                                                  |                                                  |
| `waiting`        | `waiting`   |           | `boolean`                                        | false                                            | Whether the element is currently waiting for some async work. |
| `work`           |             |           | `Set<Promise<string>>`                           | "new Set()"                                      |                                                  |
| `workDone`       |             |           | `Promise<PromiseSettledResult<string>[]>`        | "Promise.allSettled(this.work)"                  | A promise which resolves once all currently pending work is done. |
| `workflow`       |             |           | `Wizard[]`                                       | []                                               |                                                  |

## Methods

| Method             | Type                                             |
|--------------------|--------------------------------------------------|
| `onClosing`        | `(ae: CustomEvent<{ action: string; } \| null>): void` |
| `onLog`            | `(le: LogEvent): void`                           |
| `onPendingState`   | `(e: CustomEvent<PendingStateDetail>): Promise<void>` |
| `onWizard`         | `(we: WizardEvent): void`                        |
| `redo`             | `(): boolean`                                    |
| `renderActionItem` | `(me: MenuEntry): TemplateResult`                |
| `renderEditorTab`  | `(editor: Tab): TemplateResult`                  |
| `renderHistory`    | `(): TemplateResult \| TemplateResult[]`         |
| `renderLogEntry`   | `(entry: LogEntry, index: number, history: LogEntry[]): TemplateResult` |
| `renderMenuEntry`  | `(me: MenuEntry): TemplateResult`                |
| `reset`            | `(): void`                                       |
| `setSetting`       | `<T extends "language" \| "theme">(setting: T, value: Settings[T]): void` |
| `undo`             | `(): boolean`                                    |
