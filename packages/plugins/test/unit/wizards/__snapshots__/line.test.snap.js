/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for SCL Line element define an edit wizard that looks like the the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[line.wizard.title.edit]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      dialoginitialfocus=""
      helper="[line.wizard.nameHelper]"
      label="name"
      required=""
      validationmessage="[textfield.required]"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[line.wizard.descHelper]"
      label="desc"
      nullable=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[line.wizard.typeHelper]"
      label="type"
      nullable=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[voltagelevel.wizard.nomFreqHelper]"
      label="nomFreq"
      nullable=""
      pattern="[+]?[0-9]+(([.][0-9]*)?|([.][0-9]+))"
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
      suffix="#"
      type="number"
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
/* end snapshot Wizards for SCL Line element define an edit wizard that looks like the the latest snapshot */

snapshots["Wizards for SCL Line element define a create wizard that looks like the the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.add]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      dialoginitialfocus=""
      helper="[line.wizard.nameHelper]"
      label="name"
      required=""
      validationmessage="[textfield.required]"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[line.wizard.descHelper]"
      label="desc"
      nullable=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[line.wizard.typeHelper]"
      label="type"
      nullable=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[voltagelevel.wizard.nomFreqHelper]"
      label="nomFreq"
      nullable=""
      pattern="[+]?[0-9]+(([.][0-9]*)?|([.][0-9]+))"
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
      suffix="#"
      type="number"
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
/* end snapshot Wizards for SCL Line element define a create wizard that looks like the the latest snapshot */

