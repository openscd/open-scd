# `conducting-equipment-editor wizarding integration`

#### `looks like the latest snapshot`

```html
<mwc-dialog
  defaultaction="close"
  heading="Edit conducting equipment"
  open=""
>
  <div id="wizard-content">
    <mwc-select
      disabled=""
      helper="Conducting equipment type"
      label="type"
      validationmessage="Required"
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        selected=""
        tabindex="-1"
        value="0"
      >
        Circuit Breaker
      </mwc-list-item>
    </mwc-select>
    <wizard-textfield
      dialoginitialfocus=""
      helper="Conducting equipment name"
      label="name"
      required=""
      validationmessage="Required"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="Conducting equipment description"
      label="desc"
      nullable=""
    >
    </wizard-textfield>
  </div>
  <mwc-button
    dialogaction="close"
    label="Cancel"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    dialoginitialfocus=""
    icon="edit"
    label="Save"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>

```

