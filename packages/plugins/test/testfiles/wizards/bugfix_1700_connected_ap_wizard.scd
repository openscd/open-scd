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
	</DataTypeTemplates>
</SCL>