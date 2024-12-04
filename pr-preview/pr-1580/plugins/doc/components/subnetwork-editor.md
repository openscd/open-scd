# subnetwork-editor

[[`Communication`]] subeditor for a `SubNetwork` element.

## Properties

| Property    | Attribute   | Modifiers | Type             | Default | Description                             |
|-------------|-------------|-----------|------------------|---------|-----------------------------------------|
| `bitrate`   | `bitrate`   | readonly  | `string \| null` |         | SubNetwork child elements BitRate label |
| `desc`      | `desc`      | readonly  | `string \| null` |         | SubNetwork attribute desc               |
| `doc`       |             |           | `XMLDocument`    |         |                                         |
| `editCount` | `editCount` |           | `number`         | -1      |                                         |
| `element`   |             |           | `Element`        |         | SCL element SubNetwork                  |
| `name`      | `name`      | readonly  | `string`         |         | SubNetwork attribute name               |
| `type`      | `type`      | readonly  | `string \| null` |         | SubNetwork attribute type               |

## Methods

| Method   | Type       |
|----------|------------|
| `remove` | `(): void` |
