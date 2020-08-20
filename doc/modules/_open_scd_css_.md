[open-scd](../README.md) › [Globals](../globals.md) › ["open-scd-css"](_open_scd_css_.md)

# Module: "open-scd-css"

## Index

### Variables

* [styles](_open_scd_css_.md#const-styles)

## Variables

### `Const` styles

• **styles**: *CSSResult‹›* = css`
  * {
    --mdc-theme-primary: #005496;
    --mdc-theme-secondary: #d20a11;
    --mdc-theme-background: #ffdd00;
    --mdc-theme-on-secondary: #ffdd00;
    --mdc-theme-on-background: #005496;
  }

  mwc-top-app-bar-fixed {
    --mdc-theme-text-disabled-on-light: rgba(255, 255, 255, 0.38);
  } /* hack to fix disabled icon buttons rendering black */

  mwc-snackbar * {
    --mdc-theme-primary: #ffdd00;
  }

  #file-input {
    display: none;
  }

  mwc-dialog {
    --mdc-dialog-max-width: 92vw;
  }

  mwc-circular-progress-four-color {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    --mdc-circular-progress-bar-color-1: #005496;
    --mdc-circular-progress-bar-color-2: #d20a11;
    --mdc-circular-progress-bar-color-3: #005496;
    --mdc-circular-progress-bar-color-4: #ffdd00;
  }

  tt {
    font-family: 'Roboto Mono', monospace;
    font-weight: 300;
  }
`

Defined in src/open-scd-css.ts:3
