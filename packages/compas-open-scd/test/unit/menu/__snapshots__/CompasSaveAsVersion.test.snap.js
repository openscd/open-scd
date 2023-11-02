/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["compas-save-menu with no document loaded looks like the latest snapshot"] = 
`<mwc-dialog
  heading="[compas.save.saveAsVersionTitle]"
  id="compas-save-as-version-dlg"
>
  <compas-loading>
  </compas-loading>
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
/* end snapshot compas-save-menu with no document loaded looks like the latest snapshot */

snapshots["compas-save-menu with document loaded and no destination selected looks like the latest snapshot"] = 
`<mwc-dialog
  heading="[compas.save.saveAsVersionTitle]"
  id="compas-save-as-version-dlg"
>
  <compas-open>
  </compas-open>
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
/* end snapshot compas-save-menu with document loaded and no destination selected looks like the latest snapshot */

snapshots["compas-save-menu with document loaded and destination selected looks like the latest snapshot"] = 
`<mwc-dialog
  heading="[compas.save.saveAsVersionTitle]"
  id="compas-save-as-version-dlg"
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
/* end snapshot compas-save-menu with document loaded and destination selected looks like the latest snapshot */

