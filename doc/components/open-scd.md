# open-scd

## Properties

| Property  | Attribute | Type          | Default                                          |
|-----------|-----------|---------------|--------------------------------------------------|
| `doc`     | `doc`     | `XMLDocument` | "document.implementation.createDocument(\n    'http://www.iec.ch/61850/2003/SCL',\n    'SCL',\n    null\n  )" |
| `docName` | `docName` | `string`      | ""                                               |

## Methods

| Method        | Type                         |
|---------------|------------------------------|
| `handleClick` | `(): void`                   |
| `openFile`    | `(changeEvent: Event): void` |

## Events

| Event           | Type                         |
|-----------------|------------------------------|
| `pending-state` | `CustomEvent<Promise<void>>` |
