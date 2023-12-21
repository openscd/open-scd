/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["cleanup-editor integration: dataset removal without a doc loaded looks like the latest snapshot"] = 
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
/* end snapshot cleanup-editor integration: dataset removal without a doc loaded looks like the latest snapshot */

snapshots["cleanup-editor integration: dataset removal With a test file loaded looks like the latest snapshot"] = 
`<section tabindex="0">
  <div>
    <h1>
      [cleanup.unreferencedDataSets.title]
          (2)
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
      <mwc-check-list-item
        aria-disabled="false"
        class="checkListItem"
        graphic="control"
        mwc-list-item=""
        tabindex="0"
        twoline=""
        value="IED1>>CircuitBreaker_CB1>GooseDataSet2"
      >
        <span class="unreferencedDataSet">
          GooseDataSet2
        </span>
        <span>
          <mwc-icon-button
            class="editItem editUnreferencedDataSet"
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
          IED1
        (DummyManufacturer)
        -
        DummyIED
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="checkListItem"
        graphic="control"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED3>>MU01>PhsMeas2"
      >
        <span class="unreferencedDataSet">
          PhsMeas2
        </span>
        <span>
          <mwc-icon-button
            class="editItem editUnreferencedDataSet"
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
          IED3
        (DummyManufacturer)
        -
        DummyIED
        </span>
      </mwc-check-list-item>
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
/* end snapshot cleanup-editor integration: dataset removal With a test file loaded looks like the latest snapshot */

