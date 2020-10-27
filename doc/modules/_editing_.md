**[open-scd](../README.md)**

> [Globals](../globals.md) / "Editing"

# Module: "Editing"

## Index

### Type aliases

* [EditingElement](_editing_.md#editingelement)

### Functions

* [Editing](_editing_.md#editing)
* [newEmptySCD](_editing_.md#newemptyscd)

## Type aliases

### EditingElement

Ƭ  **EditingElement**: [Mixin](_foundation_.md#mixin)\<*typeof* [Editing](_editing_.md#editing)>

*Defined in [src/Editing.ts:27](https://github.com/openscd/open-scd/blob/12e7252/src/Editing.ts#L27)*

## Functions

### Editing

▸ **Editing**\<TBase>(`Base`: TBase): EditingElement & TBase

*Defined in [src/Editing.ts:29](https://github.com/openscd/open-scd/blob/12e7252/src/Editing.ts#L29)*

#### Type parameters:

Name | Type |
------ | ------ |
`TBase` | [LitElementConstructor](_foundation_.md#litelementconstructor) |

#### Parameters:

Name | Type |
------ | ------ |
`Base` | TBase |

**Returns:** EditingElement & TBase

___

### newEmptySCD

▸ **newEmptySCD**(): XMLDocument

*Defined in [src/Editing.ts:19](https://github.com/openscd/open-scd/blob/12e7252/src/Editing.ts#L19)*

**Returns:** XMLDocument
