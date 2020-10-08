[open-scd](../README.md) › [Globals](../globals.md) › ["foundation"](_foundation_.md)

# Module: "foundation"

## Index

### Namespaces

* [__global](_foundation_.__global.md)

### Interfaces

* [CommitDetail](../interfaces/_foundation_.commitdetail.md)
* [Create](../interfaces/_foundation_.create.md)
* [Delete](../interfaces/_foundation_.delete.md)
* [EditorActionDetail](../interfaces/_foundation_.editoractiondetail.md)
* [InfoDetail](../interfaces/_foundation_.infodetail.md)
* [LogDetailBase](../interfaces/_foundation_.logdetailbase.md)
* [Move](../interfaces/_foundation_.move.md)
* [PendingStateDetail](../interfaces/_foundation_.pendingstatedetail.md)
* [Timestamped](../interfaces/_foundation_.timestamped.md)
* [Update](../interfaces/_foundation_.update.md)
* [WizardDetail](../interfaces/_foundation_.wizarddetail.md)
* [WizardPage](../interfaces/_foundation_.wizardpage.md)

### Type aliases

* [CloseableElement](_foundation_.md#closeableelement)
* [CommitEntry](_foundation_.md#commitentry)
* [EditorAction](_foundation_.md#editoraction)
* [EditorActionEvent](_foundation_.md#editoractionevent)
* [InfoEntry](_foundation_.md#infoentry)
* [InfoEntryKind](_foundation_.md#infoentrykind)
* [LitElementConstructor](_foundation_.md#litelementconstructor)
* [LogDetail](_foundation_.md#logdetail)
* [LogEntry](_foundation_.md#logentry)
* [LogEvent](_foundation_.md#logevent)
* [Mixin](_foundation_.md#mixin)
* [PendingStateEvent](_foundation_.md#pendingstateevent)
* [Wizard](_foundation_.md#wizard)
* [WizardAction](_foundation_.md#wizardaction)
* [WizardEvent](_foundation_.md#wizardevent)
* [WizardInput](_foundation_.md#wizardinput)

### Variables

* [ifImplemented](_foundation_.md#const-ifimplemented)

### Functions

* [invert](_foundation_.md#invert)
* [isCreate](_foundation_.md#iscreate)
* [isDelete](_foundation_.md#isdelete)
* [isMove](_foundation_.md#ismove)
* [isUpdate](_foundation_.md#isupdate)
* [newActionEvent](_foundation_.md#newactionevent)
* [newLogEvent](_foundation_.md#newlogevent)
* [newPendingStateEvent](_foundation_.md#newpendingstateevent)
* [newWizardEvent](_foundation_.md#newwizardevent)
* [unreachable](_foundation_.md#unreachable)

## Type aliases

###  CloseableElement

Ƭ **CloseableElement**: *[HTMLElement](../interfaces/_foundation_.__global.htmlelement.md) & object*

*Defined in [src/foundation.ts:105](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L105)*

___

###  CommitEntry

Ƭ **CommitEntry**: *[Timestamped](../interfaces/_foundation_.timestamped.md) & [CommitDetail](../interfaces/_foundation_.commitdetail.md)*

*Defined in [src/foundation.ts:178](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L178)*

___

###  EditorAction

Ƭ **EditorAction**: *[Create](../interfaces/_foundation_.create.md) | [Update](../interfaces/_foundation_.update.md) | [Delete](../interfaces/_foundation_.delete.md) | [Move](../interfaces/_foundation_.move.md)*

*Defined in [src/foundation.ts:7](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L7)*

Represents a change to some `Element`.

___

###  EditorActionEvent

Ƭ **EditorActionEvent**: *CustomEvent‹[EditorActionDetail](../interfaces/_foundation_.editoractiondetail.md)‹T››*

*Defined in [src/foundation.ts:90](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L90)*

___

###  InfoEntry

Ƭ **InfoEntry**: *[Timestamped](../interfaces/_foundation_.timestamped.md) & [InfoDetail](../interfaces/_foundation_.infodetail.md)*

*Defined in [src/foundation.ts:179](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L179)*

___

###  InfoEntryKind

Ƭ **InfoEntryKind**: *"info" | "warning" | "error"*

*Defined in [src/foundation.ts:146](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L146)*

___

###  LitElementConstructor

Ƭ **LitElementConstructor**: *object*

*Defined in [src/foundation.ts:212](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L212)*

Constructor type for defining `HTMLElement` mixins.

#### Type declaration:

___

###  LogDetail

Ƭ **LogDetail**: *[InfoDetail](../interfaces/_foundation_.infodetail.md) | [CommitDetail](../interfaces/_foundation_.commitdetail.md)*

*Defined in [src/foundation.ts:160](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L160)*

___

###  LogEntry

Ƭ **LogEntry**: *[InfoEntry](_foundation_.md#infoentry) | [CommitEntry](_foundation_.md#commitentry)*

*Defined in [src/foundation.ts:181](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L181)*

___

###  LogEvent

Ƭ **LogEvent**: *CustomEvent‹[LogDetail](_foundation_.md#logdetail)›*

*Defined in [src/foundation.ts:161](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L161)*

___

###  Mixin

Ƭ **Mixin**: *InstanceType‹ReturnType‹T››*

*Defined in [src/foundation.ts:215](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L215)*

The type returned by `MyMixin(...)` is `Mixin<typeof MyMixin>`.

___

###  PendingStateEvent

Ƭ **PendingStateEvent**: *CustomEvent‹[PendingStateDetail](../interfaces/_foundation_.pendingstatedetail.md)›*

*Defined in [src/foundation.ts:187](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L187)*

___

###  Wizard

Ƭ **Wizard**: *[WizardPage](../interfaces/_foundation_.wizardpage.md)[]*

*Defined in [src/foundation.ts:128](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L128)*

___

###  WizardAction

Ƭ **WizardAction**: *function*

*Defined in [src/foundation.ts:108](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L108)*

#### Type declaration:

▸ (`inputs`: [WizardInput](_foundation_.md#wizardinput)[], `dialog`: [CloseableElement](_foundation_.md#closeableelement)): *[EditorAction](_foundation_.md#editoraction)[]*

**Parameters:**

Name | Type |
------ | ------ |
`inputs` | [WizardInput](_foundation_.md#wizardinput)[] |
`dialog` | [CloseableElement](_foundation_.md#closeableelement) |

___

###  WizardEvent

Ƭ **WizardEvent**: *CustomEvent‹[WizardDetail](../interfaces/_foundation_.wizarddetail.md)›*

*Defined in [src/foundation.ts:133](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L133)*

___

###  WizardInput

Ƭ **WizardInput**: *[WizardTextField](../classes/_wizard_textfield_.wizardtextfield.md)*

*Defined in [src/foundation.ts:107](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L107)*

## Variables

### `Const` ifImplemented

• **ifImplemented**: *(Anonymous function)* = directive(rendered => (part: Part) => {
  if (Object.keys(rendered).length) part.setValue(rendered);
  else part.setValue('');
})

*Defined in [src/foundation.ts:201](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L201)*

Useful `lit-html` directives

## Functions

###  invert

▸ **invert**(`action`: [EditorAction](_foundation_.md#editoraction)): *[EditorAction](_foundation_.md#editoraction)*

*Defined in [src/foundation.ts:68](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L68)*

Returns the inverse of `action`, i.e. an `EditorAction` with opposite effect.

**Parameters:**

Name | Type |
------ | ------ |
`action` | [EditorAction](_foundation_.md#editoraction) |

**Returns:** *[EditorAction](_foundation_.md#editoraction)*

___

###  isCreate

▸ **isCreate**(`action`: [EditorAction](_foundation_.md#editoraction)): *action is Create*

*Defined in [src/foundation.ts:32](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [EditorAction](_foundation_.md#editoraction) |

**Returns:** *action is Create*

___

###  isDelete

▸ **isDelete**(`action`: [EditorAction](_foundation_.md#editoraction)): *action is Delete*

*Defined in [src/foundation.ts:40](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [EditorAction](_foundation_.md#editoraction) |

**Returns:** *action is Delete*

___

###  isMove

▸ **isMove**(`action`: [EditorAction](_foundation_.md#editoraction)): *action is Move*

*Defined in [src/foundation.ts:48](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [EditorAction](_foundation_.md#editoraction) |

**Returns:** *action is Move*

___

###  isUpdate

▸ **isUpdate**(`action`: [EditorAction](_foundation_.md#editoraction)): *action is Update*

*Defined in [src/foundation.ts:58](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L58)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | [EditorAction](_foundation_.md#editoraction) |

**Returns:** *action is Update*

___

###  newActionEvent

▸ **newActionEvent**‹**T**›(`action`: T, `eventInitDict?`: CustomEventInit‹[EditorActionDetail](../interfaces/_foundation_.editoractiondetail.md)‹T››): *[EditorActionEvent](_foundation_.md#editoractionevent)‹T›*

*Defined in [src/foundation.ts:93](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L93)*

**Type parameters:**

▪ **T**: *[EditorAction](_foundation_.md#editoraction)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | T |
`eventInitDict?` | CustomEventInit‹[EditorActionDetail](../interfaces/_foundation_.editoractiondetail.md)‹T›› |

**Returns:** *[EditorActionEvent](_foundation_.md#editoractionevent)‹T›*

___

###  newLogEvent

▸ **newLogEvent**(`detail`: [LogDetail](_foundation_.md#logdetail), `eventInitDict?`: CustomEventInit‹[LogDetail](_foundation_.md#logdetail)›): *[LogEvent](_foundation_.md#logevent)*

*Defined in [src/foundation.ts:162](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`detail` | [LogDetail](_foundation_.md#logdetail) |
`eventInitDict?` | CustomEventInit‹[LogDetail](_foundation_.md#logdetail)› |

**Returns:** *[LogEvent](_foundation_.md#logevent)*

___

###  newPendingStateEvent

▸ **newPendingStateEvent**(`promise`: Promise‹string›, `eventInitDict?`: CustomEventInit‹[PendingStateDetail](../interfaces/_foundation_.pendingstatedetail.md)›): *[PendingStateEvent](_foundation_.md#pendingstateevent)*

*Defined in [src/foundation.ts:188](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L188)*

**Parameters:**

Name | Type |
------ | ------ |
`promise` | Promise‹string› |
`eventInitDict?` | CustomEventInit‹[PendingStateDetail](../interfaces/_foundation_.pendingstatedetail.md)› |

**Returns:** *[PendingStateEvent](_foundation_.md#pendingstateevent)*

___

###  newWizardEvent

▸ **newWizardEvent**(`wizard`: [Wizard](_foundation_.md#wizard) | null, `eventInitDict?`: CustomEventInit‹[WizardDetail](../interfaces/_foundation_.wizarddetail.md)›): *[WizardEvent](_foundation_.md#wizardevent)*

*Defined in [src/foundation.ts:134](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L134)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`wizard` | [Wizard](_foundation_.md#wizard) &#124; null | null |
`eventInitDict?` | CustomEventInit‹[WizardDetail](../interfaces/_foundation_.wizarddetail.md)› | - |

**Returns:** *[WizardEvent](_foundation_.md#wizardevent)*

___

###  unreachable

▸ **unreachable**(`message`: string): *never*

*Defined in [src/foundation.ts:207](https://github.com/openscd/open-scd/blob/56480b8/src/foundation.ts#L207)*

Throws an error bearing `message`, never returning.

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *never*
