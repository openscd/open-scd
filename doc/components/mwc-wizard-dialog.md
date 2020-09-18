# mwc-wizard-dialog

## Properties

| Property    | Attribute | Modifiers | Type                      | Default                   |
|-------------|-----------|-----------|---------------------------|---------------------------|
| `inputs`    |           |           | `NodeListOf<WizardInput>` |                           |
| `page`      | `page`    | readonly  | `WizardPage`              |                           |
| `pageIndex` |           |           | `number`                  | 0                         |
| `wizard`    | `wizard`  |           | `Wizard \| undefined`     | {"pages":[],"actions":{}} |

## Methods

| Method   | Type                     |
|----------|--------------------------|
| `closed` | `(action: string): void` |
| `next`   | `(): void`               |
| `prev`   | `(): void`               |

## Events

| Event    | Type                                       |
|----------|--------------------------------------------|
| `wizard` | `CustomEvent<{ wizard: Wizard \| null; }>` |
