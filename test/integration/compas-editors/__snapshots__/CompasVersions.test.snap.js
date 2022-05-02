/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["compas-versions-plugin no-compas-document looks like the latest snapshot"] = 
`<mwc-list>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    tabindex="0"
  >
    <span style="color: var(--base1)">
      [compas.noSclVersions]
    </span>
  </mwc-list-item>
</mwc-list>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot compas-versions-plugin no-compas-document looks like the latest snapshot */

snapshots["compas-versions-plugin show-loading looks like the latest snapshot"] = 
`<compas-loading>
</compas-loading>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot compas-versions-plugin show-loading looks like the latest snapshot */

snapshots["compas-versions-plugin no-items-in-list looks like the latest snapshot"] = 
`<mwc-list>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    tabindex="0"
  >
    <span style="color: var(--base1)">
      [compas.noSclVersions]
    </span>
  </mwc-list-item>
</mwc-list>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot compas-versions-plugin no-items-in-list looks like the latest snapshot */

snapshots["compas-versions-plugin items-in-list looks like the latest snapshot"] = 
`<h1>
  [compas.versions.sclInfo]
  <nav>
    <abbr title="[compas.versions.addVersionButton]">
      <mwc-icon-button icon="playlist_add">
      </mwc-icon-button>
    </abbr>
  </nav>
  <nav>
    <abbr title="[compas.versions.deleteProjectButton]">
      <mwc-icon-button icon="delete_forever">
      </mwc-icon-button>
    </abbr>
  </nav>
  <nav>
    <abbr title="[edit]">
      <mwc-icon-button icon="edit">
      </mwc-icon-button>
    </abbr>
  </nav>
</h1>
<div id="containerCompasVersions">
  <section tabindex="0">
    <h1>
      [compas.versions.title]
    </h1>
    <mwc-list multi="">
      <mwc-check-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        tabindex="0"
        value="1.0.0"
      >
        demo_station1 (1.0.0)
        <span slot="graphic">
          <mwc-icon>
            restore
          </mwc-icon>
          <mwc-icon>
            delete
          </mwc-icon>
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        tabindex="-1"
        value="2.0.0"
      >
        demo_station1 (2.0.0)
        <span slot="graphic">
          <mwc-icon>
            restore
          </mwc-icon>
          <mwc-icon>
            delete
          </mwc-icon>
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        tabindex="-1"
        value="2.1.0"
      >
        3b572a56-51cc-479b-97fd-e404ebf9ae67 (2.1.0)
        <span slot="graphic">
          <mwc-icon>
            restore
          </mwc-icon>
        </span>
      </mwc-check-list-item>
    </mwc-list>
  </section>
  <mwc-fab
    extended=""
    icon="compare"
    label="[compas.versions.compareCurrentButton]"
  >
  </mwc-fab>
  <mwc-fab
    extended=""
    icon="compare"
    label="[compas.versions.compareButton]"
  >
  </mwc-fab>
</div>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot compas-versions-plugin items-in-list looks like the latest snapshot */

