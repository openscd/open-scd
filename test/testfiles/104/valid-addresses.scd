<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:eTr_104="http://www.iec.ch/61850-80-1/2007/IEC_60870-5-104" version="2007" revision="B" release="4">
	<Header id="80-1 example" version="0" revision="1" toolID="SchneiderElectric-SET" nameStructure="IEDName"/>
	<Substation name="S1" desc="">
		<VoltageLevel name="F1" desc="">
			<Voltage unit="V" multiplier="k">110</Voltage>
			<Bay name="Q1" desc="">
				<LNode iedName="B1" ldInst="LD0" lnClass="GAPC" lnInst="1" lnType="SE_GAPC_SET_V001">
				</LNode>
				<LNode iedName="B1" ldInst="LD0" lnClass="GGIO" lnInst="1" lnType="SE_GGIO_SET_V002">
				</LNode>
				<LNode iedName="B1" ldInst="LD0" lnClass="MMXU" lnInst="1" lnType="SE_MMXU_SET_V001">
				</LNode>
				<LNode iedName="B1" ldInst="LD0" lnClass="MSQI" lnInst="1" lnType="SE_MSQI_SET_V001">
				</LNode>
				<LNode iedName="B1" ldInst="LD0" lnClass="MHAN" lnInst="1" lnType="SE_MHAN_SET_V001">
				</LNode>
				<LNode iedName="B1" ldInst="LD0" lnClass="GSAL" lnInst="1" lnType="SE_GSAL_SET_V001">
				</LNode>
				<LNode iedName="B1" ldInst="LD0" lnClass="MFLK" lnInst="1" lnType="SE_MFLK_SET_V001">
				</LNode>
				<LNode iedName="B1" ldInst="LD0" lnClass="YEFN" lnInst="1" lnType="SE_YEFN_SET_V001">
				</LNode>
				<LNode iedName="B1" ldInst="LD0" lnClass="LLN0" lnType="SE_LLN0_SET_V001"/>
				<LNode iedName="B1" ldInst="LD0" lnClass="TCTR" lnInst="1" lnType="SE_TCTR_SET_V001">
				</LNode>
				<LNode iedName="B2" ldInst="LD0" lnClass="GGIO" lnInst="2">
				</LNode>
			</Bay>
		</VoltageLevel>
	</Substation>
	<Communication>
		<SubNetwork type="104" name="W1" desc="">
			<ConnectedAP iedName="B1" apName="AP1">
				<Address>
					<P type="RG1-LL1-IP">192.128.0.1</P>
					<P type="RG1-LL1-IP-SUBNET">255.255.255.0</P>
					<P type="RG1-W-FACTOR">8</P>
					<P type="RG1-K-FACTOR">12</P>
					<P type="RG1-TIMEOUT-0">30</P>
					<P type="RG1-TIMEOUT-1">15</P>
					<P type="RG1-TIMEOUT-2">10</P>
					<P type="RG1-TIMEOUT-3">20</P>
					<P type="RG2-LL1-IP">192.128.0.2</P>
					<P type="RG2-LL1-IP-SUBNET">255.255.255.0</P>
					<P type="RG2-W-FACTOR">8</P>
					<P type="RG2-K-FACTOR">12</P>
					<P type="RG2-TIMEOUT-0">30</P>
					<P type="RG2-TIMEOUT-1">15</P>
					<P type="RG2-TIMEOUT-2">10</P>
					<P type="RG2-TIMEOUT-3">20</P>
					<P type="StationType">controlled-station</P>
				</Address>
			</ConnectedAP>
			<ConnectedAP iedName="B2" apName="AP1">
				<Address>
					<P type="IP">192.128.0.10</P>
					<P type="IP-SUBNET">255.255.255.0</P>
					<P type="W-FACTOR">8</P>
					<P type="K-FACTOR">12</P>
					<P type="TIMEOUT-0">30</P>
					<P type="TIMEOUT-1">15</P>
					<P type="TIMEOUT-2">10</P>
					<P type="TIMEOUT-3">20</P>
					<P type="StationType">controlled-station</P>
				</Address>
			</ConnectedAP>
			<ConnectedAP iedName="B2" apName="AP2">
				<Address>
					<P type="IP">192.128.0.11</P>
					<P type="IP-SUBNET">255.255.255.0</P>
					<P type="W-FACTOR">8</P>
					<P type="K-FACTOR">12</P>
					<P type="TIMEOUT-0">30</P>
					<P type="TIMEOUT-1">15</P>
					<P type="TIMEOUT-2">10</P>
					<P type="TIMEOUT-3">20</P>
					<P type="StationType">controlled-station</P>
				</Address>
			</ConnectedAP>
		</SubNetwork>
		<SubNetwork type="104" name="F1" desc="">
			<ConnectedAP iedName="B1" apName="AP1">
				<Address>
					<P type="RG1-LL1-IP">192.128.0.1</P>
					<P type="RG1-LL1-IP-SUBNET">255.255.255.0</P>
					<P type="RG1-W-FACTOR">8</P>
					<P type="RG1-K-FACTOR">12</P>
					<P type="RG1-TIMEOUT-0">30</P>
					<P type="RG1-TIMEOUT-1">15</P>
					<P type="RG1-TIMEOUT-2">10</P>
					<P type="RG1-TIMEOUT-3">20</P>
					<P type="RG2-LL1-IP">192.128.0.2</P>
					<P type="RG2-LL1-IP-SUBNET">255.255.255.0</P>
					<P type="RG2-W-FACTOR">8</P>
					<P type="RG2-K-FACTOR">12</P>
					<P type="RG2-TIMEOUT-0">30</P>
					<P type="RG2-TIMEOUT-1">15</P>
					<P type="RG2-TIMEOUT-2">10</P>
					<P type="RG2-TIMEOUT-3">20</P>
					<P type="StationType">controlled-station</P>
				</Address>
			</ConnectedAP>
			<ConnectedAP iedName="B2" apName="AP1">
				<Address>
					<P type="IP">192.128.0.10</P>
					<P type="IP-SUBNET">255.255.255.0</P>
					<P type="W-FACTOR">8</P>
					<P type="K-FACTOR">12</P>
					<P type="TIMEOUT-0">30</P>
					<P type="TIMEOUT-1">15</P>
					<P type="TIMEOUT-2">10</P>
					<P type="TIMEOUT-3">20</P>
					<P type="StationType">controlled-station</P>
				</Address>
			</ConnectedAP>
			<ConnectedAP iedName="B2" apName="AP2">
				<Address>
					<P type="IP">192.128.0.11</P>
					<P type="IP-SUBNET">255.255.255.0</P>
					<P type="W-FACTOR">8</P>
					<P type="K-FACTOR">12</P>
					<P type="TIMEOUT-0">30</P>
					<P type="TIMEOUT-1">15</P>
					<P type="TIMEOUT-2">10</P>
					<P type="TIMEOUT-3">20</P>
					<P type="StationType">controlled-station</P>
				</Address>
			</ConnectedAP>
		</SubNetwork>
	</Communication>
	<IED name="B2">
		<Services>
			<ConfDataSet modify="true" maxAttributes="256" max="580"/>
			<ConfReportControl bufMode="both" max="512"/>
			<GOOSE max="64"/>
			<SMVsc max="64"/>
			<ConfLNs fixPrefix="false" fixLnInst="false"/>
			<ConfLdName/>
		</Services>
		<AccessPoint name="AP1">
			<Server>
				<Authentication/>
				<LDevice inst="LD0">
					<LN0 lnClass="LLN0" inst="" lnType="SE_LLN0_SET_default_V001">
						<DOI name="Beh">
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="1" ioa="2" ti="35"/>
								</Private>
							</DAI>
						</DOI>
					</LN0>
					<LN prefix="PPRE" lnClass="GGIO" inst="2" lnType="SE_GGIO_SET_default_V001">
						<DOI name="Beh">
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="1" ioa="2" ti="35"/>
								</Private>
							</DAI>
						</DOI>
					</LN>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<IED name="B1" desc="">
		<Services>
			<ConfDataSet modify="true" maxAttributes="256" max="580"/>
			<ConfReportControl bufMode="both" max="512"/>
			<GOOSE max="64"/>
			<SMVsc max="64"/>
			<ConfLNs fixPrefix="false" fixLnInst="false"/>
			<ConfLdName/>
		</Services>
		<AccessPoint name="AP1">
			<Server>
				<Authentication/>
				<LDevice inst="LD0">
					<LN0 lnClass="LLN0" inst="" lnType="SE_LLN0_SET_V001">
						<DOI name="Mod">
							<SDI name="Oper">
								<DAI name="ctlVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="100" ioa="4" ti="62"/>
									</Private>
								</DAI>
							</SDI>
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="100" ioa="3" ti="35"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="Beh">
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="100" ioa="1" ti="35"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="MltLev">
							<DAI name="setVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="301" ioa="1" ti="58"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="Health">
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="101" ioa="1" ti="30" expectedValue="1"/>
									<eTr_104:Address casdu="101" ioa="2" ti="30" expectedValue="2"/>
									<eTr_104:Address casdu="101" ioa="3" ti="30" expectedValue="3"/>
								</Private>
							</DAI>
						</DOI>
					</LN0>
					<LN prefix="" lnClass="TCTR" inst="1" lnType="SE_TCTR_SET_V001">
						<DOI name="CorCrv">
							<SDI name="crvPts">
								<DAI name="xVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="305" ioa="1" ti="63"/>
									</Private>
								</DAI>
								<DAI name="yVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="305" ioa="3" ti="63"/>
									</Private>
								</DAI>
							</SDI>
						</DOI>
					</LN>
					<LN prefix="" lnClass="GAPC" inst="1" lnType="SE_GAPC_SET_V001">
						<DOI name="Op">
							<DAI name="general">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="4" ioa="1" ti="39"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="Str">
							<DAI name="general">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="5" ioa="1" ti="40"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="StrVal">
							<SDI name="setMag">
								<DAI name="i">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="304" ioa="1" ti="62"/>
									</Private>
								</DAI>
							</SDI>
						</DOI>
					</LN>
					<LN prefix="" lnClass="MFLK" inst="1" lnType="SE_MFLK_SET_V001">
						<DOI name="PhPcbLl">
							<DAI name="hstVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="8" ioa="1" ti="33"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="PhPdmSpec">
							<SDI name="phsAHar">
								<SDI name="cVal">
									<SDI name="mag">
										<DAI name="f">
											<Private type="IEC_60870_5_104">
												<eTr_104:Address casdu="60" ioa="1" ti="36"/>
											</Private>
										</DAI>
									</SDI>
								</SDI>
							</SDI>
						</DOI>
						<DOI name="PPPdmSpec">
							<SDI name="phsABHar">
								<SDI name="cVal">
									<SDI name="mag">
										<DAI name="f">
											<Private type="IEC_60870_5_104">
												<eTr_104:Address casdu="70" ioa="1" ti="36"/>
											</Private>
										</DAI>
									</SDI>
								</SDI>
							</SDI>
						</DOI>
					</LN>
					<LN prefix="" lnClass="MHAN" inst="1" lnType="SE_MHAN_SET_V001">
						<DOI name="HaVol">
							<SDI name="har">
								<SDI name="cVal">
									<SDI name="mag">
										<DAI name="f">
											<Private type="IEC_60870_5_104">
												<eTr_104:Address casdu="50" ioa="1" ti="36"/>
											</Private>
										</DAI>
									</SDI>
								</SDI>
							</SDI>
						</DOI>
					</LN>
					<LN prefix="" lnClass="MSQI" inst="1" lnType="SE_MSQI_SET_V001">
						<DOI name="SeqA">
							<SDI name="c1">
								<SDI name="cVal">
									<SDI name="mag">
										<DAI name="f">
											<Private type="IEC_60870_5_104">
												<eTr_104:Address casdu="40" ioa="1" ti="36"/>
											</Private>
										</DAI>
									</SDI>
								</SDI>
							</SDI>
						</DOI>
					</LN>
					<LN prefix="" lnClass="MMXU" inst="1" lnType="SE_MMXU_SET_V001">
						<DOI name="Hz">
							<SDI name="units">
								<DAI name="SIUnit">
									<Val>Hz</Val>
								</DAI>
								<DAI name="multiplier">
									<Val>k</Val>
								</DAI>
							</SDI>
							<SDI name="sVC">
								<DAI name="scaleFactor">
									<Val>10</Val>
								</DAI>
								<DAI name="offset">
									<Val>2</Val>
								</DAI>
							</SDI>
							<SDI name="mag">
								<DAI name="f">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="9" ioa="1" ti="36"/>
									</Private>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="A">
							<SDI name="phsA">
								<SDI name="cVal">
									<SDI name="mag">
										<DAI name="f">
											<Private type="IEC_60870_5_104">
												<eTr_104:Address casdu="20" ioa="1" ti="36"/>
											</Private>
										</DAI>
									</SDI>
								</SDI>
							</SDI>
							<SDI name="phsB">
								<SDI name="cVal">
									<SDI name="mag">
										<DAI name="f">
											<Private type="IEC_60870_5_104">
												<eTr_104:Address casdu="20" ioa="2" ti="36"/>
											</Private>
										</DAI>
									</SDI>
								</SDI>
							</SDI>
							<SDI name="phsC">
								<SDI name="cVal">
									<SDI name="mag">
										<DAI name="f">
											<Private type="IEC_60870_5_104">
												<eTr_104:Address casdu="20" ioa="3" ti="36"/>
											</Private>
										</DAI>
									</SDI>
								</SDI>
							</SDI>
							<SDI name="neut">
								<SDI name="cVal">
									<SDI name="mag">
										<DAI name="f">
											<Private type="IEC_60870_5_104">
												<eTr_104:Address casdu="20" ioa="4" ti="36"/>
											</Private>
										</DAI>
									</SDI>
								</SDI>
							</SDI>
						</DOI>
						<DOI name="PPV">
							<SDI name="phsAB">
								<SDI name="cVal">
									<SDI name="mag">
										<DAI name="f">
											<Private type="IEC_60870_5_104">
												<eTr_104:Address casdu="30" ioa="1" ti="36"/>
											</Private>
										</DAI>
									</SDI>
								</SDI>
							</SDI>
							<SDI name="phsBC">
								<SDI name="cVal">
									<SDI name="mag">
										<DAI name="f">
											<Private type="IEC_60870_5_104">
												<eTr_104:Address casdu="30" ioa="2" ti="36"/>
											</Private>
										</DAI>
									</SDI>
								</SDI>
							</SDI>
							<SDI name="phsCA">
								<SDI name="cVal">
									<SDI name="mag">
										<DAI name="f">
											<Private type="IEC_60870_5_104">
												<eTr_104:Address casdu="30" ioa="3" ti="36"/>
											</Private>
										</DAI>
									</SDI>
								</SDI>
							</SDI>
						</DOI>
					</LN>
					<LN prefix="" lnClass="GSAL" inst="1" lnType="SE_GSAL_SET_V001">
						<DOI name="OpCntRs">
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
						</DOI>
						<DOI name="AuthFail">
							<DAI name="cnt">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="6" ioa="1" ti="37"/>
								</Private>
							</DAI>
						</DOI>
					</LN>
					<LN prefix="" lnClass="YEFN" inst="1" lnType="SE_YEFN_SET_V001">
						<DOI name="TapChg">
							<SDI name="valWTr">
								<DAI name="posVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="204" ioa="1" ti="32"/>
									</Private>
								</DAI>
							</SDI>
							<SDI name="Oper">
								<DAI name="ctlVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="204" ioa="2" ti="60"/>
									</Private>
								</DAI>
							</SDI>
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
						</DOI>
						<DOI name="ColTapPos">
							<SDI name="valWTr">
								<DAI name="posVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="205" ioa="1" ti="32"/>
									</Private>
								</DAI>
							</SDI>
							<SDI name="Oper">
								<DAI name="ctlVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="205" ioa="2" ti="62"/>
									</Private>
								</DAI>
							</SDI>
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
						</DOI>
						<DOI name="ColPos">
							<SDI name="mxVal">
								<DAI name="f">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="206" ioa="1" ti="36"/>
									</Private>
								</DAI>
							</SDI>
							<SDI name="Oper">
								<SDI name="ctlVal">
									<DAI name="f">
										<Private type="IEC_60870_5_104">
											<eTr_104:Address casdu="206" ioa="2" ti="63"/>
										</Private>
									</DAI>
								</SDI>
							</SDI>
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
						</DOI>
						<DOI name="ColChg">
							<SDI name="mxVal">
								<DAI name="f">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="207" ioa="1" ti="36"/>
									</Private>
								</DAI>
							</SDI>
							<SDI name="Oper">
								<DAI name="ctlVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="207" ioa="2" ti="60"/>
									</Private>
								</DAI>
							</SDI>
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
						</DOI>
					</LN>
					<LN prefix="" lnClass="GGIO" inst="1" lnType="SE_GGIO_SET_V002">
						<DOI name="CmdBlk">
							<SDI name="Oper">
								<DAI name="ctlVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="201" ioa="2" ti="58"/>
									</Private>
								</DAI>
							</SDI>
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="201" ioa="1" ti="30"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="DPCSO1">
							<SDI name="Oper">
								<DAI name="ctlVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="202" ioa="2" ti="59"/>
									</Private>
								</DAI>
								<DAI name="Check">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="202" ioa="3" ti="58" check="interlocking"/>
										<eTr_104:Address casdu="202" ioa="4" ti="58" check="synchrocheck"/>
									</Private>
								</DAI>
							</SDI>
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="202" ioa="1" ti="31"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="ISCSO1">
							<SDI name="Oper">
								<DAI name="ctlVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="203" ioa="2" ti="62"/>
									</Private>
								</DAI>
							</SDI>
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="203" ioa="1" ti="33"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="DPCSO2">
							<SDI name="Oper">
								<DAI name="ctlVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="202" ioa="12" ti="58" expectedValue="1"/>
										<eTr_104:Address casdu="202" ioa="13" ti="58" expectedValue="2"/>
									</Private>
								</DAI>
							</SDI>
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="202" ioa="10" ti="30" expectedValue="1"/>
									<eTr_104:Address casdu="202" ioa="11" ti="30" expectedValue="2"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="Mod">
							<SDI name="Oper">
								<DAI name="ctlVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="208" ioa="2" ti="58" expectedValue="1"/>
										<eTr_104:Address casdu="208" ioa="3" ti="58" expectedValue="2"/>
										<eTr_104:Address casdu="208" ioa="4" ti="58" expectedValue="3"/>
										<eTr_104:Address casdu="208" ioa="5" ti="58" expectedValue="4"/>
										<eTr_104:Address casdu="208" ioa="6" ti="58" expectedValue="5"/>
									</Private>
								</DAI>
							</SDI>
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="208" ioa="1" ti="35"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="SPCSO1">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="201" ioa="11" ti="30"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="SPCSO2">
							<SDI name="Oper">
								<DAI name="ctlVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="201" ioa="22" ti="58"/>
									</Private>
								</DAI>
							</SDI>
							<DAI name="ctlModel">
								<Val>direct-with-normal-security</Val>
							</DAI>
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="201" ioa="21" ti="30"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="SPCSO3">
							<SDI name="Oper">
								<DAI name="ctlVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="201" ioa="32" ti="58"/>
									</Private>
								</DAI>
							</SDI>
							<DAI name="ctlModel">
								<Val>direct-with-enhanced-security</Val>
							</DAI>
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="201" ioa="31" ti="30"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="SPCSO4">
							<SDI name="Oper">
								<DAI name="ctlVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="201" ioa="42" ti="58"/>
									</Private>
								</DAI>
							</SDI>
							<DAI name="ctlModel">
								<Val>sbo-with-normal-security</Val>
							</DAI>
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="201" ioa="41" ti="30"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="SPCSO5">
							<SDI name="Oper">
								<DAI name="ctlVal">
									<Private type="IEC_60870_5_104">
										<eTr_104:Address casdu="201" ioa="52" ti="58"/>
									</Private>
								</DAI>
							</SDI>
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="201" ioa="51" ti="30"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="Ind1">
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="1" ioa="1" ti="30"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="DInd1">
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="2" ioa="1" ti="31"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="IntIn1">
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="3" ioa="1" ti="35"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="CntVal1">
							<DAI name="actVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="7" ioa="1" ti="37"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="NumSubIntv">
							<DAI name="setVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="302" ioa="1" ti="62"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="ClcRfTyp">
							<DAI name="setVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="303" ioa="1" ti="62"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="Ind2">
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="1" ioa="2" ti="30" inverted="true"/>
								</Private>
							</DAI>
						</DOI>
						<DOI name="DInd2">
							<DAI name="stVal">
								<Private type="IEC_60870_5_104">
									<eTr_104:Address casdu="2" ioa="3" ti="30" expectedValue="1"/>
									<eTr_104:Address casdu="2" ioa="4" ti="30" expectedValue="2"/>
								</Private>
							</DAI>
						</DOI>
					</LN>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
  <IED name="B3" desc="">
    <Services>
      <ConfDataSet modify="true" maxAttributes="256" max="580"/>
      <ConfReportControl bufMode="both" max="512"/>
      <GOOSE max="64"/>
      <SMVsc max="64"/>
      <ConfLNs fixPrefix="false" fixLnInst="false"/>
      <ConfLdName/>
    </Services>
    <AccessPoint name="AP1">
      <Server>
        <Authentication/>
        <LDevice inst="LD0">
          <LN0 lnClass="LLN0" inst="" lnType="SE_LLN0_SET_default_V001">
            <DOI name="Beh">
              <DAI name="stVal"/>
            </DOI>
          </LN0>
          <LN prefix="PPRE" lnClass="GGIO" inst="2" lnType="SE_GGIO_SET_default_V001">
            <DOI name="Beh">
              <DAI name="stVal"/>
            </DOI>
          </LN>
        </LDevice>
      </Server>
    </AccessPoint>
  </IED>
	<DataTypeTemplates>
		<LNodeType iedType="SE_Spec_SET" lnClass="GAPC" id="SE_GAPC_SET_V001">
			<DO name="Beh" type="SE_ENS_V001" desc="Behaviour"/>
			<DO name="NamPlt" type="SE_LPL_V001" desc="Name plate"/>
			<DO name="Op" type="SE_ACT_V001" desc="Operate"/>
			<DO name="Str" type="SE_ACD_V001" desc="Start"/>
			<DO name="StrVal" type="SE_ASG_V001" desc="Start Value"/>
		</LNodeType>
		<LNodeType iedType="SE_Spec_SET" lnClass="GGIO" id="SE_GGIO_SET_default_V001">
			<DO name="Beh" type="SE_ENS_V001" desc="Behaviour"/>
			<DO name="NamPlt" type="SE_LPL_V001" desc="Name plate"/>
		</LNodeType>
		<LNodeType iedType="SE_Spec_SET" lnClass="GGIO" id="SE_GGIO_SET_V002">
			<DO name="Beh" type="SE_ENS_V001" desc="Behaviour"/>
			<DO name="NamPlt" type="SE_LPL_V002" desc="Name plate"/>
			<DO name="CntVal1" type="SE_BCR_V001" desc="Counter Value"/>
			<DO name="DInd1" type="SE_DPS_V001"/>
			<DO name="Ind1" type="SE_SPS_V001" desc="Indication"/>
			<DO name="IntIn1" type="SE_INS_V001" desc="Integer"/>
			<DO name="CmdBlk" type="SE_SPC_V001" desc="Command block"/>
			<DO name="DPCSO1" type="SE_DPC_V001" desc="Double point controllable status output"/>
			<DO name="ISCSO1" type="SE_INC_V002" desc="Integer status controllable status output"/>
			<DO name="NumSubIntv" type="SE_ING_V001" desc="Sub intervals number"/>
			<DO name="ClcRfTyp" type="SE_ENG_V001" desc="Refresh interval type"/>
			<DO name="Ind2" type="SE_SPS_V001" desc="Indication"/>
			<DO name="DInd2" type="SE_DPS_V001"/>
			<DO name="DPCSO2" type="SE_DPC_V001" desc="Double point controllable status output"/>
			<DO name="Mod" type="SE_ENC_V002" desc="Mode"/>
			<DO name="SPCSO1" type="SE_SPC_V003" desc="Single point controllable status output"/>
			<DO name="SPCSO2" type="SE_SPC_V001" desc="Single point controllable status output"/>
			<DO name="SPCSO3" type="SE_SPC_V001" desc="Single point controllable status output"/>
			<DO name="SPCSO4" type="SE_SPC_V004" desc="Single point controllable status output"/>
			<DO name="SPCSO5" type="SE_SPC_V002" desc="Single point controllable status output"/>
		</LNodeType>
		<LNodeType iedType="SE_Spec_SET" lnClass="GSAL" id="SE_GSAL_SET_V001">
			<DO name="AuthFail" type="SE_SEC_V001" desc="Authorisation Failure"/>
			<DO name="AcsCtlFail" type="SE_SEC_V001" desc="Access Control Failure"/>
			<DO name="SvcViol" type="SE_SEC_V001" desc="Service Violation"/>
			<DO name="Ina" type="SE_SEC_V001" desc="Inactivity"/>
			<DO name="OpCntRs" type="SE_INC_V001" desc="Operating Counter reset"/>
			<DO name="Beh" type="SE_ENS_V001" desc="Behaviour"/>
			<DO name="NamPlt" type="SE_LPL_V001" desc="Name plate"/>
		</LNodeType>
		<LNodeType iedType="SE_Spec_SET" lnClass="LLN0" id="SE_LLN0_SET_default_V001">
			<DO name="Beh" type="SE_ENS_V001" desc="Behaviour"/>
			<DO name="NamPlt" type="SE_LPL_V001" desc="Name plate"/>
		</LNodeType>
		<LNodeType iedType="SE_Spec_SET" lnClass="LLN0" id="SE_LLN0_SET_V001">
			<DO name="Beh" type="SE_ENS_V001" desc="Behaviour"/>
			<DO name="NamPlt" type="SE_LPL_V001" desc="Name plate"/>
			<DO name="MltLev" type="SE_SPG_V001" desc="Multiple Level"/>
			<DO name="Mod" type="SE_ENC_V002" desc="Mode"/>
			<DO name="Health" type="SE_ENS_V002" desc="Health"/>
		</LNodeType>
		<LNodeType iedType="SE_Spec_SET" lnClass="MFLK" id="SE_MFLK_SET_V001">
			<DO name="Beh" type="SE_ENS_V001" desc="Behaviour"/>
			<DO name="NamPlt" type="SE_LPL_V001" desc="Name plate"/>
			<DO name="PhPcbLl" type="SE_HST_V001" desc="Phase to reference Power quality qualifier bin Last long (interval)"/>
			<DO name="PhPdmSpec" type="SE_HWYE_V001" desc="Phase to reference Power quality demodulation Spectra"/>
			<DO name="PPPdmSpec" type="SE_HDEL_V001" desc="Phase to phase Power quality demodulation Spectra"/>
		</LNodeType>
		<LNodeType iedType="SE_Spec_SET" lnClass="MHAN" id="SE_MHAN_SET_V001">
			<DO name="Beh" type="SE_ENS_V001" desc="Behaviour"/>
			<DO name="NamPlt" type="SE_LPL_V001" desc="Name plate"/>
			<DO name="HaVol" type="SE_HMV_V001" desc="Harmonics (non-phase-related AC) Voltage"/>
		</LNodeType>
		<LNodeType iedType="SE_Spec_SET" lnClass="MMXU" id="SE_MMXU_SET_V001">
			<DO name="Beh" type="SE_ENS_V001" desc="Behaviour"/>
			<DO name="NamPlt" type="SE_LPL_V001" desc="Name plate"/>
			<DO name="Hz" type="SE_MV_V001" desc="Frequency"/>
			<DO name="A" type="SE_WYE_V001" desc="Current"/>
			<DO name="PPV" type="SE_DEL_V001" desc="Phase to phase voltage"/>
		</LNodeType>
		<LNodeType iedType="SE_Spec_SET" lnClass="MSQI" id="SE_MSQI_SET_V001">
			<DO name="SeqA" type="SE_SEQ_V001" desc="Sequence current"/>
			<DO name="SeqV" type="SE_SEQ_V001" desc="Sequence Voltage"/>
			<DO name="Beh" type="SE_ENS_V001" desc="Behaviour"/>
			<DO name="NamPlt" type="SE_LPL_V001" desc="Name plate"/>
		</LNodeType>
		<LNodeType iedType="SE_Spec_SET" lnClass="TCTR" id="SE_TCTR_SET_V001">
			<DO name="ARtg" type="SE_ASG_V001" desc="Current Rating"/>
			<DO name="HzRtg" type="SE_ASG_V001" desc="Frequency Rating"/>
			<DO name="Beh" type="SE_ENS_V001" desc="Behaviour"/>
			<DO name="NamPlt" type="SE_LPL_V001" desc="Name plate"/>
			<DO name="AmpSv" type="SE_SAV_V001" desc="Current DC or non-phase-related AC Sampled value"/>
			<DO name="CorCrv" type="SE_CSG_V001" desc="Curve phasor magnitude and angle correction"/>
		</LNodeType>
		<LNodeType iedType="SE_Spec_SET" lnClass="YEFN" id="SE_YEFN_SET_V001">
			<DO name="TapChg" type="SE_BSC_V002" desc="Tap Change"/>
			<DO name="ColTapPos" type="SE_ISC_V002" desc="Coil Tap Position"/>
			<DO name="ColPos" type="SE_APC_V002" desc="Coil Position"/>
			<DO name="ColChg" type="SE_BAC_V002" desc="Coil Change"/>
			<DO name="Beh" type="SE_ENS_V001" desc="Behaviour"/>
			<DO name="NamPlt" type="SE_LPL_V001" desc="Name plate"/>
		</LNodeType>
		<DOType cdc="ACD" id="SE_ACD_V001">
			<DA dchg="true" fc="ST" name="general" bType="BOOLEAN" desc="general"/>
			<DA dchg="true" fc="ST" name="dirGeneral" bType="Enum" type="SE_dirGeneral_V001" desc="general fault direction"/>
			<DA dchg="true" fc="ST" name="phsA" bType="BOOLEAN" desc="phase A"/>
			<DA dchg="true" fc="ST" name="dirPhsA" bType="Enum" type="SE_dirNeut_V001" desc="phase A fault direction"/>
			<DA dchg="true" fc="ST" name="phsB" bType="BOOLEAN" desc="phase B"/>
			<DA dchg="true" fc="ST" name="dirPhsB" bType="Enum" type="SE_dirNeut_V001" desc="phase B fault direction"/>
			<DA dchg="true" fc="ST" name="phsC" bType="BOOLEAN" desc="phase C"/>
			<DA dchg="true" fc="ST" name="dirPhsC" bType="Enum" type="SE_dirNeut_V001" desc="phase C fault direction"/>
			<DA dchg="true" fc="ST" name="neut" bType="BOOLEAN" desc="neutral"/>
			<DA dchg="true" fc="ST" name="dirNeut" bType="Enum" type="SE_dirNeut_V001" desc="neutral fault direction"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
		</DOType>
		<DOType cdc="ACT" id="SE_ACT_V001">
			<DA dchg="true" fc="ST" name="general" bType="BOOLEAN" desc="general"/>
			<DA dchg="true" fc="ST" name="phsA" bType="BOOLEAN" desc="phase A"/>
			<DA dchg="true" fc="ST" name="phsB" bType="BOOLEAN" desc="phase B"/>
			<DA dchg="true" fc="ST" name="phsC" bType="BOOLEAN" desc="phase C"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
		</DOType>
		<DOType cdc="APC" id="SE_APC_V001">
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
			<DA dchg="true" fc="CF" name="dbRef" bType="FLOAT32" desc="dead band reference"/>
		</DOType>
		<DOType cdc="APC" id="SE_APC_V002">
			<DA dchg="true" fc="MX" name="mxVal" bType="Struct" type="SE_mag_V001" desc="measured value"/>
			<DA fc="CO" name="Oper" bType="Struct" type="SE_Oper_V005" desc="operate"/>
			<DA qchg="true" fc="MX" name="q" bType="Quality" desc="quality"/>
			<DA fc="CO" name="Cancel" bType="Struct" type="SE_Cancel_V005" desc="cancel"/>
			<DA fc="MX" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
			<DA dchg="true" fc="CF" name="dbRef" bType="FLOAT32" desc="dead band reference"/>
		</DOType>
		<DOType cdc="ASG" id="SE_ASG_V001">
			<DA dchg="true" fc="SP" name="setMag" bType="Struct" type="SE_setMag_V001" desc="analog setting value"/>
		</DOType>
		<DOType cdc="BAC" id="SE_BAC_V001">
			<DA dchg="true" fc="CF" name="persistent" bType="BOOLEAN" desc="persistent"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
			<DA dchg="true" fc="CF" name="dbRef" bType="FLOAT32" desc="dead band reference"/>
		</DOType>
		<DOType cdc="BAC" id="SE_BAC_V002">
			<DA dchg="true" fc="MX" name="mxVal" bType="Struct" type="SE_mag_V001" desc="measured value"/>
			<DA fc="CO" name="Oper" bType="Struct" type="SE_Oper_V004" desc="operate"/>
			<DA qchg="true" fc="MX" name="q" bType="Quality" desc="quality"/>
			<DA fc="CO" name="Cancel" bType="Struct" type="SE_Cancel_V004" desc="cancel"/>
			<DA fc="MX" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="persistent" bType="BOOLEAN" desc="persistent"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
			<DA dchg="true" fc="CF" name="dbRef" bType="FLOAT32" desc="dead band reference"/>
		</DOType>
		<DOType cdc="BCR" id="SE_BCR_V001">
			<DA dchg="true" fc="ST" name="actVal" bType="INT64" desc="actual value"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="pulsQty" bType="FLOAT32" desc="pulse quantity"/>
		</DOType>
		<DOType cdc="BSC" id="SE_BSC_V001">
			<DA dchg="true" fc="CF" name="persistent" bType="BOOLEAN" desc="persistent"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
		</DOType>
		<DOType cdc="BSC" id="SE_BSC_V002">
			<DA dchg="true" fc="ST" name="valWTr" bType="Struct" type="SE_valWTr_V001" desc="value with transient indication"/>
			<DA fc="CO" name="Oper" bType="Struct" type="SE_Oper_V004" desc="operate"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="CO" name="Cancel" bType="Struct" type="SE_Cancel_V004" desc="cancel"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="persistent" bType="BOOLEAN" desc="persistent"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
		</DOType>
		<DOType cdc="CMV" id="SE_CMV_V001">
			<DA dchg="true" dupd="true" fc="MX" name="cVal" bType="Struct" type="SE_cVal_V001" desc="complex value"/>
			<DA qchg="true" fc="MX" name="q" bType="Quality" desc="quality"/>
			<DA fc="MX" name="t" bType="Timestamp" desc="time"/>
		</DOType>
		<DOType cdc="CSG" id="SE_CSG_V001">
			<DA dchg="true" fc="SP" name="numPts" bType="INT16U" desc="number points"/>
			<DA dchg="true" fc="SP" name="crvPts" bType="Struct" type="SE_crvPts_V001" desc="curve points"/>
			<DA dchg="true" fc="CF" name="xUnits" bType="Struct" type="SE_xUnits_V001" desc="X coordinate units"/>
			<DA dchg="true" fc="CF" name="yUnits" bType="Struct" type="SE_xUnits_V001" desc="Y coordinate units"/>
			<DA dchg="true" fc="CF" name="maxPts" bType="INT16U" desc="maxium points"/>
			<DA fc="DC" name="xD" bType="VisString255" desc="X coordinate description"/>
			<DA fc="DC" name="yD" bType="VisString255" desc="Y coordinate description"/>
		</DOType>
		<DOType cdc="DEL" id="SE_DEL_V001">
			<SDO name="phsAB" type="SE_CMV_V001" desc="phase A to phase B"/>
			<SDO name="phsBC" type="SE_CMV_V001" desc="phase B to phase C"/>
			<SDO name="phsCA" type="SE_CMV_V001" desc="phase C to phase A"/>
		</DOType>
		<DOType cdc="DPC" id="SE_DPC_V001">
			<DA dchg="true" fc="ST" name="stVal" bType="Dbpos" desc="state value"/>
			<DA fc="CO" name="Oper" bType="Struct" type="SE_Oper_V001" desc="operate"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="CO" name="Cancel" bType="Struct" type="SE_Cancel_V001" desc="cancel"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
		</DOType>
		<DOType cdc="DPS" id="SE_DPS_V001">
			<DA dchg="true" fc="ST" name="stVal" bType="Dbpos" desc="state value"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
		</DOType>
		<DOType cdc="ENC" id="SE_ENC_V002">
			<DA dchg="true" fc="ST" name="stVal" bType="Enum" type="SE_stVal_V001" desc="state value"/>
			<DA fc="CO" name="Oper" bType="Struct" type="SE_Oper_V003" desc="operate"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="CO" name="Cancel" bType="Struct" type="SE_Cancel_V003" desc="cancel"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
		</DOType>
		<DOType cdc="ENG" id="SE_ENG_V001">
			<DA dchg="true" fc="SP" name="setVal" bType="Enum" type="SE_setVal_V001" desc="setting value"/>
		</DOType>
		<DOType cdc="ENS" id="SE_ENS_V001">
			<DA dchg="true" dupd="true" fc="ST" name="stVal" bType="Enum" type="SE_stVal_V001" desc="state value"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
		</DOType>
		<DOType cdc="ENS" id="SE_ENS_V002">
			<DA dchg="true" dupd="true" fc="ST" name="stVal" bType="Enum" type="SE_stVal_V002" desc="state value"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
		</DOType>
		<DOType cdc="HDEL" id="SE_HDEL_V001">
			<SDO name="phsABHar" type="SE_CMV_V001" desc="phase A to phase B related harmonics array"/>
			<DA dchg="true" fc="CF" name="numHar" bType="INT16U" desc="harmonic number"/>
			<DA dchg="true" fc="CF" name="numCyc" bType="INT16U" desc="cycle number"/>
			<DA dchg="true" fc="CF" name="evalTm" bType="INT16U" desc="evaluation time"/>
			<DA dchg="true" fc="CF" name="frequency" bType="FLOAT32" desc="frequency"/>
			<DA dchg="true" fc="CF" name="maxPts" bType="INT16U" desc="maxium points"/>
		</DOType>
		<DOType cdc="HMV" id="SE_HMV_V001">
			<SDO name="har" type="SE_CMV_V001" desc="harmonic array"/>
			<DA dchg="true" fc="CF" name="numHar" bType="INT16U" desc="harmonic number"/>
			<DA dchg="true" fc="CF" name="numCyc" bType="INT16U" desc="cycle number"/>
			<DA dchg="true" fc="CF" name="evalTm" bType="INT16U" desc="evaluation time"/>
			<DA dchg="true" fc="CF" name="frequency" bType="FLOAT32" desc="frequency"/>
			<DA dchg="true" fc="CF" name="maxPts" bType="INT16U" desc="maxium points"/>
		</DOType>
		<DOType cdc="HST" id="SE_HST_V001">
			<DA dchg="true" dupd="true" fc="ST" name="hstVal" bType="INT32" desc="histogram value"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="numPts" bType="INT16U" desc="number points"/>
			<DA dchg="true" fc="CF" name="hstRangeC" bType="Struct" type="SE_hstRangeC_V001" desc="histogram range configuration"/>
			<DA dchg="true" fc="CF" name="xUnits" bType="Struct" type="SE_xUnits_V001" desc="X coordinate units"/>
			<DA dchg="true" fc="CF" name="maxPts" bType="INT16U" desc="maxium points"/>
			<DA fc="DC" name="xD" bType="VisString255" desc="X coordinate description"/>
		</DOType>
		<DOType cdc="HWYE" id="SE_HWYE_V001">
			<SDO name="phsAHar" type="SE_CMV_V001" desc="phase A related harmonics array"/>
			<DA dchg="true" fc="CF" name="numHar" bType="INT16U" desc="harmonic number"/>
			<DA dchg="true" fc="CF" name="numCyc" bType="INT16U" desc="cycle number"/>
			<DA dchg="true" fc="CF" name="evalTm" bType="INT16U" desc="evaluation time"/>
			<DA dchg="true" fc="CF" name="frequency" bType="FLOAT32" desc="frequency"/>
			<DA dchg="true" fc="CF" name="maxPts" bType="INT16U" desc="maxium points"/>
		</DOType>
		<DOType cdc="INC" id="SE_INC_V001">
			<DA dchg="true" dupd="true" fc="ST" name="stVal" bType="INT32" desc="state value"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
		</DOType>
		<DOType cdc="INC" id="SE_INC_V002">
			<DA dchg="true" dupd="true" fc="ST" name="stVal" bType="INT32" desc="state value"/>
			<DA fc="CO" name="Oper" bType="Struct" type="SE_Oper_V002" desc="operate"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="CO" name="Cancel" bType="Struct" type="SE_Cancel_V002" desc="cancel"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
		</DOType>
		<DOType cdc="ING" id="SE_ING_V001">
			<DA dchg="true" fc="SP" name="setVal" bType="INT32" desc="setting value"/>
		</DOType>
		<DOType cdc="INS" id="SE_INS_V001">
			<DA dchg="true" dupd="true" fc="ST" name="stVal" bType="INT32" desc="state value"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
		</DOType>
		<DOType cdc="ISC" id="SE_ISC_V001">
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
		</DOType>
		<DOType cdc="ISC" id="SE_ISC_V002">
			<DA dchg="true" fc="ST" name="valWTr" bType="Struct" type="SE_valWTr_V001" desc="value with transient indication"/>
			<DA fc="CO" name="Oper" bType="Struct" type="SE_Oper_V006" desc="operate"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="CO" name="Cancel" bType="Struct" type="SE_Cancel_V006" desc="cancel"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
		</DOType>
		<DOType cdc="LPL" id="SE_LPL_V001">
			<DA fc="EX" name="lnNs" bType="VisString255" desc="logical node name space">
				<Val>IEC 61850-7-4:2007B2</Val>
			</DA>
		</DOType>
		<DOType cdc="LPL" id="SE_LPL_V002">
			<DA fc="EX" name="lnNs" bType="VisString255" desc="logical node name space">
				<Val>MyExt:2022A1</Val>
			</DA>
		</DOType>
		<DOType cdc="MV" id="SE_MV_V001">
			<DA dchg="true" dupd="true" fc="MX" name="mag" bType="Struct" type="SE_mag_V001" desc="magnitude value"/>
			<DA qchg="true" fc="MX" name="q" bType="Quality" desc="quality"/>
			<DA fc="MX" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="units" bType="Struct" type="SE_units_V001" desc="units"/>
			<DA dchg="true" fc="CF" name="sVC" bType="Struct" type="SE_sVC_V001" desc="scaled value config"/>
		</DOType>
		<DOType cdc="SAV" id="SE_SAV_V001">
			<DA fc="MX" name="instMag" bType="Struct" type="SE_mag_V001" desc="instantaneous magnitude value"/>
			<DA qchg="true" fc="MX" name="q" bType="Quality" desc="quality"/>
		</DOType>
		<DOType cdc="SEC" id="SE_SEC_V001">
			<DA dchg="true" fc="ST" name="cnt" bType="INT32U" desc="security violation counter"/>
			<DA fc="ST" name="sev" bType="Enum" type="SE_sev_V001" desc="security violation severity"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
		</DOType>
		<DOType cdc="SEQ" id="SE_SEQ_V001">
			<SDO name="c1" type="SE_CMV_V001" desc="sequence component 1"/>
			<DA fc="MX" name="seqT" bType="Enum" type="SE_seqT_V001" desc="sequence type"/>
		</DOType>
		<DOType cdc="SPC" id="SE_SPC_V001">
			<DA dchg="true" fc="ST" name="stVal" bType="BOOLEAN" desc="state value"/>
			<DA fc="CO" name="Oper" bType="Struct" type="SE_Oper_V001" desc="operate"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="CO" name="Cancel" bType="Struct" type="SE_Cancel_V001" desc="cancel"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
		</DOType>
		<DOType cdc="SPC" id="SE_SPC_V002">
			<DA fc="CO" name="SBO" bType="VisString129" desc="select before operate using read"/>
			<DA fc="CO" name="SBOw" bType="Struct" type="SE_Oper_V001" desc="select before operate with value"/>
			<DA fc="CO" name="Oper" bType="Struct" type="SE_Oper_V001" desc="operate"/>
			<DA dchg="true" fc="ST" name="stVal" bType="BOOLEAN" desc="state value"/>
			<DA fc="CO" name="Cancel" bType="Struct" type="SE_Cancel_V001" desc="cancel"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
		</DOType>
		<DOType cdc="SPC" id="SE_SPC_V003">
			<DA dchg="true" fc="ST" name="stVal" bType="BOOLEAN" desc="state value"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
		</DOType>
		<DOType cdc="SPC" id="SE_SPC_V004">
			<DA fc="CO" name="SBO" bType="VisString129" desc="select before operate using read"/>
			<DA fc="CO" name="Oper" bType="Struct" type="SE_Oper_V001" desc="operate"/>
			<DA dchg="true" fc="ST" name="stVal" bType="BOOLEAN" desc="state value"/>
			<DA fc="CO" name="Cancel" bType="Struct" type="SE_Cancel_V001" desc="cancel"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" type="SE_ctlModel_V001" desc="control model"/>
		</DOType>
		<DOType cdc="SPG" id="SE_SPG_V001">
			<DA dchg="true" fc="SP" name="setVal" bType="BOOLEAN" desc="setting value"/>
		</DOType>
		<DOType cdc="SPS" id="SE_SPS_V001">
			<DA dchg="true" fc="ST" name="stVal" bType="BOOLEAN" desc="state value"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality" desc="quality"/>
			<DA fc="ST" name="t" bType="Timestamp" desc="time"/>
		</DOType>
		<DOType cdc="WYE" id="SE_WYE_V001">
			<SDO name="phsA" type="SE_CMV_V001" desc="phase A"/>
			<SDO name="phsB" type="SE_CMV_V001" desc="phase B"/>
			<SDO name="phsC" type="SE_CMV_V001" desc="phase C"/>
			<SDO name="neut" type="SE_CMV_V001" desc="neutral"/>
		</DOType>
		<DAType id="SE_Cancel_V001">
			<BDA name="ctlVal" bType="BOOLEAN" desc="control value"/>
			<BDA name="origin" bType="Struct" type="SE_origin_V001" desc="origin"/>
			<BDA name="ctlNum" bType="INT8U" desc="control number"/>
			<BDA name="T" bType="Timestamp" desc="control timestamp"/>
			<BDA name="Test" bType="BOOLEAN" desc="test status"/>
		</DAType>
		<DAType id="SE_Cancel_V002">
			<BDA name="ctlVal" bType="INT32" desc="control value"/>
			<BDA name="origin" bType="Struct" type="SE_origin_V001" desc="origin"/>
			<BDA name="ctlNum" bType="INT8U" desc="control number"/>
			<BDA name="T" bType="Timestamp" desc="control timestamp"/>
			<BDA name="Test" bType="BOOLEAN" desc="test status"/>
		</DAType>
		<DAType id="SE_Cancel_V003">
			<BDA name="ctlVal" bType="Enum" type="SE_stVal_V001" desc="control value"/>
			<BDA name="origin" bType="Struct" type="SE_origin_V001" desc="origin"/>
			<BDA name="ctlNum" bType="INT8U" desc="control number"/>
			<BDA name="T" bType="Timestamp" desc="control timestamp"/>
			<BDA name="Test" bType="BOOLEAN" desc="test status"/>
		</DAType>
		<DAType id="SE_Cancel_V004">
			<BDA name="ctlVal" bType="Tcmd" desc="control value"/>
			<BDA name="origin" bType="Struct" type="SE_origin_V001" desc="origin"/>
			<BDA name="ctlNum" bType="INT8U" desc="control number"/>
			<BDA name="T" bType="Timestamp" desc="control timestamp"/>
			<BDA name="Test" bType="BOOLEAN" desc="test status"/>
		</DAType>
		<DAType id="SE_Cancel_V005">
			<BDA name="ctlVal" bType="Struct" type="SE_setMag_V001" desc="control value"/>
			<BDA name="origin" bType="Struct" type="SE_origin_V001" desc="origin"/>
			<BDA name="ctlNum" bType="INT8U" desc="control number"/>
			<BDA name="T" bType="Timestamp" desc="control timestamp"/>
			<BDA name="Test" bType="BOOLEAN" desc="test status"/>
		</DAType>
		<DAType id="SE_Cancel_V006">
			<BDA name="ctlVal" bType="INT8" desc="control value"/>
			<BDA name="origin" bType="Struct" type="SE_origin_V001" desc="origin"/>
			<BDA name="ctlNum" bType="INT8U" desc="control number"/>
			<BDA name="T" bType="Timestamp" desc="control timestamp"/>
			<BDA name="Test" bType="BOOLEAN" desc="test status"/>
		</DAType>
		<DAType id="SE_crvPts_V001">
			<BDA name="xVal" bType="FLOAT32" desc="X-axis value"/>
			<BDA name="yVal" bType="FLOAT32" desc="Y-axis value"/>
		</DAType>
		<DAType id="SE_cVal_V001">
			<BDA name="mag" bType="Struct" type="SE_mag_V001" desc="magnitude value"/>
		</DAType>
		<DAType id="SE_hstRangeC_V001">
			<BDA name="xStart" bType="FLOAT32" desc="start X"/>
		</DAType>
		<DAType id="SE_mag_V001">
			<BDA name="f" bType="FLOAT32" desc="float value"/>
		</DAType>
		<DAType id="SE_Oper_V001">
			<BDA name="ctlVal" bType="BOOLEAN" desc="control value"/>
			<BDA name="origin" bType="Struct" type="SE_origin_V001" desc="origin"/>
			<BDA name="ctlNum" bType="INT8U" desc="control number"/>
			<BDA name="T" bType="Timestamp" desc="control timestamp"/>
			<BDA name="Test" bType="BOOLEAN" desc="test status"/>
			<BDA name="Check" bType="Check" desc="check condition"/>
		</DAType>
		<DAType id="SE_Oper_V002">
			<BDA name="ctlVal" bType="INT32" desc="control value"/>
			<BDA name="origin" bType="Struct" type="SE_origin_V001" desc="origin"/>
			<BDA name="ctlNum" bType="INT8U" desc="control number"/>
			<BDA name="T" bType="Timestamp" desc="control timestamp"/>
			<BDA name="Test" bType="BOOLEAN" desc="test status"/>
			<BDA name="Check" bType="Check" desc="check condition"/>
		</DAType>
		<DAType id="SE_Oper_V003">
			<BDA name="ctlVal" bType="Enum" type="SE_stVal_V001" desc="control value"/>
			<BDA name="origin" bType="Struct" type="SE_origin_V001" desc="origin"/>
			<BDA name="ctlNum" bType="INT8U" desc="control number"/>
			<BDA name="T" bType="Timestamp" desc="control timestamp"/>
			<BDA name="Test" bType="BOOLEAN" desc="test status"/>
			<BDA name="Check" bType="Check" desc="check condition"/>
		</DAType>
		<DAType id="SE_Oper_V004">
			<BDA name="ctlVal" bType="Tcmd" desc="control value"/>
			<BDA name="origin" bType="Struct" type="SE_origin_V001" desc="origin"/>
			<BDA name="ctlNum" bType="INT8U" desc="control number"/>
			<BDA name="T" bType="Timestamp" desc="control timestamp"/>
			<BDA name="Test" bType="BOOLEAN" desc="test status"/>
			<BDA name="Check" bType="Check" desc="check condition"/>
		</DAType>
		<DAType id="SE_Oper_V005">
			<BDA name="ctlVal" bType="Struct" type="SE_mag_V001" desc="control value"/>
			<BDA name="origin" bType="Struct" type="SE_origin_V001" desc="origin"/>
			<BDA name="ctlNum" bType="INT8U" desc="control number"/>
			<BDA name="T" bType="Timestamp" desc="control timestamp"/>
			<BDA name="Test" bType="BOOLEAN" desc="test status"/>
			<BDA name="Check" bType="Check" desc="check condition"/>
		</DAType>
		<DAType id="SE_Oper_V006">
			<BDA name="ctlVal" bType="INT8" desc="control value"/>
			<BDA name="origin" bType="Struct" type="SE_origin_V001" desc="origin"/>
			<BDA name="ctlNum" bType="INT8U" desc="control number"/>
			<BDA name="T" bType="Timestamp" desc="control timestamp"/>
			<BDA name="Test" bType="BOOLEAN" desc="test status"/>
			<BDA name="Check" bType="Check" desc="check condition"/>
		</DAType>
		<DAType id="SE_origin_V001">
			<BDA name="orCat" bType="Enum" type="SE_orCat_V001" desc="origin category"/>
			<BDA name="orIdent" bType="Octet64" desc="origin identifier"/>
		</DAType>
		<DAType id="SE_setMag_V001">
			<BDA name="i" bType="INT32" desc="integer value"/>
		</DAType>
		<DAType id="SE_sVC_V001">
			<BDA name="scaleFactor" bType="FLOAT32" desc="scale factor"/>
			<BDA name="offset" bType="FLOAT32" desc="offset"/>
		</DAType>
		<DAType id="SE_units_V001">
			<BDA name="SIUnit" bType="Enum" type="SE_SIUnit_V001" desc="SI unit"/>
			<BDA name="multiplier" bType="Enum" type="SE_multiplier_V001" desc="multiplier"/>
		</DAType>
		<DAType id="SE_valWTr_V001">
			<BDA name="posVal" bType="INT8" desc="step position"/>
		</DAType>
		<DAType id="SE_xUnits_V001">
			<BDA name="SIUnit" bType="Enum" type="SE_SIUnit_V001" desc="SI unit"/>
		</DAType>
		<EnumType id="SE_ctlModel_V001">
			<EnumVal ord="0">status-only</EnumVal>
			<EnumVal ord="1">direct-with-normal-security</EnumVal>
			<EnumVal ord="2">sbo-with-normal-security</EnumVal>
			<EnumVal ord="3">direct-with-enhanced-security</EnumVal>
			<EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
		</EnumType>
		<EnumType id="SE_dirGeneral_V001">
			<EnumVal ord="0">unknown</EnumVal>
			<EnumVal ord="1">forward</EnumVal>
			<EnumVal ord="2">backward</EnumVal>
			<EnumVal ord="3">both</EnumVal>
		</EnumType>
		<EnumType id="SE_dirNeut_V001">
			<EnumVal ord="0">unknown</EnumVal>
			<EnumVal ord="1">forward</EnumVal>
			<EnumVal ord="2">backward</EnumVal>
		</EnumType>
		<EnumType id="SE_multiplier_V001">
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
		<EnumType id="SE_orCat_V001">
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
		<EnumType id="SE_seqT_V001">
			<EnumVal ord="0">pos-neg-zero</EnumVal>
			<EnumVal ord="1">dir-quad-zero</EnumVal>
		</EnumType>
		<EnumType id="SE_setVal_V001">
			<EnumVal ord="1">MS</EnumVal>
			<EnumVal ord="2">PER_CYCLE</EnumVal>
			<EnumVal ord="3">CYCLE</EnumVal>
			<EnumVal ord="4">DAY</EnumVal>
			<EnumVal ord="5">WEEK</EnumVal>
			<EnumVal ord="6">MONTH</EnumVal>
			<EnumVal ord="7">YEAR</EnumVal>
			<EnumVal ord="8">EXTERNAL</EnumVal>
		</EnumType>
		<EnumType id="SE_sev_V001">
			<EnumVal ord="0">unknown</EnumVal>
			<EnumVal ord="1">critical</EnumVal>
			<EnumVal ord="2">major</EnumVal>
			<EnumVal ord="3">minor</EnumVal>
			<EnumVal ord="4">warning</EnumVal>
		</EnumType>
		<EnumType id="SE_SIUnit_V001">
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
			<EnumVal ord="86">Ohm/m</EnumVal>
			<EnumVal ord="87">percent/s</EnumVal>
		</EnumType>
		<EnumType id="SE_stVal_V001">
			<EnumVal ord="1">on</EnumVal>
			<EnumVal ord="2">blocked</EnumVal>
			<EnumVal ord="3">test</EnumVal>
			<EnumVal ord="4">test/blocked</EnumVal>
			<EnumVal ord="5">off</EnumVal>
		</EnumType>
		<EnumType id="SE_stVal_V002">
			<EnumVal ord="1">Ok</EnumVal>
			<EnumVal ord="2">Warning</EnumVal>
			<EnumVal ord="3">Alarm</EnumVal>
		</EnumType>
	</DataTypeTemplates>
</SCL>
