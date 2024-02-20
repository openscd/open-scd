<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:txy="http://www.iec.ch/61850/2003/Terminal" xmlns:scl="http://www.iec.ch/61850/2003/SCL" xsi:schemaLocation="http://www.iec.ch/61850/2003/SCL SCL.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:IEC_60870_5_104="http://www.iec.ch/61850-80-1/2007/SCL" version="2007" revision="B" release="4">
	<Header id="TrainingIEC61850" version="1" revision="143" toolID="IEC 61850 System Configurator, Version: V5.90 " nameStructure="IEDName">
		<Text>TrainingIEC61850</Text>
		<History>
			<Hitem version="1" revision="143" when="Wednesday, September 25, 2019 9:11:36 AM" who="Licenced User: OMICRON electronics GmbH JakVog00 Machine: JAKVOG00LW01 User: JakVog00" what="Station is upgraded from IEC 61850 System Configurator, Version: V5.80 HF1 to V5.90 ." why="IEC 61850 System Configurator Automatic Startup: Insert Comment" />
		</History>
	</Header>
	<DataTypeTemplates>
		<LNodeType lnClass="LLN0" id="Dummy.LLN0">
			<DO name="Mod" type="Dummy.LLN0.Mod" />
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="Health" type="Dummy.LLN0.Health" />
			<DO name="NamPlt" type="Dummy.LLN0.NamPlt" />
		</LNodeType>
		<LNodeType lnClass="LPHD" id="Dummy.LPHD1">
			<DO name="PhyNam" type="Dummy.LPHD1.PhyNam" />
			<DO name="PhyHealth" type="Dummy.LLN0.Health" />
			<DO name="Proxy" type="Dummy.SPS" />
			<DO name="Sim" type="Dummy.LPHD1.Sim" />
		</LNodeType>
		<LNodeType lnClass="XCBR" id="Dummy.XCBR1">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="Loc" type="Dummy.SPS" />
			<DO name="OpCnt" type="Dummy.XCBR1.OpCnt" />
			<DO name="Pos" type="Dummy.XCBR1.Pos" />
			<DO name="BlkOpn" type="Dummy.XCBR1.BlkOpn" />
			<DO name="BlkCls" type="Dummy.XCBR1.BlkOpn" />
		</LNodeType>
		<LNodeType lnClass="CSWI" id="Dummy.CSWI">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="Loc" type="Dummy.SPS" />
			<DO name="OpCnt" type="Dummy.XCBR1.OpCnt" />
		</LNodeType>
		<LNodeType lnClass="CILO" id="Dummy.CILO">
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="EnaOpn" type="Dummy.SPS"/>
            <DO name="EnaCls" type="Dummy.SPS"/>
		</LNodeType>
		<LNodeType lnClass="CSWI" id="Dummy.CSWIwithoutCtlModel">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="Loc" type="Dummy.SPS" />
			<DO name="OpCnt" type="Dummy.XCBR1.OpCnt" />
			<DO name="Pos" type="Dummy.CSWI.Pos2" />
		</LNodeType>
		<LNodeType lnClass="XSWI" id="Dummy.XSWI1">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="Loc" type="Dummy.SPS" />
			<DO name="OpCnt" type="Dummy.XCBR1.OpCnt" />
			<DO name="Pos" type="Dummy.XCBR1.Pos" />
			<DO name="BlkOpn" type="Dummy.XCBR1.BlkOpn" />
			<DO name="BlkCls" type="Dummy.XCBR1.BlkOpn" />
		</LNodeType>
		<LNodeType lnClass="GGIO" id="Dummy.GGIO1">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="Ind1" type="Dummy.SPS" />
			<DO name="SPCSO1" type="Dummy.LPHD1.Sim" />
		</LNodeType>
		<LNodeType lnClass="GGIO" id="Dummy.invalidChild">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" />
			<DO name="Ind1" type="Dummy.SPS" />
			<DO name="SPCSO1" type="Dummy.LPHD1.Sim" />
		</LNodeType>
		<LNodeType lnClass="GGIO" id="Dummy.badGGIO1">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.badNamPlt" />
			<DO name="Ind1" type="Dummy.SPS" />
			<DO name="SPCSO1" type="Dummy.LPHD1.Sim" />
		</LNodeType>
		<LNodeType id="Dummy.MissingLnClass">
		</LNodeType>
		<DOType cdc="ENC" id="Dummy.LLN0.Mod">
			<DA fc="ST" name="stVal" bType="Enum" type="Beh" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
				<Val>status-only</Val>
			</DA>
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="CO" name="SBO" bType="ObjRef" />
			<DA fc="CO" name="SBOw" bType="Struct" type="Dummy.LLN0.Mod.SBOw" />
			<DA fc="CO" name="Oper" bType="Struct" type="Dummy.LLN0.Mod.SBOw" />
			<DA fc="CO" name="Cancel" bType="Struct" type="Dummy.LLN0.Mod.Cancel" />
		</DOType>
		<DOType cdc="ENS" id="Dummy.LLN0.Beh">
			<DA fc="ST" name="stVal" bType="Enum" type="Beh" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
		</DOType>
		<DOType cdc="ENS" id="Dummy.LLN0.Health">
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
		</DOType>
		<DOType cdc="LPL" id="Dummy.LLN0.NamPlt">
			<DA fc="DC" name="vendor" bType="VisString255" />
			<DA fc="DC" name="swRev" bType="VisString255" />
			<DA fc="DC" name="d" bType="VisString255" />
			<DA fc="DC" name="configRev" bType="VisString255" />
			<DA fc="EX" name="ldNs" bType="VisString255" />
		</DOType>
		<DOType cdc="DPL" id="Dummy.LPHD1.PhyNam">
			<DA fc="DC" name="vendor" bType="VisString255" />
			<DA fc="DC" name="hwRev" bType="VisString255" />
			<DA fc="DC" name="swRev" bType="VisString255" />
			<DA fc="DC" name="serNum" bType="VisString255" />
			<DA fc="DC" name="model" bType="VisString255" />
		</DOType>
		<DOType cdc="SPC" id="Dummy.LPHD1.Sim">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
				<Val>status-only</Val>
			</DA>
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="DC" name="d" bType="VisString255" />
			<DA fc="CO" name="SBO" bType="ObjRef" />
			<DA fc="CO" name="SBOw" bType="Struct" type="Dummy.SBOw" />
			<DA fc="CO" name="Oper" bType="Struct" type="Dummy.SBOw" />
			<DA fc="CO" name="Cancel" bType="Struct" type="Dummy.Cancel" />
		</DOType>
        <DOType cdc="SPC" id="Dummy.SPC2">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
                <Val>sbo-with-normal-security</Val>
            </DA>
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="DC" name="d" bType="VisString255" />
			<DA fc="CO" name="Oper" bType="Struct" type="Dummy.SBOw" />
			<DA fc="CO" name="Cancel" bType="Struct" type="Dummy.Cancel" />
		</DOType>
        <DOType cdc="SPC" id="Dummy.SPC1">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
                <Val>sbo-with-enhanced-security</Val>
            </DA>
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="DC" name="d" bType="VisString255" />
			<DA fc="CO" name="Oper" bType="Struct" type="Dummy.SBOw" />
			<DA fc="CO" name="Cancel" bType="Struct" type="Dummy.Cancel" />
		</DOType>
        <DOType cdc="SPC" id="Dummy.SPC8">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
                <Val>sbo-with-enhanced-security</Val>
            </DA>
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="DC" name="d" bType="VisString255" />
			<DA fc="CO" name="SBOw" bType="Struct" type="Dummy.SBOw" />
			<DA fc="CO" name="Oper" bType="Struct" type="Dummy.SBOw" />
		</DOType>
        <DOType cdc="SPC" id="Dummy.SPC3">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
                <Val>direct-with-normal-security</Val>
            </DA>
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
        <DOType cdc="SPC" id="Dummy.SPC4">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
                <Val>status-only</Val>
            </DA>
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
        <DOType cdc="SPC" id="Dummy.SPC5">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
                <Val>direct-with-normal-security</Val>
            </DA>
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="DC" name="d" bType="VisString255" />
			<DA fc="CO" name="Oper" bType="Struct" type="Dummy.Operfalse" />
		</DOType>
        <DOType cdc="SPC" id="Dummy.SPC6">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
                <Val>sbo-with-enhanced-security</Val>
            </DA>
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="DC" name="d" bType="VisString255" />
			<DA fc="CO" name="SBOw" bType="Struct" type="Dummy.SBOwfalse" />
			<DA fc="CO" name="Oper" bType="Struct" type="Dummy.Oper" />
			<DA fc="CO" name="Cancel" bType="Struct" type="Dummy.Cancel" />
		</DOType>
        <DOType cdc="SPC" id="Dummy.SPC7">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
                <Val>sbo-with-enhanced-security</Val>
            </DA>
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="DC" name="d" bType="VisString255" />
			<DA fc="CO" name="SBOw" bType="Struct" type="Dummy.SBOw" />
			<DA fc="CO" name="Oper" bType="Struct" type="Dummy.Oper" />
			<DA fc="CO" name="Cancel" bType="Struct" type="Dummy.Cancelfalse" />
		</DOType>
		<DOType cdc="DPC" id="Dummy.XCBR1.Pos">
			<DA fc="ST" name="stVal" bType="Dbpos" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
				<Val>status-only</Val>
			</DA>
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="DPC" id="Dummy.XCBR1.Pos1">
			<DA fc="ST" name="stVal" bType="Dbpos" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel"/>
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="DPC" id="Dummy.CSWI.Pos1">
			<DA fc="ST" name="stVal" bType="Dbpos" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="DPC" id="Dummy.CSWI.Pos2">
			<DA fc="ST" name="stVal" bType="Dbpos" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
				<Val>status-only</Val>
			</DA>
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="INS" id="Dummy.XCBR1.OpCnt">
			<DA fc="ST" name="stVal" bType="INT32" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
		</DOType>
		<DOType cdc="LPL" id="Dummy.XCBR1.NamPlt">
			<DA fc="DC" name="vendor" bType="VisString255" />
			<DA fc="DC" name="swRev" bType="VisString255" />
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="LPH" id="Dummy.XCBR1.badNamPlt">
			<DA fc="DC" name="vendor" bType="VisString255" />
			<DA fc="DC" name="swRev" bType="VisString255" />
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="SPC" id="Dummy.XCBR1.BlkOpn">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
				<Val>status-only</Val>
			</DA>
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="SPS" id="Dummy.SPS">
            <DA fc="ST" dchg="true" name="stVal" bType="BOOLEAN"/>
            <DA fc="ST" qchg="true" name="q" bType="Quality"/>
            <DA fc="ST" name="t" bType="Timestamp"/>
        </DOType>
        <DOType cdc="SAV" id="Dummy.SAV">
            <DA fc="MX" name="instMag" bType="Struct" type="Dummy.AnalogueValue_f"/>
            <DA fc="MX" qchg="true" name="q" bType="Quality"/>
            <DA fc="MX" name="t" bType="Timestamp"/>
            <DA fc="CF" dchg="true" name="units" bType="Struct" type="Dummy.unit"/>
            <DA fc="CF" dchg="true" name="sVC" bType="Struct" type="Dummy.ScaledValueConfig"/>
        </DOType>
		<DOType  id="Dummy.MissingCDC">
		</DOType>
		<DOType cdc="SPC" id="Dummy.MissingType">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
                <Val>sbo-with-enhanced-security</Val>
            </DA>
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="DC" name="d" bType="VisString255" />
			<DA fc="CO" name="SBOw" bType="Struct"/>
			<DA fc="CO" name="Oper" bType="Struct"/>
			<DA fc="CO" name="Cancel" bType="Struct"/>
		</DOType>
		<DOType cdc="WYE" id="Dummy.badWYE">
            <DA fc="DC" name="d" bType="VisString255" valKind="RO"/>
            <SDO name="phsA" />
            <SDO name="phsB" type="Dummy.CMV"/>
            <SDO name="phsC" type="Dummy.CMV"/>
        </DOType>
		<DOType cdc="WYE" id="Dummy.WYE">
            <DA fc="DC" name="d" bType="VisString255" valKind="RO"/>
            <SDO name="phsA" type="Dummy.CMV"/>
            <SDO name="phsB" type="Dummy.CMV"/>
            <SDO name="phsC" type="Dummy.CMV"/>
        </DOType>
		<DOType cdc="CMV" id="Dummy.CMV">
            <DA fc="MX" name="instCVal" bType="Struct" type="Dummy.Vector"/>
            <DA fc="MX" dchg="true" name="cVal" bType="Struct" type="Dummy.Vector"/>
            <DA fc="MX" dchg="true" name="range" bType="Enum" type="Dummy_RangeKind"/>
            <DA fc="MX" qchg="true" name="q" bType="Quality"/>
            <DA fc="MX" name="t" bType="Timestamp"/>
            <DA fc="CF" name="units" bType="Struct" type="Dummy.Unit"/>
            <DA fc="CF" name="db" bType="INT32U"/>
            <DA fc="CF" name="zeroDb" bType="INT32U" valKind="RO"/>
        </DOType>
		<DAType id="Dummy.Vector">
            <BDA name="mag" bType="Struct" type="Dummy.AnalogueValue"/>
            <BDA name="ang" bType="Struct" type="Dummy.AnalogueValue"/>
        </DAType>
		<DAType id="Dummy.AnalogueValue">
            <BDA name="f" bType="FLOAT32"/>
        </DAType>
		<DAType id="Dummy.Unit">
            <BDA name="SIUnit" bType="Enum" valKind="RO" type="Dummy.UnitKink"/>
            <BDA name="multiplier" bType="Enum" valKind="RO" type="Dummy.MultiplierKind"/>
        </DAType>
		<DAType id="Dummy_origin">
			<BDA name="orCat" bType="Enum" type="Dummy_orCategory" />
			<BDA name="orIdent" bType="Octet64" />
		</DAType>
		<DAType id="Dummy.LLN0.Mod.SBOw">
			<BDA name="ctlVal" bType="Enum" type="Beh" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<BDA name="Check" bType="Check" />
		</DAType>
		<DAType id="Dummy.LLN0.Mod.Cancel">
			<BDA name="ctlVal" bType="Enum" type="Beh" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
		</DAType>
        <DAType id="Dummy.SBOw">
			<BDA name="ctlVal" bType="BOOLEAN" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<BDA name="Check" bType="Check" />
		</DAType>
		<DAType id="Dummy.Oper">
			<BDA name="ctlVal" bType="BOOLEAN" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<BDA name="Check" bType="Check" />
		</DAType>
		<DAType id="Dummy.Operfalse">
			<BDA name="ctlVal" bType="BOOLEAN" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<BDA name="Check" bType="Check" />
		</DAType>
        <DAType id="Dummy.SBOwfalse">
			<BDA name="ctlVal" bType="BOOLEAN" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<BDA name="Check" bType="Check" />
		</DAType>
        <DAType id="Dummy.Cancelfalse">
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
		</DAType>
		<DAType id="Dummy.Cancel">
			<BDA name="ctlVal" bType="BOOLEAN" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
		</DAType>
        <DAType id="Dummy.ScaledValueConfig">
            <BDA name="offset" bType="FLOAT32"/>
        </DAType>
        <DAType id="Dummy.RangeConfig">
            <BDA name="hhLim" bType="Struct" type="Dummy.AnalogueValue_f"/>
            <BDA name="hLim" bType="Struct" type="Dummy.AnalogueValue_f"/>
            <BDA name="lLim" bType="Struct" type="Dummy.AnalogueValue_f"/>
            <BDA name="llLim" bType="Struct" type="Dummy.AnalogueValue_f"/>
            <BDA name="min" bType="Struct" valKind="RO" type="Dummy.AnalogueValue_f"/>
            <BDA name="max" bType="Struct" valKind="RO" type="Dummy.AnalogueValue_f"/>
        </DAType>
        <DAType id="Dummy.AnalogueValue_f">
            <BDA name="f" bType="FLOAT32"/>
        </DAType>
        <DAType id="Dummy.unit">
            <BDA name="SIUnit" bType="Enum" valKind="RO" type="SIPROTEC5_EnType_SIUnit_V08.01.05_V08.00.00"/>
            <BDA name="multiplier" bType="Enum" valKind="RO" type="SIPROTEC5_EnType_Multiplier_V08.01.05_V07.90.00"/>
        </DAType>
		<EnumType id="Dummy_ctlModel">
			<EnumVal ord="0">status-only</EnumVal>
			<EnumVal ord="1">direct-with-normal-security</EnumVal>
			<EnumVal ord="2">sbo-with-normal-security</EnumVal>
			<EnumVal ord="3">direct-with-enhanced-security</EnumVal>
			<EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
		</EnumType>
		<EnumType id="Dummy_Health">
			<EnumVal ord="1">Ok</EnumVal>
			<EnumVal ord="2">Warning</EnumVal>
			<EnumVal ord="3">Alarm</EnumVal>
		</EnumType>
		<EnumType id="Dummy_orCategory">
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
		<EnumType id="Dummy_RangeKind">
            <EnumVal ord="0">normal</EnumVal>
            <EnumVal ord="1">high</EnumVal>
            <EnumVal ord="2">low</EnumVal>
            <EnumVal ord="3">high-high</EnumVal>
            <EnumVal ord="4">low-low</EnumVal>
        </EnumType>
		<EnumType id="Dummy.UnitKink">
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
        </EnumType>
		<EnumType id="Dummy.MultiplierKind">
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
	</DataTypeTemplates>
</SCL>
