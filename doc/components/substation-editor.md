# substation-editor

## Properties

| Property | Attribute | Modifiers | Type              | Default |
|----------|-----------|-----------|-------------------|---------|
| `desc`   | `desc`    | readonly  | `string \| null`  |         |
| `descUI` |           | readonly  | `TextField`       |         |
| `doc`    |           |           | `Element \| null` | null    |
| `editUI` |           | readonly  | `DialogBase`      |         |
| `name`   | `name`    | readonly  | `string \| null`  |         |
| `nameUI` |           | readonly  | `TextField`       |         |

## Methods

| Method           | Type       |
|------------------|------------|
| `addSubstation`  | `(): void` |
| `saveSubstation` | `(): void` |

## Events

| Event  | Type                      |
|--------|---------------------------|
| `add`  | `CustomEvent<AddDetail>`  |
| `edit` | `CustomEvent<EditDetail>` |
