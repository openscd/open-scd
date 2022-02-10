/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["looks like the latest snapshot with a DA element"] = 
`<action-pane
  icon=""
  tabindex="0"
>
  <abbr slot="action">
    <mwc-icon-button
      icon="info"
      title="ctlModel"
    >
    </mwc-icon-button>
  </abbr>
  <h6>
  </h6>
</action-pane>
`;
/* end snapshot looks like the latest snapshot with a DA element */

snapshots["looks like the latest snapshot with a DA element and child elements are toggled."] = 
`<action-pane
  icon=""
  tabindex="0"
>
  <abbr slot="action">
    <mwc-icon-button
      icon="info"
      title="SBOw"
    >
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="action"
    title="[iededitor.toggleChildElements]"
  >
    <mwc-icon-button-toggle
      id="toggleButton"
      officon="keyboard_arrow_down"
      on=""
      onicon="keyboard_arrow_up"
    >
    </mwc-icon-button-toggle>
  </abbr>
  <h6>
  </h6>
  <da-container>
  </da-container>
  <da-container>
  </da-container>
  <da-container>
  </da-container>
  <da-container>
  </da-container>
  <da-container>
  </da-container>
  <da-container>
  </da-container>
</action-pane>
`;
/* end snapshot looks like the latest snapshot with a DA element and child elements are toggled. */

snapshots["looks like the latest snapshot with a DA element containing and a DAI."] = 
`<action-pane
  icon="done"
  tabindex="0"
>
  <abbr slot="action">
    <mwc-icon-button
      icon="info"
      title="ctlModel"
    >
    </mwc-icon-button>
  </abbr>
  <h6>
    status-only
  </h6>
</action-pane>
`;
/* end snapshot looks like the latest snapshot with a DA element containing and a DAI. */

