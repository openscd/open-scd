# bay-editor

## Properties

| Property  | Attribute | Modifiers | Type             |
|-----------|-----------|-----------|------------------|
| `desc`    | `desc`    | readonly  | `string \| null` |
| `element` | `element` |           | `Element`        |
| `header`  |           |           | `Element`        |
| `name`    | `name`    | readonly  | `string`         |
| `parent`  | `parent`  |           | `Element`        |

## Methods

| Method                          | Type                 |
|---------------------------------|----------------------|
| `openConductingEquipmentWizard` | `(): void`           |
| `openEditWizard`                | `(): void`           |
| `removeAction`                  | `(): void`           |
| `renderHeader`                  | `(): TemplateResult` |
