# open-scd

**Mixins:** Waiting, Logging

## Properties

| Property    | Attribute   | Modifiers | Type                                             | Default                                          | Description                                      |
|-------------|-------------|-----------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `activeTab` | `activeTab` |           | `number`                                         | 0                                                | The currently active editor tab.                 |
| `doc`       | `doc`       |           | `XMLDocument`                                    | "emptySCD"                                       | The `XMLDocument` representation of the current file. |
| `error`     |             |           |                                                  |                                                  |                                                  |
| `fileUI`    |             |           | `HTMLInputElement`                               |                                                  |                                                  |
| `history`   | `history`   |           | `LogEntry[]`                                     | []                                               |                                                  |
| `info`      |             |           |                                                  |                                                  |                                                  |
| `log`       |             |           |                                                  |                                                  |                                                  |
| `logUI`     |             |           | `Dialog`                                         |                                                  |                                                  |
| `menu`      |             |           | `MenuEntry[]`                                    | [{"icon":"folder_open","name":"Open project","startsGroup":true,"actionItem":true},{"icon":"create_new_folder","name":"New project"},{"icon":"snippet_folder","name":"Import IED"},{"icon":"save","name":"Save project"},{"icon":"rule_folder","name":"Validate project","startsGroup":true},{"icon":"rule","name":"View log","actionItem":true}] |                                                  |
| `menuUI`    |             |           | `Drawer`                                         |                                                  |                                                  |
| `messageUI` |             |           | `Snackbar`                                       |                                                  |                                                  |
| `node`      | `node`      | readonly  | `Element`                                        |                                                  | The `Node` this editor is responsible for editing |
| `plugins`   |             |           | `{ editors: ({ label: string; id: string; icon: TemplateResult; getContent: () => (part: NodePart) => void; } \| { label: string; id: string; icon: string; getContent: () => TemplateResult; } \| { ...; })[]; }` | {"editors":[{"label":"Substation","id":"substation","icon":"zeroLineIcon"},{"label":"Communication","id":"communication","icon":"mediation"},{"label":"Network","id":"network","icon":"networkConfigIcon"},{"label":"IED","id":"ied","icon":"iedIcon"}]} |                                                  |
| `src`       | `src`       |           | `string`                                         |                                                  | The current file's URL. `blob:` URLs are *revoked after parsing*! |
| `srcName`   | `srcName`   |           | `string`                                         | "untitled.scd"                                   | The name of the current file.                    |
| `tag`       |             |           | `string`                                         | "SCL"                                            | The tag name this editor is responsible for editing |
| `waiting`   | `waiting`   |           | `boolean`                                        | false                                            | Whewaiting editor is currently waiting for some async work. |
| `warn`      |             |           |                                                  |                                                  |                                                  |
| `workDone`  |             |           | `Promise<PromiseSettledResult<string>[]>`        | "Promise.allSettled(this.work)"                  | A promise which resolves once all currently pending work is done. |

## Methods

| Method   | Type                                             |
|----------|--------------------------------------------------|
| `commit` | `(title: string, change: Change, options?: Pick<LogEntry, "cause" \| "icon" \| "message"> \| undefined): LogEntry` |
| `error`  | `(title: string, options?: Pick<LogEntry, "cause" \| "icon" \| "message"> \| undefined): LogEntry` |
| `info`   | `(title: string, options?: Pick<LogEntry, "cause" \| "icon" \| "message"> \| undefined): LogEntry` |
| `log`    | `(title: string, detail?: Partial<LogEntry> \| undefined): LogEntry` |
| `warn`   | `(title: string, options?: Pick<LogEntry, "cause" \| "icon" \| "message"> \| undefined): LogEntry` |

## Events

| Event           | Type                        |
|-----------------|-----------------------------|
| `pending-state` | `CustomEvent<PendingState>` |
