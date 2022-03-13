/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Cleanup without a doc loaded looks like the latest snapshot"] = 
`<div class="cleanupUnusedDatasets">
  <section tabindex="0">
    <h1>
      [cleanup.unusedDatasets.title]
        (0)
      <abbr slot="action">
        <mwc-icon-button
          icon="info"
          title="[cleanup.unusedDatasets.tooltip]"
        >
        </mwc-icon-button>
      </abbr>
    </h1>
    <filtered-list
      class="cleanupUnusedDatasetsList"
      multi=""
    >
    </filtered-list>
    <footer id="actions">
      <span>
        <slot name="primaryAction">
          <mwc-button
            class="cleanupUnusedDatasetsDeleteButton"
            disabled=""
            icon="delete"
            label="[cleanup.unusedDatasets.deleteButton] (0)"
            slot="secondaryAction"
          >
          </mwc-button>
        </slot>
      </span>
    </footer>
  </section>
</div>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot Cleanup without a doc loaded looks like the latest snapshot */

