/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["compas-scl-list when list still needs to be loaded looks like the latest snapshot"] = 
`<compas-loading>
</compas-loading>
`;
/* end snapshot compas-scl-list when list still needs to be loaded looks like the latest snapshot */

snapshots["compas-scl-list when there are no items found in CoMPAS looks like the latest snapshot"] = 
`<mwc-list>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    tabindex="0"
  >
    <i>
      [compas.noScls]
    </i>
  </mwc-list-item>
</mwc-list>
`;
/* end snapshot compas-scl-list when there are no items found in CoMPAS looks like the latest snapshot */

snapshots["compas-scl-list when there are items without labels looks like the latest snapshot"] = 
`<div class="filters">
  <span>
    [compas.sclFilter]
  </span>
  <oscd-filter-button
    disabled=""
    id="labelsFilter"
    multi="true"
  >
    <span slot="icon">
      <mwc-icon>
        label_off
      </mwc-icon>
    </span>
  </oscd-filter-button>
</div>
<filtered-list>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    tabindex="0"
  >
    Station-Utrecht-0001 (2.1.0)
  </mwc-list-item>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    tabindex="-1"
  >
    Station-Utrecht-0002 (1.3.0)
  </mwc-list-item>
</filtered-list>
`;
/* end snapshot compas-scl-list when there are items without labels looks like the latest snapshot */

snapshots["compas-scl-list when there are items with labels when filtering on labels only 1 item is shown"] = 
`<div class="filters">
  <span>
    [compas.sclFilter]
  </span>
  <oscd-filter-button
    id="labelsFilter"
    multi="true"
  >
    <span slot="icon">
      <mwc-icon>
        label
      </mwc-icon>
    </span>
    <mwc-check-list-item
      aria-disabled="false"
      graphic="control"
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="Amsterdam"
    >
      Amsterdam
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      graphic="control"
      mwc-list-item=""
      tabindex="-1"
      value="Netherlands"
    >
      Netherlands
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      graphic="control"
      mwc-list-item=""
      tabindex="0"
      value="Utrecht"
    >
      Utrecht
    </mwc-check-list-item>
  </oscd-filter-button>
</div>
<filtered-list>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    tabindex="0"
  >
    Station-Amsterdam-0001 (1.3.0)
  </mwc-list-item>
</filtered-list>
`;
/* end snapshot compas-scl-list when there are items with labels when filtering on labels only 1 item is shown */

snapshots["compas-scl-list when there are items with labels when filtering on labels and all items are hidden"] = 
`<div class="filters">
  <span>
    [compas.sclFilter]
  </span>
  <oscd-filter-button
    id="labelsFilter"
    multi="true"
  >
    <span slot="icon">
      <mwc-icon>
        label
      </mwc-icon>
    </span>
    <mwc-check-list-item
      aria-disabled="false"
      graphic="control"
      mwc-list-item=""
      tabindex="-1"
      value="Amsterdam"
    >
      Amsterdam
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      graphic="control"
      mwc-list-item=""
      tabindex="-1"
      value="Netherlands"
    >
      Netherlands
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      graphic="control"
      mwc-list-item=""
      tabindex="0"
      value="Utrecht"
    >
      Utrecht
    </mwc-check-list-item>
  </oscd-filter-button>
</div>
<mwc-list>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    tabindex="0"
  >
    <i>
      [compas.noFilteredScls]
    </i>
  </mwc-list-item>
</mwc-list>
`;
/* end snapshot compas-scl-list when there are items with labels when filtering on labels and all items are hidden */

snapshots["compas-scl-list when there are items with labels looks like the latest snapshot"] = 
`<div class="filters">
  <span>
    [compas.sclFilter]
  </span>
  <oscd-filter-button
    id="labelsFilter"
    multi="true"
  >
    <span slot="icon">
      <mwc-icon>
        label_off
      </mwc-icon>
    </span>
    <mwc-check-list-item
      aria-disabled="false"
      graphic="control"
      mwc-list-item=""
      selected=""
      tabindex="0"
      value="Amsterdam"
    >
      Amsterdam
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      graphic="control"
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="Netherlands"
    >
      Netherlands
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      graphic="control"
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="Utrecht"
    >
      Utrecht
    </mwc-check-list-item>
  </oscd-filter-button>
</div>
<filtered-list>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    tabindex="0"
  >
    Station-Utrecht-0001 (2.1.0)
  </mwc-list-item>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    tabindex="-1"
  >
    Station-Amsterdam-0001 (1.3.0)
  </mwc-list-item>
</filtered-list>
`;
/* end snapshot compas-scl-list when there are items with labels looks like the latest snapshot */

