# open-scd

## Properties

| Property     | Attribute | Type                                      | Default                                          | Description                                      |
|--------------|-----------|-------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `doc`        |           | `XMLDocument`                             | "emptySCD"                                       | The `XMLDocument` representation of the current file. |
| `history`    | `history` | `LogEntry[]`                              | []                                               | Error and warning log, and edit history          |
| `selectFile` |           | `() => void`                              | "(): void =>\n    (<HTMLElement \| null>(\n      this.shadowRoot!.querySelector('#file-input')\n    ))?.click()" | Opens the browser's "open file" dialog for selecting a file to edit. |
| `src`        | `src`     | `string`                                  |                                                  | The current file's URL. `blob:` URLs are *revoked after parsing*! |
| `srcName`    | `srcName` | `string`                                  | "untitled.scd"                                   | The name of the current file.                    |
| `waiting`    | `waiting` | `boolean`                                 | false                                            | Whether the editor is currently waiting for some async work. |
| `workDone`   |           | `Promise<PromiseSettledResult<string>[]>` | "Promise.allSettled(this.work)"                  | A promise which resolves once all currently pending work is done. |

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
