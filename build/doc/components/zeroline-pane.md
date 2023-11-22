# zeroline-pane

[[`Zeroline`]] pane for displaying `Substation` and/or `IED` sections.

## Properties

| Property           | Attribute  | Type                                             | Default    | Description                                      |
|--------------------|------------|--------------------------------------------------|------------|--------------------------------------------------|
| `commmap`          |            | `IconButton`                                     |            |                                                  |
| `createsubstation` |            | `IconButton`                                     |            |                                                  |
| `doc`              |            | `XMLDocument`                                    |            | The document being edited as provided to editor by [[`Zeroline`]]. |
| `getAttachedIeds`  |            | `((element: Element) => Element[]) \| undefined` | "() => []" |                                                  |
| `gsecontrol`       |            | `IconButton`                                     |            |                                                  |
| `readonly`         | `readonly` | `boolean`                                        | false      |                                                  |
| `reportcontrol`    |            | `IconButton`                                     |            |                                                  |
| `showfunctions`    |            | `IconButtonToggle`                               |            |                                                  |
| `showieds`         |            | `IconButtonToggle`                               |            |                                                  |
| `smvcontrol`       |            | `IconButton`                                     |            |                                                  |

## Methods

| Method                             | Type                 | Description                                      |
|------------------------------------|----------------------|--------------------------------------------------|
| `openCommunicationMapping`         | `(): void`           |                                                  |
| `openCreateSubstationWizard`       | `(): void`           | Opens a [[`WizardDialog`]] for creating a new `Substation` element. |
| `openGseControlSelection`          | `(): void`           |                                                  |
| `openReportControlSelection`       | `(): void`           |                                                  |
| `openSampledValueControlSelection` | `(): void`           |                                                  |
| `renderIedContainer`               | `(): TemplateResult` |                                                  |
| `renderLines`                      | `(): TemplateResult` |                                                  |
| `renderSubstation`                 | `(): TemplateResult` |                                                  |
| `toggleShowFunctions`              | `(): void`           |                                                  |
| `toggleShowIEDs`                   | `(): void`           |                                                  |
