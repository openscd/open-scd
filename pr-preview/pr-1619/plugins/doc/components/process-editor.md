# process-editor

## Properties

| Property        | Attribute       | Modifiers | Type          | Default | Description                                      |
|-----------------|-----------------|-----------|---------------|---------|--------------------------------------------------|
| `addButton`     |                 |           | `IconButton`  |         |                                                  |
| `addMenu`       |                 |           | `Menu`        |         |                                                  |
| `doc`           |                 |           | `XMLDocument` |         | The document being edited as provided to editor by [[`Zeroline`]]. |
| `editCount`     | `editCount`     |           | `number`      | -1      |                                                  |
| `element`       |                 |           | `Element`     |         | SCL element Process                              |
| `header`        |                 | readonly  | `string`      |         |                                                  |
| `showfunctions` | `showfunctions` |           | `boolean`     | false   | Whether `Function` and `LNode` are rendered      |

## Methods

| Method   | Type       |
|----------|------------|
| `remove` | `(): void` |
