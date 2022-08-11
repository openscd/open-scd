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
  <mwc-formfield label="Filter mutables">
    <mwc-checkbox checked="">
    </mwc-checkbox>
  </mwc-formfield>
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
  <mwc-formfield label="Filter mutables">
    <mwc-checkbox>
    </mwc-checkbox>
  </mwc-formfield>
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
        FieldC_QA1_QB1_QB2_QC9
                  ↷
                  FieldC_QA1_QB1_QB2_QCX
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
  <mwc-formfield label="Filter mutables">
    <mwc-checkbox checked="">
    </mwc-checkbox>
  </mwc-formfield>
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
        add
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
        Some value
                  ↷
                  Other value
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

snapshots["Compare IED Plugin show compare dialog with ignorable differences looks like its snapshot"] =
`<mwc-dialog
  heading="[compare-ied.resultTitle]"
  open=""
>
  <mwc-formfield label="Filter mutables">
    <mwc-checkbox checked="">
    </mwc-checkbox>
  </mwc-formfield>
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
        IED1>>CurrentTransformer_RES> TCTR 1>HzRtg>setMag>i> 0
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
      tabindex="-1"
      twoline=""
    >
      <span>
        value
      </span>
      <span slot="secondary">
        50
                  ↷
                  60
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>CurrentTransformer_L1>NamPlt>vendor> 0
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
      tabindex="-1"
      twoline=""
    >
      <span>
        value
      </span>
      <span slot="secondary">
        SomeVendor
                  ↷
                  SomeOtherVendor
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>CurrentTransformer_L1> TCTR 1>HzRtg>setMag>i> 0
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
      tabindex="-1"
      twoline=""
    >
      <span>
        value
      </span>
      <span slot="secondary">
        50
                  ↷
                  60
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>VoltageTransformer_RES> TVTR 1>HzRtg>setMag>i> 0
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
      tabindex="-1"
      twoline=""
    >
      <span>
        value
      </span>
      <span slot="secondary">
        50
                  ↷
                  60
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>VoltageTransformer_L1> TVTR 1>HzRtg>setMag>i> 0
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
      tabindex="-1"
      twoline=""
    >
      <span>
        value
      </span>
      <span slot="secondary">
        50
                  ↷
                  60
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
/* end snapshot Compare IED Plugin show compare dialog with ignorable differences looks like its snapshot */

snapshots["Compare IED Plugin show compare dialog with ignorable differences no mutables are filtered, it looks like its snapshot"] =
`<mwc-dialog
  heading="[compare-ied.resultTitle]"
  open=""
>
  <mwc-formfield label="Filter mutables">
    <mwc-checkbox>
    </mwc-checkbox>
  </mwc-formfield>
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
        IED1
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
        SPECIFICATION
                  ↷
                  IED1
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>CurrentTransformer_RES> TCTR 1>HzRtg>setMag>i> 0
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
      tabindex="-1"
      twoline=""
    >
      <span>
        value
      </span>
      <span slot="secondary">
        50
                  ↷
                  60
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>CurrentTransformer_RES> TCTR 1>ARtgSec>setVal> 0
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
        1
                  ↷
                  5
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>CurrentTransformer_RES> TCTR 1>ARtgNom>setMag>f> 0
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
        40
                  ↷
                  100
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>CurrentTransformer_RES> TCTR 1>Rat>setMag>f> 0
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
        40
                  ↷
                  20
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>CurrentTransformer_RES> TCTR 1>ARtg>setMag>f> 0
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
        40
                  ↷
                  100
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>CurrentTransformer_L1>NamPlt>vendor> 0
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
      tabindex="-1"
      twoline=""
    >
      <span>
        value
      </span>
      <span slot="secondary">
        SomeVendor
                  ↷
                  SomeOtherVendor
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>CurrentTransformer_L1> TCTR 1>HzRtg>setMag>i> 0
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
      tabindex="-1"
      twoline=""
    >
      <span>
        value
      </span>
      <span slot="secondary">
        50
                  ↷
                  60
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>CurrentTransformer_L1> TCTR 1>ARtg>setMag>f> 0
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
        400
                  ↷
                  1000
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>CurrentTransformer_L1> TCTR 1>ARtgNom>setMag>f> 0
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
        400
                  ↷
                  1000
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>CurrentTransformer_L1> TCTR 1>ARtgSec>setVal> 0
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
        1
                  ↷
                  5
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>CurrentTransformer_L1> TCTR 1>Rat>setMag>f> 0
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
        400
                  ↷
                  200
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>VoltageTransformer_RES> TVTR 1>HzRtg>setMag>i> 0
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
      tabindex="-1"
      twoline=""
    >
      <span>
        value
      </span>
      <span slot="secondary">
        50
                  ↷
                  60
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>VoltageTransformer_RES> TVTR 1>VRtg>setMag>f> 0
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
        10000
                  ↷
                  5000
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>VoltageTransformer_RES> TVTR 1>VRtgSec>setVal> 0
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
        100
                  ↷
                  200
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>VoltageTransformer_RES> TVTR 1>Rat>setMag>f> 0
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
        100
                  ↷
                  25
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>VoltageTransformer_L1> TVTR 1>HzRtg>setMag>i> 0
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
      tabindex="-1"
      twoline=""
    >
      <span>
        value
      </span>
      <span slot="secondary">
        50
                  ↷
                  60
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>VoltageTransformer_L1> TVTR 1>VRtg>setMag>f> 0
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
        110000
                  ↷
                  10000
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>VoltageTransformer_L1> TVTR 1>VRtgSec>setVal> 0
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
        100
                  ↷
                  200
      </span>
      <mwc-icon slot="meta">
        edit
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
        IED1>>VoltageTransformer_L1> TVTR 1>Rat>setMag>f> 0
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
        1100
                  ↷
                  500
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
/* end snapshot Compare IED Plugin show compare dialog with ignorable differences no mutables are filtered, it looks like its snapshot */

