# eq-function-editor

Pane rendering `EqFunction` element with its children

## Properties

| Property        | Attribute       | Type          | Default | Description                                      |
|-----------------|-----------------|---------------|---------|--------------------------------------------------|
| `addButton`     |                 | `IconButton`  |         |                                                  |
| `addMenu`       |                 | `Menu`        |         |                                                  |
| `doc`           |                 | `XMLDocument` |         | The document being edited as provided to editor by [[`Zeroline`]]. |
| `editCount`     | `editCount`     | `number`      | -1      |                                                  |
| `element`       |                 | `Element`     |         | The edited `EqFunction` element                  |
| `showfunctions` | `showfunctions` | `boolean`     | false   |                                                  |

## Methods

| Method   | Type       |
|----------|------------|
| `remove` | `(): void` |
