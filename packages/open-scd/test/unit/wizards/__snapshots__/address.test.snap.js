/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["address renderGseSmvAddress looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="title"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
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
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot address renderGseSmvAddress looks like the latest snapshot */

