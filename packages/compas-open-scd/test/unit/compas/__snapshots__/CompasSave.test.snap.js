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

snapshots["compas-save when not allowed to save it to a local file looks like the latest snapshot"] = 
`<wizard-divider>
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
/* end snapshot compas-save when not allowed to save it to a local file looks like the latest snapshot */

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

