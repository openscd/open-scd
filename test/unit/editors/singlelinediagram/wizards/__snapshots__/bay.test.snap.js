/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for SCL element Bay (X/Y) looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[bay.wizard.title.edit]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      dialoginitialfocus=""
      helper="[bay.wizard.nameHelper]"
      label="name"
      required=""
      validationmessage="[textfield.required]"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[bay.wizard.descHelper]"
      label="desc"
      nullable=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[sld.wizard.xCoordinateHelper]"
      label="xCoordinate"
      nullable=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[sld.wizard.yCoordinateHelper]"
      label="yCoordinate"
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
    icon="edit"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL element Bay (X/Y) looks like the latest snapshot */

