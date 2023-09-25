/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for preparing 104 Address Creation show prepare 104 Address creation (single monitor TI only) looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.add]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      disabled=""
      label="IED"
      readonly=""
    >
    </wizard-textfield>
    <mwc-textarea
      cols="40"
      disabled=""
      label="LN(0)"
      readonly=""
      rows="2"
      value="AP1 / LD0 / LLN0"
    >
    </mwc-textarea>
    <wizard-textfield
      disabled=""
      label="DO"
      readonly=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      label="Common Data Class"
      readonly=""
    >
    </wizard-textfield>
    <wizard-divider>
    </wizard-divider>
    <wizard-textfield
      disabled=""
      label="monitorTi"
    >
    </wizard-textfield>
    <mwc-formfield label="[protocol104.wizard.monitorInverted]">
      <mwc-switch id="monitorInverted">
      </mwc-switch>
    </mwc-formfield>
    <mwc-formfield label="[protocol104.wizard.monitorCheck]">
      <mwc-switch id="monitorCheck">
      </mwc-switch>
    </mwc-formfield>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="add"
    label="[add]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for preparing 104 Address Creation show prepare 104 Address creation (single monitor TI only) looks like the latest snapshot */

snapshots["Wizards for preparing 104 Address Creation show prepare 104 Address creation (multi monitor TI only) looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.add]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      disabled=""
      label="IED"
      readonly=""
    >
    </wizard-textfield>
    <mwc-textarea
      cols="40"
      disabled=""
      label="LN(0)"
      readonly=""
      rows="2"
      value="AP1 / LD0 / GAPC-1"
    >
    </mwc-textarea>
    <wizard-textfield
      disabled=""
      label="DO"
      readonly=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      label="Common Data Class"
      readonly=""
    >
    </wizard-textfield>
    <wizard-divider>
    </wizard-divider>
    <wizard-select
      fixedmenuposition=""
      helper="[protocol104.wizard.monitorTiHelper]"
      label="monitorTi"
      required=""
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="30"
      >
        <span>
          30
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="39"
      >
        <span>
          39
        </span>
      </mwc-list-item>
    </wizard-select>
    <mwc-formfield label="[protocol104.wizard.monitorInverted]">
      <mwc-switch id="monitorInverted">
      </mwc-switch>
    </mwc-formfield>
    <mwc-formfield label="[protocol104.wizard.monitorCheck]">
      <mwc-switch id="monitorCheck">
      </mwc-switch>
    </mwc-formfield>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="add"
    label="[add]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for preparing 104 Address Creation show prepare 104 Address creation (multi monitor TI only) looks like the latest snapshot */

snapshots["Wizards for preparing 104 Address Creation show prepare 104 Address creation (single monitor TI with CtlModel) looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.add]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      disabled=""
      label="IED"
      readonly=""
    >
    </wizard-textfield>
    <mwc-textarea
      cols="40"
      disabled=""
      label="LN(0)"
      readonly=""
      rows="2"
      value="AP1 / LD0 / GGIO-1"
    >
    </mwc-textarea>
    <wizard-textfield
      disabled=""
      label="DO"
      readonly=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      label="Common Data Class"
      readonly=""
    >
    </wizard-textfield>
    <wizard-divider>
    </wizard-divider>
    <wizard-textfield
      disabled=""
      label="monitorTi"
    >
    </wizard-textfield>
    <mwc-formfield label="[protocol104.wizard.monitorInverted]">
      <mwc-switch id="monitorInverted">
      </mwc-switch>
    </mwc-formfield>
    <mwc-formfield label="[protocol104.wizard.monitorCheck]">
      <mwc-switch id="monitorCheck">
      </mwc-switch>
    </mwc-formfield>
    <wizard-divider>
    </wizard-divider>
    <wizard-textfield
      disabled=""
      label="ctlModel"
      readonly=""
    >
    </wizard-textfield>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="add"
    label="[add]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for preparing 104 Address Creation show prepare 104 Address creation (single monitor TI with CtlModel) looks like the latest snapshot */

snapshots["Wizards for preparing 104 Address Creation show prepare 104 Address creation (single monitor TI and single control TI with CtlModel) looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.add]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      disabled=""
      label="IED"
      readonly=""
    >
    </wizard-textfield>
    <mwc-textarea
      cols="40"
      disabled=""
      label="LN(0)"
      readonly=""
      rows="2"
      value="AP1 / LD0 / GGIO-1"
    >
    </mwc-textarea>
    <wizard-textfield
      disabled=""
      label="DO"
      readonly=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      label="Common Data Class"
      readonly=""
    >
    </wizard-textfield>
    <wizard-divider>
    </wizard-divider>
    <wizard-textfield
      disabled=""
      label="monitorTi"
    >
    </wizard-textfield>
    <mwc-formfield label="[protocol104.wizard.monitorInverted]">
      <mwc-switch id="monitorInverted">
      </mwc-switch>
    </mwc-formfield>
    <mwc-formfield label="[protocol104.wizard.monitorCheck]">
      <mwc-switch id="monitorCheck">
      </mwc-switch>
    </mwc-formfield>
    <wizard-divider>
    </wizard-divider>
    <wizard-textfield
      disabled=""
      label="ctlModel"
      readonly=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      label="controlTi"
    >
    </wizard-textfield>
    <mwc-formfield label="[protocol104.wizard.controlInverted]">
      <mwc-switch id="controlInverted">
      </mwc-switch>
    </mwc-formfield>
    <mwc-formfield label="[protocol104.wizard.controlCheck]">
      <mwc-switch id="controlCheck">
      </mwc-switch>
    </mwc-formfield>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="add"
    label="[add]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for preparing 104 Address Creation show prepare 104 Address creation (single monitor TI and single control TI with CtlModel) looks like the latest snapshot */

