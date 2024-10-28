<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
	<Header id="general_equipment"/>
    <DataTypeTemplates>
    	<LNodeType lnClass="CSWI" id="OpenSCD_CSWI" desc="Switch control: single phase">
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
    	<DOType cdc="DPC" id="OpenSCD_DPC_statusonly">
    		<DA name="stVal" bType="Dbpos" dchg="true" fc="ST"/>
    		<DA name="q" bType="Quality" qchg="true" fc="ST"/>
    		<DA name="t" bType="Timestamp" fc="ST"/>
    		<DA name="ctlModel" bType="Enum" fc="CF" type="OpenSCD_StatusOnly">
    			<Val>status-only</Val>
    		</DA>
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
    	<DOType cdc="SPC" id="OpenSCD_SPC_LocSta">
    		<DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
    		<DA name="q" bType="Quality" qchg="true" fc="ST"/>
    		<DA name="t" bType="Timestamp" fc="ST"/>
    		<DA name="Oper" bType="Struct" type="OpenSCD_OperSBOw_SPC" fc="CO"/>
    		<DA name="Cancel" bType="Struct" type="OpenSCD_Cancel_SPC" fc="CO"/>
    		<DA name="operTimeout" bType="INT32U" fc="CF">
    			<Val>1000</Val>
    		</DA>
    		<DA name="ctlModel" bType="Enum" dchg="true" type="CtlModelKind" fc="CF">
    			<Val>direct-with-enhanced-security</Val>
    		</DA>
    	</DOType>
    	<DOType cdc="SPS" id="OpenSCD_SPS_simple">
    		<DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
    		<DA name="q" bType="Quality" qchg="true" fc="ST"/>
    		<DA name="t" bType="Timestamp" fc="ST"/>
    		<DA name="d" bType="VisString255" fc="DC"/>
    	</DOType>
    	<DOType cdc="LPL" id="OpenSCD_LPL_noLD">
    		<DA name="vendor" bType="VisString255" fc="DC"/>
    		<DA name="swRev" bType="VisString255" fc="DC"/>
    		<DA name="d" bType="VisString255" fc="DC"/>
    		<DA name="configRev" bType="VisString255" fc="DC"/>
    	</DOType>
    	<DOType cdc="ENS" id="OpenSCD_ENS_Health">
    		<DA name="stVal" bType="Enum" dchg="true" fc="ST" type="HealthKind"/>
    		<DA name="q" bType="Quality" qchg="true" fc="ST"/>
    		<DA name="t" bType="Timestamp" fc="ST"/>
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
    	<DAType id="OpenSCD_Cancel_Dbpos">
    		<BDA name="ctlVal" bType="Dbpos"/>
    		<BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
    		<BDA name="ctlNum" bType="INT8U"/>
    		<BDA name="T" bType="Timestamp"/>
    		<BDA name="Test" bType="BOOLEAN"/>
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
    	<DAType id="OpenSCD_PulseConfig">
    		<BDA name="cmdQual" bType="Enum" type="OutputSignalKind"/>
    		<BDA name="onDur" bType="INT32U"/>
    		<BDA name="offDur" bType="INT32U"/>
    		<BDA name="numPls" bType="INT32U"/>
    	</DAType>
    	<DAType id="OpenSCD_Cancel_SPC">
    		<BDA name="ctlVal" bType="BOOLEAN"/>
    		<BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
    		<BDA name="ctlNum" bType="INT8U"/>
    		<BDA name="T" bType="Timestamp"/>
    		<BDA name="Test" bType="BOOLEAN"/>
    		<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
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
    	<DAType id="OpenSCD_Cancel_BehaviourModeKind">
    		<BDA name="ctlVal" bType="Enum" type="BehaviourModeKind"/>
    		<BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
    		<BDA name="ctlNum" bType="INT8U"/>
    		<BDA name="T" bType="Timestamp"/>
    		<BDA name="Test" bType="BOOLEAN"/>
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
    	<DAType id="OpenSCD_Originator">
    		<BDA name="orCat" bType="Enum" type="OriginatorCategoryKind"/>
    		<BDA name="orIdent" bType="Octet64"/>
    	</DAType>
    	<EnumType id="OpenSCD_StatusOnly">
    		<EnumVal ord="0">status-only</EnumVal>
    	</EnumType>
    	<EnumType id="OutputSignalKind">
    		<EnumVal ord="0">pulse</EnumVal>
    		<EnumVal ord="1">persistent</EnumVal>
    		<EnumVal ord="2">persistent-feedback</EnumVal>
    	</EnumType>
    	<EnumType id="HealthKind">
    		<EnumVal ord="1">Ok</EnumVal>
    		<EnumVal ord="2">Warning</EnumVal>
    		<EnumVal ord="3">Alarm</EnumVal>
    	</EnumType>
    	<EnumType id="CtlModelKind">
    		<EnumVal ord="0">status-only</EnumVal>
    		<EnumVal ord="1">direct-with-normal-security</EnumVal>
    		<EnumVal ord="2">sbo-with-normal-security</EnumVal>
    		<EnumVal ord="3">direct-with-enhanced-security</EnumVal>
    		<EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
    	</EnumType>
    	<EnumType id="BehaviourModeKind">
    		<EnumVal ord="1">on</EnumVal>
    		<EnumVal ord="2">blocked</EnumVal>
    		<EnumVal ord="3">test</EnumVal>
    		<EnumVal ord="4">test/blocked</EnumVal>
    		<EnumVal ord="5">off</EnumVal>
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
    </DataTypeTemplates>
	<Line name="Berlin" desc="" type="" nomFreq="" numPhases="">
		<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI" />
		<Function name="someFunctionToBerlin">
			<SubFunction name="someSubFunc">
			</SubFunction>
		</Function>
		<Voltage multiplier="k" unit="V">110.0</Voltage>
		<ConductingEquipment name="someCondEq" type="CBR">
			<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI" />
    	</ConductingEquipment>
    </Line>
    <Line name="Munich">
		<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI" />
		<GeneralEquipment name="someGenEq" type="BAT">
			<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI" />
    	</GeneralEquipment>
		<Function name="someFunctionToMunich">
			<SubFunction name="someSubFunc">
			</SubFunction>
		</Function>
		<Voltage multiplier="k" unit="V">380.0</Voltage>
		<ConductingEquipment name="someCondEq" type="DIS">
			<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI" />
    	</ConductingEquipment>
    </Line>
</SCL>
