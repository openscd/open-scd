# `dataset wizards`

## `editDataSetWizard`

####   `looks like the latest snapshot`

```html
<mwc-dialog
  defaultaction="close"
  heading="[wizard.title.edit]"
  open=""
>
  <div id="wizard-content">
    <wizard-textfield
      helper="[scl.name]"
      label="name"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[scl.desc]"
      label="desc"
      nullable=""
      required=""
    >
    </wizard-textfield>
    <filtered-list multi="">
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        tabindex="0"
        value="IED2>>CBSW>GooseDataSet1>CBSW/ XSWI 2.Pos stVal (ST)"
      >
        CBSW/ XSWI 2.Pos stVal (ST)
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        tabindex="-1"
        value="IED2>>CBSW>GooseDataSet1>CBSW/ XSWI 2.Pos q (ST)"
      >
        CBSW/ XSWI 2.Pos q (ST)
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
    label="[edit]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>

```

