# open-scd

**Mixins:** Wizarding, Waiting, Editing, Logging

## Properties

| Property         | Attribute   | Modifiers | Type                                             | Default                                          | Description                                      |
|------------------|-------------|-----------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `activeTab`      | `activeTab` |           | `number`                                         | 0                                                | The currently active editor tab.                 |
| `canRedo`        |             | readonly  | `boolean`                                        |                                                  |                                                  |
| `canUndo`        |             | readonly  | `boolean`                                        |                                                  |                                                  |
| `currentAction`  |             |           | `number`                                         | -1                                               |                                                  |
| `doc`            | `doc`       |           | `XMLDocument`                                    | "newEmptySCD()"                                  | The `XMLDocument` being edited.                  |
| `fileUI`         |             |           | `HTMLInputElement`                               |                                                  |                                                  |
| `handleKeyPress` |             |           |                                                  |                                                  |                                                  |
| `history`        | `history`   |           | `LogEntry[]`                                     | []                                               |                                                  |
| `logUI`          |             |           | `Dialog`                                         |                                                  |                                                  |
| `menu`           |             |           | `MenuEntry[]`                                    | [{"icon":"folder_open","name":"Open project","startsGroup":true,"actionItem":true},{"icon":"create_new_folder","name":"New project"},{"icon":"snippet_folder","name":"Import IED"},{"icon":"save","name":"Save project"},{"icon":"undo","name":"Undo","hint":"CTRL+Z","startsGroup":true,"actionItem":true,"action":true},{"icon":"redo","name":"Redo","hint":"CTRL+Y","actionItem":true,"action":true},{"icon":"rule_folder","name":"Validate project","startsGroup":true},{"icon":"rule","name":"View log","hint":"CTRL+L","actionItem":true}] |                                                  |
| `menuUI`         |             |           | `Drawer`                                         |                                                  |                                                  |
| `messageUI`      |             |           | `Snackbar`                                       |                                                  |                                                  |
| `name`           | `name`      | readonly  | `string \| null`                                 |                                                  |                                                  |
| `nextAction`     |             | readonly  | `number`                                         |                                                  |                                                  |
| `onLog`          |             |           |                                                  |                                                  |                                                  |
| `onPendingState` |             |           |                                                  |                                                  |                                                  |
| `plugins`        |             |           | `{ editors: { label: string; id: string; icon: TemplateResult; getContent: () => Promise<TemplateResult>; }[]; }` | {"editors":[{"label":"Substation","id":"substation","icon":"zeroLineIcon"}]} |                                                  |
| `previousAction` |             | readonly  | `number`                                         |                                                  |                                                  |
| `redo`           |             |           |                                                  |                                                  |                                                  |
| `src`            | `src`       |           | `string`                                         |                                                  | The current file's URL. `blob:` URLs are *revoked after parsing*! |
| `srcName`        | `srcName`   |           | `string`                                         | "untitled.scd"                                   | The name of the current file.                    |
| `undo`           |             |           |                                                  |                                                  |                                                  |
| `waiting`        | `waiting`   |           | `boolean`                                        | false                                            | Whether the element is currently waiting for some async work. |
| `workDone`       |             |           | `Promise<PromiseSettledResult<string>[]>`        | "Promise.allSettled(this.work)"                  | A promise which resolves once all currently pending work is done. |
| `workflow`       |             |           | `Wizard[]`                                       | []                                               |                                                  |

## Methods

| Method             | Type                                             |
|--------------------|--------------------------------------------------|
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
| `undo`             | `(): boolean`                                    |
