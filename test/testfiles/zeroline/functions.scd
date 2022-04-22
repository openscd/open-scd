<?xml version="1.0" encoding="UTF-8"?>
<SCL version="2007" revision="B" release="4" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:txy="http://www.iec.ch/61850/2003/Terminal" xmlns:scl="http://www.iec.ch/61850/2003/SCL" xsi:schemaLocation="http://www.iec.ch/61850/2003/SCL SCL.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:IEC_60870_5_104="http://www.iec.ch/61850-80-1/2007/SCL">
	<Header id="TrainingIEC61850" version="1" revision="143" toolID="IEC 61850 System Configurator, Version: V5.90 " nameStructure="IEDName">
		<Text>TrainingIEC61850</Text>
		<History>
			<Hitem version="1" revision="143" when="Wednesday, September 25, 2019 9:11:36 AM" who="Licenced User: OMICRON electronics GmbH JakVog00 Machine: JAKVOG00LW01 User: JakVog00" what="Station is upgraded from IEC 61850 System Configurator, Version: V5.80 HF1 to V5.90 ." why="IEC 61850 System Configurator Automatic Startup: Insert Comment" />
		</History>
	</Header>
	<Substation name="AA1" desc="Substation">
        <Function name="myFunc" desc="myDesc" type="myFuncType"/>
		<VoltageLevel name="E1" desc="Voltage Level" nomFreq="50.0" numPhases="3">
			<Voltage unit="V" multiplier="k">110.0</Voltage>
            <Function name="voltLvName">
                <SubFunction name="mySubFunc">
					<SubFunction name="mySubSubFunction"/>
				</SubFunction> 
            </Function>
			<Bay name="COUPLING_BAY" desc="Bay">
				<Function name="bayName">
					<SubFunction name="myBaySubFunc" desc="myDesc" type="myBaySubFuncType"/>
				</Function>
				<Function name="bay2Func">
					<SubFunction name="myBaySubFunc" desc="myDesc" type="myBaySubFuncType"/>
				</Function>
                <ConductingEquipment>
                    <EqFunction name="myEqFunc">
                        <EqSubFunction name="myEqSubFunc"/> 
                    </EqFunction> 
                </ConductingEquipment>
			</Bay>
		</VoltageLevel>
	</Substation>
</SCL>
