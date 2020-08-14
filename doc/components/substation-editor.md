# substation-editor

## Properties

| Property       | Attribute | Type              | Default      |
|----------------|-----------|-------------------|--------------|
| `desc`         | `desc`    | `string \| null`  |              |
| `descUI`       |           | `TextField`       |              |
| `editUI`       |           | `DialogBase`      |              |
| `editorPaneUI` |           | `HTMLElement`     |              |
| `name`         | `name`    | `string \| null`  |              |
| `nameUI`       |           | `TextField`       |              |
| `node`         | `node`    | `Element \| null` | null         |
| `tag`          |           | `string`          | "Substation" |

## Methods

| Method           | Type               |
|------------------|--------------------|
| `addSubstation`  | `(e: Event): void` |
| `saveSubstation` | `(e: Event): void` |

## Events

| Event  | Type                      |
|--------|---------------------------|
| `add`  | `CustomEvent<AddDetail>`  |
| `edit` | `CustomEvent<EditDetail>` |
