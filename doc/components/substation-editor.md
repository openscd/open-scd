# substation-editor

## Properties

| Property | Attribute | Modifiers | Type                        | Default |
|----------|-----------|-----------|-----------------------------|---------|
| `desc`   | `desc`    | readonly  | `string \| null`            |         |
| `descUI` |           | readonly  | `TextField`                 |         |
| `doc`    |           |           | `Readonly<Element> \| null` | null    |
| `editUI` |           | readonly  | `DialogBase`                |         |
| `name`   | `name`    | readonly  | `string \| null`            |         |
| `nameUI` |           | readonly  | `TextField`                 |         |

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
