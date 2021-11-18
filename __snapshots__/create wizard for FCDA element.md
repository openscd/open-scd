# `create wizard for FCDA element`

## `with a valid SCL file`

####   `looks like the last snapshot`

```html
<c-dialog
  defaultaction="close"
  heading="[wizard.title.add]"
  open=""
>
  <div id="wizard-content">
    <finder-list multi="">
    </finder-list>
  </div>
  <c-button
    dialogaction="close"
    label="[cancel]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </c-button>
  <c-button
    dialoginitialfocus=""
    icon="add"
    label="add"
    slot="primaryAction"
    trailingicon=""
  >
  </c-button>
</c-dialog>

```

