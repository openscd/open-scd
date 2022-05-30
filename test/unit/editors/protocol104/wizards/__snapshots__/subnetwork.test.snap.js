/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["SubNetwork 104 wizard include an create wizard that looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="close"
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
      pattern="([ -~]|[]|[ -퟿]|[-�])*"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[subnetwork.wizard.bitrateHelper]"
      label="BitRate"
      nullable=""
      pattern="[+-]?[0-9]+(([.][0-9]*)?|([.][0-9]+))"
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
    icon="add"
    label="[add]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot SubNetwork 104 wizard include an create wizard that looks like the latest snapshot */

