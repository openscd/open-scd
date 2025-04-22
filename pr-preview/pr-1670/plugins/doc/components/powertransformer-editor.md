# powertransformer-editor

[[`SubstationEditor`]] subeditor for a child-less `PowerTransformer` element.

## Properties

| Property        | Attribute       | Modifiers | Type          | Default | Description                                      |
|-----------------|-----------------|-----------|---------------|---------|--------------------------------------------------|
| `addButton`     |                 |           | `IconButton`  |         |                                                  |
| `addMenu`       |                 |           | `Menu`        |         |                                                  |
| `doc`           |                 |           | `XMLDocument` |         | The document being edited as provided to editor by [[`Zeroline`]]. |
| `editCount`     | `editCount`     |           | `number`      | -1      |                                                  |
| `element`       |                 |           | `Element`     |         | SCL element PowerTransformer                     |
| `name`          | `name`          | readonly  | `string`      |         | PowerTransformer name attribute                  |
| `showfunctions` | `showfunctions` |           | `boolean`     | false   | Whether `EqFunction`, `SubEqFunction` and `SubEquipment` are rendered |

## Methods

| Method              | Type                 |
|---------------------|----------------------|
| `renderContentIcon` | `(): TemplateResult` |
| `renderContentPane` | `(): TemplateResult` |
| `renderEqFunctions` | `(): TemplateResult` |
