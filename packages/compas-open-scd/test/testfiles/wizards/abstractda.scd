<?xml version="1.0" encoding="UTF-8"?>
<SCL version="2007" revision="B" release="4" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:txy="http://www.iec.ch/61850/2003/Terminal" xmlns:scl="http://www.iec.ch/61850/2003/SCL" xsi:schemaLocation="http://www.iec.ch/61850/2003/SCL SCL.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:IEC_60870_5_104="http://www.iec.ch/61850-80-1/2007/SCL">
	<Header id="TrainingIEC61850" version="1" revision="143" toolID="IEC 61850 System Configurator, Version: V5.90 " nameStructure="IEDName">
		<Text>TrainingIEC61850</Text>
		<History>
			<Hitem version="1" revision="143" when="Wednesday, September 25, 2019 9:11:36 AM" who="Licenced User: OMICRON electronics GmbH JakVog00 Machine: JAKVOG00LW01 User: JakVog00" what="Station is upgraded from IEC 61850 System Configurator, Version: V5.80 HF1 to V5.90 ." why="IEC 61850 System Configurator Automatic Startup: Insert Comment" />
		</History>
	</Header>
	<DataTypeTemplates>
		<DOType cdc="SAV" id="DummySAV">
            <DA fc="MX" name="instMag" bType="Struct" type="AnalogueValue_i"/>
            <DA fc="MX" qchg="true" name="q" bType="Quality"/>
            <DA fc="CF" name="sVC" bType="Struct" type="ScaledValueConfig"/>
        </DOType>
		<DOType cdc="ENC" id="Dummy.LLN0.Mod">
			<DA fc="ST" name="stVal" bType="Enum" type="Dummy_Beh" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="OR" name="opRcvd" bType="BOOLEAN" />
			<DA fc="OR" name="opOk" bType="BOOLEAN" />
			<DA fc="OR" name="tOpOk" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel" />
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="CO" name="SBO" bType="ObjRef" />
			<DA fc="CO" name="SBOw" bType="Struct" type="Dummy.LLN0.Mod.SBOw" />
			<DA fc="CO" name="Oper" bType="Struct" type="Dummy.LLN0.Mod.SBOw" />
			<DA fc="CO" name="Cancel" bType="Struct" type="Dummy.LLN0.Mod.Cancel" />
		</DOType>
		<DOType cdc="ENS" id="Dummy.LLN0.Beh">
			<DA fc="ST" name="stVal" bType="Enum" type="Dummy_Beh" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
		</DOType>
		<DOType cdc="ENS" id="Dummy.LLN0.Health">
			<DA fc="ST" name="stVal" bType="Enum" type="Dummy_Health" />
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
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel" />
			<DA fc="CF" name="sboTimeout" bType="INT32U" />
			<DA fc="CF" name="operTimeout" bType="INT32U" />
			<DA fc="DC" name="d" bType="VisString255" />
			<DA fc="CO" name="SBO" bType="ObjRef" />
			<DA fc="CO" name="SBOw" bType="Struct" type="Dummy.LPHD1.Sim.SBOw" />
			<DA fc="CO" name="Oper" bType="Struct" type="Dummy.LPHD1.Sim.SBOw" />
			<DA fc="CO" name="Cancel" bType="Struct" type="Dummy.LPHD1.Sim.Cancel" />
		</DOType>
		<DOType cdc="DPC" id="Dummy.XCBR1.Pos">
			<DA fc="ST" name="stVal" bType="Dbpos" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel" />
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="DPC" id="Dummy.CSWI.Pos1">
			<DA fc="ST" name="stVal" bType="Dbpos" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel">
				<Val>sbo-with-enhanced-security</Val>
			</DA>
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="DPC" id="Dummy.CSWI.Pos2">
			<DA fc="ST" name="stVal" bType="Dbpos" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel"/>
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
		<DOType cdc="SPC" id="Dummy.XCBR1.BlkOpn">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel" />
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="SPS" id="Dummy.SPS">
            <DA fc="ST" dchg="true" name="stVal" bType="BOOLEAN"/>
            <DA fc="ST" qchg="true" name="q" bType="Quality"/>
            <DA fc="ST" name="t" bType="Timestamp"/>
        </DOType>
		<DAType id="AnalogueValue_i">
            <BDA name="i" bType="INT32"/>
        </DAType>
		<DAType id="ScaledValueConfig">
            <BDA name="scaleFactor" bType="FLOAT32"/>
            <BDA name="offset" bType="FLOAT32"/>
        </DAType>
		<DAType id="Dummy_origin">
			<BDA name="orCat" bType="Enum" type="Dummy_orCategory" />
			<BDA name="orIdent" bType="Octet64" />
		</DAType>
		<DAType id="Dummy.LLN0.Mod.SBOw">
			<BDA name="ctlVal" bType="Enum" type="Dummy_Beh" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<BDA name="Check" bType="Check" />
			<ProtNs>IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<DAType id="Dummy.LLN0.Mod.Cancel">
			<BDA name="ctlVal" bType="Enum" type="Dummy_Beh" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
		</DAType>
		<DAType id="Dummy.LPHD1.Sim.SBOw">
			<BDA name="ctlVal" bType="BOOLEAN" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<BDA name="Check" bType="Check" />
		</DAType>
		<DAType id="Dummy.LPHD1.Sim.Cancel">
			<BDA name="ctlVal" bType="BOOLEAN" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
		</DAType>
		<EnumType id="Dummy_ctlModel">
			<EnumVal ord="0">status-only</EnumVal>
			<EnumVal ord="1">direct-with-normal-security</EnumVal>
			<EnumVal ord="2">sbo-with-normal-security</EnumVal>
			<EnumVal ord="3">direct-with-enhanced-security</EnumVal>
			<EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
		</EnumType>
		<EnumType id="Dummy_Beh">
            <EnumVal ord="1">on</EnumVal>
            <EnumVal ord="2">blocked</EnumVal>
            <EnumVal ord="3">test</EnumVal>
            <EnumVal ord="4">test/blocked</EnumVal>
            <EnumVal ord="5">off</EnumVal>
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
	</DataTypeTemplates>
</SCL>
