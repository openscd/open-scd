/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for SCL element Conducting Equipment (X/Y) looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[conductingequipment.wizard.title.edit]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <mwc-select
      disabled=""
      helper="[conductingequipment.wizard.typeHelper]"
      label="type"
      validationmessage="[textfield.required]"
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        selected=""
        tabindex="-1"
        value="0"
      >
        Disconnector
      </mwc-list-item>
    </mwc-select>
    <wizard-textfield
      dialoginitialfocus=""
      helper="[conductingequipment.wizard.nameHelper]"
      label="name"
      required=""
      validationmessage="[textfield.required]"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[conductingequipment.wizard.descHelper]"
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
/* end snapshot Wizards for SCL element Conducting Equipment (X/Y) looks like the latest snapshot */

