<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<SCL xmlns:compas="https://www.lfenergy.org/compas/extension/v1" xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
  <Private type="compas_scl">
    <compas:SclName>ied_utrecht_station235</compas:SclName>
    <compas:SclFileType>CID</compas:SclFileType>
  </Private>
  <Header id="380b5e70-4753-4b59-b5b4-d51ceb26a30c" version="3.0.0" revision="Revision" toolID="toolID" nameStructure="IEDName"/>
  <IED name="IED_NAME">
    <AccessPoint name="AP_NAME">
      <Server>
        <Authentication/>
        <LDevice inst="LDPO">
          <LN0 lnClass="LLN0" inst="" lnType="LN2">
            <Inputs>
              <ExtRef intAddr="INTADDR" pDO="DO1" desc="DESC1"/>
              <ExtRef intAddr="INTADDR" pDO="DO2" desc="DESC2"/>
            </Inputs>
          </LN0>
          <LN lnClass="PIOC" inst="1" lnType="LN1">
            <Inputs>
              <ExtRef intAddr="INTADDR" pDO="DO1" desc="DESC1"/>
              <ExtRef intAddr="INTADDR" pDO="DO2" desc="DESC2"/>
            </Inputs>
          </LN>
          <LN lnClass="PIOC" inst="2" lnType="LN1">
            <Inputs>
              <ExtRef intAddr="INTADDR" pDO="DO1" desc="DESC1"/>
              <ExtRef intAddr="INTADDR" pDO="DO2" desc="DESC2"/>
            </Inputs>
          </LN>
        </LDevice>
      </Server>
    </AccessPoint>
  </IED>
  <DataTypeTemplates>
    <LNodeType lnClass="LLN0" id="LN2">
      <DO name="Beh" type="DO1" transient="false"/>
      <DO name="FACntRs" type="DO2" transient="true"/>
      <DO name="StrVal" type="DO3" transient="false"/>
    </LNodeType>
    <LNodeType lnClass="PIOC" id="LN1">
      <DO name="Beh" type="DO1" transient="false"/>
      <DO name="FACntRs" type="DO2" transient="true"/>
      <DO name="StrVal" type="DO3" transient="false"/>
    </LNodeType>
    <LNodeType lnClass="CSWI" id="LN3">
      <DO name="Mod" type="OpenSCD_ENCMod"/>
      <DO name="Beh" type="OpenSCD_ENSBeh"/>
      <DO name="Health" type="OpenSCD_ENSHealth"/>
      <DO name="NamPlt" type="OpenSCD_LPLnoLD"/>
      <DO name="LocKey" type="OpenSCD_SPSsimple"/>
      <DO name="Loc" type="OpenSCD_SPSsimple"/>
      <DO name="Pos" type="OpenSCD_DPC"/>
    </LNodeType>
    <DOType cdc="WYE" id="DO1">
      <DA fc="DC" dchg="false" qchg="false" dupd="false" name="dataNs" bType="VisString255">
        <Val>IEC 61850-7-3:2007B</Val>
      </DA>
      <DA fc="CF" dchg="true" qchg="false" dupd="false" name="smpRate" bType="INT32U"/>
    </DOType>
    <DOType cdc="WYE" id="DO2">
      <SDO name="phsBHar" type="DO4"/>
      <DA fc="CF" dchg="true" qchg="false" dupd="true" name="angRef" bType="Enum" type="PhaseAngleReferenceKind"/>
    </DOType>
    <DOType cdc="WYE" id="DO3">
      <SDO name="neutHar" type="DO4"/>
      <DA fc="CF" dchg="true" qchg="false" dupd="false" name="smpRate" bType="INT32U"/>
      <DA fc="ST" dchg="false" qchg="false" dupd="false" name="origin" bType="Struct" type="DA3"/>
    </DOType>
    <DOType cdc="WYE" id="DO4">
      <DA fc="DC" dchg="false" qchg="false" dupd="false" name="configRev" bType="VisString255" valKind="RO" valImport="false"/>
    </DOType>
    <DOType cdc="ENS" id="OpenSCD_ENCMod">
      <DA fc="ST" dchg="true" name="origin" bType="Enum" type="OpenSCD_Originator"/>
      <DA fc="ST" dchg="true" name="stVal" bType="Enum" type="BehaviourModeKind"/>
      <DA fc="ST" qchg="true" name="q" bType="Quality"/>
      <DA fc="ST" name="t" bType="Timestamp"/>
      <DA fc="CF" name="ctlModel" bType="Enum" type="CtlModelKind">
        <Val>sbo-with-enhanced-security</Val>
      </DA>
      <DA fc="CF" name="sboTimeout" bType="INT32U">
        <Val>30000</Val>
      </DA>
      <DA fc="CF" name="operTimeout" bType="INT32U">
        <Val>600</Val>
      </DA>
      <DA fc="CO" name="SBOw" bType="Struct" type="OpenSCD_OpenSBOw"/>
      <DA fc="CO" name="Oper" bType="Struct" type="OpenSCD_OpenSBOw"/>
      <DA fc="CO" name="Cancel" bType="Struct" type="OpenSCD_Cancel"/>
    </DOType>
    <DOType cdc="ENS" id="OpenSCD_ENSBeh">
      <DA fc="ST" dchg="true" name="stVal" bType="Enum" type="BehaviourModeKind"/>
      <DA fc="ST" qchg="true" name="q" bType="Quality"/>
      <DA fc="ST" name="t" bType="Timestamp"/>
    </DOType>
    <DOType cdc="ENS" id="OpenSCD_ENSHealth">
      <DA fc="ST" dchg="true" name="stVal" bType="Enum" type="HealthKind"/>
      <DA fc="ST" qchg="true" name="q" bType="Quality"/>
      <DA fc="ST" name="t" bType="Timestamp"/>
    </DOType>
    <DOType cdc="LPL" id="OpenSCD_LPLnoLD">
      <DA fc="DC" name="vendor" bType="VisString255" valKind="RO"/>
      <DA fc="DC" name="swRev" bType="VisString255" valKind="RO"/>
      <DA fc="DC" name="d" bType="VisString255" valKind="RO"/>
      <DA fc="DC" name="configRev" bType="VisString255" valKind="RO"/>
    </DOType>
    <DOType cdc="SPS" id="OpenSCD_SPSsimple">
      <DA fc="ST" dchg="true" name="stVal" bType="BOOLEAN"/>
      <DA fc="ST" qchg="true" name="q" bType="Quality"/>
      <DA fc="ST" name="t" bType="Timestamp"/>
      <DA fc="DC" name="d" bType="VisString255"/>
    </DOType>
    <DOType cdc="DPC" id="OpenSCD_DPC">
      <DA fc="ST" dchg="true" name="origin" bType="Enum" type="OpenSCD_Originator"/>
      <DA fc="ST" dchg="true" name="stVal" bType="Enum" type="BehaviourModeKind"/>
      <DA fc="ST" qchg="true" name="q" bType="Quality"/>
      <DA fc="ST" name="t" bType="Timestamp"/>
      <DA fc="CF" name="ctlModel" bType="Enum" type="CtlModelKind">
        <Val>sbo-with-enhanced-security</Val>
      </DA>
      <DA fc="CF" name="sboTimeout" bType="INT32U">
        <Val>30000</Val>
      </DA>
      <DA fc="CF" name="operTimeout" bType="INT32U">
        <Val>600</Val>
      </DA>
      <DA fc="CO" name="pulseConfig" bType="Struct" type="OpenSCD_PulseConfig"/>
      <DA fc="CO" name="SBOw" bType="Struct" type="OpenSCD_OpenSBOw"/>
      <DA fc="CO" name="Oper" bType="Struct" type="OpenSCD_OpenSBOw"/>
      <DA fc="CO" name="Cancel" bType="Struct" type="OpenSCD_Cancel"/>
    </DOType>
    <DAType id="DA1">
      <BDA name="operTm" bType="Timestamp"/>
      <BDA name="origin" bType="Struct" type="DA3"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="DA2">
      <BDA name="T" bType="Timestamp"/>
      <BDA name="ctlVal" bType="Enum" type="RecCycModKind"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="DA3">
      <BDA name="Check" bType="Check"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_Originator">
      <BDA name="orCat" bType="Enum" type="OriginatorCategoryKind"/>
      <BDA name="orIdent" bType="Octet64"/>
    </DAType>
    <DAType id="OpenSCD_OpenSBOw">
      <BDA name="ctlVal" bType="BOOLEAN"/>
      <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
      <BDA name="ctlNum" bType="INT8U"/>
      <BDA name="T" bType="Timestamp"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <BDA name="Check" bType="Check"/>
      <ProtNs>IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_Cancel">
      <BDA name="ctlVal" bType="BOOLEAN"/>
      <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
      <BDA name="ctlNum" bType="INT8U"/>
      <BDA name="T" bType="Timestamp"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_PulseConfig">
      <BDA name="cmdQual" bType="Enum" type="OutputSignalKind"/>
      <BDA name="onDur" bType="INT32U"/>
      <BDA name="offDur" bType="INT32U"/>
      <BDA name="numPls" bType="INT32U"/>
    </DAType>
    <EnumType id="RecCycModKind">
      <EnumVal ord="1">Completed</EnumVal>
      <EnumVal ord="2">Cancelled</EnumVal>
      <EnumVal ord="3">New adjustments</EnumVal>
      <EnumVal ord="4">AnotherValue</EnumVal>
    </EnumType>
    <EnumType id="PhaseAngleReferenceKind">
      <EnumVal ord="0">Va</EnumVal>
      <EnumVal ord="1">Vb</EnumVal>
      <EnumVal ord="2">Vc</EnumVal>
      <EnumVal ord="3">Aa</EnumVal>
      <EnumVal ord="4">Ab</EnumVal>
      <EnumVal ord="5">Ac</EnumVal>
      <EnumVal ord="6">Vab</EnumVal>
      <EnumVal ord="7">Vbc</EnumVal>
      <EnumVal ord="8">Vca</EnumVal>
      <EnumVal ord="9">AnotherValue</EnumVal>
    </EnumType>
    <EnumType id="OriginatorCategoryKind">
      <EnumVal ord="0">not-supported</EnumVal>
      <EnumVal ord="1">bay-control</EnumVal>
      <EnumVal ord="2">station-control</EnumVal>
      <EnumVal ord="3">remote-control</EnumVal>
      <EnumVal ord="4">automatic-bay</EnumVal>
      <EnumVal ord="5">automatic-station</EnumVal>
      <EnumVal ord="6">automatic-remote</EnumVal>
      <EnumVal ord="7">maintenance</EnumVal>
      <EnumVal ord="8">process</EnumVal>
    </EnumType>
    <EnumType id="BehaviourModeKind">
      <EnumVal ord="1">on</EnumVal>
      <EnumVal ord="2">blocked</EnumVal>
      <EnumVal ord="3">test</EnumVal>
      <EnumVal ord="4">test/blocked</EnumVal>
      <EnumVal ord="5">off</EnumVal>
    </EnumType>
    <EnumType id="CtlModelKind">
      <EnumVal ord="0">status-only</EnumVal>
      <EnumVal ord="1">direct-with-normal-security</EnumVal>
      <EnumVal ord="2">sbo-with-normal-security</EnumVal>
      <EnumVal ord="3">direct-with-enhanced-security</EnumVal>
      <EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
    </EnumType>
    <EnumType id="HealthKind">
      <EnumVal ord="1">Ok</EnumVal>
      <EnumVal ord="2">Warning</EnumVal>
      <EnumVal ord="3">Alarm</EnumVal>
    </EnumType>
    <EnumType id="OutputSignalKind">
      <EnumVal ord="0">pulse</EnumVal>
      <EnumVal ord="1">persistent</EnumVal>
      <EnumVal ord="2">persistent-feedback</EnumVal>
    </EnumType>
  </DataTypeTemplates>
</SCL>
