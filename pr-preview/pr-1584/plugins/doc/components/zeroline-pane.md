# zeroline-pane

[[`Zeroline`]] pane for displaying `Substation` and/or `IED` sections.

## Properties

| Property           | Attribute   | Type                                             | Default    | Description                                      |
|--------------------|-------------|--------------------------------------------------|------------|--------------------------------------------------|
| `addButton`        |             | `IconButton`                                     |            |                                                  |
| `addMenu`          |             | `Menu`                                           |            |                                                  |
| `commmap`          |             | `IconButton`                                     |            |                                                  |
| `createsubstation` |             | `IconButton`                                     |            |                                                  |
| `doc`              |             | `XMLDocument`                                    |            | The document being edited as provided to editor by [[`Zeroline`]]. |
| `editCount`        | `editCount` | `number`                                         | -1         |                                                  |
| `getAttachedIeds`  |             | `((element: Element) => Element[]) \| undefined` | "() => []" |                                                  |
| `gsecontrol`       |             | `IconButton`                                     |            |                                                  |
| `readonly`         | `readonly`  | `boolean`                                        | false      |                                                  |
| `reportcontrol`    |             | `IconButton`                                     |            |                                                  |
| `showfunctions`    |             | `IconButtonToggle`                               |            |                                                  |
| `showieds`         |             | `IconButtonToggle`                               |            |                                                  |
| `smvcontrol`       |             | `IconButton`                                     |            |                                                  |

## Methods

| Method                             | Type                 |
|------------------------------------|----------------------|
| `openCommunicationMapping`         | `(): void`           |
| `openGseControlSelection`          | `(): void`           |
| `openReportControlSelection`       | `(): void`           |
| `openSampledValueControlSelection` | `(): void`           |
| `renderIedContainer`               | `(): TemplateResult` |
| `renderLines`                      | `(): TemplateResult` |
| `renderProcesses`                  | `(): TemplateResult` |
| `renderSubstation`                 | `(): TemplateResult` |
| `toggleShowFunctions`              | `(): void`           |
| `toggleShowIEDs`                   | `(): void`           |
