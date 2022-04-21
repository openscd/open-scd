/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["looks like the latest snapshot with a DA element containing and a DAI"] = 
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
  <h4>
    status-only
  </h4>
</action-pane>
`;
/* end snapshot looks like the latest snapshot with a DA element containing and a DAI */

snapshots["with a DA element looks like the latest snapshot"] = 
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
  <h4>
  </h4>
</action-pane>
`;
/* end snapshot with a DA element looks like the latest snapshot */

snapshots["with a BDA element looks like the latest snapshot"] = 
`<action-pane
  icon=""
  tabindex="0"
>
  <abbr slot="action">
    <mwc-icon-button
      icon="info"
      title="ctlVal"
    >
    </mwc-icon-button>
  </abbr>
  <h4>
  </h4>
</action-pane>
`;
/* end snapshot with a BDA element looks like the latest snapshot */

snapshots["with a DA element and child elements are toggled looks like the latest snapshot"] = 
`<action-pane
  icon=""
  tabindex="0"
>
  <abbr slot="action">
    <mwc-icon-button
      icon="info"
      title="Some SBOw title"
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
  <h4>
  </h4>
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
/* end snapshot with a DA element and child elements are toggled looks like the latest snapshot */

