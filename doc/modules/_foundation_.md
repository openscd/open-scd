[open-scd](../README.md) › [Globals](../globals.md) › ["foundation"](_foundation_.md)

# Module: "foundation"

## Index

### Namespaces

* [__global](_foundation_.__global.md)

### Interfaces

* [ActionDetail](../interfaces/_foundation_.actiondetail.md)
* [Create](../interfaces/_foundation_.create.md)
* [Delete](../interfaces/_foundation_.delete.md)
* [Move](../interfaces/_foundation_.move.md)
* [PendingStateDetail](../interfaces/_foundation_.pendingstatedetail.md)
* [Update](../interfaces/_foundation_.update.md)
* [Wizard](../interfaces/_foundation_.wizard.md)
* [WizardPage](../interfaces/_foundation_.wizardpage.md)

### Type aliases

* [Action](_foundation_.md#action)
* [ActionEvent](_foundation_.md#actionevent)
* [ElementConstructor](_foundation_.md#elementconstructor)
* [Mixin](_foundation_.md#mixin)
* [PendingStateEvent](_foundation_.md#pendingstateevent)
* [WizardInput](_foundation_.md#wizardinput)

### Functions

* [invert](_foundation_.md#invert)
* [isCreate](_foundation_.md#iscreate)
* [isDelete](_foundation_.md#isdelete)
* [isMove](_foundation_.md#ismove)
* [isUpdate](_foundation_.md#isupdate)
* [newActionEvent](_foundation_.md#newactionevent)
* [newPendingStateEvent](_foundation_.md#newpendingstateevent)
* [unreachable](_foundation_.md#unreachable)

## Type aliases

###  Action

Ƭ **Action**: *[Create](../interfaces/_foundation_.create.md) | [Update](../interfaces/_foundation_.update.md) | [Delete](../interfaces/_foundation_.delete.md) | [Move](../interfaces/_foundation_.move.md)*

*Defined in [src/foundation.ts:8](https://github.com/openscd/open-scd/blob/bbf7701/src/foundation.ts#L8)*

Represents a change to some `Element`.

___

###  ActionEvent

Ƭ **ActionEvent**: *CustomEvent‹[ActionDetail](../interfaces/_foundation_.actiondetail.md)‹T››*

*Defined in [src/foundation.ts:91](https://github.com/openscd/open-scd/blob/bbf7701/src/foundation.ts#L91)*

___

###  ElementConstructor

Ƭ **ElementConstructor**: *object*

*Defined in [src/foundation.ts:142](https://github.com/openscd/open-scd/blob/bbf7701/src/foundation.ts#L142)*

Constructor type for defining `HTMLElement` mixins.

#### Type declaration:

___

###  Mixin

Ƭ **Mixin**: *InstanceType‹ReturnType‹T››*

*Defined in [src/foundation.ts:145](https://github.com/openscd/open-scd/blob/bbf7701/src/foundation.ts#L145)*

The type returned by `MyMixin(...)` is `Mixin<typeof MyMixin>`.

___

###  PendingStateEvent

Ƭ **PendingStateEvent**: *CustomEvent‹[PendingStateDetail](../interfaces/_foundation_.pendingstatedetail.md)›*

*Defined in [src/foundation.ts:123](https://github.com/openscd/open-scd/blob/bbf7701/src/foundation.ts#L123)*

___

###  WizardInput

Ƭ **WizardInput**: *TextField | [TextFieldNullable](../classes/_mwc_textfield_nullable_.textfieldnullable.md) | Select*

*Defined in [src/foundation.ts:104](https://github.com/openscd/open-scd/blob/bbf7701/src/foundation.ts#L104)*

## Functions

###  invert

▸ **invert**(`action`: [Action](_foundation_.md#action)): *[Action](_foundation_.md#action)*

*Defined in [src/foundation.ts:69](https://github.com/openscd/open-scd/blob/bbf7701/src/foundation.ts#L69)*

Returns the inverse of `action`, i.e. an `Action` with opposite effect.

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *[Action](_foundation_.md#action)*

___

###  isCreate

▸ **isCreate**(`action`: [Action](_foundation_.md#action)): *action is Create*

*Defined in [src/foundation.ts:33](https://github.com/openscd/open-scd/blob/bbf7701/src/foundation.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Create*

___

###  isDelete

▸ **isDelete**(`action`: [Action](_foundation_.md#action)): *action is Delete*

*Defined in [src/foundation.ts:41](https://github.com/openscd/open-scd/blob/bbf7701/src/foundation.ts#L41)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Delete*

___

###  isMove

▸ **isMove**(`action`: [Action](_foundation_.md#action)): *action is Move*

*Defined in [src/foundation.ts:49](https://github.com/openscd/open-scd/blob/bbf7701/src/foundation.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Move*

___

###  isUpdate

▸ **isUpdate**(`action`: [Action](_foundation_.md#action)): *action is Update*

*Defined in [src/foundation.ts:59](https://github.com/openscd/open-scd/blob/bbf7701/src/foundation.ts#L59)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Update*

___

###  newActionEvent

▸ **newActionEvent**‹**T**›(`action`: T, `eventInitDict?`: CustomEventInit‹[ActionDetail](../interfaces/_foundation_.actiondetail.md)‹T››): *[ActionEvent](_foundation_.md#actionevent)‹T›*

*Defined in [src/foundation.ts:92](https://github.com/openscd/open-scd/blob/bbf7701/src/foundation.ts#L92)*

**Type parameters:**

▪ **T**: *[Action](_foundation_.md#action)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | T |
`eventInitDict?` | CustomEventInit‹[ActionDetail](../interfaces/_foundation_.actiondetail.md)‹T›› |

**Returns:** *[ActionEvent](_foundation_.md#actionevent)‹T›*

___

###  newPendingStateEvent

▸ **newPendingStateEvent**(`promise`: Promise‹string›, `eventInitDict?`: CustomEventInit‹[PendingStateDetail](../interfaces/_foundation_.pendingstatedetail.md)›): *[PendingStateEvent](_foundation_.md#pendingstateevent)*

*Defined in [src/foundation.ts:124](https://github.com/openscd/open-scd/blob/bbf7701/src/foundation.ts#L124)*

**Parameters:**

Name | Type |
------ | ------ |
`promise` | Promise‹string› |
`eventInitDict?` | CustomEventInit‹[PendingStateDetail](../interfaces/_foundation_.pendingstatedetail.md)› |

**Returns:** *[PendingStateEvent](_foundation_.md#pendingstateevent)*

___

###  unreachable

▸ **unreachable**(`message`: string): *never*

*Defined in [src/foundation.ts:137](https://github.com/openscd/open-scd/blob/bbf7701/src/foundation.ts#L137)*

Throws an error bearing `message`, never returning.

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *never*
