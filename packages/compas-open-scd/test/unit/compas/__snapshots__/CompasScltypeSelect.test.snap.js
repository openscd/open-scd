/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots[
  'compas-scltype-select show-loading looks like the latest snapshot'
] = `<compas-loading>
</compas-loading>
`;
/* end snapshot compas-scltype-select show-loading looks like the latest snapshot */

snapshots[
  'compas-scltype-select no-items-in-list looks like the latest snapshot'
] = `<mwc-list>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    tabindex="0"
  >
    <i>
      [compas.noSclTypes]
    </i>
  </mwc-list-item>
</mwc-list>
`;
/* end snapshot compas-scltype-select no-items-in-list looks like the latest snapshot */

snapshots[
  'compas-scltype-select after-list-loaded looks like the latest snapshot'
] = `<mwc-select
  fixedmenuposition=""
  label="[compas.sclType]"
  naturalmenuwidth="true"
>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    role="option"
    tabindex="0"
    value="SED"
  >
    <span>
      System Exchange Description (SED)
    </span>
  </mwc-list-item>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    role="option"
    tabindex="-1"
    value="SSD"
  >
    <span>
      Substation Specification Description (SSD)
    </span>
  </mwc-list-item>
</mwc-select>
`;
/* end snapshot compas-scltype-select after-list-loaded looks like the latest snapshot */
