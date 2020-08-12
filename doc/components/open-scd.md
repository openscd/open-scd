# open-scd

## Properties

| Property    | Attribute   | Modifiers | Type                                             | Default                                          | Description                                      |
|-------------|-------------|-----------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `activeTab` | `activeTab` |           | `number`                                         | 0                                                | The currently active editor tab.                 |
| `doc`       |             |           | `XMLDocument`                                    | "emptySCD"                                       | The `XMLDocument` representation of the current file. |
| `fileUI`    |             | readonly  | `HTMLInputElement`                               |                                                  |                                                  |
| `history`   | `history`   |           | `LogEntry[]`                                     | []                                               |                                                  |
| `logUI`     |             | readonly  | `DialogBase`                                     |                                                  |                                                  |
| `menuUI`    |             | readonly  | `DrawerBase`                                     |                                                  |                                                  |
| `messageUI` |             | readonly  | `SnackbarBase`                                   |                                                  |                                                  |
| `plugins`   |             |           | `{ editors: ({ label: string; id: string; icon: string; getContent: () => (part: NodePart) => void; } \| { label: string; id: string; icon: string; getContent: () => TemplateResult; })[]; }` | {"editors":[{"label":"Substation","id":"substation","icon":"border_outer"},{"label":"Test","id":"test","icon":"self_improvement"},{"label":"Visual Filler","id":"filler","icon":"science"}]} |                                                  |
| `src`       | `src`       |           | `string`                                         |                                                  | The current file's URL. `blob:` URLs are *revoked after parsing*! |
| `srcName`   | `srcName`   |           | `string`                                         | "untitled.scd"                                   | The name of the current file.                    |
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

| Event           | Type                           |
|-----------------|--------------------------------|
| `pending-state` | `CustomEvent<Promise<string>>` |
