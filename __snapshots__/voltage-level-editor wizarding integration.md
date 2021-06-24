# `voltage-level-editor wizarding integration`

#### `looks like the latest snapshot`

```html
<mwc-dialog
  defaultaction="close"
  heading="[voltagelevel.wizard.title.edit]"
  open=""
>
  <div id="wizard-content">
    <wizard-textfield
      dialoginitialfocus=""
      helper="[voltagelevel.wizard.nameHelper]"
      label="name"
      required=""
      validationmessage="[textfield.required]"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[voltagelevel.wizard.descHelper]"
      label="desc"
      nullable=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[voltagelevel.wizard.nomFreqHelper]"
      label="nomFreq"
      nullable=""
      pattern="\+?([0-9]+(\.[0-9]*)?|\.[0-9]+)"
      required=""
      suffix="Hz"
      validationmessage="[textfield.nonempty]"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[voltagelevel.wizard.numPhaseHelper]"
      label="numPhases"
      max="255"
      min="1"
      nullable=""
      required=""
      suffix="#"
      type="number"
      validationmessage="[textfield.nonempty]"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[voltagelevel.wizard.voltageHelper]"
      label="Voltage"
      nullable=""
      pattern="((-|\+)?([0-9]+(\.[0-9]*)?|\.[0-9]+))"
      required=""
      unit="V"
      validationmessage="[textfield.nonempty]"
    >
    </wizard-textfield>
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
    icon="edit"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>

```

