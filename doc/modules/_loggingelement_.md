[open-scd](../README.md) › [Globals](../globals.md) › ["LoggingElement"](_loggingelement_.md)

# Module: "LoggingElement"

## Index

### Namespaces

* [__global](_loggingelement_.__global.md)

### Interfaces

* [Create](../interfaces/_loggingelement_.create.md)
* [Delete](../interfaces/_loggingelement_.delete.md)
* [LogEntry](../interfaces/_loggingelement_.logentry.md)
* [Move](../interfaces/_loggingelement_.move.md)
* [Update](../interfaces/_loggingelement_.update.md)

### Type aliases

* [Change](_loggingelement_.md#change)
* [ElementConstructor](_loggingelement_.md#elementconstructor)
* [LogOptions](_loggingelement_.md#logoptions)

### Functions

* [Logging](_loggingelement_.md#logging)

## Type aliases

###  Change

Ƭ **Change**: *[Create](../interfaces/_loggingelement_.create.md) | [Update](../interfaces/_loggingelement_.update.md) | [Delete](../interfaces/_loggingelement_.delete.md) | [Move](../interfaces/_loggingelement_.move.md)*

Defined in src/LoggingElement.ts:11

Represents an intended change to an `Element`.

___

###  ElementConstructor

Ƭ **ElementConstructor**: *object*

Defined in src/LoggingElement.ts:1

#### Type declaration:

___

###  LogOptions

Ƭ **LogOptions**: *Pick‹[LogEntry](../interfaces/_loggingelement_.logentry.md), "cause" | "icon" | "message"›*

Defined in src/LoggingElement.ts:36

## Functions

###  Logging

▸ **Logging**‹**TBase**›(`Base`: TBase): *LoggingElement & TBase*

Defined in src/LoggingElement.ts:38

**Type parameters:**

▪ **TBase**: *[ElementConstructor](_loggingelement_.md#elementconstructor)*

**Parameters:**

Name | Type |
------ | ------ |
`Base` | TBase |

**Returns:** *LoggingElement & TBase*
