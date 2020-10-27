**[open-scd](../README.md)**

> [Globals](../globals.md) / "foundation"

# Module: "foundation"

## Index

### Namespaces

* [\_\_global](_foundation_.__global.md)

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

* [ifImplemented](_foundation_.md#ifimplemented)
* [wizardInputSelector](_foundation_.md#wizardinputselector)

### Functions

* [getMultiplier](_foundation_.md#getmultiplier)
* [getValue](_foundation_.md#getvalue)
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

### CloseableElement

Ƭ  **CloseableElement**: [HTMLElement](../interfaces/_foundation_.__global.htmlelement.md) & { close: () => void  }

*Defined in [src/foundation.ts:106](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L106)*

___

### CommitEntry

Ƭ  **CommitEntry**: [Timestamped](../interfaces/_foundation_.timestamped.md) & [CommitDetail](../interfaces/_foundation_.commitdetail.md)

*Defined in [src/foundation.ts:191](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L191)*

___

### EditorAction

Ƭ  **EditorAction**: [Create](../interfaces/_foundation_.create.md) \| [Update](../interfaces/_foundation_.update.md) \| [Delete](../interfaces/_foundation_.delete.md) \| [Move](../interfaces/_foundation_.move.md)

*Defined in [src/foundation.ts:8](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L8)*

Represents a change to some `Element`.

___

### EditorActionEvent

Ƭ  **EditorActionEvent**\<T>: CustomEvent\<[EditorActionDetail](../interfaces/_foundation_.editoractiondetail.md)\<T>>

*Defined in [src/foundation.ts:91](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L91)*

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [EditorAction](_foundation_.md#editoraction) |

___

### InfoEntry

Ƭ  **InfoEntry**: [Timestamped](../interfaces/_foundation_.timestamped.md) & [InfoDetail](../interfaces/_foundation_.infodetail.md)

*Defined in [src/foundation.ts:192](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L192)*

___

### InfoEntryKind

Ƭ  **InfoEntryKind**: \"info\" \| \"warning\" \| \"error\"

*Defined in [src/foundation.ts:159](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L159)*

___

### LitElementConstructor

Ƭ  **LitElementConstructor**: {}

*Defined in [src/foundation.ts:225](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L225)*

Constructor type for defining `HTMLElement` mixins.

___

### LogDetail

Ƭ  **LogDetail**: [InfoDetail](../interfaces/_foundation_.infodetail.md) \| [CommitDetail](../interfaces/_foundation_.commitdetail.md)

*Defined in [src/foundation.ts:173](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L173)*

___

### LogEntry

Ƭ  **LogEntry**: [InfoEntry](_foundation_.md#infoentry) \| [CommitEntry](_foundation_.md#commitentry)

*Defined in [src/foundation.ts:194](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L194)*

___

### LogEvent

Ƭ  **LogEvent**: CustomEvent\<[LogDetail](_foundation_.md#logdetail)>

*Defined in [src/foundation.ts:174](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L174)*

___

### Mixin

Ƭ  **Mixin**\<T>: InstanceType\<ReturnType\<T>>

*Defined in [src/foundation.ts:228](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L228)*

The type returned by `MyMixin(...)` is `Mixin<typeof MyMixin>`.

#### Type parameters:

Name | Type |
------ | ------ |
`T` | (...args: any[]) => any |

___

### PendingStateEvent

Ƭ  **PendingStateEvent**: CustomEvent\<[PendingStateDetail](../interfaces/_foundation_.pendingstatedetail.md)>

*Defined in [src/foundation.ts:200](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L200)*

___

### Wizard

Ƭ  **Wizard**: [WizardPage](../interfaces/_foundation_.wizardpage.md)[]

*Defined in [src/foundation.ts:141](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L141)*

___

### WizardAction

Ƭ  **WizardAction**: (inputs: [WizardInput](_foundation_.md#wizardinput)[], wizard: [CloseableElement](_foundation_.md#closeableelement)) => [EditorAction](_foundation_.md#editoraction)[]

*Defined in [src/foundation.ts:111](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L111)*

___

### WizardEvent

Ƭ  **WizardEvent**: CustomEvent\<[WizardDetail](../interfaces/_foundation_.wizarddetail.md)>

*Defined in [src/foundation.ts:146](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L146)*

___

### WizardInput

Ƭ  **WizardInput**: [WizardTextField](../classes/_wizard_textfield_.wizardtextfield.md) \| Select

*Defined in [src/foundation.ts:110](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L110)*

## Variables

### ifImplemented

• `Const` **ifImplemented**: (Anonymous function) = directive(rendered => (part: Part) => { if (Object.keys(rendered).length) part.setValue(rendered); else part.setValue('');})

*Defined in [src/foundation.ts:214](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L214)*

Useful `lit-html` directives

___

### wizardInputSelector

• `Const` **wizardInputSelector**: \"wizard-textfield, mwc-select\" = "wizard-textfield, mwc-select"

*Defined in [src/foundation.ts:108](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L108)*

## Functions

### getMultiplier

▸ **getMultiplier**(`input`: [WizardInput](_foundation_.md#wizardinput)): string \| null

*Defined in [src/foundation.ts:121](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L121)*

#### Parameters:

Name | Type |
------ | ------ |
`input` | [WizardInput](_foundation_.md#wizardinput) |

**Returns:** string \| null

___

### getValue

▸ **getValue**(`input`: [WizardInput](_foundation_.md#wizardinput)): string \| null

*Defined in [src/foundation.ts:116](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L116)*

#### Parameters:

Name | Type |
------ | ------ |
`input` | [WizardInput](_foundation_.md#wizardinput) |

**Returns:** string \| null

___

### invert

▸ **invert**(`action`: [EditorAction](_foundation_.md#editoraction)): [EditorAction](_foundation_.md#editoraction)

*Defined in [src/foundation.ts:69](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L69)*

Returns the inverse of `action`, i.e. an `EditorAction` with opposite effect.

#### Parameters:

Name | Type |
------ | ------ |
`action` | [EditorAction](_foundation_.md#editoraction) |

**Returns:** [EditorAction](_foundation_.md#editoraction)

___

### isCreate

▸ **isCreate**(`action`: [EditorAction](_foundation_.md#editoraction)): action is Create

*Defined in [src/foundation.ts:33](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L33)*

#### Parameters:

Name | Type |
------ | ------ |
`action` | [EditorAction](_foundation_.md#editoraction) |

**Returns:** action is Create

___

### isDelete

▸ **isDelete**(`action`: [EditorAction](_foundation_.md#editoraction)): action is Delete

*Defined in [src/foundation.ts:41](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L41)*

#### Parameters:

Name | Type |
------ | ------ |
`action` | [EditorAction](_foundation_.md#editoraction) |

**Returns:** action is Delete

___

### isMove

▸ **isMove**(`action`: [EditorAction](_foundation_.md#editoraction)): action is Move

*Defined in [src/foundation.ts:49](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L49)*

#### Parameters:

Name | Type |
------ | ------ |
`action` | [EditorAction](_foundation_.md#editoraction) |

**Returns:** action is Move

___

### isUpdate

▸ **isUpdate**(`action`: [EditorAction](_foundation_.md#editoraction)): action is Update

*Defined in [src/foundation.ts:59](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L59)*

#### Parameters:

Name | Type |
------ | ------ |
`action` | [EditorAction](_foundation_.md#editoraction) |

**Returns:** action is Update

___

### newActionEvent

▸ **newActionEvent**\<T>(`action`: T, `eventInitDict?`: CustomEventInit\<[EditorActionDetail](../interfaces/_foundation_.editoractiondetail.md)\<T>>): [EditorActionEvent](_foundation_.md#editoractionevent)\<T>

*Defined in [src/foundation.ts:94](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L94)*

#### Type parameters:

Name | Type |
------ | ------ |
`T` | [EditorAction](_foundation_.md#editoraction) |

#### Parameters:

Name | Type |
------ | ------ |
`action` | T |
`eventInitDict?` | CustomEventInit\<[EditorActionDetail](../interfaces/_foundation_.editoractiondetail.md)\<T>> |

**Returns:** [EditorActionEvent](_foundation_.md#editoractionevent)\<T>

___

### newLogEvent

▸ **newLogEvent**(`detail`: [LogDetail](_foundation_.md#logdetail), `eventInitDict?`: CustomEventInit\<[LogDetail](_foundation_.md#logdetail)>): [LogEvent](_foundation_.md#logevent)

*Defined in [src/foundation.ts:175](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L175)*

#### Parameters:

Name | Type |
------ | ------ |
`detail` | [LogDetail](_foundation_.md#logdetail) |
`eventInitDict?` | CustomEventInit\<[LogDetail](_foundation_.md#logdetail)> |

**Returns:** [LogEvent](_foundation_.md#logevent)

___

### newPendingStateEvent

▸ **newPendingStateEvent**(`promise`: Promise\<string>, `eventInitDict?`: CustomEventInit\<[PendingStateDetail](../interfaces/_foundation_.pendingstatedetail.md)>): [PendingStateEvent](_foundation_.md#pendingstateevent)

*Defined in [src/foundation.ts:201](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L201)*

#### Parameters:

Name | Type |
------ | ------ |
`promise` | Promise\<string> |
`eventInitDict?` | CustomEventInit\<[PendingStateDetail](../interfaces/_foundation_.pendingstatedetail.md)> |

**Returns:** [PendingStateEvent](_foundation_.md#pendingstateevent)

___

### newWizardEvent

▸ **newWizardEvent**(`wizard?`: [Wizard](_foundation_.md#wizard) \| null, `eventInitDict?`: CustomEventInit\<[WizardDetail](../interfaces/_foundation_.wizarddetail.md)>): [WizardEvent](_foundation_.md#wizardevent)

*Defined in [src/foundation.ts:147](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L147)*

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`wizard` | [Wizard](_foundation_.md#wizard) \| null | null |
`eventInitDict?` | CustomEventInit\<[WizardDetail](../interfaces/_foundation_.wizarddetail.md)> | - |

**Returns:** [WizardEvent](_foundation_.md#wizardevent)

___

### unreachable

▸ **unreachable**(`message`: string): never

*Defined in [src/foundation.ts:220](https://github.com/openscd/open-scd/blob/12e7252/src/foundation.ts#L220)*

Throws an error bearing `message`, never returning.

#### Parameters:

Name | Type |
------ | ------ |
`message` | string |

**Returns:** never
