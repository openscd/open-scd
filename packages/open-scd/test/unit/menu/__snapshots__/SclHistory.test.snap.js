/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["testing sclHistory dialog with a document loaded containing SCL history items looks like its latest snapshot"] = 
`<mwc-dialog
  heading="[history.name]"
  id="historyLog"
  open=""
>
  <mwc-list
    id="historyLogContent"
    wrapfocus=""
  >
    <abbr title="null">
      <mwc-list-item
        aria-disabled="false"
        class="sclHistory"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          <tt>
          </tt>
        </span>
        <span slot="secondary">
          Test User 1 : Small correction in substation
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="SCD updated, Nice history test 5">
      <mwc-list-item
        aria-disabled="false"
        class="sclHistory"
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          <tt>
          </tt>
          SCD updated, Nice history test 5
        </span>
        <span slot="secondary">
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="SCD updated, Nice history test 4">
      <mwc-list-item
        aria-disabled="false"
        class="sclHistory"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          <tt>
          </tt>
          SCD updated, Nice history test 4
        </span>
        <span slot="secondary">
          Small correction in substation
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="SCD updated, Nice history test 3">
      <mwc-list-item
        aria-disabled="false"
        class="sclHistory"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          <tt>
            invalid
          </tt>
          SCD updated, Nice history test 3
        </span>
        <span slot="secondary">
          Test User 1 : Small correction in substation
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="SCD updated, Nice history test 2">
      <mwc-list-item
        aria-disabled="false"
        class="sclHistory"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          <tt>
          </tt>
          SCD updated, Nice history test 2
        </span>
        <span slot="secondary">
          Test User 1
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="SCD created, Nice history test 1">
      <mwc-list-item
        aria-disabled="false"
        class="sclHistory"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          <tt>
            2021-09-14T10:52:28Z
          </tt>
          SCD created, Nice history test 1
        </span>
        <span slot="secondary">
          Test User 1
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="SCD created from CIM File(s): some-cim-file.xml">
      <mwc-list-item
        aria-disabled="false"
        class="sclHistory"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          <tt>
            2021-09-14T10:51:38Z
          </tt>
          SCD created from CIM File(s): some-cim-file.xml
        </span>
        <span slot="secondary">
          Test User 1
        </span>
      </mwc-list-item>
    </abbr>
  </mwc-list>
  <mwc-button
    dialogaction="close"
    slot="secondaryAction"
  >
    [close]
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot testing sclHistory dialog with a document loaded containing SCL history items looks like its latest snapshot */

snapshots["testing sclHistory dialog with no document looks like its latest snapshot"] = 
`<mwc-dialog
  heading="[history.name]"
  id="historyLog"
  open=""
>
  <mwc-list
    id="historyLogContent"
    wrapfocus=""
  >
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      mwc-list-item=""
      tabindex="0"
    >
      <span>
        [history.noEntries]
      </span>
    </mwc-list-item>
  </mwc-list>
  <mwc-button
    dialogaction="close"
    slot="secondaryAction"
  >
    [close]
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot testing sclHistory dialog with no document looks like its latest snapshot */

snapshots["testing sclHistory dialog with a document without SCL history items looks like its latest snapshot"] = 
`<mwc-dialog
  heading="[history.name]"
  id="historyLog"
  open=""
>
  <mwc-list
    id="historyLogContent"
    wrapfocus=""
  >
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      mwc-list-item=""
      tabindex="0"
    >
      <span>
        [history.noEntries]
      </span>
    </mwc-list-item>
  </mwc-list>
  <mwc-button
    dialogaction="close"
    slot="secondaryAction"
  >
    [close]
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot testing sclHistory dialog with a document without SCL history items looks like its latest snapshot */

