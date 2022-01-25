<?xml version="1.0" encoding="UTF-8"?>
<SCL version="2007" revision="B" release="4" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:txy="http://www.iec.ch/61850/2003/Terminal" xmlns:scl="http://www.iec.ch/61850/2003/SCL" xsi:schemaLocation="http://www.iec.ch/61850/2003/SCL SCL.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:IEC_60870_5_104="http://www.iec.ch/61850-80-1/2007/SCL">
	<Header id="TrainingIEC61850" version="1" revision="143" toolID="IEC 61850 System Configurator, Version: V5.90 " nameStructure="IEDName">
		<Text>TrainingIEC61850</Text>
		<History>
			<Hitem version="1" revision="143" when="Wednesday, September 25, 2019 9:11:36 AM" who="Licenced User: OMICRON electronics GmbH JakVog00 Machine: JAKVOG00LW01 User: JakVog00" what="Station is upgraded from IEC 61850 System Configurator, Version: V5.80 HF1 to V5.90 ." why="IEC 61850 System Configurator Automatic Startup: Insert Comment" />
		</History>
	</Header>
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
				<GSE ldInst="CircuitBreaker_CB1" cbName="GCB">
					<Address>
						<P type="MAC-Address">01-0C-CD-01-00-10</P>
						<P type="VLAN-ID">005</P>
						<P type="VLAN-PRIORITY">4</P>
						<P type="APPID">0010</P>
					</Address>
					<MinTime unit="s" multiplier="m">10</MinTime>
					<MaxTime unit="s" multiplier="m">10000</MaxTime>
				</GSE>
				<GSE ldInst="CircuitBreaker_CB1" cbName="GCB2">
					<MinTime unit="s" multiplier="m">10</MinTime>
					<MaxTime unit="s" multiplier="m">10000</MaxTime>
				</GSE>
				<PhysConn type="RedConn">
					<P type="Plug">RJ45</P>
				</PhysConn>
			</ConnectedAP>
		</SubNetwork>
		<SubNetwork name="ProcessBus" type="8-MMS">
			<ConnectedAP iedName="IED2" apName="P1">
				<Address>
					<P type="IP">192.168.0.112</P>
					<P type="IP-SUBNET">255.255.255.0</P>
					<P type="IP-GATEWAY">192.168.210.1</P>
					<P type="OSI-AP-Title">1,3,9999,23</P>
					<P type="OSI-AE-Qualifier">23</P>
					<P type="OSI-PSEL">00000001</P>
					<P type="OSI-SSEL">0001</P>
					<P type="OSI-TSEL">0001</P>
				</Address>
			</ConnectedAP>
			<ConnectedAP iedName="IED3" apName="P1">
				<Address>
					<P type="IP">192.168.0.113</P>
					<P type="IP-SUBNET">255.255.255.0</P>
					<P type="IP-GATEWAY">192.168.210.1</P>
					<P type="OSI-AP-Title">1,3,9999,23</P>
					<P type="OSI-AE-Qualifier">23</P>
					<P type="OSI-PSEL">00000001</P>
					<P type="OSI-SSEL">0001</P>
					<P type="OSI-TSEL">0001</P>
				</Address>
				<SMV ldInst="MU01" cbName="MSVCB01">
                    <Address>
                        <P type="MAC-Address">01-0C-CD-04-00-20</P>
                        <P type="VLAN-ID">007</P>
                        <P type="VLAN-PRIORITY">4</P>
                        <P type="APPID">4002</P>
                    </Address>
                </SMV>
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
							<SDI name="pulseConfig">
								<DAI name="numPls">
    								<Val>1</Val>
								</DAI>
                            </SDI>
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
					</LN>
					<LN prefix="DC" lnClass="CSWI" inst="1" lnType="Dummy.CSWI">
						<Inputs>
							<ExtRef iedName="IED2" ldInst="CBSW" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" serviceType="GOOSE" srcCBName="GCB" srcLDInst="CBSW" srcLNClass="LLN0" intAddr="intAddr"/>
							<ExtRef iedName="IED2" ldInst="CBSW" lnClass="XSWI" lnInst="2" doName="Pos" daName="q"/>
							<ExtRef ldInst="CBSW" lnClass="XSWI" lnInst="2" doName="Pos" daName="t" intAddr="stVal-t"/>
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
		<KDC iedName="IED1" apName="P1"/>
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
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="OpSlc.dsd" daName="sasd.ads.asd" fc="ST"/>
						</DataSet>
						<GSEControl type="GOOSE" appID="0002" fixedOffs="false" confRev="1" name="GCB" datSet="GooseDataSet1">
						</GSEControl>
						<ReportControl rptID="adf" confRev="9" buffered="true" bufTime="100" indexed="true" intgPd="0" name="ReportCb" datSet="GooseDataSet1">
							<TrgOps dchg="true" qchg="true" dupd="false" period="false" gi="true"/>
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="false" entryID="false" configRef="true" bufOvfl="false"/>
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
						<ReportControl rptID="IED2/CBSW/XSWI/SwitchGearBRCB" confRev="9" buffered="true" bufTime="100" indexed="true" intgPd="0" name="ReportCb" datSet="dataSet">
							<TrgOps dchg="true" qchg="true" dupd="false" period="false" gi="true"/>
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="false" entryID="false" configRef="true" bufOvfl="false"/>
							<RptEnabled max="5">
								<ClientLN apRef="P1" ldInst="CircuitBreaker_CB1" lnClass="XCBR" lnInst="1" iedName="IED1"/>
							</RptEnabled>
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
								<ClientLN apRef="P1" ldInst="CircuitBreaker_CB1" lnClass="XCBR" lnInst="1" iedName="IED1"/>
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
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0.two">
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
		<AccessPoint name="P2">
		</AccessPoint>
	</IED>
</SCL>
