[open-scd](../README.md) › [Globals](../globals.md) › ["Logging"](_logging_.md)

# Module: "Logging"

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

*Defined in [src/Logging.ts:39](https://github.com/openscd/open-scd/blob/56480b8/src/Logging.ts#L39)*

## Functions

###  Logging

▸ **Logging**‹**TBase**›(`Base`: TBase): *LoggingElement & TBase*

*Defined in [src/Logging.ts:41](https://github.com/openscd/open-scd/blob/56480b8/src/Logging.ts#L41)*

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

*Defined in [src/Logging.ts:32](https://github.com/openscd/open-scd/blob/56480b8/src/Logging.ts#L32)*

###  action

• **action**: *undefined* = undefined

*Defined in [src/Logging.ts:36](https://github.com/openscd/open-scd/blob/56480b8/src/Logging.ts#L36)*

###  error

• **error**: *string* = "--mdc-theme-secondary"

*Defined in [src/Logging.ts:35](https://github.com/openscd/open-scd/blob/56480b8/src/Logging.ts#L35)*

###  info

• **info**: *string* = "--mdc-theme-primary"

*Defined in [src/Logging.ts:33](https://github.com/openscd/open-scd/blob/56480b8/src/Logging.ts#L33)*

###  warning

• **warning**: *string* = "--mdc-theme-background"

*Defined in [src/Logging.ts:34](https://github.com/openscd/open-scd/blob/56480b8/src/Logging.ts#L34)*

___

### `Const` icons

### ▪ **icons**: *object*

*Defined in [src/Logging.ts:25](https://github.com/openscd/open-scd/blob/56480b8/src/Logging.ts#L25)*

###  action

• **action**: *string* = "history"

*Defined in [src/Logging.ts:29](https://github.com/openscd/open-scd/blob/56480b8/src/Logging.ts#L29)*

###  error

• **error**: *string* = "report"

*Defined in [src/Logging.ts:28](https://github.com/openscd/open-scd/blob/56480b8/src/Logging.ts#L28)*

###  info

• **info**: *string* = "info"

*Defined in [src/Logging.ts:26](https://github.com/openscd/open-scd/blob/56480b8/src/Logging.ts#L26)*

###  warning

• **warning**: *string* = "warning"

*Defined in [src/Logging.ts:27](https://github.com/openscd/open-scd/blob/56480b8/src/Logging.ts#L27)*
