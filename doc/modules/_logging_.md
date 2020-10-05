[open-scd](../README.md) › [Globals](../globals.md) › ["logging"](_logging_.md)

# Module: "logging"

## Index

### Type aliases

* [LoggingElement](_logging_.md#loggingelement)

### Functions

* [Logging](_logging_.md#logging)

### Object literals

* [colors](_logging_.md#const-colors)
* [icons](_logging_.md#const-icons)

## Type aliases

###  LoggingElement

Ƭ **LoggingElement**: *[Mixin](_foundation_.md#mixin)‹typeof Logging›*

*Defined in [src/logging.ts:39](https://github.com/openscd/open-scd/blob/c3ac6a3/src/logging.ts#L39)*

## Functions

###  Logging

▸ **Logging**‹**TBase**›(`Base`: TBase): *LoggingElement & TBase*

*Defined in [src/logging.ts:41](https://github.com/openscd/open-scd/blob/c3ac6a3/src/logging.ts#L41)*

**Type parameters:**

▪ **TBase**: *[LitElementConstructor](_foundation_.md#litelementconstructor)*

**Parameters:**

Name | Type |
------ | ------ |
`Base` | TBase |

**Returns:** *LoggingElement & TBase*

## Object literals

### `Const` colors

### ▪ **colors**: *object*

*Defined in [src/logging.ts:32](https://github.com/openscd/open-scd/blob/c3ac6a3/src/logging.ts#L32)*

###  action

• **action**: *undefined* = undefined

*Defined in [src/logging.ts:36](https://github.com/openscd/open-scd/blob/c3ac6a3/src/logging.ts#L36)*

###  error

• **error**: *string* = "--mdc-theme-secondary"

*Defined in [src/logging.ts:35](https://github.com/openscd/open-scd/blob/c3ac6a3/src/logging.ts#L35)*

###  info

• **info**: *string* = "--mdc-theme-primary"

*Defined in [src/logging.ts:33](https://github.com/openscd/open-scd/blob/c3ac6a3/src/logging.ts#L33)*

###  warning

• **warning**: *string* = "--mdc-theme-background"

*Defined in [src/logging.ts:34](https://github.com/openscd/open-scd/blob/c3ac6a3/src/logging.ts#L34)*

___

### `Const` icons

### ▪ **icons**: *object*

*Defined in [src/logging.ts:25](https://github.com/openscd/open-scd/blob/c3ac6a3/src/logging.ts#L25)*

###  action

• **action**: *string* = "history"

*Defined in [src/logging.ts:29](https://github.com/openscd/open-scd/blob/c3ac6a3/src/logging.ts#L29)*

###  error

• **error**: *string* = "report"

*Defined in [src/logging.ts:28](https://github.com/openscd/open-scd/blob/c3ac6a3/src/logging.ts#L28)*

###  info

• **info**: *string* = "info"

*Defined in [src/logging.ts:26](https://github.com/openscd/open-scd/blob/c3ac6a3/src/logging.ts#L26)*

###  warning

• **warning**: *string* = "warning"

*Defined in [src/logging.ts:27](https://github.com/openscd/open-scd/blob/c3ac6a3/src/logging.ts#L27)*
