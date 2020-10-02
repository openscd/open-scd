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
* [WizardDetail](../interfaces/_foundation_.wizarddetail.md)
* [WizardPage](../interfaces/_foundation_.wizardpage.md)

### Type aliases

* [Action](_foundation_.md#action)
* [ActionEvent](_foundation_.md#actionevent)
* [ElementConstructor](_foundation_.md#elementconstructor)
* [Mixin](_foundation_.md#mixin)
* [PendingStateEvent](_foundation_.md#pendingstateevent)
* [Wizard](_foundation_.md#wizard)
* [WizardEvent](_foundation_.md#wizardevent)
* [WizardInput](_foundation_.md#wizardinput)

### Functions

* [invert](_foundation_.md#invert)
* [isCreate](_foundation_.md#iscreate)
* [isDelete](_foundation_.md#isdelete)
* [isMove](_foundation_.md#ismove)
* [isUpdate](_foundation_.md#isupdate)
* [newActionEvent](_foundation_.md#newactionevent)
* [newPendingStateEvent](_foundation_.md#newpendingstateevent)
* [newWizardEvent](_foundation_.md#newwizardevent)
* [unreachable](_foundation_.md#unreachable)

## Type aliases

###  Action

Ƭ **Action**: *[Create](../interfaces/_foundation_.create.md) | [Update](../interfaces/_foundation_.update.md) | [Delete](../interfaces/_foundation_.delete.md) | [Move](../interfaces/_foundation_.move.md)*

*Defined in [src/foundation.ts:7](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L7)*

Represents a change to some `Element`.

___

###  ActionEvent

Ƭ **ActionEvent**: *CustomEvent‹[ActionDetail](../interfaces/_foundation_.actiondetail.md)‹T››*

*Defined in [src/foundation.ts:90](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L90)*

___

###  ElementConstructor

Ƭ **ElementConstructor**: *object*

*Defined in [src/foundation.ts:161](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L161)*

Constructor type for defining `HTMLElement` mixins.

#### Type declaration:

___

###  Mixin

Ƭ **Mixin**: *InstanceType‹ReturnType‹T››*

*Defined in [src/foundation.ts:164](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L164)*

The type returned by `MyMixin(...)` is `Mixin<typeof MyMixin>`.

___

###  PendingStateEvent

Ƭ **PendingStateEvent**: *CustomEvent‹[PendingStateDetail](../interfaces/_foundation_.pendingstatedetail.md)›*

*Defined in [src/foundation.ts:142](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L142)*

___

###  Wizard

Ƭ **Wizard**: *[WizardPage](../interfaces/_foundation_.wizardpage.md)[]*

*Defined in [src/foundation.ts:120](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L120)*

___

###  WizardEvent

Ƭ **WizardEvent**: *CustomEvent‹[WizardDetail](../interfaces/_foundation_.wizarddetail.md)›*

*Defined in [src/foundation.ts:125](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L125)*

___

###  WizardInput

Ƭ **WizardInput**: *[WizardTextField](../classes/_wizard_textfield_.wizardtextfield.md)*

*Defined in [src/foundation.ts:103](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L103)*

## Functions

###  invert

▸ **invert**(`action`: [Action](_foundation_.md#action)): *[Action](_foundation_.md#action)*

*Defined in [src/foundation.ts:68](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L68)*

Returns the inverse of `action`, i.e. an `Action` with opposite effect.

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *[Action](_foundation_.md#action)*

___

###  isCreate

▸ **isCreate**(`action`: [Action](_foundation_.md#action)): *action is Create*

*Defined in [src/foundation.ts:32](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Create*

___

###  isDelete

▸ **isDelete**(`action`: [Action](_foundation_.md#action)): *action is Delete*

*Defined in [src/foundation.ts:40](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Delete*

___

###  isMove

▸ **isMove**(`action`: [Action](_foundation_.md#action)): *action is Move*

*Defined in [src/foundation.ts:48](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Move*

___

###  isUpdate

▸ **isUpdate**(`action`: [Action](_foundation_.md#action)): *action is Update*

*Defined in [src/foundation.ts:58](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [Action](_foundation_.md#action) |

**Returns:** *action is Update*

___

###  newActionEvent

▸ **newActionEvent**‹**T**›(`action`: T, `eventInitDict?`: CustomEventInit‹[ActionDetail](../interfaces/_foundation_.actiondetail.md)‹T››): *[ActionEvent](_foundation_.md#actionevent)‹T›*

*Defined in [src/foundation.ts:91](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L91)*

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

*Defined in [src/foundation.ts:143](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L143)*

**Parameters:**

Name | Type |
------ | ------ |
`promise` | Promise‹string› |
`eventInitDict?` | CustomEventInit‹[PendingStateDetail](../interfaces/_foundation_.pendingstatedetail.md)› |

**Returns:** *[PendingStateEvent](_foundation_.md#pendingstateevent)*

___

###  newWizardEvent

▸ **newWizardEvent**(`wizard`: [Wizard](_foundation_.md#wizard) | null, `eventInitDict?`: CustomEventInit‹[WizardDetail](../interfaces/_foundation_.wizarddetail.md)›): *[WizardEvent](_foundation_.md#wizardevent)*

*Defined in [src/foundation.ts:126](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L126)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`wizard` | [Wizard](_foundation_.md#wizard) &#124; null | null |
`eventInitDict?` | CustomEventInit‹[WizardDetail](../interfaces/_foundation_.wizarddetail.md)› | - |

**Returns:** *[WizardEvent](_foundation_.md#wizardevent)*

___

###  unreachable

▸ **unreachable**(`message`: string): *never*

*Defined in [src/foundation.ts:156](https://github.com/openscd/open-scd/blob/9ac9814/src/foundation.ts#L156)*

Throws an error bearing `message`, never returning.

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *never*
