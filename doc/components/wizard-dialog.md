# wizard-dialog

## Properties

| Property           | Attribute | Modifiers | Type                      | Default |
|--------------------|-----------|-----------|---------------------------|---------|
| `act`              |           |           |                           |         |
| `dialog`           |           | readonly  | `Dialog \| undefined`     |         |
| `dialogs`          |           |           | `NodeListOf<Dialog>`      |         |
| `firstInvalidPage` |           | readonly  | `number`                  |         |
| `inputs`           |           |           | `NodeListOf<WizardInput>` |         |
| `pageIndex`        |           |           | `number`                  | 0       |
| `renderPage`       |           |           |                           |         |
| `wizard`           | `wizard`  |           | `Wizard`                  | []      |

## Methods

| Method          | Type                                             |
|-----------------|--------------------------------------------------|
| `act`           | `(action?: WizardAction \| undefined): Promise<boolean>` |
| `checkValidity` | `(): boolean`                                    |
| `close`         | `(): void`                                       |
| `next`          | `(): Promise<void>`                              |
| `onClosed`      | `(ae: CustomEvent<{ action: string; } \| null>): void` |
| `prev`          | `(): void`                                       |
| `renderPage`    | `(page: WizardPage, index: number): TemplateResult` |
