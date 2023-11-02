/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["compas-save-menu with no document loaded looks like the latest snapshot"] = 
`<mwc-dialog
  heading="[compas.save.saveAsTitle]"
  id="compas-save-as-dlg"
>
  <compas-loading>
  </compas-loading>
</mwc-dialog>
`;
/* end snapshot compas-save-menu with no document loaded looks like the latest snapshot */

snapshots["compas-save-menu with document loaded looks like the latest snapshot"] = 
`<mwc-dialog
  heading="[compas.save.saveAsTitle]"
  id="compas-save-as-dlg"
>
  <compas-save>
  </compas-save>
  <mwc-button
    icon="save"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
  <mwc-button
    dialogaction="close"
    icon=""
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot compas-save-menu with document loaded looks like the latest snapshot */

