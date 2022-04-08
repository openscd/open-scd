/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["expandable/collapsable list item container with missing parent and children slotted looks like the latest snapshot"] = 
`<div class="container">
  <div class="parent">
    <div class="expandIconContainer">
      <mwc-icon-button-toggle
        }}=""
        class="hidden"
        officon="keyboard_arrow_down"
        onicon="keyboard_arrow_up"
      >
      </mwc-icon-button-toggle>
    </div>
    <slot name="parent">
    </slot>
  </div>
  <div class="content">
    <mwc-list>
      <slot name="child">
      </slot>
    </mwc-list>
  </div>
</div>
`;
/* end snapshot expandable/collapsable list item container with missing parent and children slotted looks like the latest snapshot */

snapshots["expandable/collapsable list item container with only parent item slotted looks like the latest snapshot"] = 
`<div class="container">
  <div class="parent">
    <div class="expandIconContainer">
      <mwc-icon-button-toggle
        }}=""
        class="hidden"
        officon="keyboard_arrow_down"
        onicon="keyboard_arrow_up"
      >
      </mwc-icon-button-toggle>
    </div>
    <slot name="parent">
    </slot>
  </div>
  <div class="content">
    <mwc-list>
      <slot name="child">
      </slot>
    </mwc-list>
  </div>
</div>
`;
/* end snapshot expandable/collapsable list item container with only parent item slotted looks like the latest snapshot */

snapshots["expandable/collapsable list item container with both parent and childen slotted and defaultExpanded not set looks like the latest snapshot"] = 
`<div class="container">
  <div class="parent">
    <div class="expandIconContainer">
      <mwc-icon-button-toggle
        }}=""
        officon="keyboard_arrow_down"
        onicon="keyboard_arrow_up"
      >
      </mwc-icon-button-toggle>
    </div>
    <slot name="parent">
    </slot>
  </div>
  <div class="content">
    <mwc-list>
      <slot name="child">
      </slot>
    </mwc-list>
  </div>
</div>
`;
/* end snapshot expandable/collapsable list item container with both parent and childen slotted and defaultExpanded not set looks like the latest snapshot */

snapshots["expandable/collapsable list item container with both parent and childen slotted and defaultExpanded set to true looks like the latest snapshot"] = 
`<div class="container">
  <div
    class="parent"
    on=""
  >
    <div class="expandIconContainer">
      <mwc-icon-button-toggle
        }}=""
        officon="keyboard_arrow_down"
        on=""
        onicon="keyboard_arrow_up"
      >
      </mwc-icon-button-toggle>
    </div>
    <slot name="parent">
    </slot>
  </div>
  <div class="content">
    <mwc-list>
      <slot name="child">
      </slot>
    </mwc-list>
  </div>
</div>
`;
/* end snapshot expandable/collapsable list item container with both parent and childen slotted and defaultExpanded set to true looks like the latest snapshot */

