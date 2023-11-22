# oscd-filter-button

A mwc-list with mwc-textfield that filters the list items for given or separated terms

## Properties

| Property           | Attribute          | Modifiers | Type                                             | Default | Description                                      |
|--------------------|--------------------|-----------|--------------------------------------------------|---------|--------------------------------------------------|
| `activatable`      |                    |           | `boolean`                                        |         |                                                  |
| `debouncedLayout`  |                    |           | `(updateItems?: boolean \| undefined) => void \| undefined` |         |                                                  |
| `disableCheckAll`  | `disableCheckAll`  |           | `boolean`                                        | false   | Whether the check all option (checkbox next to search text field) is activated |
| `disabled`         | `disabled`         |           | `boolean`                                        | false   |                                                  |
| `emptyMessage`     |                    |           | `string \| undefined`                            |         |                                                  |
| `header`           | `header`           |           | `string \| TemplateResult`                       |         |                                                  |
| `icon`             | `icon`             |           | `string`                                         |         |                                                  |
| `index`            |                    | readonly  | `MWCListIndex`                                   |         |                                                  |
| `innerAriaLabel`   |                    |           | `string \| null`                                 |         |                                                  |
| `innerRole`        |                    |           | `string \| null`                                 |         |                                                  |
| `itemRoles`        |                    |           | `string \| null`                                 |         |                                                  |
| `items`            |                    | readonly  | `ListItemBase[]`                                 |         |                                                  |
| `itemsReady`       |                    |           | `Promise<never[]>`                               |         |                                                  |
| `layout`           |                    |           | `(updateItems?: boolean \| undefined) => void`   |         |                                                  |
| `multi`            |                    |           | `boolean`                                        |         |                                                  |
| `noninteractive`   |                    |           | `boolean`                                        |         |                                                  |
| `rootTabbable`     |                    |           | `boolean`                                        |         |                                                  |
| `searchField`      |                    |           | `TextField`                                      |         |                                                  |
| `searchFieldLabel` | `searchFieldLabel` |           | `string \| undefined`                            |         | search mwc-textfield label property              |
| `selected`         |                    | readonly  | `ListItemBase \| ListItemBase[] \| null`         |         |                                                  |
| `wrapFocus`        |                    |           | `boolean`                                        |         |                                                  |

## Methods

| Method                | Type                                             |
|-----------------------|--------------------------------------------------|
| `blur`                | `(): void`                                       |
| `click`               | `(): void`                                       |
| `focus`               | `(): void`                                       |
| `focusItemAtIndex`    | `(index: number): void`                          |
| `getFocusedItemIndex` | `(): number`                                     |
| `layout`              | `(updateItems?: boolean \| undefined): void`     |
| `onFilterInput`       | `(): void`                                       |
| `renderPlaceholder`   | `(): TemplateResult \| null`                     |
| `select`              | `(index: MWCListIndex): void`                    |
| `toggle`              | `(index: number, force?: boolean \| undefined): void` |

## Events

| Event           | Type             |
|-----------------|------------------|
| `action`        | `ActionDetail`   |
| `items-updated` |                  |
| `selected`      | `SelectedDetail` |
