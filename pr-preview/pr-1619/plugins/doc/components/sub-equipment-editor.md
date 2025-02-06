# sub-equipment-editor

[[`SubstationEditor`]] subeditor for a child-less `SubEquipment` element.

## Properties

| Property    | Attribute   | Modifiers | Type          | Default | Description                                      |
|-------------|-------------|-----------|---------------|---------|--------------------------------------------------|
| `addButton` |             |           | `IconButton`  |         |                                                  |
| `addMenu`   |             |           | `Menu`        |         |                                                  |
| `doc`       |             |           | `XMLDocument` |         | The document being edited as provided to editor by [[`Zeroline`]]. |
| `editCount` | `editCount` |           | `number`      | -1      |                                                  |
| `element`   |             |           | `Element`     |         | SCL element SubEquipment                         |
| `label`     | `label`     | readonly  | `string`      |         | SubEquipment name attribute                      |

## Methods

| Method   | Type       |
|----------|------------|
| `remove` | `(): void` |
