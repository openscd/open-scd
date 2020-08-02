declare const validateXML: any;

export async function validate(doc: XMLDocument): Promise<boolean> {
  const result = validateXML({
    xml: new XMLSerializer().serializeToString(doc),
    schema: schemas,
    arguments: ['--noout', '--schema', 'SCL.xsd', 'filename.scd'],
  });
  console.log(result);
  return result.errors === null;
}

const schemas = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:scl="http://www.iec.ch/61850/2003/SCL" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:xs="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.iec.ch/61850/2003/SCL" elementFormDefault="qualified" attributeFormDefault="unqualified" finalDefault="extension" version="2007B1">
	<xs:annotation>
		<xs:documentation xml:lang="en">
			SCL schema version "2007" revision "B" release 1,  for IEC 61850-6 Ed. 2.1. Draft 2014-07-18.
			
			COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon.
			
			Implemented Ed. 2 Tissues: 658, 668, 687, 768, 779, 789, 804, 806, 807, 822, 824, 845, 853, 855, 856, 857, 886, 936, 1175, 1189, 1208.
			Tissues not relevant for the SCL schema: 660, 661 (Ed.3), 663, 678, 699, 700, 705, 706 (Ed.3), 718, 719, 721, 731, 733, 752, 769, 787, 788, 815, 823, 825, 837, 847, 865, 873, 883, 884, 885, 901, 914, 915, 918, 927 (Ed.3), 930, 938, 949, 961, 1048, 1054, 1059, 1118, 1130, 1131, 1147, 1161, 1168, 1170 (Ed.3), 1173, 1188, 1195, 1200, 1204, 1207, 1221, 1224, 1241 (Ed.3), 1255, 1257 (Ed.3), 1284.
		</xs:documentation>
	</xs:annotation>
	<xs:include schemaLocation="SCL_Substation.xsd"/>
	<xs:include schemaLocation="SCL_IED.xsd"/>
	<xs:include schemaLocation="SCL_Communication.xsd"/>
	<xs:include schemaLocation="SCL_DataTypeTemplates.xsd"/>
	<xs:element name="SCL">
		<xs:complexType>
			<xs:complexContent>
				<xs:extension base="tBaseElement">
					<xs:sequence>
						<xs:element name="Header" type="tHeader">
							<xs:unique name="uniqueHitem">
								<xs:selector xpath="./scl:History/scl:Hitem"/>
								<xs:field xpath="@version"/>
								<xs:field xpath="@revision"/>
							</xs:unique>
						</xs:element>
						<xs:element ref="Substation" minOccurs="0" maxOccurs="unbounded"/>
						<xs:element ref="Communication" minOccurs="0"/>
						<xs:element ref="IED" minOccurs="0" maxOccurs="unbounded"/>
						<xs:element ref="DataTypeTemplates" minOccurs="0"/>
						<xs:element ref="Line" minOccurs="0" maxOccurs="unbounded"/>
						<xs:element ref="Process" minOccurs="0" maxOccurs="unbounded"/>
					</xs:sequence>
					<xs:attribute name="version" type="tSclVersion" use="required" fixed="2007"/>
					<xs:attribute name="revision" type="tSclRevision" use="required" fixed="B"/>
					<xs:attribute name="release" type="tSclRelease" use="optional" fixed="1"/>
				</xs:extension>
			</xs:complexContent>
		</xs:complexType>
		<xs:key name="SubstationKey">
			<xs:selector xpath="./scl:Substation|./scl:Process|./scl:Line"/>
			<xs:field xpath="@name"/>
		</xs:key>
		<xs:key name="IEDKey">
			<xs:selector xpath="./scl:IED"/>
			<xs:field xpath="@name"/>
		</xs:key>
		<xs:key name="LNodeTypeKey">
			<xs:selector xpath="./scl:DataTypeTemplates/scl:LNodeType"/>
			<xs:field xpath="@id"/>
			<xs:field xpath="@lnClass"/>
		</xs:key>
		<xs:keyref name="ref2LNodeTypeDomain1" refer="LNodeTypeKey">
			<xs:selector xpath="./scl:IED/scl:AccessPoint/scl:LN"/>
			<xs:field xpath="@lnType"/>
			<xs:field xpath="@lnClass"/>
		</xs:keyref>
		<xs:keyref name="ref2LNodeTypeDomain2" refer="LNodeTypeKey">
			<xs:selector xpath="./scl:IED/scl:AccessPoint/scl:Server/scl:LDevice/scl:LN"/>
			<xs:field xpath="@lnType"/>
			<xs:field xpath="@lnClass"/>
		</xs:keyref>
		<xs:keyref name="ref2LNodeTypeLLN0" refer="LNodeTypeKey">
			<xs:selector xpath="./scl:IED/scl:AccessPoint/scl:Server/scl:LDevice/scl:LN0"/>
			<xs:field xpath="@lnType"/>
			<xs:field xpath="@lnClass"/>
		</xs:keyref>
		<xs:keyref name="refConnectedAP2IED" refer="IEDKey">
			<xs:selector xpath="./scl:Communication/scl:SubNetwork/scl:ConnectedAP"/>
			<xs:field xpath="@iedName"/>
		</xs:keyref>
		<xs:keyref name="ref2SubstationFromTerminal" refer="scl:SubstationKey">
			<xs:selector xpath=".//scl:Terminal"/>
			<xs:field xpath="@substationName"/>
		</xs:keyref>
		<xs:key name="ConnectivityNodeKey">
			<xs:selector xpath=".//scl:ConnectivityNode"/>
			<xs:field xpath="@pathName"/>
		</xs:key>
	</xs:element>
</xs:schema>
`;
