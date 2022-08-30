/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for SCL element DAI create DAI with existing Val Element looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[dai.wizard.title.create]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      helper="[dai.wizard.valueHelper]"
      id="Val"
      label="Val"
      max="255"
      min="0"
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      id="daVal"
      label="DA Template Value"
      readonly=""
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
/* end snapshot Wizards for SCL element DAI create DAI with existing Val Element looks like the latest snapshot */

snapshots["Wizards for SCL element DAI create DAI without Val Element looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[dai.wizard.title.create]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      id="ValDate"
      label="Val (Date)"
      type="date"
    >
    </wizard-textfield>
    <wizard-textfield
      id="ValTime"
      label="Val (Time)"
      step="1"
      type="time"
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
/* end snapshot Wizards for SCL element DAI create DAI without Val Element looks like the latest snapshot */

snapshots["Wizards for SCL element DAI edit existing DAI with Val Element looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[dai.wizard.title.edit]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      helper="[dai.wizard.valueHelper]"
      id="Val"
      label="Val"
      max="255"
      min="0"
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      id="daVal"
      label="DA Template Value"
      readonly=""
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
/* end snapshot Wizards for SCL element DAI edit existing DAI with Val Element looks like the latest snapshot */

snapshots["Wizards for SCL element DAI edit existing DAI without Val Element looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[dai.wizard.title.edit]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-select
      fixedmenuposition=""
      id="Val"
      label="val"
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="on"
      >
        on
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="blocked"
      >
        blocked
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="test"
      >
        test
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="test/blocked"
      >
        test/blocked
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="off"
      >
        off
      </mwc-list-item>
    </wizard-select>
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
/* end snapshot Wizards for SCL element DAI edit existing DAI without Val Element looks like the latest snapshot */

