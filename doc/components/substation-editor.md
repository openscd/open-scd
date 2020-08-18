# substation-editor

## Properties

| Property       | Attribute | Modifiers | Type                   | Default      |
|----------------|-----------|-----------|------------------------|--------------|
| `desc`         | `desc`    | readonly  | `string`               |              |
| `descUI`       |           |           | `TextField`            |              |
| `doc`          | `doc`     |           | `XMLDocument`          |              |
| `editUI`       |           |           | `DialogBase`           |              |
| `editorPaneUI` |           |           | `HTMLElement`          |              |
| `name`         | `name`    | readonly  | `string`               |              |
| `nameUI`       |           |           | `TextField`            |              |
| `node`         | `node`    |           | `Element \| undefined` |              |
| `tag`          |           |           | `string`               | "Substation" |

## Methods

| Method           | Type               |
|------------------|--------------------|
| `addSubstation`  | `(e: Event): void` |
| `saveSubstation` | `(e: Event): void` |

## Events

| Event    | Type                  |
|----------|-----------------------|
| `create` | `CustomEvent<Create>` |
| `update` | `CustomEvent<Update>` |
