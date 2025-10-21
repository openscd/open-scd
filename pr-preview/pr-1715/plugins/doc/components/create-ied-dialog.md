# create-ied-dialog

A dialog component for creating virtual IEDs

## Properties

| Property    | Attribute   | Modifiers | Type                        |
|-------------|-------------|-----------|-----------------------------|
| `dialog`    |             |           | `Dialog`                    |
| `doc`       | `doc`       |           | `XMLDocument`               |
| `onConfirm` | `onConfirm` |           | `(iedName: string) => void` |
| `open`      |             | readonly  | `boolean`                   |

## Methods

| Method | Type       |
|--------|------------|
| `show` | `(): void` |
