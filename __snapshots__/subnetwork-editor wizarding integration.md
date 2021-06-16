# `subnetwork-editor wizarding integration`

## `edit/add Subnetwork wizard`

####   `looks like the latest snapshot`

```html
<mwc-dialog
  defaultaction="close"
  heading="[subnetwork.wizard.title.edit]"
  open=""
>
  <div id="wizard-content">
    <wizard-textfield
      dialoginitialfocus=""
      helper="[subnetwork.wizard.nameHelper]"
      label="name"
      required=""
      validationmessage="[textfield.required]"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[subnetwork.wizard.descHelper]"
      label="desc"
      nullable=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[subnetwork.wizard.typeHelper]"
      label="type"
      nullable=""
      pattern="([ -~]|[]|[ -퟿]|[-�]|[𐀀\-􏿿])*"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[subnetwork.wizard.bitrateHelper]"
      label="BitRate"
      nullable=""
      pattern="((-|\+)?([0-9]+(\.[0-9]*)?|\.[0-9]+))"
      required=""
      unit="b/s"
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

## `add ConnectedAP wizard`

####   `looks like the latest snapshot`

```html
<mwc-dialog
  defaultaction="close"
  heading="[connectedap.wizard.title.connect]"
  open=""
>
  <div id="wizard-content">
    <filtered-list
      id="apList"
      multi=""
    >
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        tabindex="0"
        twoline=""
        value="{&quot;iedName&quot;:&quot;IED3&quot;,&quot;apName&quot;:&quot;P2&quot;}"
      >
        <span>
          P2
        </span>
        <span slot="secondary">
          IED3
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="true"
        disabled=""
        graphic="control"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="{&quot;iedName&quot;:&quot;IED1&quot;,&quot;apName&quot;:&quot;P1&quot;}"
      >
        <span>
          P1
        </span>
        <span slot="secondary">
          IED1
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="true"
        disabled=""
        graphic="control"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="{&quot;iedName&quot;:&quot;IED2&quot;,&quot;apName&quot;:&quot;P1&quot;}"
      >
        <span>
          P1
        </span>
        <span slot="secondary">
          IED2
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="true"
        disabled=""
        graphic="control"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="{&quot;iedName&quot;:&quot;IED3&quot;,&quot;apName&quot;:&quot;P1&quot;}"
      >
        <span>
          P1
        </span>
        <span slot="secondary">
          IED3
        </span>
      </mwc-check-list-item>
    </filtered-list>
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
    icon="save"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>

```

