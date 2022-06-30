/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["compas-upload-version still determining if document exists in CoMPAS looks like the latest snapshot"] = 
`<compas-loading>
</compas-loading>
`;
/* end snapshot compas-upload-version still determining if document exists in CoMPAS looks like the latest snapshot */

snapshots["compas-upload-version no document in compas (anymore) looks like the latest snapshot"] = 
`<mwc-list>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    tabindex="0"
  >
    [compas.notExists]
  </mwc-list-item>
</mwc-list>
`;
/* end snapshot compas-upload-version no document in compas (anymore) looks like the latest snapshot */

snapshots["compas-upload-version existing document in compas looks like the latest snapshot"] = 
`<input
  accept=".scd"
  hidden=""
  id="scl-file"
  required=""
  type="file"
>
<wizard-textfield
  id="filename"
  label="[compas.uploadVersion.filename]"
  readonly=""
  required=""
>
</wizard-textfield>
<mwc-button label="[compas.uploadVersion.selectButton]">
</mwc-button>
<compas-changeset-radiogroup>
</compas-changeset-radiogroup>
<compas-comment>
</compas-comment>
`;
/* end snapshot compas-upload-version existing document in compas looks like the latest snapshot */

snapshots["compas-upload-version existing document in compas through wizard looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[compas.uploadVersion.title]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <compas-upload-version>
    </compas-upload-version>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
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

