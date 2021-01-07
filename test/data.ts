export function getDocument(valid = true): XMLDocument {
  return new DOMParser().parseFromString(
    valid ? validSCL : invalidSCL,
    'application/xml'
  );
}

const xmlSerializer = new XMLSerializer();

export function serialize(doc: XMLDocument): string {
  return xmlSerializer.serializeToString(doc);
}

export const validSCL = `<?xml version="1.0" encoding="UTF-8"?>
<SCL version="2007" revision="B" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:txy="http://www.iec.ch/61850/2003/Terminal" xmlns:scl="http://www.iec.ch/61850/2003/SCL" xsi:schemaLocation="http://www.iec.ch/61850/2003/SCL SCL.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:IEC_60870_5_104="http://www.iec.ch/61850-80-1/2007/SCL">
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
				<ConductingEquipment type="DIS" name="QC11" desc="busbar earth switch QC11"/>
				<ConductingEquipment type="DIS" name="QC21" desc="busbar disconnector Q12"/>
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
				<LDevice inst="CBSW">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
						<DataSet name="GooseDataSet1">
							<FCDA ldInst="CBSW" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" daName="q" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="q" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="3" doName="Pos" daName="stVal" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="3" doName="Pos" daName="q" fc="ST" />
						</DataSet>
						<DataSet name="ReportDataSet1">
							<FCDA ldInst="CBSW" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="3" doName="Pos" fc="ST" />
						</DataSet>
						<DataSet name="ReportDataSet2">
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind1" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind2" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind3" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind4" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind5" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind6" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind7" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind8" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO1" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO2" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO3" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO4" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO5" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO6" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO7" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO8" fc="ST" />
						</DataSet>
						<ReportControl confRev="1" buffered="false" bufTime="100" intgPd="0" name="urcb" datSet="ReportDataSet1">
							<TrgOps dchg="true" qchg="true" dupd="true" period="true" gi="true" />
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="false" entryID="true" configRef="true" />
							<RptEnabled max="5" />
						</ReportControl>
						<ReportControl confRev="1" buffered="true" bufTime="100" intgPd="0" name="brcb">
							<TrgOps dchg="true" qchg="true" dupd="true" period="true" gi="true" />
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" dataRef="false" entryID="true" configRef="true" />
							<RptEnabled max="5" />
						</ReportControl>
						<DOI name="Mod">
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
						</DOI>
						<DOI name="NamPlt">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="d">
								<Val>ISIO 200 circuit breaker and disconnector interface</Val>
							</DAI>
							<DAI name="configRev">
								<Val>1</Val>
							</DAI>
							<DAI name="ldNs">
								<Val>IEC 61850-7-4:2007A</Val>
							</DAI>
						</DOI>
						<GSEControl type="GOOSE" appID="IED1" fixedOffs="false" confRev="1" name="GCB" datSet="GooseDataSet1" />
					</LN0>
					<LN lnClass="LPHD" inst="1" lnType="Dummy.LPHD1">
						<DOI name="PhyNam">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="hwRev">
								<Val>OMICRON PRISCILLA Type G Rev: 0002</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="serNum">
								<Val>DB495L</Val>
							</DAI>
							<DAI name="model">
								<Val>ISIO 200</Val>
							</DAI>
						</DOI>
						<DOI name="Proxy">
							<DAI name="d">
								<Val>not a proxy</Val>
							</DAI>
						</DOI>
						<DOI name="Sim">
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="XCBR" inst="1" lnType="Dummy.XCBR1">
						<DOI name="NamPlt">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="d">
								<Val>Circuit breaker 1</Val>
							</DAI>
						</DOI>
						<DOI name="Loc">
							<DAI name="d">
								<Val>Local control behavior regarding switching authority</Val>
							</DAI>
						</DOI>
						<DOI name="Pos">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input1, inverted=false, bitIndex=0}, {product=ISIO, signal=input2, inverted=false, bitIndex=1}" />
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val>Position of circuit breaker 1, mapped to ISIO input 1 and 2</Val>
							</DAI>
						</DOI>
						<DOI name="BlkOpn">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
						<DOI name="BlkCls">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="XSWI" inst="1" lnType="Dummy.XSWI1">
						<DOI name="NamPlt">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="d">
								<Val>Disconnector 1</Val>
							</DAI>
						</DOI>
						<DOI name="Loc">
							<DAI name="d">
								<Val>Local control behavior regarding switching authority</Val>
							</DAI>
						</DOI>
						<DOI name="Pos">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input3, inverted=false, bitIndex=0}, {product=ISIO, signal=input4, inverted=false, bitIndex=1}" />
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val>Position of disconnector 1, mapped to ISIO inputs 3 and 4</Val>
							</DAI>
						</DOI>
						<DOI name="BlkOpn">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
						<DOI name="BlkCls">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="XSWI" inst="2" lnType="Dummy.XSWI1">
						<DOI name="NamPlt">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="d">
								<Val>Disconnector 2</Val>
							</DAI>
						</DOI>
						<DOI name="Loc">
							<DAI name="d">
								<Val>Local control behavior regarding switching authority</Val>
							</DAI>
						</DOI>
						<DOI name="Pos">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input5, inverted=false, bitIndex=0}, {product=ISIO, signal=input6, inverted=false, bitIndex=1}" />
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val>Position of disconnector 2, mapped to ISIO inputs 5 and 6</Val>
							</DAI>
						</DOI>
						<DOI name="BlkOpn">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
						<DOI name="BlkCls">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="XSWI" inst="3" lnType="Dummy.XSWI1">
						<DOI name="NamPlt">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="d">
								<Val>Disconnector 3</Val>
							</DAI>
						</DOI>
						<DOI name="Loc">
							<DAI name="d">
								<Val>Local control behavior regarding switching authority</Val>
							</DAI>
						</DOI>
						<DOI name="Pos">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input7, inverted=false, bitIndex=0}, {product=ISIO, signal=input8, inverted=false, bitIndex=1}" />
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val>Position of disconnector 3, mapped to ISIO inputs 7 and 8</Val>
							</DAI>
						</DOI>
						<DOI name="BlkOpn">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
						<DOI name="BlkCls">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="GGIO" inst="1" lnType="Dummy.GGIO1">
						<DOI name="NamPlt">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary I/Os</Val>
							</DAI>
						</DOI>
						<DOI name="Ind1">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input1, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 1</Val>
							</DAI>
						</DOI>
						<DOI name="Ind2">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input2, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 2</Val>
							</DAI>
						</DOI>
						<DOI name="Ind3">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input3, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 3</Val>
							</DAI>
						</DOI>
						<DOI name="Ind4">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input4, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 4</Val>
							</DAI>
						</DOI>
						<DOI name="Ind5">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input5, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 5</Val>
							</DAI>
						</DOI>
						<DOI name="Ind6">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input6, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 6</Val>
							</DAI>
						</DOI>
						<DOI name="Ind7">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input7, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 7</Val>
							</DAI>
						</DOI>
						<DOI name="Ind8">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input8, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 8</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO1">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output1, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 1</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO2">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output2, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 2</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO3">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output3, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 3</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO4">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output4, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 4</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO5">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output5, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 5</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO6">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output6, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 6</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO7">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output7, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 7</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO8">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output8, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 8</Val>
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
						<DataSet name="GooseDataSet1">
							<FCDA ldInst="CBSW" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" daName="q" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="q" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="3" doName="Pos" daName="stVal" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="3" doName="Pos" daName="q" fc="ST" />
						</DataSet>
						<DataSet name="ReportDataSet1">
							<FCDA ldInst="CBSW" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="3" doName="Pos" fc="ST" />
						</DataSet>
						<DataSet name="ReportDataSet2">
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind1" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind2" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind3" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind4" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind5" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind6" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind7" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="Ind8" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO1" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO2" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO3" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO4" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO5" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO6" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO7" fc="ST" />
							<FCDA ldInst="CBSW" prefix="" lnClass="GGIO" lnInst="1" doName="SPCSO8" fc="ST" />
						</DataSet>
						<ReportControl confRev="1" bufTime="100" name="urcb" datSet="ReportDataSet1">
							<TrgOps dchg="true" qchg="true" dupd="true" period="true" />
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" entryID="true" configRef="true" />
							<RptEnabled max="5" />
						</ReportControl>
						<ReportControl confRev="1" buffered="true" bufTime="100" name="brcb">
							<TrgOps dchg="true" qchg="true" dupd="true" period="true" />
							<OptFields seqNum="true" timeStamp="true" dataSet="true" reasonCode="true" entryID="true" configRef="true" />
							<RptEnabled max="5" />
						</ReportControl>
						<DOI name="Mod">
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
						</DOI>
						<DOI name="NamPlt">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="d">
								<Val>ISIO 200 circuit breaker and disconnector interface</Val>
							</DAI>
							<DAI name="configRev">
								<Val>1</Val>
							</DAI>
							<DAI name="ldNs">
								<Val>IEC 61850-7-4:2007A</Val>
							</DAI>
						</DOI>
						<GSEControl appID="IED2" confRev="1" name="GCB" datSet="GooseDataSet1" />
					</LN0>
					<LN lnClass="LPHD" inst="1" lnType="Dummy.LPHD1">
						<DOI name="PhyNam">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="hwRev">
								<Val>OMICRON PRISCILLA Type G Rev: 0002</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="serNum">
								<Val>AM156K</Val>
							</DAI>
							<DAI name="model">
								<Val>ISIO 200</Val>
							</DAI>
						</DOI>
						<DOI name="Proxy">
							<DAI name="d">
								<Val>not a proxy</Val>
							</DAI>
						</DOI>
						<DOI name="Sim">
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="XCBR" inst="1" lnType="Dummy.XCBR1">
						<DOI name="NamPlt">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="d">
								<Val>Circuit breaker 1</Val>
							</DAI>
						</DOI>
						<DOI name="Loc">
							<DAI name="d">
								<Val>Local control behavior regarding switching authority</Val>
							</DAI>
						</DOI>
						<DOI name="Pos">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input1, inverted=false, bitIndex=0}, {product=ISIO, signal=input2, inverted=false, bitIndex=1}" />
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val>Position of circuit breaker 1, mapped to ISIO input 1 and 2</Val>
							</DAI>
						</DOI>
						<DOI name="BlkOpn">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
						<DOI name="BlkCls">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="XSWI" inst="1" lnType="Dummy.XSWI1">
						<DOI name="NamPlt">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="d">
								<Val>Disconnector 1</Val>
							</DAI>
						</DOI>
						<DOI name="Loc">
							<DAI name="d">
								<Val>Local control behavior regarding switching authority</Val>
							</DAI>
						</DOI>
						<DOI name="Pos">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input3, inverted=false, bitIndex=0}, {product=ISIO, signal=input4, inverted=false, bitIndex=1}" />
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val>Position of disconnector 1, mapped to ISIO inputs 3 and 4</Val>
							</DAI>
						</DOI>
						<DOI name="BlkOpn">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
						<DOI name="BlkCls">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="XSWI" inst="2" lnType="Dummy.XSWI1">
						<DOI name="NamPlt">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="d">
								<Val>Disconnector 2</Val>
							</DAI>
						</DOI>
						<DOI name="Loc">
							<DAI name="d">
								<Val>Local control behavior regarding switching authority</Val>
							</DAI>
						</DOI>
						<DOI name="Pos">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input5, inverted=false, bitIndex=0}, {product=ISIO, signal=input6, inverted=false, bitIndex=1}" />
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val>Position of disconnector 2, mapped to ISIO inputs 5 and 6</Val>
							</DAI>
						</DOI>
						<DOI name="BlkOpn">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
						<DOI name="BlkCls">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="XSWI" inst="3" lnType="Dummy.XSWI1">
						<DOI name="NamPlt">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="d">
								<Val>Disconnector 3</Val>
							</DAI>
						</DOI>
						<DOI name="Loc">
							<DAI name="d">
								<Val>Local control behavior regarding switching authority</Val>
							</DAI>
						</DOI>
						<DOI name="Pos">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input7, inverted=false, bitIndex=0}, {product=ISIO, signal=input8, inverted=false, bitIndex=1}" />
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val>Position of disconnector 3, mapped to ISIO inputs 7 and 8</Val>
							</DAI>
						</DOI>
						<DOI name="BlkOpn">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
						<DOI name="BlkCls">
							<DAI name="ctlModel">
								<Val>status-only</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="GGIO" inst="1" lnType="Dummy.GGIO1">
						<DOI name="NamPlt">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary I/Os</Val>
							</DAI>
						</DOI>
						<DOI name="Ind1">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input1, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 1</Val>
							</DAI>
						</DOI>
						<DOI name="Ind2">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input2, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 2</Val>
							</DAI>
						</DOI>
						<DOI name="Ind3">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input3, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 3</Val>
							</DAI>
						</DOI>
						<DOI name="Ind4">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input4, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 4</Val>
							</DAI>
						</DOI>
						<DOI name="Ind5">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input5, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 5</Val>
							</DAI>
						</DOI>
						<DOI name="Ind6">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input6, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 6</Val>
							</DAI>
						</DOI>
						<DOI name="Ind7">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input7, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 7</Val>
							</DAI>
						</DOI>
						<DOI name="Ind8">
							<DAI name="stVal" sAddr="{product=ISIO, signal=input8, inverted=false}" />
							<DAI name="d">
								<Val>Status of binary input 8</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO1">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output1, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 1</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO2">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output2, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 2</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO3">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output3, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 3</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO4">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output4, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 4</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO5">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output5, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 5</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO6">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output6, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 6</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO7">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output7, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 7</Val>
							</DAI>
						</DOI>
						<DOI name="SPCSO8">
							<DAI name="stVal" sAddr="{product=ISIO, signal=output8, inverted=false}" />
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val>Binary output 8</Val>
							</DAI>
						</DOI>
					</LN>
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
			<DO name="Proxy" type="Dummy.LPHD1.Proxy" />
			<DO name="Sim" type="Dummy.LPHD1.Sim" />
		</LNodeType>
		<LNodeType lnClass="XCBR" id="Dummy.XCBR1">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="Loc" type="Dummy.LPHD1.Proxy" />
			<DO name="OpCnt" type="Dummy.XCBR1.OpCnt" />
			<DO name="Pos" type="Dummy.XCBR1.Pos" />
			<DO name="BlkOpn" type="Dummy.XCBR1.BlkOpn" />
			<DO name="BlkCls" type="Dummy.XCBR1.BlkOpn" />
		</LNodeType>
		<LNodeType lnClass="XSWI" id="Dummy.XSWI1">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="Loc" type="Dummy.LPHD1.Proxy" />
			<DO name="OpCnt" type="Dummy.XCBR1.OpCnt" />
			<DO name="Pos" type="Dummy.XCBR1.Pos" />
			<DO name="BlkOpn" type="Dummy.XCBR1.BlkOpn" />
			<DO name="BlkCls" type="Dummy.XCBR1.BlkOpn" />
		</LNodeType>
		<LNodeType lnClass="GGIO" id="Dummy.GGIO1">
			<DO name="Beh" type="Dummy.LLN0.Beh" />
			<DO name="NamPlt" type="Dummy.XCBR1.NamPlt" />
			<DO name="Ind1" type="Dummy.LPHD1.Proxy" />
			<DO name="Ind2" type="Dummy.LPHD1.Proxy" />
			<DO name="Ind3" type="Dummy.LPHD1.Proxy" />
			<DO name="Ind4" type="Dummy.LPHD1.Proxy" />
			<DO name="Ind5" type="Dummy.LPHD1.Proxy" />
			<DO name="Ind6" type="Dummy.LPHD1.Proxy" />
			<DO name="Ind7" type="Dummy.LPHD1.Proxy" />
			<DO name="Ind8" type="Dummy.LPHD1.Proxy" />
			<DO name="SPCSO1" type="Dummy.LPHD1.Sim" />
			<DO name="SPCSO2" type="Dummy.LPHD1.Sim" />
			<DO name="SPCSO3" type="Dummy.LPHD1.Sim" />
			<DO name="SPCSO4" type="Dummy.LPHD1.Sim" />
			<DO name="SPCSO5" type="Dummy.LPHD1.Sim" />
			<DO name="SPCSO6" type="Dummy.LPHD1.Sim" />
			<DO name="SPCSO7" type="Dummy.LPHD1.Sim" />
			<DO name="SPCSO8" type="Dummy.LPHD1.Sim" />
		</LNodeType>
		<DOType cdc="ENC" id="Dummy.LLN0.Mod">
			<DA fc="ST" name="stVal" bType="Enum" type="Beh" />
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
			<DA fc="ST" name="stVal" bType="Enum" type="Beh" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
		</DOType>
		<DOType cdc="ENS" id="Dummy.LLN0.Health">
			<DA fc="ST" name="stVal" bType="Enum" type="SIPROTEC5_Textlist_Health_V07.80.17_V02.00.00" />
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
		<DOType cdc="SPS" id="Dummy.LPHD1.Proxy">
			<DA fc="ST" name="stVal" bType="BOOLEAN" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="DC" name="d" bType="VisString255" />
		</DOType>
		<DOType cdc="DPC" id="Dummy.XCBR1.Pos">
			<DA fc="ST" name="stVal" bType="Dbpos" />
			<DA fc="ST" name="q" bType="Quality" />
			<DA fc="ST" name="t" bType="Timestamp" />
			<DA fc="CF" name="ctlModel" bType="Enum" type="Dummy_ctlModel" />
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
		<DAType id="Dummy_origin">
			<BDA name="orCat" bType="Enum" type="Dummy_orCategory" />
			<BDA name="orIdent" bType="Octet64" />
		</DAType>
		<DAType id="Dummy.LLN0.Mod.SBOw">
			<BDA name="ctlVal" bType="Enum" type="Beh" />
			<BDA name="origin" bType="Struct" type="Dummy_origin" />
			<BDA name="ctlNum" bType="INT8U" />
			<BDA name="T" bType="Timestamp" />
			<BDA name="Test" bType="BOOLEAN" />
			<BDA name="Check" bType="Check" />
		</DAType>
		<DAType id="Dummy.LLN0.Mod.Cancel">
			<BDA name="ctlVal" bType="Enum" type="Beh" />
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
		<EnumType id="Dummy_ctlModel">
			<EnumVal ord="0">status-only</EnumVal>
			<EnumVal ord="1">direct-with-normal-security</EnumVal>
			<EnumVal ord="2">sbo-with-normal-security</EnumVal>
			<EnumVal ord="3">direct-with-enhanced-security</EnumVal>
			<EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
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
	</DataTypeTemplates>
</SCL>`;

