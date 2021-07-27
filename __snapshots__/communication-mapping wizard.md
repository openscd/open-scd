# `communication-mapping wizard`

#### `looks like the latest snapshot`

```html
<mwc-dialog
  defaultaction="close"
  heading="[commMap.title]"
  open=""
>
  <div id="wizard-content">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        hasmeta=""
        mwc-list-item=""
        tabindex="0"
        twoline=""
      >
        <span>
          IED2
          <mwc-icon style="--mdc-icon-size: 1em;">
            trending_flat
          </mwc-icon>
          IED1
        </span>
        <span slot="secondary">
          CBSW> XSWI 2>ReportCb
        </span>
        <span
          slot="meta"
          style="padding-left: 10px"
        >
          4
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          IED3
          <mwc-icon style="--mdc-icon-size: 1em;">
            trending_flat
          </mwc-icon>
          IED1
        </span>
        <span slot="secondary">
          MU01>MSVCB01
        </span>
        <span
          slot="meta"
          style="padding-left: 10px"
        >
          14
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          IED2
          <mwc-icon style="--mdc-icon-size: 1em;">
            trending_flat
          </mwc-icon>
          IED1
        </span>
        <span slot="secondary">
          CBSW>GCB
        </span>
        <span
          slot="meta"
          style="padding-left: 10px"
        >
          2
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          IED1
          <mwc-icon style="--mdc-icon-size: 1em;">
            trending_flat
          </mwc-icon>
          IED2
        </span>
        <span slot="secondary">
          CircuitBreaker_CB1>GCB
        </span>
        <span
          slot="meta"
          style="padding-left: 10px"
        >
          4
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-list-item>
    </filtered-list>
  </div>
  <mwc-button
    dialogaction="close"
    label="[cancel]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    dialoginitialfocus=""
    icon="add"
    label="[commMap.connectCB]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>

```

