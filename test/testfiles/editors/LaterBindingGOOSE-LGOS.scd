<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
	<Header id="GOOSELaterBinding"/>
	<Substation name="AA1" desc="">
		<VoltageLevel name="E1" desc="" nomFreq="50" numPhases="3">
			<Voltage unit="V" multiplier="k">110</Voltage>
			<Bay name="Q02" desc="">
				<ConductingEquipment name="QB2" type="DIS" desc="">
					<EqFunction name="Disconnector">
						<LNode iedName="None" lnClass="CILO" lnInst="1" lnType="Dummy.CILO"/>
						<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="Dummy.CSWI"/>
						<LNode iedName="None" lnClass="XSWI" lnInst="1" lnType="Dummy.XSWI"/>
					</EqFunction>
				</ConductingEquipment>
				<ConductingEquipment name="QB1" type="DIS" desc="">
					<EqFunction name="Disconnector">
						<LNode iedName="None" lnClass="CILO" lnInst="1" lnType="Dummy.CILO"/>
						<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="Dummy.CSWI"/>
						<LNode iedName="None" lnClass="XSWI" lnInst="1" lnType="Dummy.XSWI"/>
					</EqFunction>
				</ConductingEquipment>
			</Bay>
			<Bay name="Q01" desc="">
				<ConductingEquipment name="EarthSwitch" type="DIS" desc="">
					<Terminal name="T1" cNodeName="grounded" substationName="AA1" voltageLevelName="E1" bayName="Q01" connectivityNode="AA1/E1/Q01/grounded"/>
					<EqFunction name="Earth_Switch">
						<LNode iedName="None" lnClass="CILO" lnInst="1" lnType="Dummy.CILO"/>
						<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="Dummy.CSWI"/>
						<LNode iedName="None" lnClass="XSWI" lnInst="1" lnType="Dummy.XSWI"/>
					</EqFunction>
				</ConductingEquipment>
				<ConnectivityNode name="grounded" pathName="AA1/E1/Q01/grounded"/>
			</Bay>
		</VoltageLevel>
	</Substation>
	<Communication>
		<SubNetwork name="StationBus" desc="" type="8-MMS">
			<BitRate unit="b/s" multiplier="M">100</BitRate>
			<ConnectedAP iedName="GOOSE_Subscriber1" apName="AP1"/>
			<ConnectedAP iedName="GOOSE_Subscriber2" apName="AP1"/>
			<ConnectedAP iedName="GOOSE_Subscriber3" apName="AP1"/>
			<ConnectedAP iedName="GOOSE_Subscriber4" apName="AP1"/>
			<ConnectedAP xmlns="http://www.iec.ch/61850/2003/SCL" iedName="GOOSE_Publisher" apName="AP1">
				<GSE ldInst="QB2_Disconnector" cbName="GOOSE2">
					<Address>
						<P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="MAC-Address" xsi:type="tP_MAC-Address">01-0C-CD-01-00-01</P>
						<P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="APPID" xsi:type="tP_APPID">0002</P>
					</Address>
					<MinTime unit="s" multiplier="m">10</MinTime>
					<MaxTime unit="s" multiplier="m">1000</MaxTime>
				</GSE>
				<GSE ldInst="QB2_Disconnector" cbName="GOOSE1">
					<Address>
						<P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="MAC-Address" xsi:type="tP_MAC-Address">01-0C-CD-01-00-00</P>
						<P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="APPID" xsi:type="tP_APPID">0001</P>
					</Address>
					<MinTime unit="s" multiplier="m">10</MinTime>
					<MaxTime unit="s" multiplier="m">1000</MaxTime>
				</GSE>
			</ConnectedAP>
			<ConnectedAP xmlns="http://www.iec.ch/61850/2003/SCL" iedName="GOOSE_Publisher2" apName="AP1">
				<GSE ldInst="QB2_Disconnector" cbName="GOOSE2">
					<Address>
						<P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="MAC-Address" xsi:type="tP_MAC-Address">01-0C-CD-01-00-03</P>
						<P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="APPID" xsi:type="tP_APPID">0003</P>
					</Address>
					<MinTime unit="s" multiplier="m">10</MinTime>
					<MaxTime unit="s" multiplier="m">1000</MaxTime>
				</GSE>
				<GSE ldInst="QB2_Disconnector" cbName="GOOSE1">
					<Address>
						<P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="MAC-Address" xsi:type="tP_MAC-Address">01-0C-CD-01-00-04</P>
						<P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="APPID" xsi:type="tP_APPID">0004</P>
					</Address>
					<MinTime unit="s" multiplier="m">10</MinTime>
					<MaxTime unit="s" multiplier="m">1000</MaxTime>
				</GSE>
			</ConnectedAP>
		</SubNetwork>
	</Communication>
	<IED xmlns="http://www.iec.ch/61850/2003/SCL" name="GOOSE_Subscriber" desc="GOOSE subscriber" manufacturer="Dummy">
		<AccessPoint name="AP1">
			<Server>
				<Authentication/>
				<LDevice inst="Earth_Switch">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
						<Inputs>
							<ExtRef iedName="GOOSE_Publisher" serviceType="GOOSE" ldInst="QB2_Disconnector" lnClass="CSWI" lnInst="1" prefix="" doName="Pos" daName="stVal" srcLDInst="QB2_Disconnector" srcPrefix="" srcLNClass="LLN0" srcCBName="GOOSE2"/>
							<ExtRef iedName="GOOSE_Publisher" serviceType="GOOSE" ldInst="QB2_Disconnector" lnClass="CSWI" lnInst="1" prefix="" doName="Pos" daName="q" srcLDInst="QB2_Disconnector" srcPrefix="" srcLNClass="LLN0" srcCBName="GOOSE2"/>
						</Inputs>
					</LN0>
					<LN prefix="" lnClass="CILO" inst="1" lnType="Dummy.CILO">
						<Inputs>
							<ExtRef intAddr="Pos;CSWI1/Pos/stVal" desc="Interlocking.Input"/>
							<ExtRef intAddr="Pos;CSWI1/Pos/q" desc="Interlocking.Input"/>
						</Inputs>
					</LN>
					<LN prefix="" lnClass="CSWI" inst="1" lnType="Dummy.CSWI">
						<Inputs>
							<ExtRef iedName="GOOSE_Publisher" serviceType="GOOSE" ldInst="QB2_Disconnector" lnClass="CSWI" lnInst="1" prefix="" doName="Pos" daName="stVal" srcLDInst="QB2_Disconnector" srcPrefix="" srcLNClass="LLN0" srcCBName="GOOSE2" intAddr="Pos;CSWI1/Pos/stVal" desc="Interlocking.Input2"/>
							<ExtRef iedName="GOOSE_Publisher" serviceType="GOOSE" ldInst="QB2_Disconnector" lnClass="CSWI" lnInst="1" prefix="" doName="Pos" daName="q" srcLDInst="QB2_Disconnector" srcPrefix="" srcLNClass="LLN0" srcCBName="GOOSE2" intAddr="Pos;CSWI1/Pos/q" desc="Interlocking.Input2"/>
							<ExtRef intAddr="someRestrictedExtRef" desc="Restricted To Pos" pLN="CSWI" pDO="Pos" pDA="stVal"/>
						</Inputs>
					</LN>
					<LN prefix="" lnClass="XSWI" inst="1" lnType="Dummy.XSWI"/>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<IED xmlns="http://www.iec.ch/61850/2003/SCL" name="GOOSE_Subscriber1" desc="GOOSE subscriber" manufacturer="Dummy">
		<Services>
			<SupSubscription maxGo="4" maxSv="0"/>
		</Services>
		<AccessPoint name="AP1">
			<Server>
				<Authentication/>
				<LDevice inst="Earth_Switch">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
						<Inputs>
							<ExtRef iedName="GOOSE_Publisher" serviceType="GOOSE" ldInst="QB2_Disconnector" lnClass="CSWI" lnInst="1" prefix="" doName="Pos" daName="stVal" srcLDInst="QB2_Disconnector" srcPrefix="" srcLNClass="LLN0" srcCBName="GOOSE2"/>
							<ExtRef iedName="GOOSE_Publisher" serviceType="GOOSE" ldInst="QB2_Disconnector" lnClass="CSWI" lnInst="1" prefix="" doName="Pos" daName="q" srcLDInst="QB2_Disconnector" srcPrefix="" srcLNClass="LLN0" srcCBName="GOOSE2"/>
							<ExtRef iedName="GOOSE_Publisher2" serviceType="GOOSE" ldInst="QB2_Disconnector" lnClass="CSWI" lnInst="1" prefix="" doName="Pos" daName="stVal" srcLDInst="QB2_Disconnector" srcPrefix="" srcLNClass="LLN0" srcCBName="GOOSE2"/>
							<ExtRef iedName="GOOSE_Publisher2" serviceType="GOOSE" ldInst="QB2_Disconnector" lnClass="CSWI" lnInst="1" prefix="" doName="Pos" daName="q" srcLDInst="QB2_Disconnector" srcPrefix="" srcLNClass="LLN0" srcCBName="GOOSE2"/>
						</Inputs>
					</LN0>
					<LN prefix="" lnClass="CILO" inst="1" lnType="Dummy.CILO">
						<Inputs>
							<ExtRef intAddr="Pos;CSWI1/Pos/stVal" desc="Interlocking.Input"/>
							<ExtRef intAddr="Pos;CSWI1/Pos/q" desc="Interlocking.Input"/>
						</Inputs>
					</LN>
					<LN prefix="" lnClass="CSWI" inst="1" lnType="Dummy.CSWI">
						<Inputs>
							<ExtRef iedName="GOOSE_Publisher" serviceType="GOOSE" ldInst="QB2_Disconnector" lnClass="CSWI" lnInst="1" prefix="" doName="Pos" daName="stVal" srcLDInst="QB2_Disconnector" srcPrefix="" srcLNClass="LLN0" srcCBName="GOOSE2" intAddr="Pos;CSWI1/Pos/stVal" desc="Interlocking.Input2"/>
							<ExtRef iedName="GOOSE_Publisher" serviceType="GOOSE" ldInst="QB2_Disconnector" lnClass="CSWI" lnInst="1" prefix="" doName="Pos" daName="q" srcLDInst="QB2_Disconnector" srcPrefix="" srcLNClass="LLN0" srcCBName="GOOSE2" intAddr="Pos;CSWI1/Pos/q" desc="Interlocking.Input2"/>
							<ExtRef intAddr="someRestrictedExtRef" desc="Restricted To Pos" pLN="CSWI" pDO="Pos" pDA="stVal"/>
							<ExtRef intAddr="someWeirdAnalogue" serviceType="SMV"/>
						</Inputs>
					</LN>
					<LN prefix="" lnClass="XSWI" inst="1" lnType="Dummy.XSWI"/>
				</LDevice>
				<LDevice inst="SV_supervision">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS">
						<DOI name="GoCBRef">
							<DAI name="setSrcRef">
								<Val>GOOSE_PublisherQB2_Disconnector/LLN0.GOOSE2</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="LGOS" inst="2" lnType="Dummy.LGOS">
						<Private type="OpenSCD.create"/>
						<DOI name="GoCBRef">
							<DAI name="setSrcRef">
								<Val>GOOSE_Publisher2QB2_Disconnector/LLN0.GOOSE2</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="LGOS" inst="3" lnType="Dummy.LGOS">
						<Private type="OpenSCD.create"/>
						<DOI name="GoCBRef">
							<DAI name="setSrcRef">
								<Val>GOOSE_PublisherQB2_Disconnector/LLN0.GOOSE1</Val>
							</DAI>
						</DOI>
					</LN>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<IED xmlns="http://www.iec.ch/61850/2003/SCL" name="GOOSE_Subscriber2" desc="GOOSE subscriber" manufacturer="Dummy">
		<Services>
			<SupSubscription maxGo="4" maxSv="0"/>
		</Services>
		<AccessPoint name="AP1">
			<Server>
				<Authentication/>
				<LDevice inst="Earth_Switch">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="" lnClass="CILO" inst="1" lnType="Dummy.CILO"/>
					<LN prefix="" lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>
					<LN prefix="" lnClass="XSWI" inst="1" lnType="Dummy.XSWI"/>
				</LDevice>
				<LDevice inst="SV_supervision">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS"/>
					<LN lnClass="LGOS" inst="2" lnType="Dummy.LGOS"/>
					<LN lnClass="LGOS" inst="3" lnType="Dummy.LGOS"/>
					<LN lnClass="LGOS" inst="4" lnType="Dummy.LGOS"/>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<IED xmlns="http://www.iec.ch/61850/2003/SCL" name="GOOSE_Subscriber3" desc="GOOSE subscriber" manufacturer="Dummy">
		<Services>
			<SupSubscription maxGo="4" maxSv="0"/>
		</Services>
		<AccessPoint name="AP1">
			<Server>
				<Authentication/>
				<LDevice inst="Earth_Switch">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="" lnClass="CILO" inst="1" lnType="Dummy.CILO"/>
					<LN prefix="" lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>
					<LN prefix="" lnClass="XSWI" inst="1" lnType="Dummy.XSWI"/>
				</LDevice>
				<LDevice inst="SV_supervision">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS1"/>
					<LN lnClass="LGOS" inst="2" lnType="Dummy.LGOS1">
						<DOI name="SomethingLikeGoCBRef">
							<DAI name="setSrcRef" valImport="true" valKind="RO">
								<Val>The supervision instance to rule them all!</Val>
							</DAI>
						</DOI>
					</LN>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<IED xmlns="http://www.iec.ch/61850/2003/SCL" name="GOOSE_Subscriber4" desc="GOOSE subscriber" manufacturer="Dummy">
		<Services>
			<SupSubscription maxGo="4" maxSv="0"/>
		</Services>
		<AccessPoint name="AP1">
			<Server>
				<Authentication/>
				<LDevice inst="Earth_Switch">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="" lnClass="CILO" inst="1" lnType="Dummy.CILO"/>
					<LN prefix="" lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>
					<LN prefix="" lnClass="XSWI" inst="1" lnType="Dummy.XSWI"/>
				</LDevice>
				<LDevice inst="SV_supervision">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS2"/>
					<LN lnClass="LGOS" inst="2" lnType="Dummy.LGOS2"/>
					<LN lnClass="LGOS" inst="3" lnType="Dummy.LGOS2"/>
					<LN lnClass="LGOS" inst="4" lnType="Dummy.LGOS2"/>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<IED xmlns="http://www.iec.ch/61850/2003/SCL" name="GOOSE_Subscriber5" desc="GOOSE subscriber" manufacturer="Dummy">
		<Services>
			<SupSubscription maxGo="4" maxSv="0"/>
		</Services>
		<AccessPoint name="AP1">
			<Server>
				<Authentication/>
				<LDevice inst="Earth_Switch">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="" lnClass="CILO" inst="1" lnType="Dummy.CILO"/>
					<LN prefix="" lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>
					<LN prefix="" lnClass="XSWI" inst="1" lnType="Dummy.XSWI"/>
				</LDevice>
				<LDevice inst="GOOSE_supervision">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS1">
						<DOI name="GoCBRef">
							<DAI name="setSrcRef" valImport="true" valKind="RO">
								<Val>The One True Original</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="LGOS" inst="2" lnType="Dummy.LGOS2"/>
					<LN lnClass="LGOS" inst="3" lnType="Dummy.LGOS2"/>
					<LN lnClass="LGOS" inst="4" lnType="Dummy.LGOS2"/>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<IED xmlns="http://www.iec.ch/61850/2003/SCL" name="GOOSE_Subscriber6" desc="GOOSE subscriber" manufacturer="Dummy">
		<Services>
			<SupSubscription maxGo="4" maxSv="0"/>
		</Services>
		<AccessPoint name="AP1">
			<Server>
				<Authentication/>
				<LDevice inst="Earth_Switch">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="" lnClass="CILO" inst="1" lnType="Dummy.CILO"/>
					<LN prefix="" lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>
					<LN prefix="" lnClass="XSWI" inst="1" lnType="Dummy.XSWI"/>
				</LDevice>
				<LDevice inst="GOOSE_supervision">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS1">
						<DOI name="GoCBRef">
							<DAI name="setSrcRef" valImport="true" valKind="Conf">
								<Val>The One True Original</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="LGOS" inst="2" lnType="Dummy.LGOS2"/>
					<LN lnClass="LGOS" inst="3" lnType="Dummy.LGOS2"/>
					<LN lnClass="LGOS" inst="4" lnType="Dummy.LGOS2"/>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<IED xmlns="http://www.iec.ch/61850/2003/SCL" name="GOOSE_Subscriber7" desc="GOOSE subscriber" manufacturer="Dummy">
		<Services>
			<SupSubscription maxGo="4" maxSv="0"/>
		</Services>
		<AccessPoint name="AP1">
			<Server>
				<Authentication/>
				<LDevice inst="Earth_Switch">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="" lnClass="CILO" inst="1" lnType="Dummy.CILO"/>
					<LN prefix="" lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>
					<LN prefix="" lnClass="XSWI" inst="1" lnType="Dummy.XSWI"/>
				</LDevice>
				<LDevice inst="GOOSE_supervision">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN lnClass="LGOS" inst="1" lnType="Dummy.LGOS1">
						<DOI name="GoCBRef">
							<DAI name="setSrcRef" valImport="true" valKind="Conf">
								<Val></Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="LGOS" inst="2" lnType="Dummy.LGOS2"/>
					<LN lnClass="LGOS" inst="3" lnType="Dummy.LGOS2"/>
					<LN lnClass="LGOS" inst="4" lnType="Dummy.LGOS2"/>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<IED name="GOOSE_Publisher" desc="GOOSE publisher" manufacturer="Dummy">
		<AccessPoint name="AP1">
			<Server>
				<Authentication/>
				<LDevice inst="QB2_Disconnector">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
						<DataSet name="GOOSE2sDataSet">
							<FCDA ldInst="QB2_Disconnector" prefix="" lnClass="CSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="QB2_Disconnector" prefix="" lnClass="CSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
						</DataSet>
						<DataSet name="GOOSE1sDataSet">
							<FCDA ldInst="QB1_Disconnector" prefix="" lnClass="CSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="QB1_Disconnector" prefix="" lnClass="CSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
						</DataSet>
						<GSEControl name="GOOSE2" type="GOOSE" appID="GOOSE2" confRev="1" datSet="GOOSE2sDataSet"/>
						<GSEControl name="GOOSE1" type="GOOSE" appID="GOOSE1" confRev="1" datSet="GOOSE1sDataSet"/>
					</LN0>
					<LN prefix="" lnClass="CILO" inst="1" lnType="Dummy.CILO"/>
					<LN prefix="" lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>
					<LN prefix="" lnClass="XSWI" inst="1" lnType="Dummy.XSWI"/>
				</LDevice>
				<LDevice inst="QB1_Disconnector">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="" lnClass="CILO" inst="1" lnType="Dummy.CILO"/>
					<LN prefix="" lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>
					<LN prefix="" lnClass="XSWI" inst="1" lnType="Dummy.XSWI"/>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<IED name="GOOSE_Publisher2" desc="GOOSE publisher" manufacturer="Dummy">
		<AccessPoint name="AP1">
			<Server>
				<Authentication/>
				<LDevice inst="QB2_Disconnector">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
						<DataSet name="GOOSE2sDataSet">
							<FCDA ldInst="QB2_Disconnector" prefix="" lnClass="CSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="QB2_Disconnector" prefix="" lnClass="CSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
						</DataSet>
						<DataSet name="GOOSE1sDataSet">
							<FCDA ldInst="QB1_Disconnector" prefix="" lnClass="CSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="QB1_Disconnector" prefix="" lnClass="CSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
						</DataSet>
						<GSEControl name="GOOSE2" type="GOOSE" appID="GOOSE2" confRev="1" datSet="GOOSE2sDataSet"/>
						<GSEControl name="GOOSE1" type="GOOSE" appID="GOOSE1" confRev="1" datSet="GOOSE1sDataSet"/>
					</LN0>
					<LN prefix="" lnClass="CILO" inst="1" lnType="Dummy.CILO"/>
					<LN prefix="" lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>
					<LN prefix="" lnClass="XSWI" inst="1" lnType="Dummy.XSWI"/>
				</LDevice>
				<LDevice inst="QB1_Disconnector">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="" lnClass="CILO" inst="1" lnType="Dummy.CILO"/>
					<LN prefix="" lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>
					<LN prefix="" lnClass="XSWI" inst="1" lnType="Dummy.XSWI"/>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<DataTypeTemplates>
		<LNodeType lnClass="LGOS" id="Dummy.LGOS">
			<DO name="GoCBRef" type="Dummy.ORG"/>
			<DO name="St" type="OpenSCD_SPS_simple"/>
			<DO name="Mod" type="OpenSCD_ENC_Mod"/>
			<DO name="Health" type="OpenSCD_ENS_Health"/>
			<DO name="Beh" type="OpenSCD_ENS_Beh"/>
			<DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
		</LNodeType>
		<LNodeType lnClass="LGOS" id="Dummy.LGOS1">
			<DO name="GoCBRef" type="Dummy.ORG1"/>
			<DO name="SomethingLikeGoCBRef" type="Dummy.ORG1"/>
			<DO name="St" type="OpenSCD_SPS_simple"/>
			<DO name="Mod" type="OpenSCD_ENC_Mod"/>
			<DO name="Health" type="OpenSCD_ENS_Health"/>
			<DO name="Beh" type="OpenSCD_ENS_Beh"/>
			<DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
		</LNodeType>
		<LNodeType lnClass="LGOS" id="Dummy.LGOS2">
			<DO name="GoCBRef" type="Dummy.ORG2"/>
			<DO name="St" type="OpenSCD_SPS_simple"/>
			<DO name="Mod" type="OpenSCD_ENC_Mod"/>
			<DO name="Health" type="OpenSCD_ENS_Health"/>
			<DO name="Beh" type="OpenSCD_ENS_Beh"/>
			<DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
		</LNodeType>
		<LNodeType lnClass="XSWI" id="Dummy.XSWI" desc="Switch: one phase represenation">
			<DO name="Mod" type="OpenSCD_ENC_Mod"/>
			<DO name="Beh" type="OpenSCD_ENS_Beh"/>
			<DO name="Health" type="OpenSCD_ENS_Health"/>
			<DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
			<DO name="LocKey" type="OpenSCD_SPS_simple"/>
			<DO name="Loc" type="OpenSCD_SPS_simple"/>
			<DO name="OpCnt" type="OpenSCD_INS_simple"/>
			<DO name="Pos" type="OpenSCD_DPC_statusonly"/>
			<DO name="BlkOpn" type="OpenSCD_SPC_statusonly"/>
			<DO name="BlkCls" type="OpenSCD_SPC_statusonly"/>
			<DO name="SwTyp" type="OpenSCD_ENS_SwTyp"/>
		</LNodeType>
		<LNodeType lnClass="CSWI" id="Dummy.CSWI" desc="Switch control: no process bus(PB)">
			<DO name="Mod" type="OpenSCD_ENC_Mod"/>
			<DO name="Beh" type="OpenSCD_ENS_Beh"/>
			<DO name="Health" type="OpenSCD_ENS_Health"/>
			<DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
			<DO name="LocKey" type="OpenSCD_SPS_simple"/>
			<DO name="Loc" type="OpenSCD_SPS_simple"/>
			<DO name="Pos" type="OpenSCD_DPC"/>
		</LNodeType>
		<LNodeType lnClass="CILO" id="Dummy.CILO" desc="Interlocking">
			<DO name="Mod" type="OpenSCD_ENC_Mod"/>
			<DO name="Beh" type="OpenSCD_ENS_Beh"/>
			<DO name="Health" type="OpenSCD_ENS_Health"/>
			<DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
			<DO name="EnaOpn" type="OpenSCD_SPS_simple"/>
			<DO name="EnaCls" type="OpenSCD_SPS_simple"/>
		</LNodeType>
		<LNodeType lnClass="LLN0" id="Dummy.LLN0" desc="Logical device LN: parent">
			<DO name="Mod" type="OpenSCD_ENC_Mod"/>
			<DO name="Beh" type="OpenSCD_ENS_Beh"/>
			<DO name="Health" type="OpenSCD_ENS_Health"/>
			<DO name="NamPlt" type="OpenSCD_LPL_LD"/>
			<DO name="LocKey" type="OpenSCD_SPS_simple"/>
			<DO name="Loc" type="OpenSCD_SPS_simple"/>
		</LNodeType>
		<DOType cdc="ORG" id="Dummy.ORG">
			<DA name="setSrcRef" bType="ObjRef" dchg="true" valKind="RO" valImport="true" fc="SP"/>
		</DOType>
		<DOType cdc="ORG" id="Dummy.ORG1">
			<DA name="setSrcRef" bType="ObjRef" dchg="true" valKind="Conf" valImport="true" fc="SP"/>
		</DOType>
		<DOType cdc="ORG" id="Dummy.ORG2">
			<DA name="setSrcRef" bType="ObjRef" dchg="true" fc="SP"/>
		</DOType>
		<DOType cdc="ENS" id="OpenSCD_ENS_SwTyp">
			<DA fc="ST" dchg="true" name="stVal" bType="Enum" type="SwitchFunctionKind"/>
			<DA fc="ST" qchg="true" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
		</DOType>
		<DOType cdc="SPC" id="OpenSCD_SPC_statusonly">
			<DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="ctlModel" bType="Enum" dchg="true" type="OpenSCD_StatusOnly" fc="CF">
				<Val>status-only</Val>
			</DA>
		</DOType>
		<DOType cdc="DPC" id="OpenSCD_DPC_statusonly">
			<DA name="stVal" bType="Dbpos" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="ctlModel" bType="Enum" fc="CF" type="OpenSCD_StatusOnly">
				<Val>status-only</Val>
			</DA>
		</DOType>
		<DOType cdc="INS" id="OpenSCD_INS_simple">
			<DA name="stVal" bType="INT32" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="d" bType="VisString255" fc="DC"/>
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
		<DOType cdc="LPL" id="OpenSCD_LPL_noLD">
			<DA name="vendor" bType="VisString255" fc="DC"/>
			<DA name="swRev" bType="VisString255" fc="DC"/>
			<DA name="d" bType="VisString255" fc="DC"/>
			<DA name="configRev" bType="VisString255" fc="DC"/>
		</DOType>
		<DOType cdc="SPS" id="OpenSCD_SPS_simple">
			<DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="d" bType="VisString255" fc="DC"/>
		</DOType>
		<DOType cdc="LPL" id="OpenSCD_LPL_LD">
			<DA name="vendor" bType="VisString255" fc="DC"/>
			<DA name="swRev" bType="VisString255" fc="DC"/>
			<DA name="d" bType="VisString255" fc="DC"/>
			<DA name="configRev" bType="VisString255" fc="DC"/>
			<DA name="ldNs" bType="VisString255" fc="EX">
				<Val>IEC 61850-7-4:2007B4</Val>
			</DA>
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
		<EnumType id="SwitchFunctionKind">
			<EnumVal ord="1">Load Break</EnumVal>
			<EnumVal ord="2">Disconnector</EnumVal>
			<EnumVal ord="3">Earthing Switch</EnumVal>
			<EnumVal ord="4">High Speed Earthing Switch</EnumVal>
		</EnumType>
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
</SCL>
