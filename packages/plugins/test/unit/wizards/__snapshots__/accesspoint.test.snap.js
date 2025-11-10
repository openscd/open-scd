/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for SCL element AccessPoint edit AccessPoint looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[accesspoint.wizard.title.edit]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      dialoginitialfocus=""
      helper="[accesspoint.wizard.nameHelper]"
      label="name"
      required=""
      validationmessage="[textfield.required]"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[accesspoint.wizard.descHelper]"
      label="desc"
      nullable=""
      pattern="([ -~]|[]|[ -퟿]|[-�])*"
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
/* end snapshot Wizards for SCL element AccessPoint edit AccessPoint looks like the latest snapshot */

snapshots["Wizards for SCL element AccessPoint remove AccessPoint with references looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[accesspoint.wizard.title.delete]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <section>
      <h3 style="margin: 0;">
        [accesspoint.wizard.title.references]
      </h3>
      <mwc-list>
        <mwc-list-item
          aria-disabled="false"
          noninteractive=""
          tabindex="-1"
          twoline=""
        >
          <span>
            ServerAt
          </span>
          <span slot="secondary">
            test>AP2
          </span>
        </mwc-list-item>
      </mwc-list>
    </section>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="delete"
    label="[remove]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL element AccessPoint remove AccessPoint with references looks like the latest snapshot */