export const invalidSCL = `<?xml version="1.0" encoding="UTF-8"?>
<SCL version="2007" revision="B" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:txy="http://www.iec.ch/61850/2003/Terminal" xmlns:scl="http://www.iec.ch/61850/2003/SCL" xsi:schemaLocation="http://www.iec.ch/61850/2003/SCL SCL.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:IEC_60870_5_104="http://www.iec.ch/61850-80-1/2007/SCL">
	<Header id="TrainingIEC61850" version="1" revision="143" toolID="OpenSCD, Version 0.0.0" nameStructure="IEDName">
		<Text>TrainingIEC61850</Text>
		<History><Hitem version="1" revision="143" when="Wednesday, September 25, 2019 9:11:36 AM" who="TestUser" what="TestChanges" why="TestReason" />
		</History>
	</Header>
	<Substation desc="Substation">
		<VoltageLevel name="E1" desc="Voltage Level">
			<Voltage unit="V" multiplier="k">110</Voltage>
			<Bay name="COUPLING_BAY" desc="Bay">
				<ConductingEquipment type="CBR" name="QA1" desc="coupling field ciscuit breaker"/>
				<ConductingEquipment type="DIS" name="QB1" desc="busbar disconnector QB1"/>
				<ConductingEquipment type="DIS" name="QB2" desc="busbar disconnector QB2"/>
				<ConductingEquipment type="DIS" name="QC11" desc="busbar earth switch QC11"/>
				<ConductingEquipment type="DIS" name="QC21" desc="busbar disconnector Q12"/>
			</Bay>
		</VoltageLevel>
	</Substation>
</SCL>`;

