/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sub-equipment-editor looks like the latest snapshot"] = 
`<action-pane
  icon="functions"
  label="subque - somedesc (all)"
  secondary=""
  tabindex="0"
>
  <abbr
    slot="action"
    title="[edit]"
  >
    <mwc-icon-button icon="edit">
    </mwc-icon-button>
  </abbr>
</action-pane>
`;
/* end snapshot sub-equipment-editor looks like the latest snapshot */

snapshots["sub-equipment-editor With children looks like the latest snapshot"] = 
`<action-pane
  icon="functions"
  label="addEqi - somedesc (none)"
  secondary=""
  tabindex="0"
>
  <abbr
    slot="action"
    title="[edit]"
  >
    <mwc-icon-button icon="edit">
    </mwc-icon-button>
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
  icon="functions"
  label="other"
  secondary=""
  tabindex="0"
>
  <abbr
    slot="action"
    title="[edit]"
  >
    <mwc-icon-button icon="edit">
    </mwc-icon-button>
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

