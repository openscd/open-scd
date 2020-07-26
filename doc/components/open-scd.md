# open-scd

## Properties

| Property             | Attribute            | Type          | Default                                          |
|----------------------|----------------------|---------------|--------------------------------------------------|
| `doc`                | `doc`                | `XMLDocument` | "document.implementation.createDocument(\n    'http://www.iec.ch/61850/2003/SCL',\n    'SCL',\n    null\n  )" |
| `docName`            | `docName`            | `string`      | ""                                               |
| `drawerOpen`         | `drawerOpen`         | `boolean`     | false                                            |
| `hasPendingChildren` | `hasPendingChildren` | `boolean`     | false                                            |
| `selectFile`         |                      | `() => void`  | "(): void =>\n    (<HTMLElement \| null>(\n      this.shadowRoot!.querySelector('#file-input')\n    ))?.click()" |

## Methods

| Method     | Type                         |
|------------|------------------------------|
| `openFile` | `(changeEvent: Event): void` |

## Events

| Event           | Type                         |
|-----------------|------------------------------|
| `pending-state` | `CustomEvent<Promise<void>>` |
