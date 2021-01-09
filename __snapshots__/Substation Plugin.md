# `Substation Plugin`

## `without a doc loaded`

####   `looks like the latest snapshot`

```html
<h1>
  <span style="color: var(--base1)">
    [substation.missing]
  </span>
  <mwc-dialog
    heading="[substation.name]"
    id="startDialog"
  >
    <form>
      <mwc-list activatable="">
        <mwc-radio-list-item
          aria-disabled="false"
          aria-selected="true"
          graphic="control"
          left=""
          mwc-list-item=""
          selected=""
          tabindex="0"
          value="new"
        >
          [substation.startdialog.add]
        </mwc-radio-list-item>
        <mwc-radio-list-item
          aria-disabled="false"
          graphic="control"
          left=""
          mwc-list-item=""
          tabindex="-1"
          value="guess"
        >
          [substation.startdialog.guess]
        </mwc-radio-list-item>
      </mwc-list>
    </form>
    <mwc-button
      dialogaction="close"
      outlined=""
      slot="secondaryAction"
      style="--mdc-theme-primary: var(--mdc-theme-error)"
    >
      [cancel]
    </mwc-button>
    <mwc-button
      dialogaction="proceed"
      slot="primaryAction"
      unelevated=""
    >
      [proceed]
    </mwc-button>
  </mwc-dialog>
  <mwc-fab
    extended=""
    icon="add"
    label="[substation.wizard.title.add]"
  >
  </mwc-fab>
</h1>

```

