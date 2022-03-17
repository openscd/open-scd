/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["wizard-dialog with a nonempty wizard property in pro mode looks like its snapshot"] = 
`<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot wizard-dialog with a nonempty wizard property in pro mode looks like its snapshot */

snapshots["wizard-dialog with a nonempty wizard property in pro mode switches to code editor view on code toggle button click"] = 
`<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot wizard-dialog with a nonempty wizard property in pro mode switches to code editor view on code toggle button click */

snapshots["wizard-dialog with user defined menu actions set looks like its snapshot"] = 
`<mwc-dialog
  defaultaction="close"
  heading="Page 1"
  open=""
>
  <nav>
    <mwc-icon-button icon="more_vert">
    </mwc-icon-button>
    <mwc-menu
      class="actions-menu"
      corner="BOTTOM_RIGHT"
      menucorner="END"
    >
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        role="menuitem"
        tabindex="-1"
      >
        <span>
          remove
        </span>
        <mwc-icon slot="graphic">
          delete
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        role="menuitem"
        tabindex="-1"
      >
        <span>
          remove
        </span>
        <mwc-icon slot="graphic">
          delete
        </mwc-icon>
      </mwc-list-item>
    </mwc-menu>
  </nav>
  <div id="wizard-content">
  </div>
  <mwc-button
    dialogaction="close"
    label="[cancel]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot wizard-dialog with user defined menu actions set looks like its snapshot */

