# sub-equipment-editor

[[`SubstationEditor`]] subeditor for a child-less `SubEquipment` element.

## Properties

| Property    | Attribute | Modifiers | Type          | Description                                      |
|-------------|-----------|-----------|---------------|--------------------------------------------------|
| `addButton` |           |           | `IconButton`  |                                                  |
| `addMenu`   |           |           | `Menu`        |                                                  |
| `doc`       |           |           | `XMLDocument` | The document being edited as provided to editor by [[`Zeroline`]]. |
| `element`   |           |           | `Element`     | SCL element SubEquipment                         |
| `label`     | `label`   | readonly  | `string`      | SubEquipment name attribute                      |

## Methods

| Method   | Type       |
|----------|------------|
| `remove` | `(): void` |
