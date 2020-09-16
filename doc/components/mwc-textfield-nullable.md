# mwc-textfield-nullable

## Properties

| Property                  | Attribute      | Modifiers | Type                                             | Default                                          | Description                                      |
|---------------------------|----------------|-----------|--------------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `autoValidate`            |                |           | `boolean`                                        |                                                  |                                                  |
| `autocapitalize`          |                |           | `string`                                         |                                                  |                                                  |
| `charCounter`             |                |           | `boolean \| "external" \| "internal"`            |                                                  |                                                  |
| `defaultValue`            | `defaultValue` |           | `string`                                         | ""                                               |                                                  |
| `disabled`                |                |           | `boolean`                                        |                                                  |                                                  |
| `endAligned`              |                |           | `boolean`                                        |                                                  |                                                  |
| `helper`                  |                |           | `string`                                         |                                                  |                                                  |
| `helperPersistent`        |                |           | `boolean`                                        |                                                  |                                                  |
| `icon`                    |                |           | `string`                                         |                                                  |                                                  |
| `iconTrailing`            |                |           | `string`                                         |                                                  |                                                  |
| `inputMode`               |                |           | `TextFieldInputMode`                             |                                                  |                                                  |
| `label`                   |                |           | `string`                                         |                                                  |                                                  |
| `max`                     |                |           | `string \| number`                               |                                                  |                                                  |
| `maxLength`               |                |           | `number`                                         |                                                  |                                                  |
| `min`                     |                |           | `string \| number`                               |                                                  |                                                  |
| `minLength`               |                |           | `number`                                         |                                                  |                                                  |
| `name`                    |                |           | `string`                                         |                                                  |                                                  |
| `null`                    | `null`         |           | `boolean`                                        |                                                  |                                                  |
| `nulled`                  |                |           | `{ value: string; helper: string; helperPersistent: boolean; disabled: boolean; }` | {"helper":"helper","helperPersistent":"helperPersistent","disabled":"disabled"} |                                                  |
| `outlined`                |                |           | `boolean`                                        |                                                  |                                                  |
| `pattern`                 |                |           | `string`                                         |                                                  |                                                  |
| `placeholder`             |                |           | `string`                                         |                                                  |                                                  |
| `prefix`                  |                |           | `string`                                         |                                                  |                                                  |
| `readOnly`                |                |           | `boolean`                                        |                                                  |                                                  |
| `required`                |                |           | `boolean`                                        |                                                  |                                                  |
| `ripple`                  |                | readonly  | `RippleInterface \| Promise<RippleInterface \| null> \| undefined` |                                                  | Implement ripple getter for Ripple integration with mwc-formfield |
| `selectionEnd`            |                | readonly  | `number \| null`                                 |                                                  |                                                  |
| `selectionStart`          |                | readonly  | `number \| null`                                 |                                                  |                                                  |
| `size`                    |                |           | `number \| null`                                 |                                                  |                                                  |
| `step`                    |                |           | `number \| null`                                 |                                                  |                                                  |
| `suffix`                  |                |           | `string`                                         |                                                  |                                                  |
| `switch`                  |                |           | `Switch \| undefined`                            |                                                  |                                                  |
| `type`                    |                |           | `TextFieldType`                                  |                                                  |                                                  |
| `validateOnInitialRender` |                |           | `boolean`                                        |                                                  |                                                  |
| `validationMessage`       |                |           | `string`                                         |                                                  |                                                  |
| `validity`                |                | readonly  | `ValidityState`                                  |                                                  |                                                  |
| `validityTransform`       |                |           | `((value: string, nativeValidity: ValidityState) => Partial<ValidityState>) \| null` |                                                  |                                                  |
| `value`                   |                |           | `string`                                         |                                                  |                                                  |
| `willValidate`            |                | readonly  | `boolean`                                        |                                                  |                                                  |

## Methods

| Method              | Type                                             |
|---------------------|--------------------------------------------------|
| `blur`              | `(): void`                                       |
| `checkValidity`     | `(): boolean`                                    |
| `click`             | `(): void`                                       |
| `focus`             | `(): void`                                       |
| `layout`            | `(): Promise<void>`                              |
| `reportValidity`    | `(): boolean`                                    |
| `select`            | `(): void`                                       |
| `setAriaLabel`      | `(label: string): void`                          |
| `setCustomValidity` | `(message: string): void`                        |
| `setSelectionRange` | `(selectionStart: number, selectionEnd: number, selectionDirection?: "forward" \| "backward" \| "none" \| undefined): void` |
| `toggleValue`       | `(): void`                                       |
