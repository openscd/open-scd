# add-access-point-dialog

A dialog component for adding new AccessPoints

## Properties

| Property      | Attribute   | Modifiers | Type                                      |
|---------------|-------------|-----------|-------------------------------------------|
| `apNameField` |             |           | `TextField`                               |
| `dialog`      |             |           | `Dialog`                                  |
| `doc`         | `doc`       |           | `XMLDocument`                             |
| `ied`         | `ied`       |           | `Element`                                 |
| `onConfirm`   | `onConfirm` |           | `(data: AccessPointCreationData) => void` |
| `open`        |             | readonly  | `boolean`                                 |

## Methods

| Method | Type       |
|--------|------------|
| `show` | `(): void` |
