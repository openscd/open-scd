# wizard-dialog

A wizard style dialog consisting of several pages commiting some
[[`EditorAction`]] on completion and aborting on dismissal.

## Properties

| Property      | Attribute | Modifiers | Type                             | Default | Description                                      |
|---------------|-----------|-----------|----------------------------------|---------|--------------------------------------------------|
| `act`         |           |           |                                  |         |                                                  |
| `actionsMenu` |           |           | `Menu`                           |         |                                                  |
| `code`        |           | readonly  | `boolean`                        |         |                                                  |
| `dialog`      |           | readonly  | `Dialog \| undefined`            |         | The `Dialog` showing the active [[`WizardPage`]]. |
| `dialogs`     |           |           | `NodeListOf<Dialog>`             |         |                                                  |
| `inputs`      |           |           | `NodeListOf<WizardInputElement>` |         |                                                  |
| `menuButton`  |           |           | `IconButton`                     |         |                                                  |
| `pageIndex`   |           |           | `number`                         | 0       | Index of the currently active [[`WizardPage`]]   |
| `renderPage`  |           |           |                                  |         |                                                  |
| `wizard`      | `wizard`  |           | `Wizard`                         | []      | The [[`Wizard`]] implemented by this dialog.     |

## Methods

| Method          | Type                                             | Description                                      |
|-----------------|--------------------------------------------------|--------------------------------------------------|
| `act`           | `(action?: WizardActor \| undefined, primary?: boolean): Promise<boolean>` | Commits `action` if all inputs are valid, reports validity otherwise. |
| `checkValidity` | `(): boolean`                                    | Checks the inputs of all [[`WizardPage`]]s for validity. |
| `menuAct`       | `(action?: WizardMenuActor \| undefined): Promise<void>` | Triggers menu action callback                    |
| `next`          | `(): Promise<void>`                              |                                                  |
| `prev`          | `(): void`                                       |                                                  |
| `renderMenu`    | `(page: WizardPage): TemplateResult`             |                                                  |
| `renderPage`    | `(page: WizardPage, index: number): TemplateResult` |                                                  |
