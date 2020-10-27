**[open-scd](../README.md)**

> [Globals](../globals.md) / "themes"

# Module: "themes"

## Index

### Functions

* [getTheme](_themes_.md#gettheme)

### Object literals

* [themes](_themes_.md#themes)

## Functions

### getTheme

▸ **getTheme**(`theme`: Settings[\"theme\"]): TemplateResult

*Defined in [src/themes.ts:4](https://github.com/openscd/open-scd/blob/12e7252/src/themes.ts#L4)*

#### Parameters:

Name | Type |
------ | ------ |
`theme` | Settings[\"theme\"] |

**Returns:** TemplateResult

## Object literals

### themes

▪ `Const` **themes**: object

*Defined in [src/themes.ts:41](https://github.com/openscd/open-scd/blob/12e7252/src/themes.ts#L41)*

#### Properties:

Name | Type | Value |
------ | ------ | ------ |
`dark` | TemplateResult | html\`     \<style>       * {         --base03: #fdf6e3;         --base02: #eee8d5;         --base01: #93a1a1;         --base00: #839496;         --base0: #657b83;         --base1: #586e75;         --base2: #073642;         --base3: #002b36;         --yellow: #b58900;         --orange: #cb4b16;         --red: #dc322f;         --magenta: #d33682;         --violet: #6c71c4;         --blue: #268bd2;         --cyan: #2aa198;         --green: #859900;       }     \</style>   \` |
`light` | TemplateResult | html\`     \<style>       * {         --base03: #002b36;         --base02: #073642;         --base01: #586e75;         --base00: #657b83;         --base0: #839496;         --base1: #93a1a1;         --base2: #eee8d5;         --base3: #fdf6e3;         --yellow: #b58900;         --orange: #cb4b16;         --red: #dc322f;         --magenta: #d33682;         --violet: #6c71c4;         --blue: #268bd2;         --cyan: #2aa198;         --green: #859900;       }     \</style>   \` |
