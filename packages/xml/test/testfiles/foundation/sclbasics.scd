<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
  <Header id="OpenSCD_DataTypeTemplates"/>
  <IED name="testIED">
    <AccessPoint name="AP1">
        <Server>
            <Authentication/>
            <LDevice inst="ldInst1">
                <LN0 lnClass="LLN0" inst="" lnType="OpenSCD_LLN0_mainLD"/>
                <LN prefix="my" lnClass="MMXU" inst="1" lnType="OpenSCD_MMXU"/>
            </LDevice>
        </Server>
    </AccessPoint>
  </IED>
  <DataTypeTemplates>
    <LNodeType lnClass="ATCC" id="OpenSCD_ATCC_noPB" desc="Auto Tap changer controller: no process bus(PB)">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
      <DO name="TapChg" type="OpenSCD_BSC_TapChg_ATCC"/>
      <DO name="TapPos" type="OpenSCD_ISC_TapPos_ATCC"/>
      <DO name="VolSpt" type="OpenSCD_APC_VolSpt_ATCC"/>
      <DO name="BndCtrChg" type="OpenSCD_BAC_BndCtrChg_ATCC"/>
      <DO name="Auto" type="OpenSCD_SPC_Auto_ATCC"/>
    </LNodeType>
    <LNodeType lnClass="ATCC" id="OpenSCD_ATCC_PB" desc="Auto Tap changer controller: process bus">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
      <DO name="TapChg" type="OpenSCD_BSC_TapChg_ATCC"/>
      <DO name="TapPos" type="OpenSCD_ISC_TapPos_ATCC"/>
      <DO name="VolSpt" type="OpenSCD_APC_VolSpt_ATCC"/>
      <DO name="BndCtrChg" type="OpenSCD_BAC_BndCtrChg_ATCC"/>
      <DO name="Auto" type="OpenSCD_SPC_Auto_ATCC"/>
      <DO name="TapOpR" transient="true" type="OpenSCD_SPS_simple"/>
      <DO name="TapOpL" transient="true" type="OpenSCD_SPS_simple"/>
      <DO name="TapOpStop" transient="true" type="OpenSCD_SPS_simple"/>
    </LNodeType>
    <LNodeType lnClass="CSWI" id="OpenSCD_CSWI_noPB" desc="Switch control: no process bus(PB)">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
      <DO name="Pos" type="OpenSCD_DPC"/>
    </LNodeType>
    <LNodeType lnClass="CSWI" id="OpenSCD_CSWI_PB_threephase" desc="Switch control: three phase">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
      <DO name="Pos" type="OpenSCD_DPC"/>
      <DO name="OpOpn" transient="true" type="OpenSCD_ACT_general_control"/>
      <DO name="OpCls" transient="true" type="OpenSCD_ACT_general_control"/>
      <DO name="SelOpn" type="OpenSCD_SPS_simple"/>
      <DO name="SelCls" type="OpenSCD_SPS_simple"/>
    </LNodeType>
    <LNodeType lnClass="CSWI" id="OpenSCD_CSWI_PB_singlephase" desc="Switch control: single phase">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
      <DO name="LocSta" type="OpenSCD_SPC_LocSta"/>
      <DO name="Pos" type="OpenSCD_DPC"/>
      <DO name="OpOpn" transient="true" type="OpenSCD_ACT_threephase_control"/>
      <DO name="OpCls" transient="true" type="OpenSCD_ACT_threephase_control"/>
      <DO name="SelOpn" type="OpenSCD_SPS_simple"/>
      <DO name="SelCls" type="OpenSCD_SPS_simple"/>
      <DO name="PosA" type="OpenSCD_DPC_statusonly"/>
      <DO name="PosB" type="OpenSCD_DPC_statusonly"/>
      <DO name="PosC" type="OpenSCD_DPC_statusonly"/>
    </LNodeType>
    <LNodeType lnClass="CILO" id="OpenSCD_CILO" desc="Interlocking">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="EnaOpn" type="OpenSCD_SPS_simple"/>
      <DO name="EnaCls" type="OpenSCD_SPS_simple"/>
    </LNodeType>
    <LNodeType lnClass="LLN0" id="OpenSCD_LLN0_refLD" desc="Logical device LN: referenced">
      <DO name="Mod" type="OpenSCD_ENC_Mod_statusonly"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_LD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
      <DO name="GrRef" type="OpenSCD_ORG_GrRef"/>
    </LNodeType>
    <LNodeType lnClass="LLN0" id="OpenSCD_LLN0_mainLD" desc="Logical device LN: parent">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_LD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
    </LNodeType>
    <LNodeType lnClass="LPHD" id="OpenSCD_LPHD" desc="Physical device">
      <DO name="PhyNam" type="OpenSCD_DPL"/>
      <DO name="PhyHealth" type="OpenSCD_ENS_Health"/>
      <DO name="Proxy" type="OpenSCD_SPS_simple"/>
      <DO name="PwrUp" type="OpenSCD_SPS_simple"/>
      <DO name="Sim" type="OpenSCD_SPC_LocSta"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
    </LNodeType>
    <LNodeType lnClass="MMXU" id="OpenSCD_MMXU" desc="Three phase measurement">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="TotW" type="OpenSCD_MV_db_int"/>
      <DO name="TotVAr" type="OpenSCD_MV_db_int"/>
      <DO name="TotVA" type="OpenSCD_MV_db_int"/>
      <DO name="Hz" type="OpenSCD_MV_db_int"/>
      <DO name="PPV" type="OpenSCD_DEL"/>
      <DO name="PhV" type="OpenSCD_WYE_phases"/>
      <DO name="A" type="OpenSCD_WYE_phases"/>
      <DO name="W" type="OpenSCD_WYE_phases"/>
      <DO name="VAr" type="OpenSCD_WYE_phases"/>
      <DO name="VA" type="OpenSCD_WYE_phases"/>
    </LNodeType>
    <LNodeType lnClass="PTRC" id="OpenSCD_PTRC_general" desc="Trip conditioning: General trip signal">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="Tr" type="OpenSCD_ACT_general"/>
      <DO name="Op" transient="true" type="OpenSCD_ACT_general"/>
      <DO name="Str" type="OpenSCD_ACD_general"/>
    </LNodeType>
    <LNodeType lnClass="RSYC" id="OpenSCD_RSYC" desc="Synchronism check">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
      <DO name="Rel" type="OpenSCD_SPS_simple" desc="Release signal"/>
    </LNodeType>
    <LNodeType lnClass="TCTR" id="OpenSCD_TCTR" desc="Current transformer">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="AmpSv" type="OpenSCD_SAV_AmpSv_TCTR"/>
      <DO name="ARtg" type="OpenSCD_ASG_ATrg_TCTR"/>
      <DO name="HzRtg" type="OpenSCD_ASG_HzRtg_TCTR"/>
    </LNodeType>
    <LNodeType lnClass="TVTR" id="OpenSCD_TVTR" desc="Voltage transformer">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="VolSv" type="OpenSCD_SAV_VolSv_TVTR"/>
      <DO name="VRtg" type="OpenSCD_ASG_VRtg_TVTR"/>
      <DO name="HzRtg" type="OpenSCD_ASG_HzRtg_TCTR"/>
    </LNodeType>
    <LNodeType lnClass="XSWI" id="OpenSCD_XSWI_noPB" desc="Switch: no process bus(PB)">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
      <DO name="OpCnt" type="OpenSCD_INS_simple"/>
      <DO name="Pos" type="OpenSCD_DPC_statusonly"/>
      <DO name="BlkOpn" type="OpenSCD_SPC_statusonly"/>
      <DO name="BlkCls" type="OpenSCD_SPC_statusonly"/>
      <DO name="SwTyp" type="OpenSCD_ENS_SwTyp"/>
    </LNodeType>
    <LNodeType lnClass="XSWI" id="OpenSCD_XSWI_PB_threephase" desc="Switch: three phase represenation">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
      <DO name="OpCnt" type="OpenSCD_INS_simple"/>
      <DO name="Pos" type="OpenSCD_DPC_statusonly"/>
      <DO name="BlkOpn" type="OpenSCD_SPC_statusonly"/>
      <DO name="BlkCls" type="OpenSCD_SPC_statusonly"/>
      <DO name="SwTyp" type="OpenSCD_ENS_SwTyp"/>
      <DO name="Dsc" type="OpenSCD_SPS_simple"/>
    </LNodeType>
    <LNodeType lnClass="XSWI" id="OpenSCD_XSWI_PB_onephase" desc="Switch: one phase represenation">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
      <DO name="OpCnt" type="OpenSCD_INS_simple"/>
      <DO name="Pos" type="OpenSCD_DPC_statusonly"/>
      <DO name="BlkOpn" type="OpenSCD_SPC_statusonly"/>
      <DO name="BlkCls" type="OpenSCD_SPC_statusonly"/>
      <DO name="SwTyp" type="OpenSCD_ENS_SwTyp"/>
    </LNodeType>
    <LNodeType lnClass="XCBR" id="OpenSCD_XCBR_noPB" desc="Circuit Breaker: no process bus(PB)">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
      <DO name="OpCnt" type="OpenSCD_INS_simple"/>
      <DO name="Pos" type="OpenSCD_DPC_statusonly"/>
      <DO name="BlkOpn" type="OpenSCD_SPC_statusonly"/>
      <DO name="BlkCls" type="OpenSCD_SPC_statusonly"/>
    </LNodeType>
    <LNodeType lnClass="XCBR" id="OpenSCD_XCBR_PB_onephase" desc="Circuit Breaker: one phase representation">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
      <DO name="OpCnt" type="OpenSCD_INS_simple"/>
      <DO name="Pos" type="OpenSCD_DPC_statusonly"/>
      <DO name="BlkOpn" type="OpenSCD_SPC_statusonly"/>
      <DO name="BlkCls" type="OpenSCD_SPC_statusonly"/>
    </LNodeType>
    <LNodeType lnClass="XCBR" id="OpenSCD_XCBR_PB_threephase" desc="Circuit Breaker: three phase representation">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
      <DO name="OpCnt" type="OpenSCD_INS_simple"/>
      <DO name="Pos" type="OpenSCD_DPC_statusonly"/>
      <DO name="BlkOpn" type="OpenSCD_SPC_statusonly"/>
      <DO name="BlkCls" type="OpenSCD_SPC_statusonly"/>
      <DO name="Dsc" type="OpenSCD_SPS_simple"/>
    </LNodeType>
    <LNodeType lnClass="YLTC" id="OpenSCD_YLTC" desc="Tap changer">
      <DO name="Mod" type="OpenSCD_ENC_Mod"/>
      <DO name="Beh" type="OpenSCD_ENS_Beh"/>
      <DO name="Health" type="OpenSCD_ENS_Health"/>
      <DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
      <DO name="LocKey" type="OpenSCD_SPS_simple"/>
      <DO name="Loc" type="OpenSCD_SPS_simple"/>
      <DO name="TapChg" type="OpenSCD_BSC_TapChg_YLTC"/>
      <DO name="TapPos" type="OpenSCD_ISC_TapPos_YLTC"/>
      <DO name="EndPosR" type="OpenSCD_SPS_simple"/>
      <DO name="EndPosL" type="OpenSCD_SPS_simple"/>
    </LNodeType>
    <DOType cdc="ACD" id="OpenSCD_ACD_general">
      <DA name="general" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="dirGeneral" bType="Enum" dchg="true" type="FaultDirectionKind" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST" />
      <DA name="t" bType="Timestamp" fc="ST" />
    </DOType>
    <DOType cdc="ACD" id="OpenSCD_ACD_threephase">
      <DA name="general" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="dirGeneral" bType="Enum" dchg="true" type="FaultDirectionKind" fc="ST"/>
      <DA name="phsA" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="phsB" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="phsC" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="dirPhsA" bType="Enum" dchg="true" type="PhaseFaultDirectionKind" fc="ST"/>
      <DA name="dirPhsB" bType="Enum" dchg="true" type="PhaseFaultDirectionKind" fc="ST"/>
      <DA name="dirPhsC" bType="Enum" dchg="true" type="PhaseFaultDirectionKind" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST" />
    </DOType>
    <DOType cdc="ACT" id="OpenSCD_ACT_general_control">
      <DA name="general" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="originSrc" bType="Struct" type="OpenSCD_Originator" fc="ST"/>
    </DOType>
    <DOType cdc="ACT" id="OpenSCD_ACT_threephase_control">
      <DA name="general" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="phsA" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="phsB" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="phsC" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="originSrc" bType="Struct" type="OpenSCD_Originator" fc="ST"/>
    </DOType>
    <DOType cdc="ACT" id="OpenSCD_ACT_general">
      <DA name="general" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST" />
      <DA name="t" bType="Timestamp" fc="ST" />
    </DOType>
    <DOType cdc="APC" id="OpenSCD_APC_VolSpt_ATCC">
      <DA name="mxVal" bType="Struct" dchg="true" type="OpenSCD_AnalogueValue_FLOAT32" fc="MX"/>
      <DA name="q" bType="Quality" qchg="true"  fc="MX"/>
      <DA name="t" bType="Timestamp"  fc="MX"/>
      <DA name="dbRef" bType="FLOAT32" dchg="true" fc="CF"/>
      <DA name="Oper" bType="Struct" type="OpenSCD_OperSBOw_FLOAT32" fc="CO"/>
      <DA name="Cancel" bType="Struct" type="OpenSCD_Cancel_FLOAT32" fc="CO"/>
      <DA name="operTimeout" bType="INT32U" fc="CF">
        <Val>1000</Val>
      </DA>
      <DA name="ctlModel" bType="Enum" dchg="true" type="CtlModelKind" fc="CF">
        <Val>direct-with-enhanced-security</Val>
      </DA>
    </DOType>
    <DOType cdc="ASG" id="OpenSCD_ASG_ATrg_TCTR">
      <DA name="setMag" bType="Struct" type="OpenSCD_AnalogueValue_INT32" fc="SP"/>
      <DA name="units" bType="Struct" dchg="true" type="OpenSCD_Unit_A" fc="CF"/>
      <DA name="sVC" bType="Struct" dchg="true" type="ScaledValueConfig" fc="CF"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST" />
      <DA name="t" bType="Timestamp" fc="ST" />
    </DOType>
    <DOType cdc="ASG" id="OpenSCD_ASG_HzRtg_TCTR">
      <DA name="setMag" bType="Struct" type="OpenSCD_AnalogueValue_INT32" fc="SP"/>
      <DA name="units" bType="Struct" dchg="true" type="OpenSCD_Unit_Hz" fc="CF"/>
      <DA name="sVC" bType="Struct" dchg="true" type="ScaledValueConfig" fc="CF"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST" />
      <DA name="t" bType="Timestamp" fc="ST" />
    </DOType>
    <DOType cdc="ASG" id="OpenSCD_ASG_VRtg_TVTR">
      <DA name="setMag" bType="Struct" type="OpenSCD_AnalogueValue_INT32" fc="SP"/>
      <DA name="units" bType="Struct" dchg="true" type="OpenSCD_Unit_V" fc="CF"/>
      <DA name="sVC" bType="Struct" dchg="true" type="ScaledValueConfig" fc="CF"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST" />
      <DA name="t" bType="Timestamp" fc="ST" />
    </DOType>
    <DOType cdc="BAC" id="OpenSCD_BAC_BndCtrChg_ATCC">
      <DA name="mxVal" bType="Struct" dchg="true" type="OpenSCD_AnalogueValue_FLOAT32" fc="MX"/>
      <DA name="q" bType="Quality" qchg="true" fc="MX"/>
      <DA name="t" bType="Timestamp" fc="MX"/>
      <DA name="persistent" bType="BOOLEAN" dchg="true" fc="CF"/>
      <DA name="dbRef" bType="FLOAT32" dchg="true" fc="CF"/>
      <DA name="Oper" bType="Struct" type="OpenSCD_OperSBOw_StepControlKind" fc="CO"/>
      <DA name="Cancel" bType="Struct" type="OpenSCD_Cancel_StepControlKind" fc="CO"/>
      <DA name="operTimeout" bType="INT32U" fc="CF">
        <Val>1000</Val>
      </DA>
      <DA name="ctlModel" bType="Enum" dchg="true" type="CtlModelKind" fc="CF">
        <Val>direct-with-enhanced-security</Val>
      </DA>
    </DOType>
    <DOType cdc="BSC" id="OpenSCD_BSC_TapChg_ATCC">
      <DA name="valWTr" bType="Struct" dchg="true" type="OpenSCD_ValWithTrans" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true"  fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="persistent" bType="BOOLEAN" dchg="true" fc="CF"/>
      <DA name="Oper" bType="Struct" type="OpenSCD_OperSBOw_StepControlKind" fc="CO"/>
      <DA name="Cancel" bType="Struct" type="OpenSCD_Cancel_StepControlKind" fc="CO"/>
      <DA name="operTimeout" bType="INT32U" fc="CF">
        <Val>6000</Val>
      </DA>
      <DA name="ctlModel" bType="Enum" dchg="true" type="CtlModelKind" fc="CF">
        <Val>direct-with-enhanced-security</Val>
      </DA>
    </DOType>
    <DOType cdc="BSC" id="OpenSCD_BSC_TapChg_YLTC">
      <DA name="valWTr" bType="Struct" dchg="true" type="OpenSCD_ValWithTrans" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true"  fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="persistent" bType="BOOLEAN" dchg="true" fc="CF"/>
      <DA name="ctlModel" bType="Enum" dchg="true" type="OpenSCD_StatusOnly" fc="CF">
        <Val>status-only</Val>
      </DA>
    </DOType>
    <DOType cdc="CMV" id="OpenSCD_CMV_db_i_MagAndAng">
      <DA name="instCVal" bType="Struct" type="OpenSCD_Vector_I_w_Ang" fc="MX"/>
      <DA name="cVal" bType="Struct" dchg="true" type="OpenSCD_Vector_I_w_Ang" fc="MX"/>
      <DA name="q" bType="Quality" qchg="true"  fc="MX"/>
      <DA name="t" bType="Timestamp" fc="MX"/>
      <DA name="units" bType="Struct" dchg="true" type="Unit" fc="CF"/>
      <DA name="db" bType="INT32U" dchg="true" fc="CF"/>
      <DA name="dbRef" bType="FLOAT32" dchg="true" fc="CF"/>
      <DA name="zeroDb" bType="INT32U" dchg="true" fc="CF"/>
      <DA name="zeroDbRef " bType="FLOAT32" dchg="true" fc="CF"/>
      <DA name="dbAng" bType="INT32U" dchg="true" fc="CF"/>
      <DA name="dbAngRef" bType="FLOAT32" dchg="true" fc="CF"/>
      <DA name="magSVC" bType="Struct" dchg="true" type="ScaledValueConfig" fc="CF"/>
      <DA name="angSVC" bType="Struct" dchg="true" type="ScaledValueConfig" fc="CF"/>
    </DOType>
    <DOType cdc="DEL" id="OpenSCD_DEL">
      <SDO name="phsAB" type="OpenSCD_CMV_db_i_MagAndAng"/>
      <SDO name="phsBC" type="OpenSCD_CMV_db_i_MagAndAng"/>
      <SDO name="phsCA" type="OpenSCD_CMV_db_i_MagAndAng"/>
    </DOType>
    <DOType cdc="DEL" id="OpenSCD_DEL_wRef">
      <SDO name="phsAB" type="OpenSCD_CMV_db_i_MagAndAng"/>
      <SDO name="phsBC" type="OpenSCD_CMV_db_i_MagAndAng"/>
      <SDO name="phsCA" type="OpenSCD_CMV_db_i_MagAndAng"/>
      <DA name="angRef" bType="Struct" dchg="true" fc="CF"/>
    </DOType>
    <DOType cdc="DPL" id="OpenSCD_DPL">
      <DA name="vendor" bType="VisString255" fc="DC"/>
      <DA name="hwRev" bType="VisString255" fc="DC"/>
      <DA name="swRev" bType="VisString255" fc="DC"/>
      <DA name="serNum" bType="VisString255" fc="DC"/>
      <DA name="model" bType="VisString255" fc="DC"/>
      <DA name="location" bType="VisString255" fc="DC"/>
      <DA name="owner" bType="VisString255" fc="DC"/>
      <DA name="d" bType="VisString255" fc="DC"/>
    </DOType>
    <DOType cdc="DPC" id="OpenSCD_DPC_statusonly">
      <DA name="stVal" bType="Dbpos" dchg="true" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="ctlModel" bType="Enum" fc="CF" type="OpenSCD_StatusOnly">
        <Val>status-only</Val>
      </DA>
    </DOType>
    <DOType cdc="DPC" id="OpenSCD_DPC">
      <DA name="origin" bType="Struct" dchg="true" fc="ST" type="OpenSCD_Originator"/>
      <DA name="stVal" bType="Enum" dchg="true" fc="ST" type="BehaviourModeKind"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="ctlModel" bType="Enum" fc="CF" type="CtlModelKind">
        <Val>sbo-with-enhanced-security</Val>
      </DA>
      <DA name="sboTimeout" bType="INT32U" fc="CF">
        <Val>30000</Val>
      </DA>
      <DA name="operTimeout" bType="INT32U" fc="CF">
        <Val>600</Val>
      </DA>
      <DA name="pulseConfig" bType="Struct" fc="CO" type="OpenSCD_PulseConfig"/>
      <DA name="SBOw" bType="Struct" fc="CO" type="OpenSCD_OperSBOw_Dbpos"/>
      <DA name="Oper" bType="Struct" fc="CO" type="OpenSCD_OperSBOw_Dbpos"/>
      <DA name="Cancel" bType="Struct" fc="CO" type="OpenSCD_Cancel_Dbpos"/>
    </DOType>
    <DOType cdc="DPS" id="OpenSCD_DPSsimple">
      <DA name="stVal" bType="Dbpos" dchg="true" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="d" bType="VisString255" fc="DC"/>
    </DOType>
    <DOType cdc="ENS" id="OpenSCD_ENS_Beh">
      <DA name="stVal" bType="Enum" dchg="true" fc="ST" type="BehaviourModeKind"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
    </DOType>
    <DOType cdc="ENC" id="OpenSCD_ENC_Mod">
      <DA name="origin" bType="Struct" dchg="true" fc="ST" type="OpenSCD_Originator"/>
      <DA name="stVal" bType="Enum" dchg="true" fc="ST" type="BehaviourModeKind"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="ctlModel" bType="Enum" fc="CF" type="CtlModelKind">
        <Val>sbo-with-enhanced-security</Val>
      </DA>
      <DA name="sboTimeout" bType="INT32U" fc="CF">
        <Val>30000</Val>
      </DA>
      <DA name="operTimeout" bType="INT32U" fc="CF">
        <Val>600</Val>
      </DA>
      <DA name="SBOw" bType="Struct" fc="CO" type="OpenSCD_OperSBOw_BehaviourModeKind"/>
      <DA name="Oper" bType="Struct" fc="CO" type="OpenSCD_OperSBOw_BehaviourModeKind"/>
      <DA name="Cancel" bType="Struct" fc="CO" type="OpenSCD_Cancel_BehaviourModeKind"/>
    </DOType>
    <DOType cdc="ENC" id="OpenSCD_ENC_Mod_statusonly">
      <DA name="origin" bType="Enum" dchg="true" fc="ST" type="OpenSCD_Originator"/>
      <DA name="stVal" bType="Enum" dchg="true" fc="ST" type="BehaviourModeKind"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="ctlModel" bType="Enum" fc="CF" type="OpenSCD_StatusOnly">
        <Val>status-only</Val>
      </DA>
    </DOType>
    <DOType cdc="ENS" id="OpenSCD_ENS_Health">
      <DA name="stVal" bType="Enum" dchg="true" fc="ST" type="HealthKind"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
    </DOType>
    <DOType cdc="ENS" id="OpenSCD_ENS_SwTyp">
      <DA fc="ST" dchg="true" name="stVal" bType="Enum" type="SwitchFunctionKind"/>
      <DA fc="ST" qchg="true" name="q" bType="Quality"/>
      <DA fc="ST" name="t" bType="Timestamp"/>
    </DOType>
    <DOType cdc="INS" id="OpenSCD_INS_simple">
      <DA name="stVal" bType="INT32" dchg="true" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="d" bType="VisString255" fc="DC"/>
    </DOType>
    <DOType cdc="ISC" id="OpenSCD_ISC_TapPos_ATCC">
      <DA name="valWTr" bType="Struct" dchg="true" type="OpenSCD_ValWithTrans" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true"  fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="persistent" bType="BOOLEAN" dchg="true" fc="CF"/>
      <DA name="Oper" bType="Struct" type="OpenSCD_OperSBOw_INT8" fc="CO"/>
      <DA name="Cancel" bType="Struct" type="OpenSCD_Cancel_INT8" fc="CO"/>
      <DA name="operTimeout" bType="INT32U" fc="CF">
        <Val>6000</Val>
      </DA>
      <DA name="ctlModel" bType="Enum" dchg="true" type="CtlModelKind" fc="CF">
        <Val>direct-with-enhanced-security</Val>
      </DA>
    </DOType>
    <DOType cdc="ISC" id="OpenSCD_ISC_TapPos_YLTC">
      <DA name="valWTr" bType="Struct" dchg="true" type="OpenSCD_ValWithTrans" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true"  fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="persistent" bType="BOOLEAN" dchg="true" fc="CF"/>
      <DA name="ctlModel" bType="Enum" dchg="true" type="OpenSCD_StatusOnly" fc="CF">
        <Val>status-only</Val>
      </DA>
    </DOType>
    <DOType cdc="LPL" id="OpenSCD_LPL_LD">
      <DA name="vendor" bType="VisString255" fc="DC"/>
      <DA name="swRev" bType="VisString255" fc="DC"/>
      <DA name="d" bType="VisString255" fc="DC"/>
      <DA name="configRev" bType="VisString255" fc="DC" />
      <DA name="ldNs" bType="VisString255" fc="EX">
        <Val>IEC 61850-7-4:2007B4</Val>
      </DA>
    </DOType>
    <DOType cdc="LPL" id="OpenSCD_LPL_noLD">
      <DA name="vendor" bType="VisString255"  fc="DC"/>
      <DA name="swRev" bType="VisString255" fc="DC"/>
      <DA name="d" bType="VisString255" fc="DC"/>
      <DA name="configRev" bType="VisString255" fc="DC"/>
    </DOType>
    <DOType cdc="MV" id="OpenSCD_MV_db_int">
      <DA name="instMag" bType="Struct" type="OpenSCD_AnalogueValue_INT32" fc="MX"/>
      <DA name="mag" bType="Struct" dchg="true" dupd="true" type="OpenSCD_AnalogueValue_INT32" fc="MX"/>
      <DA name="q" bType="Quality" qchg="true" fc="MX"/>
      <DA name="t" bType="Timestamp" fc="MX"/>
      <DA name="db" bType="INT32U" dchg="true" fc="CF"/>
      <DA name="dbRef" bType="FLOAT32" dchg="true" fc="CF"/>
      <DA name="zeroDb" bType="INT32U" dchg="true" fc="CF"/>
      <DA name="zeroDbRef " bType="FLOAT32" dchg="true" fc="CF"/>
      <DA name="sVC" bType="Struct" dchg="true" type="ScaledValueConfig" fc="CF"/>
    </DOType>
    <DOType cdc="MV" id="OpenSCD_MV_int">
      <DA name="instMag" bType="Struct" type="OpenSCD_AnalogueValue_INT32" fc="MX"/>
      <DA name="mag" bType="Struct" dchg="true" dupd="true" type="OpenSCD_AnalogueValue_INT32" fc="MX"/>
      <DA name="q" bType="Quality" qchg="true" fc="MX"/>
      <DA name="t" bType="Timestamp" fc="MX"/>
      <DA name="sVC" bType="Struct" dchg="true" type="ScaledValueConfig" fc="CF"/>
    </DOType>
    <DOType cdc="MV" id="OpenSCD_MV_db_float">
      <DA name="instMag" bType="Struct" type="OpenSCD_AnalogueValue_FLOAT32" fc="MX"/>
      <DA name="mag" bType="Struct" dchg="true" dupd="true" type="OpenSCD_AnalogueValue_FLOAT32" fc="MX"/>
      <DA name="q" bType="Quality" qchg="true" fc="MX"/>
      <DA name="t" bType="Timestamp" fc="MX"/>
      <DA name="db" bType="INT32U" dchg="true" fc="CF"/>
      <DA name="dbRef" bType="FLOAT32" dchg="true" fc="CF"/>
      <DA name="zeroDb" bType="INT32U" dchg="true" fc="CF"/>
      <DA name="zeroDbRef " bType="FLOAT32" dchg="true" fc="CF"/>
    </DOType>
    <DOType cdc="MV" id="OpenSCD_MV_float">
      <DA name="mag" bType="Struct" dchg="true" dupd="true" type="OpenSCD_AnalogueValue_FLOAT32" fc="MX"/>
      <DA name="q" bType="Quality" qchg="true" fc="MX"/>
      <DA name="t" bType="Timestamp" fc="MX"/>
    </DOType>
    <DOType cdc="ORG" id="OpenSCD_ORG_GrRef">
      <DA name="setSrcRef" bType="ObjRef" dchg="true" fc="SP"/>
    </DOType>
    <DOType cdc="SAV" id="OpenSCD_SAV_AmpSv_TCTR">
      <DA name="instMag" bType="Struct" type="OpenSCD_AnalogueValue_INT32" fc="MX"/>
      <DA name="q" bType="Quality" qchg="true" fc="MX"/>
      <DA name="t" bType="Timestamp" fc="MX"/>
      <DA name="units" bType="Struct" dchg="true" type="Unit" fc="CF"/>
      <DA name="sVC" bType="Struct" dchg="true" type="OpenSCD_ScaledValueConfig_AmpSv" fc="CF"/>
    </DOType>
    <DOType cdc="SAV" id="OpenSCD_SAV_VolSv_TVTR">
      <DA name="instMag" bType="Struct" type="OpenSCD_AnalogueValue_INT32" fc="MX"/>
      <DA name="q" bType="Quality" qchg="true" fc="MX"/>
      <DA name="t" bType="Timestamp" fc="MX"/>
      <DA name="units" bType="Struct" dchg="true" type="Unit" fc="CF"/>
      <DA name="sVC" bType="Struct" dchg="true" type="OpenSCD_ScaledValueConfig_VolSv" fc="CF"/>
    </DOType>
    <DOType cdc="SPC" id="OpenSCD_SPC_statusonly">
      <DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST" />
      <DA name="t" bType="Timestamp" fc="ST" />
      <DA name="ctlModel" bType="Enum" dchg="true" type="OpenSCD_StatusOnly" fc="CF">
        <Val>status-only</Val>
      </DA>
    </DOType>
    <DOType cdc="SPC" id="OpenSCD_SPC_Auto_ATCC">
      <DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="Oper" bType="Struct" type="OpenSCD_OperSBOw_SPC" fc="CO"/>
      <DA name="Cancel" bType="Struct" type="OpenSCD_Cancel_SPC" fc="CO"/>
      <DA name="operTimeout" bType="INT32U" fc="CF">
        <Val>1000</Val>
      </DA>
      <DA name="ctlModel" bType="Enum" dchg="true" type="CtlModelKind" fc="CF" >
        <Val>direct-with-enhanced-security</Val>
      </DA>
    </DOType>
    <DOType cdc="SPC" id="OpenSCD_SPC_LocSta">
      <DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="Oper" bType="Struct" type="OpenSCD_OperSBOw_SPC" fc="CO"/>
      <DA name="Cancel" bType="Struct" type="OpenSCD_Cancel_SPC" fc="CO"/>
      <DA name="operTimeout" bType="INT32U" fc="CF">
        <Val>1000</Val>
      </DA>
      <DA name="ctlModel" bType="Enum" dchg="true" type="CtlModelKind" fc="CF" >
        <Val>direct-with-enhanced-security</Val>
      </DA>
    </DOType>
    <DOType cdc="SPS" id="OpenSCD_SPS_simple">
      <DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
      <DA name="q" bType="Quality" qchg="true" fc="ST"/>
      <DA name="t" bType="Timestamp" fc="ST"/>
      <DA name="d" bType="VisString255" fc="DC"/>
    </DOType>
    <DOType cdc="WYE" id="OpenSCD_WYE_phases">
      <SDO name="phsA" type="OpenSCD_CMV_db_i_MagAndAng"/>
      <SDO name="phsB" type="OpenSCD_CMV_db_i_MagAndAng"/>
      <SDO name="phsC" type="OpenSCD_CMV_db_i_MagAndAng"/>
    </DOType>
    <DAType id="OpenSCD_AnalogueValue_FLOAT32">
      <BDA name="f" bType="FLOAT32"/>
    </DAType>
    <DAType id="OpenSCD_AnalogueValue_INT32">
      <BDA name="i" bType="INT32"/>
    </DAType>
    <DAType id="OpenSCD_Cancel_SPC">
      <BDA name="ctlVal" bType="BOOLEAN"/>
      <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
      <BDA name="ctlNum" bType="INT8U"/>
      <BDA name="T" bType="Timestamp"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_Cancel_Dbpos">
      <BDA name="ctlVal" bType="Dbpos"/>
      <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
      <BDA name="ctlNum" bType="INT8U"/>
      <BDA name="T" bType="Timestamp"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_Cancel_FLOAT32">
      <BDA name="ctlVal" bType="Struct" type="OpenSCD_AnalogueValue_FLOAT32"/>
      <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
      <BDA name="ctlNum" bType="INT8U"/>
      <BDA name="T" bType="Timestamp"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_Cancel_StepControlKind">
      <BDA name="ctlVal" bType="Tcmd"/>
      <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
      <BDA name="ctlNum" bType="INT8U"/>
      <BDA name="T" bType="Timestamp"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_Cancel_BehaviourModeKind">
      <BDA name="ctlVal" bType="Enum" type="BehaviourModeKind"/>
      <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
      <BDA name="ctlNum" bType="INT8U"/>
      <BDA name="T" bType="Timestamp"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_Cancel_INT8">
      <BDA name="ctlVal" bType="INT8"/>
      <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
      <BDA name="ctlNum" bType="INT8U"/>
      <BDA name="T" bType="Timestamp"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_CalendarTime">
      <BDA name="occ" bType="INT16U"/>
      <BDA name="occType" bType="Enum" type="OccurrenceKind"/>
      <BDA name="occPer" bType="Enum" type="PeriodKind"/>
      <BDA name="weekDay" bType="Enum" type="WeekdayKind"/>
      <BDA name="month" bType="Enum" type="MonthKind"/>
      <BDA name="day" bType="INT8U"/>
      <BDA name="hr" bType="INT8U"/>
      <BDA name="mn" bType="INT8U"/>
    </DAType>
    <DAType id="OpenSCD_Cell2D">
      <BDA name="xStart" bType="FLOAT32"/>
      <BDA name="xEnd" bType="FLOAT32"/>
      <BDA name="yStart" bType="FLOAT32"/>
      <BDA name="yEnd" bType="FLOAT32"/>
    </DAType>
    <DAType id="OpenSCD_Cell1D">
      <BDA name="xStart" bType="FLOAT32"/>
      <BDA name="xEnd" bType="FLOAT32"/>
    </DAType>
    <DAType id="OpenSCD_OperSBOw_SPC">
      <BDA name="ctlVal" bType="BOOLEAN"/>
      <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
      <BDA name="ctlNum" bType="INT8U"/>
      <BDA name="T" bType="Timestamp"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <BDA name="Check" bType="Check"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_OperSBOw_Dbpos">
      <BDA name="ctlVal" bType="Dbpos"/>
      <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
      <BDA name="ctlNum" bType="INT8U"/>
      <BDA name="T" bType="Timestamp"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <BDA name="Check" bType="Check"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_OperSBOw_FLOAT32">
      <BDA name="ctlVal" bType="Struct" type="OpenSCD_AnalogueValue_FLOAT32"/>
      <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
      <BDA name="ctlNum" bType="INT8U"/>
      <BDA name="T" bType="Timestamp"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <BDA name="Check" bType="Check"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_OperSBOw_StepControlKind">
      <BDA name="ctlVal" bType="Tcmd"/>
      <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
      <BDA name="ctlNum" bType="INT8U"/>
      <BDA name="T" bType="Timestamp"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <BDA name="Check" bType="Check"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_OperSBOw_BehaviourModeKind">
      <BDA name="ctlVal" bType="Enum" type="BehaviourModeKind"/>
      <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
      <BDA name="ctlNum" bType="INT8U"/>
      <BDA name="T" bType="Timestamp"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <BDA name="Check" bType="Check"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_OperSBOw_INT8">
      <BDA name="ctlVal" bType="INT8"/>
      <BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
      <BDA name="ctlNum" bType="INT8U"/>
      <BDA name="T" bType="Timestamp"/>
      <BDA name="Test" bType="BOOLEAN"/>
      <BDA name="Check" bType="Check"/>
      <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
    </DAType>
    <DAType id="OpenSCD_Originator">
      <BDA name="orCat" bType="Enum" type="OriginatorCategoryKind"/>
      <BDA name="orIdent" bType="Octet64"/>
    </DAType>
    <DAType id="OpenSCD_Point3D">
      <BDA name="xVal" bType="FLOAT32"/>
      <BDA name="yVal" bType="FLOAT32"/>
      <BDA name="zVal" bType="FLOAT32"/>
    </DAType>
    <DAType id="OpenSCD_Point2D">
      <BDA name="xVal" bType="FLOAT32"/>
      <BDA name="yVal" bType="FLOAT32"/>
    </DAType>
    <DAType id="OpenSCD_PulseConfig">
      <BDA name="cmdQual" bType="Enum" type="OutputSignalKind"/>
      <BDA name="onDur" bType="INT32U"/>
      <BDA name="offDur" bType="INT32U"/>
      <BDA name="numPls" bType="INT32U"/>
    </DAType>
    <DAType id="OpenSCD_RangeConfig">
      <BDA name="hhLim" bType="Struct" type="OpenSCD_AnalogueValue_FLOAT32"/>
      <BDA name="hLim" bType="Struct" type="OpenSCD_AnalogueValue_FLOAT32"/>
      <BDA name="lLim" bType="Struct" type="OpenSCD_AnalogueValue_FLOAT32"/>
      <BDA name="llLim" bType="Struct" type="OpenSCD_AnalogueValue_FLOAT32"/>
      <BDA name="min" bType="Struct" type="OpenSCD_AnalogueValue_FLOAT32"/>
      <BDA name="max" bType="Struct" type="OpenSCD_AnalogueValue_FLOAT32"/>
      <BDA name="limDb" bType="INT32"/>
    </DAType>
    <DAType id="OpenSCD_ScaledValueConfig_AmpSv">
      <BDA name="scaleFactor" bType="FLOAT32">
        <Val>0.001</Val>
      </BDA>
      <BDA name="offset" bType="FLOAT32">
        <Val>0</Val>
      </BDA>
    </DAType>
    <DAType id="OpenSCD_ScaledValueConfig_VolSv">
      <BDA name="scaleFactor" bType="FLOAT32">
        <Val>0.01</Val>
      </BDA>
      <BDA name="offset" bType="FLOAT32">
        <Val>0</Val>
      </BDA>
    </DAType>
    <DAType id="OpenSCD_Unit_A">
      <BDA name="SIUnit" bType="Enum" type="SIUnitKind">
        <Val>A</Val>
      </BDA>
    </DAType>
    <DAType id="OpenSCD_Unit_V">
      <BDA name="SIUnit" bType="Enum" type="SIUnitKind">
        <Val>A</Val>
      </BDA>
    </DAType>
    <DAType id="OpenSCD_Unit_Hz">
      <BDA name="SIUnit" bType="Enum" type="SIUnitKind">
        <Val>Hz</Val>
      </BDA>
    </DAType>
    <DAType id="OpenSCD_ValWithTrans_wo_transInd">
      <BDA name="posVal" bType="INT8"/>
    </DAType>
    <DAType id="OpenSCD_Vector_I_w_Ang">
      <BDA name="mag" bType="Struct" type="OpenSCD_AnalogueValue_INT32"/>
      <BDA name="ang" bType="Struct" type="OpenSCD_AnalogueValue_INT32"/>
    </DAType>
    <DAType id="OpenSCD_Vector_F_w_Ang">
      <BDA name="mag" bType="Struct" type="OpenSCD_AnalogueValue_FLOAT32"/>
      <BDA name="ang" bType="Struct" type="OpenSCD_AnalogueValue_FLOAT32"/>
    </DAType>
    <DAType id="OpenSCD_Vector_I_wo_Ang">
      <BDA name="mag" bType="Struct" type="OpenSCD_AnalogueValue_INT32"/>
    </DAType>
    <DAType id="OpenSCD_Vector_F_wo_Ang">
      <BDA name="mag" bType="Struct" type="OpenSCD_AnalogueValue_FLOAT32"/>
    </DAType>

    <DAType id="ScaledValueConfig">
      <BDA name="scaleFactor" bType="FLOAT32"/>
      <BDA name="offset" bType="FLOAT32"/>
    </DAType>
    <DAType id="Unit">
      <BDA name="SIUnit" bType="Enum" type="SIUnitKind"/>
      <BDA name="multiplier" bType="Enum" type="MultiplierKind"/>
    </DAType>
    <DAType id="OpenSCD_ValWithTrans">
      <BDA name="posVal" bType="INT8"/>
      <BDA name="transInd" bType="BOOLEAN"/>
    </DAType>
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
    <EnumType id="OpenSCD_StatusOnly">
      <EnumVal ord="0">status-only</EnumVal>
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
    <EnumType id="MultiplierKind">
      <EnumVal ord="-24">y</EnumVal>
      <EnumVal ord="-21">z</EnumVal>
      <EnumVal ord="-18">a</EnumVal>
      <EnumVal ord="-15">f</EnumVal>
      <EnumVal ord="-12">p</EnumVal>
      <EnumVal ord="-9">n</EnumVal>
      <EnumVal ord="-6">µ</EnumVal>
      <EnumVal ord="-3">m</EnumVal>
      <EnumVal ord="-2">c</EnumVal>
      <EnumVal ord="-1">d</EnumVal>
      <EnumVal ord="0"></EnumVal>
      <EnumVal ord="1">da</EnumVal>
      <EnumVal ord="2">h</EnumVal>
      <EnumVal ord="3">k</EnumVal>
      <EnumVal ord="6">M</EnumVal>
      <EnumVal ord="9">G</EnumVal>
      <EnumVal ord="12">T</EnumVal>
      <EnumVal ord="15">P</EnumVal>
      <EnumVal ord="18">E</EnumVal>
      <EnumVal ord="21">Z</EnumVal>
      <EnumVal ord="24">Y</EnumVal>
    </EnumType>
    <EnumType id="AngleReferenceKind">
      <EnumVal ord="0">V</EnumVal>
      <EnumVal ord="1">A</EnumVal>
      <EnumVal ord="2">other</EnumVal>
      <EnumVal ord="3">Synchrophasor</EnumVal>
    </EnumType>
    <EnumType id="CurveCharKind">
      <EnumVal ord="0">None</EnumVal>
      <EnumVal ord="1">ANSI Extremely Inverse</EnumVal>
      <EnumVal ord="2">ANSI Very Inverse</EnumVal>
      <EnumVal ord="3">ANSI Normal Inverse</EnumVal>
      <EnumVal ord="4">ANSI Moderate Inverse</EnumVal>
      <EnumVal ord="5">ANSI Definite Time </EnumVal>
      <EnumVal ord="6">Long-Time Extremely Inverse</EnumVal>
      <EnumVal ord="7">Long-Time Very Inverse</EnumVal>
      <EnumVal ord="8">Long-Time Inverse</EnumVal>
      <EnumVal ord="9">IEC Normal Inverse</EnumVal>
      <EnumVal ord="10">IEC Very Inverse</EnumVal>
      <EnumVal ord="11">IEC Inverse</EnumVal>
      <EnumVal ord="12">IEC Extremely Inverse</EnumVal>
      <EnumVal ord="13">IEC Short-Time Inverse</EnumVal>
      <EnumVal ord="14">IEC Long-Time Inverse</EnumVal>
      <EnumVal ord="15">IEC Definite Tim</EnumVal>
      <EnumVal ord="16">Reserved</EnumVal>
    </EnumType>
    <EnumType id="FaultDirectionKind">
      <EnumVal ord="0">unknown</EnumVal>
      <EnumVal ord="1">forward</EnumVal>
      <EnumVal ord="2">backward</EnumVal>
      <EnumVal ord="3">both</EnumVal>
    </EnumType>
    <EnumType id="HvReferenceKind">
      <EnumVal ord="0">fundamental</EnumVal>
      <EnumVal ord="1">rms</EnumVal>
      <EnumVal ord="2">absolute</EnumVal>
    </EnumType>
    <EnumType id="MonthKind">
      <EnumVal ord="0">reserved</EnumVal>
      <EnumVal ord="1">January</EnumVal>
      <EnumVal ord="2">February</EnumVal>
      <EnumVal ord="3">March</EnumVal>
      <EnumVal ord="4">April</EnumVal>
      <EnumVal ord="5">May</EnumVal>
      <EnumVal ord="6">June</EnumVal>
      <EnumVal ord="7">July</EnumVal>
      <EnumVal ord="8">August</EnumVal>
      <EnumVal ord="9">September</EnumVal>
      <EnumVal ord="10">October</EnumVal>
      <EnumVal ord="11">November</EnumVal>
      <EnumVal ord="12">December</EnumVal>
    </EnumType>
    <EnumType id="OccurrenceKind">
      <EnumVal ord="0">Time</EnumVal>
      <EnumVal ord="1">WeekDay</EnumVal>
      <EnumVal ord="2">WeekOfYear</EnumVal>
      <EnumVal ord="3">DayOfMonth</EnumVal>
      <EnumVal ord="4">DayOfYear</EnumVal>
    </EnumType>
    <EnumType id="OutputSignalKind">
      <EnumVal ord="0">pulse</EnumVal>
      <EnumVal ord="1">persistent</EnumVal>
      <EnumVal ord="2">persistent-feedback</EnumVal>
    </EnumType>
    <EnumType id="PeriodKind">
      <EnumVal ord="0">Hour</EnumVal>
      <EnumVal ord="1">Day</EnumVal>
      <EnumVal ord="2">Week</EnumVal>
      <EnumVal ord="3">Month</EnumVal>
      <EnumVal ord="4">Year</EnumVal>
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
      <EnumVal ord="9">Vother</EnumVal>
      <EnumVal ord="10">Aother</EnumVal>
      <EnumVal ord="11">Synchrophasor</EnumVal>
    </EnumType>
    <EnumType id="PhaseFaultDirectionKind">
      <EnumVal ord="0">unknown</EnumVal>
      <EnumVal ord="1">forward</EnumVal>
      <EnumVal ord="2">backward</EnumVal>
    </EnumType>
    <EnumType id="PhaseReferenceKind">
      <EnumVal ord="0">A</EnumVal>
      <EnumVal ord="1">B</EnumVal>
      <EnumVal ord="2">C</EnumVal>
      <EnumVal ord="3">Synchrophasor</EnumVal>
    </EnumType>
    <EnumType id="RangeKind">
      <EnumVal ord="0">normal</EnumVal>
      <EnumVal ord="1">high</EnumVal>
      <EnumVal ord="2">low</EnumVal>
      <EnumVal ord="3">high-high</EnumVal>
      <EnumVal ord="4">low-low</EnumVal>
    </EnumType>
    <EnumType id="SIUnitKind">
      <EnumVal ord="1"></EnumVal>
      <EnumVal ord="2">m</EnumVal>
      <EnumVal ord="3">kg</EnumVal>
      <EnumVal ord="4">s</EnumVal>
      <EnumVal ord="5">A</EnumVal>
      <EnumVal ord="6">K</EnumVal>
      <EnumVal ord="7">mol</EnumVal>
      <EnumVal ord="8">cd</EnumVal>
      <EnumVal ord="9">deg</EnumVal>
      <EnumVal ord="10">rad</EnumVal>
      <EnumVal ord="11">sr</EnumVal>
      <EnumVal ord="21">Gy</EnumVal>
      <EnumVal ord="22">Bq</EnumVal>
      <EnumVal ord="23">°C</EnumVal>
      <EnumVal ord="24">Sv</EnumVal>
      <EnumVal ord="25">F</EnumVal>
      <EnumVal ord="26">C</EnumVal>
      <EnumVal ord="27">S</EnumVal>
      <EnumVal ord="28">H</EnumVal>
      <EnumVal ord="29">V</EnumVal>
      <EnumVal ord="30">ohm</EnumVal>
      <EnumVal ord="31">J</EnumVal>
      <EnumVal ord="32">N</EnumVal>
      <EnumVal ord="33">Hz</EnumVal>
      <EnumVal ord="34">lx</EnumVal>
      <EnumVal ord="35">Lm</EnumVal>
      <EnumVal ord="36">Wb</EnumVal>
      <EnumVal ord="37">T</EnumVal>
      <EnumVal ord="38">W</EnumVal>
      <EnumVal ord="39">Pa</EnumVal>
      <EnumVal ord="41">m²</EnumVal>
      <EnumVal ord="42">m³</EnumVal>
      <EnumVal ord="43">m/s</EnumVal>
      <EnumVal ord="44">m/s²</EnumVal>
      <EnumVal ord="45">m³/s</EnumVal>
      <EnumVal ord="46">m/m³</EnumVal>
      <EnumVal ord="47">M</EnumVal>
      <EnumVal ord="48">kg/m³</EnumVal>
      <EnumVal ord="49">m²/s</EnumVal>
      <EnumVal ord="50">W/m K</EnumVal>
      <EnumVal ord="51">J/K</EnumVal>
      <EnumVal ord="52">ppm</EnumVal>
      <EnumVal ord="53">1/s</EnumVal>
      <EnumVal ord="54">rad/s</EnumVal>
      <EnumVal ord="55">W/m²</EnumVal>
      <EnumVal ord="56">J/m²</EnumVal>
      <EnumVal ord="57">S/m</EnumVal>
      <EnumVal ord="58">K/s</EnumVal>
      <EnumVal ord="59">Pa/s</EnumVal>
      <EnumVal ord="60">J/kg K</EnumVal>
      <EnumVal ord="61">VA</EnumVal>
      <EnumVal ord="62">Watts</EnumVal>
      <EnumVal ord="63">VAr</EnumVal>
      <EnumVal ord="64">phi</EnumVal>
      <EnumVal ord="65">cos(phi)</EnumVal>
      <EnumVal ord="66">Vs</EnumVal>
      <EnumVal ord="67">V²</EnumVal>
      <EnumVal ord="68">As</EnumVal>
      <EnumVal ord="69">A²</EnumVal>
      <EnumVal ord="70">A²t</EnumVal>
      <EnumVal ord="71">VAh</EnumVal>
      <EnumVal ord="72">Wh</EnumVal>
      <EnumVal ord="73">VArh</EnumVal>
      <EnumVal ord="74">V/Hz</EnumVal>
      <EnumVal ord="75">Hz/s</EnumVal>
      <EnumVal ord="76">char</EnumVal>
      <EnumVal ord="77">char/s</EnumVal>
      <EnumVal ord="78">kgm²</EnumVal>
      <EnumVal ord="79">dB</EnumVal>
      <EnumVal ord="80">J/Wh</EnumVal>
      <EnumVal ord="81">W/s</EnumVal>
      <EnumVal ord="82">l/s</EnumVal>
      <EnumVal ord="83">dBm</EnumVal>
      <EnumVal ord="84">h</EnumVal>
      <EnumVal ord="85">min</EnumVal>
      <EnumVal ord="86">Ohm/m</EnumVal>
      <EnumVal ord="87">percent/s</EnumVal>
    </EnumType>
    <EnumType id="SboClassKind">
      <EnumVal ord="0">operate-once</EnumVal>
      <EnumVal ord="1">operate-many</EnumVal>
    </EnumType>
    <EnumType id="SequenceKind">
      <EnumVal ord="0">pos-neg-zero</EnumVal>
      <EnumVal ord="1">dir-quad-zero</EnumVal>
    </EnumType>
    <EnumType id="SeverityKind">
      <EnumVal ord="0">unknown</EnumVal>
      <EnumVal ord="1">critical</EnumVal>
      <EnumVal ord="2">major</EnumVal>
      <EnumVal ord="3">minor</EnumVal>
      <EnumVal ord="4">warning</EnumVal>
    </EnumType>
    <EnumType id="WeekdayKind">
      <EnumVal ord="0">reserved</EnumVal>
      <EnumVal ord="1">Monday</EnumVal>
      <EnumVal ord="2">Tuesday</EnumVal>
      <EnumVal ord="3">Wednesday</EnumVal>
      <EnumVal ord="4">Thursday</EnumVal>
      <EnumVal ord="5">Friday</EnumVal>
      <EnumVal ord="6">Saturday</EnumVal>
      <EnumVal ord="7">Sunday</EnumVal>
    </EnumType>
    <EnumType id="AdjustmentKind">
      <EnumVal ord="1">Completed</EnumVal>
      <EnumVal ord="2">Cancelled</EnumVal>
      <EnumVal ord="3">New adjustments</EnumVal>
      <EnumVal ord="4">Under way</EnumVal>
    </EnumType>
    <EnumType id="AffectedPhasesKind">
      <EnumVal ord="1">PhaseA</EnumVal>
      <EnumVal ord="2">PhaseB</EnumVal>
      <EnumVal ord="3">PhaseAB</EnumVal>
      <EnumVal ord="4">PhaseC</EnumVal>
      <EnumVal ord="5">PhaseAC</EnumVal>
      <EnumVal ord="6">PhaseBC</EnumVal>
      <EnumVal ord="7">PhaseABC</EnumVal>
      <EnumVal ord="8">None</EnumVal>
    </EnumType>
    <EnumType id="AutoReclosingKind">
      <EnumVal ord="1">Ready</EnumVal>
      <EnumVal ord="2">InProgress</EnumVal>
        <!-- deprecated; kept for backwards compatibility -->
      <EnumVal ord="3">Successful</EnumVal>
      <EnumVal ord="4">WaitingForTrip</EnumVal>
      <EnumVal ord="5">TripFromProtection</EnumVal>
      <EnumVal ord="6">FaultDisappeared</EnumVal>
      <EnumVal ord="7">WaitToComplete</EnumVal>
      <EnumVal ord="8">CBclosed</EnumVal>
      <EnumVal ord="9">CycleUnsuccessful</EnumVal>
      <EnumVal ord="10">Unsuccessful</EnumVal>
      <EnumVal ord="11">Aborted</EnumVal>
      <EnumVal ord="12">NotReady</EnumVal>
    </EnumType>
    <EnumType id="BreakerOpCapabilityKind">
      <EnumVal ord="1">None</EnumVal>
      <EnumVal ord="2">Open</EnumVal>
      <EnumVal ord="3">Close-Open</EnumVal>
      <EnumVal ord="4">Open-Close-Open</EnumVal>
      <EnumVal ord="5">Close-Open-Close-Open</EnumVal>
      <EnumVal ord="6">Open-Close-Open-Close-Open</EnumVal>
      <EnumVal ord="7">more</EnumVal>
    </EnumType>
    <EnumType id="CalcIntervalKind">
      <EnumVal ord="1">MS</EnumVal>
      <EnumVal ord="2">PER_CYCLE</EnumVal>
      <EnumVal ord="3">CYCLE</EnumVal>
      <EnumVal ord="4">DAY</EnumVal>
      <EnumVal ord="5">WEEK</EnumVal>
      <EnumVal ord="6">MONTH</EnumVal>
      <EnumVal ord="7">YEAR</EnumVal>
      <EnumVal ord="8">EXTERNAL</EnumVal>
    </EnumType>
    <EnumType id="CalcMethodKind">
      <EnumVal ord="1">UNSPECIFIED</EnumVal>
      <EnumVal ord="2">TRUE_RMS</EnumVal>
      <EnumVal ord="3">PEAK_FUNDAMENTAL</EnumVal>
      <EnumVal ord="4">RMS_FUNDAMENTAL</EnumVal>
      <EnumVal ord="5">MIN</EnumVal>
      <EnumVal ord="6">MAX</EnumVal>
      <EnumVal ord="7">AVG</EnumVal>
      <EnumVal ord="8">SDV</EnumVal>
      <EnumVal ord="9">PREDICTION</EnumVal>
      <EnumVal ord="10">RATE</EnumVal>
      <EnumVal ord="11">P-CLASS</EnumVal>
      <EnumVal ord="12">M-CLASS</EnumVal>
      <EnumVal ord="13">DIFF</EnumVal>
    </EnumType>
    <EnumType id="CalcModeKind">
      <EnumVal ord="1">TOTAL</EnumVal>
      <EnumVal ord="2">PERIOD</EnumVal>
      <EnumVal ord="3">SLIDING</EnumVal>
    </EnumType>
    <EnumType id="ClockSourceKind">
      <EnumVal ord="1">Unknown</EnumVal>
      <EnumVal ord="2">SNTP</EnumVal>
      <EnumVal ord="3">PTP</EnumVal>
      <EnumVal ord="4">IRIG-B</EnumVal>
      <EnumVal ord="5">Substation internal</EnumVal>
    </EnumType>
    <EnumType id="ClockSyncKind">
      <EnumVal ord="1">InternalClock</EnumVal>
      <EnumVal ord="2">LocalAreaClock</EnumVal>
      <EnumVal ord="3">GlobalAreaClock</EnumVal>
    </EnumType>
    <EnumType id="ClockSyncLockingKind">
      <EnumVal ord="1">Locked</EnumVal>
      <EnumVal ord="2">Unlocked10s</EnumVal>
      <EnumVal ord="3">Unlocked100s</EnumVal>
      <EnumVal ord="4">Unlocked1000s</EnumVal>
      <EnumVal ord="5">UnlockedMoreThan1000s</EnumVal>
    </EnumType>
    <EnumType id="DirectionModeKind">
      <EnumVal ord="1">NonDirectional</EnumVal>
      <EnumVal ord="2">Forward</EnumVal>
      <EnumVal ord="3">Reverse</EnumVal>
    </EnumType>
    <EnumType id="FailureDetectionKind">
      <EnumVal ord="1">Current</EnumVal>
      <EnumVal ord="2">Breaker Status</EnumVal>
      <EnumVal ord="3">Both current and breaker status</EnumVal>
      <EnumVal ord="4">Other</EnumVal>
    </EnumType>
    <EnumType id="FaultLoopKind">
      <EnumVal ord="1">PhaseAtoGround</EnumVal>
      <EnumVal ord="2">PhaseBtoGround</EnumVal>
      <EnumVal ord="3">PhaseCtoGround</EnumVal>
      <EnumVal ord="4">PhaseAtoB</EnumVal>
      <EnumVal ord="5">PhaseBtoC</EnumVal>
      <EnumVal ord="6">PhaseCtoA</EnumVal>
      <EnumVal ord="7">Others</EnumVal>
    </EnumType>
    <EnumType id="FaultMeasuredValueTypeKind">
      <EnumVal ord="1">At Start Moment</EnumVal>
      <EnumVal ord="2">At Trip Moment</EnumVal>
      <EnumVal ord="3">Peak Fault Value</EnumVal>
    </EnumType>
    <EnumType id="FilterFunctionKind">
      <EnumVal ord="1">Low pass</EnumVal>
      <EnumVal ord="2">High pass</EnumVal>
      <EnumVal ord="3">Bandpass</EnumVal>
      <EnumVal ord="4">Bandstop</EnumVal>
      <EnumVal ord="5">Deadband</EnumVal>
    </EnumType>
    <EnumType id="FuseFunctionKind">
      <EnumVal ord="1">Slow time delay</EnumVal>
      <EnumVal ord="2">Fast time delay</EnumVal>
      <EnumVal ord="3">Fast acting</EnumVal>
      <EnumVal ord="4">Very fast acting</EnumVal>
      <EnumVal ord="98">Not applicable / Unknown</EnumVal>
      <EnumVal ord="99">Other</EnumVal>
    </EnumType>
    <EnumType id="HealthKind">
      <EnumVal ord="1">Ok</EnumVal>
      <EnumVal ord="2">Warning</EnumVal>
      <EnumVal ord="3">Alarm</EnumVal>
    </EnumType>
    <EnumType id="InstrumentTransformerMeasurementRatingKind">
      <EnumVal ord="1">0.05</EnumVal>
      <EnumVal ord="2">0.1</EnumVal>
      <EnumVal ord="3">0.2</EnumVal>
      <EnumVal ord="4">0.2S</EnumVal>
      <EnumVal ord="5">0.5</EnumVal>
      <EnumVal ord="6">0.5S</EnumVal>
      <EnumVal ord="7">1</EnumVal>
      <EnumVal ord="8">3</EnumVal>
      <EnumVal ord="9">5</EnumVal>
    </EnumType>
    <EnumType id="InstrumentTransformerProtectionRatingKind">
      <EnumVal ord="1">1</EnumVal>
      <EnumVal ord="2">3</EnumVal>
      <EnumVal ord="3">5</EnumVal>
      <EnumVal ord="4">6</EnumVal>
      <EnumVal ord="5">10</EnumVal>
    </EnumType>
    <EnumType id="LeapSecondKind">
      <EnumVal ord="1">Unknown</EnumVal>
      <EnumVal ord="2">Normal Time</EnumVal>
      <EnumVal ord="3">Last minute of the day has 61 seconds</EnumVal>
      <EnumVal ord="4">Last minute of the day has 59 seconds</EnumVal>
    </EnumType>
    <EnumType id="LevelTriggerModeKind">
      <EnumVal ord="1">Positive or Rising</EnumVal>
      <EnumVal ord="2">Negative or Falling</EnumVal>
      <EnumVal ord="3">Both</EnumVal>
      <EnumVal ord="4">Other</EnumVal>
    </EnumType>
    <EnumType id="LiveDeadModeKind">
      <EnumVal ord="1">Dead Line, Dead Bus</EnumVal>
      <EnumVal ord="2">Live Line, Dead Bus</EnumVal>
      <EnumVal ord="3">Dead Line, Live Bus</EnumVal>
      <EnumVal ord="4">Dead Line, Dead Bus OR Live Line, Dead Bus</EnumVal>
      <EnumVal ord="5">Dead Line, Dead Bus OR Dead Line, Live Bus</EnumVal>
      <EnumVal ord="6">Live Line, Dead Bus OR Dead Line, Live Bus</EnumVal>
      <EnumVal ord="7">Dead Line, Dead Bus OR Live Line, Dead Bus OR Dead Line, Live Bus</EnumVal>
    </EnumType>
    <EnumType id="MaterialKind">
      <EnumVal ord="1">Air</EnumVal>
      <EnumVal ord="2">Water</EnumVal>
      <EnumVal ord="3">Steam</EnumVal>
      <EnumVal ord="4">Oil</EnumVal>
      <EnumVal ord="5">Hydrogen</EnumVal>
      <EnumVal ord="6">Natural gas</EnumVal>
      <EnumVal ord="7">Butane</EnumVal>
      <EnumVal ord="8">Propane</EnumVal>
      <EnumVal ord="9">Waste gas</EnumVal>
      <EnumVal ord="98">Not applicable / Unknown</EnumVal>
      <EnumVal ord="99">Other</EnumVal>
    </EnumType>
    <EnumType id="MaterialStateKind">
      <EnumVal ord="1">Gaseous</EnumVal>
      <EnumVal ord="2">Liquid</EnumVal>
      <EnumVal ord="3">Solid</EnumVal>
      <EnumVal ord="98">Not applicable / Unknown</EnumVal>
      <EnumVal ord="99">Other</EnumVal>
    </EnumType>
    <EnumType id="PFSignKind">
      <EnumVal ord="1">IEC</EnumVal>
      <EnumVal ord="2">EEI</EnumVal>
    </EnumType>
    <EnumType id="PIDAlgorithmKind">
      <EnumVal ord="1">P</EnumVal>
      <EnumVal ord="2">I</EnumVal>
      <EnumVal ord="3">D</EnumVal>
      <EnumVal ord="4">PI</EnumVal>
      <EnumVal ord="5">PD</EnumVal>
      <EnumVal ord="6">ID</EnumVal>
      <EnumVal ord="7">PID</EnumVal>
    </EnumType>
    <EnumType id="POWSwitchingCapabilityKind">
      <EnumVal ord="1">None</EnumVal>
      <EnumVal ord="2">Close</EnumVal>
      <EnumVal ord="3">Open</EnumVal>
      <EnumVal ord="4">Close and Open</EnumVal>
    </EnumType>
    <EnumType id="ParallelCoilModeKind">
      <EnumVal ord="1">Master/Slave</EnumVal>
      <EnumVal ord="2">Master/Slave with fixed slave position</EnumVal>
      <EnumVal ord="3">Master/Slave with variable slave position</EnumVal>
      <EnumVal ord="4">Parallel operation without communication</EnumVal>
    </EnumType>
    <EnumType id="ParallelCtrlModeKind">
      <EnumVal ord="1">Master</EnumVal>
      <EnumVal ord="2">Slave</EnumVal>
      <EnumVal ord="3">Independent</EnumVal>
    </EnumType>
    <EnumType id="ParallelTransfModeKind">
      <EnumVal ord="1">No Mode predefined</EnumVal>
      <EnumVal ord="2">Master</EnumVal>
      <EnumVal ord="3">Follower</EnumVal>
      <EnumVal ord="4">Power Factor</EnumVal>
      <EnumVal ord="5">Negative Reactance</EnumVal>
      <EnumVal ord="6">Circulating Current</EnumVal>
      <EnumVal ord="7">Circulating Reactive Current (var balancing)</EnumVal>
      <EnumVal ord="8">Circulating Reactive Current by equalizing power factor</EnumVal>
    </EnumType>
    <EnumType id="PolarizingQuantityKind">
      <EnumVal ord="1">None</EnumVal>
      <EnumVal ord="2">Zero Sequence Current</EnumVal>
      <EnumVal ord="3">Zero Sequence Voltage</EnumVal>
      <EnumVal ord="4">Negative Sequence Voltage</EnumVal>
      <EnumVal ord="5">Phase to Phase Voltages</EnumVal>
      <EnumVal ord="6">Phase to Ground Voltages</EnumVal>
      <EnumVal ord="7">Positive sequence voltage</EnumVal>
    </EnumType>
    <EnumType id="RecordingModeKind">
      <EnumVal ord="1">Overwrite existing values</EnumVal>
      <EnumVal ord="2">Stop when full or saturated</EnumVal>
    </EnumType>
    <EnumType id="RectifierControlModeKind">
      <EnumVal ord="1">Current</EnumVal>
      <EnumVal ord="2">Voltage</EnumVal>
      <EnumVal ord="3">Active Power</EnumVal>
    </EnumType>
    <EnumType id="ResetCurveKind">
      <EnumVal ord="1">None</EnumVal>
      <EnumVal ord="2">Definite Time Delayed Reset</EnumVal>
      <EnumVal ord="3">Inverse Reset</EnumVal>
    </EnumType>
    <EnumType id="RestraintModeKind">
      <EnumVal ord="1">None</EnumVal>
      <EnumVal ord="2">Harmonic2</EnumVal>
      <EnumVal ord="3">Harmonic5</EnumVal>
      <EnumVal ord="4">Harmonic2and5</EnumVal>
      <EnumVal ord="5">WaveformAnalysis</EnumVal>
      <EnumVal ord="6">WaveformAnalysisAndHarmonic2</EnumVal>
      <EnumVal ord="7">Other</EnumVal>
      <EnumVal ord="8">WaveformAnalysisAndHarmonic5</EnumVal>
      <EnumVal ord="9">WaveformAnalysisAndHarmonic2AndHarmonic5</EnumVal>
    </EnumType>
    <EnumType id="RetripModeKind">
      <EnumVal ord="1">Off</EnumVal>
      <EnumVal ord="2">Without Check</EnumVal>
      <EnumVal ord="3">With Current Check</EnumVal>
      <EnumVal ord="4">With Breaker Status Check</EnumVal>
      <EnumVal ord="5">With Current and Breaker Status Check</EnumVal>
      <EnumVal ord="6">Other Checks</EnumVal>
    </EnumType>
    <EnumType id="RotatingMachineStateKind">
      <EnumVal ord="1">Stopped</EnumVal>
      <EnumVal ord="2">Stopping</EnumVal>
      <EnumVal ord="3">Started</EnumVal>
      <EnumVal ord="4">Starting</EnumVal>
      <EnumVal ord="5">Disabled</EnumVal>
    </EnumType>
    <EnumType id="RotationalDirectionKind">
      <EnumVal ord="1">Clockwise</EnumVal>
      <EnumVal ord="2">Counter-Clockwise</EnumVal>
      <EnumVal ord="3">Unknown</EnumVal>
    </EnumType>
    <EnumType id="RotorThermalStateKind">
      <EnumVal ord="1">Cold</EnumVal>
      <EnumVal ord="2">Warm</EnumVal>
      <EnumVal ord="3">Overload</EnumVal>
    </EnumType>
    <EnumType id="SOFEnablingModeKind">
      <EnumVal ord="1">SwitchCommand</EnumVal>
      <EnumVal ord="2">BreakerClosed</EnumVal>
      <EnumVal ord="3">VoltageAndCurrentLevel</EnumVal>
    </EnumType>
    <EnumType id="SOFOperationModeKind">
      <EnumVal ord="1">ExternalSignal</EnumVal>
      <EnumVal ord="2">VoltageAndCurrent</EnumVal>
      <EnumVal ord="3">ExternalSignal or VoltageAndCurrent</EnumVal>
    </EnumType>
    <EnumType id="STotalCalcMethodKind">
      <EnumVal ord="1">Vector</EnumVal>
      <EnumVal ord="2">Arithmetic</EnumVal>
    </EnumType>
    <EnumType id="ScheduleEnablingErrorKind">
      <EnumVal ord="1">None</EnumVal>
      <EnumVal ord="2">Missing valid NumEnt</EnumVal>
      <EnumVal ord="3">Missing valid SchdIntv</EnumVal>
      <EnumVal ord="4">Missing valid schedule values</EnumVal>
      <EnumVal ord="5">Inconsistent values CDC</EnumVal>
      <EnumVal ord="6">Missing valid StrTm</EnumVal>
      <EnumVal ord="99">Other</EnumVal>
    </EnumType>
    <EnumType id="ScheduleStateKind">
      <EnumVal ord="1">Not ready</EnumVal>
      <EnumVal ord="2">Start Time required</EnumVal>
      <EnumVal ord="3">Ready</EnumVal>
      <EnumVal ord="4">Running</EnumVal>
    </EnumType>
    <EnumType id="SetpointEndKind">
      <EnumVal ord="1">Ended normally</EnumVal>
      <EnumVal ord="2">Ended with overshoot</EnumVal>
      <EnumVal ord="3">Cancelled: measurement was deviating</EnumVal>
      <EnumVal ord="4">Cancelled: loss of communication with dispatch centre</EnumVal>
      <EnumVal ord="5">Cancelled: loss of communication with local area network</EnumVal>
      <EnumVal ord="6">Cancelled: loss of communication with the local interface</EnumVal>
      <EnumVal ord="7">Cancelled: timeout</EnumVal>
      <EnumVal ord="8">Cancelled: voluntarily</EnumVal>
      <EnumVal ord="9">Cancelled: noisy environments</EnumVal>
      <EnumVal ord="10">Cancelled: material failure</EnumVal>
      <EnumVal ord="11">Cancelled: new set-point request</EnumVal>
      <EnumVal ord="12">Cancelled: improper environment (blockage)</EnumVal>
      <EnumVal ord="13">Cancelled: stability time was reached</EnumVal>
      <EnumVal ord="14">Cancelled: immobilisation time was reached</EnumVal>
      <EnumVal ord="15">Cancelled: equipment was in the wrong mode</EnumVal>
      <EnumVal ord="16">Unknown causes</EnumVal>
    </EnumType>
    <EnumType id="StageControlKind">
      <EnumVal ord="1">Inactive</EnumVal>
      <EnumVal ord="2">Stage1</EnumVal>
      <EnumVal ord="3">Stage2</EnumVal>
      <EnumVal ord="4">Stage3</EnumVal>
    </EnumType>
    <EnumType id="SwitchFunctionKind">
      <EnumVal ord="1">Load Break</EnumVal>
      <EnumVal ord="2">Disconnector</EnumVal>
      <EnumVal ord="3">Earthing Switch</EnumVal>
      <EnumVal ord="4">High Speed Earthing Switch</EnumVal>
    </EnumType>
    <EnumType id="SwitchingCapabilityKind">
      <EnumVal ord="1">None</EnumVal>
      <EnumVal ord="2">Open</EnumVal>
      <EnumVal ord="3">Close</EnumVal>
      <EnumVal ord="4">Open and Close</EnumVal>
    </EnumType>
    <EnumType id="SynchOperationModeKind">
      <EnumVal ord="1">Automatic-synchronizing</EnumVal>
      <EnumVal ord="2">Automatic-paralleling</EnumVal>
      <EnumVal ord="3">Manual</EnumVal>
      <EnumVal ord="4">Test</EnumVal>
    </EnumType>
    <EnumType id="TankFillKind">
      <EnumVal ord="1">pressure only</EnumVal>
      <EnumVal ord="2">level only</EnumVal>
      <EnumVal ord="3">both pressure and level</EnumVal>
    </EnumType>
    <EnumType id="TransientPerformanceClassKind">
      <EnumVal ord="1">Unknown</EnumVal>
      <EnumVal ord="2">P</EnumVal>
      <EnumVal ord="3">PR</EnumVal>
      <EnumVal ord="4">PX</EnumVal>
      <EnumVal ord="5">PXR</EnumVal>
      <EnumVal ord="6">TPX</EnumVal>
      <EnumVal ord="7">TPY</EnumVal>
      <EnumVal ord="8">TPZ</EnumVal>
      <EnumVal ord="9">TPE</EnumVal>
    </EnumType>
    <EnumType id="TpcAppModeKind">
      <EnumVal ord="1">Unused</EnumVal>
      <EnumVal ord="2">Blocking</EnumVal>
      <EnumVal ord="3">Permissive</EnumVal>
      <EnumVal ord="4">Direct</EnumVal>
      <EnumVal ord="5">Unblocking</EnumVal>
      <EnumVal ord="6">Status</EnumVal>
    </EnumType>
    <EnumType id="TriggerSourceKind">
      <EnumVal ord="1">Internal</EnumVal>
      <EnumVal ord="2">External</EnumVal>
      <EnumVal ord="3">Both</EnumVal>
    </EnumType>
    <EnumType id="TripBehaviourKind">
      <EnumVal ord="1">Single Pole Tripping</EnumVal>
      <EnumVal ord="2">Undefined</EnumVal>
      <EnumVal ord="3">Three Pole Tripping</EnumVal>
    </EnumType>
    <EnumType id="TripModeKind">
      <EnumVal ord="1">3 phase tripping</EnumVal>
      <EnumVal ord="2">1 or 3 phase tripping</EnumVal>
      <EnumVal ord="3">specific</EnumVal>
      <EnumVal ord="4">1 phase tripping</EnumVal>
    </EnumType>
    <EnumType id="TuningKind">
      <EnumVal ord="1">Not tuned</EnumVal>
      <EnumVal ord="2">Tuned</EnumVal>
      <EnumVal ord="3">Tuned but not compensated</EnumVal>
      <EnumVal ord="4">Umax</EnumVal>
      <EnumVal ord="5">Umax but not compensated</EnumVal>
      <EnumVal ord="6">Umax but not compensated due to U continous limitation</EnumVal>
    </EnumType>
    <EnumType id="UnbalanceDetectionKind">
      <EnumVal ord="1">Negative sequence</EnumVal>
      <EnumVal ord="2">Zero sequence</EnumVal>
      <EnumVal ord="3">Neg-pos sequence</EnumVal>
      <EnumVal ord="4">Zero-pos sequence</EnumVal>
      <EnumVal ord="5">Phase vector comparison</EnumVal>
      <EnumVal ord="6">Others</EnumVal>
    </EnumType>
    <EnumType id="UnblockModeKind">
      <EnumVal ord="1">Off</EnumVal>
      <EnumVal ord="2">Permanent</EnumVal>
      <EnumVal ord="3">Time window</EnumVal>
    </EnumType>
    <EnumType id="VoltInterruptDetectionKind">
      <EnumVal ord="1">Voltage</EnumVal>
      <EnumVal ord="2">Voltage and Current</EnumVal>
      <EnumVal ord="3">Voltage and Normally Open breaker contact</EnumVal>
      <EnumVal ord="4">Voltage and Normally Closed breaker contact</EnumVal>
      <EnumVal ord="5">Voltage and Normally Open and Normally Closed breaker contacts</EnumVal>
      <EnumVal ord="6">Normally Open breaker contact</EnumVal>
      <EnumVal ord="7">Normally Closed breaker contact</EnumVal>
      <EnumVal ord="8">Both Normally Open and Normally Closed breaker contacts</EnumVal>
    </EnumType>
    <EnumType id="WeakEndInfeedModeKind">
      <EnumVal ord="1">Off</EnumVal>
      <EnumVal ord="2">Operate</EnumVal>
      <EnumVal ord="3">Echo</EnumVal>
      <EnumVal ord="4">Echo and Operate</EnumVal>
    </EnumType>

  </DataTypeTemplates>
</SCL>
