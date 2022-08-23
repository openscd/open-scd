/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["compas-session Dialog when almost expired looks like the latest snapshot"] = 
`<mwc-dialog
  heading="[compas.session.headingExpiring]"
  id="compasSessionExpiringDialog"
  scrimclickaction=""
>
  <div>
    [compas.session.explainExpiring]
  </div>
  <mwc-button
    dialogaction="close"
    slot="primaryAction"
  >
    [compas.session.continue]
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot compas-session Dialog when almost expired looks like the latest snapshot */

snapshots["compas-session Dialog when expired without document looks like the latest snapshot"] = 
`<mwc-dialog
  "=""
  escapekeyaction=""
  heading="[compas.session.headingExpired]"
  id="compasSessionExpiredDialog"
  scrimclickaction=""
>
  <div>
    [compas.session.explainExpiredWithoutProject]
  </div>
</mwc-dialog>
`;
/* end snapshot compas-session Dialog when expired without document looks like the latest snapshot */

snapshots["compas-session Dialog when expired with document looks like the latest snapshot"] = 
`<mwc-dialog
  "=""
  escapekeyaction=""
  heading="[compas.session.headingExpired]"
  id="compasSessionExpiredDialog"
  scrimclickaction=""
>
  <div>
    [compas.session.explainExpiredWithProject]
  </div>
  <mwc-button slot="primaryAction">
    [compas.session.saveProject]
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot compas-session Dialog when expired with document looks like the latest snapshot */

