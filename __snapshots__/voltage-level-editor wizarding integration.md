# `voltage-level-editor wizarding integration`

#### `looks like the latest snapshot`

```html
<mwc-dialog
  defaultaction="close"
  heading="Edit voltage level"
  open=""
>
  <div id="wizard-content">
    <wizard-textfield
      dialoginitialfocus=""
      helper="Voltage level name"
      label="name"
      required=""
      validationmessage="Required"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="Voltage level description"
      label="desc"
      nullable=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="Nominal frequency"
      label="nomFreq"
      nullable=""
      pattern="\+?([0-9]+(\.[0-9]*)?|\.[0-9]+)"
      required=""
      suffix="Hz"
      validationmessage="Must not be empty"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="Number of phases"
      label="numPhases"
      max="255"
      min="1"
      nullable=""
      required=""
      suffix="#"
      type="number"
      validationmessage="Must not be empty"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="Nominal voltage"
      label="Voltage"
      nullable=""
      pattern="((-|\+)?([0-9]+(\.[0-9]*)?|\.[0-9]+))"
      required=""
      unit="V"
      validationmessage="Must not be empty"
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

