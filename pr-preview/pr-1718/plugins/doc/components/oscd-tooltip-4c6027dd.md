# oscd-tooltip-4c6027dd

A tooltip element that follows the mouse cursor and displays a text box.

## Properties

| Property  | Attribute | Type      | Default |
|-----------|-----------|-----------|---------|
| `offset`  | `offset`  | `number`  | 12      |
| `text`    | `text`    | `string`  | ""      |
| `visible` | `visible` | `boolean` | false   |
| `x`       | `x`       | `number`  | 0       |
| `y`       | `y`       | `number`  | 0       |

## Methods

| Method           | Type                                             |
|------------------|--------------------------------------------------|
| `hide`           | `(): void`                                       |
| `show`           | `(text: string, clientX: number, clientY: number): void` |
| `updatePosition` | `(clientX: number, clientY: number): void`       |