export const importIID = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
    <Header id="TestIID"/>
    <Substation name="AA1" desc="Substation">
        <VoltageLevel nomFreq="50.0" numPhases="3" name="E1" desc="110kV">
            <Voltage unit="V" multiplier="k">110.0</Voltage>
            <Bay name="Q01" desc="Bay01">
                <ConductingEquipment type="CBR" name="QA1" desc="Q01 CB">
                    <LNode iedName="TestImportIED" ldInst="TestLD" prefix="" lnClass="XCBR" lnInst="1"/>
                    <LNode iedName="TestImportIED" ldInst="TestLD" prefix="" lnClass="CSWI" lnInst="1"/>
                    <LNode iedName="TestImportIED" ldInst="TestLD" prefix="" lnClass="CILO" lnInst="1"/>
                </ConductingEquipment>
            </Bay>
        </VoltageLevel>
    </Substation>
    <Communication>
        <SubNetwork type="8-MMS" name="Stationbus">
            <ConnectedAP iedName="TestImportIED" apName="E">
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
    </Communication>
    <IED name="TestImportIED" type="TestType" manufacturer="TestMan" originalSclVersion="2007" originalSclRevision="B" originalRelease="4">
        <Services nameLength="64">
            <SettingGroups>
                <SGEdit resvTms="true"/>
            </SettingGroups>
            <GetDirectory/>
            <GetDataObjectDefinition/>
            <DataObjectDirectory/>
            <GetDataSetValue/>
            <DataSetDirectory/>
            <ConfDataSet modify="true" maxAttributes="100" max="50"/>
            <ReadWrite/>
            <ConfReportControl bufMode="both" bufConf="true" max="60"/>
            <GetCBValues/>
            <ReportSettings rptID="Dyn" optFields="Dyn" bufTime="Dyn" trgOps="Dyn" intgPd="Dyn" resvTms="true" cbName="Conf" datSet="Dyn"/>
            <GSESettings appID="Conf" dataLabel="Fix" cbName="Conf" datSet="Conf"/>
            <GOOSE fixedOffs="false" max="16"/>
            <ConfLNs fixPrefix="false" fixLnInst="false"/>
            <ConfLdName/>
            <SupSubscription maxGo="128" maxSv="60"/>
            <ValueHandling setToRO="false"/>
        </Services>
        <AccessPoint name="E">
            <Server timeout="0">
                <LDevice inst="TestLD">
                    <LN0 lnClass="LLN0" inst="" lnType="LNodeTypeLLN0">
                        <DOI name="Mod"/>
                        <DOI name="Beh"/>
                        <DOI name="Health"/>
                        <DOI name="NamPlt" desc="Name plate">
                            <DAI name="configRev">
