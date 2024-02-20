<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:txy="http://www.iec.ch/61850/2003/Terminal" xmlns:scl="http://www.iec.ch/61850/2003/SCL" xsi:schemaLocation="http://www.iec.ch/61850/2003/SCL SCL.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:IEC_60870_5_104="http://www.iec.ch/61850-80-1/2007/SCL" version="2007" revision="B" release="4">
	<Header id="TrainingIEC61850" version="1" revision="143" toolID="IEC 61850 System Configurator, Version: V5.90 " nameStructure="IEDName">
		<Text>TrainingIEC61850</Text>
		<History>
			<Hitem version="1" revision="143" when="Wednesday, September 25, 2019 9:11:36 AM" who="Licenced User: OMICRON electronics GmbH JakVog00 Machine: JAKVOG00LW01 User: JakVog00" what="Station is upgraded from IEC 61850 System Configurator, Version: V5.80 HF1 to V5.90 ." why="IEC 61850 System Configurator Automatic Startup: Insert Comment" />
		</History>
	</Header>
	<DataTypeTemplates>
		<LNodeType lnClass="LLN0" id="typelessDo">
            <DO name="Name" bType="Struct"/>
        </LNodeType>
        <LNodeType lnClass="MMXU" id="typelessSDo">
            <SDO name="Name" bType="Struct"/>
        </LNodeType>
        <LNodeType lnClass="LLN=" id="relessDo">
            <DO name="Name" bType="Struct" type="refToNowhere"/>
        </LNodeType>
        <LNodeType lnClass="LLN=" id="relessSDo">
            <SDO name="Name" bType="Struct" type="refToNowhere"/>
        </LNodeType>
        <LNodeType lnClass="LLN=" id="correctDo">
            <DO name="Name" bType="Struct" type="refToSomewhere"/>
        </LNodeType>
        <DOType id="refToSomewhere" cdc="someCDC"/>
        <DOType id="missingType1" cdc="someCDC">
            <DA name="name" bType="Struct" />
        </DOType>
        <DOType id="existingType1" cdc="someCDC">
            <DA name="name" bType="Struct" type="refToSomewhereDa"/>
        </DOType>
        <DOType id="invalidReference1" cdc="someCDC">
            <DA name="name" bType="Struct" type="refToNowwhere"/>
        </DOType>
        <DOType id="missingType2" cdc="someCDC">
            <DA name="name" bType="Enum" />
        </DOType>
        <DOType id="existingType2" cdc="someCDC">
            <DA name="name" bType="Enum" type="refToSomewhereEnum"/>
        </DOType>
        <DOType id="invalidReference2" cdc="someCDC">
            <DA name="name" bType="Enum" type="refToNowwhere"/>
        </DOType>
        <DAType id="missingType1">
            <BDA name="name" bType="Struct" />
        </DAType>
        <DAType id="existingType1">
            <BDA name="name" bType="Struct" type="refToSomewhereDa"/>
        </DAType>
        <DAType id="invalidReference1">
            <BDA name="name" bType="Struct" type="refToNowwhere"/>
        </DAType>
        <DAType id="missingType2">
            <BDA name="name" bType="Enum" />
        </DAType>
        <DAType id="existingType2">
            <BDA name="name" bType="Enum" type="refToSomewhereEnum"/>
        </DAType>
        <DAType id="invalidReference2">
            <BDA name="name" bType="Enum" type="refToNowwhere"/>
        </DAType>

        <DAType id="refToSomewhereDa"/>
        <EnumType id="refToSomewhereEnum"/>
    </DataTypeTemplates>

</SCL>
