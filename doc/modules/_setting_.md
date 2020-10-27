**[open-scd](../README.md)**

> [Globals](../globals.md) / "Setting"

# Module: "Setting"

## Index

### Type aliases

* [SettingElement](_setting_.md#settingelement)
* [Settings](_setting_.md#settings)

### Functions

* [Setting](_setting_.md#setting)

### Object literals

* [defaults](_setting_.md#defaults)

## Type aliases

### SettingElement

Ƭ  **SettingElement**: [Mixin](_foundation_.md#mixin)\<*typeof* [Setting](_setting_.md#setting)>

*Defined in [src/Setting.ts:22](https://github.com/openscd/open-scd/blob/12e7252/src/Setting.ts#L22)*

___

### Settings

Ƭ  **Settings**: { language: [Language](_translations_loader_.md#language) ; theme: \"light\" \| \"dark\"  }

*Defined in [src/Setting.ts:16](https://github.com/openscd/open-scd/blob/12e7252/src/Setting.ts#L16)*

#### Type declaration:

Name | Type |
------ | ------ |
`language` | [Language](_translations_loader_.md#language) |
`theme` | \"light\" \| \"dark\" |

## Functions

### Setting

▸ **Setting**\<TBase>(`Base`: TBase): SettingElement & TBase

*Defined in [src/Setting.ts:24](https://github.com/openscd/open-scd/blob/12e7252/src/Setting.ts#L24)*

#### Type parameters:

Name | Type |
------ | ------ |
`TBase` | [LitElementConstructor](_foundation_.md#litelementconstructor) |

#### Parameters:

Name | Type |
------ | ------ |
`Base` | TBase |

**Returns:** SettingElement & TBase

## Object literals

### defaults

▪ `Const` **defaults**: object

*Defined in [src/Setting.ts:20](https://github.com/openscd/open-scd/blob/12e7252/src/Setting.ts#L20)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`language` | \"en\" | "en" |
`theme` | \"light\" | "light" |
