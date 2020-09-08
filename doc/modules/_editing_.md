[open-scd](../README.md) › [Globals](../globals.md) › ["editing"](_editing_.md)

# Module: "editing"

## Index

### Interfaces

* [LogEntry](../interfaces/_editing_.logentry.md)

### Type aliases

* [EditingElement](_editing_.md#editingelement)
* [LogOptions](_editing_.md#logoptions)

### Functions

* [Editing](_editing_.md#editing)

## Type aliases

###  EditingElement

Ƭ **EditingElement**: *[Mixin](_foundation_.md#mixin)‹typeof Editing›*

Defined in src/editing.ts:30

___

###  LogOptions

Ƭ **LogOptions**: *Pick‹[LogEntry](../interfaces/_editing_.logentry.md), "cause" | "icon" | "message"›*

Defined in src/editing.ts:28

## Functions

###  Editing

▸ **Editing**‹**TBase**›(`Base`: TBase): *EditingElement & TBase*

Defined in src/editing.ts:32

**Type parameters:**

▪ **TBase**: *[ElementConstructor](_foundation_.md#elementconstructor)*

**Parameters:**

Name | Type |
------ | ------ |
`Base` | TBase |

**Returns:** *EditingElement & TBase*
