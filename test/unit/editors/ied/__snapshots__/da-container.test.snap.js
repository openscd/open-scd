/* @web/test-runner snapshot v1 */
export const snapshots = {};

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
  <h6>
  </h6>
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
/* end snapshot with a DA element and child elements are toggled looks like the latest snapshot */

