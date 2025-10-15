# conducting-equipment-editor

[[`SubstationEditor`]] subeditor for a `ConductingEquipment` element.

## Properties

| Property        | Attribute       | Modifiers | Type          | Default | Description                                      |
|-----------------|-----------------|-----------|---------------|---------|--------------------------------------------------|
| `addButton`     |                 |           | `IconButton`  |         |                                                  |
| `addMenu`       |                 |           | `Menu`        |         |                                                  |
| `doc`           |                 |           | `XMLDocument` |         | The document being edited as provided to editor by [[`Zeroline`]]. |
| `editCount`     | `editCount`     |           | `number`      | -1      |                                                  |
| `element`       |                 |           | `Element`     |         | SCL element ConductingEquipment                  |
| `name`          | `name`          | readonly  | `string`      |         | ConductingEquipment name attribute               |
| `showfunctions` | `showfunctions` |           | `boolean`     | false   | Whether `EqFunction`, `SubEqFunction` and `SubEquipment` are rendered |

## Methods

| Method              | Type                 |
|---------------------|----------------------|
| `remove`            | `(): void`           |
| `renderContentIcon` | `(): TemplateResult` |
| `renderContentPane` | `(): TemplateResult` |
| `renderEqFunctions` | `(): TemplateResult` |
