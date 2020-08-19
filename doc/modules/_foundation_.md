[open-scd](../README.md) › [Globals](../globals.md) › ["foundation"](_foundation_.md)

# Module: "foundation"

## Index

### Namespaces

* [__global](_foundation_.__global.md)

### Interfaces

* [Create](../interfaces/_foundation_.create.md)
* [Delete](../interfaces/_foundation_.delete.md)
* [Move](../interfaces/_foundation_.move.md)
* [PendingState](../interfaces/_foundation_.pendingstate.md)
* [Update](../interfaces/_foundation_.update.md)

### Type aliases

* [Action](_foundation_.md#action)
* [ActionEvent](_foundation_.md#actionevent)
* [ElementConstructor](_foundation_.md#elementconstructor)
* [PendingStateEvent](_foundation_.md#pendingstateevent)

### Functions

* [invert](_foundation_.md#invert)
* [isCreate](_foundation_.md#iscreate)
* [isDelete](_foundation_.md#isdelete)
* [isMove](_foundation_.md#ismove)
* [isUpdate](_foundation_.md#isupdate)
* [newActionEvent](_foundation_.md#newactionevent)
* [newPendingStateEvent](_foundation_.md#newpendingstateevent)

## Type aliases

###  Action

Ƭ **Action**: *[Create](../interfaces/_foundation_.create.md) | [Update](../interfaces/_foundation_.update.md) | [Delete](../interfaces/_foundation_.delete.md) | [Move](../interfaces/_foundation_.move.md)*

Defined in src/foundation.ts:2

Represents a change to some `Element`.

___

###  ActionEvent

Ƭ **ActionEvent**: *CustomEvent‹[Action](_foundation_.md#action)›*

Defined in src/foundation.ts:72

___

###  ElementConstructor

Ƭ **ElementConstructor**: *object*

Defined in src/foundation.ts:106

Constructor type for defining `HTMLElement` mixins

#### Type declaration:

___

###  PendingStateEvent

Ƭ **PendingStateEvent**: *CustomEvent‹[PendingState](../interfaces/_foundation_.pendingstate.md)›*

Defined in src/foundation.ts:91

## Functions

###  invert

▸ **invert**(`action`: [Action](_foundation_.md#action)): *[Action](_foundation_.md#action)*

Defined in src/foundation.ts:57

Returns the inverse of `action`, i.e. an `Action` with opposite effect.

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *[Action](_foundation_.md#action)*

___

###  isCreate

▸ **isCreate**(`action`: [Action](_foundation_.md#action)): *action is Create*

Defined in src/foundation.ts:33

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Create*

___

###  isDelete

▸ **isDelete**(`action`: [Action](_foundation_.md#action)): *action is Delete*

Defined in src/foundation.ts:40

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Delete*

___

###  isMove

▸ **isMove**(`action`: [Action](_foundation_.md#action)): *action is Move*

Defined in src/foundation.ts:26

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Move*

___

###  isUpdate

▸ **isUpdate**(`action`: [Action](_foundation_.md#action)): *action is Update*

Defined in src/foundation.ts:47

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Update*

___

###  newActionEvent

▸ **newActionEvent**(`action`: [Action](_foundation_.md#action), `eventInitDict?`: CustomEventInit‹[Action](_foundation_.md#action)›): *[ActionEvent](_foundation_.md#actionevent)*

Defined in src/foundation.ts:74

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |
`eventInitDict?` | CustomEventInit‹[Action](_foundation_.md#action)› |

**Returns:** *[ActionEvent](_foundation_.md#actionevent)*

___

###  newPendingStateEvent

▸ **newPendingStateEvent**(`promise`: Promise‹string›, `eventInitDict?`: CustomEventInit‹[PendingState](../interfaces/_foundation_.pendingstate.md)›): *[PendingStateEvent](_foundation_.md#pendingstateevent)*

Defined in src/foundation.ts:93

**Parameters:**

Name | Type |
------ | ------ |
`promise` | Promise‹string› |
`eventInitDict?` | CustomEventInit‹[PendingState](../interfaces/_foundation_.pendingstate.md)› |

**Returns:** *[PendingStateEvent](_foundation_.md#pendingstateevent)*
