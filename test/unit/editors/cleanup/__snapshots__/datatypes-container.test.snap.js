/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Cleanup: DataTypes Container without a doc loaded looks like the latest snapshot"] = 
`<section tabindex="1">
  <div>
    <h1>
      [cleanup.unreferencedDataTypes.title]
          (0)
      <abbr slot="action">
        <mwc-icon-button
          icon="info"
          title="[cleanup.unreferencedDataTypes.tooltip]"
        >
        </mwc-icon-button>
      </abbr>
    </h1>
    <mwc-icon-button-toggle
      class="filter tLNodeTypeFilter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="filter tDOTypeFilter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="filter tDATypeFilter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="filter tEnumTypeFilter"
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
      label="[cleanup.unreferencedDataTypes.deleteButton] (0)"
      outlined=""
    >
    </mwc-button>
    <mwc-formfield
      class="removeFromCommunication"
      label="[cleanup.unreferencedDataTypes.alsoRemoveSubTypes]"
    >
      <mwc-checkbox
        checked=""
        class="cleanSubTypesCheckbox"
        disabled=""
      >
      </mwc-checkbox>
    </mwc-formfield>
  </footer>
</section>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot Cleanup: DataTypes Container without a doc loaded looks like the latest snapshot */

snapshots["Cleanup: DataTypes Container With a test file loaded looks like the latest snapshot"] = 
`<section tabindex="1">
  <div>
    <h1>
      [cleanup.unreferencedDataTypes.title]
          (6)
      <abbr slot="action">
        <mwc-icon-button
          icon="info"
          title="[cleanup.unreferencedDataTypes.tooltip]"
        >
        </mwc-icon-button>
      </abbr>
    </h1>
    <mwc-icon-button-toggle
      class="filter tLNodeTypeFilter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="filter tDOTypeFilter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="filter tDATypeFilter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="filter tEnumTypeFilter"
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
        class="cleanupListItem tLNodeType"
        graphic="large"
        mwc-list-item=""
        tabindex="0"
        twoline=""
        value="#NotUsedTVTR"
      >
        <span class="unreferencedControl">
          NotUsedTVTR
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
          TVTR
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanupListItem tDOType"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#NotUsedDummy.SPS"
      >
        <span class="unreferencedControl">
          NotUsedDummy.SPS
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
          Unknown
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanupListItem tDOType"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#WYE_2_3"
      >
        <span class="unreferencedControl">
          WYE_2_3
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
          Unknown
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanupListItem tDAType"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#NotUsedDummy.LPHD1.Sim.Cancel"
      >
        <span class="unreferencedControl">
          NotUsedDummy.LPHD1.Sim.Cancel
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
          Unknown
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanupListItem tDAType"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#OnlySubUsedVector_0"
      >
        <span class="unreferencedControl">
          OnlySubUsedVector_0
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
          Unknown
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanupListItem tEnumType"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#NotUsedDir"
      >
        <span class="unreferencedControl">
          NotUsedDir
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
          Unknown
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
      label="[cleanup.unreferencedDataTypes.deleteButton] (0)"
      outlined=""
    >
    </mwc-button>
    <mwc-formfield
      class="removeFromCommunication"
      label="[cleanup.unreferencedDataTypes.alsoRemoveSubTypes]"
    >
      <mwc-checkbox
        checked=""
        class="cleanSubTypesCheckbox"
        disabled=""
      >
      </mwc-checkbox>
    </mwc-formfield>
  </footer>
</section>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot Cleanup: DataTypes Container With a test file loaded looks like the latest snapshot */

