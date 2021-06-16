# `conducting-equipment-editor wizarding integration`

#### `looks like the latest snapshot`

```html
<mwc-dialog
  defaultaction="close"
  heading="[conductingequipment.wizard.title.edit]"
  open=""
>
  <div id="wizard-content">
    <mwc-select
      disabled=""
      helper="[conductingequipment.wizard.typeHelper]"
      label="type"
      validationmessage="[textfield.required]"
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
      helper="[conductingequipment.wizard.nameHelper]"
      label="name"
      required=""
      validationmessage="[textfield.required]"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[conductingequipment.wizard.descHelper]"
      label="desc"
      nullable=""
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

