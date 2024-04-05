# action-pane

A responsive container rendering actions in a header.

The "action" slot may contain up to eight icon buttons.
The "icon" slot, if filled overrides the icon property.
The default slot will be rendered into the pane body in a single column.

## Properties

| Property      | Attribute     | Type                  | Default | Description                                      |
|---------------|---------------|-----------------------|---------|--------------------------------------------------|
| `highlighted` | `highlighted` | `boolean`             | false   | highlight pane with dotted outline               |
| `icon`        | `icon`        | `string \| undefined` |         | icon name, displayed unless the "icon" slot is filled |
| `label`       | `label`       | `string \| undefined` |         | caption text, displayed in the header            |
| `level`       | `level`       | `number`              | 1       | nesting level, default (closest pane ancestor's level) + 1 |
| `secondary`   | `secondary`   | `boolean`             | false   | color header with secondary theme color while focus is within |
