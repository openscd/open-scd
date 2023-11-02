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
  <div style="display: flex; flex-direction: row;">
    <div style="display: flex; align-items: center; flex: auto;">
      <h4>
        status-only
      </h4>
    </div>
    <div style="display: flex; align-items: center;">
      <mwc-icon-button icon="edit">
      </mwc-icon-button>
    </div>
  </div>
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
  <div style="display: flex; flex-direction: row;">
    <div style="display: flex; align-items: center; flex: auto;">
      <h4>
      </h4>
    </div>
    <div style="display: flex; align-items: center;">
      <mwc-icon-button icon="add">
      </mwc-icon-button>
    </div>
  </div>
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
  <div style="display: flex; flex-direction: row;">
    <div style="display: flex; align-items: center; flex: auto;">
      <h4>
      </h4>
    </div>
    <div style="display: flex; align-items: center;">
      <mwc-icon-button icon="add">
      </mwc-icon-button>
    </div>
  </div>
</action-pane>
`;
/* end snapshot with a BDA element looks like the latest snapshot */

snapshots["with a BDA element having multiple values looks like the latest snapshot"] = 
`<action-pane
  icon="done"
  tabindex="0"
>
  <abbr slot="action">
    <mwc-icon-button
      icon="info"
      title="scaleFactor"
    >
    </mwc-icon-button>
  </abbr>
  <div style="display: flex; flex-direction: row;">
    <div style="display: flex; align-items: center; flex: auto;">
      <h4>
        SG1: 0.001
      </h4>
    </div>
    <div style="display: flex; align-items: center;">
      <mwc-icon-button icon="edit">
      </mwc-icon-button>
    </div>
  </div>
  <div style="display: flex; flex-direction: row;">
    <div style="display: flex; align-items: center; flex: auto;">
      <h4>
        SG2: 0.005
      </h4>
    </div>
    <div style="display: flex; align-items: center;">
      <mwc-icon-button icon="edit">
      </mwc-icon-button>
    </div>
  </div>
</action-pane>
`;
/* end snapshot with a BDA element having multiple values looks like the latest snapshot */

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

