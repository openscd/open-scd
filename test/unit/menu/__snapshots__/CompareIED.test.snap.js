/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Compare IED Plugin show template project selection dialog looks like its latest snapshot"] = 
`<mwc-dialog heading="[compare-ied.selectProjectTitle]">
  <div>
    <input
      accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd"
      hidden=""
      id="template-file"
      required=""
      type="file"
    >
    <mwc-button label="[compare-ied.selectTemplateButton]">
    </mwc-button>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Compare IED Plugin show template project selection dialog looks like its latest snapshot */

snapshots["Compare IED Plugin show ied selection lists dialog looks like its latest snapshot"] = 
`<mwc-dialog heading="[compare-ied.selectIedTitle]">
  <div class="splitContainer">
    <div>
      <div>
        [compare-ied.projectIedTitle]
      </div>
      <div class="iedList">
        <mwc-list
          activatable=""
          id="currentDocument"
        >
          <mwc-list-item
            aria-disabled="false"
            left=""
            mwc-list-item=""
            tabindex="0"
            value="FieldA_QA1_QB1_QB2_QC9"
          >
            <span>
              FieldA_QA1_QB1_QB2_QC9
            </span>
          </mwc-list-item>
          <mwc-list-item
            aria-disabled="false"
            left=""
            mwc-list-item=""
            tabindex="-1"
            value="FieldB_QA1_QB1_QB2_QC9"
          >
            <span>
              FieldB_QA1_QB1_QB2_QC9
            </span>
          </mwc-list-item>
          <mwc-list-item
            aria-disabled="false"
            left=""
            mwc-list-item=""
            tabindex="-1"
            value="FieldC_QA1_QB1_QB2_QC9"
          >
            <span>
              FieldC_QA1_QB1_QB2_QC9
            </span>
          </mwc-list-item>
          <mwc-list-item
            aria-disabled="false"
            left=""
            mwc-list-item=""
            tabindex="-1"
            value="FieldC_QA1_QB1_QB2_QCX"
          >
            <span>
              FieldC_QA1_QB1_QB2_QCX
            </span>
          </mwc-list-item>
        </mwc-list>
      </div>
    </div>
    <div>
      <div>
        [compare-ied.templateIedTitle]
      </div>
      <div class="iedList">
        <mwc-list
          activatable=""
          id="currentTemplate"
        >
          <mwc-list-item
            aria-disabled="false"
            left=""
            mwc-list-item=""
            tabindex="0"
            value="FieldA_QA1_QB1_QB2_QC9"
          >
            <span>
              FieldA_QA1_QB1_QB2_QC9
            </span>
          </mwc-list-item>
          <mwc-list-item
            aria-disabled="false"
            left=""
            mwc-list-item=""
            tabindex="-1"
            value="FieldB_QA1_QB1_QB2_QC9"
          >
            <span>
              FieldB_QA1_QB1_QB2_QC9
            </span>
          </mwc-list-item>
          <mwc-list-item
            aria-disabled="false"
            left=""
            mwc-list-item=""
            tabindex="-1"
            value="FieldC_QA1_QB1_QB2_QC9"
          >
            <span>
              FieldC_QA1_QB1_QB2_QC9
            </span>
          </mwc-list-item>
        </mwc-list>
      </div>
    </div>
  </div>
  <mwc-button
    icon="compare_arrows"
    label="[compare.compareButton]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Compare IED Plugin show ied selection lists dialog looks like its latest snapshot */

snapshots["Compare IED Plugin show compare dialog with no differences looks like its latest snapshot"] = 
`<mwc-dialog heading="[compare-ied.resultTitle]">
  [compare-ied.noDiff]
  <mwc-button
    icon="arrow_back"
    label="[compare-ied.selectIedButton]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Compare IED Plugin show compare dialog with no differences looks like its latest snapshot */

snapshots["Compare IED Plugin show compare dialog with copied IED looks like its latest snapshot"] = 
`<mwc-dialog heading="[compare-ied.resultTitle]">
  <mwc-list multi="">
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      twoline=""
    >
      <span class="resultTitle">
        [compare.attributes]
      </span>
      <span slot="secondary">
        FieldC_QA1_QB1_QB2_QCX
      </span>
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="0"
      twoline=""
    >
      <span>
        name
      </span>
      <span slot="secondary">
        FieldC_QA1_QB1_QB2_QCX
                  ↶
                  FieldC_QA1_QB1_QB2_QC9
      </span>
      <mwc-icon slot="meta">
        edit
      </mwc-icon>
    </mwc-list-item>
  </mwc-list>
  <mwc-button
    icon="arrow_back"
    label="[compare-ied.selectIedButton]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Compare IED Plugin show compare dialog with copied IED looks like its latest snapshot */

snapshots["Compare IED Plugin show compare dialog with differences looks like its latest snapshot"] = 
`<mwc-dialog heading="[compare-ied.resultTitle]">
  <mwc-list multi="">
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      twoline=""
    >
      <span class="resultTitle">
        [compare.children]
      </span>
      <span slot="secondary">
        FieldA_QA1_QB1_QB2_QC9>>CBSW> LPHD 1
      </span>
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="0"
      twoline=""
    >
      <span>
        DOI
      </span>
      <span slot="secondary">
        FieldA_QA1_QB1_QB2_QC9>>CBSW> LPHD 1>PhyHealth
      </span>
      <mwc-icon slot="meta">
        delete
      </mwc-icon>
    </mwc-list-item>
  </mwc-list>
  <mwc-list multi="">
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      twoline=""
    >
      <span class="resultTitle">
        [compare.attributes]
      </span>
      <span slot="secondary">
        FieldA_QA1_QB1_QB2_QC9>>CBSW> LPHD 1>PhyNam>vendor> 0
      </span>
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="0"
      twoline=""
    >
      <span>
        value
      </span>
      <span slot="secondary">
        Other value
                  ↶
                  Some value
      </span>
      <mwc-icon slot="meta">
        edit
      </mwc-icon>
    </mwc-list-item>
  </mwc-list>
  <mwc-button
    icon="arrow_back"
    label="[compare-ied.selectIedButton]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Compare IED Plugin show compare dialog with differences looks like its latest snapshot */

