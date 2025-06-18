<?xml version="1.0" encoding="UTF-8"?>
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
</SCL>
