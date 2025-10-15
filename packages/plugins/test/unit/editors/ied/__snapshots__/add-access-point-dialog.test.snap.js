/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["add-access-point-dialog looks like the latest snapshot"] = 
`<mwc-dialog
  heading="[iededitor.addAccessPointDialog.title]"
  id="createAccessPointDialog"
  open=""
>
  <div class="dialog-content">
    <mwc-textfield
      autovalidate=""
      dialoginitialfocus=""
      helper="[iededitor.addAccessPointDialog.apName]"
      id="apName"
      label="[iededitor.addAccessPointDialog.apName]"
      maxlength="32"
      pattern="[A-Za-z0-9][0-9A-Za-z_]*"
      required=""
      style="width: 100%; margin-bottom: 16px;"
    >
    </mwc-textfield>
    <mwc-formfield label="[iededitor.addAccessPointDialog.createServerAt]">
      <mwc-switch>
      </mwc-switch>
    </mwc-formfield>
  </div>
  <mwc-button
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
    [close]
  </mwc-button>
  <mwc-button
    data-testid="add-access-point-button"
    disabled=""
    icon="add"
    slot="primaryAction"
    trailingicon=""
  >
    [add]
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot add-access-point-dialog looks like the latest snapshot */

