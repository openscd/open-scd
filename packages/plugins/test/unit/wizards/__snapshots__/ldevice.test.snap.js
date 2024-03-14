/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for SCL element LDevice Allowing/Disallowing ldName editing looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[ldevice.wizard.title.edit]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      disabled=""
      helper="[ldevice.wizard.noNameSupportHelper]"
      helperpersistent=""
      label="ldName"
      readonly=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[ldevice.wizard.descHelper]"
      label="desc"
      nullable=""
      pattern="([ -~]|[]|[ -퟿]|[-�])*"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      label="ldInst"
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
    icon="edit"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL element LDevice Allowing/Disallowing ldName editing looks like the latest snapshot */

