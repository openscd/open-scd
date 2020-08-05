# open-scd

## Properties

| Property     | Attribute  | Type                                      | Default                                          | Description                                      |
|--------------|------------|-------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `doc`        |            | `XMLDocument`                             | "emptySCD"                                       | The `XMLDocument` representation of the current file. |
| `menuOpen`   | `menuOpen` | `boolean`                                 | false                                            | Whether the menu drawer is currently open.       |
| `selectFile` |            | `() => void`                              | "(): void =>\n    (<HTMLElement \| null>(\n      this.shadowRoot!.querySelector('#file-input')\n    ))?.click()" | Opens the browser's "open file" dialog for selecting a file to edit. |
| `src`        | `src`      | `string`                                  |                                                  | The current file's URL. `blob:` URLs are *revoked after parsing*! |
| `srcName`    | `srcName`  | `string`                                  | ""                                               | The name of the current file.                    |
| `waiting`    | `waiting`  | `boolean`                                 | false                                            | Indicates whether the editor is currently waiting for some async work. |
| `workDone`   |            | `Promise<PromiseSettledResult<string>[]>` | "Promise.allSettled(this.work)"                  | A promise which resolves once all currently pending work is done. |

## Events

| Event           | Type                           |
|-----------------|--------------------------------|
| `pending-state` | `CustomEvent<Promise<string>>` |
