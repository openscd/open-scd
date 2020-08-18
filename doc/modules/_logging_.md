[open-scd](../README.md) › [Globals](../globals.md) › ["logging"](_logging_.md)

# Module: "logging"

## Index

### Namespaces

* [__global](_logging_.__global.md)

### Interfaces

* [Create](../interfaces/_logging_.create.md)
* [Delete](../interfaces/_logging_.delete.md)
* [LogEntry](../interfaces/_logging_.logentry.md)
* [Move](../interfaces/_logging_.move.md)
* [Update](../interfaces/_logging_.update.md)

### Type aliases

* [Change](_logging_.md#change)
* [ElementConstructor](_logging_.md#elementconstructor)
* [LogOptions](_logging_.md#logoptions)

### Functions

* [Logging](_logging_.md#logging)

## Type aliases

###  Change

Ƭ **Change**: *[Create](../interfaces/_logging_.create.md) | [Update](../interfaces/_logging_.update.md) | [Delete](../interfaces/_logging_.delete.md) | [Move](../interfaces/_logging_.move.md)*

Defined in src/logging.ts:11

Represents an intended change to an `Element`.

___

###  ElementConstructor

Ƭ **ElementConstructor**: *object*

Defined in src/logging.ts:1

#### Type declaration:

___

###  LogOptions

Ƭ **LogOptions**: *Pick‹[LogEntry](../interfaces/_logging_.logentry.md), "cause" | "icon" | "message"›*

Defined in src/logging.ts:36

## Functions

###  Logging

▸ **Logging**‹**TBase**›(`Base`: TBase): *LoggingElement & TBase*

Defined in src/logging.ts:38

**Type parameters:**

▪ **TBase**: *[ElementConstructor](_logging_.md#elementconstructor)*

**Parameters:**

Name | Type |
------ | ------ |
`Base` | TBase |

**Returns:** *LoggingElement & TBase*
