# open-scd

## Properties

| Property    | Attribute   | Modifiers | Type                                             | Default                                          | Description                                      |
|-------------|-------------|-----------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `activeTab` | `activeTab` |           | `number`                                         | 0                                                | The currently active editor tab.                 |
| `doc`       | `doc`       |           | `XMLDocument`                                    | "emptySCD"                                       | The `XMLDocument` representation of the current file. |
| `fileUI`    |             |           | `HTMLInputElement`                               |                                                  |                                                  |
| `history`   | `history`   |           | `LogEntry[]`                                     | []                                               |                                                  |
| `logUI`     |             |           | `DialogBase`                                     |                                                  |                                                  |
| `menu`      |             |           | `MenuEntry[]`                                    | [{"icon":"folder_open","name":"Open project","startsGroup":true,"actionItem":true},{"icon":"create_new_folder","name":"New project"},{"icon":"snippet_folder","name":"Import IED"},{"icon":"save","name":"Save project"},{"icon":"rule_folder","name":"Validate project","startsGroup":true},{"icon":"rule","name":"View log","actionItem":true}] |                                                  |
| `menuUI`    |             |           | `DrawerBase`                                     |                                                  |                                                  |
| `messageUI` |             |           | `SnackbarBase`                                   |                                                  |                                                  |
| `node`      | `node`      | readonly  | `Element`                                        |                                                  | The `Node` this editor is responsible for editing |
| `plugins`   |             |           | `{ editors: ({ label: string; id: string; icon: string; getContent: () => (part: NodePart) => void; } \| { label: string; id: string; icon: string; getContent: () => TemplateResult; })[]; }` | {"editors":[{"label":"Substation","id":"substation","icon":"design_services"},{"label":"Communication","id":"communication","icon":"quickreply"},{"label":"Network","id":"network","icon":"settings_ethernet"},{"label":"IED","id":"ied","icon":"router"}]} |                                                  |
| `src`       | `src`       |           | `string`                                         |                                                  | The current file's URL. `blob:` URLs are *revoked after parsing*! |
| `srcName`   | `srcName`   |           | `string`                                         | "untitled.scd"                                   | The name of the current file.                    |
| `tag`       |             |           | `string`                                         | "SCL"                                            | The tag name this editor is responsible for editing |
| `waiting`   | `waiting`   |           | `boolean`                                        | false                                            | Whether the element is currently waiting for some async work. |
| `workDone`  |             |           | `Promise<PromiseSettledResult<string>[]>`        | "Promise.allSettled(this.work)"                  | A promise which resolves once all currently pending work is done. |

## Methods

| Method  | Type                                             |
|---------|--------------------------------------------------|
| `error` | `(title: string, ...detail: string[]): void`     |
| `info`  | `(title: string, ...detail: string[]): void`     |
| `log`   | `(title: string, message?: string \| undefined, icon?: string \| undefined): void` |
| `warn`  | `(title: string, ...detail: string[]): void`     |

## Events

| Event           | Type                              |
|-----------------|-----------------------------------|
| `pending-state` | `CustomEvent<PendingStateDetail>` |
