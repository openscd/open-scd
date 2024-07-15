# gse-control-editor

## Properties

| Property                 | Attribute   | Type                           | Default | Description                                      |
|--------------------------|-------------|--------------------------------|---------|--------------------------------------------------|
| `doc`                    |             | `XMLDocument`                  |         | The document being edited as provided to plugins by [[`OpenSCD`]]. |
| `editCount`              | `editCount` | `number`                       | -1      |                                                  |
| `selectGSEControlButton` |             | `Button`                       |         |                                                  |
| `selectedDataSet`        |             | `Element \| null \| undefined` |         |                                                  |
| `selectedGseControl`     |             | `Element \| undefined`         |         |                                                  |
| `selectionList`          |             | `FilteredList`                 |         |                                                  |

## Methods

| Method                | Type                 |
|-----------------------|----------------------|
| `renderSelectionList` | `(): TemplateResult` |
