<?xml version="1.0" encoding="UTF-8"?>
<SCL version="2007" revision="B" release="4" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:txy="http://www.iec.ch/61850/2003/Terminal" xmlns:scl="http://www.iec.ch/61850/2003/SCL" xsi:schemaLocation="http://www.iec.ch/61850/2003/SCL SCL.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:IEC_60870_5_104="http://www.iec.ch/61850-80-1/2007/SCL">
	<Header id="TrainingIEC61850" version="2007" revision="B" toolID="IEC 61850 System Configurator, Version: V5.90 " nameStructure="IEDName">
		<Text>TrainingIEC61850</Text>
		<History>
			<Hitem version="1" revision="143" when="Wednesday, September 25, 2019 9:11:36 AM" who="Licenced User: OMICRON electronics GmbH JakVog00 Machine: JAKVOG00LW01 User: JakVog00" what="Station is upgraded from IEC 61850 System Configurator, Version: V5.80 HF1 to V5.90 ." why="IEC 61850 System Configurator Automatic Startup: Insert Comment" />
		</History>
	</Header>
	<IED name="IED1" type="DummyIED" manufacturer="ABB" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="DummyOwner">
		<AccessPoint name="P1">
			<Server>
				<Authentication none="true" />
				<LDevice inst="Disconnectors">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="DC" lnClass="CSWI" inst="1" lnType="Dummy.CSWI"/>
				</LDevice>
			</Server>
		</AccessPoint>
		<KDC iedName="IED1" apName="P1"/>
	</IED>
	<IED name="IED2" type="DummyIED" manufacturer="SEL" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="DummyOwner">
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
						<DOI name="Health">
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="stVal" esel:datasrc="db:EN?3:1"/>
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="q" esel:datasrc="db:EN"/>
                        </DOI>
					</LN0>
					<LN prefix="IN1" lnClass="GGIO" inst="14" lnType="GGIO_BS07">
                        <DOI name="Mod">
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="stVal" esel:datasrc="db:EN?5:1"/>
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="q" />
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="ctlModel" esel:datasrc="imm">
								<Val>status-only</Val>
                            </DAI>
                        </DOI>
                        <DOI name="Health">
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="stVal" esel:datasrc="db:EN?3:1"/>
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="q" esel:datasrc="db:EN"/>
                        </DOI>
                        <DOI name="Beh">
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="stVal" esel:datasrc="db:EN?5:1"/>
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="q" esel:datasrc="db:EN"/>
                        </DOI>
                        <DOI name="NamPlt">
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="vendor" esel:datasrc="imm">
								<Val>SEL</Val>
                            </DAI>
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="swRev" esel:datasrc="dbi:VERFID"/>
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="d" esel:datasrc="imm">
								<Val>Main Board Inputs</Val>
                            </DAI>
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="configRev" esel:datasrc="imm">
								<Val>0</Val>
                            </DAI>
                        </DOI>
                        <DOI name="Ind01">
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="stVal" esel:datasrc="db:IN101"/>
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="q" esel:datasrc="db:EN"/>
                        </DOI>
                        <DOI name="Ind02">
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="stVal" esel:datasrc="db:IN102"/>
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="q" esel:datasrc="db:EN"/>
                        </DOI>
                        <DOI name="Ind03">
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="stVal" esel:datasrc="db:IN103"/>
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="q" esel:datasrc="db:EN"/>
                        </DOI>
                        <DOI name="Ind04">
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="stVal" esel:datasrc="db:IN104"/>
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="q" esel:datasrc="db:EN"/>
                        </DOI>
                        <DOI name="Ind05">
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="stVal" esel:datasrc="db:IN105"/>
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="q" esel:datasrc="db:EN"/>
                        </DOI>
                        <DOI name="Ind06">
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="stVal" esel:datasrc="db:IN106"/>
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="q" esel:datasrc="db:EN"/>
                        </DOI>
                        <DOI name="Ind07">
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="stVal" esel:datasrc="db:IN107"/>
                            <DAI xmlns:esel="http://www.selinc.com/2006/61850" name="q" esel:datasrc="db:EN"/>
                        </DOI>
                    </LN>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
</SCL>
