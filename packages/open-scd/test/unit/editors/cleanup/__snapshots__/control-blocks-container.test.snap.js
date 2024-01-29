/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Cleanup: Control Blocks Container without a doc loaded looks like the latest snapshot"] = 
`<section tabindex="1">
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
    <mwc-icon-button-toggle
      class="tLogControlFilter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="tReportControlFilter"
      label="filter"
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="tGSEControlFilter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="tSampledValueControlFilter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <filtered-list
      class="cleanupList"
      multi=""
    >
    </filtered-list>
  </div>
  <footer>
    <mwc-button
      class="deleteButton"
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
        class="cleanupAddressCheckbox"
        disabled=""
      >
      </mwc-checkbox>
    </mwc-formfield>
  </footer>
</section>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot Cleanup: Control Blocks Container without a doc loaded looks like the latest snapshot */

snapshots["Cleanup: Control Blocks Container With a test file loaded looks like the latest snapshot"] = 
`<section tabindex="1">
  <div>
    <h1>
      [cleanup.unreferencedControls.title]
          (5)
      <abbr slot="action">
        <mwc-icon-button
          icon="info"
          title="[cleanup.unreferencedControls.tooltip]"
        >
        </mwc-icon-button>
      </abbr>
    </h1>
    <mwc-icon-button-toggle
      class="tLogControlFilter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="tReportControlFilter"
      label="filter"
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="tGSEControlFilter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="tSampledValueControlFilter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <filtered-list
      class="cleanupList"
      multi=""
    >
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanupListItem tGSEControl"
        graphic="large"
        mwc-list-item=""
        tabindex="0"
        twoline=""
        value="IED1>>CircuitBreaker_CB1>GCB2_NP"
      >
        <span class="unreferencedControl">
          GCB2_NP
        </span>
        <span>
          <mwc-icon-button
            class="cautionItem"
            disabled=""
            icon="warning_amber"
            label="warning"
            title="[cleanup.unreferencedControls.addressDefinitionTooltip]"
          >
          </mwc-icon-button>
        </span>
        <span>
          <mwc-icon-button
            class="editItem"
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
          GSEControl -
        IED1
        (DummyManufacturer)
        -
        DummyIED
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanupListItem tGSEControl"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED1>>CircuitBreaker_CB1>GCB_NP"
      >
        <span class="unreferencedControl">
          GCB_NP
        </span>
        <span>
          <mwc-icon-button
            class="cautionItem"
            icon="warning_amber"
            label="warning"
            title="[cleanup.unreferencedControls.addressDefinitionTooltip]"
          >
          </mwc-icon-button>
        </span>
        <span>
          <mwc-icon-button
            class="editItem"
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
          GSEControl -
        IED1
        (DummyManufacturer)
        -
        DummyIED
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanupListItem tLogControl"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED1>>CircuitBreaker_CB1>LogNP"
      >
        <span class="unreferencedControl">
          LogNP
        </span>
        <span>
          <mwc-icon-button
            class="cautionItem"
            disabled=""
            icon="warning_amber"
            label="warning"
            title="[cleanup.unreferencedControls.addressDefinitionTooltip]"
          >
          </mwc-icon-button>
        </span>
        <span>
          <mwc-icon-button
            class="editItem"
            disabled=""
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
          LogControl -
        IED1
        (DummyManufacturer)
        -
        DummyIED
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="true"
        class="cleanupListItem hiddenontypefilter tReportControl"
        disabled=""
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED2>>CBSW> XSWI 1>ReportCb2"
      >
        <span class="unreferencedControl">
          ReportCb2
        </span>
        <span>
          <mwc-icon-button
            class="cautionItem"
            disabled=""
            icon="warning_amber"
            label="warning"
            title="[cleanup.unreferencedControls.addressDefinitionTooltip]"
          >
          </mwc-icon-button>
        </span>
        <span>
          <mwc-icon-button
            class="editItem"
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
          ReportControl -
        IED2
        (DummyManufacturer)
        -
        DummyIED
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanupListItem tSampledValueControl"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED3>>MU01>MSVCB01_A"
      >
        <span class="unreferencedControl">
          MSVCB01_A
        </span>
        <span>
          <mwc-icon-button
            class="cautionItem"
            icon="warning_amber"
            label="warning"
            title="[cleanup.unreferencedControls.addressDefinitionTooltip]"
          >
          </mwc-icon-button>
        </span>
        <span>
          <mwc-icon-button
            class="editItem"
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
          SampledValueControl -
        IED3
        (DummyManufacturer)
        -
        DummyIED
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
    </filtered-list>
  </div>
  <footer>
    <mwc-button
      class="deleteButton"
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
        class="cleanupAddressCheckbox"
        disabled=""
      >
      </mwc-checkbox>
    </mwc-formfield>
  </footer>
</section>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot Cleanup: Control Blocks Container With a test file loaded looks like the latest snapshot */

