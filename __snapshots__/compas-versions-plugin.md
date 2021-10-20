# `compas-versions-plugin`

## `no-compas-document`

####   `looks like the latest snapshot`

```html
<mwc-list>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    tabindex="0"
  >
    <span style="color: var(--base1)">
      [compas.versions.noScls]
    </span>
  </mwc-list-item>
</mwc-list>
<wizard-dialog>
</wizard-dialog>

```

## `show-loading`

####   `looks like the latest snapshot`

```html
<compas-loading>
</compas-loading>
<wizard-dialog>
</wizard-dialog>

```

## `no-items-in-list`

####   `looks like the latest snapshot`

```html
<mwc-list>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    tabindex="0"
  >
    <span style="color: var(--base1)">
      [compas.versions.noScls]
    </span>
  </mwc-list-item>
</mwc-list>
<wizard-dialog>
</wizard-dialog>

```

## `items-in-list`

####   `looks like the latest snapshot`

```html
<h1>
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

```

