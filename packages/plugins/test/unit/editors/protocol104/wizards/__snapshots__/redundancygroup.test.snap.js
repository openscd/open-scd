/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for the Redundancy Group SCL element group include a create wizard that looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[protocol104.network.redundancyGroup.wizard.title.add]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      label="[protocol104.network.redundancyGroup.wizard.redundancyGroupNumberLabel]"
      readonly=""
      value="3"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[protocol104.network.connectedAp.wizard.wFactorHelper]"
      label="W-FACTOR"
      pattern="[1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-3][0-2][0-7][0-6][0-7]"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[protocol104.network.connectedAp.wizard.kFactorHelper]"
      label="K-FACTOR"
      pattern="[1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|[1-3][0-2][0-7][0-6][0-7]"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[protocol104.network.connectedAp.wizard.timeout0Helper]"
      label="TIMEOUT-0"
      pattern="[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[protocol104.network.connectedAp.wizard.timeout1Helper]"
      label="TIMEOUT-1"
      pattern="[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[protocol104.network.connectedAp.wizard.timeout2Helper]"
      label="TIMEOUT-2"
      pattern="[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[protocol104.network.connectedAp.wizard.timeout3Helper]"
      label="TIMEOUT-3"
      pattern="[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]"
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
  <mwc-button
    icon=""
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for the Redundancy Group SCL element group include a create wizard that looks like the latest snapshot */

