/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["abstractda wizards renderWizard looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="close"
  heading="title"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      dialoginitialfocus=""
      helper="[scl.name]"
      label="name"
      maxlength="60"
      pattern="((T)|(Test)|(Check)|(SIUnit)|(Oper)|(SBO)|(SBOw)|(Cancel)|[a-z][0-9A-Za-z]*)"
      required=""
    >
      >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[scl.desc]"
      label="desc"
      nullable=""
      pattern="([ -~]|[]|[ -퟿]|[-�])*"
    >
    </wizard-textfield>
    <wizard-select
      fixedmenuposition=""
      helper="[scl.bType]"
      label="bType"
      required=""
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="BOOLEAN"
      >
        BOOLEAN
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="INT8"
      >
        INT8
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="INT16"
      >
        INT16
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="INT24"
      >
        INT24
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="INT32"
      >
        INT32
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="INT64"
      >
        INT64
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="INT128"
      >
        INT128
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="INT8U"
      >
        INT8U
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="INT16U"
      >
        INT16U
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="INT24U"
      >
        INT24U
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="INT32U"
      >
        INT32U
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="FLOAT32"
      >
        FLOAT32
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="FLOAT64"
      >
        FLOAT64
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Enum"
      >
        Enum
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Dbpos"
      >
        Dbpos
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Tcmd"
      >
        Tcmd
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Quality"
      >
        Quality
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Timestamp"
      >
        Timestamp
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="VisString32"
      >
        VisString32
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="VisString64"
      >
        VisString64
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="VisString65"
      >
        VisString65
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="VisString129"
      >
        VisString129
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="VisString255"
      >
        VisString255
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Octet64"
      >
        Octet64
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Unicode255"
      >
        Unicode255
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Struct"
      >
        Struct
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="EntryTime"
      >
        EntryTime
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Check"
      >
        Check
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="ObjRef"
      >
        ObjRef
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Currency"
      >
        Currency
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="PhyComAddr"
      >
        PhyComAddr
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="TrgOps"
      >
        TrgOps
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="OptFlds"
      >
        OptFlds
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="SvOptFlds"
      >
        SvOptFlds
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="EntryID"
      >
        EntryID
      </mwc-list-item>
    </wizard-select>
    <wizard-select
      fixedmenuposition=""
      helper="[scl.type]"
      label="type"
    >
      <mwc-list-item
        aria-disabled="false"
        class="Struct"
        mwc-list-item=""
        tabindex="-1"
        value="AnalogueValue_i"
      >
        AnalogueValue_i
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        class="Struct"
        mwc-list-item=""
        tabindex="-1"
        value="ScaledValueConfig"
      >
        ScaledValueConfig
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        class="Struct"
        mwc-list-item=""
        tabindex="-1"
        value="Dummy_origin"
      >
        Dummy_origin
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        class="Struct"
        mwc-list-item=""
        tabindex="-1"
        value="Dummy.LLN0.Mod.SBOw"
      >
        Dummy.LLN0.Mod.SBOw
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        class="Struct"
        mwc-list-item=""
        tabindex="-1"
        value="Dummy.LLN0.Mod.Cancel"
      >
        Dummy.LLN0.Mod.Cancel
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        class="Struct"
        mwc-list-item=""
        tabindex="-1"
        value="Dummy.LPHD1.Sim.SBOw"
      >
        Dummy.LPHD1.Sim.SBOw
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        class="Struct"
        mwc-list-item=""
        tabindex="-1"
        value="Dummy.LPHD1.Sim.Cancel"
      >
        Dummy.LPHD1.Sim.Cancel
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        class="Enum"
        mwc-list-item=""
        tabindex="-1"
        value="Dummy_ctlModel"
      >
        Dummy_ctlModel
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        class="Enum"
        mwc-list-item=""
        tabindex="-1"
        value="Dummy_Beh"
      >
        Dummy_Beh
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        class="Enum"
        mwc-list-item=""
        tabindex="-1"
        value="Dummy_Health"
      >
        Dummy_Health
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        class="Enum"
        mwc-list-item=""
        tabindex="-1"
        value="Dummy_orCategory"
      >
        Dummy_orCategory
      </mwc-list-item>
    </wizard-select>
    <wizard-textfield
      disabled=""
      helper="[scl.sAddr]"
      label="sAddr"
      nullable=""
      pattern="([ -~]|[]|[ -퟿]|[-�])*"
    >
    </wizard-textfield>
    <wizard-select
      disabled=""
      fixedmenuposition=""
      helper="[scl.valKind]"
      label="valKind"
      nullable=""
      required=""
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Spec"
      >
        Spec
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Conf"
      >
        Conf
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="RO"
      >
        RO
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Set"
      >
        Set
      </mwc-list-item>
    </wizard-select>
    <wizard-checkbox
      helper="[scl.valImport]"
      label="valImport"
      nullable=""
      required=""
    >
    </wizard-checkbox>
    <wizard-select
      helper="[scl.Val]"
      label="Val"
      nullable=""
    >
    </wizard-select>
    <wizard-textfield
      helper="[scl.Val]"
      label="Val"
      nullable=""
    >
    </wizard-textfield>
  </div>
  <mwc-button
    dialogaction="close"
    label="[cancel]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot abstractda wizards renderWizard looks like the latest snapshot */

