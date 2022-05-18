/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["web component rendering EqSubFunction element with complete attribute set and existing children looks like the latest snapshot"] = 
`<action-pane
  icon="functions"
  label="myEqSubSubFunction - my desc (sometype)"
  secondary=""
  tabindex="0"
>
  <abbr
    slot="action"
    style="position:relative;"
    title="[add]"
  >
    <mwc-icon-button icon="playlist_add">
    </mwc-icon-button>
    <mwc-menu
      corner="BOTTOM_RIGHT"
      menucorner="END"
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="menuitem"
        tabindex="0"
        value="LNode"
      >
        <span>
          LNode
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="menuitem"
        tabindex="-1"
        value="EqSubFunction"
      >
        <span>
          EqSubFunction
        </span>
      </mwc-list-item>
    </mwc-menu>
  </abbr>
</action-pane>
`;
/* end snapshot web component rendering EqSubFunction element with complete attribute set and existing children looks like the latest snapshot */

snapshots["web component rendering EqSubFunction element with missing desc and type attribute looks like the latest snapshot"] = 
`<action-pane
  icon="functions"
  label="myEqSubFunc"
  secondary=""
  tabindex="0"
>
  <abbr
    slot="action"
    style="position:relative;"
    title="[add]"
  >
    <mwc-icon-button icon="playlist_add">
    </mwc-icon-button>
    <mwc-menu
      corner="BOTTOM_RIGHT"
      menucorner="END"
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="menuitem"
        tabindex="0"
        value="LNode"
      >
        <span>
          LNode
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="menuitem"
        tabindex="-1"
        value="EqSubFunction"
      >
        <span>
          EqSubFunction
        </span>
      </mwc-list-item>
    </mwc-menu>
  </abbr>
  <eq-sub-function-editor>
  </eq-sub-function-editor>
</action-pane>
`;
/* end snapshot web component rendering EqSubFunction element with missing desc and type attribute looks like the latest snapshot */

