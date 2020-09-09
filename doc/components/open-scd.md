# open-scd

**Mixins:** Waiting, Editing

## Properties

| Property         | Attribute   | Modifiers | Type                                             | Default                                          | Description                                      |
|------------------|-------------|-----------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `activeTab`      | `activeTab` |           | `number`                                         | 0                                                | The currently active editor tab.                 |
| `canRedo`        |             | readonly  | `boolean`                                        |                                                  |                                                  |
| `canUndo`        |             | readonly  | `boolean`                                        |                                                  |                                                  |
| `commit`         |             |           |                                                  |                                                  |                                                  |
| `doc`            | `doc`       |           | `XMLDocument`                                    | "emptySCD"                                       | The `XMLDocument` representation of the current file. |
| `error`          |             |           |                                                  |                                                  |                                                  |
| `fileUI`         |             |           | `HTMLInputElement`                               |                                                  |                                                  |
| `handleKeyPress` |             |           |                                                  |                                                  |                                                  |
| `history`        | `history`   |           | `LogEntry[]`                                     | []                                               |                                                  |
| `info`           |             |           |                                                  |                                                  |                                                  |
| `lastAction`     |             |           | `number`                                         | -1                                               |                                                  |
| `log`            |             |           |                                                  |                                                  |                                                  |
| `logUI`          |             |           | `Dialog`                                         |                                                  |                                                  |
| `menu`           |             |           | `MenuEntry[]`                                    | [{"icon":"folder_open","name":"Open project","startsGroup":true,"actionItem":true},{"icon":"create_new_folder","name":"New project"},{"icon":"snippet_folder","name":"Import IED"},{"icon":"save","name":"Save project"},{"icon":"undo","name":"Undo","hint":"CTRL+Z","startsGroup":true,"actionItem":true,"action":true},{"icon":"redo","name":"Redo","hint":"CTRL+Y","actionItem":true,"action":true},{"icon":"rule_folder","name":"Validate project","startsGroup":true},{"icon":"rule","name":"View log","hint":"CTRL+L","actionItem":true}] |                                                  |
| `menuUI`         |             |           | `Drawer`                                         |                                                  |                                                  |
| `messageUI`      |             |           | `Snackbar`                                       |                                                  |                                                  |
| `name`           | `name`      | readonly  | `string \| null`                                 |                                                  |                                                  |
| `nextAction`     |             | readonly  | `number`                                         |                                                  |                                                  |
| `plugins`        |             |           | `{ editors: ({ label: string; id: string; icon: TemplateResult; getContent: () => Promise<TemplateResult>; } \| { label: string; id: string; icon: string; getContent: () => TemplateResult; } \| { ...; })[]; }` | {"editors":[{"label":"Substation","id":"substation","icon":"zeroLineIcon"},{"label":"Communication","id":"communication","icon":"mediation"},{"label":"Network","id":"network","icon":"networkConfigIcon"},{"label":"IED","id":"ied","icon":"iedIcon"}]} |                                                  |
| `previousAction` |             | readonly  | `number`                                         |                                                  |                                                  |
| `redo`           |             |           |                                                  |                                                  |                                                  |
| `src`            | `src`       |           | `string`                                         |                                                  | The current file's URL. `blob:` URLs are *revoked after parsing*! |
| `srcName`        | `srcName`   |           | `string`                                         | "untitled.scd"                                   | The name of the current file.                    |
| `tag`            |             |           | `string`                                         | "SCL"                                            | The tag name this editor is responsible for editing |
| `undo`           |             |           |                                                  |                                                  |                                                  |
| `waiting`        | `waiting`   |           | `boolean`                                        | false                                            | Whether the editor is currently waiting for some async work. |
| `warn`           |             |           |                                                  |                                                  |                                                  |
| `workDone`       |             |           | `Promise<PromiseSettledResult<string>[]>`        | "Promise.allSettled(this.work)"                  | A promise which resolves once all currently pending work is done. |

## Methods

| Method             | Type                                             |
|--------------------|--------------------------------------------------|
| `commit`           | `(title: string, action: Action, options?: Pick<LogEntry, "cause" \| "icon" \| "message"> \| undefined): LogEntry` |
| `error`            | `(title: string, options?: Pick<LogEntry, "cause" \| "icon" \| "message"> \| undefined): LogEntry` |
| `info`             | `(title: string, options?: Pick<LogEntry, "cause" \| "icon" \| "message"> \| undefined): LogEntry` |
| `log`              | `(title: string, detail?: Partial<LogEntry> \| undefined): LogEntry` |
| `redo`             | `(): boolean`                                    |
| `renderActionItem` | `(me: MenuEntry): TemplateResult`                |
| `renderEditorTab`  | `(editor: Tab): TemplateResult`                  |
| `renderHistory`    | `(history: LogEntry[]): TemplateResult[]`        |
| `renderLogEntry`   | `(entry: LogEntry, index: number, history: LogEntry[]): TemplateResult` |
| `renderMenuEntry`  | `(me: MenuEntry): TemplateResult`                |
| `undo`             | `(): boolean`                                    |
| `warn`             | `(title: string, options?: Pick<LogEntry, "cause" \| "icon" \| "message"> \| undefined): LogEntry` |
