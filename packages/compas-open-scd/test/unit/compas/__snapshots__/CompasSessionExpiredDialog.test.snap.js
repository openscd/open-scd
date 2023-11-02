/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["compas-session-expired-dialog when no document is loaded looks like the latest snapshot"] = 
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
/* end snapshot compas-session-expired-dialog when no document is loaded looks like the latest snapshot */

snapshots["compas-session-expired-dialog when a document is loaded looks like the latest snapshot"] = 
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
/* end snapshot compas-session-expired-dialog when a document is loaded looks like the latest snapshot */

