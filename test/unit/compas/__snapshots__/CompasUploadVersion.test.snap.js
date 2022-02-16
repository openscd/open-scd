/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["compas-upload-version still determining if document exists in CoMPAS looks like the latest snapshot"] = 
`<compas-loading>
</compas-loading>
`;
/* end snapshot compas-upload-version still determining if document exists in CoMPAS looks like the latest snapshot */

snapshots["compas-upload-version existing document in compas through wizard looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="close"
  heading="[compas.uploadVersion.title]"
  open=""
>
  <div id="wizard-content">
    <compas-upload-version>
    </compas-upload-version>
  </div>
  <mwc-button
    dialogaction="close"
    label="[cancel]"
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
/* end snapshot compas-upload-version existing document in compas through wizard looks like the latest snapshot */

