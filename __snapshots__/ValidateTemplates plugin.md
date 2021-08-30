# `ValidateTemplates plugin`

#### `pushes issues to the diagnostics pane that look like the latest snapshot`

```html
<mwc-dialog
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
    <abbr title="Control service related DA of type Oper is missing
#Dummy.SPC3">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          Control service related DA of type Oper is missing
        </span>
        <span slot="secondary">
          #Dummy.SPC3
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="Missing ctlModel definition. Cannot validate ctlModel Val within DOType Dummy.CSWI.Pos1
#Dummy.CSWI.Pos1">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          Missing ctlModel definition. Cannot validate ctlModel Val within DOType Dummy.CSWI.Pos1
        </span>
        <span slot="secondary">
          #Dummy.CSWI.Pos1
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DOType LPH is missing mandatory child DO LPL
#Dummy.XCBR1.NamPlt > NamPlt">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DOType LPH is missing mandatory child DO LPL
        </span>
        <span slot="secondary">
          #Dummy.XCBR1.NamPlt > NamPlt
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DOType LPH is missing mandatory child DO LPL
#Dummy.XCBR1.NamPlt > NamPlt">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DOType LPH is missing mandatory child DO LPL
        </span>
        <span slot="secondary">
          #Dummy.XCBR1.NamPlt > NamPlt
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DOType LPH is missing mandatory child DO LPL
#Dummy.XCBR1.NamPlt > NamPlt">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DOType LPH is missing mandatory child DO LPL
        </span>
        <span slot="secondary">
          #Dummy.XCBR1.NamPlt > NamPlt
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DOType LPH is missing mandatory child DO LPL
#Dummy.XCBR1.NamPlt > NamPlt">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DOType LPH is missing mandatory child DO LPL
        </span>
        <span slot="secondary">
          #Dummy.XCBR1.NamPlt > NamPlt
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DOType LPH is missing mandatory child DO LPL
#Dummy.XCBR1.NamPlt > NamPlt">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DOType LPH is missing mandatory child DO LPL
        </span>
        <span slot="secondary">
          #Dummy.XCBR1.NamPlt > NamPlt
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DOType LPH is missing mandatory child DO LPL
#Dummy.XCBR1.NamPlt > NamPlt">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DOType LPH is missing mandatory child DO LPL
        </span>
        <span slot="secondary">
          #Dummy.XCBR1.NamPlt > NamPlt
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
    <abbr title="Control service related DA of type SBO is missing
#Dummy.SPC2">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          Control service related DA of type SBO is missing
        </span>
        <span slot="secondary">
          #Dummy.SPC2
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="Control service related DA of type SBOw is missing
#Dummy.SPC1">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          Control service related DA of type SBOw is missing
        </span>
        <span slot="secondary">
          #Dummy.SPC1
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="Control service related DA of type Cancel is missing
#Dummy.SPC8">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          Control service related DA of type Cancel is missing
        </span>
        <span slot="secondary">
          #Dummy.SPC8
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DAType Dummy.LPHD1.Sim.Operfalse is missing mandatory child BDA ctlNum
#Dummy.LPHD1.Sim.Operfalse">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DAType Dummy.LPHD1.Sim.Operfalse is missing mandatory child BDA ctlNum
        </span>
        <span slot="secondary">
          #Dummy.LPHD1.Sim.Operfalse
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
    <abbr title="DAType Dummy.ScaledValueConfig is missing mandatory child DA scaleFactor
[object Element]">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DAType Dummy.ScaledValueConfig is missing mandatory child DA scaleFactor
        </span>
        <span slot="secondary">
          [object Element]
        </span>
      </mwc-list-item>
    </abbr>
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
    <abbr title="SBOw Dummy.LPHD1.Sim.SBOwfalse is missing mandatory child BDA origin
#Dummy.LPHD1.Sim.SBOwfalse">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          SBOw Dummy.LPHD1.Sim.SBOwfalse is missing mandatory child BDA origin
        </span>
        <span slot="secondary">
          #Dummy.LPHD1.Sim.SBOwfalse
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="DAType Dummy.LPHD1.Sim.Cancelfalse is missing mandatory child BDA ctlVal
#Dummy.LPHD1.Sim.Cancelfalse">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          DAType Dummy.LPHD1.Sim.Cancelfalse is missing mandatory child BDA ctlVal
        </span>
        <span slot="secondary">
          #Dummy.LPHD1.Sim.Cancelfalse
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

```

