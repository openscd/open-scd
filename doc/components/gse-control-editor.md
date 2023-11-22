# gse-control-editor

## Properties

| Property                 | Type                           | Description                                      |
|--------------------------|--------------------------------|--------------------------------------------------|
| `doc`                    | `XMLDocument`                  | The document being edited as provided to plugins by [[`OpenSCD`]]. |
| `selectGSEControlButton` | `Button`                       |                                                  |
| `selectedDataSet`        | `Element \| null \| undefined` |                                                  |
| `selectedGseControl`     | `Element \| undefined`         |                                                  |
| `selectionList`          | `FilteredList`                 |                                                  |

## Methods

| Method                | Type                 |
|-----------------------|----------------------|
| `renderSelectionList` | `(): TemplateResult` |
