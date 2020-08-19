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
* [ElementConstructor](_foundation_.md#elementconstructor)

### Functions

* [invert](_foundation_.md#invert)
* [isCreate](_foundation_.md#iscreate)
* [isDelete](_foundation_.md#isdelete)
* [isMove](_foundation_.md#ismove)
* [isUpdate](_foundation_.md#isupdate)

## Type aliases

###  Action

Ƭ **Action**: *[Create](../interfaces/_foundation_.create.md) | [Update](../interfaces/_foundation_.update.md) | [Delete](../interfaces/_foundation_.delete.md) | [Move](../interfaces/_foundation_.move.md)*

Defined in src/foundation.ts:2

Represents an intended change to some `Element`.

___

###  ElementConstructor

Ƭ **ElementConstructor**: *object*

Defined in src/foundation.ts:66

#### Type declaration:

## Functions

###  invert

▸ **invert**(`action`: [Action](_foundation_.md#action)): *[Action](_foundation_.md#action)*

Defined in src/foundation.ts:51

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *[Action](_foundation_.md#action)*

___

###  isCreate

▸ **isCreate**(`action`: [Action](_foundation_.md#action)): *action is Create*

Defined in src/foundation.ts:28

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Create*

___

###  isDelete

▸ **isDelete**(`action`: [Action](_foundation_.md#action)): *action is Delete*

Defined in src/foundation.ts:35

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Delete*

___

###  isMove

▸ **isMove**(`action`: [Action](_foundation_.md#action)): *action is Move*

Defined in src/foundation.ts:22

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Move*

___

###  isUpdate

▸ **isUpdate**(`action`: [Action](_foundation_.md#action)): *action is Update*

Defined in src/foundation.ts:42

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Update*
