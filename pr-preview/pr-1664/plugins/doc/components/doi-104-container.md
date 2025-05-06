# doi-104-container

Container showing all the DAI Elements, related to the 104 Protocol, of the passed DOI Element in a list.
The DAI Element can be edited by pressing the Edit button at the end of the line.

## Properties

| Property       | Attribute     | Modifiers | Type                            | Default |
|----------------|---------------|-----------|---------------------------------|---------|
| `daiElements`  | `daiElements` | readonly  | `Element[]`                     |         |
| `doc`          | `doc`         |           | `XMLDocument`                   |         |
| `editCount`    | `editCount`   |           | `number`                        | -1      |
| `element`      | `element`     |           | `Element`                       |         |
| `header`       | `header`      | readonly  | `TemplateResult`                |         |
| `toggleButton` |               |           | `IconButtonToggle \| undefined` |         |
