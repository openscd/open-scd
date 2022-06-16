/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for the Logic Link SCL element group include a create wizard that looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[protocol104.network.logicLink.wizard.title.add]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      label="[protocol104.network.logicLink.wizard.logicLinkNumberLabel]"
      readonly=""
      value="3"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[protocol104.network.connectedAp.wizard.ipHelper]"
      label="IP"
      pattern="([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[protocol104.network.connectedAp.wizard.ipSubnetHelper]"
      label="IP-SUBNET"
      pattern="([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])[.]([0-9]{1,2}|1[0-9]{2}|2[0-4][0-9]|25[0-5])"
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
/* end snapshot Wizards for the Logic Link SCL element group include a create wizard that looks like the latest snapshot */

