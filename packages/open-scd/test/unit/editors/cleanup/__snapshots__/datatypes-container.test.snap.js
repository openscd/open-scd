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
      class="filter t-lnode-type-filter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="filter t-do-type-filter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="filter t-da-type-filter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="filter t-enum-type-filter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <filtered-list
      class="cleanup-list"
      multi=""
    >
    </filtered-list>
  </div>
  <footer>
    <mwc-button
      class="delete-button"
      disabled=""
      icon="delete"
      label="[cleanup.unreferencedDataTypes.deleteButton] (0)"
      outlined=""
    >
    </mwc-button>
    <mwc-formfield
      class="remove-from-communication"
      label="[cleanup.unreferencedDataTypes.alsoRemoveSubTypes]"
    >
      <mwc-checkbox
        checked=""
        class="clean-sub-types-checkbox"
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
          (9)
      <abbr slot="action">
        <mwc-icon-button
          icon="info"
          title="[cleanup.unreferencedDataTypes.tooltip]"
        >
        </mwc-icon-button>
      </abbr>
    </h1>
    <mwc-icon-button-toggle
      class="filter t-lnode-type-filter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="filter t-do-type-filter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="filter t-da-type-filter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <mwc-icon-button-toggle
      class="filter t-enum-type-filter"
      label="filter"
      on=""
      slot="graphic"
    >
    </mwc-icon-button-toggle>
    <filtered-list
      class="cleanup-list"
      multi=""
    >
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanup-list-item t-lnode-type"
        graphic="large"
        mwc-list-item=""
        tabindex="0"
        twoline=""
        value="#GGIO_14"
      >
        <span class="unreferenced-control">
          GGIO_14
        </span>
        <span>
          <mwc-icon-button
            class="edit-item"
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
          GGIO
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanup-list-item t-lnode-type"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#LTMS_1"
      >
        <span class="unreferenced-control">
          LTMS_1
        </span>
        <span>
          <mwc-icon-button
            class="edit-item"
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
          LTMS
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanup-list-item t-lnode-type"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#NotUsedTVTR"
      >
        <span class="unreferenced-control">
          NotUsedTVTR
        </span>
        <span>
          <mwc-icon-button
            class="edit-item"
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
        class="cleanup-list-item t-do-type"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#Dummy.LLN0.Health.Unused"
      >
        <span class="unreferenced-control">
          Dummy.LLN0.Health.Unused
        </span>
        <span>
          <mwc-icon-button
            class="edit-item"
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
          ENS
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanup-list-item t-do-type"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#NotUsedDummy.SPS"
      >
        <span class="unreferenced-control">
          NotUsedDummy.SPS
        </span>
        <span>
          <mwc-icon-button
            class="edit-item"
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
          SPS
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanup-list-item t-do-type"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#WYE_2_3"
      >
        <span class="unreferenced-control">
          WYE_2_3
        </span>
        <span>
          <mwc-icon-button
            class="edit-item"
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
          WYE
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanup-list-item t-da-type"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#NotUsedDummy.LPHD1.Sim.Cancel"
      >
        <span class="unreferenced-control">
          NotUsedDummy.LPHD1.Sim.Cancel
        </span>
        <span>
          <mwc-icon-button
            class="edit-item"
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanup-list-item t-da-type"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#OnlySubUsedVector_0"
      >
        <span class="unreferenced-control">
          OnlySubUsedVector_0
        </span>
        <span>
          <mwc-icon-button
            class="edit-item"
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="cleanup-list-item t-enum-type"
        graphic="large"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#NotUsedDir"
      >
        <span class="unreferenced-control">
          NotUsedDir
        </span>
        <span>
          <mwc-icon-button
            class="edit-item"
            icon="edit"
            label="Edit"
          >
          </mwc-icon-button>
        </span>
        <span slot="secondary">
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
    </filtered-list>
  </div>
  <footer>
    <mwc-button
      class="delete-button"
      disabled=""
      icon="delete"
      label="[cleanup.unreferencedDataTypes.deleteButton] (0)"
      outlined=""
    >
    </mwc-button>
    <mwc-formfield
      class="remove-from-communication"
      label="[cleanup.unreferencedDataTypes.alsoRemoveSubTypes]"
    >
      <mwc-checkbox
        checked=""
        class="clean-sub-types-checkbox"
      >
      </mwc-checkbox>
    </mwc-formfield>
  </footer>
</section>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot Cleanup: DataTypes Container With a test file loaded looks like the latest snapshot */

