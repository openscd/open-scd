[open-scd](../README.md) › [Globals](../globals.md) › ["substation-editor-css"](_substation_editor_css_.md)

# Module: "substation-editor-css"

## Index

### Variables

* [styles](_substation_editor_css_.md#const-styles)

## Variables

### `Const` styles

• **styles**: *CSSResult‹›* = css`
  #editor {
    height: calc(100vh - 112px);
    width: 100vw;
    overflow: hidden;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }

  * {
    --mdc-theme-primary: #005496;
    --mdc-theme-secondary: #d20a11;
    --mdc-theme-background: #ffdd00;
    --mdc-theme-on-secondary: #ffdd00;
    --mdc-theme-on-background: #005496;
  }

  h1,
  h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
  }

  mwc-dialog {
    display: flex;
    flex-direction: column;
  }

  mwc-dialog > * {
    display: block;
    margin-top: 24px;
  }

  pre {
    font-family: 'Roboto Mono', monospace;
    font-weight: 300;
  }

  mwc-fab {
    position: fixed;
    bottom: 32px;
    right: 32px;
  }
`

Defined in src/substation-editor-css.ts:3
