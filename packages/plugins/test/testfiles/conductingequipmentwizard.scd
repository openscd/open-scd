<?xml version="1.0" encoding="utf-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" xmlns:xs="http://www.w3.org/2001/XMLSchema-instance" version="2007" revision="B" release="4" xs:schemaLocation="SCL.xsd">
	<Header id="header" nameStructure="IEDName" revision="R0.0" toolID="none" version="V0.0">
		<History>
			<Hitem revision="R0.1" version="V0.0" what="" when="Sat Jan 01 19:00:00 NZST 2022" who="Daniel" why="Testing" />
		</History>
	</Header>
	<Substation name="ERE" sxy:dir="vertical" sxy:x="1" desc="Just a substation">
		<VoltageLevel name="V220" sxy:dir="vertical" sxy:x="3">
			<Bay name="B232" sxy:dir="vertical" sxy:x="1">
				<ConductingEquipment name="ES239" sxy:dir="vertical" sxy:x="1" sxy:y="1" virtual="false" type="DIS">
					<!-- first terminal grounded -->
					<Terminal bayName="B232" cNodeName="grounded" name="grounded" substationName="ERE" voltageLevelName="V220" connectivityNode="ERE/V220/B232/grounded" />
					<Terminal bayName="B232" cNodeName="L1" name="L1" substationName="ERE" voltageLevelName="V220" connectivityNode="ERE/V220/B232/L1" />
				</ConductingEquipment>
				<ConnectivityNode name="grounded" pathName="ERE/V220/B232/grounded" />
			</Bay>
			<Bay name="B242" sxy:dir="vertical" sxy:x="2">
				<ConductingEquipment name="ES249" sxy:dir="vertical" sxy:x="1" sxy:y="1" virtual="false" type="DIS">
					<!-- second terminal grounded -->
					<Terminal bayName="B242" cNodeName="L1" name="L1" substationName="ERE" voltageLevelName="V220" connectivityNode="ERE/V220/B242/L1" />
					<Terminal bayName="B242" cNodeName="grounded" name="grounded" substationName="ERE" voltageLevelName="V220" connectivityNode="ERE/V220/B242/grounded" />
				</ConductingEquipment>
				<ConnectivityNode name="grounded" pathName="ERE/V220/B242/grounded" />
			</Bay>
			<Bay name="B252" sxy:dir="vertical" sxy:x="3">
				<ConductingEquipment name="ES259" sxy:dir="vertical" sxy:x="1" sxy:y="1" virtual="false" type="DIS">
					<!-- this IED has a DAI:stVal defining an "Earthing Switch" -->
					<LNode iedName="BC1" ldInst="Application" lnClass="XSWI" lnInst="1" lnType="LNType_XSWI_Ctl" />
					<Terminal bayName="B252" cNodeName="L1" name="L1" substationName="ERE" voltageLevelName="V220" connectivityNode="ERE/V220/B252/L1" />
					<Terminal bayName="B252" cNodeName="L2" name="L2" substationName="ERE" voltageLevelName="V220" connectivityNode="ERE/V220/B252/L2" />
				</ConductingEquipment>
				<ConnectivityNode name="L2" pathName="ERE/V220/B252/L2" />
			</Bay>
			<Bay name="B262" sxy:dir="vertical" sxy:x="4">
				<ConductingEquipment name="ES269" sxy:dir="vertical" sxy:x="1" sxy:y="1" virtual="false" type="DIS">
					<!-- In this case, the SwTyp:stVal is defined via the DOType  -->
					<LNode iedName="BC1" ldInst="Application" lnClass="XSWI" lnInst="2" lnType="LNType_XSWI_Ctl_2" />
					<Terminal bayName="B262" cNodeName="L1" name="L1" substationName="ERE" voltageLevelName="V220" connectivityNode="ERE/V220/B262/L1" />
					<Terminal bayName="B262" cNodeName="L2" name="L2" substationName="ERE" voltageLevelName="V220" connectivityNode="ERE/V220/B262/L2" />
				</ConductingEquipment>
				<ConnectivityNode name="L2" pathName="ERE/V220/B262/L2" />
			</Bay>
			<Bay name="B272" sxy:dir="vertical" sxy:x="5">
				<ConductingEquipment name="ES279" sxy:dir="vertical" sxy:x="1" sxy:y="1" virtual="false" type="DIS">
					<Terminal bayName="B272" cNodeName="L1" name="L1" substationName="ERE" voltageLevelName="V220" connectivityNode="ERE/V220/B272/L1" />
					<Terminal bayName="B272" cNodeName="L2" name="L2" substationName="ERE" voltageLevelName="V220" connectivityNode="ERE/V220/B272/L2" />
					<SubEquipment name="A" phase="A" virtual="false">
						<!-- Here we check that a definition inside a SubEquipment still to identify an ERS -->
						<LNode iedName="BC1" ldInst="Application" lnClass="XSWI" lnInst="1" lnType="LNType_XSWI_Ctl" />
					</SubEquipment>
				</ConductingEquipment>
				<ConnectivityNode name="L2" pathName="ERE/V220/B272/L2" />
			</Bay>
			<Bay name="B282" sxy:dir="vertical" sxy:x="6">
				<ConductingEquipment name="ES289" sxy:dir="vertical" sxy:x="1" sxy:y="1" virtual="false" type="DIS">
					<!-- This lnType is only defined in the data type templates, not within an IED section -->
					<LNode iedName="None" ldInst="Application" lnClass="XSWI" lnInst="1" lnType="LNType_XSWI_Ctl_3"/>
					<Terminal bayName="B282" cNodeName="L1" name="L1" substationName="ERE" voltageLevelName="V220" connectivityNode="ERE/V220/B282/L1" />
					<Terminal bayName="B282" cNodeName="L2" name="L2" substationName="ERE" voltageLevelName="V220" connectivityNode="ERE/V220/B282/L2" />
				</ConductingEquipment>
				<ConnectivityNode name="L2" pathName="ERE/V220/B282/L2" />
			</Bay>
			<Bay name="Bus_A1" desc="Bus A1" sxy:x="0" sxy:y="3">
				<ConnectivityNode name="L1_232" pathName="ERE/V220/B232/L1" />
				<ConnectivityNode name="L1_242" pathName="ERE/V220/B242/L1" />
				<ConnectivityNode name="L1_252" pathName="ERE/V220/B252/L1" />
				<ConnectivityNode name="L1_262" pathName="ERE/V220/B262/L1" />
				<ConnectivityNode name="L1_272" pathName="ERE/V220/B272/L1" />
				<ConnectivityNode name="L1_282" pathName="ERE/V220/B282/L1" />
			  </Bay>
		</VoltageLevel>
	</Substation>
	<IED desc="ERS Bay Controller" name="BC1" type="ERS_Bay_Controller" manufacturer="FreedomInc" configVersion="V00.01.00" originalSclVersion="2007" originalSclRevision="B" owner="IEC station 1" originalSclRelease="4">
		<Services nameLength="64">
			<ClientServices goose="true" gsse="false" bufReport="false" unbufReport="false" readLog="false" sv="true" supportsLdName="true" maxGOOSE="128" maxSMV="32" rGOOSE="false" rSV="false" noIctBinding="false">
				<TimeSyncProt sntp="true" c37_238="false" other="false" iec61850_9_3="true" />
			</ClientServices>
			<DynAssociation max="6" />
			<SettingGroups>
				<SGEdit resvTms="true" />
			</SettingGroups>
			<GetDirectory />
			<GetDataObjectDefinition />
			<DataObjectDirectory />
			<GetDataSetValue />
			<DataSetDirectory />
			<ConfDataSet max="50" maxAttributes="100" modify="true" />
			<DynDataSet max="30" maxAttributes="60" />
			<ReadWrite />
			<ConfReportControl max="60" bufMode="both" bufConf="true" />
			<GetCBValues />
			<ReportSettings cbName="Conf" datSet="Dyn" rptID="Dyn" optFields="Dyn" bufTime="Dyn" trgOps="Dyn" intgPd="Dyn" resvTms="true" />
			<GSESettings cbName="Conf" datSet="Conf" appID="Conf" dataLabel="Fix" kdaParticipant="false" />
			<ConfLNs fixPrefix="false" fixLnInst="false" />
			<ConfLdName />
			<GOOSE max="16" fixedOffs="false" goose="true" rGOOSE="false" />
			<FileHandling />
			<SupSubscription maxGo="0" maxSv="60" />
			<ValueHandling setToRO="false" />
			<RedProt hsr="true" prp="true" rstp="true" />
			<CommProt ipv6="false" />
		</Services>
		<AccessPoint desc="" name="E" router="false" clock="false">
			<Server timeout="0">
				<Authentication none="true" />
				<LDevice desc="Application" inst="Application">
					<LN0 lnClass="LLN0" inst="" lnType="LNType_LLN0_Application" desc="General">
						<DOI name="Mod" desc="Test mode" />
						<DOI name="Beh" desc="Behavior" />
						<DOI name="Health" desc="Health (61850 only)" />
						<DOI name="NamPlt" desc="Name plate">
							<DAI name="configRev">
								<Val>2021-08-31 19:49:47</Val>
							</DAI>
							<DAI name="ldNs">
								<Val>IEC 61850-7-4:2007B</Val>
							</DAI>
						</DOI>
						<DOI name="LEDRs" desc="LED reset" />
						<DOI name="LocKey" desc="Sw.authority key/set">
							<DAI name="dataNs">
								<Val>IEC 61850-7-4:2007B</Val>
							</DAI>
						</DOI>
						<DOI name="LocSta" desc="Switching auth. station">
							<DAI name="dataNs">
								<Val>IEC 61850-7-4:2007B</Val>
							</DAI>
						</DOI>
						<DOI name="MltLev" desc="Multiple sw.auth. levels">
							<DAI name="setVal">
								<Val>false</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>IEC 61850-7-4:2007B</Val>
							</DAI>
						</DOI>
						<SettingControl numOfSGs="1" actSG="1"></SettingControl>
					</LN0>
					<LN lnClass="XSWI" inst="1" lnType="LNType_XSWI_Ctl" desc="Disconnector" prefix="">
						<DOI name="Mod" desc="Mode (status only)" />
						<DOI name="Beh" desc="Behavior" />
						<DOI name="Health" desc="Health" />
						<DOI name="NamPlt" desc="Name plate"/>
						<DOI name="Loc" desc="Switching auth. local" />
						<DOI name="OpCnt" desc="Op.ct." />
						<DOI name="Pos" desc="Position">
							<SDI name="pulseConfig">
								<DAI name="cmdQual">
									<Val>pulse</Val>
								</DAI>
								<DAI name="onDur">
									<Val>10000</Val>
								</DAI>
								<DAI name="offDur">
									<Val>0</Val>
								</DAI>
								<DAI name="numPls">
									<Val>1</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="BlkOpn" desc="Block opening" />
						<DOI name="BlkCls" desc="Block closing" />
						<DOI name="SwTyp" desc="Switching-device type">
							<DAI name="stVal">
								<Val>Earthing Switch</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="XSWI" inst="2" lnType="LNType_XSWI_Ctl_2" desc="Disconnector" prefix="">
						<DOI name="Mod" desc="Mode (status only)" />
						<DOI name="Beh" desc="Behavior" />
						<DOI name="Health" desc="Health" />
						<DOI name="NamPlt" desc="Name plate"/>
						<DOI name="Loc" desc="Switching auth. local" />
						<DOI name="OpCnt" desc="Op.ct." />
						<DOI name="Pos" desc="Position">
							<SDI name="pulseConfig">
								<DAI name="cmdQual">
									<Val>pulse</Val>
								</DAI>
								<DAI name="onDur">
									<Val>10000</Val>
								</DAI>
								<DAI name="offDur">
									<Val>0</Val>
								</DAI>
								<DAI name="numPls">
									<Val>1</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="BlkOpn" desc="Block opening" />
						<DOI name="BlkCls" desc="Block closing" />
						<DOI name="SwTyp" desc="Switching-device type"/>
					</LN>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<DataTypeTemplates>
		<LNodeType id="LNType_LLN0_Application" lnClass="LLN0">
			<DO name="Mod" type="DOType_Mod_controllable_Test_with_InitVal" />
			<DO name="Beh" type="DOType_ENS_Behavior" />
			<DO name="Health" type="DOType_ENS_Health" />
			<DO name="NamPlt" type="DOType_LPL_NamPlt_for_LLN0" />
			<DO name="LEDRs" type="DOType_SPC_dir_with_nor_sec" />
			<DO name="LocKey" type="DOType_SPS_with_dataNs" />
			<DO name="LocSta" type="DOType_SPC_dir_with_nor_sec_and_dataNs" />
			<DO name="MltLev" type="DOType_SPG_readOnly_with_dataNs" />
		</LNodeType>
		<LNodeType id="LNType_XSWI_Ctl" lnClass="XSWI">
			<DO name="Mod" type="DOType_Mod_status_only_with_InitVal" />
			<DO name="Beh" type="DOType_ENS_Behavior" />
			<DO name="Health" type="DOType_ENS_Health" />
			<DO name="NamPlt" type="DOType_LPL_NamPlt_for_Ed2_LN" />
			<DO name="Loc" type="DOType_SPS" />
			<DO name="OpCnt" type="DOType_INS_INT32" />
			<DO name="Pos" type="DOType_DPC_XCBR_Pos" />
			<DO name="BlkOpn" type="DOType_SPC_status_only" />
			<DO name="BlkCls" type="DOType_SPC_status_only" />
			<DO name="SwTyp" type="DOType_ENS_SwitchType" />
		</LNodeType>
		<LNodeType id="LNType_XSWI_Ctl_2" lnClass="XSWI">
			<DO name="Mod" type="DOType_Mod_status_only_with_InitVal" />
			<DO name="Beh" type="DOType_ENS_Behavior" />
			<DO name="Health" type="DOType_ENS_Health" />
			<DO name="NamPlt" type="DOType_LPL_NamPlt_for_Ed2_LN" />
			<DO name="Loc" type="DOType_SPS" />
			<DO name="OpCnt" type="DOType_INS_INT32" />
			<DO name="Pos" type="DOType_DPC_XCBR_Pos" />
			<DO name="BlkOpn" type="DOType_SPC_status_only" />
			<DO name="BlkCls" type="DOType_SPC_status_only" />
			<DO name="SwTyp" type="DOType_ENS_SwitchType_2" />
		</LNodeType>
		<LNodeType id="LNType_XSWI_Ctl_3" lnClass="XSWI">
			<DO name="Mod" type="DOType_Mod_status_only_with_InitVal" />
			<DO name="Beh" type="DOType_ENS_Behavior" />
			<DO name="Health" type="DOType_ENS_Health" />
			<DO name="NamPlt" type="DOType_LPL_NamPlt_for_Ed2_LN" />
			<DO name="Loc" type="DOType_SPS" />
			<DO name="OpCnt" type="DOType_INS_INT32" />
			<DO name="Pos" type="DOType_DPC_XCBR_Pos" />
			<DO name="BlkOpn" type="DOType_SPC_status_only" />
			<DO name="BlkCls" type="DOType_SPC_status_only" />
			<DO name="SwTyp" type="DOType_ENS_SwitchType_2" />
		</LNodeType>
		<DOType id="DOType_SPG_readOnly_with_dataNs" cdc="SPG">
			<DA fc="SE" name="setVal" bType="BOOLEAN" valKind="RO" />
			<DA fc="EX" name="dataNs" bType="VisString255" valKind="RO">
				<Val>SIPROTEC5</Val>
			</DA>
		</DOType>
		<DOType id="DOType_SPC_dir_with_nor_sec_and_dataNs" cdc="SPC">
			<DA fc="ST" name="origin" bType="Struct" type="DAType_origin" />
			<DA fc="ST" name="ctlNum" bType="INT8U" />
			<DA dchg="true" fc="ST" name="stVal" bType="BOOLEAN" />
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" valKind="RO" type="Textlist_ctlModel_dir_with_nor_sec">
				<Val>direct-with-normal-security</Val>
			</DA>
			<DA fc="EX" name="dataNs" bType="VisString255" valKind="RO">
				<Val>SIPROTEC5</Val>
			</DA>
			<DA fc="CO" name="Oper" bType="Struct" type="DAType_Oper_Boolean" />
		</DOType>
		<DOType id="DOType_SPS_with_dataNs" cdc="SPS">
			<DA dchg="true" fc="ST" name="stVal" bType="BOOLEAN" />
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="EX" name="dataNs" bType="VisString255" valKind="RO">
				<Val>SIPROTEC5</Val>
			</DA>
		</DOType>
		<DOType id="DOType_SPC_dir_with_nor_sec" cdc="SPC">
			<DA fc="ST" name="origin" bType="Struct" type="DAType_origin" />
			<DA fc="ST" name="ctlNum" bType="INT8U" />
			<DA dchg="true" fc="ST" name="stVal" bType="BOOLEAN" />
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" valKind="RO" type="Textlist_ctlModel_dir_with_nor_sec">
				<Val>direct-with-normal-security</Val>
			</DA>
			<DA fc="CO" name="Oper" bType="Struct" type="DAType_Oper_Boolean" />
		</DOType>
		<DOType id="DOType_LPL_NamPlt_for_LLN0" cdc="LPL">
			<DA fc="DC" name="vendor" bType="VisString255" valKind="RO">
				<Val>SIEMENS</Val>
			</DA>
			<DA fc="DC" name="swRev" bType="VisString255" valKind="RO" />
			<DA fc="DC" name="d" bType="VisString255" valKind="RO" />
			<DA fc="DC" name="configRev" bType="VisString255" valKind="RO" />
			<DA fc="EX" name="ldNs" bType="VisString255" valKind="RO" />
		</DOType>
		<DOType id="DOType_ENS_Health" cdc="ENS">
			<DA dchg="true" fc="ST" name="stVal" bType="Enum" type="Textlist_Health" />
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
		</DOType>
		<DOType id="DOType_ENS_Behavior" cdc="ENS">
			<DA dchg="true" fc="ST" name="stVal" bType="Enum" type="Textlist_Behavior" />
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
		</DOType>
		<DOType id="DOType_Mod_controllable_Test_with_InitVal" cdc="ENC">
			<DA fc="ST" name="origin" bType="Struct" type="DAType_origin" />
			<DA fc="ST" name="ctlNum" bType="INT8U" />
			<DA dchg="true" fc="ST" name="stVal" bType="Enum" type="Textlist_Behavior_SetTestMod" />
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" valKind="RO" type="Textlist_ctlModel_dir_with_nor_sec">
				<Val>direct-with-normal-security</Val>
			</DA>
			<DA fc="CO" name="Oper" bType="Struct" type="DAType_Oper_Mod_OnTest" />
		</DOType>
		<DOType id="DOType_LPL_NamPlt_for_Ed2_LN" cdc="LPL">
			<DA fc="DC" name="vendor" bType="VisString255" valKind="RO">
				<Val>FreedomInc</Val>
			</DA>
			<DA fc="DC" name="swRev" bType="VisString255" valKind="RO" />
			<DA fc="DC" name="d" bType="VisString255" valKind="RO" />
			<DA fc="DC" name="configRev" bType="VisString255" valKind="RO" />
			<DA fc="EX" name="lnNs" bType="VisString255" valKind="RO">
				<Val>IEC 61850-7-4:2007B</Val>
			</DA>
		</DOType>
		<DOType id="DOType_SPS" cdc="SPS">
			<DA dchg="true" fc="ST" name="stVal" bType="BOOLEAN" />
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
		</DOType>
		<DOType id="DOType_Mod_status_only_with_InitVal" cdc="ENC">
			<DA dchg="true" fc="ST" name="stVal" bType="Enum" type="Textlist_Behavior">
				<Val>on</Val>
			</DA>
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" valKind="RO" type="Textlist_ctlModel_status_only">
				<Val>status-only</Val>
			</DA>
		</DOType>
		<DOType id="DOType_SPC_status_only" cdc="SPC">
			<DA dchg="true" fc="ST" name="stVal" bType="BOOLEAN" />
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" valKind="RO" type="Textlist_ctlModel_status_only">
				<Val>status-only</Val>
			</DA>
		</DOType>
		<DOType id="DOType_DPC_XCBR_Pos" cdc="DPC">
			<DA fc="ST" name="origin" bType="Struct" type="DAType_origin" />
			<DA fc="ST" name="ctlNum" bType="INT8U" />
			<DA dchg="true" fc="ST" name="stVal" bType="Dbpos" />
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA dchg="true" fc="ST" name="stSeld" bType="BOOLEAN" />
			<DA fc="SV" name="subEna" bType="BOOLEAN" />
			<DA fc="SV" name="subVal" bType="Dbpos" />
			<DA fc="SV" name="subQ" bType="Quality" />
			<DA fc="SV" name="subID" bType="VisString64" />
			<DA fc="BL" name="blkEna" bType="BOOLEAN" />
			<DA dchg="true" fc="CF" name="pulseConfig" bType="Struct" type="DAType_PulseConfig_XCBR" />
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" valKind="RO" type="Textlist_ctlModel_status_only">
				<Val>status-only</Val>
			</DA>
		</DOType>
		<DOType id="DOType_INS_INT32" cdc="INS">
			<DA dchg="true" fc="ST" name="stVal" bType="INT32" />
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
		</DOType>
		<DOType id="DOType_Mod_controllable_with_InitVal" cdc="ENC">
			<DA fc="ST" name="origin" bType="Struct" type="DAType_origin" />
			<DA fc="ST" name="ctlNum" bType="INT8U" />
			<DA dchg="true" fc="ST" name="stVal" bType="Enum" type="Textlist_Behavior" />
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" valKind="RO" type="Textlist_ctlModel_dir_with_nor_sec">
				<Val>direct-with-normal-security</Val>
			</DA>
			<DA fc="CO" name="Oper" bType="Struct" type="DAType_Oper_Mod" />
		</DOType>
		<DOType id="DOType_SPC_statusOnly_and_dir_with_nor_sec" cdc="SPC">
			<DA fc="ST" name="origin" bType="Struct" type="DAType_origin" />
			<DA fc="ST" name="ctlNum" bType="INT8U" />
			<DA dchg="true" fc="ST" name="stVal" bType="BOOLEAN" />
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" valKind="RO" type="Textlist_ctlModel_status_only_and_dir_with_nor_sec">
				<Val>direct-with-normal-security</Val>
			</DA>
			<DA fc="CO" name="Oper" bType="Struct" type="DAType_Oper_Boolean" />
		</DOType>
		<DOType id="DOType_ENS_SwitchType" cdc="ENS">
			<DA dchg="true" fc="ST" name="stVal" bType="Enum" type="EnType_SwitchType" />
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
		</DOType>
		<DOType id="DOType_ENS_SwitchType_2" cdc="ENS">
			<DA dchg="true" fc="ST" name="stVal" bType="Enum" type="EnType_SwitchType">
				<Val>Earthing Switch</Val>
			</DA>
			<DA qchg="true" fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
		</DOType>
		<DAType id="DAType_origin">
			<BDA name="orCat" bType="Enum" type="Textlist_orCategory" />
			<BDA name="orIdent" bType="Octet64" />
		</DAType>
		<DAType id="DAType_Oper_Boolean">
			<BDA name="ctlVal" bType="BOOLEAN" />
			<BDA name="origin" bType="Struct" type="DAType_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<BDA name="Check" bType="Check" />
			<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<DAType id="DAType_Oper_Mod_OnTest">
			<BDA name="ctlVal" bType="Enum" type="Textlist_Behavior_SetTestMod" />
			<BDA name="origin" bType="Struct" type="DAType_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<BDA name="Check" bType="Check" />
			<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<DAType id="DAType_Units_1">
			<BDA name="SIUnit" bType="Enum" valKind="RO" type="EnType_SIUnit" />
			<BDA name="multiplier" bType="Enum" valKind="RO" type="EnType_Multiplier" />
		</DAType>
		<DAType id="DAType_Cancel_Boolean">
			<BDA name="ctlVal" bType="BOOLEAN" />
			<BDA name="origin" bType="Struct" type="DAType_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<DAType id="DAType_CalendarTime">
			<BDA name="occ" bType="INT16U" />
			<BDA name="occType" bType="Enum" type="EnType_Cal_Occ_Type" />
			<BDA name="occPer" bType="Enum" type="EnType_Cal_Occ_Period" />
			<BDA name="weekDay" bType="Enum" type="EnType_Cal_WeekDay" />
			<BDA name="month" bType="Enum" type="EnType_Cal_Month" />
			<BDA name="day" bType="INT8U" />
			<BDA name="hr" bType="INT8U" />
			<BDA name="mn" bType="INT8U" />
		</DAType>
		<DAType id="DAType_PulseConfig_XCBR">
			<BDA name="cmdQual" bType="Enum" valKind="RO" type="Textlist_PulseConfigCmdQual" />
			<BDA name="onDur" bType="INT32U" valKind="RO" />
			<BDA name="offDur" bType="INT32U" valKind="RO" />
			<BDA name="numPls" bType="INT32U" valKind="RO" />
		</DAType>
		<DAType id="DAType_Oper_Mod">
			<BDA name="ctlVal" bType="Enum" type="Textlist_Behavior" />
			<BDA name="origin" bType="Struct" type="DAType_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<BDA name="Check" bType="Check" />
			<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<DAType id="DAType_Vector">
			<BDA name="mag" bType="Struct" type="DAType_AnalogValue_FLOAT32" />
			<BDA name="ang" bType="Struct" type="DAType_AnalogValue_FLOAT32" />
		</DAType>
		<DAType id="DAType_AnalogValue_FLOAT32">
			<BDA name="f" bType="FLOAT32" valKind="Set">
				<Val>0</Val>
			</BDA>
		</DAType>
		<DAType id="DAType_Vector_mag">
			<BDA name="mag" bType="Struct" type="DAType_AnalogValue_FLOAT32" />
		</DAType>
		<DAType id="DAType_AnalogValue_FLOAT32_readOnly">
			<BDA name="f" bType="FLOAT32" valKind="RO">
				<Val>0</Val>
			</BDA>
		</DAType>
		<DAType id="DAType_AnalogValue_INT32">
			<BDA name="i" bType="INT32" />
		</DAType>
		<DAType id="DAType_ScaledValueConfig_readOnly_VisAsProperty">
			<BDA name="scaleFactor" bType="FLOAT32" valKind="Set">
				<Val>1</Val>
			</BDA>
			<BDA name="offset" bType="FLOAT32" valKind="Set">
				<Val>0</Val>
			</BDA>
		</DAType>
		<EnumType id="Textlist_orCategory">
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
		<EnumType id="Textlist_ctlModel_dir_with_nor_sec">
			<EnumVal ord="1">direct-with-normal-security</EnumVal>
		</EnumType>
		<EnumType id="Textlist_Health">
			<EnumVal ord="1">Ok</EnumVal>
			<EnumVal ord="2">Warning</EnumVal>
			<EnumVal ord="3">Alarm</EnumVal>
		</EnumType>
		<EnumType id="Textlist_Behavior">
			<EnumVal ord="1">on</EnumVal>
			<EnumVal ord="3">test</EnumVal>
			<EnumVal ord="5">off</EnumVal>
		</EnumType>
		<EnumType id="Textlist_Behavior_SetTestMod">
			<EnumVal ord="1">on</EnumVal>
			<EnumVal ord="3">test</EnumVal>
		</EnumType>
		<EnumType id="EnType_SIUnit">
			<EnumVal ord="-38">kV/mA</EnumVal>
			<EnumVal ord="-37">kA/V</EnumVal>
			<EnumVal ord="-36">ohm/m</EnumVal>
			<EnumVal ord="-35">ppm/°C</EnumVal>
			<EnumVal ord="-34">F/m</EnumVal>
			<EnumVal ord="-33">H/m</EnumVal>
			<EnumVal ord="-32">ms/kPa</EnumVal>
			<EnumVal ord="-31">kPa</EnumVal>
			<EnumVal ord="-30">ms/V</EnumVal>
			<EnumVal ord="-29">ms/K</EnumVal>
			<EnumVal ord="-28">V/s</EnumVal>
			<EnumVal ord="-27">I/Ir*s</EnumVal>
			<EnumVal ord="-26">1/week</EnumVal>
			<EnumVal ord="-25">1/d</EnumVal>
			<EnumVal ord="-24">1/h</EnumVal>
			<EnumVal ord="-23">1/min</EnumVal>
			<EnumVal ord="-22">periods</EnumVal>
			<EnumVal ord="-21">GB</EnumVal>
			<EnumVal ord="-19">cycle</EnumVal>
			<EnumVal ord="-18">mile</EnumVal>
			<EnumVal ord="-17">inch</EnumVal>
			<EnumVal ord="-16">°F</EnumVal>
			<EnumVal ord="-15">I/IrObj</EnumVal>
			<EnumVal ord="-14">MB</EnumVal>
			<EnumVal ord="-13">KB</EnumVal>
			<EnumVal ord="-12">Bytes</EnumVal>
			<EnumVal ord="-11">p.u.</EnumVal>
			<EnumVal ord="-10">day(s)</EnumVal>
			<EnumVal ord="-7">%</EnumVal>
			<EnumVal ord="-4">F/mi</EnumVal>
			<EnumVal ord="-3">ohm/mi</EnumVal>
			<EnumVal ord="-2">F/km</EnumVal>
			<EnumVal ord="-1">ohm/km</EnumVal>
			<EnumVal ord="1" />
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
		<EnumType id="EnType_Multiplier">
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
			<EnumVal ord="0" />
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
		<EnumType id="Textlist_ctlModel">
			<EnumVal ord="0">status-only</EnumVal>
			<EnumVal ord="1">direct-with-normal-security</EnumVal>
			<EnumVal ord="2">sbo-with-normal-security</EnumVal>
			<EnumVal ord="3">direct-with-enhanced-security</EnumVal>
			<EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
		</EnumType>
		<EnumType id="Textlist_ctlModel_status_only">
			<EnumVal ord="0">status-only</EnumVal>
		</EnumType>
		<EnumType id="EnType_Cal_Occ_Type">
			<EnumVal ord="0">Time</EnumVal>
			<EnumVal ord="1">WeekDay</EnumVal>
			<EnumVal ord="2">WeekOfYear</EnumVal>
			<EnumVal ord="3">DayOfMonth</EnumVal>
			<EnumVal ord="4">DayOfYear</EnumVal>
		</EnumType>
		<EnumType id="EnType_Cal_Occ_Period">
			<EnumVal ord="0">Hour</EnumVal>
			<EnumVal ord="1">Day</EnumVal>
			<EnumVal ord="2">Week</EnumVal>
			<EnumVal ord="3">Month</EnumVal>
			<EnumVal ord="4">Year</EnumVal>
		</EnumType>
		<EnumType id="EnType_Cal_WeekDay">
			<EnumVal ord="1">Monday</EnumVal>
			<EnumVal ord="2">Tuesday</EnumVal>
			<EnumVal ord="3">Wednesday</EnumVal>
			<EnumVal ord="4">Thursday</EnumVal>
			<EnumVal ord="5">Friday</EnumVal>
			<EnumVal ord="6">Saturday</EnumVal>
			<EnumVal ord="7">Sunday</EnumVal>
		</EnumType>
		<EnumType id="EnType_Cal_Month">
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
		<EnumType id="Textlist_PulseConfigCmdQual">
			<EnumVal ord="0">pulse</EnumVal>
			<EnumVal ord="1">persistent</EnumVal>
		</EnumType>
		<EnumType id="Textlist_ctlModel_status_only_and_dir_with_nor_sec">
			<EnumVal ord="0">status-only</EnumVal>
			<EnumVal ord="1">direct-with-normal-security</EnumVal>
		</EnumType>
		<EnumType id="Textlist_ctlModel_dir_with_enh_sec">
			<EnumVal ord="3">direct-with-enhanced-security</EnumVal>
		</EnumType>
		<EnumType id="EnType_SwitchType">
			<EnumVal ord="1">Load Break</EnumVal>
			<EnumVal ord="2">Disconnector</EnumVal>
			<EnumVal ord="3">Earthing Switch</EnumVal>
			<EnumVal ord="4">High Speed Earthing Switch</EnumVal>
		</EnumType>
	</DataTypeTemplates>
</SCL>