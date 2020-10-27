**[open-scd](../README.md)**

> [Globals](../globals.md) / "Logging"

# Module: "Logging"

## Index

### Type aliases

* [LoggingElement](_logging_.md#loggingelement)

### Functions

* [Logging](_logging_.md#logging)

### Object literals

* [colors](_logging_.md#colors)
* [icons](_logging_.md#icons)

## Type aliases

### LoggingElement

Ƭ  **LoggingElement**: [Mixin](_foundation_.md#mixin)\<*typeof* [Logging](_logging_.md#logging)>

*Defined in [src/Logging.ts:39](https://github.com/openscd/open-scd/blob/12e7252/src/Logging.ts#L39)*

## Functions

### Logging

▸ **Logging**\<TBase>(`Base`: TBase): LoggingElement & TBase

*Defined in [src/Logging.ts:41](https://github.com/openscd/open-scd/blob/12e7252/src/Logging.ts#L41)*

#### Type parameters:

Name | Type |
------ | ------ |
`TBase` | [LitElementConstructor](_foundation_.md#litelementconstructor) |

#### Parameters:

Name | Type |
------ | ------ |
`Base` | TBase |

**Returns:** LoggingElement & TBase

## Object literals

### colors

▪ `Const` **colors**: object

*Defined in [src/Logging.ts:32](https://github.com/openscd/open-scd/blob/12e7252/src/Logging.ts#L32)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`action` | undefined | undefined |
`error` | string | "--red" |
`info` | string | "--cyan" |
`warning` | string | "--yellow" |

___

### icons

▪ `Const` **icons**: object

*Defined in [src/Logging.ts:25](https://github.com/openscd/open-scd/blob/12e7252/src/Logging.ts#L25)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`action` | string | "history" |
`error` | string | "report" |
`info` | string | "info" |
`warning` | string | "warning" |
