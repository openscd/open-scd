[open-scd](../README.md) › [Globals](../globals.md) › ["logging"](_logging_.md)

# Module: "logging"

## Index

### Interfaces

* [LogEntry](../interfaces/_logging_.logentry.md)

### Type aliases

* [LogOptions](_logging_.md#logoptions)
* [LoggingElement](_logging_.md#loggingelement)

### Functions

* [Logging](_logging_.md#logging)

## Type aliases

###  LogOptions

Ƭ **LogOptions**: *Pick‹[LogEntry](../interfaces/_logging_.logentry.md), "cause" | "icon" | "message"›*

Defined in src/logging.ts:18

___

###  LoggingElement

Ƭ **LoggingElement**: *[Mixin](_foundation_.md#mixin)‹typeof Logging›*

Defined in src/logging.ts:20

## Functions

###  Logging

▸ **Logging**‹**TBase**›(`Base`: TBase): *LoggingElement & TBase*

Defined in src/logging.ts:22

**Type parameters:**

▪ **TBase**: *[ElementConstructor](_foundation_.md#elementconstructor)*

**Parameters:**

Name | Type |
------ | ------ |
`Base` | TBase |

**Returns:** *LoggingElement & TBase*
