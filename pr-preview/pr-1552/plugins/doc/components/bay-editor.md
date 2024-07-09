# bay-editor

[[`SubstationEditor`]] subeditor for a `Bay` element.

## Properties

| Property          | Attribute       | Modifiers | Type                                             | Default                        | Description                                      |
|-------------------|-----------------|-----------|--------------------------------------------------|--------------------------------|--------------------------------------------------|
| `addButton`       |                 |           | `IconButton`                                     |                                |                                                  |
| `addMenu`         |                 |           | `Menu`                                           |                                |                                                  |
| `cloneUI`         |                 |           | `boolean`                                        | false                          |                                                  |
| `dialog`          |                 |           | `Dialog`                                         |                                |                                                  |
| `doc`             |                 |           | `XMLDocument`                                    |                                | The document being edited as provided to editor by [[`Zeroline`]]. |
| `editCount`       | `editCount`     |           | `number`                                         | -1                             |                                                  |
| `element`         |                 |           | `Element`                                        |                                |                                                  |
| `getAttachedIeds` |                 |           | `((element: Element) => Element[]) \| undefined` | "() => {\n    return [];\n  }" |                                                  |
| `header`          | `header`        | readonly  | `string`                                         |                                |                                                  |
| `readonly`        | `readonly`      |           | `boolean`                                        | false                          |                                                  |
| `showfunctions`   | `showfunctions` |           | `boolean`                                        | false                          | Whether `Function` and `SubFunction` are rendered |

## Methods

| Method               | Type                 | Description                                      |
|----------------------|----------------------|--------------------------------------------------|
| `openEditWizard`     | `(): void`           |                                                  |
| `openLNodeWizard`    | `(): void`           | Opens a [[`WizardDialog`]] for editing `LNode` connections. |
| `remove`             | `(): void`           |                                                  |
| `renderFunctions`    | `(): TemplateResult` |                                                  |
| `renderIedContainer` | `(): TemplateResult` |                                                  |
