/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Cleanup: Datasets Container without a doc loaded looks like the latest snapshot"] = 
`<section tabindex="0">
  <div>
    <h1>
      cleanup.unreferencedDataSets.title
          (0)
      <abbr slot="action">
        <mwc-icon-button
          icon="info"
          title="cleanup.unreferencedDataSets.tooltip"
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
      label="cleanup.unreferencedDataSets.deleteButton (0)"
      outlined=""
    >
    </mwc-button>
  </footer>
</section>
`;
/* end snapshot Cleanup: Datasets Container without a doc loaded looks like the latest snapshot */

snapshots["Cleanup: Datasets Container with a test file loaded looks like the latest snapshot"] = 
`<section tabindex="0">
  <div>
    <h1>
      Unreferenced Datasets
          (2)
      <abbr slot="action">
        <mwc-icon-button
          icon="info"
          title="Datasets without a reference to an associated GOOSE, Log, Report or Sampled Value Control Block"
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
      label="Remove Selected Datasets (0)"
      outlined=""
    >
    </mwc-button>
  </footer>
</section>
`;
/* end snapshot Cleanup: Datasets Container with a test file loaded looks like the latest snapshot */

