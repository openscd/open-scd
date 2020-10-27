**[open-scd](../README.md)**

> [Globals](../globals.md) / "editors/substation/voltage-level-editor"

# Module: "editors/substation/voltage-level-editor"

## Index

### Classes

* [VoltageLevelEditor](../classes/_editors_substation_voltage_level_editor_.voltageleveleditor.md)

### Interfaces

* [VoltageLevelCreateOptions](../interfaces/_editors_substation_voltage_level_editor_.voltagelevelcreateoptions.md)
* [VoltageLevelUpdateOptions](../interfaces/_editors_substation_voltage_level_editor_.voltagelevelupdateoptions.md)

### Type aliases

* [VoltageLevelWizardOptions](_editors_substation_voltage_level_editor_.md#voltagelevelwizardoptions)

### Functions

* [isVoltageLevelCreateOptions](_editors_substation_voltage_level_editor_.md#isvoltagelevelcreateoptions)

### Object literals

* [initial](_editors_substation_voltage_level_editor_.md#initial)

## Type aliases

### VoltageLevelWizardOptions

Ƭ  **VoltageLevelWizardOptions**: [VoltageLevelUpdateOptions](../interfaces/_editors_substation_voltage_level_editor_.voltagelevelupdateoptions.md) \| [VoltageLevelCreateOptions](../interfaces/_editors_substation_voltage_level_editor_.voltagelevelcreateoptions.md)

*Defined in [src/editors/substation/voltage-level-editor.ts:33](https://github.com/openscd/open-scd/blob/12e7252/src/editors/substation/voltage-level-editor.ts#L33)*

## Functions

### isVoltageLevelCreateOptions

▸ **isVoltageLevelCreateOptions**(`options`: [VoltageLevelWizardOptions](_editors_substation_voltage_level_editor_.md#voltagelevelwizardoptions)): options is VoltageLevelCreateOptions

*Defined in [src/editors/substation/voltage-level-editor.ts:36](https://github.com/openscd/open-scd/blob/12e7252/src/editors/substation/voltage-level-editor.ts#L36)*

#### Parameters:

Name | Type |
------ | ------ |
`options` | [VoltageLevelWizardOptions](_editors_substation_voltage_level_editor_.md#voltagelevelwizardoptions) |

**Returns:** options is VoltageLevelCreateOptions

## Object literals

### initial

▪ `Const` **initial**: object

*Defined in [src/editors/substation/voltage-level-editor.ts:42](https://github.com/openscd/open-scd/blob/12e7252/src/editors/substation/voltage-level-editor.ts#L42)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`Voltage` | string | "110" |
`multiplier` | string | "k" |
`nomFreq` | string | "50" |
`numPhases` | string | "3" |
