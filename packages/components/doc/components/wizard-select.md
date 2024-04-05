# wizard-select

A potentially `nullable` `Select`.

NB: Use `maybeValue: string | null` instead of `value` if `nullable`!

## Properties

| Property                  | Attribute        | Modifiers | Type                                             | Default | Description                                      |
|---------------------------|------------------|-----------|--------------------------------------------------|---------|--------------------------------------------------|
| `defaultValue`            | `defaultValue`   |           | `string`                                         | ""      | The default `value` displayed if [[`maybeValue`]] is `null`. |
| `disabled`                |                  |           | `boolean`                                        |         |                                                  |
| `fixedMenuPosition`       |                  |           | `boolean`                                        |         |                                                  |
| `helper`                  |                  |           | `string`                                         |         |                                                  |
| `icon`                    |                  |           | `string`                                         |         |                                                  |
| `index`                   |                  | readonly  | `number`                                         |         |                                                  |
| `items`                   |                  | readonly  | `ListItemBase[]`                                 |         |                                                  |
| `label`                   |                  |           | `string`                                         |         |                                                  |
| `maybeValue`              | `maybeValue`     |           | `string \| null`                                 |         | Replacement for `value`, can only be `null` if [[`nullable`]]. |
| `naturalMenuWidth`        |                  |           | `boolean`                                        |         |                                                  |
| `nullSwitch`              |                  |           | `Switch \| undefined`                            |         |                                                  |
| `nullable`                | `nullable`       |           | `boolean`                                        | false   | Whether [[`maybeValue`]] may be `null`           |
| `outlined`                |                  |           | `boolean`                                        |         |                                                  |
| `required`                |                  |           | `boolean`                                        |         |                                                  |
| `reservedValues`          | `reservedValues` |           | `string[]`                                       | []      | Additional values that cause validation to fail. |
| `ripple`                  |                  | readonly  | `Promise<RippleInterface \| null> \| undefined`  |         | Implement ripple getter for Ripple integration with mwc-formfield |
| `selected`                |                  | readonly  | `ListItemBase \| null`                           |         |                                                  |
| `validateOnInitialRender` |                  |           | `boolean`                                        |         |                                                  |
| `validationMessage`       |                  |           | `string`                                         |         |                                                  |
| `validity`                |                  | readonly  | `ValidityState`                                  |         |                                                  |
| `validityTransform`       |                  |           | `((value: string, nativeValidity: ValidityState) => Partial<ValidityState>) \| null` |         |                                                  |
| `value`                   |                  |           | `string`                                         |         |                                                  |

## Methods

| Method              | Type                                             |
|---------------------|--------------------------------------------------|
| `blur`              | `(): void`                                       |
| `checkValidity`     | `(): boolean`                                    |
| `click`             | `(): void`                                       |
| `focus`             | `(): void`                                       |
| `layout`            | `(updateItems?: boolean \| undefined): Promise<void>` |
| `layoutOptions`     | `(): Promise<void>`                              |
| `renderSwitch`      | `(): TemplateResult`                             |
| `reportValidity`    | `(): boolean`                                    |
| `select`            | `(index: number): void`                          |
| `setAriaLabel`      | `(label: string): void`                          |
| `setCustomValidity` | `(message: string): void`                        |

## Events

| Event      | Type             |
|------------|------------------|
| `action`   | `ActionDetail`   |
| `change`   |                  |
| `closed`   |                  |
| `invalid`  |                  |
| `opened`   |                  |
| `selected` | `SelectedDetail` |