<Val>2019-11-07 08:52:28</Val>
                            </DAI>
                            <DAI name="ldNs">
<Val>IEC 61850-7-4:2007</Val>
                            </DAI>
                        </DOI>
                    </LN0>
					<LN lnClass="LPHD" inst="1" lnType="Dummy.LPHD1">
						<DOI name="PhyNam">
							<DAI name="vendor">
								<Val>OMICRON electronics</Val>
							</DAI>
							<DAI name="hwRev">
								<Val>OMICRON PRISCILLA Type G Rev: 0002</Val>
							</DAI>
							<DAI name="swRev">
								<Val>2.11.0014</Val>
							</DAI>
							<DAI name="serNum">
								<Val>AM156K</Val>
							</DAI>
							<DAI name="model">
								<Val>ISIO 200</Val>
							</DAI>
						</DOI>
						<DOI name="Proxy">
							<DAI name="d">
								<Val>not a proxy</Val>
							</DAI>
						</DOI>
						<DOI name="Sim">
							<DAI name="ctlModel">
								<Val>sbo-with-enhanced-security</Val>
							</DAI>
							<DAI name="sboTimeout">
								<Val>30000</Val>
							</DAI>
							<DAI name="operTimeout">
								<Val>10000</Val>
							</DAI>
							<DAI name="d">
								<Val />
							</DAI>
						</DOI>
					</LN>
                    <LN prefix="" lnClass="XCBR" inst="1" lnType="TestLNodeTypeXCBR">
                        <DOI name="Mod"/>
                        <DOI name="Beh"/>
                        <DOI name="Health"/>
                        <DOI name="NamPlt">
                            <DAI name="configRev">
