[open-scd](../README.md) › [Globals](../globals.md) › ["icons"](_icons_.md)

# Module: "icons"

## Index

### Variables

* [iedIcon](_icons_.md#const-iedicon)
* [networkConfigIcon](_icons_.md#const-networkconfigicon)
* [zeroLineIcon](_icons_.md#const-zerolineicon)

## Variables

### `Const` iedIcon

• **iedIcon**: *TemplateResult‹›* = html`<svg
  slot="icon"
  width="25"
  height="25"
  style="margin-bottom:0;"
>
  <rect
    width="20"
    height="20"
    x="2"
    y="2"
    rx="2"
    ry="2"
    fill="transparent"
    stroke="currentColor"
    stroke-width="1.5"
  />
  <rect width="8" height="10" x="12" y="4" />

  <circle cx="4" cy="6" r="0.5" />
  <line x1="6" y1="6" x2="10" y2="6" stroke="currentColor" stroke-width="1.5" />
  <circle cx="4" cy="8" r="0.5" />
  <line x1="6" y1="8" x2="10" y2="8" stroke="currentColor" stroke-width="1.5" />
  <circle cx="4" cy="10" r="0.5" />
  <line
    x1="6"
    y1="10"
    x2="10"
    y2="10"
    stroke="currentColor"
    stroke-width="1.5"
  />

  <rect x="4" y="13.5" width="2" height="2" />
  <rect x="4" y="16" width="2" height="2" />
  <rect x="4" y="18.5" width="2" height="2" />
  <rect x="6.5" y="13.5" width="2" height="2" />
  <rect x="6.5" y="16" width="2" height="2" />
  <rect x="6.5" y="18.5" width="2" height="2" />
  <rect x="9" y="13.5" width="2" height="2" />
  <rect x="9" y="16" width="2" height="2" />
  <rect x="9" y="18.5" width="2" height="2" />
</svg>`

*Defined in [src/icons.ts:3](https://github.com/openscd/open-scd/blob/56480b8/src/icons.ts#L3)*

___

### `Const` networkConfigIcon

• **networkConfigIcon**: *TemplateResult‹›* = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  slot="icon"
  width="25px"
  height="25px"
  style="margin-bottom:0px;"
>
  <rect
    width="8"
    height="8"
    x="8.5"
    y="2"
    rx="1"
    ry="1"
    fill="transparent"
    stroke="currentColor"
    stroke-width="1.5"
  />
  <rect
    width="8"
    height="8"
    x="2.5"
    y="15"
    rx="1"
    ry="1"
    fill="transparent"
    stroke="currentColor"
    stroke-width="1.5"
  />
  <rect
    width="8"
    height="8"
    x="15"
    y="15"
    rx="1"
    ry="1"
    fill="transparent"
    stroke="currentColor"
    stroke-width="1.5"
  />

  <line
    x1="2"
    y1="12.5"
    x2="23"
    y2="12.5"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-width="1.5"
  />
  <line
    x1="12.5"
    y1="10"
    x2="12.5"
    y2="12.5"
    stroke="currentColor"
    stroke-width="1.5"
  />
  <line
    x1="6.5"
    y1="12.5"
    x2="6.5"
    y2="15"
    stroke="currentColor"
    stroke-width="1.5"
  />
  <line
    x1="19"
    y1="12.5"
    x2="19"
    y2="15"
    stroke="currentColor"
    stroke-width="1.5"
  />
</svg>`

*Defined in [src/icons.ts:47](https://github.com/openscd/open-scd/blob/56480b8/src/icons.ts#L47)*

___

### `Const` zeroLineIcon

• **zeroLineIcon**: *TemplateResult‹›* = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  slot="icon"
  width="25px"
  height="25px"
  style="margin-bottom:0px;"
>
  <path
    d="M 2 9 L 12.5 2 L 23 9 L 21 9 L 21 21 L 4 21 L 4 9 Z"
    fill="transparent"
    stroke="currentColor"
    stroke-width="2"
    stroke-linejoin="round"
  />
  <path d="M 11 7 L 17.5 7 L 13.5 11 L 16.5 11 L 10 19 L 11.5 13 L 8.5 13 Z " />
</svg>`

*Defined in [src/icons.ts:123](https://github.com/openscd/open-scd/blob/56480b8/src/icons.ts#L123)*
