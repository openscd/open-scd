<?xml version="1.0" encoding="UTF-8"?>
<SCL version="2007" revision="B" release="4" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:txy="http://www.iec.ch/61850/2003/Terminal" xmlns:scl="http://www.iec.ch/61850/2003/SCL" xsi:schemaLocation="http://www.iec.ch/61850/2003/SCL SCL.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:IEC_60870_5_104="http://www.iec.ch/61850-80-1/2007/SCL">
	<Header id="TrainingIEC61850" version="1" revision="143" toolID="IEC 61850 System Configurator, Version: V5.90 " nameStructure="IEDName">
		<Text>TrainingIEC61850</Text>
		<History>
			<Hitem version="1" revision="143" when="Wednesday, September 25, 2019 9:11:36 AM" who="Licenced User: OMICRON electronics GmbH JakVog00 Machine: JAKVOG00LW01 User: JakVog00" what="Station is upgraded from IEC 61850 System Configurator, Version: V5.80 HF1 to V5.90 ." why="IEC 61850 System Configurator Automatic Startup: Insert Comment" />
		</History>
	</Header>
	<Substation name="AA1" desc="Substation">
		<VoltageLevel name="E1" desc="Voltage Level" nomFreq="50.0" numPhases="3">
			<Voltage unit="V" multiplier="k">110.0</Voltage>
		    <LNode iedName="IED1" ldInst="CircuitBreaker_CB1" lnClass="XCBR" lnInst="1"/>
			<Bay name="COUPLING_BAY" desc="Bay">
				<ConductingEquipment type="CBR" name="QA1" desc="coupling field ciscuit breaker"/>
				<ConductingEquipment type="DIS" name="QB1" desc="busbar disconnector QB1"/>
				<ConductingEquipment type="DIS" name="QB2" desc="busbar disconnector QB2"/>
				<ConductingEquipment type="DIS" name="QC11" desc="busbar earth switch QC11">
					<Terminal name="T1" connectivityNode="AA1/E1/COUPLING_BAY/L2" substationName="AA1" voltageLevelName="E1" bayName="COUPLING_BAY" cNodeName="L2"/>
					<Terminal connectivityNode="AA1/E1/COUPLING_BAY/grounded" name="T2" substationName="AA1" voltageLevelName="E1" bayName="COUPLING_BAY" cNodeName="grounded"/>
				</ConductingEquipment>
				<ConductingEquipment type="DIS" name="QC21" desc="busbar disconnector Q12">
					<Terminal connectivityNode="AA1/E1/COUPLING_BAY/grounded" name="T1" substationName="AA1" voltageLevelName="E1" bayName="COUPLING_BAY" cNodeName="grounded"/>
				</ConductingEquipment>
                <ConnectivityNode pathName="AA1/E1/COUPLING_BAY/L2" name="L2"/>
			</Bay>
			<Bay name="Bay2" desc="Bay2"/>
		</VoltageLevel>
		<VoltageLevel name="J1" desc="Voltage Level">
			<Voltage unit="V" multiplier="k">20</Voltage>
			<Bay name="Bay1" desc="Bay1"/>
		</VoltageLevel>
	</Substation>
	<IED name="IED1" type="DummyIED" manufacturer="DummyManufactorer" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="DummyOwner">
		<Services>
			<DynAssociation />
			<GetDirectory />
			<GetDataObjectDefinition />
			<DataObjectDirectory />
			<GetDataSetValue />
			<SetDataSetValue />
			<DataSetDirectory />
			<ConfDataSet modify="false" max="3" />
			<DynDataSet max="42" />
			<ReadWrite />
			<ConfReportControl bufConf="false" max="10"/>
			<GetCBValues />
			<ReportSettings rptID="Dyn" optFields="Dyn" bufTime="Dyn" trgOps="Dyn" intgPd="Dyn" resvTms="true" owner="true" />
			<GOOSE max="1" />
			<GSSE max="0" />
			<ConfLNs fixPrefix="true" fixLnInst="true" />
		</Services>
		<AccessPoint name="P1">
			<Server>
    			<LDevice inst="CircuitBreaker_CB1">
    				<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
    					<DataSet name="GooseDataSet1">
                            <FCDA ldInst="CircuitBreaker_CB1" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                            <FCDA ldInst="CircuitBreaker_CB1" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST"/>
    						<FCDA ldInst="CircuitBreaker_CB1" prefix="" lnClass="CSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                            <FCDA ldInst="Disconnectors" prefix="DC" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                            <FCDA ldInst="Disconnectors" prefix="DC" lnClass="XSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
                        </DataSet>
    					<GSEControl type="GOOSE" appID="0001" fixedOffs="false" confRev="1" name="GCB" datSet="GooseDataSet1">
    						<IEDName apRef="P1" ldInst="CircuitBreaker_CB1" lnClass="CSWI" lnInst="1">IED2</IEDName>
    					</GSEControl>
    					<GSEControl type="GOOSE" appID="0003" fixedOffs="false" confRev="1" name="GCB2"/>
    				</LN0>
    				<LN lnClass="XCBR" inst="1" lnType="Dummy.XCBR1">
    					<DOI name="Pos">
    						<DAI name="ctlModel">
    							<Val>status-only</Val>
    						</DAI>
    					</DOI>
    				</LN>
    			</LDevice>
    		</Server>
    	</AccessPoint>
    </IED>
    <DataTypeTemplates>
    	<LNodeType lnClass="LLN0" id="Dummy.LLN0">
    		<DO name="Mod" type="Dummy.LLN0.Mod" />
    		<DO name="Beh" type="Dummy.LLN0.Beh" />
    		<DO name="Health" type="Dummy.LLN0.Health" />
    		<DO name="NamPlt" type="Dummy.LLN0.NamPlt" />
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
    	<DOType cdc="DPC" id="Dummy.XCBR1.Pos">
    		<DA fc="ST" name="stVal" bType="Dbpos" />
    		<DA fc="ST" name="q" bType="Quality" />
    		<DA fc="ST" name="t" bType="Timestamp" />
    		<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel" />
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
