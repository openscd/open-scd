# extref-later-binding-list

A sub element for showing all Ext Refs from a FCDA Element.
The List reacts on a custom event to know which FCDA Element was selected and updated the view.

## Properties

| Property                        | Attribute    | Type                                             | Default                                          |
|---------------------------------|--------------|--------------------------------------------------|--------------------------------------------------|
| `controlTag`                    | `controlTag` | `controlTag`                                     |                                                  |
| `currentIedElement`             |              | `Element \| undefined`                           |                                                  |
| `currentSelectedControlElement` |              | `Element \| undefined`                           |                                                  |
| `currentSelectedFcdaElement`    |              | `Element \| undefined`                           |                                                  |
| `doc`                           |              | `XMLDocument`                                    |                                                  |
| `editCount`                     | `editCount`  | `number`                                         | -1                                               |
| `serviceTypeLookup`             |              | `{ GSEControl: string; SampledValueControl: string; }` | {"GSEControl":"GOOSE","SampledValueControl":"SMV"} |
