/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["ValidateTemplates OpenSCD integration test  with a valid DataTypeTemplates section shows a \"No errors\" message in the diagnostics pane"] = 
`<mwc-dialog
  heading="Diagnostics"
  id="diagnostic"
>
  <filtered-list
    id="content"
    wrapfocus=""
  >
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      Validate Templates
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <abbr title="No errors found in the project
undefined">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          No errors found in the project
        </span>
        <span slot="secondary">
        </span>
      </mwc-list-item>
    </abbr>
  </filtered-list>
  <mwc-button
    dialogaction="close"
    slot="primaryAction"
  >
    Close
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot ValidateTemplates OpenSCD integration test  with a valid DataTypeTemplates section shows a "No errors" message in the diagnostics pane */

snapshots["ValidateTemplates OpenSCD integration test  with issues in the DataTypeTemplates section pushes issues to the diagnostics pane that look like the latest snapshot"] = 
`<mwc-dialog
  heading="Diagnostics"
  id="diagnostic"
>
  <filtered-list
    id="content"
    wrapfocus=""
  >
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      Validate Templates
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <abbr title="lnClass CSWI is missing mandatory child DO Pos
#Dummy.CSWI > Pos">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          lnClass CSWI is missing mandatory child DO Pos
        </span>
        <span slot="secondary">
          #Dummy.CSWI > Pos
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="lnClass CILO is missing mandatory child DO Beh
#Dummy.CILO > Beh">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          lnClass CILO is missing mandatory child DO Beh
        </span>
        <span slot="secondary">
          #Dummy.CILO > Beh
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="lnClass XSWI is missing mandatory child DO SwTyp
#Dummy.XSWI1 > SwTyp">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          lnClass XSWI is missing mandatory child DO SwTyp
        </span>
        <span slot="secondary">
          #Dummy.XSWI1 > SwTyp
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="The attribute type is required but missing in DO
#Dummy.invalidChild>NamPlt">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          The attribute type is required but missing in DO
        </span>
        <span slot="secondary">
          #Dummy.invalidChild>NamPlt
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="The attribute lnClass is required but missing in LNodeType
#Dummy.MissingLnClass">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          The attribute lnClass is required but missing in LNodeType
        </span>
        <span slot="secondary">
          #Dummy.MissingLnClass
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DO:stVal has a invalid reference - type attribute cannot be connected to a template
#Dummy.LLN0.Mod>stVal">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DO:stVal has a invalid reference - type attribute cannot be connected to a template
        </span>
        <span slot="secondary">
          #Dummy.LLN0.Mod>stVal
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DO:stVal has a invalid reference - type attribute cannot be connected to a template
#Dummy.LLN0.Beh>stVal">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DO:stVal has a invalid reference - type attribute cannot be connected to a template
        </span>
        <span slot="secondary">
          #Dummy.LLN0.Beh>stVal
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="Common Data Class ENS is missing mandatory child DA stVal
#Dummy.LLN0.Health">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          Common Data Class ENS is missing mandatory child DA stVal
        </span>
        <span slot="secondary">
          #Dummy.LLN0.Health
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="Common Data Class SPC is missing mandatory child DA SBO
#Dummy.SPC2">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          Common Data Class SPC is missing mandatory child DA SBO
        </span>
        <span slot="secondary">
          #Dummy.SPC2
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="Common Data Class SPC is missing mandatory child DA SBOw
#Dummy.SPC1">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          Common Data Class SPC is missing mandatory child DA SBOw
        </span>
        <span slot="secondary">
          #Dummy.SPC1
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="Common Data Class SPC is missing mandatory child DA Cancel
#Dummy.SPC8">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          Common Data Class SPC is missing mandatory child DA Cancel
        </span>
        <span slot="secondary">
          #Dummy.SPC8
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="Common Data Class SPC is missing mandatory child DA Oper
#Dummy.SPC3">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          Common Data Class SPC is missing mandatory child DA Oper
        </span>
        <span slot="secondary">
          #Dummy.SPC3
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="Common Data Class DPC is missing mandatory child DA t
#Dummy.XCBR1.Pos">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          Common Data Class DPC is missing mandatory child DA t
        </span>
        <span slot="secondary">
          #Dummy.XCBR1.Pos
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="Common Data Class DPC is missing mandatory child DA ctlModel
#Dummy.CSWI.Pos1">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          Common Data Class DPC is missing mandatory child DA ctlModel
        </span>
        <span slot="secondary">
          #Dummy.CSWI.Pos1
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="The attribute cdc is incorrect in the element DOType.
#Dummy.XCBR1.badNamPlt">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          The attribute cdc is incorrect in the element DOType.
        </span>
        <span slot="secondary">
          #Dummy.XCBR1.badNamPlt
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="The attribute cdc is required but missing in DOType
#Dummy.MissingCDC">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          The attribute cdc is required but missing in DOType
        </span>
        <span slot="secondary">
          #Dummy.MissingCDC
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="The attribute type is required but missing in DA
#Dummy.MissingType>SBOw">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          The attribute type is required but missing in DA
        </span>
        <span slot="secondary">
          #Dummy.MissingType>SBOw
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="The attribute type is required but missing in DA
#Dummy.MissingType>Oper">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          The attribute type is required but missing in DA
        </span>
        <span slot="secondary">
          #Dummy.MissingType>Oper
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="The attribute type is required but missing in DA
#Dummy.MissingType>Cancel">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          The attribute type is required but missing in DA
        </span>
        <span slot="secondary">
          #Dummy.MissingType>Cancel
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="The attribute type is required but missing in SDO
#Dummy.badWYE>phsA">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          The attribute type is required but missing in SDO
        </span>
        <span slot="secondary">
          #Dummy.badWYE>phsA
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DO:ctlVal has a invalid reference - type attribute cannot be connected to a template
#Dummy.LLN0.Mod.SBOw>ctlVal">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DO:ctlVal has a invalid reference - type attribute cannot be connected to a template
        </span>
        <span slot="secondary">
          #Dummy.LLN0.Mod.SBOw>ctlVal
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DO:ctlVal has a invalid reference - type attribute cannot be connected to a template
#Dummy.LLN0.Mod.Cancel>ctlVal">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DO:ctlVal has a invalid reference - type attribute cannot be connected to a template
        </span>
        <span slot="secondary">
          #Dummy.LLN0.Mod.Cancel>ctlVal
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DAType Dummy.Operfalse is missing mandatory child BDA ctlNum
#Dummy.Operfalse">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DAType Dummy.Operfalse is missing mandatory child BDA ctlNum
        </span>
        <span slot="secondary">
          #Dummy.Operfalse
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DAType Dummy.SBOwfalse is missing mandatory child BDA origin
#Dummy.SBOwfalse">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DAType Dummy.SBOwfalse is missing mandatory child BDA origin
        </span>
        <span slot="secondary">
          #Dummy.SBOwfalse
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DAType Dummy.Cancelfalse is missing mandatory child BDA ctlVal
#Dummy.Cancelfalse">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DAType Dummy.Cancelfalse is missing mandatory child BDA ctlVal
        </span>
        <span slot="secondary">
          #Dummy.Cancelfalse
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DAType Dummy.ScaledValueConfig is missing mandatory child BDA scaleFactor
#Dummy.ScaledValueConfig">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DAType Dummy.ScaledValueConfig is missing mandatory child BDA scaleFactor
        </span>
        <span slot="secondary">
          #Dummy.ScaledValueConfig
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DO:SIUnit has a invalid reference - type attribute cannot be connected to a template
#Dummy.unit>SIUnit">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DO:SIUnit has a invalid reference - type attribute cannot be connected to a template
        </span>
        <span slot="secondary">
          #Dummy.unit>SIUnit
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DO:multiplier has a invalid reference - type attribute cannot be connected to a template
#Dummy.unit>multiplier">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DO:multiplier has a invalid reference - type attribute cannot be connected to a template
        </span>
        <span slot="secondary">
          #Dummy.unit>multiplier
        </span>
      </mwc-list-item>
    </abbr>
  </filtered-list>
  <mwc-button
    dialogaction="close"
    slot="primaryAction"
  >
    Close
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot ValidateTemplates OpenSCD integration test  with issues in the DataTypeTemplates section pushes issues to the diagnostics pane that look like the latest snapshot */

snapshots["ValidateTemplates OpenSCD integration test  with schema version smaller \"2007B3\" looks like the latest snapshot"] = 
`<mwc-dialog
  heading="Diagnostics"
  id="diagnostic"
>
  <filtered-list
    id="content"
    wrapfocus=""
  >
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      Validate Templates
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <abbr title="Cannot validate DataTypeTemplates. The version of the project must be higher than or equal to 2007B3
">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          Cannot validate DataTypeTemplates. The version of the project must be higher than or equal to 2007B3
        </span>
        <span slot="secondary">
        </span>
      </mwc-list-item>
    </abbr>
  </filtered-list>
  <mwc-button
    dialogaction="close"
    slot="primaryAction"
  >
    Close
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot ValidateTemplates OpenSCD integration test  with schema version smaller "2007B3" looks like the latest snapshot */

