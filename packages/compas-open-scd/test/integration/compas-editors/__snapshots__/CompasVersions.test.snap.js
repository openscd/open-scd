/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["compas-versions-plugin no-compas-document looks like the latest snapshot"] = 
`<mwc-list>
  <mwc-list-item
    aria-disabled="false"
    id="no-scl-versions"
    mwc-list-item=""
    tabindex="0"
  >
    <span>
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
    id="no-scl-versions"
    mwc-list-item=""
    tabindex="0"
  >
    <span>
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
        twoline=""
        value="1.0.0"
      >
        <span>
          demo_station1 (Version: 1.0.0)
        </span>
        <span slot="secondary">
          Who: "Mr Editor", When: "2021-11-22T03:47:00+01:00", What:
        "SCL created, test configuration for station 0001"
        </span>
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
        twoline=""
        value="2.0.0"
      >
        <span>
          demo_station1 (Version: 2.0.0)
        </span>
        <span slot="secondary">
          Who: "Mr Editor", When: "2021-11-22T03:47:16+01:00", What:
        "SCL updated, Updated the Station with breakers"
        </span>
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
        twoline=""
        value="2.1.0"
      >
        <span>
          3b572a56-51cc-479b-97fd-e404ebf9ae67 (Version: 2.1.0)
        </span>
        <span slot="secondary">
          Who: "Mr Editor", When: "2021-11-22T03:47:18+01:00", What:
        "SCL updated, Updated the Station with breakers"
        </span>
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
<mwc-dialog
  heading="undefined"
  id="compareDialog"
>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot compas-versions-plugin items-in-list looks like the latest snapshot */

