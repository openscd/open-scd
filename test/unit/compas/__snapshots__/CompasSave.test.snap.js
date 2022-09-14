/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["compas-save still determining if document exists in CoMPAS looks like the latest snapshot"] = 
`<wizard-divider>
</wizard-divider>
<section>
  <h3>
    [compas.save.localTitle]
  </h3>
  <mwc-button label="[compas.save.saveFileButton]">
  </mwc-button>
</section>
<wizard-divider>
</wizard-divider>
<section>
  <h3>
    [compas.save.compasTitle]
  </h3>
  <compas-loading>
  </compas-loading>
</section>
<wizard-divider>
</wizard-divider>
<section>
  <h3>
    [compas.save.labelsTitle]
  </h3>
  <compas-labels-field>
  </compas-labels-field>
</section>
`;
/* end snapshot compas-save still determining if document exists in CoMPAS looks like the latest snapshot */

snapshots["compas-save new document in compas looks like the latest snapshot"] = 
`<wizard-divider>
</wizard-divider>
<section>
  <h3>
    [compas.save.localTitle]
  </h3>
  <mwc-button label="[compas.save.saveFileButton]">
  </mwc-button>
</section>
<wizard-divider>
</wizard-divider>
<section>
  <h3>
    [compas.save.compasTitle]
  </h3>
  <div id="content">
    <mwc-textfield
      dialoginitialfocus=""
      id="name"
      label="[scl.name]"
      required=""
      value="station123"
    >
    </mwc-textfield>
    <compas-scltype-select>
    </compas-scltype-select>
    <compas-comment>
    </compas-comment>
  </div>
</section>
<wizard-divider>
</wizard-divider>
<section>
  <h3>
    [compas.save.labelsTitle]
  </h3>
  <compas-labels-field>
  </compas-labels-field>
</section>
`;
/* end snapshot compas-save new document in compas looks like the latest snapshot */

snapshots["compas-save existing document in compas looks like the latest snapshot"] = 
`<wizard-divider>
</wizard-divider>
<section>
  <h3>
    [compas.save.localTitle]
  </h3>
  <mwc-button label="[compas.save.saveFileButton]">
  </mwc-button>
</section>
<wizard-divider>
</wizard-divider>
<section>
  <h3>
    [compas.save.compasTitle]
  </h3>
  <div id="content">
    <compas-changeset-radiogroup>
    </compas-changeset-radiogroup>
    <compas-comment>
    </compas-comment>
  </div>
</section>
<wizard-divider>
</wizard-divider>
<section>
  <h3>
    [compas.save.labelsTitle]
  </h3>
  <compas-labels-field>
  </compas-labels-field>
</section>
`;
/* end snapshot compas-save existing document in compas looks like the latest snapshot */

snapshots["compas-labels-field with no labels in private section looks like the latest snapshot"] = 
`<div style="display: flex; flex-direction: row;">
  <div style="flex: auto;">
    <wizard-textfield
      id="newLabel"
      label="[compas.newLabel]"
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
      Label 1
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

