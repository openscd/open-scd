/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for SCL element Conducting Equipment (X/Y) looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="close"
  heading="[conductingequipment.wizard.title.edit]"
  open=""
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
`;
/* end snapshot Wizards for SCL element Conducting Equipment (X/Y) looks like the latest snapshot */

