# substation-editor

[[`Substation`]] plugin subeditor for editing `Substation` sections.

## Properties

| Property          | Attribute       | Modifiers | Type                                             | Default                        | Description                                      |
|-------------------|-----------------|-----------|--------------------------------------------------|--------------------------------|--------------------------------------------------|
| `addButton`       |                 |           | `IconButton`                                     |                                |                                                  |
| `addMenu`         |                 |           | `Menu`                                           |                                |                                                  |
| `cloneUI`         |                 |           | `boolean`                                        | false                          |                                                  |
| `dialog`          |                 |           | `Dialog`                                         |                                |                                                  |
| `doc`             |                 |           | `XMLDocument`                                    |                                | The document being edited as provided to editor by [[`Zeroline`]]. |
| `editCount`       | `editCount`     |           | `number`                                         | -1                             |                                                  |
| `element`         |                 |           | `Element`                                        |                                | The edited `Element`, a common property of all Substation subeditors. |
| `getAttachedIeds` |                 |           | `((element: Element) => Element[]) \| undefined` | "() => {\n    return [];\n  }" |                                                  |
| `header`          | `header`        | readonly  | `string`                                         |                                |                                                  |
| `readonly`        | `readonly`      |           | `boolean`                                        | false                          |                                                  |
| `showfunctions`   | `showfunctions` |           | `boolean`                                        | false                          | Whether `Function` and `SubFunction` are rendered |

## Methods

| Method                            | Type                 | Description                                      |
|-----------------------------------|----------------------|--------------------------------------------------|
| `openEditWizard`                  | `(): void`           | Opens a [[`WizardDialog`]] for editing [[`element`]]. |
| `openLNodeWizard`                 | `(): void`           | Opens a [[`WizardDialog`]] for editing `LNode` connections. |
| `remove`                          | `(): void`           | Deletes [[`element`]].                           |
| `renderFunctions`                 | `(): TemplateResult` |                                                  |
| `renderIedContainer`              | `(): TemplateResult` |                                                  |
| `renderPowerTransformerContainer` | `(): TemplateResult` |                                                  |
