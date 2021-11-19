# `address`

## `renderGseSmvAddress`

####   `looks like the latest snapshot`

```html
<c-dialog
  defaultaction="close"
  heading="title"
  open=""
>
  <div id="wizard-content">
    <mwc-formfield label="[connectedap.wizard.addschemainsttype]">
      <c-checkbox id="instType">
      </c-checkbox>
    </mwc-formfield>
    <wizard-text-field
      label="MAC-Address"
      pattern="([0-9A-F]{2}-){5}[0-9A-F]{2}"
    >
    </wizard-text-field>
    <wizard-text-field
      label="APPID"
      pattern="[0-9A-F]{4}"
    >
    </wizard-text-field>
    <wizard-text-field
      label="VLAN-ID"
      nullable=""
      pattern="[0-9A-F]{3}"
    >
    </wizard-text-field>
    <wizard-text-field
      label="VLAN-PRIORITY"
      nullable=""
      pattern="[0-7]"
    >
    </wizard-text-field>
  </div>
  <c-button
    dialogaction="close"
    label="[cancel]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </c-button>
</c-dialog>

```

