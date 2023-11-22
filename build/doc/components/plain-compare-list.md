# plain-compare-list

## Properties

| Property            | Attribute           | Type                               | Default | Description                                      |
|---------------------|---------------------|------------------------------------|---------|--------------------------------------------------|
| `filterMutables`    |                     | `boolean`                          | true    |                                                  |
| `filterToIgnore`    | `filterToIgnore`    | `DiffFilter<Element> \| undefined` |         | Optional filter to ignore differences            |
| `leftHandObject`    | `leftHandObject`    | `Element`                          |         | The left Element that should be compared         |
| `leftHandSubtitle`  | `leftHandSubtitle`  | `string`                           | ""      | The subtitle of the left list (optional)         |
| `leftHandTitle`     | `leftHandTitle`     | `string`                           | ""      | The title of the left list                       |
| `rightHandObject`   | `rightHandObject`   | `Element`                          |         | The right element that should be compared against |
| `rightHandSubtitle` | `rightHandSubtitle` | `string`                           | ""      | The subtitle of the right list (optional)        |
| `rightHandTitle`    | `rightHandTitle`    | `string`                           | ""      | The title of the right list                      |
