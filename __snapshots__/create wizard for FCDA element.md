# `create wizard for FCDA element`

## `with a valid SCL file`

####   `looks like the last snapshot`

```html
<mwc-dialog
  defaultaction="close"
  heading="[wizard.title.add]"
  open=""
>
  <div id="wizard-content">
    <finder-list multi="">
    </finder-list>
  </div>
  <mwc-button
    dialogaction="close"
    label="[cancel]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    dialoginitialfocus=""
    icon="add"
    label="add"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>

```

