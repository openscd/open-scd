# general-equipment-editor

## Properties

| Property        | Attribute       | Modifiers | Type          | Default | Description                                      |
|-----------------|-----------------|-----------|---------------|---------|--------------------------------------------------|
| `addButton`     |                 |           | `IconButton`  |         |                                                  |
| `addMenu`       |                 |           | `Menu`        |         |                                                  |
| `doc`           |                 |           | `XMLDocument` |         |                                                  |
| `editCount`     | `editCount`     |           | `number`      | -1      |                                                  |
| `element`       |                 |           | `Element`     |         |                                                  |
| `header`        |                 | readonly  | `string`      |         |                                                  |
| `showfunctions` | `showfunctions` |           | `boolean`     | false   | Whether `Function` and `SubFunction` are rendered |

## Methods

| Method           | Type       |
|------------------|------------|
| `openEditWizard` | `(): void` |
| `remove`         | `(): void` |
