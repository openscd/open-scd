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
			<Bay name="COUPLING_BAY" desc="Bay">
				<LNode iedName="IED2" ldInst="CBSW" lnClass="LPHD" lnInst="1"/>
				<LNode iedName="IED2" ldInst="CBSW" lnClass="XSWI" lnInst="3"/>
				<ConductingEquipment type="CBR" name="QA1" desc="coupling field ciscuit breaker"/>
				<ConductingEquipment type="DIS" name="QB1" desc="busbar disconnector QB1">
					<LNode iedName="IED2" ldInst="CBSW" lnClass="XSWI" lnInst="2"/>
				</ConductingEquipment>
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
			<Bay name="Bay2" desc="Bay2">
			</Bay>
		</VoltageLevel>
		<VoltageLevel name="J1" desc="Voltage Level">
			<Voltage unit="V" multiplier="k">20</Voltage>
			<Bay name="Bay1" desc="Bay1">
			</Bay>
		</VoltageLevel>
	</Substation>
	<Communication>
		<SubNetwork name="StationBus" desc="desc" type="8-MMS">
			<BitRate unit="b/s">100.0</BitRate>
			<ConnectedAP iedName="IED1" apName="P1">
				<Address>
					<P type="IP">192.168.210.111</P>
					<P type="IP-SUBNET">255.255.255.0</P>
					<P type="IP-GATEWAY">192.168.210.1</P>
					<P type="OSI-AP-Title">1,3,9999,23</P>
					<P type="OSI-AE-Qualifier">23</P>
					<P type="OSI-PSEL">00000001</P>
					<P type="OSI-SSEL">0001</P>
					<P type="OSI-TSEL">0001</P>
				</Address>
			</ConnectedAP>
		</SubNetwork>
		<SubNetwork name="ProcessBus" type="8-MMS">
			<ConnectedAP iedName="IED2" apName="P1">
				<Address>
					<P type="IP">192.168.0.111</P>
					<P type="IP-SUBNET">255.255.255.0</P>
					<P type="IP-GATEWAY">192.168.210.1</P>
					<P type="OSI-AP-Title">1,3,9999,23</P>
					<P type="OSI-AE-Qualifier">23</P>
					<P type="OSI-PSEL">00000001</P>
					<P type="OSI-SSEL">0001</P>
					<P type="OSI-TSEL">0001</P>
				</Address>
			</ConnectedAP>
		</SubNetwork>
	</Communication>
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
			<LN prefix="DC" lnClass="CILO" inst="1" lnType="Dummy.CILO"/>
			<Server>
				<Authentication none="true" />
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
							<IEDName apRef="P1" ldInst="CircuitBreaker_CB1" lnClass="CSWI">IED2</IEDName>
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
					<LN lnClass="CSWI" inst="1" lnType="Dummy.CSWIwithoutCtlModel">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
						</DOI>
					</LN>
					<LN prefix="CB" lnClass="XCBR" inst="2" lnType="Dummy.XCBR1">						
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
					</LN>
					<LN prefix="CB" lnClass="CSWI" inst="2" lnType="Dummy.CSWIwithoutCtlModel">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
						</DOI>
					</LN>
				</LDevice>
				<LDevice inst="Disconnectors">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="DC" lnClass="XSWI" inst="1" lnType="Dummy.XSWI1">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
						<Inputs>
							<ExtRef iedName="IED3" ldInst="MU01" prefix="I01A" lnClass="TCTR" lnInst="1" doName="Amp" daName="instMag.i" serviceType="SMV" srcLDInst="MU01" srcCBName="MSVCB01"/>
							<ExtRef iedName="IED3" ldInst="MU01" prefix="I01A" lnClass="TCTR" lnInst="1" doName="Amp" daName="q" serviceType="SMV" srcLDInst="MU01" srcCBName="MSVCB01"/>
							<ExtRef iedName="IED3" ldInst="MU01" prefix="I01B" lnClass="TCTR" lnInst="2" doName="Amp" daName="instMag.i" serviceType="SMV" srcLDInst="MU01" srcCBName="MSVCB01"/>
							<ExtRef iedName="IED3" ldInst="MU01" prefix="I01B" lnClass="TCTR" lnInst="2" doName="Amp" daName="q" serviceType="SMV" srcLDInst="MU01" srcCBName="MSVCB01"/>
							<ExtRef iedName="IED3" ldInst="MU01" prefix="I01C" lnClass="TCTR" lnInst="3" doName="Amp" daName="instMag.i" serviceType="SMV" srcLDInst="MU01" srcCBName="MSVCB01"/>
							<ExtRef iedName="IED3" ldInst="MU01" prefix="I01C" lnClass="TCTR" lnInst="3" doName="Amp" daName="q" serviceType="SMV" srcLDInst="MU01" srcCBName="MSVCB01"/>
							<ExtRef iedName="IED3" ldInst="MU01" prefix="I01N" lnClass="TCTR" lnInst="4" doName="Amp" daName="instMag.i" serviceType="SMV" srcLDInst="MU01" srcCBName="MSVCB01"/>
							<ExtRef iedName="IED3" ldInst="MU01" prefix="I01N" lnClass="TCTR" lnInst="4" doName="Amp" daName="q" serviceType="SMV" srcLDInst="MU01" srcCBName="MSVCB01"/>
							<ExtRef iedName="IED3" ldInst="MU01" prefix="U01A" lnClass="TVTR" lnInst="1" doName="Vol" daName="instMag.i" serviceType="SMV" srcLDInst="MU01" srcCBName="MSVCB01"/>
							<ExtRef iedName="IED3" ldInst="MU01" prefix="U01A" lnClass="TVTR" lnInst="1" doName="Vol" daName="q" serviceType="SMV" srcLDInst="MU01" srcCBName="MSVCB01"/>
							<ExtRef iedName="IED3" ldInst="MU01" prefix="U01B" lnClass="TVTR" lnInst="2" doName="Vol" daName="instMag.i" serviceType="SMV" srcLDInst="MU01" srcCBName="MSVCB01"/>
							<ExtRef iedName="IED3" ldInst="MU01" prefix="U01B" lnClass="TVTR" lnInst="2" doName="Vol" daName="q" serviceType="SMV" srcLDInst="MU01" srcCBName="MSVCB01"/>
							<ExtRef iedName="IED3" ldInst="MU01" prefix="U01C" lnClass="TVTR" lnInst="3" doName="Vol" daName="instMag.i" serviceType="SMV" srcLDInst="MU01" srcCBName="MSVCB01"/>
							<ExtRef iedName="IED3" ldInst="MU01" prefix="U01C" lnClass="TVTR" lnInst="3" doName="Vol" daName="q" serviceType="SMV" srcLDInst="MU01" srcCBName="MSVCB01"/>
						</Inputs>
					</LN>
					<LN prefix="DC" lnClass="CSWI" inst="1" lnType="Dummy.CSWI">
						<Inputs>
							<ExtRef iedName="IED2" ldInst="CBSW" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" intAddr="./stVal" serviceType="GOOSE" desc="testDesc" pServT="GOOSE" pLN="XSWI" pDO="Pos" pDA="stVal"/>
							<ExtRef iedName="IED2" ldInst="CBSW" lnClass="XSWI" lnInst="2" doName="Pos" daName="q" intAddr="./q"/>
						</Inputs>
					</LN>
					<LN prefix="DC" lnClass="CILO" inst="1" lnType="Dummy.CILO"/>
					<LN lnClass="XSWI" inst="3" lnType="Dummy.XSWI1">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="CSWI" inst="3" lnType="Dummy.CSWI"/>
					<LN lnClass="CILO" inst="3" lnType="Dummy.CILO"/>
					<LN lnClass="XSWI" inst="2" lnType="Dummy.XSWI1">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="CSWI" inst="2" lnType="Dummy.CSWIwithoutCtlModel">
						<DOI name="Pos">
							<DAI name="ctlModel">
								<Val>sbo-with-normal-security</Val>
							</DAI>
						</DOI>
					</LN>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
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
						</DataSet>
						<GSEControl type="GOOSE" appID="0002" fixedOffs="false" confRev="1" name="GCB" datSet="GooseDataSet1">
						</GSEControl>
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
						<ReportControl rptID="IED2/CBSW/XSWI1/SwitchGearBRCB" confRev="9" buffered="true" bufTime="100" indexed="true" intgPd="0" name="ReportEmpty" datSet="dataSet">
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
						<ReportControl rptID="IED2/CBSW/XSWI/SwitchGearBRCB" confRev="9" buffered="true" bufTime="100" indexed="true" intgPd="0" name="ReportCb" datSet="dataSet">
							<TrgOps dchg="true" qchg="true" dupd="false" period="false" gi="true"/>
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="false" entryID="false" configRef="true" bufOvfl="false"/>
							<RptEnabled max="5">
								<ClientLN apRef="P1" ldInst="LD0" prefix="DC" lnClass="CILO" lnInst="1" iedName="IED1"/>
								<ClientLN apRef="P1" ldInst="Disconnectors" lnClass="LLN0" iedName="IED1"/>
								<ClientLN apRef="P1" ldInst="CircuitBreaker_CB1" lnClass="XCBR" lnInst="1" iedName="IED1"/>
								<ClientLN apRef="P1" ldInst="CircuitBreaker_CB1" lnClass="CSWI" lnInst="1" iedName="IED1"/>
							</RptEnabled>
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
			<ConfReportControl bufConf="false" max="10"/>
			<GetCBValues />
			<ReportSettings rptID="Dyn" optFields="Dyn" bufTime="Dyn" trgOps="Dyn" intgPd="Dyn" resvTms="true" owner="true" />
			<GOOSE max="1" />
			<GSSE max="0" />
			<ConfLNs fixPrefix="true" fixLnInst="true" />
		</Services>
		<AccessPoint name="P1">
			<Server>
				<Authentication none="true" />
				<LDevice inst="MU01">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
						<Private type="dummyType">
							<esld:ExtRef xmlns:esld="http://www.dummyURL.com/dummyNS" ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" fc="ST"/>
						</Private>
						<DataSet name="PhsMeas1">
                            <FCDA ldInst="MU01" prefix="I01A" lnClass="TCTR" lnInst="1" doName="Amp" daName="instMag.i" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="I01A" lnClass="TCTR" lnInst="1" doName="Amp" daName="q" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="I01B" lnClass="TCTR" lnInst="2" doName="Amp" daName="instMag.i" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="I01B" lnClass="TCTR" lnInst="2" doName="Amp" daName="q" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="I01C" lnClass="TCTR" lnInst="3" doName="Amp" daName="instMag.i" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="I01C" lnClass="TCTR" lnInst="3" doName="Amp" daName="q" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="I01N" lnClass="TCTR" lnInst="4" doName="Amp" daName="instMag.i" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="I01N" lnClass="TCTR" lnInst="4" doName="Amp" daName="q" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="U01A" lnClass="TVTR" lnInst="1" doName="Vol" daName="instMag.i" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="U01A" lnClass="TVTR" lnInst="1" doName="Vol" daName="q" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="U01B" lnClass="TVTR" lnInst="2" doName="Vol" daName="instMag.i" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="U01B" lnClass="TVTR" lnInst="2" doName="Vol" daName="q" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="U01C" lnClass="TVTR" lnInst="3" doName="Vol" daName="instMag.i" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="U01C" lnClass="TVTR" lnInst="3" doName="Vol" daName="q" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="U01N" lnClass="TVTR" lnInst="4" doName="Vol" daName="instMag.i" fc="MX"/>
                            <FCDA ldInst="MU01" prefix="U01N" lnClass="TVTR" lnInst="4" doName="Vol" daName="q" fc="MX"/>
                        </DataSet>
						<SampledValueControl smvID="IED3_SMVID" multicast="true" smpRate="80" nofASDU="1" confRev="1" name="MSVCB01" datSet="PhsMeas1">
							<SmvOpts/>
							<IEDName apRef="P1" ldInst="Disconnectors" prefix="DC" lnClass="XSWI" lnInst="1">IED1</IEDName>
						</SampledValueControl>
					</LN0>
                    <LN prefix="I01A" lnClass="TCTR" inst="1" lnType="DummyTCTR" />
                    <LN prefix="I01B" lnClass="TCTR" inst="2" lnType="DummyTCTR" />
                    <LN prefix="I01C" lnClass="TCTR" inst="3" lnType="DummyTCTR" />
                    <LN prefix="I01N" lnClass="TCTR" inst="4" lnType="DummyTCTR" />
                    <LN prefix="U01A" lnClass="TVTR" inst="1" lnType="DummyTVTR" />
                    <LN prefix="U01B" lnClass="TVTR" inst="2" lnType="DummyTVTR" />
                    <LN prefix="U01C" lnClass="TVTR" inst="3" lnType="DummyTVTR" />
                    <LN prefix="U01N" lnClass="TVTR" inst="4" lnType="DummyTVTR" />
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
        <DOType cdc="WYE" id="Dummy.WYE">
            <SDO name="phsA" type="Dummy.CMV"/>
            <SDO name="phsB" type="Dummy.CMV"/>
            <SDO name="phsC" type="Dummy.CMV"/>
            <DA  name="dataNs" bType="VisString255" fc="EX"/>
        </DOType>
        <DOType cdc="CMV" id="Dummy.CMV">
            <DA name="instCVal" bType="Struct" fc="MX" type="Dummy.Vector"/>
            <DA name="cVal" bType="Struct" dchg="true" fc="MX" type="Dummy.Vector"/>
            <DA name="q" bType="Quality" qchg="true" fc="MX" />
            <DA name="t" bType="Timestamp" fc="MX"/>
            <DA name="units" bType="Struct" dchg="true" fc="CF" type="Dummy.Units"/>
            <DA name="db" bType="INT32U" dchg="true" fc="CF" valKind="Set"/>
            <DA name="dbAng" bType="INT32U" dchg="true" fc="CF" valKind="Set"/>
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
        <DAType id="Dummy.Vector">
            <BDA name="mag" bType="Struct" type="Dummy.Units"/>
            <BDA name="ang" bType="Struct" type="Dummy.Units"/>
        </DAType>
        <DAType id="Dummy.Units">
            <BDA name="SIUnit" bType="Enum" valKind="RO" type="Dummy.SIUnitsKind"/>
            <BDA name="multiplier" bType="Enum" valKind="RO" type="Dummy.MultiplierKind"/>
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
        <EnumType id="Dummy.SIUnitsKind">
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
            <EnumVal ord="1"></EnumVal>
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
        <EnumType id="Dummy.MultiplierKind">
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
            <EnumVal ord="0"></EnumVal>
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
	</DataTypeTemplates>
</SCL>
