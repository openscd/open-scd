# wizard-textfield

## Properties

| Property                  | Attribute        | Modifiers | Type                                             | Default   | Description                                      |
|---------------------------|------------------|-----------|--------------------------------------------------|-----------|--------------------------------------------------|
| `autoValidate`            |                  |           | `boolean`                                        |           |                                                  |
| `autocapitalize`          |                  |           | `string`                                         |           |                                                  |
| `charCounter`             |                  |           | `boolean \| "external" \| "internal"`            |           |                                                  |
| `defaultValue`            | `defaultValue`   |           | `string`                                         | ""        |                                                  |
| `disabled`                |                  |           | `boolean`                                        |           |                                                  |
| `endAligned`              |                  |           | `boolean`                                        |           |                                                  |
| `helper`                  |                  |           | `string`                                         |           |                                                  |
| `helperPersistent`        |                  |           | `boolean`                                        |           |                                                  |
| `icon`                    |                  |           | `string`                                         |           |                                                  |
| `iconTrailing`            |                  |           | `string`                                         |           |                                                  |
| `inputMode`               |                  |           | `TextFieldInputMode`                             |           |                                                  |
| `label`                   |                  |           | `string`                                         |           |                                                  |
| `max`                     |                  |           | `string \| number`                               |           |                                                  |
| `maxLength`               |                  |           | `number`                                         |           |                                                  |
| `maybeValue`              | `maybeValue`     |           | `string \| null`                                 |           |                                                  |
| `min`                     |                  |           | `string \| number`                               |           |                                                  |
| `minLength`               |                  |           | `number`                                         |           |                                                  |
| `multiplier`              | `multiplier`     |           | `string \| null`                                 |           |                                                  |
| `multiplierButton`        |                  |           | `IconButton \| undefined`                        |           |                                                  |
| `multiplierMenu`          |                  |           | `Menu \| undefined`                              |           |                                                  |
| `multipliers`             | `multipliers`    |           | `(string \| null)[]`                             | [null,""] |                                                  |
| `name`                    |                  |           | `string`                                         |           |                                                  |
| `nullSwitch`              |                  |           | `Switch \| undefined`                            |           |                                                  |
| `nullable`                | `nullable`       |           | `boolean`                                        | false     |                                                  |
| `outlined`                |                  |           | `boolean`                                        |           |                                                  |
| `pattern`                 |                  |           | `string`                                         |           |                                                  |
| `placeholder`             |                  |           | `string`                                         |           |                                                  |
| `prefix`                  |                  |           | `string`                                         |           |                                                  |
| `readOnly`                |                  |           | `boolean`                                        |           |                                                  |
| `required`                |                  |           | `boolean`                                        |           |                                                  |
| `reservedValues`          | `reservedValues` |           | `string[]`                                       | []        |                                                  |
| `ripple`                  |                  | readonly  | `RippleInterface \| Promise<RippleInterface \| null> \| undefined` |           | Implement ripple getter for Ripple integration with mwc-formfield |
| `selectionEnd`            |                  | readonly  | `number \| null`                                 |           |                                                  |
| `selectionStart`          |                  | readonly  | `number \| null`                                 |           |                                                  |
| `size`                    |                  |           | `number \| null`                                 |           |                                                  |
| `step`                    |                  |           | `number \| null`                                 |           |                                                  |
| `suffix`                  |                  |           | `string`                                         |           |                                                  |
| `type`                    |                  |           | `TextFieldType`                                  |           |                                                  |
| `unit`                    | `unit`           |           | `string`                                         | ""        |                                                  |
| `validateOnInitialRender` |                  |           | `boolean`                                        |           |                                                  |
| `validationMessage`       |                  |           | `string`                                         |           |                                                  |
| `validity`                |                  | readonly  | `ValidityState`                                  |           |                                                  |
| `validityTransform`       |                  |           | `((value: string, nativeValidity: ValidityState) => Partial<ValidityState>) \| null` |           |                                                  |
| `value`                   |                  |           | `string`                                         |           |                                                  |
| `willValidate`            |                  | readonly  | `boolean`                                        |           |                                                  |

## Methods

| Method               | Type                                             |
|----------------------|--------------------------------------------------|
| `blur`               | `(): void`                                       |
| `checkValidity`      | `(): boolean`                                    |
| `click`              | `(): void`                                       |
| `focus`              | `(): void`                                       |
| `layout`             | `(): Promise<void>`                              |
| `renderMulplierList` | `(): TemplateResult`                             |
| `renderSwitch`       | `(): TemplateResult`                             |
| `renderUnitSelector` | `(): TemplateResult`                             |
| `reportValidity`     | `(): boolean`                                    |
| `select`             | `(): void`                                       |
| `setAriaLabel`       | `(label: string): void`                          |
| `setCustomValidity`  | `(message: string): void`                        |
| `setSelectionRange`  | `(selectionStart: number, selectionEnd: number, selectionDirection?: "forward" \| "backward" \| "none" \| undefined): void` |
