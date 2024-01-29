/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["wizard-dialog with user defined menu actions set looks like its snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="Page 1"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 48px)"
>
  <nav>
    <mwc-icon-button icon="more_vert">
    </mwc-icon-button>
    <mwc-menu
      class="actions-menu"
      corner="BOTTOM_RIGHT"
      menucorner="END"
    >
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        role="menuitem"
        tabindex="-1"
      >
        <span>
          remove
        </span>
        <mwc-icon slot="graphic">
          delete
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        role="menuitem"
        tabindex="-1"
      >
        <span>
          remove
        </span>
        <mwc-icon slot="graphic">
          delete
        </mwc-icon>
      </mwc-list-item>
    </mwc-menu>
  </nav>
  <div id="wizard-content">
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
/* end snapshot wizard-dialog with user defined menu actions set looks like its snapshot */

snapshots["wizard-dialog with a nonempty wizard property in pro mode looks like its snapshot"] = 
`<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot wizard-dialog with a nonempty wizard property in pro mode looks like its snapshot */

snapshots["wizard-dialog with a nonempty wizard property in pro mode switches to code editor view on code toggle button click"] = 
`<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot wizard-dialog with a nonempty wizard property in pro mode switches to code editor view on code toggle button click */

snapshots["wizard-dialog with content definition throught WizardInputs for a specific WizardInput of the kind Checkbox the dom looks like the latest snapshot"] = 
`<wizard-checkbox
  defaultchecked=""
  label="myLabel"
  nullable=""
>
</wizard-checkbox>
`;
/* end snapshot wizard-dialog with content definition throught WizardInputs for a specific WizardInput of the kind Checkbox the dom looks like the latest snapshot */

snapshots["wizard-dialog with content definition throught WizardInputs for another WizardInputs of the kind Checkbox the dom looks like the latest snapshot"] = 
`<wizard-checkbox
  label="myLabel"
  nullable=""
>
</wizard-checkbox>
`;
/* end snapshot wizard-dialog with content definition throught WizardInputs for another WizardInputs of the kind Checkbox the dom looks like the latest snapshot */

snapshots["wizard-dialog with content definition throught WizardInputs for a specific WizardInput of the kind Select the dom looks like the latest snapshot"] = 
`<wizard-select label="myLabel">
  <mwc-list-item
    activated=""
    aria-disabled="false"
    aria-selected="true"
    mwc-list-item=""
    role="option"
    selected=""
    tabindex="0"
    value="multi1"
  >
    multi1
  </mwc-list-item>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    role="option"
    tabindex="-1"
    value="multi2"
  >
    multi2
  </mwc-list-item>
</wizard-select>
`;
/* end snapshot wizard-dialog with content definition throught WizardInputs for a specific WizardInput of the kind Select the dom looks like the latest snapshot */

snapshots["wizard-dialog with content definition throught WizardInputs for a specific WizardInput of the kind TextField the dom looks like the latest snapshot"] = 
`<wizard-textfield
  disabled=""
  label="myLabel"
  nullable=""
>
</wizard-textfield>
`;
/* end snapshot wizard-dialog with content definition throught WizardInputs for a specific WizardInput of the kind TextField the dom looks like the latest snapshot */

