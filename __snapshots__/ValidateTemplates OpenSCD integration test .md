# `ValidateTemplates OpenSCD integration test `

## `with issues in the DataTypeTemplates section`

####   `pushes issues to the diagnostics pane that look like the latest snapshot`

```html
<c-dialog
  heading="Diagnostics"
  id="diagnostic"
>
  <filtered-list
    id="content"
    wrapfocus=""
  >
    <list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      Validate Templates
    </list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <abbr title="lnClass CSWI is missing mandatory child DO Pos
#Dummy.CSWI > Pos">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="lnClass CILO is missing mandatory child DO Beh
#Dummy.CILO > Beh">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="lnClass XSWI is missing mandatory child DO SwTyp
#Dummy.XSWI1 > SwTyp">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="The attribute type is required but missing in DO
#Dummy.invalidChild>NamPlt">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="The attribute lnClass is required but missing in LNodeType
#Dummy.MissingLnClass">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="DO:stVal has a invalid reference - type attribute cannot be connected to a template
#Dummy.LLN0.Mod>stVal">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="DO:stVal has a invalid reference - type attribute cannot be connected to a template
#Dummy.LLN0.Beh>stVal">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="Common Data Class ENS is missing mandatory child DA stVal
#Dummy.LLN0.Health">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="Common Data Class SPC is missing mandatory child DA SBO
#Dummy.SPC2">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="Common Data Class SPC is missing mandatory child DA SBOw
#Dummy.SPC1">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="Common Data Class SPC is missing mandatory child DA Cancel
#Dummy.SPC8">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="Common Data Class SPC is missing mandatory child DA Oper
#Dummy.SPC3">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="Common Data Class DPC is missing mandatory child DA t
#Dummy.XCBR1.Pos">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="Common Data Class DPC is missing mandatory child DA ctlModel
#Dummy.CSWI.Pos1">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="The attribute cdc is incorrect in the element DOType.
#Dummy.XCBR1.badNamPlt">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="The attribute cdc is required but missing in DOType
#Dummy.MissingCDC">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="The attribute type is required but missing in DA
#Dummy.MissingType>SBOw">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="The attribute type is required but missing in DA
#Dummy.MissingType>Oper">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="The attribute type is required but missing in DA
#Dummy.MissingType>Cancel">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="The attribute type is required but missing in SDO
#Dummy.badWYE>phsA">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="DO:ctlVal has a invalid reference - type attribute cannot be connected to a template
#Dummy.LLN0.Mod.SBOw>ctlVal">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="DO:ctlVal has a invalid reference - type attribute cannot be connected to a template
#Dummy.LLN0.Mod.Cancel>ctlVal">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="DAType Dummy.Operfalse is missing mandatory child BDA ctlNum
#Dummy.Operfalse">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="DAType Dummy.SBOwfalse is missing mandatory child BDA origin
#Dummy.SBOwfalse">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="DAType Dummy.Cancelfalse is missing mandatory child BDA ctlVal
#Dummy.Cancelfalse">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="DAType Dummy.ScaledValueConfig is missing mandatory child BDA scaleFactor
#Dummy.ScaledValueConfig">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="DO:SIUnit has a invalid reference - type attribute cannot be connected to a template
#Dummy.unit>SIUnit">
      <list-item
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
      </list-item>
    </abbr>
    <abbr title="DO:multiplier has a invalid reference - type attribute cannot be connected to a template
#Dummy.unit>multiplier">
      <list-item
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
      </list-item>
    </abbr>
  </filtered-list>
  <c-button
    dialogaction="close"
    slot="primaryAction"
  >
    Close
  </c-button>
</c-dialog>

```

## `with schema version smaller "2007B3"`

####   `pushes a specific issue to the diagnostics pane that look like the latest snapshot`

```html
<c-dialog
  heading="Diagnostics"
  id="diagnostic"
>
  <filtered-list
    id="content"
    wrapfocus=""
  >
    <list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      Validate Templates
    </list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <abbr title="Cannot validate DataTypeTemplates. The version of the project must be higher than or equal to 2007B3
">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          Cannot validate DataTypeTemplates. The version of the project must be higher than or equal to 2007B3
        </span>
        <span slot="secondary">
        </span>
      </list-item>
    </abbr>
  </filtered-list>
  <c-button
    dialogaction="close"
    slot="primaryAction"
  >
    Close
  </c-button>
</c-dialog>

```

