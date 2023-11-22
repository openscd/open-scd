# open-scd

The `<open-scd>` custom element is the main entry point of the
Open Substation Configuration Designer.

**Mixins:** Hosting, Setting, Wizarding, Waiting, Plugging, Editing, Logging

## Properties

| Property           | Attribute       | Modifiers | Type                                    | Default                            | Description                                      |
|--------------------|-----------------|-----------|-----------------------------------------|------------------------------------|--------------------------------------------------|
| `activeTab`        | `activeTab`     |           | `number`                                | 0                                  | The currently active editor tab.                 |
| `bottomMenu`       |                 | readonly  | `Plugin[]`                              |                                    |                                                  |
| `canRedo`          |                 | readonly  | `boolean`                               |                                    |                                                  |
| `canUndo`          |                 | readonly  | `boolean`                               |                                    |                                                  |
| `currentAction`    | `currentAction` |           | `number`                                | -1                                 | Index of the last [[`EditorAction`]] applied.    |
| `darkThemeUI`      |                 |           | `Switch`                                |                                    |                                                  |
| `diagnoses`        | `diagnoses`     |           | `Map<string, IssueDetail[]>`            | "new Map<string, IssueDetail[]>()" |                                                  |
| `diagnosticUI`     |                 |           | `Dialog`                                |                                    |                                                  |
| `doc`              |                 |           | `XMLDocument \| null`                   | null                               | The `XMLDocument` to be edited                   |
| `docId`            | `docId`         |           | `string`                                | ""                                 | The UUID of the current [[`doc`]]                |
| `docName`          | `docName`       |           | `string`                                | ""                                 | The name of the current [[`doc`]]                |
| `editors`          |                 | readonly  | `Plugin[]`                              |                                    |                                                  |
| `errorUI`          |                 |           | `Snackbar`                              |                                    |                                                  |
| `handleKeyPress`   |                 |           |                                         |                                    |                                                  |
| `history`          | `history`       |           | `LogEntry[]`                            | []                                 | All [[`LogEntry`]]s received so far through [[`LogEvent`]]s. |
| `infoUI`           |                 |           | `Snackbar`                              |                                    |                                                  |
| `issueUI`          |                 |           | `Snackbar`                              |                                    |                                                  |
| `languageUI`       |                 |           | `Select`                                |                                    |                                                  |
| `latestIssue`      |                 |           | `IssueDetail`                           |                                    |                                                  |
| `logUI`            |                 |           | `Dialog`                                |                                    |                                                  |
| `menu`             |                 | readonly  | `(MenuItem \| "divider")[]`             |                                    |                                                  |
| `menuEntries`      |                 | readonly  | `Plugin[]`                              |                                    |                                                  |
| `menuUI`           |                 |           | `Drawer`                                |                                    |                                                  |
| `middleMenu`       |                 | readonly  | `Plugin[]`                              |                                    |                                                  |
| `modeUI`           |                 |           | `Switch`                                |                                    |                                                  |
| `nextAction`       |                 | readonly  | `number`                                |                                    |                                                  |
| `nsdoc`            |                 |           | `Nsdoc`                                 | "initializeNsdoc()"                | Object containing all *.nsdoc files and a function extracting element's label form them |
| `onLog`            |                 |           |                                         |                                    |                                                  |
| `onPendingState`   |                 |           |                                         |                                    |                                                  |
| `pluginDownloadUI` |                 |           | `Dialog`                                |                                    |                                                  |
| `pluginList`       |                 |           | `List`                                  |                                    |                                                  |
| `pluginUI`         |                 |           | `Dialog`                                |                                    |                                                  |
| `previousAction`   |                 | readonly  | `number`                                |                                    |                                                  |
| `redo`             |                 |           |                                         |                                    |                                                  |
| `settings`         | `settings`      | readonly  | `Settings`                              |                                    | Current [[`Settings`]] in `localStorage`, default to [[`defaults`]]. |
| `settingsUI`       |                 |           | `Dialog`                                |                                    |                                                  |
| `showiedsUI`       |                 |           | `Switch`                                |                                    |                                                  |
| `src`              | `src`           |           | `string`                                |                                    | The current file's URL. `blob:` URLs are *revoked after parsing*! |
| `topMenu`          |                 | readonly  | `Plugin[]`                              |                                    |                                                  |
| `undo`             |                 |           |                                         |                                    |                                                  |
| `validated`        |                 |           | `Promise<void>`                         | "Promise.resolve()"                |                                                  |
| `validators`       |                 | readonly  | `Plugin[]`                              |                                    |                                                  |
| `waiting`          | `waiting`       |           | `boolean`                               | false                              | Whether the element is currently waiting for some async work. |
| `warningUI`        |                 |           | `Snackbar`                              |                                    |                                                  |
| `wizardUI`         |                 |           | `WizardDialog`                          |                                    |                                                  |
| `workDone`         |                 |           | `Promise<PromiseSettledResult<void>[]>` | "Promise.allSettled(this.work)"    | A promise which resolves once all currently pending work is done. |
| `workflow`         |                 |           | `WizardFactory[]`                       | []                                 | FIFO queue of [[`Wizard`]]s to display.          |

## Methods

| Method                   | Type                                             | Description                                      |
|--------------------------|--------------------------------------------------|--------------------------------------------------|
| `performUpdate`          | `(): Promise<void>`                              |                                                  |
| `redo`                   | `(): boolean`                                    |                                                  |
| `removeSetting`          | `<T extends "language" \| "theme" \| "mode" \| "showieds" \| "IEC 61850-7-2" \| "IEC 61850-7-3" \| "IEC 61850-7-4" \| "IEC 61850-8-1">(setting: T): void` | Remove the `setting` in `localStorage`.          |
| `renderActionItem`       | `(me: MenuItem \| "divider"): TemplateResult`    |                                                  |
| `renderDownloadUI`       | `(): TemplateResult`                             |                                                  |
| `renderEditorTab`        | `({ name, icon }: Plugin): TemplateResult`       |                                                  |
| `renderLogEntry`         | `(entry: LogEntry, index: number, history: LogEntry[]): TemplateResult` |                                                  |
| `renderMenuItem`         | `(me: MenuItem \| "divider"): TemplateResult`    |                                                  |
| `renderPluginKind`       | `(type: "editor" \| "menu" \| "validator" \| "top" \| "middle" \| "bottom", plugins: Plugin[]): TemplateResult` |                                                  |
| `renderPluginUI`         | `(): TemplateResult`                             |                                                  |
| `renderValidatorsIssues` | `(issues: IssueDetail[]): TemplateResult[]`      |                                                  |
| `setSetting`             | `<T extends "language" \| "theme" \| "mode" \| "showieds" \| "IEC 61850-7-2" \| "IEC 61850-7-3" \| "IEC 61850-7-4" \| "IEC 61850-8-1">(setting: T, value: Settings[T]): void` | Update the `value` of `setting`, storing to `localStorage`. |
| `undo`                   | `(): boolean`                                    |                                                  |
