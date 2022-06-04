/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Cleanup without a doc loaded looks like the latest snapshot"] = 
`<div class="cleanup">
  <section tabindex="0">
    <div>
      <h1>
        [cleanup.unreferencedDataSets.title]
          (0)
        <abbr slot="action">
          <mwc-icon-button
            icon="info"
            title="[cleanup.unreferencedDataSets.tooltip]"
          >
          </mwc-icon-button>
        </abbr>
      </h1>
      <filtered-list
        class="cleanupUnreferencedDataSetsList"
        multi=""
      >
      </filtered-list>
    </div>
    <footer>
      <mwc-button
        class="cleanupDeleteButton cleanupUnreferencedDataSetsDeleteButton"
        disabled=""
        icon="delete"
        label="[cleanup.unreferencedDataSets.deleteButton] (0)"
        outlined=""
      >
      </mwc-button>
    </footer>
  </section>
  <section tabindex="1">
    <div>
      <h1>
        [cleanup.unreferencedControls.title]
          (0)
        <abbr slot="action">
          <mwc-icon-button
            icon="info"
            title="[cleanup.unreferencedControls.tooltip]"
          >
          </mwc-icon-button>
        </abbr>
      </h1>
      <filtered-list
        class="cleanupUnreferencedControlsList"
        multi=""
      >
      </filtered-list>
    </div>
    <footer>
      <mwc-button
        class="cleanupDeleteButton cleanupUnreferencedControlDeleteButton"
        disabled=""
        icon="delete"
        label="[cleanup.unreferencedControls.deleteButton] (0)"
        outlined=""
      >
      </mwc-button>
      <mwc-formfield
        class="removeFromCommunication"
        label="[cleanup.unreferencedControls.alsoRemoveFromCommunication]"
      >
        <mwc-checkbox
          checked=""
          class="cleanupUnreferencedControlsAddress"
          disabled=""
        >
        </mwc-checkbox>
      </mwc-formfield>
    </footer>
  </section>
</div>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot Cleanup without a doc loaded looks like the latest snapshot */

snapshots["Cleanup Datasets without a doc loaded looks like the latest snapshot"] = 
`<section tabindex="0">
  <div>
    <h1>
      [cleanup.unreferencedDataSets.title]
          (0)
      <abbr slot="action">
        <mwc-icon-button
          icon="info"
          title="[cleanup.unreferencedDataSets.tooltip]"
        >
        </mwc-icon-button>
      </abbr>
    </h1>
    <filtered-list
      class="dataSetList"
      multi=""
    >
    </filtered-list>
  </div>
  <footer>
    <mwc-button
      class="cleanupDeleteButton deleteButton"
      disabled=""
      icon="delete"
      label="[cleanup.unreferencedDataSets.deleteButton] (0)"
      outlined=""
    >
    </mwc-button>
  </footer>
</section>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot Cleanup Datasets without a doc loaded looks like the latest snapshot */

