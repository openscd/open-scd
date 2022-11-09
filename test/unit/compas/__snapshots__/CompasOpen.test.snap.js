/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["compas-open When type needs to be selected looks like the latest snapshot"] = 
`<wizard-divider>
</wizard-divider>
<section>
  <h3>
    [compas.open.localTitle]
  </h3>
  <input
    accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd"
    hidden=""
    id="scl-file"
    required=""
    type="file"
  >
  <mwc-button label="[compas.open.selectFileButton]">
  </mwc-button>
</section>
<wizard-divider>
</wizard-divider>
<section>
  <h3>
    [compas.open.compasTitle]
  </h3>
  <p>
    [compas.open.listSclTypes]
  </p>
  <compas-scltype-list>
  </compas-scltype-list>
</section>
`;
/* end snapshot compas-open When type needs to be selected looks like the latest snapshot */

snapshots["compas-open When no local file can be selected looks like the latest snapshot"] = 
`<wizard-divider>
</wizard-divider>
<section>
  <h3>
    [compas.open.compasTitle]
  </h3>
  <p>
    [compas.open.listSclTypes]
  </p>
  <compas-scltype-list>
  </compas-scltype-list>
</section>
`;
/* end snapshot compas-open When no local file can be selected looks like the latest snapshot */

snapshots["compas-open When project needs to be selected looks like the latest snapshot"] = 
`<wizard-divider>
</wizard-divider>
<section>
  <h3>
    [compas.open.localTitle]
  </h3>
  <input
    accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd"
    hidden=""
    id="scl-file"
    required=""
    type="file"
  >
  <mwc-button label="[compas.open.selectFileButton]">
  </mwc-button>
</section>
<wizard-divider>
</wizard-divider>
<section>
  <h3>
    [compas.open.compasTitle]
  </h3>
  <p>
    [compas.open.listScls]
  </p>
  <compas-scl-list>
  </compas-scl-list>
  <mwc-button
    icon="arrow_back"
    id="reselect-type"
    label="[compas.open.otherTypeButton]"
  >
  </mwc-button>
</section>
`;
/* end snapshot compas-open When project needs to be selected looks like the latest snapshot */

