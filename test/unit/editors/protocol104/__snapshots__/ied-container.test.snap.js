/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["ied-104-container - IED with DAI Elements looks like the latest snapshot"] = 
`<action-pane tabindex="0">
  <mwc-icon slot="icon">
    developer_board
  </mwc-icon>
  <abbr
    slot="action"
    title="[protocol104.toggleChildElements]"
  >
    <mwc-icon-button-toggle
      id="toggleButton"
      officon="keyboard_arrow_down"
      on=""
      onicon="keyboard_arrow_up"
    >
    </mwc-icon-button-toggle>
  </abbr>
  <filtered-list id="dailist">
    <mwc-list-item
      aria-disabled="false"
      hasmeta=""
      mwc-list-item=""
      tabindex="0"
      twoline=""
    >
      <span>
        AP1 / LD0 / LLN0 / Beh / stVal
      </span>
      <span slot="secondary">
        cdc: ENS, casdu: 1, ioa: 1, ti: 35
      </span>
      <span slot="meta">
        <mwc-icon-button icon="edit">
        </mwc-icon-button>
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      hasmeta=""
      mwc-list-item=""
      tabindex="0"
      twoline=""
    >
      <span>
        AP1 / LD0 / PPRE-GGIO-2 / Beh / stVal
      </span>
      <span slot="secondary">
        cdc: ENS, casdu: 1, ioa: 2, ti: 35
      </span>
      <span slot="meta">
        <mwc-icon-button icon="edit">
        </mwc-icon-button>
      </span>
    </mwc-list-item>
  </filtered-list>
</action-pane>
`;
/* end snapshot ied-104-container - IED with DAI Elements looks like the latest snapshot */

snapshots["ied-104-container - IED without DAI Elements looks like the latest snapshot"] = 
`<action-pane tabindex="0">
  <mwc-icon slot="icon">
    developer_board
  </mwc-icon>
  <abbr
    slot="action"
    title="[protocol104.toggleChildElements]"
  >
    <mwc-icon-button-toggle
      id="toggleButton"
      officon="keyboard_arrow_down"
      on=""
      onicon="keyboard_arrow_up"
    >
    </mwc-icon-button-toggle>
  </abbr>
  <filtered-list id="dailist">
  </filtered-list>
</action-pane>
`;
/* end snapshot ied-104-container - IED without DAI Elements looks like the latest snapshot */

