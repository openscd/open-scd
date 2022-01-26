/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Edit wizard for SCL element SMV include an edit wizard that looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="close"
  heading="[wizard.title.edit]"
  open=""
>
  <div id="wizard-content">
    <mwc-formfield label="[connectedap.wizard.addschemainsttype]">
      <mwc-checkbox id="instType">
      </mwc-checkbox>
    </mwc-formfield>
    <wizard-textfield
      label="MAC-Address"
      pattern="([0-9A-F]{2}-){5}[0-9A-F]{2}"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      label="APPID"
      pattern="[0-9A-F]{4}"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      label="VLAN-ID"
      nullable=""
      pattern="[0-9A-F]{3}"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      label="VLAN-PRIORITY"
      nullable=""
      pattern="[0-7]"
      required=""
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
/* end snapshot Edit wizard for SCL element SMV include an edit wizard that looks like the latest snapshot */

snapshots["Wizards for SCL element SMV include an edit wizard that looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="close"
  heading="[wizard.title.edit]"
  open=""
>
  <div id="wizard-content">
    <mwc-formfield label="[connectedap.wizard.addschemainsttype]">
      <mwc-checkbox id="instType">
      </mwc-checkbox>
    </mwc-formfield>
    <wizard-textfield
      label="MAC-Address"
      pattern="([0-9A-F]{2}-){5}[0-9A-F]{2}"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      label="APPID"
      pattern="[0-9A-F]{4}"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      label="VLAN-ID"
      nullable=""
      pattern="[0-9A-F]{3}"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      label="VLAN-PRIORITY"
      nullable=""
      pattern="[0-7]"
      required=""
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
/* end snapshot Wizards for SCL element SMV include an edit wizard that looks like the latest snapshot */

