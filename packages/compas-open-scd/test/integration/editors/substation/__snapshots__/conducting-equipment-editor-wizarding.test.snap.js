/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["conducting-equipment-editor wizarding integration looks like the latest snapshot"] = 
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
        Circuit Breaker
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
      helper="[conductingequipment.wizard.descHelper]"
      label="desc"
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
/* end snapshot conducting-equipment-editor wizarding integration looks like the latest snapshot */

