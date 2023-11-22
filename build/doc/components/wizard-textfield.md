# wizard-textfield

A potentially `nullable` `TextField` that allows for selection of an SI
`multiplier` if an SI `unit` is given.

NB: Use `maybeValue: string | null` instead of `value` if `nullable`!

## Properties

| Property                  | Attribute        | Modifiers | Type                                             | Default   | Description                                      |
|---------------------------|------------------|-----------|--------------------------------------------------|-----------|--------------------------------------------------|
| `autoValidate`            |                  |           | `boolean`                                        |           |                                                  |
| `autocapitalize`          |                  |           | `string`                                         |           |                                                  |
| `charCounter`             |                  |           | `boolean \| "external" \| "internal"`            |           |                                                  |
| `defaultValue`            | `defaultValue`   |           | `string`                                         | ""        | The default `value` displayed if [[`maybeValue`]] is `null`. |
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
| `maybeValue`              | `maybeValue`     |           | `string \| null`                                 |           | Replacement for `value`, can only be `null` if [[`nullable`]]. |
| `min`                     |                  |           | `string \| number`                               |           |                                                  |
| `minLength`               |                  |           | `number`                                         |           |                                                  |
| `multiplier`              | `multiplier`     |           | `string \| null`                                 |           |                                                  |
| `multiplierButton`        |                  |           | `IconButton \| undefined`                        |           |                                                  |
| `multiplierMenu`          |                  |           | `Menu \| undefined`                              |           |                                                  |
| `multipliers`             | `multipliers`    |           | `(string \| null)[]`                             | [null,""] | Selectable SI multipliers for a non-empty [[`unit`]]. |
| `name`                    |                  |           | `string`                                         |           |                                                  |
| `nullSwitch`              |                  |           | `Switch \| undefined`                            |           |                                                  |
| `nullable`                | `nullable`       |           | `boolean`                                        | false     | Whether [[`maybeValue`]] may be `null`           |
| `outlined`                |                  |           | `boolean`                                        |           |                                                  |
| `pattern`                 |                  |           | `string`                                         |           |                                                  |
| `placeholder`             |                  |           | `string`                                         |           |                                                  |
| `prefix`                  |                  |           | `string`                                         |           |                                                  |
| `readOnly`                |                  |           | `boolean`                                        |           |                                                  |
| `required`                |                  |           | `boolean`                                        |           |                                                  |
| `reservedValues`          | `reservedValues` |           | `string[]`                                       | []        | Additional values that cause validation to fail. |
| `ripple`                  |                  | readonly  | `Promise<RippleInterface \| null> \| undefined`  |           | Implement ripple getter for Ripple integration with mwc-formfield |
| `selectionEnd`            |                  | readonly  | `number \| null`                                 |           |                                                  |
| `selectionStart`          |                  | readonly  | `number \| null`                                 |           |                                                  |
| `size`                    |                  |           | `number \| null`                                 |           |                                                  |
| `step`                    |                  |           | `number \| null`                                 |           |                                                  |
| `suffix`                  |                  |           | `string`                                         |           |                                                  |
| `type`                    |                  |           | `TextFieldType`                                  |           |                                                  |
| `unit`                    | `unit`           |           | `string`                                         | ""        | SI Unit, must be non-empty to allow for selecting a [[`multiplier`]].<br />Overrides `suffix`. |
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
