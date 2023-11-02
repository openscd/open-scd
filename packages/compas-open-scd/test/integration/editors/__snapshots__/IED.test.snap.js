/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["IED Plugin without a doc loaded looks like the latest snapshot"] = 
`<h1>
  <span style="color: var(--base1)">
    [iededitor.missing]
  </span>
</h1>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot IED Plugin without a doc loaded looks like the latest snapshot */

snapshots["IED Plugin with a doc loaded containing no IEDs looks like the latest snapshot"] = 
`<h1>
  <span style="color: var(--base1)">
    [iededitor.missing]
  </span>
</h1>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot IED Plugin with a doc loaded containing no IEDs looks like the latest snapshot */

snapshots["IED Plugin with a doc loaded containing IEDs looks like the latest snapshot"] = 
`<section>
  <div class="header">
    <h1>
      [filters]:
    </h1>
    <oscd-filter-button
      icon="developer_board"
      id="iedFilter"
    >
      <mwc-radio-list-item
        aria-disabled="false"
        aria-selected="true"
        graphic="control"
        mwc-list-item=""
        selected=""
        tabindex="0"
        twoline=""
        value="IED1"
      >
        IED1
        <span slot="secondary">
          DummyIED —
                  DummyManufactorer
        </span>
      </mwc-radio-list-item>
      <mwc-radio-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED2"
      >
        IED2
        <span slot="secondary">
          DummyIED —
                  DummyManufactorer
        </span>
      </mwc-radio-list-item>
      <mwc-radio-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED3"
      >
        IED3
        <span slot="secondary">
          DummyIED —
                  DummyManufactorer
        </span>
      </mwc-radio-list-item>
      <mwc-radio-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED4"
      >
        IED4
        <span slot="secondary">
          DummyIED —
                  DummyManufactorer
        </span>
      </mwc-radio-list-item>
      <mwc-radio-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED5"
      >
        IED5
        <span slot="secondary">
          DummyIED —
                  DummyManufactorer
        </span>
      </mwc-radio-list-item>
    </oscd-filter-button>
    <oscd-filter-button
      id="lnClassesFilter"
      multi="true"
    >
      <span slot="icon">
      </span>
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        selected=""
        tabindex="0"
        value="LLN0"
      >
        LLN0
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        selected=""
        tabindex="-1"
        value="XCBR"
      >
        XCBR
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        selected=""
        tabindex="-1"
        value="CSWI"
      >
        CSWI
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        selected=""
        tabindex="-1"
        value="XSWI"
      >
        XSWI
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        selected=""
        tabindex="-1"
        value="CILO"
      >
        CILO
      </mwc-check-list-item>
    </oscd-filter-button>
    <element-path class="elementPath">
    </element-path>
  </div>
  <ied-container>
  </ied-container>
</section>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot IED Plugin with a doc loaded containing IEDs looks like the latest snapshot */

