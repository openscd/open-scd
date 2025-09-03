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
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="12">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="13">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="14">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="15">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="16">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="17">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="18">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="19">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="20">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="21">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="22">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="23">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="24">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="25">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="26">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="27">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="28">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="29">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="30">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="31">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="32">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="33">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="34">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="35">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="36">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="37">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="38">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="39">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="40">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="41">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="42">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="43">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="44">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="45">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="46">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="47">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="48">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="49">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="50">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="51">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="52">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="53">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="54">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="55">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="56">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="57">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="58">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="59">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="60">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="61">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="62">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="63">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="64">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="65">
					</LN>
					<LN lnType="NRR_LGOS_ED2_V1.00_S_V1.00" lnClass="LGOS" inst="66">
					</LN>
					<LN desc="LCCH" lnType="NRR_LCCH_ED2_V1.00_S_V1.00" lnClass="LCCH" inst="1">
					</LN>
					<LN desc="LCCH" lnType="NRR_LCCH_ED2_V1.00_S_V1.00" lnClass="LCCH" inst="3">
					</LN>
					<LN desc="LCCH" lnType="NRR_LCCH_ED2_V1.00_S_V1.00" lnClass="LCCH" inst="4">
					</LN>
				</LDevice>
				<LDevice inst="MU01">
					<LN0 desc="LLN0" lnType="NRR_LLN0_ED2_V1.00_S_V1.00" lnClass="LLN0" inst="">
					</LN0>
					<LN desc="LPHD" lnType="NRR_LPHD_ED2_V1.00_S_V1.00" lnClass="LPHD" inst="1">
					</LN>
					<LN desc="FaultSignal2" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="4">
					</LN>
					<LN desc="FaultSignal3" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="5">
					</LN>
					<LN desc="FaultSignal4" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="6">
					</LN>
					<LN desc="FaultSignal5" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="7">
					</LN>
					<LN desc="FaultSignal6" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="8">
					</LN>
					<LN desc="FaultSignal7" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="9">
					</LN>
					<LN desc="FaultSignal8" lnType="NRR_GGIO_ALM_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="10">
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
					</LN0>
					<LN desc="LPHD" lnType="NRR_LPHD_ED2_V1.00_S_V1.00" lnClass="LPHD" inst="1">
					</LN>
					<LN desc="Record" lnType="NRR_RDRE_ED2_V1.00_S_V1.00" lnClass="RDRE" inst="1">
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
					</LN>
					<LN desc="GOOSE_CB/DCB_Open_Command" lnType="NRR_GGIO_SPC_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="1" prefix="GOIN">
					</LN>
					<LN desc="GOOSE_Bus_Trip_3Ph" lnType="NRR_GGIO_SPC_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="2" prefix="GOIN">
					</LN>
					<LN desc="Buch(Main)" lnType="NRR_GGIO_IND_ED2_V1.00_S_V1.00" lnClass="GGIO" inst="1" prefix="GOOUT">
					</LN>
					<LN desc="CB/DCB_PhA" lnType="NRR_XCBR_ED2_V1.00_S_V1.00" lnClass="XCBR" inst="1" prefix="GOOUT">
					</LN>
					<LN desc="CB/DCB_PhB" lnType="NRR_XCBR_ED2_V1.00_S_V1.00" lnClass="XCBR" inst="2" prefix="GOOUT">
					</LN>
					<LN desc="CB/DCB_PhC" lnType="NRR_XCBR_ED2_V1.00_S_V1.00" lnClass="XCBR" inst="3" prefix="GOOUT">
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