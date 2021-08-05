# `gse wizards`

## `editGseWizard`

####   `looks like the latest snapshot`

```html
<mwc-dialog
  defaultaction="close"
  heading="[wizard.title.edit]"
  open=""
>
  <div id="wizard-content">
    <mwc-formfield label="[connectedap.wizard.addschemainsttype]">
      <mwc-checkbox id="instType">
      </mwc-checkbox>
    </mwc-formfield>
    <wizard-textfield
      label="MAC-Address"
      pattern="([0-9A-F]{2}-){5}[0-9A-F]{2}"
    >
    </wizard-textfield>
    <wizard-textfield
      label="APPID"
      pattern="[0-9A-F]{4}"
    >
    </wizard-textfield>
    <wizard-textfield
      label="VLAN-ID"
      nullable=""
      pattern="[0-9A-F]{3}"
    >
    </wizard-textfield>
    <wizard-textfield
      label="VLAN-PRIORITY"
      nullable=""
      pattern="[0-7]"
    >
    </wizard-textfield>
    <wizard-textfield
      label="MinTime"
      nullable=""
      suffix="ms"
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      label="MaxTime"
      nullable=""
      suffix="ms"
      type="number"
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