<Val>2019-11-07 08:52:28</Val>
                            </DAI>
                        </DOI>
                        <DOI name="Loc"/>
                        <DOI name="OpCnt"/>
                        <DOI name="Pos">
                            <SDI name="pulseConfig">
<DAI name="cmdQual">
    <Val>pulse</Val>
</DAI>
<DAI name="onDur">
    <Val>100</Val>
</DAI>
<DAI name="offDur">
    <Val>0</Val>
</DAI>
<DAI name="numPls">
    <Val>1</Val>
</DAI>
                            </SDI>
                        </DOI>
                        <DOI name="BlkOpn" desc="Block opening"/>
                        <DOI name="BlkCls" desc="Block closing"/>
                    </LN>
                    <LN prefix="" lnClass="CSWI" inst="1" lnType="TestLNodeTypeCSWI">
                        <DOI name="Mod"/>
                        <DOI name="Beh"/>
                        <DOI name="Health"/>
                        <DOI name="NamPlt">
                            <DAI name="configRev">
<Val>2019-11-07 08:52:28</Val>
                            </DAI>
                        </DOI>
                        <DOI name="Loc"/>
                        <DOI name="Pos">
                            <DAI name="ctlModel">
<Val>sbo-with-enhanced-security</Val>
                            </DAI>
                            <DAI name="sboTimeout">
