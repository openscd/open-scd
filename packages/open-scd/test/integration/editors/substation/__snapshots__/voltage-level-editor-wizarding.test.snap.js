/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["voltage-level-editor wizarding integration looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[voltagelevel.wizard.title.edit]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      dialoginitialfocus=""
      helper="[voltagelevel.wizard.nameHelper]"
      label="name"
      required=""
      validationmessage="[textfield.required]"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[voltagelevel.wizard.descHelper]"
      label="desc"
      nullable=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[voltagelevel.wizard.nomFreqHelper]"
      label="nomFreq"
      nullable=""
      required=""
      suffix="Hz"
      validationmessage="[textfield.nonempty]"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[voltagelevel.wizard.numPhaseHelper]"
      label="numPhases"
      max="255"
      min="1"
      nullable=""
      required=""
      suffix="#"
      type="number"
      validationmessage="[textfield.nonempty]"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[voltagelevel.wizard.voltageHelper]"
      label="Voltage"
      nullable=""
      required=""
      unit="V"
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
    icon="edit"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot voltage-level-editor wizarding integration looks like the latest snapshot */

