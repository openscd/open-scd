/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["compas-labels-field with no labels in private section looks like the latest snapshot"] = 
`<div style="display: flex; flex-direction: row;">
  <div style="flex: auto;">
    <wizard-textfield
      id="newLabel"
      label="[compas.newLabel]"
      pattern="[A-Za-z][0-9A-Za-z_-]*"
      required=""
    >
    </wizard-textfield>
  </div>
  <div style="display: flex; align-items: center; height: 56px;">
    <mwc-icon-button icon="new_label">
    </mwc-icon-button>
  </div>
</div>
<mwc-list>
</mwc-list>
`;
/* end snapshot compas-labels-field with no labels in private section looks like the latest snapshot */

snapshots["compas-labels-field with labels in private section looks like the latest snapshot"] = 
`<div style="display: flex; flex-direction: row;">
  <div style="flex: auto;">
    <wizard-textfield
      id="newLabel"
      label="[compas.newLabel]"
      pattern="[A-Za-z][0-9A-Za-z_-]*"
      required=""
    >
    </wizard-textfield>
  </div>
  <div style="display: flex; align-items: center; height: 56px;">
    <mwc-icon-button icon="new_label">
    </mwc-icon-button>
  </div>
</div>
<mwc-list>
  <mwc-list-item
    aria-disabled="false"
    graphic="icon"
    hasmeta=""
    mwc-list-item=""
    tabindex="0"
  >
    <span>
      Label1
    </span>
    <mwc-icon slot="graphic">
      label
    </mwc-icon>
    <mwc-icon-button
      icon="delete"
      slot="meta"
    >
    </mwc-icon-button>
  </mwc-list-item>
</mwc-list>
`;
/* end snapshot compas-labels-field with labels in private section looks like the latest snapshot */

