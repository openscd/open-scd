/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["add-ln-dialog looks like the latest snapshot"] = 
`<mwc-dialog
  heading="[iededitor.addLnDialog.title]"
  id="addLnDialog"
  open=""
>
  <div class="dialog-content">
    <div class="ln-list-container">
      <mwc-textfield
        icon="search"
        label="[iededitor.addLnDialog.filter]"
        style="margin-bottom: 8px; width: 100%;"
        type="text"
      >
      </mwc-textfield>
      <div class="ln-list-scroll">
        <mwc-list style="width: 100%;">
          <mwc-list-item
            aria-disabled="false"
            dialogaction="none"
            mwc-list-item=""
            style="cursor: pointer;"
            tabindex="0"
            title="PlaceholderLLN0"
            type="button"
            value="PlaceholderLLN0"
          >
            <span class="ln-list-id">
              PlaceholderLLN0
            </span>
            <span class="ln-list-desc">
            </span>
          </mwc-list-item>
        </mwc-list>
      </div>
    </div>
    <mwc-textfield
      data-testid="amount"
      label="[iededitor.addLnDialog.amount]"
      min="1"
      style="width: 100%; margin-top: 12px;"
      type="number"
    >
    </mwc-textfield>
  </div>
  <mwc-button
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
    [close]
  </mwc-button>
  <mwc-button
    data-testid="add-ln-button"
    disabled=""
    icon="add"
    slot="primaryAction"
    trailingicon=""
  >
    [add]
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot add-ln-dialog looks like the latest snapshot */

