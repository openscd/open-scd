/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["add-ldevice-dialog looks like the latest snapshot"] = 
`<mwc-dialog
  heading="[iededitor.addLDeviceDialog.title]"
  id="addLDeviceDialog"
  open=""
>
  <div class="dialog-content">
    <mwc-textfield
      autovalidate=""
      dialoginitialfocus=""
      helper="[iededitor.addLDeviceDialog.inst]"
      label="[iededitor.addLDeviceDialog.inst]"
      maxlength="64"
      pattern="[A-Za-z0-9][0-9A-Za-z_]*"
      required=""
      style="width: 100%;"
    >
    </mwc-textfield>
  </div>
  <mwc-button
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
    [close]
  </mwc-button>
  <mwc-button
    disabled=""
    icon="add"
    slot="primaryAction"
    trailingicon=""
  >
    [add]
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot add-ldevice-dialog looks like the latest snapshot */

