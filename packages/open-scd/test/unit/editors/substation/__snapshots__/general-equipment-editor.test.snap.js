/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Editor web component for GeneralEquipment SCL element rendered as action icon looks like the latest snapshot"] = 
`<action-icon
  label="genSub"
  tabindex="0"
>
  <mwc-icon slot="icon">
  </mwc-icon>
  <mwc-fab
    icon="edit"
    mini=""
    slot="action"
  >
  </mwc-fab>
  <mwc-fab
    icon="delete"
    mini=""
    slot="action"
  >
  </mwc-fab>
</action-icon>
`;
/* end snapshot Editor web component for GeneralEquipment SCL element rendered as action icon looks like the latest snapshot */

snapshots["Editor web component for GeneralEquipment SCL element rendered as action pane look like the latest snapshot"] = 
`<action-pane
  label="genSub —  someDesc"
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
        tabindex="-1"
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
/* end snapshot Editor web component for GeneralEquipment SCL element rendered as action pane look like the latest snapshot */

