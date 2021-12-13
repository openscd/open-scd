/* @web/test-runner snapshot v1 */
export const snapshots = {};

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

