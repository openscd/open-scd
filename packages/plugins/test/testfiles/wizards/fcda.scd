<?xml version="1.0" encoding="UTF-8"?>
<SCL version="2007" revision="B" release="4" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:txy="http://www.iec.ch/61850/2003/Terminal" xmlns:scl="http://www.iec.ch/61850/2003/SCL" xsi:schemaLocation="http://www.iec.ch/61850/2003/SCL SCL.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:IEC_60870_5_104="http://www.iec.ch/61850-80-1/2007/SCL">
	<Header id="TrainingIEC61850" version="1" revision="143" toolID="IEC 61850 System Configurator, Version: V5.90 " nameStructure="IEDName">
		<Text>TrainingIEC61850</Text>
		<History>
			<Hitem version="1" revision="143" when="Wednesday, September 25, 2019 9:11:36 AM" who="Licenced User: OMICRON electronics GmbH JakVog00 Machine: JAKVOG00LW01 User: JakVog00" what="Station is upgraded from IEC 61850 System Configurator, Version: V5.80 HF1 to V5.90 ." why="IEC 61850 System Configurator Automatic Startup: Insert Comment" />
		</History>
	</Header>
    <IED name="IED1" type="DummyIED" manufacturer="DummyManufactorer" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="DummyOwner">
    	<AccessPoint name="P1">
    		<Server>
    			<Authentication none="true" />
    			<LDevice inst="CircuitBreaker_CB1">
    				<LN0 lnClass="LLN0" lnType="Dummy.LLN0">
    					<DataSet name="GooseDataSet1">
                            <FCDA ldInst="CircuitBreaker_CB1" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                            <FCDA ldInst="CircuitBreaker_CB1" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST"/>
    						<FCDA ldInst="CircuitBreaker_CB1" prefix="" lnClass="CSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                            <FCDA ldInst="Disconnectors" prefix="DC" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                            <FCDA ldInst="Disconnectors" prefix="DC" lnClass="XSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
                        </DataSet>
    				</LN0>
    				<LN lnClass="XCBR" inst="1" lnType="Dummy.XCBR1"/>
    			</LDevice>
    			<LDevice inst="Meas">
    				<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
    				<LN prefix="My" lnClass="MMXU" inst="1" lnType="Dummy.MMXU"/>
    			</LDevice>
    		</Server>
    	</AccessPoint>
    </IED>
    <DataTypeTemplates>
    	<LNodeType lnClass="LLN0" id="Dummy.LLN0">
    		<DO name="Beh" type="Dummy.LLN0.Beh" />
    	</LNodeType>
    	<LNodeType lnClass="XCBR" id="Dummy.XCBR1">
    		<DO name="Pos" type="Dummy.XCBR1.Pos" />
    	</LNodeType>
        <LNodeType lnClass="MMXU" id="Dummy.MMXU" desc="Three phase measurement">
            <DO name="A" type="OpenSCD_WYE_phases"/>
        </LNodeType>
    	<DOType cdc="ENS" id="Dummy.LLN0.Beh">
    		<DA fc="ST" name="stVal" bType="Enum" type="Dummy_Beh" />
    		<DA fc="ST" name="q" bType="Quality" />
    		<DA fc="ST" name="t" bType="Timestamp" />
    	</DOType>
    	<DOType cdc="DPC" id="Dummy.XCBR1.Pos">
    		<DA name="stVal" bType="Dbpos" /> 
            <DA fc="CO" name="SBOw" bType="Struct" type="Dummy.LLN0.Mod.SBOw" />
    	</DOType>
        <DOType cdc="WYE" id="OpenSCD_WYE_phases">
            <SDO name="phsA" type="OpenSCD_CMV_db_i_MagAndAng"/>
        </DOType>
        <DOType cdc="CMV" id="OpenSCD_CMV_db_i_MagAndAng">
            <DA name="cVal" bType="Struct" dchg="true" type="OpenSCD_Vector_I_w_Ang" fc="MX"/>
        </DOType>
        <DAType id="Dummy.LLN0.Mod.SBOw">
    		<BDA name="origin" bType="Struct" type="Dummy_origin" />
    	</DAType>
        <DAType id="Dummy_origin">
    		<BDA name="orCat" bType="Enum" type="Dummy_orCategory" />
    	</DAType>
        <DAType id="OpenSCD_Vector_I_w_Ang">
            <BDA name="mag" bType="Struct" type="OpenSCD_AnalogueValue_INT32"/>
        </DAType>
        <DAType id="OpenSCD_AnalogueValue_INT32">
            <BDA name="i" bType="INT32"/>
        </DAType>
    </DataTypeTemplates>
</SCL>
