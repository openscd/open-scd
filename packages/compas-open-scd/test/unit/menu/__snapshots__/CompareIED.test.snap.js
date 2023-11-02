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
          <mwc-list-item
            aria-disabled="false"
            left=""
            mwc-list-item=""
            tabindex="-1"
            value="IED1"
          >
            <span>
              IED1
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
          <mwc-list-item
            aria-disabled="false"
            left=""
            mwc-list-item=""
            tabindex="-1"
            value="SPECIFICATION"
          >
            <span>
              SPECIFICATION
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
  <plain-compare-list>
  </plain-compare-list>
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

