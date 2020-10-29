# bay-editor

## Properties

| Property      | Attribute | Modifiers | Type             |
|---------------|-----------|-----------|------------------|
| `desc`        | `desc`    | readonly  | `string \| null` |
| `element`     | `element` |           | `Element`        |
| `header`      |           |           | `Element`        |
| `lNodeButton` |           |           | `IconButton`     |
| `lNodeMenu`   |           |           | `Menu`           |
| `name`        | `name`    | readonly  | `string`         |
| `parent`      | `parent`  |           | `Element`        |

## Methods

| Method                          | Type                 |
|---------------------------------|----------------------|
| `openConductingEquipmentWizard` | `(): void`           |
| `openEditWizard`                | `(): void`           |
| `openLNodeAddWizard`            | `(): void`           |
| `openLNodeRemoveWizard`         | `(): void`           |
| `removeAction`                  | `(): void`           |
| `renderHeader`                  | `(): TemplateResult` |