<Val>30000</Val>
                            </DAI>
                            <DAI name="operTimeout">
<Val>1000</Val>
                            </DAI>
                        </DOI>
                    </LN>
                    <LN prefix="" lnClass="CILO" inst="1" lnType="TestLNodeTypeCILO">
                        <DOI name="Mod"/>
                        <DOI name="Beh"/>
                        <DOI name="Health"/>
                        <DOI name="NamPlt">
                            <DAI name="configRev">
<Val>2019-11-07 08:52:28</Val>
                            </DAI>
                        </DOI>
                        <DOI name="EnaOpn"/>
                        <DOI name="EnaCls"/>
                    </LN>
                </LDevice>
            </Server>
            <Services>
                <DynAssociation max="6"/>
                <DynDataSet maxAttributes="60" max="30"/>
                <FileHandling/>
                <ClientServices goose="true" gsse="false" bufReport="false" unbufReport="false" readLog="false" sv="false" supportsLdName="true" maxGOOSE="128">
                    <TimeSyncProt sntp="true"/>
                </ClientServices>
                <ValueHandling setToRO="false"/>
                <RedProt hsr="true" prp="true" rstp="true"/>
                <CommProt ipv6="false"/>
            </Services>
        </AccessPoint>
    </IED>
    <DataTypeTemplates>
        <LNodeType lnClass="LLN0" id="LNodeTypeLLN0">
            <DO name="Mod" type="TestDOTypeMod"/>
            <DO name="Beh" type="TestDOTypeBeh"/>
            <DO name="Health" type="TestDOTypeHealth"/>
            <DO name="NamPlt" type="TestDOTypeNamePlt"/>
        </LNodeType>
		<LNodeType lnClass="LPHD" id="Dummy.LPHD1">
			<DO name="PhyNam" type="TestDOTypeDPL" />
			<DO name="PhyHealth" type="TestDOTypeHealth" />
			<DO name="Proxy" type="TestDOTypeSPS" />
		</LNodeType>
        <LNodeType lnClass="XCBR" id="TestLNodeTypeXCBR">
            <DO name="Mod" type="TestDOTypeMod"/>
            <DO name="Beh" type="TestDOTypeBeh"/>
            <DO name="Health" type="TestDOTypeHealth"/>
            <DO name="NamPlt" type="TestDOTypeNamePlt"/>
            <DO name="Loc" type="TestDOTypeSPS"/>
			<DO name="OpCnt" type="TestDOTypeINS"/>
			<DO name="Pos" type="TestDOTypeDPCStatusOnly"/>
			<DO name="BlkOpn" type="TestDOTypeSPCStatusOnly"/>
            <DO name="BlkCls" type="TestDOTypeSPCStatusOnly"/>
        </LNodeType>
        <LNodeType lnClass="CSWI" id="TestLNodeTypeCSWI">
            <DO name="Mod" type="TestDOTypeMod"/>
            <DO name="Beh" type="TestDOTypeBeh"/>
            <DO name="Health" type="TestDOTypeHealth"/>
            <DO name="NamPlt" type="TestDOTypeNamePlt"/>
            <DO name="Loc" type="TestDOTypeSPS"/>
            <DO name="Pos" type="TestDOTypeDPC"/>
        </LNodeType>
        <LNodeType lnClass="CILO" id="TestLNodeTypeCILO">
            <DO name="Mod" type="TestDOTypeMod"/>
            <DO name="Beh" type="TestDOTypeBeh"/>
            <DO name="Health" type="TestDOTypeHealth"/>
            <DO name="NamPlt" type="TestDOTypeNamePlt"/>
            <DO name="EnaOpn" type="TestDOTypeSPS"/>
            <DO name="EnaCls" type="TestDOTypeSPS"/>
        </LNodeType>
        <DOType cdc="LPL" id="TestDOTypeNamePlt">
            <DA fc="DC" name="vendor" bType="VisString255" valKind="RO">
                <Val>TestVendor</Val>
            </DA>
            <DA fc="DC" name="swRev" bType="VisString255" valKind="RO"/>
            <DA fc="DC" name="d" bType="VisString255" valKind="RO"/>
            <DA fc="DC" name="configRev" bType="VisString255" valKind="RO"/>
            <DA fc="EX" name="ldNs" bType="VisString255" valKind="RO"/>
        </DOType>
        <DOType cdc="ENS" id="TestDOTypeHealth">
            <DA fc="ST" dchg="true" name="stVal" bType="Enum" type="HealthKind"/>
            <DA fc="ST" qchg="true" name="q" bType="Quality"/>
            <DA fc="ST" name="t" bType="Timestamp"/>
        </DOType>
        <DOType cdc="ENS" id="TestDOTypeBeh">
            <DA fc="ST" dchg="true" name="stVal" bType="Enum" type="BehaviorModeKind"/>
            <DA fc="ST" qchg="true" name="q" bType="Quality"/>
            <DA fc="ST" name="t" bType="Timestamp"/>
        </DOType>
        <DOType cdc="SPS" id="TestDOTypeSPS">
            <DA fc="ST" dchg="true" name="stVal" bType="BOOLEAN"/>
            <DA fc="ST" qchg="true" name="q" bType="Quality"/>
            <DA fc="ST" name="t" bType="Timestamp"/>
        </DOType>
        <DOType cdc="ENC" id="TestDOTypeMod">
            <DA fc="ST" dchg="true" name="stVal" bType="Enum" type="BehaviorModeKind">
                <Val>on</Val>
            </DA>
            <DA fc="ST" qchg="true" name="q" bType="Quality"/>
            <DA fc="ST" name="t" bType="Timestamp"/>
            <DA fc="CF" dchg="true" name="ctlModel" bType="Enum" valKind="RO" type="CtlModelKindStatusOnly">
                <Val>status-only</Val>
            </DA>
        </DOType>
        <DOType cdc="SPC" id="TestDOTypeSPCStatusOnly">
            <DA fc="ST" dchg="true" name="stVal" bType="BOOLEAN"/>
            <DA fc="ST" qchg="true" name="q" bType="Quality"/>
            <DA fc="ST" name="t" bType="Timestamp"/>
            <DA fc="CF" dchg="true" name="ctlModel" bType="Enum" valKind="RO" type="CtlModelKindStatusOnly">
                <Val>status-only</Val>
            </DA>
        </DOType>
        <DOType cdc="DPC" id="TestDOTypeDPCStatusOnly">
            <DA fc="ST" name="origin" bType="Struct" type="Originator"/>
            <DA fc="ST" name="ctlNum" bType="INT8U"/>
            <DA fc="ST" dchg="true" name="stVal" bType="Dbpos"/>
            <DA fc="ST" qchg="true" name="q" bType="Quality"/>
            <DA fc="ST" name="t" bType="Timestamp"/>
            <DA fc="ST" dchg="true" name="stSeld" bType="BOOLEAN"/>
            <DA fc="SV" name="subEna" bType="BOOLEAN"/>
            <DA fc="SV" name="subVal" bType="Dbpos"/>
            <DA fc="SV" name="subQ" bType="Quality"/>
            <DA fc="SV" name="subID" bType="VisString64"/>
            <DA fc="BL" name="blkEna" bType="BOOLEAN"/>
            <DA fc="CF" dchg="true" name="pulseConfig" bType="Struct" type="TestDATypePulseConfig"/>
            <DA fc="CF" dchg="true" name="ctlModel" bType="Enum" valKind="RO" type="CtlModelKindStatusOnly">
                <Val>status-only</Val>
            </DA>
        </DOType>
        <DOType cdc="INS" id="TestDOTypeINS">
            <DA fc="ST" dchg="true" name="stVal" bType="INT32"/>
            <DA fc="ST" qchg="true" name="q" bType="Quality"/>
            <DA fc="ST" name="t" bType="Timestamp"/>
        </DOType>
        <DOType cdc="DPC" id="TestDOTypeDPC">
            <DA fc="ST" name="origin" bType="Struct" type="Originator"/>
            <DA fc="ST" name="ctlNum" bType="INT8U"/>
            <DA fc="ST" dchg="true" name="stVal" bType="Dbpos"/>
            <DA fc="ST" qchg="true" name="q" bType="Quality"/>
            <DA fc="ST" name="t" bType="Timestamp"/>
            <DA fc="ST" dchg="true" name="stSeld" bType="BOOLEAN"/>
            <DA fc="CF" dchg="true" name="ctlModel" bType="Enum" valKind="RO" type="CtlModelKind">
                <Val>status-only</Val>
            </DA>
            <DA fc="CF" dchg="true" name="sboTimeout" bType="INT32U" valKind="RO">
                <Val>0</Val>
            </DA>
            <DA fc="CF" dchg="true" name="operTimeout" bType="INT32U" valKind="RO">
                <Val>0</Val>
            </DA>
            <DA fc="CO" name="SBO" bType="VisString129">
                <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
            </DA>
            <DA fc="CO" name="SBOw" bType="Struct" type="TestDATypeSWOwOper"/>
            <DA fc="CO" name="Oper" bType="Struct" type="TestDATypeSWOwOper"/>
            <DA fc="CO" name="Cancel" bType="Struct" type="TestDATypeCencel"/>
        </DOType>
		<DOType cdc="DPL" id="TestDOTypeDPL">
			<DA fc="DC" name="vendor" bType="VisString255" />
			<DA fc="DC" name="hwRev" bType="VisString255" />
			<DA fc="DC" name="swRev" bType="VisString255" />
			<DA fc="DC" name="serNum" bType="VisString255" />
			<DA fc="DC" name="model" bType="VisString255" />
		</DOType>
        <DAType id="Originator">
            <BDA name="orCat" bType="Enum" type="orCategory"/>
            <BDA name="orIdent" bType="Octet64"/>
        </DAType>
        <DAType id="TestDATypeSWOwOper">
            <BDA name="ctlVal" bType="BOOLEAN"/>
            <BDA name="origin" bType="Struct" type="Originator"/>
            <BDA name="ctlNum" bType="INT8U"/>
            <BDA name="T" bType="Timestamp"/>
            <BDA name="Test" bType="BOOLEAN"/>
            <BDA name="Check" bType="Check"/>
            <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
        </DAType>
        <DAType id="TestDATypeCencel">
            <BDA name="ctlVal" bType="BOOLEAN"/>
            <BDA name="origin" bType="Struct" type="Originator"/>
            <BDA name="ctlNum" bType="INT8U"/>
            <BDA name="T" bType="Timestamp"/>
            <BDA name="Test" bType="BOOLEAN"/>
            <ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
        </DAType>
        <DAType id="TestDATypePulseConfig">
            <BDA name="cmdQual" bType="Enum" valKind="RO" type="PulseKind"/>
            <BDA name="onDur" bType="INT32U" valKind="RO"/>
            <BDA name="offDur" bType="INT32U" valKind="RO"/>
            <BDA name="numPls" bType="INT32U" valKind="RO"/>
        </DAType>
        <EnumType id="HealthKind">
            <EnumVal ord="1">Ok</EnumVal>
            <EnumVal ord="2">Warning</EnumVal>
            <EnumVal ord="3">Alarm</EnumVal>
        </EnumType>
        <EnumType id="orCategory">
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
        <EnumType id="BehaviorModeKind">
            <EnumVal ord="1">on</EnumVal>
            <EnumVal ord="3">test</EnumVal>
            <EnumVal ord="5">off</EnumVal>
        </EnumType>
        <EnumType id="CtlModelKind">
            <EnumVal ord="0">status-only</EnumVal>
            <EnumVal ord="1">direct-with-normal-security</EnumVal>
            <EnumVal ord="2">sbo-with-normal-security</EnumVal>
            <EnumVal ord="3">direct-with-enhanced-security</EnumVal>
            <EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
        </EnumType>
        <EnumType id="CtlModelKindStatusOnly">
            <EnumVal ord="0">status-only</EnumVal>
        </EnumType>
        <EnumType id="PulseKind">
            <EnumVal ord="0">pulse</EnumVal>
            <EnumVal ord="1">persistent</EnumVal>
        </EnumType>
    </DataTypeTemplates>
</SCL>
`;

export const invalidIID = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
    <Header id="TestIID"/>
</SCL>`;

export const dublicateIEDName = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
    <Header id="TestIID"/>
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
					</LN0>					
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
</SCL>`;
