# subscriber-list-smv

An sub element for subscribing and unsubscribing IEDs to Sampled Values messages.

## Properties

| Property                    | Attribute   | Type                           | Default | Description                                      |
|-----------------------------|-------------|--------------------------------|---------|--------------------------------------------------|
| `availableElements`         |             | `ListElement[]`                | []      | List holding all current available Elements which are not subscribed. |
| `currentSelectedIed`        |             | `Element \| undefined`         |         | Current selected IED (when in Subscriber view)   |
| `currentSelectedSmvControl` |             | `Element \| undefined`         |         | Current selected Sampled Values element (when in GOOSE Publisher view) |
| `currentSmvIedName`         |             | `string \| null \| undefined`  |         | The name of the IED belonging to the current selected Sampled Values |
| `currentUsedDataset`        |             | `Element \| null \| undefined` |         | The current used dataset for subscribing / unsubscribing |
| `doc`                       |             | `XMLDocument`                  |         |                                                  |
| `editCount`                 | `editCount` | `number`                       | -1      |                                                  |
| `onIEDSelectEvent`          |             |                                |         |                                                  |
| `onIEDSubscriptionEvent`    |             |                                |         |                                                  |
| `onSmvSelectEvent`          |             |                                |         |                                                  |
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
