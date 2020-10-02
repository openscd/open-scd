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

*Defined in [src/logging.ts:24](https://github.com/openscd/open-scd/blob/6a0bb7d/src/logging.ts#L24)*

___

###  LoggingElement

Ƭ **LoggingElement**: *[Mixin](_foundation_.md#mixin)‹typeof Logging›*

*Defined in [src/logging.ts:26](https://github.com/openscd/open-scd/blob/6a0bb7d/src/logging.ts#L26)*

## Functions

###  Logging

▸ **Logging**‹**TBase**›(`Base`: TBase): *LoggingElement & TBase*

*Defined in [src/logging.ts:28](https://github.com/openscd/open-scd/blob/6a0bb7d/src/logging.ts#L28)*

**Type parameters:**

▪ **TBase**: *[LitElementConstructor](_foundation_.md#litelementconstructor)*

**Parameters:**

Name | Type |
------ | ------ |
`Base` | TBase |

**Returns:** *LoggingElement & TBase*
