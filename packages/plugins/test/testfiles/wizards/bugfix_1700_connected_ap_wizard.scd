<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ext="http://www.nrec.com">
	<Header id="project"/>
	<Communication>
		<SubNetwork name="sub1" desc="" type="8-MMS">
			<BitRate unit="b/s" multiplier="M">100</BitRate>
		</SubNetwork>
	</Communication>
	<IED name="IED1" desc="MERGING UNIT" type="PCS-221S" manufacturer="NRR" configVersion="1.00" originalSclVersion="2007" originalSclRevision="B" engRight="full">
		<Private type="NR_Board">Type:NR6106,Slot:B01,Fiber:4,DspCores:C1R2</Private>
		<Private type="NR_LDQuality">LD0:B01.C1R2.QAL131.qal131</Private>
		<Private type="NR_LDQuality">MU01:B01.C1R2.QAL131.qal132</Private>
		<Private type="NR_LDQuality">RCD:B01.C1R2.QAL131.qal136</Private>
		<Private type="NR_LDQuality">MUSV:B01.C1R2.QAL131.qal137</Private>
		<Private type="NR_LDQuality">MUGO:B01.C1R2.QAL131.qal138</Private>
		<Private type="NR_MainCpu">Type:NR6106AH,Slot:B01</Private>
		<Private type="TPLInfo">version:1.07,revision:1.13,tool:PCS-Studio_1.2,cidRuleVersion:2.0</Private>
		<Private type="IED virtual terminal conection CRC">D030E0AB</Private>
		<Services nameLength="64">
			<ClientServices goose="false" gsse="false" bufReport="false" unbufReport="false" readLog="false" sv="false">
				<TimeSyncProt sntp="true" c37_238="false" other="false"/>
			</ClientServices>
			<DynAssociation max="16"/>
			<SettingGroups>
				<SGEdit resvTms="true"/>
				<ConfSG resvTms="true"/>
			</SettingGroups>
			<GetDirectory/>
			<GetDataObjectDefinition/>
			<DataObjectDirectory/>
			<GetDataSetValue/>
			<DataSetDirectory/>
			<ConfDataSet max="160" maxAttributes="256" modify="false"/>
			<ReadWrite/>
			<ConfReportControl max="160" bufMode="both" bufConf="false"/>
			<GetCBValues/>
			<ConfLogControl max="2"/>
			<ReportSettings cbName="Conf" datSet="Conf" rptID="Dyn" optFields="Dyn" bufTime="Dyn" trgOps="Dyn" intgPd="Dyn" resvTms="false" owner="false"/>
			<LogSettings cbName="Fix" datSet="Fix" logEna="Dyn" trgOps="Fix" intgPd="Conf"/>
			<GSESettings cbName="Conf" datSet="Conf" appID="Conf" dataLabel="Fix"/>
			<GOOSE max="64"/>
			<FileHandling/>
			<ConfLNs fixPrefix="true" fixLnInst="true"/>
		</Services>
		<AccessPoint name="S1" router="false" clock="false">
			<Server timeout="30">
				<Authentication none="true"/>
				<LDevice inst="LD0">
					<LN0 desc="LLN0" lnType="NRR_LLN0_ED2_V1.00_S_V1.00" lnClass="LLN0" inst="">
						<DataSet name="Analogue">
							<FCDA ldInst="LD0" prefix="USR" lnClass="GGIO" lnInst="1" doName="AnIn1" fc="MX"/>
						</DataSet>
						<DataSet name="Ind">
							<FCDA ldInst="LD0" lnClass="LPHD" lnInst="1" doName="PhyHealth" fc="ST"/>
						</DataSet>
						<ReportControl name="SCADA_Ind" datSet="Ind" intgPd="3600000" rptID="SCADA_Ind" confRev="1" buffered="true" bufTime="500">
							<TrgOps dchg="true" qchg="true" dupd="false" period="true" gi="true"/>
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="false" entryID="true" configRef="false" bufOvfl="true"/>
							<RptEnabled max="16"/>
						</ReportControl>
						<ReportControl name="Test_Ind" datSet="Ind" intgPd="3600000" rptID="Test_Ind" confRev="1" buffered="true" bufTime="500">
							<TrgOps dchg="true" qchg="true" dupd="false" period="true" gi="true"/>
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="false" entryID="true" configRef="false" bufOvfl="true"/>
							<RptEnabled max="16"/>
						</ReportControl>
						<ReportControl name="SCADA_Analogue" datSet="Analogue" intgPd="3600000" rptID="SCADA_Analogue" confRev="1" buffered="false" bufTime="500">
							<TrgOps dchg="true" qchg="true" dupd="false" period="true" gi="true"/>
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="false" entryID="true" configRef="false" bufOvfl="false"/>
							<RptEnabled max="16"/>
						</ReportControl>
						<ReportControl name="Test_Analogue" datSet="Analogue" intgPd="3600000" rptID="Test_Analogue" confRev="1" buffered="false" bufTime="500">
							<TrgOps dchg="true" qchg="true" dupd="false" period="true" gi="true"/>
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="false" entryID="true" configRef="false" bufOvfl="false"/>
							<RptEnabled max="16"/>
						</ReportControl>
					</LN0>
					<LN desc="LPHD" lnType="NRR_LPHD_ED2_V1.00_S_V1.00" lnClass="LPHD" inst="1">
					</LN>
					<LN desc="Global_End" lnType="NRR_PTRC_ED2_V1.00_S_V1.00" lnClass="PTRC" inst="1">
					</LN>
					<LN lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="1">
					</LN>
					<LN desc="AlarmSignal1" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="2">
					</LN>
					<LN desc="FaultSignal2" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="4">
					</LN>
					<LN desc="FaultSignal3" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="5">
					</LN>
					<LN desc="RemoteSignal1" lnType="NRR_GGIO_IND_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="11">
					</LN>
					<LN desc="P1" lnType="NRR_GGIO_IND32_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="1" prefix="BI">
					</LN>
					<LN desc="B05" lnType="NRR_GGIO_IND32_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="3" prefix="BI">
					</LN>
					<LN desc="GS_RECV_BOOL_1" lnType="NRR_GGIO_IND_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="1" prefix="IND">
					</LN>
					<LN desc="GS_RECV_BOOL_2" lnType="NRR_GGIO_IND_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="2" prefix="IND">
					</LN>
					<LN desc="TripElement1" lnType="NRR_GGIO_ACT_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="1" prefix="MU01">
					</LN>
					<LN desc="FaultSignal4" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="6" prefix="MU01">
					</LN>
					<LN desc="FaultSignal5" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="7" prefix="MU01">
					</LN>
					<LN desc="FaultSignal6" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="8" prefix="MU01">
					</LN>
					<LN desc="Analog" lnType="NRR_GGIO_AnIn_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="1" prefix="USR">
					</LN>
					<LN desc="Analog" lnType="NRR_GGIO_AnIn_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="2" prefix="USR">
					</LN>
					<LN desc="RemoteSignal" lnType="NRR_GGIO_IND_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="4" prefix="USR">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="1">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="2">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="3">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="4">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="5">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="6">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="7">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="8">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="9">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="10">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="11">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link10.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_10"/>
							<DAI name="d">
								<Val>GOOSE_Link10.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link10.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_10"/>
							<DAI name="d">
								<Val>GOOSE_Link10.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link10.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_10"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_10"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_10"/>
							<DAI name="d">
								<Val>GOOSE_Link10.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link10.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_10"/>
							<DAI name="d">
								<Val>GOOSE_Link10.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link10.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_10"/>
							<DAI name="d">
								<Val>GOOSE_Link10.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link10.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_10"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link10.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="12">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link11.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_11"/>
							<DAI name="d">
								<Val>GOOSE_Link11.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link11.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_11"/>
							<DAI name="d">
								<Val>GOOSE_Link11.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link11.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_11"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_11"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_11"/>
							<DAI name="d">
								<Val>GOOSE_Link11.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link11.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_11"/>
							<DAI name="d">
								<Val>GOOSE_Link11.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link11.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_11"/>
							<DAI name="d">
								<Val>GOOSE_Link11.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link11.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_11"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link11.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="13">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link12.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_12"/>
							<DAI name="d">
								<Val>GOOSE_Link12.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link12.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_12"/>
							<DAI name="d">
								<Val>GOOSE_Link12.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link12.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_12"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_12"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_12"/>
							<DAI name="d">
								<Val>GOOSE_Link12.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link12.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_12"/>
							<DAI name="d">
								<Val>GOOSE_Link12.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link12.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_12"/>
							<DAI name="d">
								<Val>GOOSE_Link12.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link12.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_12"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link12.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="14">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link13.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_13"/>
							<DAI name="d">
								<Val>GOOSE_Link13.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link13.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_13"/>
							<DAI name="d">
								<Val>GOOSE_Link13.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link13.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_13"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_13"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_13"/>
							<DAI name="d">
								<Val>GOOSE_Link13.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link13.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_13"/>
							<DAI name="d">
								<Val>GOOSE_Link13.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link13.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_13"/>
							<DAI name="d">
								<Val>GOOSE_Link13.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link13.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_13"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link13.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="15">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link14.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_14"/>
							<DAI name="d">
								<Val>GOOSE_Link14.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link14.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_14"/>
							<DAI name="d">
								<Val>GOOSE_Link14.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link14.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_14"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_14"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_14"/>
							<DAI name="d">
								<Val>GOOSE_Link14.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link14.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_14"/>
							<DAI name="d">
								<Val>GOOSE_Link14.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link14.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_14"/>
							<DAI name="d">
								<Val>GOOSE_Link14.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link14.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_14"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link14.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="16">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link15.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_15"/>
							<DAI name="d">
								<Val>GOOSE_Link15.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link15.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_15"/>
							<DAI name="d">
								<Val>GOOSE_Link15.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link15.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_15"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_15"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_15"/>
							<DAI name="d">
								<Val>GOOSE_Link15.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link15.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_15"/>
							<DAI name="d">
								<Val>GOOSE_Link15.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link15.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_15"/>
							<DAI name="d">
								<Val>GOOSE_Link15.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link15.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_15"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link15.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="17">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link16.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_16"/>
							<DAI name="d">
								<Val>GOOSE_Link16.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link16.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_16"/>
							<DAI name="d">
								<Val>GOOSE_Link16.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link16.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_16"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_16"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_16"/>
							<DAI name="d">
								<Val>GOOSE_Link16.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link16.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_16"/>
							<DAI name="d">
								<Val>GOOSE_Link16.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link16.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_16"/>
							<DAI name="d">
								<Val>GOOSE_Link16.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link16.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_16"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link16.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="18">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link17.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_17"/>
							<DAI name="d">
								<Val>GOOSE_Link17.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link17.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_17"/>
							<DAI name="d">
								<Val>GOOSE_Link17.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link17.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_17"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_17"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_17"/>
							<DAI name="d">
								<Val>GOOSE_Link17.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link17.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_17"/>
							<DAI name="d">
								<Val>GOOSE_Link17.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link17.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_17"/>
							<DAI name="d">
								<Val>GOOSE_Link17.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link17.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_17"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link17.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="19">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link18.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_18"/>
							<DAI name="d">
								<Val>GOOSE_Link18.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link18.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_18"/>
							<DAI name="d">
								<Val>GOOSE_Link18.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link18.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_18"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_18"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_18"/>
							<DAI name="d">
								<Val>GOOSE_Link18.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link18.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_18"/>
							<DAI name="d">
								<Val>GOOSE_Link18.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link18.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_18"/>
							<DAI name="d">
								<Val>GOOSE_Link18.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link18.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_18"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link18.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="20">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link19.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_19"/>
							<DAI name="d">
								<Val>GOOSE_Link19.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link19.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_19"/>
							<DAI name="d">
								<Val>GOOSE_Link19.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link19.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_19"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_19"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_19"/>
							<DAI name="d">
								<Val>GOOSE_Link19.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link19.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_19"/>
							<DAI name="d">
								<Val>GOOSE_Link19.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link19.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_19"/>
							<DAI name="d">
								<Val>GOOSE_Link19.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link19.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_19"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link19.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="21">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link18.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_18"/>
							<DAI name="d">
								<Val>GOOSE_Link18.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link18.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_18"/>
							<DAI name="d">
								<Val>GOOSE_Link18.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link18.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_18"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_18"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_18"/>
							<DAI name="d">
								<Val>GOOSE_Link18.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link18.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_18"/>
							<DAI name="d">
								<Val>GOOSE_Link18.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link18.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_18"/>
							<DAI name="d">
								<Val>GOOSE_Link18.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link18.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_18"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link18.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="22">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link19.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_19"/>
							<DAI name="d">
								<Val>GOOSE_Link19.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link19.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_19"/>
							<DAI name="d">
								<Val>GOOSE_Link19.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link19.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_19"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_19"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_19"/>
							<DAI name="d">
								<Val>GOOSE_Link19.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link19.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_19"/>
							<DAI name="d">
								<Val>GOOSE_Link19.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link19.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_19"/>
							<DAI name="d">
								<Val>GOOSE_Link19.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link19.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_19"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link19.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="23">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link20.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_20"/>
							<DAI name="d">
								<Val>GOOSE_Link20.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link20.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_20"/>
							<DAI name="d">
								<Val>GOOSE_Link20.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link20.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_20"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_20"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_20"/>
							<DAI name="d">
								<Val>GOOSE_Link20.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link20.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_20"/>
							<DAI name="d">
								<Val>GOOSE_Link20.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link20.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_20"/>
							<DAI name="d">
								<Val>GOOSE_Link20.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link20.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_20"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link20.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="24">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link21.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_21"/>
							<DAI name="d">
								<Val>GOOSE_Link21.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link21.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_21"/>
							<DAI name="d">
								<Val>GOOSE_Link21.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link21.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_21"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_21"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_21"/>
							<DAI name="d">
								<Val>GOOSE_Link21.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link21.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_21"/>
							<DAI name="d">
								<Val>GOOSE_Link21.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link21.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_21"/>
							<DAI name="d">
								<Val>GOOSE_Link21.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link21.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_21"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link21.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="25">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link22.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_22"/>
							<DAI name="d">
								<Val>GOOSE_Link22.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link22.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_22"/>
							<DAI name="d">
								<Val>GOOSE_Link22.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link22.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_22"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_22"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_22"/>
							<DAI name="d">
								<Val>GOOSE_Link22.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link22.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_22"/>
							<DAI name="d">
								<Val>GOOSE_Link22.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link22.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_22"/>
							<DAI name="d">
								<Val>GOOSE_Link22.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link22.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_22"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link22.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="26">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link23.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_23"/>
							<DAI name="d">
								<Val>GOOSE_Link23.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link23.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_23"/>
							<DAI name="d">
								<Val>GOOSE_Link23.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link23.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_23"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_23"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_23"/>
							<DAI name="d">
								<Val>GOOSE_Link23.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link23.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_23"/>
							<DAI name="d">
								<Val>GOOSE_Link23.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link23.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_23"/>
							<DAI name="d">
								<Val>GOOSE_Link23.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link23.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_23"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link23.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="27">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link24.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_24"/>
							<DAI name="d">
								<Val>GOOSE_Link24.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link24.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_24"/>
							<DAI name="d">
								<Val>GOOSE_Link24.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link24.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_24"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_24"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_24"/>
							<DAI name="d">
								<Val>GOOSE_Link24.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link24.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_24"/>
							<DAI name="d">
								<Val>GOOSE_Link24.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link24.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_24"/>
							<DAI name="d">
								<Val>GOOSE_Link24.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link24.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_24"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link24.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="28">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link25.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_25"/>
							<DAI name="d">
								<Val>GOOSE_Link25.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link25.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_25"/>
							<DAI name="d">
								<Val>GOOSE_Link25.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link25.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_25"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_25"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_25"/>
							<DAI name="d">
								<Val>GOOSE_Link25.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link25.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_25"/>
							<DAI name="d">
								<Val>GOOSE_Link25.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link25.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_25"/>
							<DAI name="d">
								<Val>GOOSE_Link25.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link25.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_25"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link25.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="29">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link26.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_26"/>
							<DAI name="d">
								<Val>GOOSE_Link26.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link26.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_26"/>
							<DAI name="d">
								<Val>GOOSE_Link26.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link26.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_26"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_26"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_26"/>
							<DAI name="d">
								<Val>GOOSE_Link26.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link26.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_26"/>
							<DAI name="d">
								<Val>GOOSE_Link26.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link26.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_26"/>
							<DAI name="d">
								<Val>GOOSE_Link26.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link26.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_26"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link26.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="30">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link27.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_27"/>
							<DAI name="d">
								<Val>GOOSE_Link27.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link27.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_27"/>
							<DAI name="d">
								<Val>GOOSE_Link27.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link27.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_27"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_27"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_27"/>
							<DAI name="d">
								<Val>GOOSE_Link27.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link27.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_27"/>
							<DAI name="d">
								<Val>GOOSE_Link27.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link27.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_27"/>
							<DAI name="d">
								<Val>GOOSE_Link27.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link27.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_27"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link27.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="31">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link28.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_28"/>
							<DAI name="d">
								<Val>GOOSE_Link28.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link28.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_28"/>
							<DAI name="d">
								<Val>GOOSE_Link28.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link28.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_28"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_28"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_28"/>
							<DAI name="d">
								<Val>GOOSE_Link28.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link28.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_28"/>
							<DAI name="d">
								<Val>GOOSE_Link28.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link28.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_28"/>
							<DAI name="d">
								<Val>GOOSE_Link28.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link28.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_28"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link28.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="32">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link29.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_29"/>
							<DAI name="d">
								<Val>GOOSE_Link29.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link29.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_29"/>
							<DAI name="d">
								<Val>GOOSE_Link29.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link29.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_29"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_29"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_29"/>
							<DAI name="d">
								<Val>GOOSE_Link29.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link29.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_29"/>
							<DAI name="d">
								<Val>GOOSE_Link29.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link29.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_29"/>
							<DAI name="d">
								<Val>GOOSE_Link29.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link29.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_29"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link29.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="33">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link30.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_30"/>
							<DAI name="d">
								<Val>GOOSE_Link30.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link30.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_30"/>
							<DAI name="d">
								<Val>GOOSE_Link30.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link30.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_30"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_30"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_30"/>
							<DAI name="d">
								<Val>GOOSE_Link30.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link30.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_30"/>
							<DAI name="d">
								<Val>GOOSE_Link30.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link30.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_30"/>
							<DAI name="d">
								<Val>GOOSE_Link30.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link30.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_30"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link30.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="34">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link31.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_31"/>
							<DAI name="d">
								<Val>GOOSE_Link31.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link31.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_31"/>
							<DAI name="d">
								<Val>GOOSE_Link31.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link31.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_31"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_31"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_31"/>
							<DAI name="d">
								<Val>GOOSE_Link31.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link31.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_31"/>
							<DAI name="d">
								<Val>GOOSE_Link31.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link31.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_31"/>
							<DAI name="d">
								<Val>GOOSE_Link31.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link31.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_31"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link31.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="35">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link32.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_32"/>
							<DAI name="d">
								<Val>GOOSE_Link32.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link32.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_32"/>
							<DAI name="d">
								<Val>GOOSE_Link32.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link32.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_32"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_32"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_32"/>
							<DAI name="d">
								<Val>GOOSE_Link32.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link32.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_32"/>
							<DAI name="d">
								<Val>GOOSE_Link32.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link32.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_32"/>
							<DAI name="d">
								<Val>GOOSE_Link32.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link32.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_32"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link32.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="36">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link33.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_33"/>
							<DAI name="d">
								<Val>GOOSE_Link33.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link33.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_33"/>
							<DAI name="d">
								<Val>GOOSE_Link33.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link33.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_33"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_33"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_33"/>
							<DAI name="d">
								<Val>GOOSE_Link33.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link33.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_33"/>
							<DAI name="d">
								<Val>GOOSE_Link33.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link33.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_33"/>
							<DAI name="d">
								<Val>GOOSE_Link33.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link33.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_33"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link33.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="37">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link34.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_34"/>
							<DAI name="d">
								<Val>GOOSE_Link34.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link34.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_34"/>
							<DAI name="d">
								<Val>GOOSE_Link34.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link34.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_34"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_34"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_34"/>
							<DAI name="d">
								<Val>GOOSE_Link34.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link34.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_34"/>
							<DAI name="d">
								<Val>GOOSE_Link34.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link34.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_34"/>
							<DAI name="d">
								<Val>GOOSE_Link34.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link34.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_34"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link34.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="38">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link35.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_35"/>
							<DAI name="d">
								<Val>GOOSE_Link35.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link35.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_35"/>
							<DAI name="d">
								<Val>GOOSE_Link35.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link35.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_35"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_35"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_35"/>
							<DAI name="d">
								<Val>GOOSE_Link35.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link35.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_35"/>
							<DAI name="d">
								<Val>GOOSE_Link35.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link35.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_35"/>
							<DAI name="d">
								<Val>GOOSE_Link35.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link35.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_35"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link35.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="39">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link36.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_36"/>
							<DAI name="d">
								<Val>GOOSE_Link36.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link36.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_36"/>
							<DAI name="d">
								<Val>GOOSE_Link36.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link36.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_36"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_36"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_36"/>
							<DAI name="d">
								<Val>GOOSE_Link36.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link36.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_36"/>
							<DAI name="d">
								<Val>GOOSE_Link36.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link36.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_36"/>
							<DAI name="d">
								<Val>GOOSE_Link36.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link36.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_36"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link36.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="40">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link37.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_37"/>
							<DAI name="d">
								<Val>GOOSE_Link37.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link37.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_37"/>
							<DAI name="d">
								<Val>GOOSE_Link37.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link37.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_37"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_37"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_37"/>
							<DAI name="d">
								<Val>GOOSE_Link37.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link37.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_37"/>
							<DAI name="d">
								<Val>GOOSE_Link37.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link37.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_37"/>
							<DAI name="d">
								<Val>GOOSE_Link37.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link37.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_37"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link37.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="41">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link38.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_38"/>
							<DAI name="d">
								<Val>GOOSE_Link38.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link38.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_38"/>
							<DAI name="d">
								<Val>GOOSE_Link38.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link38.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_38"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_38"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_38"/>
							<DAI name="d">
								<Val>GOOSE_Link38.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link38.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_38"/>
							<DAI name="d">
								<Val>GOOSE_Link38.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link38.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_38"/>
							<DAI name="d">
								<Val>GOOSE_Link38.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link38.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_38"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link38.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="42">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link39.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_39"/>
							<DAI name="d">
								<Val>GOOSE_Link39.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link39.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_39"/>
							<DAI name="d">
								<Val>GOOSE_Link39.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link39.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_39"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_39"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_39"/>
							<DAI name="d">
								<Val>GOOSE_Link39.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link39.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_39"/>
							<DAI name="d">
								<Val>GOOSE_Link39.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link39.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_39"/>
							<DAI name="d">
								<Val>GOOSE_Link39.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link39.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_39"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link39.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="43">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link40.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_40"/>
							<DAI name="d">
								<Val>GOOSE_Link40.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link40.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_40"/>
							<DAI name="d">
								<Val>GOOSE_Link40.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link40.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_40"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_40"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_40"/>
							<DAI name="d">
								<Val>GOOSE_Link40.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link40.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_40"/>
							<DAI name="d">
								<Val>GOOSE_Link40.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link40.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_40"/>
							<DAI name="d">
								<Val>GOOSE_Link40.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link40.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_40"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link40.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="44">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link41.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_41"/>
							<DAI name="d">
								<Val>GOOSE_Link41.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link41.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_41"/>
							<DAI name="d">
								<Val>GOOSE_Link41.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link41.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_41"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_41"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_41"/>
							<DAI name="d">
								<Val>GOOSE_Link41.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link41.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_41"/>
							<DAI name="d">
								<Val>GOOSE_Link41.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link41.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_41"/>
							<DAI name="d">
								<Val>GOOSE_Link41.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link41.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_41"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link41.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="45">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link42.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_42"/>
							<DAI name="d">
								<Val>GOOSE_Link42.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link42.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_42"/>
							<DAI name="d">
								<Val>GOOSE_Link42.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link42.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_42"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_42"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_42"/>
							<DAI name="d">
								<Val>GOOSE_Link42.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link42.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_42"/>
							<DAI name="d">
								<Val>GOOSE_Link42.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link42.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_42"/>
							<DAI name="d">
								<Val>GOOSE_Link42.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link42.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_42"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link42.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="46">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link43.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_43"/>
							<DAI name="d">
								<Val>GOOSE_Link43.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link43.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_43"/>
							<DAI name="d">
								<Val>GOOSE_Link43.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link43.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_43"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_43"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_43"/>
							<DAI name="d">
								<Val>GOOSE_Link43.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link43.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_43"/>
							<DAI name="d">
								<Val>GOOSE_Link43.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link43.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_43"/>
							<DAI name="d">
								<Val>GOOSE_Link43.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link43.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_43"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link43.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="47">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link44.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_44"/>
							<DAI name="d">
								<Val>GOOSE_Link44.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link44.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_44"/>
							<DAI name="d">
								<Val>GOOSE_Link44.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link44.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_44"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_44"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_44"/>
							<DAI name="d">
								<Val>GOOSE_Link44.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link44.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_44"/>
							<DAI name="d">
								<Val>GOOSE_Link44.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link44.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_44"/>
							<DAI name="d">
								<Val>GOOSE_Link44.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link44.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_44"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link44.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="48">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link45.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_45"/>
							<DAI name="d">
								<Val>GOOSE_Link45.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link45.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_45"/>
							<DAI name="d">
								<Val>GOOSE_Link45.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link45.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_45"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_45"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_45"/>
							<DAI name="d">
								<Val>GOOSE_Link45.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link45.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_45"/>
							<DAI name="d">
								<Val>GOOSE_Link45.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link45.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_45"/>
							<DAI name="d">
								<Val>GOOSE_Link45.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link45.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_45"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link45.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="49">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link46.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_46"/>
							<DAI name="d">
								<Val>GOOSE_Link46.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link46.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_46"/>
							<DAI name="d">
								<Val>GOOSE_Link46.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link46.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_46"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_46"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_46"/>
							<DAI name="d">
								<Val>GOOSE_Link46.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link46.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_46"/>
							<DAI name="d">
								<Val>GOOSE_Link46.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link46.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_46"/>
							<DAI name="d">
								<Val>GOOSE_Link46.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link46.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_46"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link46.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="50">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link47.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_47"/>
							<DAI name="d">
								<Val>GOOSE_Link47.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link47.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_47"/>
							<DAI name="d">
								<Val>GOOSE_Link47.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link47.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_47"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_47"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_47"/>
							<DAI name="d">
								<Val>GOOSE_Link47.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link47.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_47"/>
							<DAI name="d">
								<Val>GOOSE_Link47.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link47.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_47"/>
							<DAI name="d">
								<Val>GOOSE_Link47.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link47.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_47"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link47.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="51">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link48.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_48"/>
							<DAI name="d">
								<Val>GOOSE_Link48.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link48.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_48"/>
							<DAI name="d">
								<Val>GOOSE_Link48.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link48.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_48"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_48"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_48"/>
							<DAI name="d">
								<Val>GOOSE_Link48.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link48.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_48"/>
							<DAI name="d">
								<Val>GOOSE_Link48.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link48.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_48"/>
							<DAI name="d">
								<Val>GOOSE_Link48.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link48.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_48"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link48.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="52">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link49.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_49"/>
							<DAI name="d">
								<Val>GOOSE_Link49.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link49.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_49"/>
							<DAI name="d">
								<Val>GOOSE_Link49.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link49.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_49"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_49"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_49"/>
							<DAI name="d">
								<Val>GOOSE_Link49.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link49.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_49"/>
							<DAI name="d">
								<Val>GOOSE_Link49.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link49.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_49"/>
							<DAI name="d">
								<Val>GOOSE_Link49.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link49.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_49"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link49.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="53">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link50.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_50"/>
							<DAI name="d">
								<Val>GOOSE_Link50.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link50.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_50"/>
							<DAI name="d">
								<Val>GOOSE_Link50.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link50.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_50"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_50"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_50"/>
							<DAI name="d">
								<Val>GOOSE_Link50.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link50.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_50"/>
							<DAI name="d">
								<Val>GOOSE_Link50.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link50.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_50"/>
							<DAI name="d">
								<Val>GOOSE_Link50.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link50.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_50"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link50.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="54">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link51.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_51"/>
							<DAI name="d">
								<Val>GOOSE_Link51.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link51.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_51"/>
							<DAI name="d">
								<Val>GOOSE_Link51.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link51.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_51"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_51"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_51"/>
							<DAI name="d">
								<Val>GOOSE_Link51.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link51.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_51"/>
							<DAI name="d">
								<Val>GOOSE_Link51.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link51.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_51"/>
							<DAI name="d">
								<Val>GOOSE_Link51.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link51.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_51"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link51.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="55">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link52.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_52"/>
							<DAI name="d">
								<Val>GOOSE_Link52.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link52.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_52"/>
							<DAI name="d">
								<Val>GOOSE_Link52.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link52.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_52"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_52"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_52"/>
							<DAI name="d">
								<Val>GOOSE_Link52.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link52.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_52"/>
							<DAI name="d">
								<Val>GOOSE_Link52.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link52.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_52"/>
							<DAI name="d">
								<Val>GOOSE_Link52.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link52.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_52"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link52.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="56">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link53.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_53"/>
							<DAI name="d">
								<Val>GOOSE_Link53.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link53.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_53"/>
							<DAI name="d">
								<Val>GOOSE_Link53.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link53.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_53"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_53"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_53"/>
							<DAI name="d">
								<Val>GOOSE_Link53.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link53.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_53"/>
							<DAI name="d">
								<Val>GOOSE_Link53.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link53.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_53"/>
							<DAI name="d">
								<Val>GOOSE_Link53.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link53.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_53"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link53.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="57">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link54.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_54"/>
							<DAI name="d">
								<Val>GOOSE_Link54.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link54.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_54"/>
							<DAI name="d">
								<Val>GOOSE_Link54.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link54.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_54"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_54"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_54"/>
							<DAI name="d">
								<Val>GOOSE_Link54.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link54.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_54"/>
							<DAI name="d">
								<Val>GOOSE_Link54.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link54.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_54"/>
							<DAI name="d">
								<Val>GOOSE_Link54.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link54.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_54"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link54.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="58">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link55.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_55"/>
							<DAI name="d">
								<Val>GOOSE_Link55.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link55.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_55"/>
							<DAI name="d">
								<Val>GOOSE_Link55.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link55.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_55"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_55"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_55"/>
							<DAI name="d">
								<Val>GOOSE_Link55.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link55.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_55"/>
							<DAI name="d">
								<Val>GOOSE_Link55.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link55.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_55"/>
							<DAI name="d">
								<Val>GOOSE_Link55.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link55.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_55"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link55.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="59">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link56.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_56"/>
							<DAI name="d">
								<Val>GOOSE_Link56.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link56.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_56"/>
							<DAI name="d">
								<Val>GOOSE_Link56.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link56.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_56"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_56"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_56"/>
							<DAI name="d">
								<Val>GOOSE_Link56.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link56.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_56"/>
							<DAI name="d">
								<Val>GOOSE_Link56.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link56.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_56"/>
							<DAI name="d">
								<Val>GOOSE_Link56.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link56.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_56"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link56.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="60">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link57.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_57"/>
							<DAI name="d">
								<Val>GOOSE_Link57.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link57.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_57"/>
							<DAI name="d">
								<Val>GOOSE_Link57.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link57.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_57"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_57"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_57"/>
							<DAI name="d">
								<Val>GOOSE_Link57.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link57.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_57"/>
							<DAI name="d">
								<Val>GOOSE_Link57.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link57.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_57"/>
							<DAI name="d">
								<Val>GOOSE_Link57.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link57.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_57"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link57.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="61">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link58.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_58"/>
							<DAI name="d">
								<Val>GOOSE_Link58.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link58.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_58"/>
							<DAI name="d">
								<Val>GOOSE_Link58.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link58.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_58"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_58"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_58"/>
							<DAI name="d">
								<Val>GOOSE_Link58.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link58.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_58"/>
							<DAI name="d">
								<Val>GOOSE_Link58.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link58.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_58"/>
							<DAI name="d">
								<Val>GOOSE_Link58.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link58.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_58"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link58.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="62">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link59.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_59"/>
							<DAI name="d">
								<Val>GOOSE_Link59.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link59.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_59"/>
							<DAI name="d">
								<Val>GOOSE_Link59.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link59.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_59"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_59"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_59"/>
							<DAI name="d">
								<Val>GOOSE_Link59.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link59.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_59"/>
							<DAI name="d">
								<Val>GOOSE_Link59.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link59.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_59"/>
							<DAI name="d">
								<Val>GOOSE_Link59.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link60.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_60"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link60.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="63">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link60.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_60"/>
							<DAI name="d">
								<Val>GOOSE_Link60.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link60.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_60"/>
							<DAI name="d">
								<Val>GOOSE_Link60.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link60.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_60"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_60"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_60"/>
							<DAI name="d">
								<Val>GOOSE_Link60.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link60.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_60"/>
							<DAI name="d">
								<Val>GOOSE_Link60.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link60.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_60"/>
							<DAI name="d">
								<Val>GOOSE_Link60.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link60.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_60"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link60.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="64">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link61.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_61"/>
							<DAI name="d">
								<Val>GOOSE_Link61.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link61.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_61"/>
							<DAI name="d">
								<Val>GOOSE_Link61.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link61.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_61"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_61"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_61"/>
							<DAI name="d">
								<Val>GOOSE_Link61.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link61.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_61"/>
							<DAI name="d">
								<Val>GOOSE_Link61.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link61.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_61"/>
							<DAI name="d">
								<Val>GOOSE_Link61.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link61.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_61"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link61.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="65">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link62.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_62"/>
							<DAI name="d">
								<Val>GOOSE_Link62.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link62.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_62"/>
							<DAI name="d">
								<Val>GOOSE_Link62.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link62.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_62"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_62"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_62"/>
							<DAI name="d">
								<Val>GOOSE_Link62.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link62.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_62"/>
							<DAI name="d">
								<Val>GOOSE_Link62.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link62.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_62"/>
							<DAI name="d">
								<Val>GOOSE_Link62.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link62.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_62"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link62.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="66">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="St" desc="GOOSE_Link63.GCommLink_OK">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.st_63"/>
							<DAI name="d">
								<Val>GOOSE_Link63.GCommLink_OK</Val>
							</DAI>
						</DOI>
						<DOI name="SimSt" desc="GOOSE_Link63.SimSt_GCommLink">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.sim_63"/>
							<DAI name="d">
								<Val>GOOSE_Link63.SimSt_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LastStNum" desc="GOOSE_Link63.LastStNum_GCommLink">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.goose.last_st_num_63"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.goose.last_st_num_63"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.goose.last_st_num_63"/>
							<DAI name="d">
								<Val>GOOSE_Link63.LastStNum_GCommLink</Val>
							</DAI>
						</DOI>
						<DOI name="LinkADisc" desc="GOOSE_Link63.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_63"/>
							<DAI name="d">
								<Val>GOOSE_Link63.GAlm_ADisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinkBDisc" desc="GOOSE_Link63.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_63"/>
							<DAI name="d">
								<Val>GOOSE_Link63.GAlm_BDisc</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RecvEna" desc="GOOSE_Link63.GLink_Recv">
							<DAI name="stVal" sAddr="YX:B01.C1R2.goose.rx_ena_63"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Link63.GLink_Recv</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="LCCH" lnType="NRR_LCCH_ED2_V1.00_S_V1.00" lnClass="LCCH" inst="1">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="ChLiv" desc="LinkState_LAN1">
							<DAI name="stVal" sAddr="YX:B01.master.port_link_statusA"/>
							<DAI name="d">
								<Val>LinkState_LAN1</Val>
							</DAI>
						</DOI>
						<DOI name="RedChLiv" desc="LinkState_LAN2">
							<DAI name="stVal" sAddr="YX:B01.master.port_link_statusB"/>
							<DAI name="d">
								<Val>LinkState_LAN2</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="LCCH" lnType="NRR_LCCH_ED2_V1.00_S_V1.00" lnClass="LCCH" inst="3">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="ChLiv" desc="LinkState_LAN3">
							<DAI name="stVal" sAddr="YX:B01.master.port_link_statusC"/>
							<DAI name="d">
								<Val>LinkState_LAN3</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="LCCH" lnType="NRR_LCCH_ED2_V1.00_S_V1.00" lnClass="LCCH" inst="4">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="ChLiv" desc="LinkState_LAN4">
							<DAI name="stVal" sAddr="YX:B01.master.port_link_statusD"/>
							<DAI name="d">
								<Val>LinkState_LAN4</Val>
							</DAI>
						</DOI>
					</LN>
				</LDevice>
				<LDevice inst="MU01">
					<LN0 desc="LLN0" lnType="NRR_LLN0_ED2_V1.00_S_V1.00" lnClass="LLN0" inst="">
						<DOI name="NamPlt" desc="Name Plate">
							<DAI name="d">
								<Val>Name Plate</Val>
							</DAI>
							<DAI name="ldNs">
								<Val>IEC 61850-7-4:2007A</Val>
							</DAI>
						</DOI>
						<DOI name="Beh" desc="MU01.Beh">
							<DAI name="stVal" sAddr="YX:B01.C1R2.Beh3.out"/>
							<DAI name="d">
								<Val>MU01.Beh</Val>
							</DAI>
						</DOI>
						<DOI name="Health" desc="Health">
							<DAI name="stVal" sAddr="YX:B01.C1R2.GBLEND1.ied_health"/>
							<DAI name="d">
								<Val>Health</Val>
							</DAI>
						</DOI>
						<DOI name="Mod" desc="MU01.Mod">
							<SDI name="SBOw">
								<DAI name="ctlVal" sAddr="YT:B01.C1R2.ModeAPC3"/>
							</SDI>
							<SDI name="Oper">
								<DAI name="ctlVal" sAddr="YT:B01.C1R2.ModeAPC3"/>
							</SDI>
							<SDI name="Cancel">
								<DAI name="ctlVal" sAddr="YT:B01.C1R2.ModeAPC3"/>
							</SDI>
							<DAI name="stVal" sAddr="YX:B01.C1R2.ModeAPC3.ModeObj.mode_value"/>
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>MU01.Mod</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="LocSta" desc="Switching authority at station level">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Switching authority at station level</Val>
							</DAI>
						</DOI>
						<DOI name="Diag" desc="Run diagnostics">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Run diagnostics</Val>
							</DAI>
						</DOI>
						<DOI name="LEDRs" desc="LED reset">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>LED reset</Val>
							</DAI>
						</DOI>
						<DOI name="GrRef" desc="Reference to a higher level logical device">
							<DAI name="setSrcRef">
								<Val>@LD0</Val>
							</DAI>
							<DAI name="d">
								<Val>Reference to a higher level logical device</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna1" desc="Function 1 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 1 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna2" desc="Function 2 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 2 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna3" desc="Function 3 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 3 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna4" desc="Function 4 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 4 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna5" desc="Function 5 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 5 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna6" desc="Function 6 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 6 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna7" desc="Function 7 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 7 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna8" desc="Function 8 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 8 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna9" desc="Function 9 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 9 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna10" desc="Function 10 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 10 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CBFlt" desc="Current Breaker Fault">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Current Breaker Fault</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="DPFCStr" desc="DPFC start value">
							<DAI name="d">
								<Val>DPFC start value</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="ROCStr" desc="Residual current start value">
							<DAI name="d">
								<Val>Residual current start value</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="N0CStr" desc="Negative current start value">
							<DAI name="d">
								<Val>Negative current start value</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinNo" desc="Line No">
							<DAI name="d">
								<Val>Line No</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="DelayTRtg" desc="SV Delay time">
							<DAI name="d">
								<Val>SV Delay time</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="Z3AuxStr" desc="Z3 auxiliary start value">
							<DAI name="d">
								<Val>Z3 auxiliary start value</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CommTest" desc="Communication Test">
							<DAI name="d">
								<Val>Communication Test</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CommTstMet" desc="Communication test enabled">
							<DAI name="d">
								<Val>Communication test enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="TimeZone" desc="Time Zone">
							<DAI name="d">
								<Val>Time Zone</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="SntpAddr" desc="Sntp Address">
							<DAI name="d">
								<Val>Sntp Address</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RemTrig" desc="Remote Trigger">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Remote Trigger</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="NOCEna" desc="Negative current start enable">
							<DAI name="d">
								<Val>Negative current start enable</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN0>
					<LN desc="LPHD" lnType="NRR_LPHD_ED2_V1.00_S_V1.00" lnClass="LPHD" inst="1">
						<DOI name="PhyHealth" desc="Health">
							<DAI name="stVal" sAddr="YX:B01.C1R2.GBLEND1.ied_health"/>
							<DAI name="d">
								<Val>Health</Val>
							</DAI>
						</DOI>
						<DOI name="Sim" desc="Receive simulated GOOSE or simulated SV">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Receive simulated GOOSE or simulated SV</Val>
							</DAI>
						</DOI>
						<DOI name="SettingGrp" desc="Setting Group">
							<DAI name="d">
								<Val>Setting Group</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="DeviceName" desc="Device name">
							<DAI name="d">
								<Val>Device name</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="GooseEna" desc="GOOSE DI Enable">
							<DAI name="d">
								<Val>GOOSE DI Enable</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="OthGoEna" desc="Other GOOSE DI Enable">
							<DAI name="d">
								<Val>Other GOOSE DI Enable</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="MovPNum" desc="MOV parallel module num">
							<DAI name="d">
								<Val>MOV parallel module num</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="MovSNum" desc="MOV serial module num">
							<DAI name="d">
								<Val>MOV serial module num</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="MovV" desc="MOV module voltage">
							<DAI name="d">
								<Val>MOV module voltage</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CapXRtg" desc="X Rated Value of Capacitor">
							<DAI name="d">
								<Val>X Rated Value of Capacitor</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="PARtg" desc="Platform Rated Current">
							<DAI name="d">
								<Val>Platform Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="MovARtg" desc="MOVR Rated Current">
							<DAI name="d">
								<Val>MOVR Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CapARtg" desc="Capacitor Rated Current">
							<DAI name="d">
								<Val>Capacitor Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="InARtg" desc="In Rated Current">
							<DAI name="d">
								<Val>In Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinARtg" desc="Line Rated Current">
							<DAI name="d">
								<Val>Line Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="ActSGST" desc="Active Setting Group">
							<DAI name="d">
								<Val>Active Setting Group</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="StationNs" desc="Station name">
							<DAI name="d">
								<Val>Station name</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LocStaAddr" desc="Local station address of communication">
							<DAI name="d">
								<Val>Local station address of communication</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="DstStaAddr" desc="Destination station address of communication">
							<DAI name="d">
								<Val>Destination station address of communication</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="FaultSignal2" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="4">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="Alm7" desc="GAlm_CfgFile">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.strap_cfg_err"/>
							<DAI name="d">
								<Val>GAlm_CfgFile</Val>
							</DAI>
						</DOI>
						<DOI name="Alm8" desc="GOOSE_Link00.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_0"/>
							<DAI name="d">
								<Val>GOOSE_Link00.GAlm_ADisc</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="FaultSignal3" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="5">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="Alm1" desc="GOOSE_Link00.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_0"/>
							<DAI name="d">
								<Val>GOOSE_Link00.GAlm_BDisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm2" desc="GOOSE_Link00.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_0"/>
							<DAI name="d">
								<Val>GOOSE_Link00.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
						<DOI name="Alm3" desc="GOOSE_Link01.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_1"/>
							<DAI name="d">
								<Val>GOOSE_Link01.GAlm_ADisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm4" desc="GOOSE_Link01.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_1"/>
							<DAI name="d">
								<Val>GOOSE_Link01.GAlm_BDisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm5" desc="GOOSE_Link01.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_1"/>
							<DAI name="d">
								<Val>GOOSE_Link01.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
						<DOI name="Alm6" desc="GOOSE_Link02.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_2"/>
							<DAI name="d">
								<Val>GOOSE_Link02.GAlm_ADisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm7" desc="GOOSE_Link02.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_2"/>
							<DAI name="d">
								<Val>GOOSE_Link02.GAlm_BDisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm8" desc="GOOSE_Link02.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_2"/>
							<DAI name="d">
								<Val>GOOSE_Link02.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="FaultSignal4" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="6">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="Alm1" desc="GOOSE_Link03.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_3"/>
							<DAI name="d">
								<Val>GOOSE_Link03.GAlm_ADisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm2" desc="GOOSE_Link03.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_3"/>
							<DAI name="d">
								<Val>GOOSE_Link03.GAlm_BDisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm3" desc="GOOSE_Link03.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_3"/>
							<DAI name="d">
								<Val>GOOSE_Link03.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
						<DOI name="Alm4" desc="GOOSE_Link04.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_4"/>
							<DAI name="d">
								<Val>GOOSE_Link04.GAlm_ADisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm5" desc="GOOSE_Link04.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_4"/>
							<DAI name="d">
								<Val>GOOSE_Link04.GAlm_BDisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm6" desc="GOOSE_Link04.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_4"/>
							<DAI name="d">
								<Val>GOOSE_Link04.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
						<DOI name="Alm7" desc="GOOSE_Link05.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_5"/>
							<DAI name="d">
								<Val>GOOSE_Link05.GAlm_ADisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm8" desc="GOOSE_Link05.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_5"/>
							<DAI name="d">
								<Val>GOOSE_Link05.GAlm_BDisc</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="FaultSignal5" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="7">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="Alm1" desc="GOOSE_Link05.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_5"/>
							<DAI name="d">
								<Val>GOOSE_Link05.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
						<DOI name="Alm2" desc="GOOSE_Link06.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_6"/>
							<DAI name="d">
								<Val>GOOSE_Link06.GAlm_ADisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm3" desc="GOOSE_Link06.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_6"/>
							<DAI name="d">
								<Val>GOOSE_Link06.GAlm_BDisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm4" desc="GOOSE_Link06.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_6"/>
							<DAI name="d">
								<Val>GOOSE_Link06.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
						<DOI name="Alm5" desc="GOOSE_Link07.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_7"/>
							<DAI name="d">
								<Val>GOOSE_Link07.GAlm_ADisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm6" desc="GOOSE_Link07.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_7"/>
							<DAI name="d">
								<Val>GOOSE_Link07.GAlm_BDisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm7" desc="GOOSE_Link07.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_7"/>
							<DAI name="d">
								<Val>GOOSE_Link07.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
						<DOI name="Alm8" desc="GOOSE_Link08.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_8"/>
							<DAI name="d">
								<Val>GOOSE_Link08.GAlm_ADisc</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="FaultSignal6" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="8">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="Alm1" desc="GOOSE_Link08.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_8"/>
							<DAI name="d">
								<Val>GOOSE_Link08.GAlm_BDisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm2" desc="GOOSE_Link08.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_8"/>
							<DAI name="d">
								<Val>GOOSE_Link08.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
						<DOI name="Alm3" desc="GOOSE_Link09.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_9"/>
							<DAI name="d">
								<Val>GOOSE_Link09.GAlm_ADisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm4" desc="GOOSE_Link09.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_9"/>
							<DAI name="d">
								<Val>GOOSE_Link09.GAlm_BDisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm5" desc="GOOSE_Link09.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_9"/>
							<DAI name="d">
								<Val>GOOSE_Link09.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
						<DOI name="Alm6" desc="GOOSE_Link10.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_10"/>
							<DAI name="d">
								<Val>GOOSE_Link10.GAlm_ADisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm7" desc="GOOSE_Link10.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_10"/>
							<DAI name="d">
								<Val>GOOSE_Link10.GAlm_BDisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm8" desc="GOOSE_Link10.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_10"/>
							<DAI name="d">
								<Val>GOOSE_Link10.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="FaultSignal7" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="9">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="Alm1" desc="GOOSE_Link11.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_11"/>
							<DAI name="d">
								<Val>GOOSE_Link11.GAlm_ADisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm2" desc="GOOSE_Link11.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_11"/>
							<DAI name="d">
								<Val>GOOSE_Link11.GAlm_BDisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm3" desc="GOOSE_Link11.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_11"/>
							<DAI name="d">
								<Val>GOOSE_Link11.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
						<DOI name="Alm4" desc="GOOSE_Link12.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_12"/>
							<DAI name="d">
								<Val>GOOSE_Link12.GAlm_ADisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm5" desc="GOOSE_Link12.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_12"/>
							<DAI name="d">
								<Val>GOOSE_Link12.GAlm_BDisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm6" desc="GOOSE_Link12.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_12"/>
							<DAI name="d">
								<Val>GOOSE_Link12.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
						<DOI name="Alm7" desc="GOOSE_Link13.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_13"/>
							<DAI name="d">
								<Val>GOOSE_Link13.GAlm_ADisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm8" desc="GOOSE_Link13.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_13"/>
							<DAI name="d">
								<Val>GOOSE_Link13.GAlm_BDisc</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="FaultSignal8" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="10">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="Alm1" desc="GOOSE_Link13.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_13"/>
							<DAI name="d">
								<Val>GOOSE_Link13.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
						<DOI name="Alm2" desc="GOOSE_Link14.GAlm_ADisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_a_14"/>
							<DAI name="d">
								<Val>GOOSE_Link14.GAlm_ADisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm3" desc="GOOSE_Link14.GAlm_BDisc">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.link_down_b_14"/>
							<DAI name="d">
								<Val>GOOSE_Link14.GAlm_BDisc</Val>
							</DAI>
						</DOI>
						<DOI name="Alm4" desc="GOOSE_Link14.GAlm_CfgUnmatched">
							<DAI name="stVal" sAddr="ZZZJ:B01.C1R2.goose.goose_cfg_err_14"/>
							<DAI name="d">
								<Val>GOOSE_Link14.GAlm_CfgUnmatched</Val>
							</DAI>
						</DOI>
					</LN>
				</LDevice>
				<LDevice inst="RCD">
					<LN0 desc="LLN0" lnType="NRR_LLN0_ED2_V1.00_S_V1.00" lnClass="LLN0" inst="">
						<DataSet name="dsRelayRec" desc="RelayRec">
							<FCDA ldInst="RCD" lnClass="RDRE" lnInst="1" doName="RcdMade" fc="ST"/>
							<FCDA ldInst="RCD" lnClass="RDRE" lnInst="1" doName="FltNum" fc="ST"/>
						</DataSet>
						<ReportControl name="brcbRelayRec" datSet="dsRelayRec" intgPd="0" rptID="RCD/LLN0$BR$brcbRelayRec" confRev="1" buffered="true" bufTime="0" indexed="true">
							<TrgOps dchg="true" qchg="false" dupd="false" period="true" gi="true"/>
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="true" entryID="true" configRef="true" bufOvfl="false"/>
							<RptEnabled max="16"/>
						</ReportControl>
						<DOI name="NamPlt" desc="Name Plate">
							<DAI name="d">
								<Val>Name Plate</Val>
							</DAI>
							<DAI name="ldNs">
								<Val>IEC 61850-7-4:2007A</Val>
							</DAI>
						</DOI>
						<DOI name="Beh" desc="RCD.Beh">
							<DAI name="stVal" sAddr="YX:B01.C1R2.Beh2.out"/>
							<DAI name="d">
								<Val>RCD.Beh</Val>
							</DAI>
						</DOI>
						<DOI name="Health" desc="Health">
							<DAI name="stVal" sAddr="YX:B01.C1R2.GBLEND1.ied_health"/>
							<DAI name="d">
								<Val>Health</Val>
							</DAI>
						</DOI>
						<DOI name="Mod" desc="RCD.Mod">
							<SDI name="SBOw">
								<DAI name="ctlVal" sAddr="YT:B01.C1R2.ModeAPC2"/>
							</SDI>
							<SDI name="Oper">
								<DAI name="ctlVal" sAddr="YT:B01.C1R2.ModeAPC2"/>
							</SDI>
							<SDI name="Cancel">
								<DAI name="ctlVal" sAddr="YT:B01.C1R2.ModeAPC2"/>
							</SDI>
							<DAI name="stVal" sAddr="YX:B01.C1R2.ModeAPC2.ModeObj.mode_value"/>
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>RCD.Mod</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="LocSta" desc="Switching authority at station level">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Switching authority at station level</Val>
							</DAI>
						</DOI>
						<DOI name="Diag" desc="Run diagnostics">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Run diagnostics</Val>
							</DAI>
						</DOI>
						<DOI name="LEDRs" desc="LED reset">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>LED reset</Val>
							</DAI>
						</DOI>
						<DOI name="GrRef" desc="Reference to a higher level logical device">
							<DAI name="setSrcRef">
								<Val>@LD0</Val>
							</DAI>
							<DAI name="d">
								<Val>Reference to a higher level logical device</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna1" desc="Function 1 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 1 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna2" desc="Function 2 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 2 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna3" desc="Function 3 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 3 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna4" desc="Function 4 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 4 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna5" desc="Function 5 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 5 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna6" desc="Function 6 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 6 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna7" desc="Function 7 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 7 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna8" desc="Function 8 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 8 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna9" desc="Function 9 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 9 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna10" desc="Function 10 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 10 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CBFlt" desc="Current Breaker Fault">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Current Breaker Fault</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="DPFCStr" desc="DPFC start value">
							<DAI name="d">
								<Val>DPFC start value</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="ROCStr" desc="Residual current start value">
							<DAI name="d">
								<Val>Residual current start value</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="N0CStr" desc="Negative current start value">
							<DAI name="d">
								<Val>Negative current start value</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinNo" desc="Line No">
							<DAI name="d">
								<Val>Line No</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="DelayTRtg" desc="SV Delay time">
							<DAI name="d">
								<Val>SV Delay time</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="Z3AuxStr" desc="Z3 auxiliary start value">
							<DAI name="d">
								<Val>Z3 auxiliary start value</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CommTest" desc="Communication Test">
							<DAI name="d">
								<Val>Communication Test</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CommTstMet" desc="Communication test enabled">
							<DAI name="d">
								<Val>Communication test enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="TimeZone" desc="Time Zone">
							<DAI name="d">
								<Val>Time Zone</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="SntpAddr" desc="Sntp Address">
							<DAI name="d">
								<Val>Sntp Address</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RemTrig" desc="Remote Trigger">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Remote Trigger</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="NOCEna" desc="Negative current start enable">
							<DAI name="d">
								<Val>Negative current start enable</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN0>
					<LN desc="LPHD" lnType="NRR_LPHD_ED2_V1.00_S_V1.00" lnClass="LPHD" inst="1">
						<DOI name="PhyHealth" desc="Health">
							<DAI name="stVal" sAddr="YX:B01.C1R2.GBLEND1.ied_health"/>
							<DAI name="d">
								<Val>Health</Val>
							</DAI>
						</DOI>
						<DOI name="Sim" desc="Receive simulated GOOSE or simulated SV">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Receive simulated GOOSE or simulated SV</Val>
							</DAI>
						</DOI>
						<DOI name="SettingGrp" desc="Setting Group">
							<DAI name="d">
								<Val>Setting Group</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="DeviceName" desc="Device name">
							<DAI name="d">
								<Val>Device name</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="GooseEna" desc="GOOSE DI Enable">
							<DAI name="d">
								<Val>GOOSE DI Enable</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="OthGoEna" desc="Other GOOSE DI Enable">
							<DAI name="d">
								<Val>Other GOOSE DI Enable</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="MovPNum" desc="MOV parallel module num">
							<DAI name="d">
								<Val>MOV parallel module num</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="MovSNum" desc="MOV serial module num">
							<DAI name="d">
								<Val>MOV serial module num</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="MovV" desc="MOV module voltage">
							<DAI name="d">
								<Val>MOV module voltage</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CapXRtg" desc="X Rated Value of Capacitor">
							<DAI name="d">
								<Val>X Rated Value of Capacitor</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="PARtg" desc="Platform Rated Current">
							<DAI name="d">
								<Val>Platform Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="MovARtg" desc="MOVR Rated Current">
							<DAI name="d">
								<Val>MOVR Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CapARtg" desc="Capacitor Rated Current">
							<DAI name="d">
								<Val>Capacitor Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="InARtg" desc="In Rated Current">
							<DAI name="d">
								<Val>In Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinARtg" desc="Line Rated Current">
							<DAI name="d">
								<Val>Line Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="ActSGST" desc="Active Setting Group">
							<DAI name="d">
								<Val>Active Setting Group</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="StationNs" desc="Station name">
							<DAI name="d">
								<Val>Station name</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LocStaAddr" desc="Local station address of communication">
							<DAI name="d">
								<Val>Local station address of communication</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="DstStaAddr" desc="Destination station address of communication">
							<DAI name="d">
								<Val>Destination station address of communication</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="Record" lnType="NRR_RDRE_ED2_V1.00_S_V1.00" lnClass="RDRE" inst="1">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="RcdMade" desc="FinishedRecord">
							<DAI name="d">
								<Val>FinishedRecord</Val>
							</DAI>
						</DOI>
						<DOI name="FltNum" desc="FaultNo">
							<DAI name="d">
								<Val>FaultNo</Val>
							</DAI>
						</DOI>
						<DOI name="RcdTrg" desc="Trigger recorder">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Trigger recorder</Val>
							</DAI>
						</DOI>
						<DOI name="MemRs" desc="MemRs">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>MemRs</Val>
							</DAI>
						</DOI>
						<DOI name="MemClr" desc="Clear memory (erase all content of the memory)">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Clear memory (erase all content of the memory)</Val>
							</DAI>
						</DOI>
						<DOI name="OpCntRs" desc="Resettable operation counter">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Resettable operation counter</Val>
							</DAI>
						</DOI>
						<DOI name="NofUpdate" desc="Nof updating">
							<DAI name="d">
								<Val>Nof updating</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="MaxFltValA" desc="Max fault current">
							<DAI name="d">
								<Val>Max fault current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FltI0ValA" desc="Max fault zero current">
							<DAI name="d">
								<Val>Max fault zero current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="SelctEnd" desc="Select_End">
							<DAI name="d">
								<Val>Select_End</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FltBay" desc="Fault_Bay">
							<DAI name="d">
								<Val>Fault_Bay</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FltPhase" desc="Fault_Phase">
							<DAI name="d">
								<Val>Fault_Phase</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FltDist" desc="Fault_Distance">
							<DAI name="d">
								<Val>Fault_Distance</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="TripPhase" desc="Trip_Phase">
							<DAI name="d">
								<Val>Trip_Phase</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="TripTime" desc="Trip_Time">
							<DAI name="d">
								<Val>Trip_Time</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="OpenTime" desc="Open_Time">
							<DAI name="d">
								<Val>Open_Time</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FaultI" desc="Fault_I">
							<DAI name="d">
								<Val>Fault_I</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FaultV" desc="Fault_V">
							<DAI name="d">
								<Val>Fault_V</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RclsTime" desc="RecloseTime">
							<DAI name="d">
								<Val>RecloseTime</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="ReFltPhase" desc="ReFault_Phase">
							<DAI name="d">
								<Val>ReFault_Phase</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="ReFltDist" desc="ReFault_Distance">
							<DAI name="d">
								<Val>ReFault_Distance</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="ReTrPhase" desc="ReTrip_Phase">
							<DAI name="d">
								<Val>ReTrip_Phase</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="ReTrTime" desc="ReTrip_Time">
							<DAI name="d">
								<Val>ReTrip_Time</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="ReOpenTime" desc="ReOpen_Time">
							<DAI name="d">
								<Val>ReOpen_Time</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="ReFaultI" desc="ReFault_I">
							<DAI name="d">
								<Val>ReFault_I</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="ReFaultV" desc="ReFault_V">
							<DAI name="d">
								<Val>ReFault_V</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
				</LDevice>
				<LDevice inst="MUGO">
					<LN0 desc="LLN0" lnType="NRR_LLN0_ED2_V1.00_S_V1.00" lnClass="LLN0" inst="">
						<DataSet name="Ind" desc="Indication or Alarms">
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="2" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="2" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="3" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="3" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="4" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="4" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind7" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind7" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind8" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind8" daName="q" fc="ST"/>
						</DataSet>
						<DataSet name="Ctl" desc="Trip, Open or Close Commands">
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind1" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind1" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind2" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind2" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind3" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind3" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind4" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind4" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind5" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind5" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind6" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind6" daName="q" fc="ST"/>
						</DataSet>
						<DataSet name="Test" desc="Information Associated with Protection Testing">
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="2" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="2" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="3" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="3" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="4" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="XCBR" lnInst="4" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind7" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind7" daName="q" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind8" daName="stVal" fc="ST"/>
							<FCDA ldInst="MUGO" prefix="GOOUT" lnClass="GGIO" lnInst="1" doName="Ind8" daName="q" fc="ST"/>
						</DataSet>
						<DOI name="NamPlt" desc="Name Plate">
							<DAI name="d">
								<Val>Name Plate</Val>
							</DAI>
							<DAI name="ldNs">
								<Val>IEC 61850-7-4:2007A</Val>
							</DAI>
						</DOI>
						<DOI name="Beh" desc="MUGO.Beh">
							<DAI name="stVal" sAddr="YX:B01.C1R2.Beh5.out"/>
							<DAI name="d">
								<Val>MUGO.Beh</Val>
							</DAI>
						</DOI>
						<DOI name="Health" desc="Health">
							<DAI name="stVal" sAddr="YX:B01.C1R2.GBLEND1.ied_health"/>
							<DAI name="d">
								<Val>Health</Val>
							</DAI>
						</DOI>
						<DOI name="Mod" desc="MUGO.Mod">
							<SDI name="SBOw">
								<DAI name="ctlVal" sAddr="YT:B01.C1R2.ModeAPC5"/>
							</SDI>
							<SDI name="Oper">
								<DAI name="ctlVal" sAddr="YT:B01.C1R2.ModeAPC5"/>
							</SDI>
							<SDI name="Cancel">
								<DAI name="ctlVal" sAddr="YT:B01.C1R2.ModeAPC5"/>
							</SDI>
							<DAI name="stVal" sAddr="YX:B01.C1R2.ModeAPC5.ModeObj.mode_value"/>
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>MUGO.Mod</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="LocSta" desc="Switching authority at station level">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Switching authority at station level</Val>
							</DAI>
						</DOI>
						<DOI name="Diag" desc="Run diagnostics">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Run diagnostics</Val>
							</DAI>
						</DOI>
						<DOI name="LEDRs" desc="LED reset">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>LED reset</Val>
							</DAI>
						</DOI>
						<DOI name="GrRef" desc="Reference to a higher level logical device">
							<DAI name="setSrcRef">
								<Val>@LD0</Val>
							</DAI>
							<DAI name="d">
								<Val>Reference to a higher level logical device</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna1" desc="Function 1 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 1 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna2" desc="Function 2 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 2 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna3" desc="Function 3 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 3 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna4" desc="Function 4 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 4 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna5" desc="Function 5 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 5 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna6" desc="Function 6 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 6 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna7" desc="Function 7 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 7 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna8" desc="Function 8 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 8 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna9" desc="Function 9 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 9 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="FuncEna10" desc="Function 10 enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Function 10 enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CBFlt" desc="Current Breaker Fault">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Current Breaker Fault</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="DPFCStr" desc="DPFC start value">
							<DAI name="d">
								<Val>DPFC start value</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="ROCStr" desc="Residual current start value">
							<DAI name="d">
								<Val>Residual current start value</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="N0CStr" desc="Negative current start value">
							<DAI name="d">
								<Val>Negative current start value</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinNo" desc="Line No">
							<DAI name="d">
								<Val>Line No</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="DelayTRtg" desc="SV Delay time">
							<DAI name="d">
								<Val>SV Delay time</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="Z3AuxStr" desc="Z3 auxiliary start value">
							<DAI name="d">
								<Val>Z3 auxiliary start value</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CommTest" desc="Communication Test">
							<DAI name="d">
								<Val>Communication Test</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CommTstMet" desc="Communication test enabled">
							<DAI name="d">
								<Val>Communication test enabled</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="TimeZone" desc="Time Zone">
							<DAI name="d">
								<Val>Time Zone</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="SntpAddr" desc="Sntp Address">
							<DAI name="d">
								<Val>Sntp Address</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="RemTrig" desc="Remote Trigger">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Remote Trigger</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="NOCEna" desc="Negative current start enable">
							<DAI name="d">
								<Val>Negative current start enable</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<Inputs>
							<ExtRef intAddr="MUGO/GOINGGIO1.SPCSO1.stVal" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO1.SPCSO1.q" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO1.SPCSO2.stVal" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO1.SPCSO2.q" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO1.SPCSO3.stVal" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO1.SPCSO3.q" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO1.SPCSO4.stVal" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO1.SPCSO4.q" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO1.SPCSO5.stVal" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO1.SPCSO5.q" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO1.SPCSO6.stVal" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO1.SPCSO6.q" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO1.SPCSO7.stVal" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO1.SPCSO7.q" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO2.SPCSO1.stVal" serviceType="GOOSE"/>
							<ExtRef intAddr="MUGO/GOINGGIO2.SPCSO1.q" serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
							<ExtRef serviceType="GOOSE"/>
						</Inputs>
						<GSEControl name="Ind" datSet="Ind" confRev="1" type="GOOSE" appID="Ind">
							<Private type="NR_Port">1-A</Private>
						</GSEControl>
						<GSEControl name="Ctl" datSet="Ctl" confRev="1" type="GOOSE" appID="Ctl">
							<Private type="NR_Port">1-A</Private>
						</GSEControl>
						<GSEControl name="Test" datSet="Test" confRev="1" type="GOOSE" appID="Test">
							<Private type="NR_Port">1-A</Private>
						</GSEControl>
					</LN0>
					<LN desc="LPHD" lnType="NRR_LPHD_ED2_V1.00_S_V1.00" lnClass="LPHD" inst="1">
						<DOI name="PhyHealth" desc="Health">
							<DAI name="stVal" sAddr="YX:B01.C1R2.GBLEND1.ied_health"/>
							<DAI name="d">
								<Val>Health</Val>
							</DAI>
						</DOI>
						<DOI name="Sim" desc="Simulation_GLink_Recv">
							<SDI name="SBOw">
								<DAI name="ctlVal" sAddr="RYB:B01.C1R2.GBLSTART1.goose_rx_simulation"/>
							</SDI>
							<SDI name="Oper">
								<DAI name="ctlVal" sAddr="RYB:B01.C1R2.GBLSTART1.goose_rx_simulation"/>
							</SDI>
							<SDI name="Cancel">
								<DAI name="ctlVal" sAddr="RYB:B01.C1R2.GBLSTART1.goose_rx_simulation"/>
							</SDI>
							<DAI name="stVal" sAddr="YX:B01.C1R2.GBLSTART1.goose_rx_simulation"/>
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Simulation_GLink_Recv</Val>
							</DAI>
						</DOI>
						<DOI name="SettingGrp" desc="Setting Group">
							<DAI name="d">
								<Val>Setting Group</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="DeviceName" desc="Device name">
							<DAI name="d">
								<Val>Device name</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="GooseEna" desc="GOOSE DI Enable">
							<DAI name="d">
								<Val>GOOSE DI Enable</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="OthGoEna" desc="Other GOOSE DI Enable">
							<DAI name="d">
								<Val>Other GOOSE DI Enable</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="MovPNum" desc="MOV parallel module num">
							<DAI name="d">
								<Val>MOV parallel module num</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="MovSNum" desc="MOV serial module num">
							<DAI name="d">
								<Val>MOV serial module num</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="MovV" desc="MOV module voltage">
							<DAI name="d">
								<Val>MOV module voltage</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CapXRtg" desc="X Rated Value of Capacitor">
							<DAI name="d">
								<Val>X Rated Value of Capacitor</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="PARtg" desc="Platform Rated Current">
							<DAI name="d">
								<Val>Platform Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="MovARtg" desc="MOVR Rated Current">
							<DAI name="d">
								<Val>MOVR Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="CapARtg" desc="Capacitor Rated Current">
							<DAI name="d">
								<Val>Capacitor Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="InARtg" desc="In Rated Current">
							<DAI name="d">
								<Val>In Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LinARtg" desc="Line Rated Current">
							<DAI name="d">
								<Val>Line Rated Current</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="ActSGST" desc="Active Setting Group">
							<DAI name="d">
								<Val>Active Setting Group</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="StationNs" desc="Station name">
							<DAI name="d">
								<Val>Station name</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="LocStaAddr" desc="Local station address of communication">
							<DAI name="d">
								<Val>Local station address of communication</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
						<DOI name="DstStaAddr" desc="Destination station address of communication">
							<DAI name="d">
								<Val>Destination station address of communication</Val>
							</DAI>
							<DAI name="dataNs">
								<Val>NRECExtension:2010A</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="GOOSE_CB/DCB_Open_Command" lnType="NRR_GGIO_SPC_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="1" prefix="GOIN">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO1" desc="GOOSE_CB/DCB_Open_Command">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in1"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in1"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_CB/DCB_Open_Command</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO2" desc="GOOSE_CB/DCB_Close_Command">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in2"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in2"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_CB/DCB_Close_Command</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO3" desc="GOOSE_Bay_Trip_1_3Ph">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in3"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in3"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Bay_Trip_1_3Ph</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO4" desc="GOOSE_Bay_Trip_1_PhA">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in4"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in4"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Bay_Trip_1_PhA</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO5" desc="GOOSE_Bay_Trip_1_PhB">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in5"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in5"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Bay_Trip_1_PhB</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO6" desc="GOOSE_Bay_Trip_1_PhC">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in6"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in6"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Bay_Trip_1_PhC</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO7" desc="GOOSE_Bay_Trip_2_3Ph">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in7"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in7"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Bay_Trip_2_3Ph</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO8" desc="GS_SPARE_08">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in8"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_1.in8"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GS_SPARE_08</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="GOOSE_Bus_Trip_3Ph" lnType="NRR_GGIO_SPC_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="2" prefix="GOIN">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO1" desc="GOOSE_Bus_Trip_3Ph">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in1"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in1"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GOOSE_Bus_Trip_3Ph</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO2" desc="GS_SPARE_10">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in2"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in2"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GS_SPARE_10</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO3" desc="GS_SPARE_11">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in3"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in3"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GS_SPARE_11</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO4" desc="GS_SPARE_12">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in4"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in4"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GS_SPARE_12</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO5" desc="GS_SPARE_13">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in5"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in5"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GS_SPARE_13</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO6" desc="GS_SPARE_14">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in6"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in6"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GS_SPARE_14</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO7" desc="GS_SPARE_15">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in7"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in7"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GS_SPARE_15</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO8" desc="GS_SPARE_16">
							<DAI name="stVal" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in8"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_RECV_BOOL_2.in8"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>GS_SPARE_16</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="Buch(Main)" lnType="NRR_GGIO_IND_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="1" prefix="GOOUT">
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="Ind1" desc="Buch(Main)">
							<Private type="FCD">B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out1</Private>
							<DAI name="stVal" sAddr="YX:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out1"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out1"/>
							<DAI name="t" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out1"/>
							<DAI name="d">
								<Val>Buch(Main)</Val>
							</DAI>
						</DOI>
						<DOI name="Ind2" desc="Buch(TCh)">
							<Private type="FCD">B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out2</Private>
							<DAI name="stVal" sAddr="YX:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out2"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out2"/>
							<DAI name="t" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out2"/>
							<DAI name="d">
								<Val>Buch(TCh)</Val>
							</DAI>
						</DOI>
						<DOI name="Ind3" desc="PrRel(Main)">
							<Private type="FCD">B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out3</Private>
							<DAI name="stVal" sAddr="YX:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out3"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out3"/>
							<DAI name="t" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out3"/>
							<DAI name="d">
								<Val>PrRel(Main)</Val>
							</DAI>
						</DOI>
						<DOI name="Ind4" desc="PrRel(TCh)">
							<Private type="FCD">B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out4</Private>
							<DAI name="stVal" sAddr="YX:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out4"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out4"/>
							<DAI name="t" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out4"/>
							<DAI name="d">
								<Val>PrRel(TCh)</Val>
							</DAI>
						</DOI>
						<DOI name="Ind5" desc="PrRel(ET/LS)">
							<Private type="FCD">B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out5</Private>
							<DAI name="stVal" sAddr="YX:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out5"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out5"/>
							<DAI name="t" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out5"/>
							<DAI name="d">
								<Val>PrRel(ET/LS)</Val>
							</DAI>
						</DOI>
						<DOI name="Ind6" desc="Temp(ET)">
							<Private type="FCD">B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out6</Private>
							<DAI name="stVal" sAddr="YX:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out6"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out6"/>
							<DAI name="t" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out6"/>
							<DAI name="d">
								<Val>Temp(ET)</Val>
							</DAI>
						</DOI>
						<DOI name="Ind7" desc="DCB Blocked">
							<Private type="FCD">B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out7</Private>
							<DAI name="stVal" sAddr="YX:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out7"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out7"/>
							<DAI name="t" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out7"/>
							<DAI name="d">
								<Val>DCB Blocked</Val>
							</DAI>
						</DOI>
						<DOI name="Ind8" desc="DCB Unblocked">
							<Private type="FCD">B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out8</Private>
							<DAI name="stVal" sAddr="YX:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out8"/>
							<DAI name="q" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out8"/>
							<DAI name="t" sAddr="Bool:B01.C1R2.GS_TO_VQT_UINT8_1.fcd_out8"/>
							<DAI name="d">
								<Val>DCB Unblocked</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="CB/DCB_PhA" lnType="NRR_XCBR_ED2_V1.00_S_V1.00" lnClass="XCBR" inst="1" prefix="GOOUT">
						<DOI name="Beh" desc="CB/DCB_PhA.Beh">
							<DAI name="stVal" sAddr="MNL:B01.C1R2.XCBR_1.Beh"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_1.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhA.Beh</Val>
							</DAI>
						</DOI>
						<DOI name="Blk" desc="CB/DCB_PhA.Blk">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_1.Blk"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_1.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhA.Blk</Val>
							</DAI>
						</DOI>
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="EEHealth" desc="CB/DCB_PhA.EEHealth">
							<DAI name="stVal" sAddr="MNL:B01.C1R2.XCBR_1.EEHealth"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_1.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhA.EEHealth</Val>
							</DAI>
						</DOI>
						<DOI name="Loc" desc="CB/DCB_PhA.Loc">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_1.Loc"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_1.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhA.Loc</Val>
							</DAI>
						</DOI>
						<DOI name="OpCnt" desc="CB/DCB_PhA.N_Trp">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.XCBR_1.N_Trp"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.XCBR_1.N_Trp"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.XCBR_1.N_Trp"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_1.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhA.N_Trp</Val>
							</DAI>
						</DOI>
						<DOI name="LocSta" desc="Switching authority at station level">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Switching authority at station level</Val>
							</DAI>
						</DOI>
						<DOI name="Pos" desc="CB/DCB_PhA.DPOS">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_1.DPOS"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_1.Quality"/>
							<DAI name="t" sAddr="Utctime:B01.C1R2.XCBR_1.DPOS"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CB/DCB_PhA.DPOS</Val>
							</DAI>
						</DOI>
						<DOI name="BlkOpn" desc="CB/DCB_PhA.BlkOpn">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_1.BlkOpn"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_1.Quality"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CB/DCB_PhA.BlkOpn</Val>
							</DAI>
						</DOI>
						<DOI name="BlkCls" desc="CB/DCB_PhA.BlkCls">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_1.BlkCls"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_1.Quality"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CB/DCB_PhA.BlkCls</Val>
							</DAI>
						</DOI>
						<DOI name="ChaMotEna" desc="Charger motor enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Charger motor enabled</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="CB/DCB_PhB" lnType="NRR_XCBR_ED2_V1.00_S_V1.00" lnClass="XCBR" inst="2" prefix="GOOUT">
						<DOI name="Beh" desc="CB/DCB_PhB.Beh">
							<DAI name="stVal" sAddr="MNL:B01.C1R2.XCBR_2.Beh"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_2.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhB.Beh</Val>
							</DAI>
						</DOI>
						<DOI name="Blk" desc="CB/DCB_PhB.Blk">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_2.Blk"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_2.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhB.Blk</Val>
							</DAI>
						</DOI>
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="EEHealth" desc="CB/DCB_PhB.EEHealth">
							<DAI name="stVal" sAddr="MNL:B01.C1R2.XCBR_2.EEHealth"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_2.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhB.EEHealth</Val>
							</DAI>
						</DOI>
						<DOI name="Loc" desc="CB/DCB_PhB.Loc">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_2.Loc"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_2.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhB.Loc</Val>
							</DAI>
						</DOI>
						<DOI name="OpCnt" desc="CB/DCB_PhB.N_Trp">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.XCBR_2.N_Trp"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.XCBR_2.N_Trp"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.XCBR_2.N_Trp"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_2.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhB.N_Trp</Val>
							</DAI>
						</DOI>
						<DOI name="LocSta" desc="Switching authority at station level">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Switching authority at station level</Val>
							</DAI>
						</DOI>
						<DOI name="Pos" desc="CB/DCB_PhB.DPOS">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_2.DPOS"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_2.Quality"/>
							<DAI name="t" sAddr="Utctime:B01.C1R2.XCBR_2.DPOS"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CB/DCB_PhB.DPOS</Val>
							</DAI>
						</DOI>
						<DOI name="BlkOpn" desc="CB/DCB_PhB.BlkOpn">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_2.BlkOpn"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_2.Quality"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CB/DCB_PhB.BlkOpn</Val>
							</DAI>
						</DOI>
						<DOI name="BlkCls" desc="CB/DCB_PhB.BlkCls">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_2.BlkCls"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_2.Quality"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CB/DCB_PhB.BlkCls</Val>
							</DAI>
						</DOI>
						<DOI name="ChaMotEna" desc="Charger motor enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Charger motor enabled</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="CB/DCB_PhC" lnType="NRR_XCBR_ED2_V1.00_S_V1.00" lnClass="XCBR" inst="3" prefix="GOOUT">
						<DOI name="Beh" desc="CB/DCB_PhC.Beh">
							<DAI name="stVal" sAddr="MNL:B01.C1R2.XCBR_3.Beh"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_3.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhC.Beh</Val>
							</DAI>
						</DOI>
						<DOI name="Blk" desc="CB/DCB_PhC.Blk">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_3.Blk"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_3.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhC.Blk</Val>
							</DAI>
						</DOI>
						<DOI name="Mod" desc="Mode">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Mode</Val>
							</DAI>
						</DOI>
						<DOI name="CmdBlk" desc="CmdBlk">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CmdBlk</Val>
							</DAI>
						</DOI>
						<DOI name="EEHealth" desc="CB/DCB_PhC.EEHealth">
							<DAI name="stVal" sAddr="MNL:B01.C1R2.XCBR_3.EEHealth"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_3.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhC.EEHealth</Val>
							</DAI>
						</DOI>
						<DOI name="Loc" desc="CB/DCB_PhC.Loc">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_3.Loc"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_3.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhC.Loc</Val>
							</DAI>
						</DOI>
						<DOI name="OpCnt" desc="CB/DCB_PhC.N_Trp">
							<SDI name="units">
								<DAI name="SIUnit" sAddr="MNL:B01.C1R2.XCBR_3.N_Trp"/>
								<DAI name="multiplier" sAddr="MNL:B01.C1R2.XCBR_3.N_Trp"/>
							</SDI>
							<DAI name="stVal" sAddr="MNL:B01.C1R2.XCBR_3.N_Trp"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_3.Quality"/>
							<DAI name="d">
								<Val>CB/DCB_PhC.N_Trp</Val>
							</DAI>
						</DOI>
						<DOI name="LocSta" desc="Switching authority at station level">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Switching authority at station level</Val>
							</DAI>
						</DOI>
						<DOI name="Pos" desc="CB/DCB_PhC.DPOS">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_3.DPOS"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_3.Quality"/>
							<DAI name="t" sAddr="Utctime:B01.C1R2.XCBR_3.DPOS"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CB/DCB_PhC.DPOS</Val>
							</DAI>
						</DOI>
						<DOI name="BlkOpn" desc="CB/DCB_PhC.BlkOpn">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_3.BlkOpn"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_3.Quality"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CB/DCB_PhC.BlkOpn</Val>
							</DAI>
						</DOI>
						<DOI name="BlkCls" desc="CB/DCB_PhC.BlkCls">
							<DAI name="stVal" sAddr="YX:B01.C1R2.XCBR_3.BlkCls"/>
							<DAI name="q" sAddr="BVstring13:B01.C1R2.XCBR_3.Quality"/>
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>CB/DCB_PhC.BlkCls</Val>
							</DAI>
						</DOI>
						<DOI name="ChaMotEna" desc="Charger motor enabled">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="sboClass">
								<Val>operate-once</Val>
							</DAI>
							<DAI name="d">
								<Val>Charger motor enabled</Val>
							</DAI>
						</DOI>
					</LN>
					<LN desc="CB/DCB 3Ph" lnType="NRR_XCBR_ED2_V1.00_S_V1.00" lnClass="XCBR" inst="4" prefix="GOOUT">
					</LN>
				</LDevice>
				<LDevice inst="MUSV">
					<LN0 desc="LLN0" lnType="NRR_LLN0_ED2_V1.00_S_V1.00" lnClass="LLN0" inst="">
						<DataSet name="PhsMeas1" desc="Phase CTs and VTs">
							<FCDA ldInst="MUSV" prefix="I1" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="I1" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="I2" lnClass="TCTR" lnInst="2" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="I2" lnClass="TCTR" lnInst="2" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="I3" lnClass="TCTR" lnInst="3" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="I3" lnClass="TCTR" lnInst="3" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="I4" lnClass="TCTR" lnInst="4" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="I4" lnClass="TCTR" lnInst="4" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U1" lnClass="TVTR" lnInst="1" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U1" lnClass="TVTR" lnInst="1" doName="VolSv" daName="q" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U2" lnClass="TVTR" lnInst="2" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U2" lnClass="TVTR" lnInst="2" doName="VolSv" daName="q" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U3" lnClass="TVTR" lnInst="3" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U3" lnClass="TVTR" lnInst="3" doName="VolSv" daName="q" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U4" lnClass="TVTR" lnInst="4" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U4" lnClass="TVTR" lnInst="4" doName="VolSv" daName="q" fc="MX"/>
						</DataSet>
						<DataSet name="PhsMeas2" desc="Neutral and UB CTs">
							<FCDA ldInst="MUSV" prefix="I5" lnClass="TCTR" lnInst="5" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="I5" lnClass="TCTR" lnInst="5" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="I6" lnClass="TCTR" lnInst="6" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="I6" lnClass="TCTR" lnInst="6" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="I7" lnClass="TCTR" lnInst="7" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="I7" lnClass="TCTR" lnInst="7" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="I8" lnClass="TCTR" lnInst="8" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="I8" lnClass="TCTR" lnInst="8" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U1" lnClass="TVTR" lnInst="1" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U1" lnClass="TVTR" lnInst="1" doName="VolSv" daName="q" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U2" lnClass="TVTR" lnInst="2" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U2" lnClass="TVTR" lnInst="2" doName="VolSv" daName="q" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U3" lnClass="TVTR" lnInst="3" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U3" lnClass="TVTR" lnInst="3" doName="VolSv" daName="q" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U4" lnClass="TVTR" lnInst="4" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MUSV" prefix="U4" lnClass="TVTR" lnInst="4" doName="VolSv" daName="q" fc="MX"/>
						</DataSet>
						<SampledValueControl name="PhsMeas1" datSet="PhsMeas1" confRev="1" smvID="Bay" multicast="true" smpRate="80" nofASDU="1" smpMod="SmpPerPeriod">
							<Private type="NR_Port">1-A</Private>
							<SmvOpts refreshTime="false" sampleSynchronized="true" sampleRate="false" security="false"/>
						</SampledValueControl>
						<SampledValueControl name="PhsMeas2" datSet="PhsMeas2" confRev="1" smvID="Bus" multicast="true" smpRate="80" nofASDU="1" smpMod="SmpPerPeriod">
							<Private type="NR_Port">1-A</Private>
							<SmvOpts refreshTime="false" sampleSynchronized="true" sampleRate="false" security="false"/>
						</SampledValueControl>
					</LN0>
					<LN desc="LPHD" lnType="NRR_LPHD_ED2_V1.00_S_V1.00" lnClass="LPHD" inst="1">
					</LN>
					<LN desc="GGIO" lnType="NRR_GGIO_DelayTRtg_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="2" prefix="Delay">
					</LN>
					<LN desc="ADC01.Ch01.Data" lnType="NRR_TCTR_ED2_V1.00_S_V1.00" lnClass="TCTR" inst="1" prefix="I1">
					</LN>
					<LN desc="ADC01.Ch02.Data" lnType="NRR_TCTR_ED2_V1.00_S_V1.00" lnClass="TCTR" inst="2" prefix="I2">
					</LN>
					<LN desc="ADC01.Ch03.Data" lnType="NRR_TCTR_ED2_V1.00_S_V1.00" lnClass="TCTR" inst="3" prefix="I3">
					</LN>
					<LN desc="ADC01.Ch04.Data" lnType="NRR_TCTR_ED2_V1.00_S_V1.00" lnClass="TCTR" inst="4" prefix="I4">
					</LN>
					<LN desc="ADC01.Ch05.Data" lnType="NRR_TCTR_ED2_V1.00_S_V1.00" lnClass="TCTR" inst="5" prefix="I5">
					</LN>
					<LN desc="ADC01.Ch06.Data" lnType="NRR_TCTR_ED2_V1.00_S_V1.00" lnClass="TCTR" inst="6" prefix="I6">
					</LN>
					<LN desc="ADC01.Ch07.Data" lnType="NRR_TCTR_ED2_V1.00_S_V1.00" lnClass="TCTR" inst="7" prefix="I7">
					</LN>
					<LN desc="ADC01.Ch08.Data" lnType="NRR_TCTR_ED2_V1.00_S_V1.00" lnClass="TCTR" inst="8" prefix="I8">
					</LN>
					<LN desc="ADC01.Ch09.Data" lnType="NRR_TVTR_ED2_V1.00_S_V1.00" lnClass="TVTR" inst="1" prefix="U1">
					</LN>
					<LN desc="ADC01.Ch10.Data" lnType="NRR_TVTR_ED2_V1.00_S_V1.00" lnClass="TVTR" inst="2" prefix="U2">
					</LN>
					<LN desc="ADC01.Ch11.Data" lnType="NRR_TVTR_ED2_V1.00_S_V1.00" lnClass="TVTR" inst="3" prefix="U3">
					</LN>
					<LN desc="ADC01.Ch12.Data" lnType="NRR_TVTR_ED2_V1.00_S_V1.00" lnClass="TVTR" inst="4" prefix="U4">
					</LN>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<DataTypeTemplates>
		<LNodeType id="NRR_LLN0_ED2_V1.00_S_V1.00" desc="Logical node zero" lnClass="LLN0" iedType="PCS-S">
			<DO name="NamPlt" type="NR_LPL_LN0_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Blk" type="NR_SPS_ED2_V1.00" desc="Dynamic blocking of function described by the LN"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="LocKey" type="NR_SPS_ED2_V1.00" desc="Local operation for complete logical device"/>
			<DO name="Loc" type="NR_SPS_ED2_V1.00" desc="Local control behaviour"/>
			<DO name="LocSta" type="NR_SPC_ED2_V1.00" desc="Switching authority at station level"/>
			<DO name="Diag" type="NR_SPC_ED2_V1.00" desc="Run diagnostics"/>
			<DO name="LEDRs" type="NR_SPC_ED2_V1.00" transient="true" desc="LED reset"/>
			<DO name="GrRef" type="NR_ORG_SP_Set_ED2_V1.00" desc="Reference to a higher level logical device"/>
			<DO name="MltLev" type="NR_SPG_SP_Set_ED2_V1.00" desc="Select mode of authority for local control (True – control from multiple levels is allowed, False – no other control level allowed) (see Annex B)"/>
			<DO name="FuncEna1" type="NR_SPC_EX_ED2_V1.00" desc="Function 1 enabled"/>
			<DO name="FuncEna2" type="NR_SPC_EX_ED2_V1.00" desc="Function 2 enabled"/>
			<DO name="FuncEna3" type="NR_SPC_EX_ED2_V1.00" desc="Function 3 enabled"/>
			<DO name="FuncEna4" type="NR_SPC_EX_ED2_V1.00" desc="Function 4 enabled"/>
			<DO name="FuncEna5" type="NR_SPC_EX_ED2_V1.00" desc="Function 5 enabled"/>
			<DO name="FuncEna6" type="NR_SPC_EX_ED2_V1.00" desc="Function 6 enabled"/>
			<DO name="FuncEna7" type="NR_SPC_EX_ED2_V1.00" desc="Function 7 enabled"/>
			<DO name="FuncEna8" type="NR_SPC_EX_ED2_V1.00" desc="Function 8 enabled"/>
			<DO name="FuncEna9" type="NR_SPC_EX_ED2_V1.00" desc="Function 9 enabled"/>
			<DO name="FuncEna10" type="NR_SPC_EX_ED2_V1.00" desc="Function 10 enabled"/>
			<DO name="CBFlt" type="NR_SPC_EX_ED2_V1.00" desc="Current Breaker Fault"/>
			<DO name="DPFCStr" type="NR_ASG_SE_F_EX_ED2_V1.00" desc="DPFC start value"/>
			<DO name="ROCStr" type="NR_ASG_SE_F_EX_ED2_V1.00" desc="Residual current start value"/>
			<DO name="N0CStr" type="NR_ASG_SE_F_EX_ED2_V1.00" desc="Negative current start value"/>
			<DO name="LinNo" type="NR_VSG_SE_EX_ED2_V1.00" desc="Line No"/>
			<DO name="DelayTRtg" type="NR_SAV_I_EX_ED2_V1.00" desc="SV Delay time"/>
			<DO name="Z3AuxStr" type="NR_SPG_SE_EX_ED2_V1.00" desc="Z3 auxiliary start value"/>
			<DO name="CommTest" type="NR_SPS_EX_ED2_V1.00" desc="Communication Test"/>
			<DO name="CommTstMet" type="NR_SPS_EX_ED2_V1.00" desc="Communication test enabled"/>
			<DO name="TimeZone" type="NR_ING_SP_Set_EX_ED2_V1.00" desc="Time Zone"/>
			<DO name="SntpAddr" type="NR_ING_SP_Set_EX_ED2_V1.00" desc="Sntp Address"/>
			<DO name="RemTrig" type="NR_SPC_EX_ED2_V1.00" desc="Remote Trigger"/>
			<DO name="NOCEna" type="NR_SPG_SE_EX_ED2_V1.00" desc="Negative current start enable"/>
		</LNodeType>
		<LNodeType id="NRR_LPHD_ED2_V1.00_S_V1.00" desc="Physical device information" lnClass="LPHD" iedType="PCS-S">
			<DO name="PhyNam" type="NR_DPL_ED2_V1.00" desc="Physical device name plate"/>
			<DO name="PhyHealth" type="NR_ENS_PhyHealth_ED2_V1.00" desc="Physical device health"/>
			<DO name="OutOv" type="NR_SPS_ED2_V1.00" desc="Output communications buffer overflow"/>
			<DO name="Proxy" type="NR_SPS_ED2_V1.00" desc="Indicates if this LN is a proxy"/>
			<DO name="InOv" type="NR_SPS_ED2_V1.00" desc="Input communications buffer overflow"/>
			<DO name="Sim" type="NR_SPC_ED2_V1.00" desc="Receive simulated GOOSE or simulated SV"/>
			<DO name="SettingGrp" type="NR_ING_SP_Set_EX_ED2_V1.00" desc="Setting Group"/>
			<DO name="DeviceName" type="NR_VSG_SP_Set_EX_ED2_V1.00" desc="Device name"/>
			<DO name="GooseEna" type="NR_SPG_SP_Set_EX_ED2_V1.00" desc="GOOSE DI Enable"/>
			<DO name="OthGoEna" type="NR_SPG_SP_Set_EX_ED2_V1.00" desc="Other GOOSE DI Enable"/>
			<DO name="MovPNum" type="NR_ING_SE_EX_ED2_V1.00" desc="MOV parallel module num"/>
			<DO name="MovSNum" type="NR_ING_SE_EX_ED2_V1.00" desc="MOV serial module num"/>
			<DO name="MovV" type="NR_ASG_SE_F_EX_ED2_V1.00" desc="MOV module voltage"/>
			<DO name="CapXRtg" type="NR_ASG_SE_F_EX_ED2_V1.00" desc="X Rated Value of Capacitor"/>
			<DO name="PARtg" type="NR_ASG_SE_F_EX_ED2_V1.00" desc="Platform Rated Current"/>
			<DO name="MovARtg" type="NR_ASG_SE_F_EX_ED2_V1.00" desc="MOVR Rated Current"/>
			<DO name="CapARtg" type="NR_ASG_SE_F_EX_ED2_V1.00" desc="Capacitor Rated Current"/>
			<DO name="InARtg" type="NR_ASG_SE_F_EX_ED2_V1.00" desc="In Rated Current"/>
			<DO name="LinARtg" type="NR_ASG_SE_F_EX_ED2_V1.00" desc="Line Rated Current"/>
			<DO name="ActSGST" type="NR_MV_F_EX_ED2_V1.00" desc="Active Setting Group"/>
			<DO name="StationNs" type="NR_VSG_SE_EX_ED2_V1.00" desc="Station name"/>
			<DO name="LocStaAddr" type="NR_ING_SE_EX_ED2_V1.00" desc="Local station address of communication"/>
			<DO name="DstStaAddr" type="NR_ING_SE_EX_ED2_V1.00" desc="Destination station address of communication"/>
		</LNodeType>
		<LNodeType id="NRR_LCCH_ED2_V1.00_S_V1.00" desc="Physical communication channel supervision" lnClass="LCCH" iedType="PCS-9XX">
			<DO name="NamPlt" type="NR_LPL_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="ClcExp" type="NR_SPS_ED2_V1.00" desc="Calculation period expired"/>
			<DO name="ClcMth" type="NR_ENG_ClcMth_SP_Set_ED2_V1.00" desc="Calculation method of statistical data objects"/>
			<DO name="ClcMod" type="NR_ENG_ClcMod_SP_Set_ED2_V1.00" desc="Calculation mode. Allowed values: TOTAL, PERIOD, SLIDING"/>
			<DO name="ClcIntvTyp" type="NR_ENG_ClcIntvTyp_SP_Set_ED2_V1.00" desc="Calculation interval type"/>
			<DO name="ClcIntvPer" type="NR_ING_SP_Set_ED2_V1.00" desc="In case ClcIntvTyp equals to MS, PER-CYCLE, CYCLE, DAY, WEEK, MONTH, YEAR, number of units to consider to calculate the calculation interval duration"/>
			<DO name="ClcSrc" type="NR_ORG_SP_Set_ED2_V1.00" desc="Object reference to source logical node"/>
			<DO name="ChLiv" type="NR_SPS_ED2_V1.00" desc="Physical channel status; true, if channel receives telegrams within a specified time interval."/>
			<DO name="RedChLiv" type="NR_SPS_ED2_V1.00" desc="Physical channel status of redundant channel"/>
		</LNodeType>
		<LNodeType id="NRR_LGOS_ED2_V1.00_S_V1.00" desc="GOOSE subscription" lnClass="LGOS" iedType="PCS-S">
			<DO name="NamPlt" type="NR_LPL_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Blk" type="NR_SPS_ED2_V1.00" desc="Dynamic blocking of function described by the LN"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="NdsCom" type="NR_SPS_ED2_V1.00" desc="Subscription needs commissioning"/>
			<DO name="St" type="NR_SPS_ED2_V1.00" desc="Status of the subscription (True = active, False=not active)"/>
			<DO name="SimSt" type="NR_SPS_ED2_V1.00" desc="Status showing that really Sim messages are received and accepted"/>
			<DO name="LastStNum" type="NR_INS_ED2_V1.00" desc="Last state number received"/>
			<DO name="ConfRevNum" type="NR_INS_ED2_V1.00" desc="Expected configuration revision number"/>
			<DO name="GoCBRef" type="NR_ORG_SP_RO_ED2_V1.00" desc="Reference to the subscribed GOOSE control block"/>
			<DO name="LinkADisc" type="NR_SPS_EX_ED2_V1.00" desc="Alarm of GOOSE Link A Disconnection"/>
			<DO name="LinkBDisc" type="NR_SPS_EX_ED2_V1.00" desc="Alarm of GOOSE Link B Disconnection"/>
			<DO name="RecvEna" type="NR_SPC_EX_ED2_V1.00" desc="Receive Link of GOOSE"/>
		</LNodeType>
		<LNodeType id="NRR_GGIO_AnIn_ED2_V1.00_S_V1.00" desc="General analog inputs(float)" lnClass="GGIO" iedType="PCS-S">
			<DO name="NamPlt" type="NR_LPL_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Blk" type="NR_SPS_ED2_V1.00" desc="Dynamic blocking of function described by the LN"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="EEName" type="NR_DPL_ED2_V1.00" desc="External equipment name plate"/>
			<DO name="EEHealth" type="NR_ENS_EEHealth_ED2_V1.00" desc="External equipment health"/>
			<DO name="LocKey" type="NR_SPS_ED2_V1.00" desc="Local-remote key"/>
			<DO name="Loc" type="NR_SPS_ED2_V1.00" desc="Local operation"/>
			<DO name="AnIn1" type="NR_MV_F_ED2_V1.00" desc="Analog input1"/>
			<DO name="AnIn2" type="NR_MV_F_ED2_V1.00" desc="Analog input2"/>
			<DO name="AnIn3" type="NR_MV_F_ED2_V1.00" desc="Analog input3"/>
			<DO name="AnIn4" type="NR_MV_F_ED2_V1.00" desc="Analog input4"/>
			<DO name="AnIn5" type="NR_MV_F_ED2_V1.00" desc="Analog input5"/>
			<DO name="AnIn6" type="NR_MV_F_ED2_V1.00" desc="Analog input6"/>
			<DO name="AnIn7" type="NR_MV_F_ED2_V1.00" desc="Analog input7"/>
			<DO name="AnIn8" type="NR_MV_F_ED2_V1.00" desc="Analog input8"/>
			<DO name="AnIn9" type="NR_MV_F_ED2_V1.00" desc="Analog input9"/>
			<DO name="AnIn10" type="NR_MV_F_ED2_V1.00" desc="Analog input10"/>
			<DO name="AnIn11" type="NR_MV_F_ED2_V1.00" desc="Analog input11"/>
			<DO name="AnIn12" type="NR_MV_F_ED2_V1.00" desc="Analog input12"/>
			<DO name="AnIn13" type="NR_MV_F_ED2_V1.00" desc="Analog input13"/>
			<DO name="AnIn14" type="NR_MV_F_ED2_V1.00" desc="Analog input14"/>
			<DO name="AnIn15" type="NR_MV_F_ED2_V1.00" desc="Analog input15"/>
			<DO name="AnIn16" type="NR_MV_F_ED2_V1.00" desc="Analog input16"/>
		</LNodeType>
		<LNodeType id="NRR_GGIO_IND_ED2_V1.00_S_V1.00" desc="GGIO" lnClass="GGIO" iedType="PCS-S">
			<DO name="NamPlt" type="NR_LPL_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Blk" type="NR_SPS_ED2_V1.00" desc="Dynamic blocking of function described by the LN"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="EEName" type="NR_DPL_ED2_V1.00" desc="External equipment name plate"/>
			<DO name="EEHealth" type="NR_ENS_EEHealth_ED2_V1.00" desc="External equipment health"/>
			<DO name="LocKey" type="NR_SPS_ED2_V1.00" desc="Local-remote key"/>
			<DO name="Loc" type="NR_SPS_ED2_V1.00" desc="Local operation"/>
			<DO name="Ind1" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind2" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind3" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind4" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind5" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind6" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind7" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind8" type="NR_SPS_ED2_V1.00" desc="General indication"/>
		</LNodeType>
		<LNodeType id="NRR_GGIO_IND32_ED2_V1.00_S_V1.00" desc="GGIO" lnClass="GGIO" iedType="PCS-S">
			<DO name="NamPlt" type="NR_LPL_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Blk" type="NR_SPS_ED2_V1.00" desc="Dynamic blocking of function described by the LN"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="EEName" type="NR_DPL_ED2_V1.00" desc="External equipment name plate"/>
			<DO name="EEHealth" type="NR_ENS_EEHealth_ED2_V1.00" desc="External equipment health"/>
			<DO name="LocKey" type="NR_SPS_ED2_V1.00" desc="Local-remote key"/>
			<DO name="Loc" type="NR_SPS_ED2_V1.00" desc="Local operation"/>
			<DO name="Ind1" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind2" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind3" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind4" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind5" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind6" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind7" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind8" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind9" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind10" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind11" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind12" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind13" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind14" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind15" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind16" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind17" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind18" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind19" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind20" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind21" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind22" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind23" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind24" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind25" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind26" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind27" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind28" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind29" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind30" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind31" type="NR_SPS_ED2_V1.00" desc="General indication"/>
			<DO name="Ind32" type="NR_SPS_ED2_V1.00" desc="General indication"/>
		</LNodeType>
		<LNodeType id="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" desc="General single point status(alm)" lnClass="GGIO" iedType="PCS-S">
			<DO name="NamPlt" type="NR_LPL_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Blk" type="NR_SPS_ED2_V1.00" desc="Dynamic blocking of function described by the LN"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="EEName" type="NR_DPL_ED2_V1.00" desc="External equipment name plate"/>
			<DO name="EEHealth" type="NR_ENS_EEHealth_ED2_V1.00" desc="External equipment health"/>
			<DO name="LocKey" type="NR_SPS_ED2_V1.00" desc="Local-remote key"/>
			<DO name="Loc" type="NR_SPS_ED2_V1.00" desc="Local operation"/>
			<DO name="Alm1" type="NR_SPS_ED2_V1.00" desc="General indication (binary input)"/>
			<DO name="Alm2" type="NR_SPS_ED2_V1.00" desc="General indication (binary input)"/>
			<DO name="Alm3" type="NR_SPS_ED2_V1.00" desc="General indication (binary input)"/>
			<DO name="Alm4" type="NR_SPS_ED2_V1.00" desc="General indication (binary input)"/>
			<DO name="Alm5" type="NR_SPS_ED2_V1.00" desc="General indication (binary input)"/>
			<DO name="Alm6" type="NR_SPS_ED2_V1.00" desc="General indication (binary input)"/>
			<DO name="Alm7" type="NR_SPS_ED2_V1.00" desc="General indication (binary input)"/>
			<DO name="Alm8" type="NR_SPS_ED2_V1.00" desc="General indication (binary input)"/>
		</LNodeType>
		<LNodeType id="NRR_GGIO_SPC_ED2_V1.00_S_V1.00" desc="General single point control" lnClass="GGIO" iedType="PCS-S">
			<DO name="NamPlt" type="NR_LPL_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Blk" type="NR_SPS_ED2_V1.00" desc="Dynamic blocking of function described by the LN"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="EEName" type="NR_DPL_ED2_V1.00" desc="External equipment name plate"/>
			<DO name="EEHealth" type="NR_ENS_EEHealth_ED2_V1.00" desc="External equipment health"/>
			<DO name="LocKey" type="NR_SPS_ED2_V1.00" desc="Local-remote key"/>
			<DO name="Loc" type="NR_SPS_ED2_V1.00" desc="Local operation"/>
			<DO name="SPCSO1" type="NR_SPC_ED2_V1.00" desc="General indication"/>
			<DO name="SPCSO2" type="NR_SPC_ED2_V1.00" desc="General indication"/>
			<DO name="SPCSO3" type="NR_SPC_ED2_V1.00" desc="General indication"/>
			<DO name="SPCSO4" type="NR_SPC_ED2_V1.00" desc="General indication"/>
			<DO name="SPCSO5" type="NR_SPC_ED2_V1.00" desc="General indication"/>
			<DO name="SPCSO6" type="NR_SPC_ED2_V1.00" desc="General indication"/>
			<DO name="SPCSO7" type="NR_SPC_ED2_V1.00" desc="General indication"/>
			<DO name="SPCSO8" type="NR_SPC_ED2_V1.00" desc="General indication (binary input)"/>
		</LNodeType>
		<LNodeType id="NRR_GGIO_DelayTRtg_ED2_V1.00_S_V1.00" desc="General DelayTRtg" lnClass="GGIO" iedType="PCS-S">
			<DO name="NamPlt" type="NR_LPL_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Blk" type="NR_SPS_ED2_V1.00" desc="Dynamic blocking of function described by the LN"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="EEName" type="NR_DPL_ED2_V1.00" desc="External equipment name plate"/>
			<DO name="EEHealth" type="NR_ENS_EEHealth_ED2_V1.00" desc="External equipment health"/>
			<DO name="LocKey" type="NR_SPS_ED2_V1.00" desc="Local-remote key"/>
			<DO name="Loc" type="NR_SPS_ED2_V1.00" desc="Local operation"/>
			<DO name="DelayTRtg" type="NR_SAV_I_EX_ED2_V1.00" desc="Rated delay time"/>
		</LNodeType>
		<LNodeType id="NRR_GGIO_ACT_ED2_V1.00_S_V1.00" desc="General acts" lnClass="GGIO" iedType="PCS-S">
			<DO name="NamPlt" type="NR_LPL_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Blk" type="NR_SPS_ED2_V1.00" desc="Dynamic blocking of function described by the LN"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="EEName" type="NR_DPL_ED2_V1.00" desc="External equipment name plate"/>
			<DO name="EEHealth" type="NR_ENS_EEHealth_ED2_V1.00" desc="External equipment health"/>
			<DO name="LocKey" type="NR_SPS_ED2_V1.00" desc="Local-remote key"/>
			<DO name="Loc" type="NR_SPS_ED2_V1.00" desc="Local operation"/>
			<DO name="ACTSO1" type="NR_ACT_EX_ED2_V1.00" desc="General indication"/>
			<DO name="ACTSO2" type="NR_ACT_EX_ED2_V1.00" desc="General indication"/>
			<DO name="ACTSO3" type="NR_ACT_EX_ED2_V1.00" desc="General indication"/>
			<DO name="ACTSO4" type="NR_ACT_EX_ED2_V1.00" desc="General indication"/>
			<DO name="ACTSO5" type="NR_ACT_EX_ED2_V1.00" desc="General indication"/>
			<DO name="ACTSO6" type="NR_ACT_EX_ED2_V1.00" desc="General indication"/>
			<DO name="ACTSO7" type="NR_ACT_EX_ED2_V1.00" desc="General indication"/>
			<DO name="ACTSO8" type="NR_ACT_EX_ED2_V1.00" desc="General indication"/>
		</LNodeType>
		<LNodeType id="NRR_PTRC_ED2_V1.00_S_V1.00" desc="Protection trip conditioning" lnClass="PTRC" iedType="PCS-S">
			<DO name="NamPlt" type="NR_LPL_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Blk" type="NR_SPS_ED2_V1.00" desc="Dynamic blocking of function described by the LN"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="Tr" type="NR_ACT_3P_ED2_V1.00" desc="Trip"/>
			<DO name="Op" type="NR_ACT_3P_ED2_V1.00" desc="Operate (combination of subscribed Op from protection functions)"/>
			<DO name="Str" type="NR_ACD_ED2_V1.00" desc="Start (combination of subscribed Str from protection functions)"/>
			<DO name="OpCntRs" type="NR_INC_ED2_V1.00" desc="Resettable operation counter"/>
			<DO name="TrMod" type="NR_ENG_TrMod_SE_ED2_V1.00" desc="Trip mode"/>
			<DO name="TrPlsTmms" type="NR_ING_SE_ED2_V1.00" desc="Trip Pulse Time"/>
			<DO name="TrStrp" type="NR_SPC_EX_ED2_V1.00" desc="Trip strap"/>
			<DO name="StrBFStrp" type="NR_SPC_EX_ED2_V1.00" desc="Start breaker failure strap"/>
			<DO name="BlkRecStrp" type="NR_SPC_EX_ED2_V1.00" desc="Block recloser strap"/>
			<DO name="ReclsTmms" type="NR_ING_SE_EX_ED2_V1.00" desc="Re-close Delay Time"/>
			<DO name="StrBF" type="NR_ACT_3P_EX_ED2_V1.00" desc="Start breaker failure"/>
			<DO name="BlkRecST" type="NR_SPS_EX_ED2_V1.00" desc="Block reclosing"/>
			<DO name="TPTrMod" type="NR_ING_SE_EX_ED2_V1.00" desc="Three Pole Trip Mode"/>
			<DO name="TPTrModB" type="NR_SPG_SE_EX_ED2_V1.00" desc="Three Pole Trip Mode"/>
			<DO name="Z2BlkRec" type="NR_SPG_SE_EX_ED2_V1.00" desc="Zone 2 fault blocking recloser"/>
			<DO name="MPFBlkRec" type="NR_SPG_SE_EX_ED2_V1.00" desc="multi-phase fault blocking recloser"/>
			<DO name="TPFBlkRec" type="NR_SPG_SE_EX_ED2_V1.00" desc="triple-phase fault blocking recloser"/>
			<DO name="Z3BlkRec" type="NR_SPG_SE_EX_ED2_V1.00" desc="Zone 3 fault blocking recloser"/>
			<DO name="OUTMATR" type="NR_ING_SE_EX_ED2_V1.00" desc="Output Matrix"/>
			<DO name="AcsVTyp" type="NR_ING_SE_EX_ED2_V1.00" desc="Access voltage type"/>
			<DO name="ReclsTms" type="NR_ASG_SE_F_EX_ED2_V1.00" desc="Re-close Delay Time(second)"/>
			<DO name="PhSFailTmms" type="NR_ING_SE_EX_ED2_V1.00" desc="Phase select fail Time"/>
			<DO name="PhSFailEna" type="NR_SPG_SE_EX_ED2_V1.00" desc="Phase select fail Enable"/>
			<DO name="PhSFailBlk" type="NR_SPG_SE_EX_ED2_V1.00" desc="Phase select fail blocking recloser"/>
		</LNodeType>
		<LNodeType id="NRR_RDRE_ED2_V1.00_S_V1.00" desc="Disturbance recorder function" lnClass="RDRE" iedType="PCS-S">
			<DO name="NamPlt" type="NR_LPL_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Blk" type="NR_SPS_ED2_V1.00" desc="Dynamic blocking of function described by the LN"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="InRef1" type="NR_ORG_SP_Set_ED2_V1.00" desc="General input reference"/>
			<DO name="BlkRef1" type="NR_ORG_SP_Set_ED2_V1.00" desc="Blocking reference shows the receiving of dynamically blocking signal"/>
			<DO name="RcdMade" type="NR_SPS_ED2_V1.00" desc="Recording made"/>
			<DO name="FltNum" type="NR_INS_ED2_V1.00" desc="Fault number"/>
			<DO name="GriFltNum" type="NR_INS_ED2_V1.00" desc="Grid fault number"/>
			<DO name="RcdStr" type="NR_SPS_ED2_V1.00" desc="Recording started"/>
			<DO name="MemUsed" type="NR_INS_ED2_V1.00" desc="Memory used in %"/>
			<DO name="RcdTrg" type="NR_SPC_ED2_V1.00" desc="Trigger recorder"/>
			<DO name="MemRs" type="NR_SPC_ED2_V1.00" transient="true" desc="Reset recorder memory (set the pointer of memory start to the beginning)"/>
			<DO name="MemClr" type="NR_SPC_ED2_V1.00" transient="true" desc="Clear memory (erase all content of the memory)"/>
			<DO name="OpCntRs" type="NR_INC_ED2_V1.00" desc="Resettable operation counter"/>
			<DO name="TrgMod" type="NR_ENG_TrgMod_SE_ED2_V1.00" desc="Trigger mode (internal trigger, external or both)"/>
			<DO name="LevMod" type="NR_ENG_LevMod_SE_ED2_V1.00" desc="Level trigger mode"/>
			<DO name="PreTmms" type="NR_ING_SE_ED2_V1.00" desc="Pre-trigger time"/>
			<DO name="PstTmms" type="NR_ING_SE_ED2_V1.00" desc="Post-trigger time"/>
			<DO name="MemFull" type="NR_ING_SE_ED2_V1.00" desc="Memory full level"/>
			<DO name="MaxNumRcd" type="NR_ING_SE_ED2_V1.00" desc="Maximum number of records"/>
			<DO name="ReTrgMod" type="NR_SPG_SE_ED2_V1.00" desc="Retrigger mode"/>
			<DO name="PerTrgTms" type="NR_ING_SE_ED2_V1.00" desc="Periodic trigger time in s"/>
			<DO name="ExclTmms" type="NR_ING_SE_ED2_V1.00" desc="Exclusion time"/>
			<DO name="RcdMod" type="NR_ENG_RcdMod_SE_ED2_V1.00" desc="Recorder operation mode (saturation, overwrite)"/>
			<DO name="StoRte" type="NR_ING_SE_ED2_V1.00" desc="Storage rate, i.e. sampling rate of the disturbance recorder"/>
			<DO name="NofUpdate" type="NR_INS_EX_ED2_V1.00" desc="Nof updating"/>
			<DO name="MaxFltValA" type="NR_MV_F_EX_ED2_V1.00" desc="Max fault current"/>
			<DO name="FltI0ValA" type="NR_MV_F_EX_ED2_V1.00" desc="Max fault zero current"/>
			<DO name="SelctEnd" type="NR_INS_EX_ED2_V1.00" desc="Select_End"/>
			<DO name="FltBay" type="NR_INS_EX_ED2_V1.00" desc="Fault_Bay"/>
			<DO name="FltPhase" type="NR_INS_EX_ED2_V1.00" desc="Fault_Phase"/>
			<DO name="FltDist" type="NR_MV_F_EX_ED2_V1.00" desc="Fault_Distance"/>
			<DO name="TripPhase" type="NR_INS_EX_ED2_V1.00" desc="Trip_Phase"/>
			<DO name="TripTime" type="NR_INS_EX_ED2_V1.00" desc="Trip_Time"/>
			<DO name="OpenTime" type="NR_INS_EX_ED2_V1.00" desc="Open_Time"/>
			<DO name="FaultI" type="NR_MV_F_EX_ED2_V1.00" desc="Fault_I"/>
			<DO name="FaultV" type="NR_MV_F_EX_ED2_V1.00" desc="Fault_V"/>
			<DO name="RclsTime" type="NR_INS_EX_ED2_V1.00" desc="RecloseTime"/>
			<DO name="ReFltPhase" type="NR_INS_EX_ED2_V1.00" desc="ReFault_Phase"/>
			<DO name="ReFltDist" type="NR_MV_F_EX_ED2_V1.00" desc="ReFault_Distance"/>
			<DO name="ReTrPhase" type="NR_INS_EX_ED2_V1.00" desc="ReTrip_Phase"/>
			<DO name="ReTrTime" type="NR_INS_EX_ED2_V1.00" desc="ReTrip_Time"/>
			<DO name="ReOpenTime" type="NR_INS_EX_ED2_V1.00" desc="ReOpen_Time"/>
			<DO name="ReFaultI" type="NR_MV_F_EX_ED2_V1.00" desc="ReFault_I"/>
			<DO name="ReFaultV" type="NR_MV_F_EX_ED2_V1.00" desc="ReFault_V"/>
		</LNodeType>
		<LNodeType id="NRR_TCTR_ED2_V1.00_S_V1.00" desc="Current transformer" lnClass="TCTR" iedType="PCS-S">
			<DO name="NamPlt" type="NR_LPL_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Blk" type="NR_SPS_ED2_V1.00" desc="Dynamic blocking of function described by the LN"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="EEName" type="NR_DPL_ED2_V1.00" desc="External equipment name plate"/>
			<DO name="EEHealth" type="NR_ENS_EEHealth_ED2_V1.00" desc="External equipment health"/>
			<DO name="OpTmh" type="NR_INS_ED2_V1.00" desc="Operation time"/>
			<DO name="AmpSv" type="NR_SAV_I_ED2_V1.00" desc="Current (sampled value)"/>
			<DO name="ARtg" type="NR_ASG_SP_Set_F_ED2_V1.00" desc="Rated current"/>
			<DO name="HzRtg" type="NR_ASG_SP_Set_F_ED2_V1.00" desc="Rated frequency"/>
			<DO name="AngCor" type="NR_ASG_SE_F_ED2_V1.00" desc="Voltage phasor angle correction of external voltage transformer"/>
			<DO name="ARtgSnd" type="NR_ASG_SP_Set_F_EX_ED2_V1.00" desc="Secondary Rated Current"/>
			<DO name="AmpChB" type="NR_SAV_I_EX_ED2_V1.00" desc="Current (Sampled value from another channel)"/>
			<DO name="ECVTDelay" type="NR_ASG_SE_F_EX_ED2_V1.00" desc="ECVT Delay time"/>
			<DO name="CTPAB" type="NR_SPG_SE_EX_ED2_V1.00" desc="CT Phase AB"/>
			<DO name="CTPBC" type="NR_SPG_SE_EX_ED2_V1.00" desc="CT Phase BC"/>
			<DO name="CTPCA" type="NR_SPG_SE_EX_ED2_V1.00" desc="CT Phase CA"/>
			<DO name="CTMod" type="NR_SPG_SE_EX_ED2_V1.00" desc="CT MODE"/>
			<DO name="ZroACalEna" type="NR_SPG_SE_EX_ED2_V1.00" desc="Zero sequence current is calculated"/>
			<DO name="NegPol" type="NR_SPG_SE_EX_ED2_V1.00" desc="Negative polarity"/>
		</LNodeType>
		<LNodeType id="NRR_TVTR_ED2_V1.00_S_V1.00" desc="Voltage transformer" lnClass="TVTR" iedType="PCS-S">
			<DO name="NamPlt" type="NR_LPL_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Blk" type="NR_SPS_ED2_V1.00" desc="Dynamic blocking of function described by the LN"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="EEName" type="NR_DPL_ED2_V1.00" desc="External equipment name plate"/>
			<DO name="EEHealth" type="NR_ENS_EEHealth_ED2_V1.00" desc="External equipment health"/>
			<DO name="OpTmh" type="NR_INS_ED2_V1.00" desc="Operation time"/>
			<DO name="FuFail" type="NR_SPS_ED2_V1.00" desc="TVTR fuse failure"/>
			<DO name="VolSv" type="NR_SAV_I_ED2_V1.00" desc="Voltage (sampled value)"/>
			<DO name="VRtg" type="NR_ASG_SP_Set_F_ED2_V1.00" desc="Rated Voltage"/>
			<DO name="HzRtg" type="NR_ASG_SP_Set_F_ED2_V1.00" desc="Rated frequency"/>
			<DO name="AngCor" type="NR_ASG_SE_F_ED2_V1.00" desc="Voltage phasor angle correction of external voltage transformer"/>
			<DO name="VRtgSnd" type="NR_ASG_SP_Set_F_EX_ED2_V1.00" desc="Secondary Rated Voltage"/>
			<DO name="LinTVMod" type="NR_SPG_SE_EX_ED2_V1.00" desc="Line TV MODE"/>
			<DO name="VolChB" type="NR_SAV_I_EX_ED2_V1.00" desc="Voltage (sampled value from another channel)"/>
			<DO name="ZroVCalEna" type="NR_SPG_SE_EX_ED2_V1.00" desc="Zero sequence voltage is calculated"/>
			<DO name="LinPTMod" type="NR_SPG_SE_EX_ED2_V1.00" desc="Line PT MODE"/>
		</LNodeType>
		<LNodeType id="NRR_XCBR_ED2_V1.00_S_V1.00" desc="Circuit breaker" lnClass="XCBR" iedType="PCS-S">
			<DO name="NamPlt" type="NR_LPL_ED2_V1.00" desc="Name Plate"/>
			<DO name="Beh" type="NR_ENS_Beh_ED2_V1.00" desc="Behaviour"/>
			<DO name="Health" type="NR_ENS_Health_ED2_V1.00" desc="Health"/>
			<DO name="Blk" type="NR_SPS_ED2_V1.00" desc="Dynamic blocking of function described by the LN"/>
			<DO name="Mod" type="NR_ENC_Mod_ED2_V1.00" desc="Mode"/>
			<DO name="CmdBlk" type="NR_SPC_ED2_V1.00" desc="Blocking of control sequences and action triggers of controllable data"/>
			<DO name="EEName" type="NR_DPL_ED2_V1.00" desc="External equipment name plate"/>
			<DO name="EEHealth" type="NR_ENS_EEHealth_ED2_V1.00" desc="External equipment health"/>
			<DO name="LocKey" type="NR_SPS_ED2_V1.00" desc="Local or remote key (local means without substation automation communication, hardwired direct control)"/>
			<DO name="Loc" type="NR_SPS_ED2_V1.00" desc="Local operation (local means without substatcommunication, hardwired direct control) ion automation"/>
			<DO name="OpCnt" type="NR_INS_ED2_V1.00" desc="Operation counter"/>
			<DO name="CBOpCap" type="NR_ENS_CBOpCap_ED2_V1.00" desc="Circuit breaker operating capability"/>
			<DO name="POWCap" type="NR_ENS_POWCap_ED2_V1.00" desc="Point on wave switching capability"/>
			<DO name="MaxOpCap" type="NR_INS_ED2_V1.00" desc="Circuit breaker operating capability when fully charged"/>
			<DO name="Dsc" type="NR_SPS_ED2_V1.00" desc="Discrepancy"/>
			<DO name="SumSwARs" type="NR_BCR_ED2_V1.00" desc="Sum of switched amperes, resettable"/>
			<DO name="LocSta" type="NR_SPC_ED2_V1.00" desc="Switching authority at station level"/>
			<DO name="Pos" type="NR_DPC_ED2_V1.00" desc="Switch position"/>
			<DO name="BlkOpn" type="NR_SPC_ED2_V1.00" desc="Block opening"/>
			<DO name="BlkCls" type="NR_SPC_ED2_V1.00" desc="Block closing"/>
			<DO name="ChaMotEna" type="NR_SPC_ED2_V1.00" desc="Charger motor enabled"/>
			<DO name="CBTmms" type="NR_ING_SP_Set_ED2_V1.00" desc="Closing time of breaker"/>
		</LNodeType>
		<DOType id="NR_ACT_EX_ED2_V1.00" cdc="ACT">
			<DA name="general" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="originSrc" bType="Struct" type="NR_Originator_ED2_V1.00" fc="ST"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DOType id="NR_ACT_3P_ED2_V1.00" cdc="ACT">
			<DA name="general" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="phsA" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="phsB" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="phsC" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="neut" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="originSrc" bType="Struct" type="NR_Originator_ED2_V1.00" fc="ST"/>
			<DA name="operTmPhsA" bType="Timestamp" fc="ST"/>
			<DA name="operTmPhsB" bType="Timestamp" fc="ST"/>
			<DA name="operTmPhsC" bType="Timestamp" fc="ST"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ACT_3P_EX_ED2_V1.00" cdc="ACT">
			<DA name="general" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="phsA" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="phsB" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="phsC" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="neut" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="originSrc" bType="Struct" type="NR_Originator_ED2_V1.00" fc="ST"/>
			<DA name="operTmPhsA" bType="Timestamp" fc="ST"/>
			<DA name="operTmPhsB" bType="Timestamp" fc="ST"/>
			<DA name="operTmPhsC" bType="Timestamp" fc="ST"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DOType id="NR_ACD_ED2_V1.00" cdc="ACD">
			<DA name="general" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="dirGeneral" bType="Enum" type="FaultDirectionKind" dchg="true" fc="ST"/>
			<DA name="phsA" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="dirPhsA" bType="Enum" type="PhaseFaultDirectionKind" dchg="true" fc="ST"/>
			<DA name="phsB" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="dirPhsB" bType="Enum" type="PhaseFaultDirectionKind" dchg="true" fc="ST"/>
			<DA name="phsC" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="dirPhsC" bType="Enum" type="PhaseFaultDirectionKind" dchg="true" fc="ST"/>
			<DA name="neut" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="dirNeut" bType="Enum" type="PhaseFaultDirectionKind" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ASG_SP_Set_F_ED2_V1.00" cdc="ASG">
			<DA name="setMag" bType="Struct" type="NR_AnalogueValue_F_Set_ED2_V1.00" dchg="true" fc="SP"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="sVC" bType="Struct" type="NR_ScaledValueConfig_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="minVal" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="maxVal" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="stepSize" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ASG_SP_Set_F_EX_ED2_V1.00" cdc="ASG">
			<DA name="setMag" bType="Struct" type="NR_AnalogueValue_F_Set_ED2_V1.00" dchg="true" fc="SP"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="sVC" bType="Struct" type="NR_ScaledValueConfig_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="minVal" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="maxVal" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="stepSize" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DOType id="NR_ASG_SE_F_ED2_V1.00" cdc="ASG">
			<DA name="setMag" bType="Struct" type="NR_AnalogueValue_F_ED2_V1.00" fc="SE"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="sVC" bType="Struct" type="NR_ScaledValueConfig_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="minVal" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="maxVal" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="stepSize" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ASG_SE_F_EX_ED2_V1.00" cdc="ASG">
			<DA name="setMag" bType="Struct" type="NR_AnalogueValue_F_ED2_V1.00" fc="SE"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="sVC" bType="Struct" type="NR_ScaledValueConfig_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="minVal" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="maxVal" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="stepSize" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DOType id="NR_BCR_ED2_V1.00" cdc="BCR">
			<DA name="actVal" bType="INT64" dchg="true" fc="ST"/>
			<DA name="frVal" bType="INT64" dupd="true" fc="ST"/>
			<DA name="frTm" bType="Timestamp" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="pulsQty" bType="FLOAT32" valKind="RO" dchg="true" fc="CF"/>
			<DA name="frEna" bType="BOOLEAN" valKind="RO" dchg="true" fc="CF"/>
			<DA name="strTm" bType="Timestamp" valKind="RO" dchg="true" fc="CF"/>
			<DA name="frPd" bType="INT32" valKind="RO" dchg="true" fc="CF"/>
			<DA name="frRs" bType="BOOLEAN" valKind="RO" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_DPL_ED2_V1.00" cdc="DPL">
			<DA name="vendor" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="hwRev" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="swRev" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="serNum" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="model" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="location" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="name" bType="VisString64" valKind="RO" fc="DC"/>
			<DA name="owner" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="ePSName" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="primeOper" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="secondOper" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="latitude" bType="FLOAT32" valKind="RO" fc="DC"/>
			<DA name="longitude" bType="FLOAT32" valKind="RO" fc="DC"/>
			<DA name="altitude" bType="FLOAT32" valKind="RO" fc="DC"/>
			<DA name="mRID" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_DPC_ED2_V1.00" cdc="DPC">
			<DA name="SBO" bType="VisString129" fc="CO">
				<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
			</DA>
			<DA name="SBOw" bType="Struct" type="NR_SBOw_Oper_SDPC_ED2_V1.00" fc="CO"/>
			<DA name="Oper" bType="Struct" type="NR_SBOw_Oper_SDPC_ED2_V1.00" fc="CO"/>
			<DA name="Cancel" bType="Struct" type="NR_Cancel_SDPC_ED2_V1.00" fc="CO"/>
			<DA name="origin" bType="Struct" type="NR_Originator_ED2_V1.00" fc="ST"/>
			<DA name="ctlNum" bType="INT8U" fc="ST"/>
			<DA name="stVal" bType="Dbpos" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="stSeld" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="opRcvd" bType="BOOLEAN" dchg="true" fc="OR"/>
			<DA name="opOk" bType="BOOLEAN" dchg="true" fc="OR"/>
			<DA name="tOpOk" bType="Timestamp" fc="OR"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="Dbpos" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="pulseConfig" bType="Struct" type="NR_PulseConfig_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="ctlModel" bType="Enum" valKind="Set" type="CtlModelKind" dchg="true" fc="CF"/>
			<DA name="sboTimeout" bType="INT32U" valKind="Set" dchg="true" fc="CF"/>
			<DA name="sboClass" bType="Enum" valKind="RO" type="SboClassKind" dchg="true" fc="CF">
				<Val>operate-once</Val>
			</DA>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ENG_ClcMth_SP_Set_ED2_V1.00" cdc="ENG">
			<DA name="setVal" bType="Enum" valKind="Set" type="ClcMthKind" dchg="true" fc="SP"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ENG_ClcMod_SP_Set_ED2_V1.00" cdc="ENG">
			<DA name="setVal" bType="Enum" valKind="Set" type="ClcModKind" dchg="true" fc="SP"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ENG_ClcIntvTyp_SP_Set_ED2_V1.00" cdc="ENG">
			<DA name="setVal" bType="Enum" valKind="Set" type="ClcIntvTypKind" dchg="true" fc="SP"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ENG_TrMod_SE_ED2_V1.00" cdc="ENG">
			<DA name="setVal" bType="Enum" type="TrModKind" fc="SE"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ENG_TrgMod_SE_ED2_V1.00" cdc="ENG">
			<DA name="setVal" bType="Enum" type="TrgModKind" fc="SE"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ENG_LevMod_SE_ED2_V1.00" cdc="ENG">
			<DA name="setVal" bType="Enum" type="LevModKind" fc="SE"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ENG_RcdMod_SE_ED2_V1.00" cdc="ENG">
			<DA name="setVal" bType="Enum" type="RcdModKind" fc="SE"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ENS_Beh_ED2_V1.00" cdc="ENS">
			<DA name="stVal" bType="Enum" type="BehKind" dchg="true" dupd="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="Enum" type="BehKind" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ENS_EEHealth_ED2_V1.00" cdc="ENS">
			<DA name="stVal" bType="Enum" type="EEHealthKind" dchg="true" dupd="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="Enum" type="EEHealthKind" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ENS_Health_ED2_V1.00" cdc="ENS">
			<DA name="stVal" bType="Enum" type="HealthKind" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="Enum" type="HealthKind" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ENS_PhyHealth_ED2_V1.00" cdc="ENS">
			<DA name="stVal" bType="Enum" type="PhyHealthKind" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="Enum" type="PhyHealthKind" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ENS_CBOpCap_ED2_V1.00" cdc="ENS">
			<DA name="stVal" bType="Enum" type="CBOpCapKind" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="Enum" type="CBOpCapKind" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ENS_POWCap_ED2_V1.00" cdc="ENS">
			<DA name="stVal" bType="Enum" type="POWCapKind" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="Enum" type="POWCapKind" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ENC_Mod_ED2_V1.00" cdc="ENC">
			<DA name="SBO" bType="VisString129" fc="CO">
				<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
			</DA>
			<DA name="SBOw" bType="Struct" type="NR_SBOw_Oper_ENC_Mod_ED2_V1.00" fc="CO"/>
			<DA name="Oper" bType="Struct" type="NR_SBOw_Oper_ENC_Mod_ED2_V1.00" fc="CO"/>
			<DA name="Cancel" bType="Struct" type="NR_Cancel_ENC_Mod_ED2_V1.00" fc="CO"/>
			<DA name="origin" bType="Struct" type="NR_Originator_ED2_V1.00" fc="ST"/>
			<DA name="ctlNum" bType="INT8U" fc="ST"/>
			<DA name="stVal" bType="Enum" type="ModKind" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="stSeld" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="opRcvd" bType="BOOLEAN" dchg="true" fc="OR"/>
			<DA name="opOk" bType="BOOLEAN" dchg="true" fc="OR"/>
			<DA name="tOpOk" bType="Timestamp" fc="OR"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="Enum" type="ModKind" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="ctlModel" bType="Enum" valKind="Set" type="CtlModelKind" dchg="true" fc="CF"/>
			<DA name="sboTimeout" bType="INT32U" valKind="Set" dchg="true" fc="CF"/>
			<DA name="sboClass" bType="Enum" valKind="RO" type="SboClassKind" dchg="true" fc="CF">
				<Val>operate-once</Val>
			</DA>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_INC_ED2_V1.00" cdc="INC">
			<DA name="SBO" bType="VisString129" fc="CO">
				<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
			</DA>
			<DA name="SBOw" bType="Struct" type="NR_SBOw_Oper_INC_ED2_V1.00" fc="CO"/>
			<DA name="Oper" bType="Struct" type="NR_SBOw_Oper_INC_ED2_V1.00" fc="CO"/>
			<DA name="Cancel" bType="Struct" type="NR_Cancel_INC_ED2_V1.00" fc="CO"/>
			<DA name="origin" bType="Struct" type="NR_Originator_ED2_V1.00" fc="ST"/>
			<DA name="ctlNum" bType="INT8U" fc="ST"/>
			<DA name="stVal" bType="INT32" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="stSeld" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="opRcvd" bType="BOOLEAN" dchg="true" fc="OR"/>
			<DA name="opOk" bType="BOOLEAN" dchg="true" fc="OR"/>
			<DA name="tOpOk" bType="Timestamp" fc="OR"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="INT32" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="ctlModel" bType="Enum" valKind="Set" type="CtlModelKind" dchg="true" fc="CF"/>
			<DA name="sboTimeout" bType="INT32U" valKind="Set" dchg="true" fc="CF"/>
			<DA name="sboClass" bType="Enum" valKind="RO" type="SboClassKind" dchg="true" fc="CF">
				<Val>operate-once</Val>
			</DA>
			<DA name="minVal" bType="INT32" valKind="RO" dchg="true" fc="CF"/>
			<DA name="maxVal" bType="INT32" valKind="RO" dchg="true" fc="CF"/>
			<DA name="stepSize" bType="INT32U" valKind="RO" dchg="true" fc="CF"/>
			<DA name="operTimeout" bType="INT32U" valKind="RO" dchg="true" fc="CF"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ING_SE_ED2_V1.00" cdc="ING">
			<DA name="setVal" bType="INT32" fc="SE"/>
			<DA name="minVal" bType="INT32" valKind="RO" dchg="true" fc="CF"/>
			<DA name="maxVal" bType="INT32" valKind="RO" dchg="true" fc="CF"/>
			<DA name="stepSize" bType="INT32U" valKind="RO" dchg="true" fc="CF"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ING_SE_EX_ED2_V1.00" cdc="ING">
			<DA name="setVal" bType="INT32" fc="SE"/>
			<DA name="minVal" bType="INT32" valKind="RO" dchg="true" fc="CF"/>
			<DA name="maxVal" bType="INT32" valKind="RO" dchg="true" fc="CF"/>
			<DA name="stepSize" bType="INT32U" valKind="RO" dchg="true" fc="CF"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DOType id="NR_ING_SP_Set_ED2_V1.00" cdc="ING">
			<DA name="setVal" bType="INT32" valKind="Set" dchg="true" fc="SP"/>
			<DA name="minVal" bType="INT32" valKind="RO" dchg="true" fc="CF"/>
			<DA name="maxVal" bType="INT32" valKind="RO" dchg="true" fc="CF"/>
			<DA name="stepSize" bType="INT32U" valKind="RO" dchg="true" fc="CF"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ING_SP_Set_EX_ED2_V1.00" cdc="ING">
			<DA name="setVal" bType="INT32" valKind="Set" dchg="true" fc="SP"/>
			<DA name="minVal" bType="INT32" valKind="RO" dchg="true" fc="CF"/>
			<DA name="maxVal" bType="INT32" valKind="RO" dchg="true" fc="CF"/>
			<DA name="stepSize" bType="INT32U" valKind="RO" dchg="true" fc="CF"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DOType id="NR_INS_ED2_V1.00" cdc="INS">
			<DA name="stVal" bType="INT32" dchg="true" dupd="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="INT32" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_INS_EX_ED2_V1.00" cdc="INS">
			<DA name="stVal" bType="INT32" dchg="true" dupd="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="INT32" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DOType id="NR_LPL_LN0_ED2_V1.00" cdc="LPL">
			<DA name="vendor" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="swRev" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="configRev" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="paramRev" bType="INT32" dchg="true" fc="ST"/>
			<DA name="valRev" bType="INT32" dchg="true" fc="ST"/>
			<DA name="ldNs" bType="VisString255" fc="EX">
				<Val>IEC 61850-7-4:2007A</Val>
			</DA>
		</DOType>
		<DOType id="NR_LPL_ED2_V1.00" cdc="LPL">
			<DA name="vendor" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="swRev" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="paramRev" bType="INT32" dchg="true" fc="ST"/>
			<DA name="valRev" bType="INT32" dchg="true" fc="ST"/>
		</DOType>
		<DOType id="NR_MV_F_ED2_V1.00" cdc="MV">
			<DA name="instMag" bType="Struct" type="NR_AnalogueValue_F_ED2_V1.00" fc="MX"/>
			<DA name="mag" bType="Struct" type="NR_AnalogueValue_F_ED2_V1.00" dchg="true" dupd="true" fc="MX"/>
			<DA name="range" bType="Enum" type="RangeKind" dchg="true" fc="MX"/>
			<DA name="q" bType="Quality" qchg="true" fc="MX"/>
			<DA name="t" bType="Timestamp" fc="MX"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subMag" bType="Struct" type="NR_AnalogueValue_F_ED2_V1.00" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="db" bType="INT32U" valKind="RO" dchg="true" fc="CF"/>
			<DA name="zeroDb" bType="INT32U" valKind="RO" dchg="true" fc="CF"/>
			<DA name="sVC" bType="Struct" type="NR_ScaledValueConfig_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="rangeC" bType="Struct" type="NR_RangeConfig_F_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="smpRate" bType="INT32U" valKind="RO" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_MV_F_EX_ED2_V1.00" cdc="MV">
			<DA name="instMag" bType="Struct" type="NR_AnalogueValue_F_ED2_V1.00" fc="MX"/>
			<DA name="mag" bType="Struct" type="NR_AnalogueValue_F_ED2_V1.00" dchg="true" dupd="true" fc="MX"/>
			<DA name="range" bType="Enum" type="RangeKind" dchg="true" fc="MX"/>
			<DA name="q" bType="Quality" qchg="true" fc="MX"/>
			<DA name="t" bType="Timestamp" fc="MX"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subMag" bType="Struct" type="NR_AnalogueValue_F_ED2_V1.00" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="db" bType="INT32U" valKind="RO" dchg="true" fc="CF"/>
			<DA name="zeroDb" bType="INT32U" valKind="RO" dchg="true" fc="CF"/>
			<DA name="sVC" bType="Struct" type="NR_ScaledValueConfig_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="rangeC" bType="Struct" type="NR_RangeConfig_F_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="smpRate" bType="INT32U" valKind="RO" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DOType id="NR_ORG_SP_Set_ED2_V1.00" cdc="ORG">
			<DA name="setSrcRef" bType="ObjRef" valKind="Set" dchg="true" fc="SP"/>
			<DA name="setTstRef" bType="ObjRef" valKind="Set" dchg="true" fc="SP"/>
			<DA name="setSrcCB" bType="ObjRef" valKind="Set" dchg="true" fc="SP"/>
			<DA name="setTstCB" bType="ObjRef" valKind="Set" dchg="true" fc="SP"/>
			<DA name="intAddr" bType="VisString255" valKind="Set" dchg="true" fc="SP"/>
			<DA name="tstEna" bType="BOOLEAN" valKind="Set" dchg="true" fc="SP"/>
			<DA name="purpose" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_ORG_SP_RO_ED2_V1.00" cdc="ORG">
			<DA name="setSrcRef" bType="ObjRef" valKind="RO" dchg="true" fc="SP"/>
			<DA name="setTstRef" bType="ObjRef" valKind="RO" dchg="true" fc="SP"/>
			<DA name="setSrcCB" bType="ObjRef" valKind="RO" dchg="true" fc="SP"/>
			<DA name="setTstCB" bType="ObjRef" valKind="RO" dchg="true" fc="SP"/>
			<DA name="intAddr" bType="VisString255" valKind="RO" dchg="true" fc="SP"/>
			<DA name="tstEna" bType="BOOLEAN" valKind="RO" dchg="true" fc="SP"/>
			<DA name="purpose" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_SAV_I_ED2_V1.00" cdc="SAV">
			<DA name="instMag" bType="Struct" type="NR_AnalogueValue_I_ED2_V1.00" fc="MX"/>
			<DA name="q" bType="Quality" qchg="true" fc="MX"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="sVC" bType="Struct" type="NR_ScaledValueConfig_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="min" bType="Struct" type="NR_AnalogueValue_I_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="max" bType="Struct" type="NR_AnalogueValue_I_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_SAV_I_EX_ED2_V1.00" cdc="SAV">
			<DA name="instMag" bType="Struct" type="NR_AnalogueValue_I_ED2_V1.00" fc="MX"/>
			<DA name="q" bType="Quality" qchg="true" fc="MX"/>
			<DA name="units" bType="Struct" type="NR_units_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="sVC" bType="Struct" type="NR_ScaledValueConfig_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="min" bType="Struct" type="NR_AnalogueValue_I_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="max" bType="Struct" type="NR_AnalogueValue_I_RO_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DOType id="NR_SPC_ED2_V1.00" cdc="SPC">
			<DA name="SBO" bType="VisString129" fc="CO">
				<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
			</DA>
			<DA name="SBOw" bType="Struct" type="NR_SBOw_Oper_SDPC_ED2_V1.00" fc="CO"/>
			<DA name="Oper" bType="Struct" type="NR_SBOw_Oper_SDPC_ED2_V1.00" fc="CO"/>
			<DA name="Cancel" bType="Struct" type="NR_Cancel_SDPC_ED2_V1.00" fc="CO"/>
			<DA name="origin" bType="Struct" type="NR_Originator_ED2_V1.00" fc="ST"/>
			<DA name="ctlNum" bType="INT8U" fc="ST"/>
			<DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="stSeld" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="opRcvd" bType="BOOLEAN" dchg="true" fc="OR"/>
			<DA name="opOk" bType="BOOLEAN" dchg="true" fc="OR"/>
			<DA name="tOpOk" bType="Timestamp" fc="OR"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="BOOLEAN" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="pulseConfig" bType="Struct" type="NR_PulseConfig_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="ctlModel" bType="Enum" valKind="Set" type="CtlModelKind" dchg="true" fc="CF"/>
			<DA name="sboTimeout" bType="INT32U" valKind="Set" dchg="true" fc="CF"/>
			<DA name="sboClass" bType="Enum" valKind="RO" type="SboClassKind" dchg="true" fc="CF">
				<Val>operate-once</Val>
			</DA>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_SPC_EX_ED2_V1.00" cdc="SPC">
			<DA name="SBO" bType="VisString129" fc="CO">
				<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
			</DA>
			<DA name="SBOw" bType="Struct" type="NR_SBOw_Oper_SDPC_ED2_V1.00" fc="CO"/>
			<DA name="Oper" bType="Struct" type="NR_SBOw_Oper_SDPC_ED2_V1.00" fc="CO"/>
			<DA name="Cancel" bType="Struct" type="NR_Cancel_SDPC_ED2_V1.00" fc="CO"/>
			<DA name="origin" bType="Struct" type="NR_Originator_ED2_V1.00" fc="ST"/>
			<DA name="ctlNum" bType="INT8U" fc="ST"/>
			<DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="stSeld" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="opRcvd" bType="BOOLEAN" dchg="true" fc="OR"/>
			<DA name="opOk" bType="BOOLEAN" dchg="true" fc="OR"/>
			<DA name="tOpOk" bType="Timestamp" fc="OR"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="BOOLEAN" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="pulseConfig" bType="Struct" type="NR_PulseConfig_ED2_V1.00" dchg="true" fc="CF"/>
			<DA name="ctlModel" bType="Enum" valKind="Set" type="CtlModelKind" dchg="true" fc="CF"/>
			<DA name="sboTimeout" bType="INT32U" valKind="Set" dchg="true" fc="CF"/>
			<DA name="sboClass" bType="Enum" valKind="RO" type="SboClassKind" dchg="true" fc="CF">
				<Val>operate-once</Val>
			</DA>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DOType id="NR_SPG_SP_Set_ED2_V1.00" cdc="SPG">
			<DA name="setVal" bType="BOOLEAN" valKind="Set" dchg="true" fc="SP"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_SPG_SP_Set_EX_ED2_V1.00" cdc="SPG">
			<DA name="setVal" bType="BOOLEAN" valKind="Set" dchg="true" fc="SP"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DOType id="NR_SPG_SE_ED2_V1.00" cdc="SPG">
			<DA name="setVal" bType="BOOLEAN" fc="SE"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_SPG_SE_EX_ED2_V1.00" cdc="SPG">
			<DA name="setVal" bType="BOOLEAN" fc="SE"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DOType id="NR_SPS_ED2_V1.00" cdc="SPS">
			<DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="BOOLEAN" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
		</DOType>
		<DOType id="NR_SPS_EX_ED2_V1.00" cdc="SPS">
			<DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="subEna" bType="BOOLEAN" fc="SV"/>
			<DA name="subVal" bType="BOOLEAN" fc="SV"/>
			<DA name="subQ" bType="Quality" fc="SV"/>
			<DA name="subID" bType="VisString64" fc="SV"/>
			<DA name="blkEna" bType="BOOLEAN" fc="BL"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DOType id="NR_VSG_SP_Set_EX_ED2_V1.00" cdc="VSG">
			<DA name="setVal" bType="VisString255" valKind="Set" dchg="true" fc="SP"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DOType id="NR_VSG_SE_EX_ED2_V1.00" cdc="VSG">
			<DA name="setVal" bType="VisString255" fc="SE"/>
			<DA name="d" bType="VisString255" valKind="RO" fc="DC"/>
			<DA name="dataNs" bType="VisString255" fc="EX">
				<Val>NRECExtension:2010A</Val>
			</DA>
		</DOType>
		<DAType id="NR_AnalogueValue_F_ED2_V1.00">
			<BDA name="f" bType="FLOAT32"/>
		</DAType>
		<DAType id="NR_AnalogueValue_F_Set_ED2_V1.00">
			<BDA name="f" bType="FLOAT32" valKind="Set"/>
		</DAType>
		<DAType id="NR_AnalogueValue_F_RO_ED2_V1.00">
			<BDA name="f" bType="FLOAT32" valKind="RO"/>
		</DAType>
		<DAType id="NR_AnalogueValue_I_ED2_V1.00">
			<BDA name="i" bType="INT32"/>
		</DAType>
		<DAType id="NR_AnalogueValue_I_RO_ED2_V1.00">
			<BDA name="i" bType="INT32" valKind="RO"/>
		</DAType>
		<DAType id="NR_ScaledValueConfig_ED2_V1.00">
			<BDA name="scaleFactor" bType="FLOAT32" valKind="RO"/>
			<BDA name="offset" bType="FLOAT32" valKind="RO"/>
		</DAType>
		<DAType id="NR_RangeConfig_F_ED2_V1.00">
			<BDA name="hhLim" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00"/>
			<BDA name="hLim" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00"/>
			<BDA name="lLim" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00"/>
			<BDA name="llLim" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00"/>
			<BDA name="min" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00"/>
			<BDA name="max" bType="Struct" type="NR_AnalogueValue_F_RO_ED2_V1.00"/>
		</DAType>
		<DAType id="NR_units_ED2_V1.00">
			<BDA name="SIUnit" bType="Enum" valKind="RO" type="SIUnitKind"/>
			<BDA name="multiplier" bType="Enum" valKind="RO" type="MultiplierKind"/>
		</DAType>
		<DAType id="NR_PulseConfig_ED2_V1.00">
			<BDA name="cmdQual" bType="Enum" valKind="RO" type="ControlOutputKind"/>
			<BDA name="onDur" bType="INT32U" valKind="RO"/>
			<BDA name="offDur" bType="INT32U" valKind="RO"/>
			<BDA name="numPls" bType="INT32U" valKind="RO"/>
		</DAType>
		<DAType id="NR_Originator_ED2_V1.00">
			<BDA name="orCat" bType="Enum" type="OriginatorCategoryKind"/>
			<BDA name="orIdent" bType="Octet64"/>
		</DAType>
		<DAType id="NR_SBOw_Oper_SDPC_ED2_V1.00">
			<BDA name="ctlVal" bType="BOOLEAN"/>
			<BDA name="origin" bType="Struct" type="NR_Originator_ED2_V1.00"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<BDA name="Check" bType="Check"/>
			<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<DAType id="NR_Cancel_SDPC_ED2_V1.00">
			<BDA name="ctlVal" bType="BOOLEAN"/>
			<BDA name="origin" bType="Struct" type="NR_Originator_ED2_V1.00"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<DAType id="NR_SBOw_Oper_INC_ED2_V1.00">
			<BDA name="ctlVal" bType="INT32"/>
			<BDA name="origin" bType="Struct" type="NR_Originator_ED2_V1.00"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<BDA name="Check" bType="Check"/>
			<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<DAType id="NR_Cancel_INC_ED2_V1.00">
			<BDA name="ctlVal" bType="INT32"/>
			<BDA name="origin" bType="Struct" type="NR_Originator_ED2_V1.00"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<DAType id="NR_SBOw_Oper_ENC_Mod_ED2_V1.00">
			<BDA name="ctlVal" bType="Enum" type="ModKind"/>
			<BDA name="origin" bType="Struct" type="NR_Originator_ED2_V1.00"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<BDA name="Check" bType="Check"/>
			<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<DAType id="NR_Cancel_ENC_Mod_ED2_V1.00">
			<BDA name="ctlVal" bType="Enum" type="ModKind"/>
			<BDA name="origin" bType="Struct" type="NR_Originator_ED2_V1.00"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<EnumType id="BehKind">
			<EnumVal ord="1">on</EnumVal>
			<EnumVal ord="2">blocked</EnumVal>
			<EnumVal ord="3">test</EnumVal>
			<EnumVal ord="4">test/blocked</EnumVal>
			<EnumVal ord="5">off</EnumVal>
		</EnumType>
		<EnumType id="ClcIntvTypKind">
			<EnumVal ord="1">MS</EnumVal>
			<EnumVal ord="2">PER_CYCLE</EnumVal>
			<EnumVal ord="3">CYCLE</EnumVal>
			<EnumVal ord="4">DAY</EnumVal>
			<EnumVal ord="5">WEEK</EnumVal>
			<EnumVal ord="6">MONTH</EnumVal>
			<EnumVal ord="7">YEAR</EnumVal>
			<EnumVal ord="8">EXTERNAL</EnumVal>
		</EnumType>
		<EnumType id="ClcMthKind">
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
		</EnumType>
		<EnumType id="ClcModKind">
			<EnumVal ord="1">TOTAL</EnumVal>
			<EnumVal ord="2">PERIOD</EnumVal>
			<EnumVal ord="3">SLIDING</EnumVal>
		</EnumType>
		<EnumType id="CBOpCapKind">
			<EnumVal ord="1">None</EnumVal>
			<EnumVal ord="2">Open</EnumVal>
			<EnumVal ord="3">Close-Open</EnumVal>
			<EnumVal ord="4">Open-Close-Open</EnumVal>
			<EnumVal ord="5">Close-Open-Close-Open</EnumVal>
			<EnumVal ord="6">Open-Close-Open-Close-Open</EnumVal>
			<EnumVal ord="7">more</EnumVal>
		</EnumType>
		<EnumType id="EEHealthKind">
			<EnumVal ord="1">Ok</EnumVal>
			<EnumVal ord="2">Warning</EnumVal>
			<EnumVal ord="3">Alarm</EnumVal>
		</EnumType>
		<EnumType id="HealthKind">
			<EnumVal ord="1">Ok</EnumVal>
			<EnumVal ord="2">Warning</EnumVal>
			<EnumVal ord="3">Alarm</EnumVal>
		</EnumType>
		<EnumType id="LevModKind">
			<EnumVal ord="1">Positive or Rising</EnumVal>
			<EnumVal ord="2">Negative or Falling</EnumVal>
			<EnumVal ord="3">Both</EnumVal>
			<EnumVal ord="4">Other</EnumVal>
		</EnumType>
		<EnumType id="ModKind">
			<EnumVal ord="1">on</EnumVal>
			<EnumVal ord="2">blocked</EnumVal>
			<EnumVal ord="3">test</EnumVal>
			<EnumVal ord="4">test/blocked</EnumVal>
			<EnumVal ord="5">off</EnumVal>
		</EnumType>
		<EnumType id="PhyHealthKind">
			<EnumVal ord="1">Ok</EnumVal>
			<EnumVal ord="2">Warning</EnumVal>
			<EnumVal ord="3">Alarm</EnumVal>
		</EnumType>
		<EnumType id="POWCapKind">
			<EnumVal ord="1">None</EnumVal>
			<EnumVal ord="2">Close</EnumVal>
			<EnumVal ord="3">Open</EnumVal>
			<EnumVal ord="4">Close and Open</EnumVal>
		</EnumType>
		<EnumType id="RcdModKind">
			<EnumVal ord="1">Overwrite existing values</EnumVal>
			<EnumVal ord="2">Stop when full or saturated</EnumVal>
		</EnumType>
		<EnumType id="TrgModKind">
			<EnumVal ord="1">Internal</EnumVal>
			<EnumVal ord="2">External</EnumVal>
			<EnumVal ord="3">Both</EnumVal>
		</EnumType>
		<EnumType id="TrModKind">
			<EnumVal ord="1">3 phase tripping</EnumVal>
			<EnumVal ord="2">1 or 3 phase tripping</EnumVal>
			<EnumVal ord="3">specific</EnumVal>
			<EnumVal ord="4">1 phase tripping</EnumVal>
		</EnumType>
		<EnumType id="ControlOutputKind">
			<EnumVal ord="0">pulse</EnumVal>
			<EnumVal ord="1">persistent</EnumVal>
		</EnumType>
		<EnumType id="CtlModelKind">
			<EnumVal ord="0">status-only</EnumVal>
			<EnumVal ord="1">direct-with-normal-security</EnumVal>
			<EnumVal ord="2">sbo-with-normal-security</EnumVal>
			<EnumVal ord="3">direct-with-enhanced-security</EnumVal>
			<EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
		</EnumType>
		<EnumType id="SboClassKind">
			<EnumVal ord="0">operate-once</EnumVal>
			<EnumVal ord="1">operate-many</EnumVal>
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
		<EnumType id="FaultDirectionKind">
			<EnumVal ord="0">unknown</EnumVal>
			<EnumVal ord="1">forward</EnumVal>
			<EnumVal ord="2">backward</EnumVal>
			<EnumVal ord="3">both</EnumVal>
		</EnumType>
		<EnumType id="PhaseFaultDirectionKind">
			<EnumVal ord="0">unknown</EnumVal>
			<EnumVal ord="1">forward</EnumVal>
			<EnumVal ord="2">backward</EnumVal>
		</EnumType>
		<EnumType id="RangeKind">
			<EnumVal ord="0">normal</EnumVal>
			<EnumVal ord="1">high</EnumVal>
			<EnumVal ord="2">low</EnumVal>
			<EnumVal ord="3">high-high</EnumVal>
			<EnumVal ord="4">low-low</EnumVal>
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
			<EnumVal ord="0"/>
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
		<EnumType id="SIUnitKind">
			<EnumVal ord="1"/>
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
		</EnumType>
	</DataTypeTemplates>
</SCL>