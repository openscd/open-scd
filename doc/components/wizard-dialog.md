# wizard-dialog

## Properties

| Property           | Attribute | Modifiers | Type                          | Default |
|--------------------|-----------|-----------|-------------------------------|---------|
| `dialog`           |           | readonly  | `Dialog \| undefined`         |         |
| `dialogs`          |           |           | `NodeListOf<Dialog>`          |         |
| `firstInvalidPage` |           | readonly  | `number`                      |         |
| `inputs`           |           |           | `NodeListOf<WizardTextField>` |         |
| `pageIndex`        |           |           | `number`                      | 0       |
| `renderPage`       |           |           |                               |         |
| `wizard`           | `wizard`  |           | `Wizard`                      | []      |

## Methods

| Method          | Type                                             |
|-----------------|--------------------------------------------------|
| `act`           | `(action?: ((inputs: WizardTextField[]): Action[]) \| undefined) => Promise<boolean>` |
| `checkValidity` | `(): boolean`                                    |
| `next`          | `(): Promise<void>`                              |
| `onClosed`      | `(ae: CustomEvent<{ action: string; } \| null>): void` |
| `prev`          | `(): void`                                       |
| `renderPage`    | `(page: WizardPage, index: number): TemplateResult` |
| `reset`         | `(): void`                                       |
