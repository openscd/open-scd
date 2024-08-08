<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
	<Header id="clonetest"/>
	<Substation name="AA1" desc="">
		<VoltageLevel name="E1" desc="" nomFreq="50" numPhases="3">
			<Voltage unit="V" multiplier="k">110</Voltage>
			<Bay name="Q01" desc="">
				<Function name="F1">
                    <LNode iedName="IED1" ldInst="LD0" prefix="" lnClass="CSWI" lnInst="1"/>
                    <LNode iedName="IED1" ldInst="LD0" lnClass="LLN0"/>
					<SubFunction name="Sub1">
                        <LNode iedName="IED2" ldInst="LD0" lnClass="LLN0"/>
						<LNode iedName="IED2" ldInst="LD0" prefix="" lnClass="CSWI" lnInst="1"/>
					</SubFunction>
				</Function>
			</Bay>
		</VoltageLevel>
	</Substation>
    <IED name="IED1" type="DummyIED" manufacturer="DummyManufactorer" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="DummyOwner">
		<AccessPoint name="P1">
			<Server>
				<Authentication />
				<LDevice inst="LD0">
                    <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>			
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
    <IED name="IED2" type="DummyIED" manufacturer="DummyManufactorer" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="DummyOwner">
		<AccessPoint name="P1">
			<Server>
				<Authentication />
				<LDevice inst="LD0">
                    <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>				
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
    <IED name="IED3" type="DummyIED" manufacturer="DummyManufactorer" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="DummyOwner">
		<AccessPoint name="P1">
			<Server>
				<Authentication />
				<LDevice inst="LD0">
                    <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>				
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
    <IED name="IED4" type="DummyIED" manufacturer="DummyManufactorer" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="DummyOwner">
		<AccessPoint name="P1">
			<Server>
				<Authentication />
				<LDevice inst="LD0">
                    <LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>			
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
    		<DO name="Pos" type="Dummy.CSWI.Pos1" />
    	</LNodeType>
    	<LNodeType lnClass="CILO" id="Dummy.CILO">
    		<DO name="Beh" type="Dummy.LLN0.Beh" />
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
