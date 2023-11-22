# wizard-checkbox

A potentially `nullable` labelled checkbox.

## Properties

| Property         | Attribute        | Modifiers | Type                    | Default | Description                                      |
|------------------|------------------|-----------|-------------------------|---------|--------------------------------------------------|
| `checkbox`       |                  |           | `Checkbox \| undefined` |         |                                                  |
| `checked`        |                  |           | `boolean`               |         |                                                  |
| `defaultChecked` | `defaultChecked` |           | `boolean`               | false   | The default `checked` state while [[`maybeValue`]] is `null`. |
| `disabled`       | `disabled`       |           | `boolean`               | false   | Disables component including null switch         |
| `formfieldLabel` |                  | readonly  | `string`                |         |                                                  |
| `helper`         | `helper`         |           | `string`                | ""      | Parenthetical information rendered after the label: `label (helper)` |
| `label`          | `label`          |           | `string`                | ""      |                                                  |
| `maybeValue`     | `maybeValue`     |           | `string \| null`        |         | Is `"true"` when checked, `"false"` un-checked, `null` if [[`nullable`]]. |
| `nullSwitch`     |                  |           | `Switch \| undefined`   |         |                                                  |
| `nullable`       | `nullable`       |           | `boolean`               | false   | Whether [[`maybeValue`]] may be `null`           |

## Methods

| Method         | Type                 |
|----------------|----------------------|
| `renderSwitch` | `(): TemplateResult` |
