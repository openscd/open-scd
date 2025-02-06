# cleanup-control-blocks

An editor component for cleaning SCL Control Blocks.

## Properties

| Property                           | Attribute              | Type                          | Default | Description                                      |
|------------------------------------|------------------------|-------------------------------|---------|--------------------------------------------------|
| `cleanButton`                      |                        | `Button`                      |         |                                                  |
| `cleanupAddressCheckbox`           |                        | `Checkbox \| undefined`       |         |                                                  |
| `cleanupGSEControlFilter`          |                        | `Button`                      |         |                                                  |
| `cleanupList`                      |                        | `List \| undefined`           |         |                                                  |
| `cleanupListItems`                 |                        | `ListItem[] \| undefined`     |         |                                                  |
| `cleanupLogControlFilter`          |                        | `Button`                      |         |                                                  |
| `cleanupReportControlFilter`       |                        | `Button`                      |         |                                                  |
| `cleanupSampledValueControlFilter` |                        | `Button`                      |         |                                                  |
| `disableControlClean`              | `disableControlClean`  | `boolean`                     | false   |                                                  |
| `doc`                              |                        | `XMLDocument`                 |         | The document being edited as provided to plugins by [[`OpenSCD`]]. |
| `selectedControlItems`             |                        | `number \| Set<number> \| []` | []      |                                                  |
| `unreferencedControls`             | `unreferencedControls` | `Element[]`                   | []      |                                                  |
