# transformer-winding-editor

## Properties

| Property        | Attribute       | Modifiers | Type          | Default | Description                                      |
|-----------------|-----------------|-----------|---------------|---------|--------------------------------------------------|
| `addButton`     |                 |           | `IconButton`  |         |                                                  |
| `addMenu`       |                 |           | `Menu`        |         |                                                  |
| `doc`           |                 |           | `XMLDocument` |         | The document being edited as provided to editor by [[`Zeroline`]]. |
| `element`       |                 |           | `Element`     |         | SCL element TransformerWinding                   |
| `label`         | `label`         | readonly  | `string`      |         | TransformerWinding name attribute                |
| `showfunctions` | `showfunctions` |           | `boolean`     | false   | Whether `EqFunction` elements are rendered       |

## Methods

| Method           | Type       |
|------------------|------------|
| `openEditWizard` | `(): void` |
| `remove`         | `(): void` |
