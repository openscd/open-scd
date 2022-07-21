/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["compas-compare-dialog renderDiff child is added, so check latest snapshot"] = 
`<div>
  <mwc-list multi="">
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      twoline=""
    >
      <span class="resultTitle">
        [compare.children]
      </span>
      <span slot="secondary">
        Substation 1>S1 30kV
      </span>
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="0"
      twoline=""
    >
      <span>
        Bay
      </span>
      <span slot="secondary">
        Substation 1>S1 30kV>BUSBAR12
      </span>
      <mwc-icon slot="meta">
        delete
      </mwc-icon>
    </mwc-list-item>
  </mwc-list>
</div>
`;
/* end snapshot compas-compare-dialog renderDiff child is added, so check latest snapshot */

snapshots["compas-compare-dialog renderDiff child is removed and attribute added/removed/updated, so check latest snapshot"] = 
`<div>
  <mwc-list multi="">
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      twoline=""
    >
      <span class="resultTitle">
        [compare.attributes]
      </span>
      <span slot="secondary">
        Substation 1>S1 110kV
      </span>
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="0"
      twoline=""
    >
      <span>
        desc
      </span>
      <span slot="secondary">
        Extra Voltage Level
      </span>
      <mwc-icon slot="meta">
        delete
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      twoline=""
    >
      <span class="resultTitle">
        [compare.children]
      </span>
      <span slot="secondary">
        Substation 1>S1 110kV
      </span>
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      twoline=""
    >
      <span>
        Bay
      </span>
      <span slot="secondary">
        Substation 1>S1 110kV>BAY_T3_1
      </span>
      <mwc-icon slot="meta">
        add
      </mwc-icon>
    </mwc-list-item>
  </mwc-list>
  <mwc-list multi="">
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      twoline=""
    >
      <span class="resultTitle">
        [compare.attributes]
      </span>
      <span slot="secondary">
        Substation 1>S1 110kV>BUSBAR6
      </span>
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="0"
      twoline=""
    >
      <span>
        desc
      </span>
      <span slot="secondary">
        Busbar 6
      </span>
      <mwc-icon slot="meta">
        add
      </mwc-icon>
    </mwc-list-item>
  </mwc-list>
  <mwc-list multi="">
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      twoline=""
    >
      <span class="resultTitle">
        [compare.attributes]
      </span>
      <span slot="secondary">
        Substation 1>S1 110kV>BAY_L1_0
      </span>
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="0"
      twoline=""
    >
      <span>
        desc
      </span>
      <span slot="secondary">
        First Bay
                  ↶
                  First Bays
      </span>
      <mwc-icon slot="meta">
        edit
      </mwc-icon>
    </mwc-list-item>
  </mwc-list>
</div>
`;
/* end snapshot compas-compare-dialog renderDiff child is removed and attribute added/removed/updated, so check latest snapshot */

