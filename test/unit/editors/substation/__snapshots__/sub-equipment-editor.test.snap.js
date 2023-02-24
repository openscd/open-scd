/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sub-equipment-editor looks like the latest snapshot"] = 
`<action-pane
  label="subque - somedesc (all)"
  tabindex="0"
>
  <abbr
    slot="action"
    title="[edit]"
  >
    <mwc-icon-button icon="edit">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="action"
    title="[remove]"
  >
    <mwc-icon-button icon="delete">
    </mwc-icon-button>
  </abbr>
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
        value="EqFunction"
      >
        <span>
          EqFunction
        </span>
      </mwc-list-item>
    </mwc-menu>
  </abbr>
</action-pane>
`;
/* end snapshot sub-equipment-editor looks like the latest snapshot */

snapshots["sub-equipment-editor With children looks like the latest snapshot"] = 
`<action-pane
  label="addEqi - somedesc (none)"
  tabindex="0"
>
  <abbr
    slot="action"
    title="[edit]"
  >
    <mwc-icon-button icon="edit">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="action"
    title="[remove]"
  >
    <mwc-icon-button icon="delete">
    </mwc-icon-button>
  </abbr>
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
        value="EqFunction"
      >
        <span>
          EqFunction
        </span>
      </mwc-list-item>
    </mwc-menu>
  </abbr>
  <div class="container lnode">
    <l-node-editor>
    </l-node-editor>
  </div>
  <eq-function-editor>
  </eq-function-editor>
</action-pane>
`;
/* end snapshot sub-equipment-editor With children looks like the latest snapshot */

snapshots["sub-equipment-editor without description and state looks like the latest snapshot"] = 
`<action-pane
  label="other"
  tabindex="0"
>
  <abbr
    slot="action"
    title="[edit]"
  >
    <mwc-icon-button icon="edit">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="action"
    title="[remove]"
  >
    <mwc-icon-button icon="delete">
    </mwc-icon-button>
  </abbr>
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
        value="EqFunction"
      >
        <span>
          EqFunction
        </span>
      </mwc-list-item>
    </mwc-menu>
  </abbr>
  <div class="container lnode">
    <l-node-editor>
    </l-node-editor>
  </div>
  <eq-function-editor>
  </eq-function-editor>
</action-pane>
`;
/* end snapshot sub-equipment-editor without description and state looks like the latest snapshot */

