# Edit Event API

Open SCD offers an API for editing the scd document which can be used with [Html Custom Events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent). The main Open SCD components listens to events of the type `oscd-edit`, applies the changes to the `doc` and updates the `editCount` property.

The edits to the `doc` will be done in place, e.g. the `doc` changes but will keep the same reference. If your plugin needs to react to changes in the doc, you should listen to changes in the `editCount` property.

### Event constructor

Open SCD core exports a factory function for edit events, so you do not have to build them manually.

```ts
function newEditEvent<E extends Edit>(
  edit: E,
  initiator: Initiator = 'user'
): EditEvent

type Edit = Insert | Update | Remove | Edit[];

type Initiator = 'user' | 'system' | 'undo' | 'redo' | string;

```

Example for remove.

```ts
import { newEditEvent, Remove } from '@openscd/core';

const remove: Remove = { node: someNode };
const removeEvent = newEditEvent(remove);

someComponent.dispatchEvent(removeEvent);

```


### Insert

Insert events can be used to add new nodes or move existing nodes in the document. Since a node can only have one parent, using an insert on an existing node will replace it's previous parent with the new parent, essentially moving the node to a different position in the xml tree.

If the reference is not `null`, the node will be inserted before the reference node. The reference has to be a child node of the parent. And if the reference is `null` the node will be added as the list child of the parent.

```ts
interface Insert {
  parent: Node;
  node: Node;
  reference: Node | null;
}
```


### Remove

This event will remove the node from the document.

```ts
interface Remove {
  node: Node;
}
```


### Update

Update can add, remove or change attributes on an existing node. Existing attributes will only be removed, if `null` is passed as value in the event's `attributes` property.


```ts
interface Update {
  element: Element;
  attributes: Partial<Record<string, AttributeValue>>;
}

// Attirubte value

type AttributeValue = string | null | NamespacedAttributeValue;

type NamespacedAttributeValue = {
  value: string | null;
  namespaceURI: string | null;
};
```

Example for adding and changing values.

```ts

const update: Update = {
  element: elementToUpdate,
  attributes: {
    name: 'new name',
    value: 'new value'
  }
};

```

To remove an existing value pass `null` as value.

```ts

const update: Update = {
  element: elementToUpdate,
  attributes: {
    attributeToRemove: null
  }
};

```

Update also supports [Xml namespaces](https://developer.mozilla.org/en-US/docs/Related/IMSC/Namespaces#namespaced_attributes) for attributes. To change namespaced attributes you need to pass an `NamespacedAttributeValue` instead of a plain `string`.

```ts

const update: Update = {
  element: elementToUpdate,
  attributes: {
    name: {
      value: 'namespaced name',
      namespaceURI: 'http://www.iec.ch/61850/2003/SCLcoordinates'
    },
    type: {
      value: 'namespaced type',
      namespaceURI: 'http://www.iec.ch/61850/2003/SCLcoordinates'
    },
  }
};

```

Adding, updating and removing attributes with and without namespaces can be combined in a single `Update`.

### Complex edits

Complex edits can be used to apply multiple edits as a single event. This will create a single entry in the history. You can create complex edit events by passing an array of edit events to the `newEditEvent` factory function.

```ts
import { newEditEvent } from '@openscd/core';

const complexEditEvent = newEditEvent([ insert, update, remove ]);

someComponent.dispatchEvent(complexEditEvent);

```



## History

All edit events with initiator `user` will create a history log entry and can be undone and redone through the history addon.


## Editor Action API (deprecated)