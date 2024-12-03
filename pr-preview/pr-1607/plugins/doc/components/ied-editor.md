# ied-editor

[[`SubstationEditor`]] subeditor for a child-less `IED` element.

## Properties

| Property        | Attribute   | Modifiers | Type          | Default | Description                                      |
|-----------------|-------------|-----------|---------------|---------|--------------------------------------------------|
| `connectReport` |             |           | `Fab`         |         |                                                  |
| `doc`           |             |           | `XMLDocument` |         | The document being edited as provided to editor by [[`Zeroline`]]. |
| `editCount`     | `editCount` |           | `number`      | -1      |                                                  |
| `element`       |             |           | `Element`     |         | SCL element IED                                  |
| `name`          | `name`      | readonly  | `string`      |         | IED name attribute                               |
