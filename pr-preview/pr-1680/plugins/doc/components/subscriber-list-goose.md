# subscriber-list-goose

An sub element for subscribing and unsubscribing IEDs to GOOSE messages.

## Properties

| Property                    | Attribute   | Type                           | Default | Description                                      |
|-----------------------------|-------------|--------------------------------|---------|--------------------------------------------------|
| `availableElements`         |             | `ListElement[]`                | []      | List holding all current available Elements which are not subscribed. |
| `currentGooseIedName`       |             | `string \| null \| undefined`  |         | The name of the IED belonging to the current selected GOOSE |
| `currentSelectedGseControl` |             | `Element \| undefined`         |         | Current selected GOOSE message (when in GOOSE Publisher view) |
| `currentSelectedIed`        |             | `Element \| undefined`         |         | Current selected IED (when in Subscriber view)   |
| `currentUsedDataset`        |             | `Element \| null \| undefined` |         | The current used dataset for subscribing / unsubscribing |
| `doc`                       |             | `XMLDocument`                  |         |                                                  |
| `editCount`                 | `editCount` | `number`                       | -1      |                                                  |
| `onGOOSESelectEvent`        |             |                                |         |                                                  |
| `onGooseSubscriptionEvent`  |             |                                |         |                                                  |
| `onIEDSelectEvent`          |             |                                |         |                                                  |
| `onViewChange`              |             |                                |         |                                                  |
| `subscribedElements`        |             | `ListElement[]`                | []      | List holding all current subscribed Elements.    |
| `subscriberWrapper`         |             | `Element`                      |         |                                                  |

## Methods

| Method                       | Type                                             |
|------------------------------|--------------------------------------------------|
| `renderFullSubscribers`      | `(): TemplateResult`                             |
| `renderPartiallySubscribers` | `(elements: ListElement[]): TemplateResult`      |
| `renderSubscriber`           | `(status: SubscribeStatus, element: Element): TemplateResult` |
| `renderTitle`                | `(): TemplateResult`                             |
| `renderUnSubscribers`        | `(elements: ListElement[]): TemplateResult`      |
