# add-ln-dialog

Dialog for adding a new LN to a LDevice.

## Properties

| Property     | Attribute   | Type                     | Default |
|--------------|-------------|--------------------------|---------|
| `amount`     |             | `number`                 | 1       |
| `dialog`     |             | `Dialog`                 |         |
| `doc`        |             | `XMLDocument`            |         |
| `filterText` |             | `string`                 | ""      |
| `lnType`     |             | `string`                 | ""      |
| `onConfirm`  | `onConfirm` | `(data: LNData) => void` |         |
| `prefix`     |             | `string`                 | ""      |
| `tooltip`    |             | `OscdTooltip`            |         |

## Methods

| Method | Type       |
|--------|------------|
| `show` | `(): void` |
