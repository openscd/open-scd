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

* [Change](_foundation_.md#change)
* [ElementConstructor](_foundation_.md#elementconstructor)

### Functions

* [invert](_foundation_.md#invert)
* [isCreate](_foundation_.md#iscreate)
* [isDelete](_foundation_.md#isdelete)
* [isMove](_foundation_.md#ismove)
* [isUpdate](_foundation_.md#isupdate)

## Type aliases

###  Change

Ƭ **Change**: *[Create](../interfaces/_foundation_.create.md) | [Update](../interfaces/_foundation_.update.md) | [Delete](../interfaces/_foundation_.delete.md) | [Move](../interfaces/_foundation_.move.md)*

Defined in src/foundation.ts:2

Represents an intended change to an `Element`.

___

###  ElementConstructor

Ƭ **ElementConstructor**: *object*

Defined in src/foundation.ts:60

#### Type declaration:

## Functions

###  invert

▸ **invert**(`change`: [Change](_foundation_.md#change)): *[Change](_foundation_.md#change)*

Defined in src/foundation.ts:47

**Parameters:**

Name | Type |
------ | ------ |
`change` | [Change](_foundation_.md#change) |

**Returns:** *[Change](_foundation_.md#change)*

___

###  isCreate

▸ **isCreate**(`change`: [Change](_foundation_.md#change)): *change is Create*

Defined in src/foundation.ts:24

**Parameters:**

Name | Type |
------ | ------ |
`change` | [Change](_foundation_.md#change) |

**Returns:** *change is Create*

___

###  isDelete

▸ **isDelete**(`change`: [Change](_foundation_.md#change)): *change is Delete*

Defined in src/foundation.ts:31

**Parameters:**

Name | Type |
------ | ------ |
`change` | [Change](_foundation_.md#change) |

**Returns:** *change is Delete*

___

###  isMove

▸ **isMove**(`change`: [Change](_foundation_.md#change)): *change is Move*

Defined in src/foundation.ts:18

**Parameters:**

Name | Type |
------ | ------ |
`change` | [Change](_foundation_.md#change) |

**Returns:** *change is Move*

___

###  isUpdate

▸ **isUpdate**(`change`: [Change](_foundation_.md#change)): *change is Update*

Defined in src/foundation.ts:38

**Parameters:**

Name | Type |
------ | ------ |
`change` | [Change](_foundation_.md#change) |

**Returns:** *change is Update*
