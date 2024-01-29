/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for SCL element SubNetwork include an edit wizard that with existing BitRate child element looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.edit]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
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
      disabled=""
      helper="[subnetwork.wizard.descHelper]"
      label="desc"
      nullable=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[subnetwork.wizard.typeHelper]"
      label="type"
      nullable=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[subnetwork.wizard.bitrateHelper]"
      label="BitRate"
      nullable=""
      required=""
      unit="b/s"
      validationmessage="[textfield.nonempty]"
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
    icon="save"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL element SubNetwork include an edit wizard that with existing BitRate child element looks like the latest snapshot */

snapshots["Wizards for SCL element SubNetwork include an edit wizard that with missing BitRate child element looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.edit]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
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
      disabled=""
      helper="[subnetwork.wizard.descHelper]"
      label="desc"
      nullable=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[subnetwork.wizard.typeHelper]"
      label="type"
      nullable=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[subnetwork.wizard.bitrateHelper]"
      label="BitRate"
      nullable=""
      required=""
      unit="b/s"
      validationmessage="[textfield.nonempty]"
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
    icon="save"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL element SubNetwork include an edit wizard that with missing BitRate child element looks like the latest snapshot */

snapshots["Wizards for SCL element SubNetwork include an create wizard that looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.add]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
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
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[subnetwork.wizard.bitrateHelper]"
      label="BitRate"
      nullable=""
      required=""
      unit="b/s"
      validationmessage="[textfield.nonempty]"
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
/* end snapshot Wizards for SCL element SubNetwork include an create wizard that looks like the latest snapshot */

