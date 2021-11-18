# `Update method for desc attributes in ABB IEDs`

## `working on SCL files without manufacturer ABB`

####   `creates an empty wizard indicating not found desc updates`

```html
<mwc-dialog
  defaultaction="close"
  heading="[wizard.title.add]"
  open=""
>
  <div id="wizard-content">
    <filtered-list multi="">
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

## `working on SCL files containing manufacturer ABB`

####   `creates a wizard with all valid desc update possibilities`

```html
<mwc-dialog
  defaultaction="close"
  heading="[wizard.title.add]"
  open=""
>
  <div id="wizard-content">
    <filtered-list multi="">
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        selected=""
        tabindex="0"
        twoline=""
        value="ExtRef | IED1>>Disconnectors>DC CSWI 1>IED2 CBSW/ XSWI 2 Pos stVal@01-0C-CD-01-00-01,0001,5,GOOSERCV_BIN.3.I1,400,0,GOOSERCV_BIN,Dynamic"
      >
        <span>
          GOOSERCV_BIN.3.I1
        </span>
        <span slot="secondary">
          ExtRef | IED1>>Disconnectors>DC CSWI 1>IED2 CBSW/ XSWI 2 Pos stVal@01-0C-CD-01-00-01,0001,5,GOOSERCV_BIN.3.I1,400,0,GOOSERCV_BIN,Dynamic
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        selected=""
        tabindex="-1"
        twoline=""
        value="ExtRef | IED1>>Disconnectors>DC CSWI 1>IED2 CBSW/ XSWI 2 Pos q@01-0C-CD-01-00-01,0001,5,GOOSERCV_BIN.3.I2,400,0,GOOSERCV_BIN,Dynamic"
      >
        <span>
          some desc-GOOSERCV_BIN.3.I2
        </span>
        <span slot="secondary">
          ExtRef | IED1>>Disconnectors>DC CSWI 1>IED2 CBSW/ XSWI 2 Pos q@01-0C-CD-01-00-01,0001,5,GOOSERCV_BIN.3.I2,400,0,GOOSERCV_BIN,Dynamic
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

