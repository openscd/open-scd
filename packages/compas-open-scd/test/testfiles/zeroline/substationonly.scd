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
        		<Private type="dummyType">
          			<ekaf:LNode xmlns:ekaf="http://www.dummyURL.com/dummyNS" iedName="IED2" ldInst="CBSWr" lnClass="LPHD" lnInst="1"/>
        		</Private>
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
</SCL>
