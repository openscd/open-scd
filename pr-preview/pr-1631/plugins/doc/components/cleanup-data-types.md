# cleanup-data-types

An editor component for cleaning SCL DataType templates.

## Properties

| Property                 | Attribute               | Type                          | Default | Description                                      |
|--------------------------|-------------------------|-------------------------------|---------|--------------------------------------------------|
| `cleanButton`            |                         | `Button`                      |         |                                                  |
| `cleanSubTypesCheckbox`  |                         | `Checkbox \| undefined`       |         |                                                  |
| `cleanupDATypeFilter`    |                         | `Button`                      |         |                                                  |
| `cleanupDOTypeFilter`    |                         | `Button`                      |         |                                                  |
| `cleanupEnumTypeFilter`  |                         | `Button`                      |         |                                                  |
| `cleanupLNodeTypeFilter` |                         | `Button`                      |         |                                                  |
| `cleanupList`            |                         | `List \| undefined`           |         |                                                  |
| `cleanupListItems`       |                         | `ListItem[] \| undefined`     |         |                                                  |
| `disableControlClean`    | `disableControlClean`   | `boolean`                     | false   |                                                  |
| `doc`                    |                         | `XMLDocument`                 |         | The document being edited as provided to plugins by [[`OpenSCD`]]. |
| `selectedDataTypeItems`  |                         | `number \| Set<number> \| []` | []      |                                                  |
| `unreferencedDataTypes`  | `unreferencedDataTypes` | `Element[]`                   | []      |                                                  |

## Methods

| Method          | Type            | Description                                      |
|-----------------|-----------------|--------------------------------------------------|
| `getCleanItems` | `(): Element[]` | Get items from selection list and and any subtypes. |
