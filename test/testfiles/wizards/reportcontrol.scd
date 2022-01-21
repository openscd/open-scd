<?xml version="1.0" encoding="UTF-8"?>
<SCL version="2007" revision="B" release="4" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:txy="http://www.iec.ch/61850/2003/Terminal" xmlns:scl="http://www.iec.ch/61850/2003/SCL" xsi:schemaLocation="http://www.iec.ch/61850/2003/SCL SCL.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:IEC_60870_5_104="http://www.iec.ch/61850-80-1/2007/SCL">
	<Header id="TrainingIEC61850" version="1" revision="143" toolID="IEC 61850 System Configurator, Version: V5.90 " nameStructure="IEDName">
		<Text>TrainingIEC61850</Text>
		<History>
			<Hitem version="1" revision="143" when="Wednesday, September 25, 2019 9:11:36 AM" who="Licenced User: OMICRON electronics GmbH JakVog00 Machine: JAKVOG00LW01 User: JakVog00" what="Station is upgraded from IEC 61850 System Configurator, Version: V5.80 HF1 to V5.90 ." why="IEC 61850 System Configurator Automatic Startup: Insert Comment" />
		</History>
	</Header>
	<IED name="IED2" type="DummyIED" manufacturer="DummyManufactorer" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="DummyOwner">
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
			<ConfReportControl max="10" />
			<GetCBValues />
			<ReportSettings rptID="Dyn" optFields="Dyn" bufTime="Dyn" trgOps="Dyn" intgPd="Dyn" resvTms="true" owner="true" />
			<GOOSE max="1" />
			<GSSE max="0" />
			<ConfLNs fixPrefix="true" fixLnInst="true" />
		</Services>
		<AccessPoint name="P1">
			<Server>
				<Authentication />
				<LDevice inst="CBSW">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
						<Private type="dummyType">
							<esld:FCDA xmlns:esld="http://www.dummyURL.com/dummyNS" ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" fc="ST"/>
						</Private>
						<DataSet name="GooseDataSet1">
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="OpSlc.dsd" daName="sasd.ads.asd" fc="ST"/>
						</DataSet>
						<GSEControl type="GOOSE" appID="0002" fixedOffs="false" confRev="1" name="GCB" datSet="GooseDataSet1">
						</GSEControl>
						<ReportControl rptID="reportCb1" confRev="9" buffered="true" bufTime="100" indexed="true" name="ReportCb" datSet="GooseDataSet1">
							<TrgOps dchg="true" qchg="true" dupd="false" period="false" gi="true"/>
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="false" entryID="false" configRef="true" bufOvfl="false"/>
							<RptEnabled max="5">
								<ClientLN apRef="P1" ldInst="CircuitBreaker_CB1" lnClass="XCBR" lnInst="1" iedName="IED1"/>
							</RptEnabled>
						</ReportControl>
						<SampledValueControl smvID="asdfads" multicast="true" smpRate="80" nofASDU="1" confRev="1" name="MSVCB01" datSet="GooseDataSet1">
							<SmvOpts/>
						</SampledValueControl>
					</LN0>
					<LN lnClass="LPHD" inst="1" lnType="Dummy.LPHD1"/>
					<LN lnClass="XCBR" inst="1" lnType="Dummy.XCBR1">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="XSWI" inst="1" lnType="Dummy.XSWI1">
						<DataSet name="dataSet">
                            <FCDA ldInst="CBSW" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                            <FCDA ldInst="CBSW" lnClass="XSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
                        </DataSet>
						<ReportControl rptID="IED2/CBSW/XSWI/SwitchGearBRCB" confRev="9" buffered="true" bufTime="100" indexed="true" intgPd="0" name="ReportCb2" datSet="dataSet">
							<TrgOps dchg="true" qchg="true" dupd="false" period="false" gi="true"/>
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="false" entryID="false" configRef="true" bufOvfl="false"/>
						</ReportControl>
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
						<Inputs>
							<ExtRef iedName="IED1" ldInst="Disconnectors" prefix="DC" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal"/>
							<ExtRef iedName="IED1" ldInst="Disconnectors" prefix="DC" lnClass="XSWI" lnInst="1" doName="Pos" daName="q"/>
						</Inputs>
					</LN>
					<LN lnClass="XSWI" inst="2" lnType="Dummy.XSWI1">
						<DataSet name="dataSet">
							<FCDA ldInst="CBSW" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" lnClass="XSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
						</DataSet>
						<ReportControl rptID="IED2/CBSW/XSWI/SwitchGearBRCB" confRev="9" buffered="true" bufTime="100" indexed="true" intgPd="0" name="ReportCb3" datSet="dataSet">
							<TrgOps dchg="true" qchg="true" dupd="false" period="false" gi="true"/>
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="false" entryID="false" configRef="true" bufOvfl="false"/>
						</ReportControl>
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="XSWI" inst="3" lnType="Dummy.XSWI1">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="GGIO" inst="1" lnType="Dummy.GGIO1"/>
				</LDevice>
				<LDevice inst="CircuitBreaker_CB1">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN lnClass="XCBR" inst="1" lnType="Dummy.XCBR1">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="CSWI" inst="1" lnType="Dummy.CSWIwithoutCtlModel">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>direct-with-enhanced-security</Val>
							</DAI>
						</DOI>
						<Inputs>
							<ExtRef iedName="IED1" ldInst="CircuitBreaker_CB1" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal"/>
							<ExtRef iedName="IED1" ldInst="CircuitBreaker_CB1" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="q"/>
						</Inputs>
					</LN>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<IED name="IED3" type="DummyIED" manufacturer="DummyManufactorer" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="DummyOwner">
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
			<ConfReportControl max="10" />
			<GetCBValues />
			<ReportSettings rptID="Dyn" optFields="Dyn" bufTime="Dyn" trgOps="Dyn" intgPd="Dyn" resvTms="true" owner="true" />
			<GOOSE max="1" />
			<GSSE max="0" />
			<ConfLNs fixPrefix="true" fixLnInst="true" />
		</Services>
		<AccessPoint name="P1">
			<Server>
				<Authentication />
				<LDevice inst="CBSW">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
						<Private type="dummyType">
							<esld:FCDA xmlns:esld="http://www.dummyURL.com/dummyNS" ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" fc="ST"/>
						</Private>
						<DataSet name="GooseDataSet1">
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="OpSlc.dsd" daName="sasd.ads.asd" fc="ST"/>
						</DataSet>
						<GSEControl type="GOOSE" appID="0002" fixedOffs="false" confRev="1" name="GCB" datSet="GooseDataSet1">
						</GSEControl>
						<ReportControl rptID="reportCb1" confRev="9" buffered="true" bufTime="100" indexed="true" name="ReportCb" datSet="GooseDataSet1">
							<TrgOps dchg="true" qchg="true" dupd="false" period="false" gi="true"/>
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="false" entryID="false" configRef="true" bufOvfl="false"/>
							<RptEnabled max="5">
								<ClientLN apRef="P1" ldInst="CircuitBreaker_CB1" lnClass="XCBR" lnInst="1" iedName="IED1"/>
							</RptEnabled>
						</ReportControl>
						<SampledValueControl smvID="asdfads" multicast="true" smpRate="80" nofASDU="1" confRev="1" name="MSVCB01" datSet="GooseDataSet1">
							<SmvOpts/>
						</SampledValueControl>
					</LN0>
					<LN lnClass="LPHD" inst="1" lnType="Dummy.LPHD1"/>
					<LN lnClass="XCBR" inst="1" lnType="Dummy.XCBR1">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="XSWI" inst="1" lnType="Dummy.XSWI1">
						<DataSet name="dataSet">
                            <FCDA ldInst="CBSW" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
                            <FCDA ldInst="CBSW" lnClass="XSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
                        </DataSet>
						<ReportControl rptID="IED2/CBSW/XSWI/SwitchGearBRCB" confRev="9" buffered="true" bufTime="100" indexed="true" intgPd="0" name="ReportCb2" datSet="dataSet">
							<TrgOps dchg="true" qchg="true" dupd="false" period="false" gi="true"/>
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="false" entryID="false" configRef="true" bufOvfl="false"/>
						</ReportControl>
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
						<Inputs>
							<ExtRef iedName="IED1" ldInst="Disconnectors" prefix="DC" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal"/>
							<ExtRef iedName="IED1" ldInst="Disconnectors" prefix="DC" lnClass="XSWI" lnInst="1" doName="Pos" daName="q"/>
						</Inputs>
					</LN>
					<LN lnClass="XSWI" inst="3" lnType="Dummy.XSWI1">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="GGIO" inst="1" lnType="Dummy.GGIO1"/>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
</SCL>
