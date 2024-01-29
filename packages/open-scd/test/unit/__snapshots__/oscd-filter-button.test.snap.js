/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["oscd-filter-button multi selection with custom header and standard icon looks like its latest snapshot"] =
`<mwc-icon-button icon="developer_board">
  <slot name="icon">
  </slot>
</mwc-icon-button>
<mwc-dialog
  heading="Filter Header"
  id="filterDialog"
  scrimclickaction=""
>
  <div id="tfcontainer">
    <abbr title="[filter]">
      <mwc-textfield
        icontrailing="search"
        label=""
        outlined=""
      >
      </mwc-textfield>
    </abbr>
    <mwc-formfield class="checkall">
      <mwc-checkbox indeterminate="">
      </mwc-checkbox>
    </mwc-formfield>
  </div>
  <ul
    class="mdc-deprecated-list"
    tabindex="-1"
  >
    <slot>
    </slot>
  </ul>
  <mwc-button
    dialogaction="close"
    slot="primaryAction"
  >
    [close]
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot oscd-filter-button multi selection with custom header and standard icon looks like its latest snapshot */

snapshots["oscd-filter-button single selection with default header and custom icon looks like its latest snapshot"] =
`<mwc-icon-button icon="undefined">
  <slot name="icon">
  </slot>
</mwc-icon-button>
<mwc-dialog
  heading="[filter]"
  id="filterDialog"
  scrimclickaction=""
>
  <div id="tfcontainer">
    <abbr title="[filter]">
      <mwc-textfield
        icontrailing="search"
        label=""
        outlined=""
      >
      </mwc-textfield>
    </abbr>
  </div>
  <ul
    class="mdc-deprecated-list"
    tabindex="-1"
  >
    <slot>
    </slot>
  </ul>
  <mwc-button
    dialogaction="close"
    slot="primaryAction"
  >
    [close]
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot oscd-filter-button single selection with default header and custom icon looks like its latest snapshot */

snapshots["oscd-filter-button is disabled looks like its latest snapshot"] =
`<mwc-icon-button
  disabled=""
  icon="developer_board"
>
  <slot name="icon">
  </slot>
</mwc-icon-button>
<mwc-dialog
  heading="Filter Header"
  id="filterDialog"
  scrimclickaction=""
>
  <div id="tfcontainer">
    <abbr title="[filter]">
      <mwc-textfield
        icontrailing="search"
        label=""
        outlined=""
      >
      </mwc-textfield>
    </abbr>
    <mwc-formfield class="checkall">
      <mwc-checkbox indeterminate="">
      </mwc-checkbox>
    </mwc-formfield>
  </div>
  <ul
    class="mdc-deprecated-list"
    tabindex="-1"
  >
    <slot>
    </slot>
  </ul>
  <mwc-button
    dialogaction="close"
    slot="primaryAction"
  >
    [close]
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot oscd-filter-button is disabled looks like its latest snapshot */

