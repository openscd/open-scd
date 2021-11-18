# `bay-editor wizarding integration`

#### `looks like the latest snapshot`

```html
<c-dialog
  defaultaction="close"
  heading="Edit bay"
  open=""
>
  <div id="wizard-content">
    <wizard-text-field
      dialoginitialfocus=""
      helper="Bay name"
      label="name"
      required=""
      validationmessage="Required"
    >
    </wizard-text-field>
    <wizard-text-field
      helper="Bay description"
      label="desc"
      nullable=""
    >
    </wizard-text-field>
  </div>
  <c-button
    dialogaction="close"
    label="Cancel"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </c-button>
  <c-button
    dialoginitialfocus=""
    icon="edit"
    label="Save"
    slot="primaryAction"
    trailingicon=""
  >
  </c-button>
</c-dialog>

```

