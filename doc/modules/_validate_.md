**[open-scd](../README.md)**

> [Globals](../globals.md) / "validate"

# Module: "validate"

## Index

### Interfaces

* [XMLParams](../interfaces/_validate_.xmlparams.md)

### Variables

* [SCL2007B1\_2014\_07\_18](_validate_.md#scl2007b1_2014_07_18)

### Functions

* [validateSCL](_validate_.md#validatescl)
* [validateXML](_validate_.md#validatexml)

## Variables

### SCL2007B1\_2014\_07\_18

• `Const` **SCL2007B1\_2014\_07\_18**: \"\<?xml version="1.0" encoding="utf-8" ?>
\<xs:schema xmlns:scl="http://www.iec.ch/61850/2003/SCL" xmlns="http://www.iec.ch/61850/2003/SCL" elementFormDefault="qualified" targetNamespace="http://www.iec.ch/61850/2003/SCL" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  \<xs:annotation>
    \<xs:documentation xml:lang="en">
			SCL schema version "2007" revision "B" release 1,  for IEC 61850-6 Ed. 2.1. Draft 2014-07-18.
			
			COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon.
			
			Implemented Ed. 2 Tissues: 658, 668, 687, 768, 779, 789, 804, 806, 807, 822, 824, 845, 853, 855, 856, 857, 886, 936, 1175, 1189, 1208.
			Tissues not relevant for the SCL schema: 660, 661 (Ed.3), 663, 678, 699, 700, 705, 706 (Ed.3), 718, 719, 721, 731, 733, 752, 769, 787, 788, 815, 823, 825, 837, 847, 865, 873, 883, 884, 885, 901, 914, 915, 918, 927 (Ed.3), 930, 938, 949, 961, 1048, 1054, 1059, 1118, 1130, 1131, 1147, 1161, 1168, 1170 (Ed.3), 1173, 1188, 1195, 1200, 1204, 1207, 1221, 1224, 1241 (Ed.3), 1255, 1257 (Ed.3), 1284.
		\</xs:documentation>
  \</xs:annotation>
  \<xs:element name="SCL">
    \<xs:complexType>
      \<xs:complexContent>
        \<xs:extension base="tBaseElement">
          \<xs:sequence>
            \<xs:element name="Header" type="tHeader">
              \<xs:unique name="uniqueHitem">
                \<xs:selector xpath="./scl:History/scl:Hitem" />
                \<xs:field xpath="@version" />
                \<xs:field xpath="@revision" />
              \</xs:unique>
            \</xs:element>
            \<xs:element ref="Substation" minOccurs="0" maxOccurs="unbounded" />
            \<xs:element ref="Communication" minOccurs="0" />
            \<xs:element ref="IED" minOccurs="0" maxOccurs="unbounded" />
            \<xs:element ref="DataTypeTemplates" minOccurs="0" />
            \<xs:element ref="Line" minOccurs="0" maxOccurs="unbounded" />
            \<xs:element ref="Process" minOccurs="0" maxOccurs="unbounded" />
          \</xs:sequence>
          \<xs:attribute name="version" fixed="2007" type="tSclVersion" use="required" />
          \<xs:attribute name="revision" fixed="B" type="tSclRevision" use="required" />
          \<xs:attribute name="release" fixed="1" type="tSclRelease" use="optional" />
        \</xs:extension>
      \</xs:complexContent>
    \</xs:complexType>
    \<xs:key name="SubstationKey">
      \<xs:selector xpath="./scl:Substation\|./scl:Process\|./scl:Line" />
      \<xs:field xpath="@name" />
    \</xs:key>
    \<xs:key name="IEDKey">
      \<xs:selector xpath="./scl:IED" />
      \<xs:field xpath="@name" />
    \</xs:key>
    \<xs:key name="LNodeTypeKey">
      \<xs:selector xpath="./scl:DataTypeTemplates/scl:LNodeType" />
      \<xs:field xpath="@id" />
      \<xs:field xpath="@lnClass" />
    \</xs:key>
    \<xs:keyref name="ref2LNodeTypeDomain1" refer="LNodeTypeKey">
      \<xs:selector xpath="./scl:IED/scl:AccessPoint/scl:LN" />
      \<xs:field xpath="@lnType" />
      \<xs:field xpath="@lnClass" />
    \</xs:keyref>
    \<xs:keyref name="ref2LNodeTypeDomain2" refer="LNodeTypeKey">
      \<xs:selector xpath="./scl:IED/scl:AccessPoint/scl:Server/scl:LDevice/scl:LN" />
      \<xs:field xpath="@lnType" />
      \<xs:field xpath="@lnClass" />
    \</xs:keyref>
    \<xs:keyref name="ref2LNodeTypeLLN0" refer="LNodeTypeKey">
      \<xs:selector xpath="./scl:IED/scl:AccessPoint/scl:Server/scl:LDevice/scl:LN0" />
      \<xs:field xpath="@lnType" />
      \<xs:field xpath="@lnClass" />
    \</xs:keyref>
    \<xs:keyref name="refConnectedAP2IED" refer="IEDKey">
      \<xs:selector xpath="./scl:Communication/scl:SubNetwork/scl:ConnectedAP" />
      \<xs:field xpath="@iedName" />
    \</xs:keyref>
    \<xs:keyref name="ref2SubstationFromTerminal" refer="SubstationKey">
      \<xs:selector xpath=".//scl:Terminal" />
      \<xs:field xpath="@substationName" />
    \</xs:keyref>
    \<xs:key name="ConnectivityNodeKey">
      \<xs:selector xpath=".//scl:ConnectivityNode" />
      \<xs:field xpath="@pathName" />
    \</xs:key>
  \</xs:element>
  \<!--Schema items added from SCL.2007B1.2014-07-18\SCL\_Substation.xsd-->
  \<xs:annotation>
    \<xs:documentation xml:lang="en">
			SCL schema version "2007" revision "B" release 1,  for IEC 61850-6 Ed. 2.1. Draft 2014-07-18.
			
			COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon.
		\</xs:documentation>
  \</xs:annotation>
  \<xs:attributeGroup name="agVirtual">
    \<xs:attribute name="virtual" default="false" type="xs:boolean" use="optional" />
  \</xs:attributeGroup>
  \<xs:complexType abstract="true" name="tLNodeContainer">
    \<xs:complexContent>
      \<xs:extension base="tNaming">
        \<xs:sequence>
          \<xs:element name="LNode" type="tLNode" minOccurs="0" maxOccurs="unbounded" />
        \</xs:sequence>
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tPowerSystemResource">
    \<xs:complexContent>
      \<xs:extension base="tLNodeContainer" />
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tEquipmentContainer">
    \<xs:complexContent>
      \<xs:extension base="tPowerSystemResource">
        \<xs:sequence>
          \<xs:element name="PowerTransformer" type="tPowerTransformer" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInPowerTransformer">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInPTR">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="GeneralEquipment" type="tGeneralEquipment" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInGeneralEquipment">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInGE">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tEquipment">
    \<xs:complexContent>
      \<xs:extension base="tPowerSystemResource">
        \<xs:attributeGroup ref="agVirtual" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tAbstractConductingEquipment">
    \<xs:complexContent>
      \<xs:extension base="tEquipment">
        \<xs:sequence>
          \<xs:element name="Terminal" type="tTerminal" minOccurs="0" maxOccurs="2" />
          \<xs:element name="SubEquipment" type="tSubEquipment" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInSubEquipment">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInACESubEquipment">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tConductingEquipment">
    \<xs:complexContent>
      \<xs:extension base="tAbstractConductingEquipment">
        \<xs:sequence>
          \<xs:element name="EqFunction" type="tEqFunction" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInFuncForCE">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInFuncForCE">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
        \<xs:attribute name="type" type="tCommonConductingEquipmentEnum" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tSubEquipment">
    \<xs:complexContent>
      \<xs:extension base="tPowerSystemResource">
        \<xs:sequence>
          \<xs:element name="EqFunction" type="tEqFunction" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInFuncForSubEq">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInFuncForSubEq">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
        \<xs:attribute name="phase" default="none" type="tPhaseEnum" use="optional" />
        \<xs:attributeGroup ref="agVirtual" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tPowerTransformer">
    \<xs:complexContent>
      \<xs:extension base="tEquipment">
        \<xs:sequence>
          \<xs:element name="TransformerWinding" type="tTransformerWinding" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInTransformerWinding">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInPTW">
              \<xs:selector xpath="./scl:SubEquipment\|./scl:TapChanger\|./scl:EqFunction" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="SubEquipment" type="tSubEquipment" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInSubEquipmentPTR">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInPTRSubEquipment">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="EqFunction" type="tEqFunction" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInFuncForPTR">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInFuncForPTR">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
        \<xs:attribute name="type" fixed="PTR" type="tPowerTransformerEnum" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tTransformerWinding">
    \<xs:complexContent>
      \<xs:extension base="tAbstractConductingEquipment">
        \<xs:sequence>
          \<xs:element name="TapChanger" type="tTapChanger" minOccurs="0">
            \<xs:unique name="uniqueLNodeInTapChanger">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInLTC">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="NeutralPoint" type="tTerminal" minOccurs="0" />
          \<xs:element name="EqFunction" type="tEqFunction" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInFuncForPTW">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInFuncForPTW">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
        \<xs:attribute name="type" fixed="PTW" type="tTransformerWindingEnum" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tTapChanger">
    \<xs:complexContent>
      \<xs:extension base="tPowerSystemResource">
        \<xs:sequence>
          \<xs:element name="SubEquipment" type="tSubEquipment" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInSubEquipmentLTC">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInLTCSubEquipment">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="EqFunction" type="tEqFunction" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInFuncForLTC">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInFuncForLTC">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
        \<xs:attribute name="type" fixed="LTC" type="xs:Name" use="required" />
        \<xs:attributeGroup ref="agVirtual" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tGeneralEquipment">
    \<xs:complexContent>
      \<xs:extension base="tEquipment">
        \<xs:sequence>
          \<xs:element name="EqFunction" type="tEqFunction" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInFuncForGE">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInFuncForGE">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
        \<xs:attribute name="type" type="tGeneralEquipmentEnum" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tSubstation">
    \<xs:complexContent>
      \<xs:extension base="tEquipmentContainer">
        \<xs:sequence>
          \<xs:element name="VoltageLevel" type="tVoltageLevel" maxOccurs="unbounded">
            \<xs:unique name="uniqueChildNameInVoltageLevel">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
            \<xs:unique name="uniqueLNodeInVoltageLevel">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="Function" type="tFunction" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInFunctionSS">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInSubstationFunc">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tVoltageLevel">
    \<xs:complexContent>
      \<xs:extension base="tEquipmentContainer">
        \<xs:sequence>
          \<xs:element name="Voltage" type="tVoltage" minOccurs="0" />
          \<xs:element name="Bay" type="tBay" maxOccurs="unbounded">
            \<xs:unique name="uniqueChildNameInBay">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
            \<xs:unique name="uniqueLNodeInBay">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="Function" type="tFunction" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInFunctionVL">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInVoltageLevelFunc">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
        \<xs:attribute name="nomFreq" use="optional">
          \<xs:simpleType>
            \<xs:restriction base="xs:decimal">
              \<xs:minInclusive value="0" />
            \</xs:restriction>
          \</xs:simpleType>
        \</xs:attribute>
        \<xs:attribute name="numPhases" use="optional">
          \<xs:simpleType>
            \<xs:restriction base="xs:unsignedByte">
              \<xs:minExclusive value="0" />
            \</xs:restriction>
          \</xs:simpleType>
        \</xs:attribute>
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tBay">
    \<xs:complexContent>
      \<xs:extension base="tEquipmentContainer">
        \<xs:sequence>
          \<xs:element name="ConductingEquipment" type="tConductingEquipment" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInConductingEquipment">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInCE">
              \<xs:selector xpath="./scl:SubEquipment\|./scl:EqFunction" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="ConnectivityNode" type="tConnectivityNode" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInConnectivityNode">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="Function" type="tFunction" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInFunctionB">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInBayFunc">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tLNode">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:attribute name="iedName" default="None" type="tIEDName" use="optional" />
        \<xs:attribute name="ldInst" default="" type="tLDInstOrEmpty" use="optional" />
        \<xs:attribute name="prefix" default="" type="tPrefix" use="optional" />
        \<xs:attribute name="lnClass" type="tLNClassEnum" use="required" />
        \<xs:attribute name="lnInst" default="" type="tLNInstOrEmpty" use="optional" />
        \<xs:attribute name="lnType" type="tName" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tFunction">
    \<xs:complexContent>
      \<xs:extension base="tPowerSystemResource">
        \<xs:sequence>
          \<xs:element name="SubFunction" type="tSubFunction" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInSubFunction">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInSubFunc">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="GeneralEquipment" type="tGeneralEquipment" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInGeneralEquipmentOfFunction">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInGEFunc">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="ConductingEquipment" type="tConductingEquipment" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInConductingEquipmentOfFunction">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInCondEq">
              \<xs:selector xpath="./scl:SubEquipment\|./scl:EqFunction" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
        \<xs:attribute name="type" type="xs:normalizedString" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tSubFunction">
    \<xs:complexContent>
      \<xs:extension base="tPowerSystemResource">
        \<xs:sequence>
          \<xs:element name="GeneralEquipment" type="tGeneralEquipment" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInGeneralEquipmentOfSubFunction">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInGESubFunc">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="ConductingEquipment" type="tConductingEquipment" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInConductingEquipmentOfSubFunction">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueSubEquipmentSubFunc">
              \<xs:selector xpath="./scl:SubEquipment" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="SubFunction" type="tSubFunction" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInSubSubFunction">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueSubSubFunc">
              \<xs:selector xpath="./scl:SubFunction" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
        \<xs:attribute name="type" type="xs:normalizedString" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tAbstractEqFuncSubFunc">
    \<xs:complexContent>
      \<xs:extension base="tPowerSystemResource">
        \<xs:sequence>
          \<xs:element name="GeneralEquipment" type="tGeneralEquipment" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInGeneralEquipmentOfFuncForEquipment">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInGEFuncForEquipment">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="EqSubFunction" type="tEqSubFunction" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInSubFuncForEquipment">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueSubFuncForEquipment">
              \<xs:selector xpath="./scl:EqSubFunction" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
        \<xs:attribute name="type" type="xs:normalizedString" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tEqFunction">
    \<xs:complexContent>
      \<xs:extension base="tAbstractEqFuncSubFunc" />
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tEqSubFunction">
    \<xs:complexContent>
      \<xs:extension base="tAbstractEqFuncSubFunc" />
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tConnectivityNode">
    \<xs:complexContent>
      \<xs:extension base="tLNodeContainer">
        \<xs:attribute name="pathName" type="tRef" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tTerminal">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:attribute name="name" default="" type="tAnyName" use="optional" />
        \<xs:attribute name="connectivityNode" type="tRef" use="required" />
        \<xs:attribute name="processName" type="tProcessName" use="optional" />
        \<xs:attribute name="substationName" type="tName" use="required" />
        \<xs:attribute name="voltageLevelName" type="tName" use="required" />
        \<xs:attribute name="bayName" type="tName" use="required" />
        \<xs:attribute name="cNodeName" type="tName" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tGeneralEquipmentContainer">
    \<xs:complexContent>
      \<xs:extension base="tPowerSystemResource">
        \<xs:sequence>
          \<xs:element name="GeneralEquipment" type="tGeneralEquipment" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInGeneralEquipment2">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInGE2">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="Function" type="tFunction" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNodeInFunction">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
            \<xs:unique name="uniqueChildNameInFunction">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tLine">
    \<xs:complexContent>
      \<xs:extension base="tGeneralEquipmentContainer">
        \<xs:sequence>
          \<xs:element name="ConductingEquipment" type="tConductingEquipment" maxOccurs="unbounded" />
          \<xs:element name="ConnectivityNode" type="tConnectivityNode" minOccurs="0" maxOccurs="unbounded" />
        \</xs:sequence>
        \<xs:attribute name="type" type="tLineType" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tProcess">
    \<xs:complexContent>
      \<xs:extension base="tGeneralEquipmentContainer">
        \<xs:sequence>
          \<xs:element name="ConductingEquipment" type="tConductingEquipment" minOccurs="0" maxOccurs="unbounded" />
          \<xs:element name="Substation" type="tSubstation" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueChildNameInProcessSubstation">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
            \<xs:unique name="uniqueLNodeInProcessSubstation">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="Line" type="tLine" minOccurs="0" maxOccurs="unbounded" />
          \<xs:element name="Process" type="tProcess" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueChildNameInSubProcess">
              \<xs:selector xpath="./*" />
              \<xs:field xpath="@name" />
            \</xs:unique>
            \<xs:unique name="uniqueLNodeInSubProcess">
              \<xs:selector xpath="./scl:LNode" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
        \<xs:attribute name="type" type="tProcessType" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:element name="Substation" type="tSubstation">
    \<xs:unique name="uniqueChildNameInSubstation">
      \<xs:selector xpath="./*" />
      \<xs:field xpath="@name" />
    \</xs:unique>
    \<xs:unique name="uniqueLNodeInSubstation">
      \<xs:selector xpath="./scl:LNode" />
      \<xs:field xpath="@lnInst" />
      \<xs:field xpath="@lnClass" />
      \<xs:field xpath="@iedName" />
      \<xs:field xpath="@ldInst" />
      \<xs:field xpath="@prefix" />
    \</xs:unique>
  \</xs:element>
  \<xs:element name="Process" type="tProcess">
    \<xs:unique name="uniqueChildNameInProcess">
      \<xs:selector xpath="./*" />
      \<xs:field xpath="@name" />
    \</xs:unique>
    \<xs:unique name="uniqueLNodeInProcess">
      \<xs:selector xpath="./scl:LNode" />
      \<xs:field xpath="@lnInst" />
      \<xs:field xpath="@lnClass" />
      \<xs:field xpath="@iedName" />
      \<xs:field xpath="@ldInst" />
      \<xs:field xpath="@prefix" />
    \</xs:unique>
  \</xs:element>
  \<xs:element name="Line" type="tLine">
    \<xs:unique name="uniqueChildNameInLine">
      \<xs:selector xpath="./*" />
      \<xs:field xpath="@name" />
    \</xs:unique>
    \<xs:unique name="uniqueLNodeInLine">
      \<xs:selector xpath="./scl:LNode" />
      \<xs:field xpath="@lnInst" />
      \<xs:field xpath="@lnClass" />
      \<xs:field xpath="@iedName" />
      \<xs:field xpath="@ldInst" />
      \<xs:field xpath="@prefix" />
    \</xs:unique>
  \</xs:element>
  \<!--Schema items added from SCL.2007B1.2014-07-18\SCL\_BaseTypes.xsd-->
  \<xs:annotation>
    \<xs:documentation xml:lang="en">
			SCL schema version "2007" revision "B" release 1,  for IEC 61850-6 Ed. 2.1. Draft 2014-07-18.
			
			COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon.
		\</xs:documentation>
  \</xs:annotation>
  \<xs:attributeGroup name="agDesc">
    \<xs:attribute name="desc" default="" type="xs:normalizedString" use="optional" />
  \</xs:attributeGroup>
  \<xs:complexType abstract="true" name="tBaseElement">
    \<xs:sequence>
      \<xs:any minOccurs="0" maxOccurs="unbounded" namespace="##other" processContents="lax" />
      \<xs:element name="Text" type="tText" minOccurs="0" />
      \<xs:element name="Private" type="tPrivate" minOccurs="0" maxOccurs="unbounded" />
    \</xs:sequence>
    \<xs:anyAttribute namespace="##other" processContents="lax" />
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tUnNaming">
    \<xs:complexContent>
      \<xs:extension base="tBaseElement">
        \<xs:attributeGroup ref="agDesc" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tNaming">
    \<xs:complexContent>
      \<xs:extension base="tBaseElement">
        \<xs:attribute name="name" type="tName" use="required" />
        \<xs:attributeGroup ref="agDesc" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tIDNaming">
    \<xs:complexContent>
      \<xs:extension base="tBaseElement">
        \<xs:attribute name="id" type="tName" use="required" />
        \<xs:attributeGroup ref="agDesc" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType abstract="true" mixed="true" name="tAnyContentFromOtherNamespace">
    \<xs:sequence minOccurs="0" maxOccurs="unbounded">
      \<xs:any namespace="##other" processContents="lax" />
    \</xs:sequence>
    \<xs:anyAttribute namespace="##other" processContents="lax" />
  \</xs:complexType>
  \<xs:complexType mixed="true" name="tText">
    \<xs:complexContent>
      \<xs:extension base="tAnyContentFromOtherNamespace">
        \<xs:attribute name="source" type="xs:anyURI" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType mixed="true" name="tPrivate">
    \<xs:complexContent>
      \<xs:extension base="tAnyContentFromOtherNamespace">
        \<xs:attribute name="type" use="required">
          \<xs:simpleType>
            \<xs:restriction base="xs:normalizedString">
              \<xs:minLength value="1" />
            \</xs:restriction>
          \</xs:simpleType>
        \</xs:attribute>
        \<xs:attribute name="source" type="xs:anyURI" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tHeader">
    \<xs:sequence>
      \<xs:element name="Text" type="tText" minOccurs="0" />
      \<xs:element name="History" minOccurs="0">
        \<xs:complexType>
          \<xs:sequence>
            \<xs:element name="Hitem" type="tHitem" maxOccurs="unbounded" />
          \</xs:sequence>
        \</xs:complexType>
      \</xs:element>
    \</xs:sequence>
    \<xs:attribute name="id" type="xs:normalizedString" use="required" />
    \<xs:attribute name="version" type="xs:normalizedString" use="optional" />
    \<xs:attribute name="revision" default="" type="xs:normalizedString" use="optional" />
    \<xs:attribute name="toolID" type="xs:normalizedString" use="optional" />
    \<xs:attribute name="nameStructure" default="IEDName" use="optional">
      \<xs:simpleType>
        \<xs:restriction base="xs:Name">
          \<xs:enumeration value="IEDName" />
        \</xs:restriction>
      \</xs:simpleType>
    \</xs:attribute>
  \</xs:complexType>
  \<xs:complexType mixed="true" name="tHitem">
    \<xs:complexContent>
      \<xs:extension base="tAnyContentFromOtherNamespace">
        \<xs:attribute name="version" type="xs:normalizedString" use="required" />
        \<xs:attribute name="revision" type="xs:normalizedString" use="required" />
        \<xs:attribute name="when" type="xs:normalizedString" use="required" />
        \<xs:attribute name="who" type="xs:normalizedString" />
        \<xs:attribute name="what" type="xs:normalizedString" />
        \<xs:attribute name="why" type="xs:normalizedString" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tVal">
    \<xs:simpleContent>
      \<xs:extension base="xs:normalizedString">
        \<xs:attribute name="sGroup" type="xs:unsignedInt" use="optional" />
      \</xs:extension>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tValueWithUnit">
    \<xs:simpleContent>
      \<xs:extension base="xs:decimal">
        \<xs:attribute name="unit" type="xs:token" use="required" />
        \<xs:attribute name="multiplier" default="" type="tUnitMultiplierEnum" use="optional" />
      \</xs:extension>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tVoltage">
    \<xs:simpleContent>
      \<xs:restriction base="tValueWithUnit">
        \<xs:attribute name="unit" fixed="V" type="xs:token" use="required" />
        \<xs:attribute name="multiplier" default="" type="tUnitMultiplierEnum" use="optional" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tDurationInSec">
    \<xs:simpleContent>
      \<xs:restriction base="tValueWithUnit">
        \<xs:attribute name="unit" fixed="s" type="xs:token" use="required" />
        \<xs:attribute name="multiplier" default="" type="tUnitMultiplierEnum" use="optional" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tDurationInMilliSec">
    \<xs:simpleContent>
      \<xs:extension base="xs:decimal">
        \<xs:attribute name="unit" fixed="s" type="xs:token" use="optional" />
        \<xs:attribute name="multiplier" fixed="m" type="tUnitMultiplierEnum" use="optional" />
      \</xs:extension>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tBitRateInMbPerSec">
    \<xs:simpleContent>
      \<xs:extension base="xs:decimal">
        \<xs:attribute name="unit" fixed="b/s" type="xs:normalizedString" use="optional" />
        \<xs:attribute name="multiplier" fixed="M" type="tUnitMultiplierEnum" use="optional" />
      \</xs:extension>
    \</xs:simpleContent>
  \</xs:complexType>
  \<!--Schema items added from SCL.2007B1.2014-07-18\SCL\_Enums.xsd-->
  \<xs:annotation>
    \<xs:documentation xml:lang="en">
			SCL schema version "2007" revision "B" release 1,  for IEC 61850-6 Ed. 2.1. Draft 2014-07-18.
			
			COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon.
		\</xs:documentation>
  \</xs:annotation>
  \<xs:simpleType name="tPredefinedPTypeEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="IP" />
      \<xs:enumeration value="IP-SUBNET" />
      \<xs:enumeration value="IP-GATEWAY" />
      \<xs:enumeration value="OSI-NSAP" />
      \<xs:enumeration value="OSI-TSEL" />
      \<xs:enumeration value="OSI-SSEL" />
      \<xs:enumeration value="OSI-PSEL" />
      \<xs:enumeration value="OSI-AP-Title" />
      \<xs:enumeration value="OSI-AP-Invoke" />
      \<xs:enumeration value="OSI-AE-Qualifier" />
      \<xs:enumeration value="OSI-AE-Invoke" />
      \<xs:enumeration value="MAC-Address" />
      \<xs:enumeration value="APPID" />
      \<xs:enumeration value="VLAN-PRIORITY" />
      \<xs:enumeration value="VLAN-ID" />
      \<xs:enumeration value="SNTP-Port" />
      \<xs:enumeration value="MMS-Port" />
      \<xs:enumeration value="DNSName" />
      \<xs:enumeration value="IPv6FlowLabel" />
      \<xs:enumeration value="IPv6ClassOfTraffic" />
      \<xs:enumeration value="C37-118-IP-Port" />
      \<xs:enumeration value="IP-UDP-PORT" />
      \<xs:enumeration value="IP-TCP-PORT" />
      \<xs:enumeration value="IPv6" />
      \<xs:enumeration value="IPv6-SUBNET" />
      \<xs:enumeration value="IPv6-GATEWAY" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tExtensionPTypeEnum">
    \<xs:restriction base="xs:normalizedString">
      \<xs:pattern value="[A-Z][0-9A-Za-z\-]*" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tPTypeEnum">
    \<xs:union memberTypes="tPredefinedPTypeEnum tExtensionPTypeEnum" />
  \</xs:simpleType>
  \<xs:simpleType name="tPredefinedPTypePhysConnEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="Type" />
      \<xs:enumeration value="Plug" />
      \<xs:enumeration value="Cable" />
      \<xs:enumeration value="Port" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tPTypePhysConnEnum">
    \<xs:union memberTypes="tPredefinedPTypePhysConnEnum tExtensionPTypeEnum" />
  \</xs:simpleType>
  \<xs:simpleType name="tPredefinedAttributeNameEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="T" />
      \<xs:enumeration value="Test" />
      \<xs:enumeration value="Check" />
      \<xs:enumeration value="SIUnit" />
      \<xs:enumeration value="Oper" />
      \<xs:enumeration value="SBO" />
      \<xs:enumeration value="SBOw" />
      \<xs:enumeration value="Cancel" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tExtensionAttributeNameEnum">
    \<xs:restriction base="tRestrName1stL">
      \<xs:maxLength value="60" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tAttributeNameEnum">
    \<xs:union memberTypes="tPredefinedAttributeNameEnum tExtensionAttributeNameEnum" />
  \</xs:simpleType>
  \<xs:simpleType name="tPredefinedCommonConductingEquipmentEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="CBR" />
      \<xs:enumeration value="DIS" />
      \<xs:enumeration value="VTR" />
      \<xs:enumeration value="CTR" />
      \<xs:enumeration value="GEN" />
      \<xs:enumeration value="CAP" />
      \<xs:enumeration value="REA" />
      \<xs:enumeration value="CON" />
      \<xs:enumeration value="MOT" />
      \<xs:enumeration value="EFN" />
      \<xs:enumeration value="PSH" />
      \<xs:enumeration value="BAT" />
      \<xs:enumeration value="BSH" />
      \<xs:enumeration value="CAB" />
      \<xs:enumeration value="GIL" />
      \<xs:enumeration value="LIN" />
      \<xs:enumeration value="RES" />
      \<xs:enumeration value="RRC" />
      \<xs:enumeration value="SAR" />
      \<xs:enumeration value="TCF" />
      \<xs:enumeration value="TCR" />
      \<xs:enumeration value="IFL" />
      \<xs:enumeration value="FAN" />
      \<xs:enumeration value="SCR" />
      \<xs:enumeration value="SMC" />
      \<xs:enumeration value="PMP" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tExtensionEquipmentEnum">
    \<xs:restriction base="xs:Name">
      \<xs:minLength value="3" />
      \<xs:pattern value="E[A-Z]*" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tCommonConductingEquipmentEnum">
    \<xs:union memberTypes="tPredefinedCommonConductingEquipmentEnum tExtensionEquipmentEnum" />
  \</xs:simpleType>
  \<xs:simpleType name="tPowerTransformerEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="PTR" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tTransformerWindingEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="PTW" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tPredefinedGeneralEquipmentEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="AXN" />
      \<xs:enumeration value="BAT" />
      \<xs:enumeration value="MOT" />
      \<xs:enumeration value="FAN" />
      \<xs:enumeration value="FIL" />
      \<xs:enumeration value="PMP" />
      \<xs:enumeration value="TNK" />
      \<xs:enumeration value="VLV" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tExtensionGeneralEquipmentEnum">
    \<xs:restriction base="xs:Name">
      \<xs:minLength value="3" />
      \<xs:pattern value="E[A-Z]*" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tGeneralEquipmentEnum">
    \<xs:union memberTypes="tPredefinedGeneralEquipmentEnum tExtensionGeneralEquipmentEnum" />
  \</xs:simpleType>
  \<xs:simpleType name="tServiceSettingsNoDynEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="Conf" />
      \<xs:enumeration value="Fix" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tServiceSettingsEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="Dyn" />
      \<xs:enumeration value="Conf" />
      \<xs:enumeration value="Fix" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tRedProtEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="none" />
      \<xs:enumeration value="hsr" />
      \<xs:enumeration value="prp" />
      \<xs:enumeration value="rstp" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tSMVDeliveryEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="unicast" />
      \<xs:enumeration value="multicast" />
      \<xs:enumeration value="both" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tPhaseEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="A" />
      \<xs:enumeration value="B" />
      \<xs:enumeration value="C" />
      \<xs:enumeration value="N" />
      \<xs:enumeration value="all" />
      \<xs:enumeration value="none" />
      \<xs:enumeration value="AB" />
      \<xs:enumeration value="BC" />
      \<xs:enumeration value="CA" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tAuthenticationEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="none" />
      \<xs:enumeration value="password" />
      \<xs:enumeration value="weak" />
      \<xs:enumeration value="strong" />
      \<xs:enumeration value="certificate" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tAssociationKindEnum">
    \<xs:restriction base="xs:token">
      \<xs:enumeration value="pre-established" />
      \<xs:enumeration value="predefined" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tLPHDEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="LPHD" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tLLN0Enum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="LLN0" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tSystemLNGroupEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="L[A-Z]*" />
      \<xs:pattern value="LLN0" />
      \<xs:enumeration value="LLN0" />
      \<xs:enumeration value="LPHD" />
      \<xs:enumeration value="LCCH" />
      \<xs:enumeration value="LGOS" />
      \<xs:enumeration value="LSVS" />
      \<xs:enumeration value="LTIM" />
      \<xs:enumeration value="LTMS" />
      \<xs:enumeration value="LTRK" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupAEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="A[A-Z]*" />
      \<xs:enumeration value="ANCR" />
      \<xs:enumeration value="ARCO" />
      \<xs:enumeration value="ARIS" />
      \<xs:enumeration value="ATCC" />
      \<xs:enumeration value="AVCO" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupCEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="C[A-Z]*" />
      \<xs:enumeration value="CALH" />
      \<xs:enumeration value="CCGR" />
      \<xs:enumeration value="CILO" />
      \<xs:enumeration value="CPOW" />
      \<xs:enumeration value="CSWI" />
      \<xs:enumeration value="CSYN" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupFEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="F[A-Z]*" />
      \<xs:enumeration value="FCNT" />
      \<xs:enumeration value="FCSD" />
      \<xs:enumeration value="FFIL" />
      \<xs:enumeration value="FLIM" />
      \<xs:enumeration value="FPID" />
      \<xs:enumeration value="FRMP" />
      \<xs:enumeration value="FSPT" />
      \<xs:enumeration value="FXOT" />
      \<xs:enumeration value="FXUT" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupGEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="G[A-Z]*" />
      \<xs:enumeration value="GAPC" />
      \<xs:enumeration value="GGIO" />
      \<xs:enumeration value="GLOG" />
      \<xs:enumeration value="GSAL" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupIEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="I[A-Z]*" />
      \<xs:enumeration value="IARC" />
      \<xs:enumeration value="IHMI" />
      \<xs:enumeration value="ISAF" />
      \<xs:enumeration value="ITCI" />
      \<xs:enumeration value="ITMI" />
      \<xs:enumeration value="ITPC" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupKEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="K[A-Z]*" />
      \<xs:enumeration value="KFAN" />
      \<xs:enumeration value="KFIL" />
      \<xs:enumeration value="KPMP" />
      \<xs:enumeration value="KTNK" />
      \<xs:enumeration value="KVLV" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupMEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="M[A-Z]*" />
      \<xs:enumeration value="MDIF" />
      \<xs:enumeration value="MENV" />
      \<xs:enumeration value="MFLK" />
      \<xs:enumeration value="MHAI" />
      \<xs:enumeration value="MHAN" />
      \<xs:enumeration value="MHYD" />
      \<xs:enumeration value="MMDC" />
      \<xs:enumeration value="MMET" />
      \<xs:enumeration value="MMTN" />
      \<xs:enumeration value="MMTR" />
      \<xs:enumeration value="MMXN" />
      \<xs:enumeration value="MMXU" />
      \<xs:enumeration value="MSQI" />
      \<xs:enumeration value="MSTA" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupPEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="P[A-Z]*" />
      \<xs:enumeration value="PDIF" />
      \<xs:enumeration value="PDIR" />
      \<xs:enumeration value="PDIS" />
      \<xs:enumeration value="PDOP" />
      \<xs:enumeration value="PDUP" />
      \<xs:enumeration value="PFRC" />
      \<xs:enumeration value="PHAR" />
      \<xs:enumeration value="PHIZ" />
      \<xs:enumeration value="PIOC" />
      \<xs:enumeration value="PMRI" />
      \<xs:enumeration value="PMSS" />
      \<xs:enumeration value="POPF" />
      \<xs:enumeration value="PPAM" />
      \<xs:enumeration value="PRTR" />
      \<xs:enumeration value="PSCH" />
      \<xs:enumeration value="PSDE" />
      \<xs:enumeration value="PTEF" />
      \<xs:enumeration value="PTHF" />
      \<xs:enumeration value="PTOC" />
      \<xs:enumeration value="PTOF" />
      \<xs:enumeration value="PTOV" />
      \<xs:enumeration value="PTRC" />
      \<xs:enumeration value="PTTR" />
      \<xs:enumeration value="PTUC" />
      \<xs:enumeration value="PTUF" />
      \<xs:enumeration value="PTUV" />
      \<xs:enumeration value="PUPF" />
      \<xs:enumeration value="PVOC" />
      \<xs:enumeration value="PVPH" />
      \<xs:enumeration value="PZSU" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupQEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="Q[A-Z]*" />
      \<xs:enumeration value="QFVR" />
      \<xs:enumeration value="QITR" />
      \<xs:enumeration value="QIUB" />
      \<xs:enumeration value="QVTR" />
      \<xs:enumeration value="QVUB" />
      \<xs:enumeration value="QVVR" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupREnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="R[A-Z]*" />
      \<xs:enumeration value="RADR" />
      \<xs:enumeration value="RBDR" />
      \<xs:enumeration value="RBRF" />
      \<xs:enumeration value="RDIR" />
      \<xs:enumeration value="RDRE" />
      \<xs:enumeration value="RDRS" />
      \<xs:enumeration value="RFLO" />
      \<xs:enumeration value="RMXU" />
      \<xs:enumeration value="RPSB" />
      \<xs:enumeration value="RREC" />
      \<xs:enumeration value="RSYN" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupSEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="S[A-Z]*" />
      \<xs:enumeration value="SARC" />
      \<xs:enumeration value="SCBR" />
      \<xs:enumeration value="SIMG" />
      \<xs:enumeration value="SIML" />
      \<xs:enumeration value="SLTC" />
      \<xs:enumeration value="SOPM" />
      \<xs:enumeration value="SPDC" />
      \<xs:enumeration value="SPTR" />
      \<xs:enumeration value="SSWI" />
      \<xs:enumeration value="STMP" />
      \<xs:enumeration value="SVBR" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupTEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="T[A-Z]*" />
      \<xs:enumeration value="TANG" />
      \<xs:enumeration value="TAXD" />
      \<xs:enumeration value="TCTR" />
      \<xs:enumeration value="TDST" />
      \<xs:enumeration value="TFLW" />
      \<xs:enumeration value="TFRQ" />
      \<xs:enumeration value="TGSN" />
      \<xs:enumeration value="THUM" />
      \<xs:enumeration value="TLVL" />
      \<xs:enumeration value="TMGF" />
      \<xs:enumeration value="TMVM" />
      \<xs:enumeration value="TPOS" />
      \<xs:enumeration value="TPRS" />
      \<xs:enumeration value="TRTN" />
      \<xs:enumeration value="TSND" />
      \<xs:enumeration value="TTMP" />
      \<xs:enumeration value="TTNS" />
      \<xs:enumeration value="TVBR" />
      \<xs:enumeration value="TVTR" />
      \<xs:enumeration value="TWPH" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupXEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="X[A-Z]*" />
      \<xs:enumeration value="XCBR" />
      \<xs:enumeration value="XSWI" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupYEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="Y[A-Z]*" />
      \<xs:enumeration value="YEFN" />
      \<xs:enumeration value="YLTC" />
      \<xs:enumeration value="YPSH" />
      \<xs:enumeration value="YPTR" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNGroupZEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="Z[A-Z]*" />
      \<xs:enumeration value="ZAXN" />
      \<xs:enumeration value="ZBAT" />
      \<xs:enumeration value="ZBSH" />
      \<xs:enumeration value="ZCAB" />
      \<xs:enumeration value="ZCAP" />
      \<xs:enumeration value="ZCON" />
      \<xs:enumeration value="ZGEN" />
      \<xs:enumeration value="ZGIL" />
      \<xs:enumeration value="ZLIN" />
      \<xs:enumeration value="ZMOT" />
      \<xs:enumeration value="ZREA" />
      \<xs:enumeration value="ZRES" />
      \<xs:enumeration value="ZRRC" />
      \<xs:enumeration value="ZSAR" />
      \<xs:enumeration value="ZSCR" />
      \<xs:enumeration value="ZSMC" />
      \<xs:enumeration value="ZTCF" />
      \<xs:enumeration value="ZTCR" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDomainLNEnum">
    \<xs:union memberTypes="tDomainLNGroupAEnum tDomainLNGroupCEnum tDomainLNGroupFEnum tDomainLNGroupGEnum tDomainLNGroupIEnum tDomainLNGroupKEnum tDomainLNGroupMEnum tDomainLNGroupPEnum tDomainLNGroupQEnum tDomainLNGroupREnum tDomainLNGroupSEnum tDomainLNGroupTEnum tDomainLNGroupXEnum tDomainLNGroupYEnum tDomainLNGroupZEnum" />
  \</xs:simpleType>
  \<xs:simpleType name="tPredefinedLNClassEnum">
    \<xs:union memberTypes="tSystemLNGroupEnum tDomainLNEnum" />
  \</xs:simpleType>
  \<xs:simpleType name="tExtensionLNClassEnum">
    \<xs:restriction base="xs:Name">
      \<xs:length value="4" />
      \<xs:pattern value="[A-Z]+" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tLNClassEnum">
    \<xs:union memberTypes="tPredefinedLNClassEnum tExtensionLNClassEnum" />
  \</xs:simpleType>
  \<xs:simpleType name="tPredefinedCDCEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="SPS" />
      \<xs:enumeration value="DPS" />
      \<xs:enumeration value="INS" />
      \<xs:enumeration value="ENS" />
      \<xs:enumeration value="ACT" />
      \<xs:enumeration value="ACD" />
      \<xs:enumeration value="SEC" />
      \<xs:enumeration value="BCR" />
      \<xs:enumeration value="HST" />
      \<xs:enumeration value="VSS" />
      \<xs:enumeration value="MV" />
      \<xs:enumeration value="CMV" />
      \<xs:enumeration value="SAV" />
      \<xs:enumeration value="WYE" />
      \<xs:enumeration value="DEL" />
      \<xs:enumeration value="SEQ" />
      \<xs:enumeration value="HMV" />
      \<xs:enumeration value="HWYE" />
      \<xs:enumeration value="HDEL" />
      \<xs:enumeration value="SPC" />
      \<xs:enumeration value="DPC" />
      \<xs:enumeration value="INC" />
      \<xs:enumeration value="ENC" />
      \<xs:enumeration value="BSC" />
      \<xs:enumeration value="ISC" />
      \<xs:enumeration value="APC" />
      \<xs:enumeration value="BAC" />
      \<xs:enumeration value="SPG" />
      \<xs:enumeration value="ING" />
      \<xs:enumeration value="ENG" />
      \<xs:enumeration value="ORG" />
      \<xs:enumeration value="TSG" />
      \<xs:enumeration value="CUG" />
      \<xs:enumeration value="VSG" />
      \<xs:enumeration value="ASG" />
      \<xs:enumeration value="CURVE" />
      \<xs:enumeration value="CSG" />
      \<xs:enumeration value="DPL" />
      \<xs:enumeration value="LPL" />
      \<xs:enumeration value="CSD" />
      \<xs:enumeration value="CST" />
      \<xs:enumeration value="BTS" />
      \<xs:enumeration value="UTS" />
      \<xs:enumeration value="LTS" />
      \<xs:enumeration value="GTS" />
      \<xs:enumeration value="MTS" />
      \<xs:enumeration value="NTS" />
      \<xs:enumeration value="STS" />
      \<xs:enumeration value="CTS" />
      \<xs:enumeration value="OTS" />
      \<xs:enumeration value="VSD" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tExtensionCDCEnum">
    \<xs:restriction base="xs:Name">
      \<xs:minLength value="1" />
      \<xs:maxLength value="5" />
      \<xs:pattern value="[A-Za-z]+" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tCDCEnum">
    \<xs:restriction base="tPredefinedCDCEnum" />
  \</xs:simpleType>
  \<xs:simpleType name="tFCEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="ST" />
      \<xs:enumeration value="MX" />
      \<xs:enumeration value="CO" />
      \<xs:enumeration value="SP" />
      \<xs:enumeration value="SG" />
      \<xs:enumeration value="SE" />
      \<xs:enumeration value="SV" />
      \<xs:enumeration value="CF" />
      \<xs:enumeration value="DC" />
      \<xs:enumeration value="EX" />
      \<xs:enumeration value="SR" />
      \<xs:enumeration value="BL" />
      \<xs:enumeration value="OR" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tPredefinedBasicTypeEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="BOOLEAN" />
      \<xs:enumeration value="INT8" />
      \<xs:enumeration value="INT16" />
      \<xs:enumeration value="INT24" />
      \<xs:enumeration value="INT32" />
      \<xs:enumeration value="INT64" />
      \<xs:enumeration value="INT128" />
      \<xs:enumeration value="INT8U" />
      \<xs:enumeration value="INT16U" />
      \<xs:enumeration value="INT24U" />
      \<xs:enumeration value="INT32U" />
      \<xs:enumeration value="FLOAT32" />
      \<xs:enumeration value="FLOAT64" />
      \<xs:enumeration value="Enum" />
      \<xs:enumeration value="Dbpos" />
      \<xs:enumeration value="Tcmd" />
      \<xs:enumeration value="Quality" />
      \<xs:enumeration value="Timestamp" />
      \<xs:enumeration value="VisString32" />
      \<xs:enumeration value="VisString64" />
      \<xs:enumeration value="VisString65" />
      \<xs:enumeration value="VisString129" />
      \<xs:enumeration value="VisString255" />
      \<xs:enumeration value="Octet64" />
      \<xs:enumeration value="Unicode255" />
      \<xs:enumeration value="Struct" />
      \<xs:enumeration value="EntryTime" />
      \<xs:enumeration value="Check" />
      \<xs:enumeration value="ObjRef" />
      \<xs:enumeration value="Currency" />
      \<xs:enumeration value="PhyComAddr" />
      \<xs:enumeration value="TrgOps" />
      \<xs:enumeration value="OptFlds" />
      \<xs:enumeration value="SvOptFlds" />
      \<xs:enumeration value="EntryID" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tBasicTypeEnum">
    \<xs:restriction base="tPredefinedBasicTypeEnum" />
  \</xs:simpleType>
  \<xs:simpleType name="tValKindEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="Spec" />
      \<xs:enumeration value="Conf" />
      \<xs:enumeration value="RO" />
      \<xs:enumeration value="Set" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tGSEControlTypeEnum">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="GSSE" />
      \<xs:enumeration value="GOOSE" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tUnitMultiplierEnum">
    \<xs:restriction base="xs:normalizedString">
      \<xs:enumeration value="" />
      \<xs:enumeration value="m" />
      \<xs:enumeration value="k" />
      \<xs:enumeration value="M" />
      \<xs:enumeration value="mu" />
      \<xs:enumeration value="y" />
      \<xs:enumeration value="z" />
      \<xs:enumeration value="a" />
      \<xs:enumeration value="f" />
      \<xs:enumeration value="p" />
      \<xs:enumeration value="n" />
      \<xs:enumeration value="c" />
      \<xs:enumeration value="d" />
      \<xs:enumeration value="da" />
      \<xs:enumeration value="h" />
      \<xs:enumeration value="G" />
      \<xs:enumeration value="T" />
      \<xs:enumeration value="P" />
      \<xs:enumeration value="E" />
      \<xs:enumeration value="Z" />
      \<xs:enumeration value="Y" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tRightEnum">
    \<xs:restriction base="xs:normalizedString">
      \<xs:enumeration value="full" />
      \<xs:enumeration value="fix" />
      \<xs:enumeration value="dataflow" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tSDOCount">
    \<xs:union memberTypes="xs:unsignedInt tRestrName1stL" />
  \</xs:simpleType>
  \<xs:simpleType name="tDACount">
    \<xs:union memberTypes="xs:unsignedInt tAttributeNameEnum" />
  \</xs:simpleType>
  \<xs:simpleType name="tSmpMod">
    \<xs:restriction base="xs:normalizedString">
      \<xs:enumeration value="SmpPerPeriod" />
      \<xs:enumeration value="SmpPerSec" />
      \<xs:enumeration value="SecPerSmp" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tPredefinedPhysConnTypeEnum">
    \<xs:restriction base="xs:normalizedString">
      \<xs:enumeration value="Connection" />
      \<xs:enumeration value="RedConn" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tExtensionPhysConnTypeEnum">
    \<xs:restriction base="xs:normalizedString">
      \<xs:pattern value="[A-Z][0-9A-Za-z\-]*" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tPhysConnTypeEnum">
    \<xs:union memberTypes="tPredefinedPhysConnTypeEnum tExtensionPhysConnTypeEnum" />
  \</xs:simpleType>
  \<xs:simpleType name="tServiceType">
    \<xs:restriction base="xs:Name">
      \<xs:enumeration value="Poll" />
      \<xs:enumeration value="Report" />
      \<xs:enumeration value="GOOSE" />
      \<xs:enumeration value="SMV" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tPredefinedTypeOfSecurityEnum">
    \<xs:restriction base="xs:normalizedString">
      \<xs:enumeration value="None" />
      \<xs:enumeration value="Signature" />
      \<xs:enumeration value="SignatureAndEncryption" />
    \</xs:restriction>
  \</xs:simpleType>
  \<!--Schema items added from SCL.2007B1.2014-07-18\SCL\_BaseSimpleTypes.xsd-->
  \<xs:annotation>
    \<xs:documentation xml:lang="en">
			SCL schema version "2007" revision "B" release 1,  for IEC 61850-6 Ed. 2.1. Draft 2014-07-18.
			
			COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon.
		\</xs:documentation>
  \</xs:annotation>
  \<xs:simpleType name="tRef">
    \<xs:restriction base="xs:normalizedString">
      \<xs:pattern value=".+/.+/.+/.+(/.+)*" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tAnyName">
    \<xs:restriction base="xs:normalizedString" />
  \</xs:simpleType>
  \<xs:simpleType name="tName">
    \<xs:restriction base="tAnyName">
      \<xs:minLength value="1" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tAcsiName">
    \<xs:restriction base="xs:Name">
      \<xs:pattern value="[A-Za-z][0-9A-Za-z\_]*" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tRestrName1stU">
    \<xs:restriction base="xs:Name">
      \<xs:pattern value="[A-Z][0-9A-Za-z]*" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tRestrName1stL">
    \<xs:restriction base="xs:Name">
      \<xs:pattern value="[a-z][0-9A-Za-z]*" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tPAddr">
    \<xs:restriction base="xs:normalizedString">
      \<xs:minLength value="1" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tSclVersion">
    \<xs:restriction base="tName">
      \<xs:pattern value="2[0-2][0-9]{2}" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tSclRevision">
    \<xs:restriction base="xs:Name">
      \<xs:pattern value="[A-Z]" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tSclRelease">
    \<xs:restriction base="xs:unsignedByte">
      \<xs:minExclusive value="0" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tEmpty">
    \<xs:restriction base="xs:normalizedString">
      \<xs:maxLength value="0" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tIEDName">
    \<xs:restriction base="tAcsiName">
      \<xs:maxLength value="64" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tOnlyRelativeIEDName">
    \<xs:restriction base="xs:normalizedString">
      \<xs:pattern value="@" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tIEDNameOrRelative">
    \<xs:union memberTypes="tIEDName tOnlyRelativeIEDName" />
  \</xs:simpleType>
  \<xs:simpleType name="tLDName">
    \<xs:restriction base="xs:normalizedString">
      \<xs:maxLength value="64" />
      \<xs:pattern value="[A-Za-z][0-9A-Za-z\_]*" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tLDInst">
    \<xs:restriction base="xs:normalizedString">
      \<xs:maxLength value="64" />
      \<xs:pattern value="[A-Za-z0-9][0-9A-Za-z\_]*" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tLDInstOrEmpty">
    \<xs:union memberTypes="tLDInst tEmpty" />
  \</xs:simpleType>
  \<xs:simpleType name="tPrefix">
    \<xs:restriction base="xs:normalizedString">
      \<xs:maxLength value="11" />
      \<xs:pattern value="[A-Za-z][0-9A-Za-z\_]*" />
      \<xs:pattern value="" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tLNInst">
    \<xs:restriction base="xs:normalizedString">
      \<xs:pattern value="[0-9]{1,12}" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tLNInstOrEmpty">
    \<xs:union memberTypes="tLNInst tEmpty" />
  \</xs:simpleType>
  \<xs:simpleType name="tDataName">
    \<xs:restriction base="tRestrName1stU">
      \<xs:maxLength value="12" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tDataSetName">
    \<xs:restriction base="tAcsiName">
      \<xs:maxLength value="32" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tCBName">
    \<xs:restriction base="tAcsiName">
      \<xs:maxLength value="32" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tLogName">
    \<xs:restriction base="tAcsiName">
      \<xs:maxLength value="32" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tAccessPointName">
    \<xs:restriction base="xs:normalizedString">
      \<xs:pattern value="[A-Za-z0-9][0-9A-Za-z\_]*" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tAssociationID">
    \<xs:restriction base="xs:normalizedString">
      \<xs:minLength value="1" />
      \<xs:pattern value="[0-9A-Za-z]+" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tVisibleBasicLatin">
    \<xs:restriction base="xs:normalizedString">
      \<xs:pattern value="[ -~]*" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tMessageID">
    \<xs:restriction base="tVisibleBasicLatin">
      \<xs:minLength value="1" />
      \<xs:maxLength value="129" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tFullAttributeName">
    \<xs:restriction base="xs:normalizedString">
      \<xs:pattern value="[a-zA-Z][a-zA-Z0-9]*(\([0-9]+\))?(\.[a-zA-Z][a-zA-Z0-9]*(\([0-9]+\))?)*" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tFullDOName">
    \<xs:restriction base="xs:normalizedString">
      \<xs:pattern value="[A-Z][0-9A-Za-z]{0,11}(\.[a-z][0-9A-Za-z]*(\([0-9]+\))?)?" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tSubDataName">
    \<xs:restriction base="tRestrName1stL">
      \<xs:minLength value="1" />
      \<xs:maxLength value="60" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tNamespaceName">
    \<xs:restriction base="xs:normalizedString">
      \<xs:pattern value="[ -~]+:20\d\d[A-Z]?" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tLineType">
    \<xs:restriction base="xs:normalizedString">
      \<xs:minLength value="1" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tProcessType">
    \<xs:restriction base="xs:normalizedString">
      \<xs:minLength value="1" />
    \</xs:restriction>
  \</xs:simpleType>
  \<xs:simpleType name="tProcessName">
    \<xs:restriction base="xs:normalizedString">
      \<xs:pattern value=".+(/.+)*" />
    \</xs:restriction>
  \</xs:simpleType>
  \<!--Schema items added from SCL.2007B1.2014-07-18\SCL\_IED.xsd-->
  \<xs:annotation>
    \<xs:documentation xml:lang="en">
			SCL schema version "2007" revision "B" release 1,  for IEC 61850-6 Ed. 2.1. Draft 2014-07-18.
			
			COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon.
		\</xs:documentation>
  \</xs:annotation>
  \<xs:attributeGroup name="agAuthentication">
    \<xs:attribute name="none" default="true" type="xs:boolean" use="optional" />
    \<xs:attribute name="password" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="weak" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="strong" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="certificate" default="false" type="xs:boolean" use="optional" />
  \</xs:attributeGroup>
  \<xs:attributeGroup name="agSmvOpts">
    \<xs:attribute name="refreshTime" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="sampleSynchronized" fixed="true" type="xs:boolean" use="optional" />
    \<xs:attribute name="sampleRate" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="dataSet" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="security" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="timestamp" default="false" type="xs:boolean" use="optional" />
  \</xs:attributeGroup>
  \<xs:attributeGroup name="agOptFields">
    \<xs:attribute name="seqNum" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="timeStamp" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="dataSet" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="reasonCode" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="dataRef" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="entryID" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="configRef" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="bufOvfl" default="true" type="xs:boolean" use="optional" />
  \</xs:attributeGroup>
  \<xs:attributeGroup name="agLDRef">
    \<xs:attributeGroup ref="agDesc" />
    \<xs:attribute name="iedName" type="tIEDName" use="required" />
    \<xs:attribute name="ldInst" type="tLDInst" use="required" />
  \</xs:attributeGroup>
  \<xs:attributeGroup name="agLNRef">
    \<xs:attributeGroup ref="agLDRef" />
    \<xs:attribute name="prefix" default="" type="tPrefix" use="optional" />
    \<xs:attribute name="lnClass" type="tLNClassEnum" use="required" />
    \<xs:attribute name="lnInst" type="tLNInstOrEmpty" use="required" />
  \</xs:attributeGroup>
  \<xs:complexType name="tIED">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:sequence>
          \<xs:element name="Services" type="tServices" minOccurs="0" />
          \<xs:element name="AccessPoint" type="tAccessPoint" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNInAccessPoint">
              \<xs:selector xpath="./scl:LN" />
              \<xs:field xpath="@inst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="KDC" type="tKDC" minOccurs="0" maxOccurs="unbounded" />
        \</xs:sequence>
        \<xs:attribute name="name" type="tIEDName" use="required" />
        \<xs:attribute name="type" type="xs:normalizedString" use="optional" />
        \<xs:attribute name="manufacturer" type="xs:normalizedString" use="optional" />
        \<xs:attribute name="configVersion" type="xs:normalizedString" use="optional" />
        \<xs:attribute name="originalSclVersion" type="tSclVersion" use="optional" />
        \<xs:attribute name="originalSclRevision" type="tSclRevision" use="optional" />
        \<xs:attribute name="originalSclRelease" type="tSclRelease" use="optional" />
        \<xs:attribute name="engRight" default="full" type="tRightEnum" use="optional" />
        \<xs:attribute name="owner" type="xs:normalizedString" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tServices">
    \<xs:all>
      \<xs:element name="DynAssociation" type="tServiceWithOptionalMax" minOccurs="0" />
      \<xs:element name="SettingGroups" type="tSettingGroups" minOccurs="0" />
      \<xs:element name="GetDirectory" type="tServiceYesNo" minOccurs="0" />
      \<xs:element name="GetDataObjectDefinition" type="tServiceYesNo" minOccurs="0" />
      \<xs:element name="DataObjectDirectory" type="tServiceYesNo" minOccurs="0" />
      \<xs:element name="GetDataSetValue" type="tServiceYesNo" minOccurs="0" />
      \<xs:element name="SetDataSetValue" type="tServiceYesNo" minOccurs="0" />
      \<xs:element name="DataSetDirectory" type="tServiceYesNo" minOccurs="0" />
      \<xs:element name="ConfDataSet" type="tServiceForConfDataSet" minOccurs="0" />
      \<xs:element name="DynDataSet" type="tServiceWithMaxAndMaxAttributes" minOccurs="0" />
      \<xs:element name="ReadWrite" type="tServiceYesNo" minOccurs="0" />
      \<xs:element name="TimerActivatedControl" type="tServiceYesNo" minOccurs="0" />
      \<xs:element name="ConfReportControl" type="tServiceConfReportControl" minOccurs="0" />
      \<xs:element name="GetCBValues" type="tServiceYesNo" minOccurs="0" />
      \<xs:element name="ConfLogControl" type="tServiceWithMaxNonZero" minOccurs="0" />
      \<xs:element name="ReportSettings" type="tReportSettings" minOccurs="0" />
      \<xs:element name="LogSettings" type="tLogSettings" minOccurs="0" />
      \<xs:element name="GSESettings" type="tGSESettings" minOccurs="0" />
      \<xs:element name="SMVSettings" type="tSMVSettings" minOccurs="0" />
      \<xs:element name="GSEDir" type="tServiceYesNo" minOccurs="0" />
      \<xs:element name="GOOSE" type="tGOOSEcapabilities" minOccurs="0" />
      \<xs:element name="GSSE" type="tServiceWithMax" minOccurs="0" />
      \<xs:element name="SMVsc" type="tSMVsc" minOccurs="0" />
      \<xs:element name="FileHandling" type="tFileHandling" minOccurs="0" />
      \<xs:element name="ConfLNs" type="tConfLNs" minOccurs="0" />
      \<xs:element name="ClientServices" type="tClientServices" minOccurs="0" />
      \<xs:element name="ConfLdName" type="tServiceYesNo" minOccurs="0" />
      \<xs:element name="SupSubscription" type="tSupSubscription" minOccurs="0" />
      \<xs:element name="ConfSigRef" type="tServiceWithMaxNonZero" minOccurs="0" />
      \<xs:element name="ValueHandling" type="tValueHandling" minOccurs="0" />
      \<xs:element name="RedProt" type="tRedProt" minOccurs="0" />
      \<xs:element name="TimeSyncProt" type="tTimeSyncProt" minOccurs="0" />
      \<xs:element name="CommProt" type="tCommProt" minOccurs="0" />
    \</xs:all>
    \<xs:attribute name="nameLength" default="32" use="optional">
      \<xs:simpleType>
        \<xs:restriction base="xs:token">
          \<xs:pattern value="32" />
          \<xs:pattern value="64" />
          \<xs:pattern value="6[5-9]" />
          \<xs:pattern value="[7-9]\d" />
          \<xs:pattern value="[1-9]\d\d+" />
        \</xs:restriction>
      \</xs:simpleType>
    \</xs:attribute>
  \</xs:complexType>
  \<xs:complexType name="tAccessPoint">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:sequence>
          \<xs:choice minOccurs="0">
            \<xs:element name="Server" type="tServer">
              \<xs:unique name="uniqueAssociationInServer">
                \<xs:selector xpath="./scl:Association" />
                \<xs:field xpath="@associationID" />
              \</xs:unique>
            \</xs:element>
            \<xs:element ref="LN" maxOccurs="unbounded" />
            \<xs:element name="ServerAt" type="tServerAt" />
          \</xs:choice>
          \<xs:element name="Services" type="tServices" minOccurs="0" />
          \<xs:element name="GOOSESecurity" type="tCertificate" minOccurs="0" maxOccurs="7" />
          \<xs:element name="SMVSecurity" type="tCertificate" minOccurs="0" maxOccurs="7" />
        \</xs:sequence>
        \<xs:attribute name="name" type="tAccessPointName" use="required" />
        \<xs:attribute name="router" default="false" type="xs:boolean" use="optional" />
        \<xs:attribute name="clock" default="false" type="xs:boolean" use="optional" />
        \<xs:attribute name="kdc" default="false" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tCertificate">
    \<xs:complexContent>
      \<xs:extension base="tNaming">
        \<xs:sequence>
          \<xs:element name="Subject" type="tCert" />
          \<xs:element name="IssuerName" type="tCert" />
        \</xs:sequence>
        \<xs:attribute name="xferNumber" type="xs:unsignedInt" use="optional" />
        \<xs:attribute name="serialNumber" use="required">
          \<xs:simpleType>
            \<xs:restriction base="xs:normalizedString">
              \<xs:minLength value="1" />
              \<xs:pattern value="[0-9]+" />
            \</xs:restriction>
          \</xs:simpleType>
        \</xs:attribute>
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tCert">
    \<xs:attribute name="commonName" use="required">
      \<xs:simpleType>
        \<xs:restriction base="xs:normalizedString">
          \<xs:minLength value="4" />
          \<xs:pattern value="none" />
          \<xs:pattern value="CN=.+" />
        \</xs:restriction>
      \</xs:simpleType>
    \</xs:attribute>
    \<xs:attribute name="idHierarchy" use="required">
      \<xs:simpleType>
        \<xs:restriction base="xs:normalizedString">
          \<xs:minLength value="1" />
        \</xs:restriction>
      \</xs:simpleType>
    \</xs:attribute>
  \</xs:complexType>
  \<xs:complexType name="tServerAt">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:attribute name="apName" type="tAccessPointName" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tServer">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:sequence>
          \<xs:element name="Authentication">
            \<xs:complexType>
              \<xs:attributeGroup ref="agAuthentication" />
            \</xs:complexType>
          \</xs:element>
          \<xs:element name="LDevice" type="tLDevice" maxOccurs="unbounded">
            \<xs:unique name="uniqueLNInLDevice">
              \<xs:selector xpath="./scl:LN" />
              \<xs:field xpath="@inst" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@prefix" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="Association" type="tAssociation" minOccurs="0" maxOccurs="unbounded" />
        \</xs:sequence>
        \<xs:attribute name="timeout" default="30" type="xs:unsignedInt" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tLDevice">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:sequence>
          \<xs:element ref="LN0" />
          \<xs:element ref="LN" minOccurs="0" maxOccurs="unbounded" />
          \<xs:element name="AccessControl" type="tAccessControl" minOccurs="0" />
        \</xs:sequence>
        \<xs:attribute name="inst" type="tLDInst" use="required" />
        \<xs:attribute name="ldName" type="tLDName" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType mixed="true" name="tAccessControl">
    \<xs:complexContent>
      \<xs:extension base="tAnyContentFromOtherNamespace" />
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tAssociation">
    \<xs:attributeGroup ref="agLNRef" />
    \<xs:attribute name="kind" type="tAssociationKindEnum" use="required" />
    \<xs:attribute name="associationID" type="tAssociationID" use="optional" />
  \</xs:complexType>
  \<xs:element name="LN0">
    \<xs:complexType>
      \<xs:complexContent>
        \<xs:extension base="tLN0" />
      \</xs:complexContent>
    \</xs:complexType>
    \<xs:unique name="uniqueReportControlInLN0">
      \<xs:selector xpath="./scl:ReportControl" />
      \<xs:field xpath="@name" />
    \</xs:unique>
    \<xs:unique name="uniqueLogControlInLN0">
      \<xs:selector xpath="./scl:LogControl" />
      \<xs:field xpath="@name" />
    \</xs:unique>
    \<xs:unique name="uniqueGSEControlInLN0">
      \<xs:selector xpath="./scl:GSEControl" />
      \<xs:field xpath="@name" />
    \</xs:unique>
    \<xs:unique name="uniqueSampledValueControlInLN0">
      \<xs:selector xpath="./scl:SampledValueControl" />
      \<xs:field xpath="@name" />
    \</xs:unique>
    \<xs:key name="DataSetKeyLN0">
      \<xs:selector xpath="./scl:DataSet" />
      \<xs:field xpath="@name" />
    \</xs:key>
    \<xs:keyref name="ref2DataSetReportLN0" refer="DataSetKeyLN0">
      \<xs:selector xpath="./scl:ReportControl" />
      \<xs:field xpath="@datSet" />
    \</xs:keyref>
    \<xs:keyref name="ref2DataSetLogLN0" refer="DataSetKeyLN0">
      \<xs:selector xpath="./scl:LogControl" />
      \<xs:field xpath="@datSet" />
    \</xs:keyref>
    \<xs:keyref name="ref2DataSetGSELN0" refer="DataSetKeyLN0">
      \<xs:selector xpath="./scl:GSEControl" />
      \<xs:field xpath="@datSet" />
    \</xs:keyref>
    \<xs:keyref name="ref2DataSetSVLN0" refer="DataSetKeyLN0">
      \<xs:selector xpath="./scl:SampledValueControl" />
      \<xs:field xpath="@datSet" />
    \</xs:keyref>
    \<xs:unique name="uniqueDOIinLN0">
      \<xs:selector xpath="./scl:DOI" />
      \<xs:field xpath="@name" />
    \</xs:unique>
    \<xs:unique name="uniqueLogInLN0">
      \<xs:selector xpath="./scl:Log" />
      \<xs:field xpath="@name" />
    \</xs:unique>
  \</xs:element>
  \<xs:element name="LN" type="tLN">
    \<xs:unique name="uniqueReportControlInLN">
      \<xs:selector xpath="./scl:ReportControl" />
      \<xs:field xpath="@name" />
    \</xs:unique>
    \<xs:unique name="uniqueLogControlInLN">
      \<xs:selector xpath="./scl:LogControl" />
      \<xs:field xpath="@name" />
    \</xs:unique>
    \<xs:key name="DataSetKeyInLN">
      \<xs:selector xpath="./scl:DataSet" />
      \<xs:field xpath="@name" />
    \</xs:key>
    \<xs:keyref name="ref2DataSetReport" refer="DataSetKeyInLN">
      \<xs:selector xpath="./scl:ReportControl" />
      \<xs:field xpath="@datSet" />
    \</xs:keyref>
    \<xs:keyref name="ref2DataSetLog" refer="DataSetKeyInLN">
      \<xs:selector xpath="./scl:LogControl" />
      \<xs:field xpath="@datSet" />
    \</xs:keyref>
    \<xs:unique name="uniqueDOIinLN">
      \<xs:selector xpath="./scl:DOI" />
      \<xs:field xpath="@name" />
    \</xs:unique>
    \<xs:unique name="uniqueLogInLN">
      \<xs:selector xpath="./scl:Log" />
      \<xs:field xpath="@name" />
    \</xs:unique>
  \</xs:element>
  \<xs:complexType abstract="true" name="tAnyLN">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:sequence>
          \<xs:element name="DataSet" type="tDataSet" minOccurs="0" maxOccurs="unbounded" />
          \<xs:element name="ReportControl" type="tReportControl" minOccurs="0" maxOccurs="unbounded" />
          \<xs:element name="LogControl" type="tLogControl" minOccurs="0" maxOccurs="unbounded" />
          \<xs:element name="DOI" type="tDOI" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniqueSDI\_DAIinDOI">
              \<xs:selector xpath="./scl:DAI\|./scl:SDI" />
              \<xs:field xpath="@name" />
              \<xs:field xpath="@ix" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="Inputs" type="tInputs" minOccurs="0">
            \<xs:unique name="uniqueExtRefInInputs">
              \<xs:selector xpath="./scl:ExtRef" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@ldInst" />
              \<xs:field xpath="@prefix" />
              \<xs:field xpath="@lnClass" />
              \<xs:field xpath="@lnInst" />
              \<xs:field xpath="@doName" />
              \<xs:field xpath="@daName" />
              \<xs:field xpath="@intAddr" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="Log" type="tLog" minOccurs="0" maxOccurs="unbounded" />
        \</xs:sequence>
        \<xs:attribute name="lnType" type="tName" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tLN">
    \<xs:complexContent>
      \<xs:extension base="tAnyLN">
        \<xs:attribute name="prefix" default="" type="tPrefix" use="optional" />
        \<xs:attribute name="lnClass" type="tLNClassEnum" use="required" />
        \<xs:attribute name="inst" type="tLNInst" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tLN0">
    \<xs:complexContent>
      \<xs:extension base="tAnyLN">
        \<xs:sequence>
          \<xs:element name="GSEControl" type="tGSEControl" minOccurs="0" maxOccurs="unbounded" />
          \<xs:element name="SampledValueControl" type="tSampledValueControl" minOccurs="0" maxOccurs="unbounded" />
          \<xs:element name="SettingControl" type="tSettingControl" minOccurs="0" />
        \</xs:sequence>
        \<xs:attribute name="lnClass" fixed="LLN0" type="tLNClassEnum" use="required" />
        \<xs:attribute name="inst" fixed="" type="xs:normalizedString" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tDataSet">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:choice maxOccurs="unbounded">
          \<xs:element name="FCDA" type="tFCDA" />
        \</xs:choice>
        \<xs:attribute name="name" type="tDataSetName" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tFCDA">
    \<xs:attribute name="ldInst" type="tLDInst" use="optional" />
    \<xs:attribute name="prefix" default="" type="tPrefix" use="optional" />
    \<xs:attribute name="lnClass" type="tLNClassEnum" use="optional" />
    \<xs:attribute name="lnInst" type="tLNInst" use="optional" />
    \<xs:attribute name="doName" type="tFullDOName" use="optional" />
    \<xs:attribute name="daName" type="tFullAttributeName" use="optional" />
    \<xs:attribute name="fc" type="tFCEnum" use="required" />
    \<xs:attribute name="ix" type="xs:unsignedInt" use="optional" />
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tControl">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:attribute name="name" type="tCBName" use="required" />
        \<xs:attribute name="datSet" type="tDataSetName" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tControlWithTriggerOpt">
    \<xs:complexContent>
      \<xs:extension base="tControl">
        \<xs:sequence>
          \<xs:element name="TrgOps" type="tTrgOps" minOccurs="0" />
        \</xs:sequence>
        \<xs:attribute name="intgPd" default="0" type="xs:unsignedInt" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tTrgOps">
    \<xs:attribute name="dchg" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="qchg" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="dupd" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="period" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="gi" default="true" type="xs:boolean" use="optional" />
  \</xs:complexType>
  \<xs:complexType name="tReportControl">
    \<xs:complexContent>
      \<xs:extension base="tControlWithTriggerOpt">
        \<xs:sequence>
          \<xs:element name="OptFields">
            \<xs:complexType>
              \<xs:attributeGroup ref="agOptFields" />
            \</xs:complexType>
          \</xs:element>
          \<xs:element name="RptEnabled" type="tRptEnabled" minOccurs="0" />
        \</xs:sequence>
        \<xs:attribute name="rptID" type="tMessageID" use="optional" />
        \<xs:attribute name="confRev" type="xs:unsignedInt" use="required" />
        \<xs:attribute name="buffered" default="false" type="xs:boolean" use="optional" />
        \<xs:attribute name="bufTime" default="0" type="xs:unsignedInt" use="optional" />
        \<xs:attribute name="indexed" default="true" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tRptEnabled">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:sequence>
          \<xs:element name="ClientLN" type="tClientLN" minOccurs="0" maxOccurs="unbounded" />
        \</xs:sequence>
        \<xs:attribute name="max" default="1" type="xs:unsignedInt" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tClientLN">
    \<xs:attributeGroup ref="agLNRef" />
    \<xs:attribute name="apRef" type="tAccessPointName" use="optional" />
  \</xs:complexType>
  \<xs:complexType name="tLogControl">
    \<xs:complexContent>
      \<xs:extension base="tControlWithTriggerOpt">
        \<xs:attribute name="ldInst" type="tLDInst" use="optional" />
        \<xs:attribute name="prefix" default="" type="tPrefix" use="optional" />
        \<xs:attribute name="lnClass" default="LLN0" type="tLNClassEnum" use="optional" />
        \<xs:attribute name="lnInst" type="tLNInst" use="optional" />
        \<xs:attribute name="logName" type="tLogName" use="required" />
        \<xs:attribute name="logEna" default="true" type="xs:boolean" use="optional" />
        \<xs:attribute name="reasonCode" default="true" type="xs:boolean" use="optional" />
        \<xs:attribute name="bufTime" default="0" type="xs:unsignedInt" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tInputs">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:sequence>
          \<xs:element name="ExtRef" type="tExtRef" maxOccurs="unbounded" />
        \</xs:sequence>
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tExtRef">
    \<xs:attributeGroup ref="agDesc" />
    \<xs:attribute name="iedName" type="tIEDNameOrRelative" use="optional" />
    \<xs:attribute name="ldInst" type="tLDInst" use="optional" />
    \<xs:attribute name="prefix" type="tPrefix" use="optional" />
    \<xs:attribute name="lnClass" type="tLNClassEnum" use="optional" />
    \<xs:attribute name="lnInst" type="tLNInst" use="optional" />
    \<xs:attribute name="doName" type="tFullDOName" use="optional" />
    \<xs:attribute name="daName" type="tFullAttributeName" use="optional" />
    \<xs:attribute name="intAddr" type="xs:normalizedString" use="optional" />
    \<xs:attribute name="serviceType" type="tServiceType" use="optional" />
    \<xs:attribute name="srcLDInst" type="tLDInst" use="optional" />
    \<xs:attribute name="srcPrefix" type="tPrefix" use="optional" />
    \<xs:attribute name="srcLNClass" type="tLNClassEnum" use="optional" />
    \<xs:attribute name="srcLNInst" type="tLNInst" use="optional" />
    \<xs:attribute name="srcCBName" type="tCBName" use="optional" />
  \</xs:complexType>
  \<xs:complexType name="tLog">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:attribute name="name" type="tLogName" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tControlWithIEDName">
    \<xs:complexContent>
      \<xs:extension base="tControl">
        \<xs:sequence>
          \<xs:element name="IEDName" minOccurs="0" maxOccurs="unbounded">
            \<xs:complexType>
              \<xs:simpleContent>
                \<xs:extension base="tIEDName">
                  \<xs:attribute name="apRef" type="tAccessPointName" use="optional" />
                  \<xs:attribute name="ldInst" type="tLDInst" use="optional" />
                  \<xs:attribute name="prefix" type="tPrefix" use="optional" />
                  \<xs:attribute name="lnClass" type="tLNClassEnum" use="optional" />
                  \<xs:attribute name="lnInst" type="tLNInst" use="optional" />
                \</xs:extension>
              \</xs:simpleContent>
            \</xs:complexType>
          \</xs:element>
        \</xs:sequence>
        \<xs:attribute name="confRev" type="xs:unsignedInt" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tProtocol">
    \<xs:simpleContent>
      \<xs:extension base="xs:normalizedString">
        \<xs:attribute name="mustUnderstand" fixed="true" type="xs:boolean" use="required" />
      \</xs:extension>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tGSEControl">
    \<xs:complexContent>
      \<xs:extension base="tControlWithIEDName">
        \<xs:sequence>
          \<xs:element name="Protocol" type="tProtocol" minOccurs="0" fixed="R-GOOSE" />
        \</xs:sequence>
        \<xs:attribute name="type" default="GOOSE" type="tGSEControlTypeEnum" use="optional" />
        \<xs:attribute name="appID" type="tMessageID" use="required" />
        \<xs:attribute name="fixedOffs" default="false" type="xs:boolean" use="optional" />
        \<xs:attribute name="securityEnable" default="None" type="tPredefinedTypeOfSecurityEnum" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tSampledValueControl">
    \<xs:complexContent>
      \<xs:extension base="tControlWithIEDName">
        \<xs:sequence>
          \<xs:element name="SmvOpts">
            \<xs:complexType>
              \<xs:attributeGroup ref="agSmvOpts" />
            \</xs:complexType>
          \</xs:element>
          \<xs:element name="Protocol" type="tProtocol" minOccurs="0" fixed="R-SV" />
        \</xs:sequence>
        \<xs:attribute name="smvID" type="tMessageID" use="required" />
        \<xs:attribute name="multicast" default="true" type="xs:boolean" />
        \<xs:attribute name="smpRate" type="xs:unsignedInt" use="required" />
        \<xs:attribute name="nofASDU" type="xs:unsignedInt" use="required" />
        \<xs:attribute name="smpMod" default="SmpPerPeriod" type="tSmpMod" use="optional" />
        \<xs:attribute name="securityEnable" default="None" type="tPredefinedTypeOfSecurityEnum" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tSettingControl">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:attribute name="numOfSGs" use="required">
          \<xs:simpleType>
            \<xs:restriction base="xs:unsignedInt">
              \<xs:minInclusive value="1" />
            \</xs:restriction>
          \</xs:simpleType>
        \</xs:attribute>
        \<xs:attribute name="actSG" default="1" use="optional">
          \<xs:simpleType>
            \<xs:restriction base="xs:unsignedInt">
              \<xs:minInclusive value="1" />
            \</xs:restriction>
          \</xs:simpleType>
        \</xs:attribute>
        \<xs:attribute name="resvTms" type="xs:unsignedShort" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tDOI">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:choice minOccurs="0" maxOccurs="unbounded">
          \<xs:element name="SDI" type="tSDI">
            \<xs:unique name="uniqueSDI\_DAIinSDI">
              \<xs:selector xpath="./scl:DAI\|./scl:SDI" />
              \<xs:field xpath="@name" />
              \<xs:field xpath="@ix" />
            \</xs:unique>
          \</xs:element>
          \<xs:element name="DAI" type="tDAI" />
        \</xs:choice>
        \<xs:attribute name="name" type="tDataName" use="required" />
        \<xs:attribute name="ix" type="xs:unsignedInt" use="optional" />
        \<xs:attribute name="accessControl" type="xs:normalizedString" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tSDI">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:choice minOccurs="0" maxOccurs="unbounded">
          \<xs:element name="SDI" type="tSDI" />
          \<xs:element name="DAI" type="tDAI" />
        \</xs:choice>
        \<xs:attribute name="name" type="tAttributeNameEnum" use="required" />
        \<xs:attribute name="ix" type="xs:unsignedInt" use="optional" />
        \<xs:attribute name="sAddr" type="xs:normalizedString" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tDAI">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:sequence>
          \<xs:element name="Val" type="tVal" minOccurs="0" maxOccurs="unbounded" />
        \</xs:sequence>
        \<xs:attribute name="name" type="tAttributeNameEnum" use="required" />
        \<xs:attribute name="sAddr" type="xs:normalizedString" use="optional" />
        \<xs:attribute name="valKind" type="tValKindEnum" use="optional" />
        \<xs:attribute name="ix" type="xs:unsignedInt" use="optional" />
        \<xs:attribute name="valImport" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tServiceYesNo" />
  \<xs:complexType name="tServiceWithOptionalMax">
    \<xs:attribute name="max" type="xs:unsignedInt" use="optional" />
  \</xs:complexType>
  \<xs:complexType name="tServiceWithMax">
    \<xs:attribute name="max" type="xs:unsignedInt" use="required" />
  \</xs:complexType>
  \<xs:complexType name="tServiceWithMaxNonZero">
    \<xs:attribute name="max" use="required">
      \<xs:simpleType>
        \<xs:restriction base="xs:unsignedInt">
          \<xs:minExclusive value="0" />
        \</xs:restriction>
      \</xs:simpleType>
    \</xs:attribute>
  \</xs:complexType>
  \<xs:complexType name="tServiceConfReportControl">
    \<xs:complexContent>
      \<xs:extension base="tServiceWithMax">
        \<xs:attribute name="bufMode" use="optional">
          \<xs:simpleType>
            \<xs:restriction base="xs:Name">
              \<xs:enumeration value="unbuffered" />
              \<xs:enumeration value="buffered" />
              \<xs:enumeration value="both" />
            \</xs:restriction>
          \</xs:simpleType>
        \</xs:attribute>
        \<xs:attribute name="bufConf" default="false" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tServiceWithMaxAndMaxAttributes">
    \<xs:complexContent>
      \<xs:extension base="tServiceWithMax">
        \<xs:attribute name="maxAttributes" use="optional">
          \<xs:simpleType>
            \<xs:restriction base="xs:unsignedInt">
              \<xs:minExclusive value="0" />
            \</xs:restriction>
          \</xs:simpleType>
        \</xs:attribute>
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tServiceWithMaxAndModify">
    \<xs:complexContent>
      \<xs:extension base="tServiceWithMax">
        \<xs:attribute name="modify" default="true" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tServiceForConfDataSet">
    \<xs:complexContent>
      \<xs:extension base="tServiceWithMaxAndMaxAttributes">
        \<xs:attribute name="modify" default="true" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tClientServices">
    \<xs:sequence>
      \<xs:element name="TimeSyncProt" type="tTimeSyncProt" minOccurs="0" />
    \</xs:sequence>
    \<xs:attribute name="goose" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="gsse" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="bufReport" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="unbufReport" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="readLog" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="sv" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="supportsLdName" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="maxAttributes" use="optional">
      \<xs:simpleType>
        \<xs:restriction base="xs:unsignedInt" />
      \</xs:simpleType>
    \</xs:attribute>
    \<xs:attribute name="maxReports" use="optional">
      \<xs:simpleType>
        \<xs:restriction base="xs:unsignedInt" />
      \</xs:simpleType>
    \</xs:attribute>
    \<xs:attribute name="maxGOOSE" use="optional">
      \<xs:simpleType>
        \<xs:restriction base="xs:unsignedInt" />
      \</xs:simpleType>
    \</xs:attribute>
    \<xs:attribute name="maxSMV" use="optional">
      \<xs:simpleType>
        \<xs:restriction base="xs:unsignedInt" />
      \</xs:simpleType>
    \</xs:attribute>
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tServiceSettings">
    \<xs:attribute name="cbName" default="Fix" type="tServiceSettingsNoDynEnum" use="optional" />
    \<xs:attribute name="datSet" default="Fix" type="tServiceSettingsEnum" use="optional" />
  \</xs:complexType>
  \<xs:complexType name="tReportSettings">
    \<xs:complexContent>
      \<xs:extension base="tServiceSettings">
        \<xs:attribute name="rptID" default="Fix" type="tServiceSettingsEnum" use="optional" />
        \<xs:attribute name="optFields" default="Fix" type="tServiceSettingsEnum" use="optional" />
        \<xs:attribute name="bufTime" default="Fix" type="tServiceSettingsEnum" use="optional" />
        \<xs:attribute name="trgOps" default="Fix" type="tServiceSettingsEnum" use="optional" />
        \<xs:attribute name="intgPd" default="Fix" type="tServiceSettingsEnum" use="optional" />
        \<xs:attribute name="resvTms" default="false" type="xs:boolean" use="optional" />
        \<xs:attribute name="owner" default="false" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tLogSettings">
    \<xs:complexContent>
      \<xs:extension base="tServiceSettings">
        \<xs:attribute name="logEna" default="Fix" type="tServiceSettingsEnum" use="optional" />
        \<xs:attribute name="trgOps" default="Fix" type="tServiceSettingsEnum" use="optional" />
        \<xs:attribute name="intgPd" default="Fix" type="tServiceSettingsEnum" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tGSESettings">
    \<xs:complexContent>
      \<xs:extension base="tServiceSettings">
        \<xs:attribute name="appID" default="Fix" type="tServiceSettingsEnum" use="optional" />
        \<xs:attribute name="dataLabel" default="Fix" type="tServiceSettingsEnum" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tSMVSettings">
    \<xs:complexContent>
      \<xs:extension base="tServiceSettings">
        \<xs:choice maxOccurs="unbounded">
          \<xs:element name="SmpRate">
            \<xs:simpleType>
              \<xs:restriction base="xs:unsignedInt">
                \<xs:minExclusive value="0" />
              \</xs:restriction>
            \</xs:simpleType>
          \</xs:element>
          \<xs:element name="SamplesPerSec">
            \<xs:simpleType>
              \<xs:restriction base="xs:unsignedInt">
                \<xs:minExclusive value="0" />
              \</xs:restriction>
            \</xs:simpleType>
          \</xs:element>
          \<xs:element name="SecPerSamples">
            \<xs:simpleType>
              \<xs:restriction base="xs:unsignedInt">
                \<xs:minExclusive value="0" />
              \</xs:restriction>
            \</xs:simpleType>
          \</xs:element>
        \</xs:choice>
        \<xs:attribute name="svID" default="Fix" type="tServiceSettingsEnum" use="optional" />
        \<xs:attribute name="optFields" default="Fix" type="tServiceSettingsEnum" use="optional" />
        \<xs:attribute name="smpRate" default="Fix" type="tServiceSettingsEnum" use="optional" />
        \<xs:attribute name="samplesPerSec" default="false" type="xs:boolean" use="optional" />
        \<xs:attribute name="pdcTimeStamp" default="false" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tConfLNs">
    \<xs:attribute name="fixPrefix" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="fixLnInst" default="false" type="xs:boolean" use="optional" />
  \</xs:complexType>
  \<xs:complexType name="tValueHandling">
    \<xs:attribute name="setToRO" default="false" type="xs:boolean" use="optional" />
  \</xs:complexType>
  \<xs:complexType name="tFileHandling">
    \<xs:complexContent>
      \<xs:extension base="tServiceYesNo">
        \<xs:attribute name="mms" default="true" type="xs:boolean" use="optional" />
        \<xs:attribute name="ftp" default="false" type="xs:boolean" use="optional" />
        \<xs:attribute name="ftps" default="false" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tGOOSEcapabilities">
    \<xs:complexContent>
      \<xs:extension base="tServiceWithMax">
        \<xs:attribute name="fixedOffs" default="false" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tRedProt">
    \<xs:attribute name="hsr" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="prp" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="rstp" default="false" type="xs:boolean" use="optional" />
  \</xs:complexType>
  \<xs:complexType name="tTimeSyncProt">
    \<xs:complexContent>
      \<xs:extension base="tServiceYesNo">
        \<xs:attribute name="sntp" default="true" type="xs:boolean" use="optional" />
        \<xs:attribute name="c37\_238" default="false" type="xs:boolean" use="optional" />
        \<xs:attribute name="other" default="false" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tSMVsc">
    \<xs:complexContent>
      \<xs:extension base="tServiceWithMax">
        \<xs:attribute name="delivery" default="multicast" type="tSMVDeliveryEnum" use="optional" />
        \<xs:attribute name="deliveryConf" default="false" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tSupSubscription">
    \<xs:attribute name="maxGo" type="xs:unsignedInt" use="required" />
    \<xs:attribute name="maxSv" type="xs:unsignedInt" use="required" />
  \</xs:complexType>
  \<xs:complexType name="tCommProt">
    \<xs:complexContent>
      \<xs:extension base="tServiceYesNo">
        \<xs:attribute name="ipv6" default="false" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tKDC">
    \<xs:attribute name="iedName" type="tIEDName" use="required" />
    \<xs:attribute name="apName" type="tAccessPointName" use="required" />
  \</xs:complexType>
  \<xs:complexType name="tSettingGroups">
    \<xs:all>
      \<xs:element name="SGEdit" minOccurs="0">
        \<xs:complexType>
          \<xs:complexContent>
            \<xs:extension base="tServiceYesNo">
              \<xs:attribute name="resvTms" default="false" type="xs:boolean" use="optional" />
            \</xs:extension>
          \</xs:complexContent>
        \</xs:complexType>
      \</xs:element>
      \<xs:element name="ConfSG" minOccurs="0">
        \<xs:complexType>
          \<xs:complexContent>
            \<xs:extension base="tServiceYesNo">
              \<xs:attribute name="resvTms" default="false" type="xs:boolean" use="optional" />
            \</xs:extension>
          \</xs:complexContent>
        \</xs:complexType>
      \</xs:element>
    \</xs:all>
  \</xs:complexType>
  \<xs:element name="IED" type="tIED">
    \<xs:key name="LDeviceInIEDKey">
      \<xs:selector xpath="./scl:AccessPoint/scl:Server/scl:LDevice" />
      \<xs:field xpath="@inst" />
    \</xs:key>
    \<xs:keyref name="ref2LDeviceInDataSetForFCDAinLN" refer="LDeviceInIEDKey">
      \<xs:selector xpath="./scl:AccessPoint/scl:Server/scl:LDevice/scl:LN/scl:DataSet/scl:FCDA" />
      \<xs:field xpath="@ldInst" />
    \</xs:keyref>
    \<xs:keyref name="ref2LDeviceInDataSetForFCDAinLN0" refer="LDeviceInIEDKey">
      \<xs:selector xpath="./scl:AccessPoint/scl:Server/scl:LDevice/scl:LN0/scl:DataSet/scl:FCDA" />
      \<xs:field xpath="@ldInst" />
    \</xs:keyref>
    \<xs:key name="AccessPointInIEDKey">
      \<xs:selector xpath="./scl:AccessPoint" />
      \<xs:field xpath="@name" />
    \</xs:key>
    \<xs:keyref name="ServerAtRef2AccessPoint" refer="AccessPointInIEDKey">
      \<xs:selector xpath="./scl:AccessPoint/scl:ServerAt" />
      \<xs:field xpath="@apName" />
    \</xs:keyref>
  \</xs:element>
  \<!--Schema items added from SCL.2007B1.2014-07-18\SCL\_Communication.xsd-->
  \<xs:annotation>
    \<xs:documentation xml:lang="en">
			SCL schema version "2007" revision "B" release 1,  for IEC 61850-6 Ed. 2.1. Draft 2014-07-18.
			
			COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon.
		\</xs:documentation>
  \</xs:annotation>
  \<xs:complexType abstract="true" name="tControlBlock">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:sequence>
          \<xs:element name="Address" type="tAddress" minOccurs="0" />
        \</xs:sequence>
        \<xs:attribute name="ldInst" type="tLDInst" use="required" />
        \<xs:attribute name="cbName" type="tCBName" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tCommunication">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:sequence>
          \<xs:element name="SubNetwork" type="tSubNetwork" maxOccurs="unbounded">
            \<xs:unique name="uniqueConnectedAP">
              \<xs:selector xpath="./scl:ConnectedAP" />
              \<xs:field xpath="@iedName" />
              \<xs:field xpath="@apName" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tSubNetwork">
    \<xs:complexContent>
      \<xs:extension base="tNaming">
        \<xs:sequence>
          \<xs:element name="BitRate" type="tBitRateInMbPerSec" minOccurs="0" />
          \<xs:element name="ConnectedAP" type="tConnectedAP" maxOccurs="unbounded">
            \<xs:unique name="uniqueGSEinConnectedAP">
              \<xs:selector xpath="./scl:GSE" />
              \<xs:field xpath="@cbName" />
              \<xs:field xpath="@ldInst" />
            \</xs:unique>
            \<xs:unique name="uniqueSMVinConnectedAP">
              \<xs:selector xpath="./scl:SMV" />
              \<xs:field xpath="@cbName" />
              \<xs:field xpath="@ldInst" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
        \<xs:attribute name="type" type="xs:normalizedString" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tConnectedAP">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:sequence>
          \<xs:element name="Address" type="tAddress" minOccurs="0" />
          \<xs:element name="GSE" type="tGSE" minOccurs="0" maxOccurs="unbounded" />
          \<xs:element name="SMV" type="tSMV" minOccurs="0" maxOccurs="unbounded" />
          \<xs:element name="PhysConn" type="tPhysConn" minOccurs="0" maxOccurs="unbounded">
            \<xs:unique name="uniquePTypeInPhysConn">
              \<xs:selector xpath="./scl:P" />
              \<xs:field xpath="@type" />
            \</xs:unique>
          \</xs:element>
        \</xs:sequence>
        \<xs:attribute name="iedName" type="tIEDName" use="required" />
        \<xs:attribute name="apName" type="tAccessPointName" use="required" />
        \<xs:attribute name="redProt" type="tRedProtEnum" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tAddress">
    \<xs:sequence>
      \<xs:element name="P" type="tP" maxOccurs="unbounded" />
    \</xs:sequence>
  \</xs:complexType>
  \<xs:complexType name="tGSE">
    \<xs:complexContent>
      \<xs:extension base="tControlBlock">
        \<xs:sequence>
          \<xs:element name="MinTime" type="tDurationInMilliSec" minOccurs="0" />
          \<xs:element name="MaxTime" type="tDurationInMilliSec" minOccurs="0" />
        \</xs:sequence>
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tSMV">
    \<xs:complexContent>
      \<xs:extension base="tControlBlock" />
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tPhysConn">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:sequence>
          \<xs:element name="P" type="tP\_PhysConn" minOccurs="0" maxOccurs="unbounded" />
        \</xs:sequence>
        \<xs:attribute name="type" type="tPhysConnTypeEnum" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_PhysConn">
    \<xs:simpleContent>
      \<xs:extension base="tPAddr">
        \<xs:attribute name="type" type="tPTypePhysConnEnum" use="required" />
      \</xs:extension>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP">
    \<xs:simpleContent>
      \<xs:extension base="tPAddr">
        \<xs:attribute name="type" type="tPTypeEnum" use="required" />
      \</xs:extension>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tP\_IPbase">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:pattern id="IPv4" value="([0-9]{1,2}\|1[0-9]{2}\|2[0-4][0-9]\|25[0-5])\.([0-9]{1,2}\|1[0-9]{2}\|2[0-4][0-9]\|25[0-5])\.([0-9]{1,2}\|1[0-9]{2}\|2[0-4][0-9]\|25[0-5])\.([0-9]{1,2}\|1[0-9]{2}\|2[0-4][0-9]\|25[0-5])" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_IP">
    \<xs:simpleContent>
      \<xs:restriction base="tP\_IPbase">
        \<xs:attribute name="type" fixed="IP" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_IP-SUBNET">
    \<xs:simpleContent>
      \<xs:restriction base="tP\_IPbase">
        \<xs:attribute name="type" fixed="IP-SUBNET" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_IP-GATEWAY">
    \<xs:simpleContent>
      \<xs:restriction base="tP\_IPbase">
        \<xs:attribute name="type" fixed="IP-GATEWAY" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tP\_IPv6base">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:pattern id="IPv6" value="([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_IPv6">
    \<xs:simpleContent>
      \<xs:restriction base="tP\_IPv6base">
        \<xs:attribute name="type" fixed="IPv6" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_IPv6-SUBNET">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:pattern id="IPv6\_Subnet" value="/[1-9]\|/[1-9][0-9]\|/1[0-1][0-9]\|/12[0-7]" />
        \<xs:attribute name="type" fixed="IPv6-SUBNET" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_IPv6-GATEWAY">
    \<xs:simpleContent>
      \<xs:restriction base="tP\_IPv6base">
        \<xs:attribute name="type" fixed="IPv6-GATEWAY" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_DNSName">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:pattern value="\S*" />
        \<xs:attribute name="type" fixed="DNSName" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_IPv6FlowLabel">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:pattern value="[0-9a-fA-F]{1,5}" />
        \<xs:attribute name="type" fixed="IPv6FlowLabel" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_OSI-NSAP">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:maxLength value="40" />
        \<xs:pattern value="[0-9A-F]+" />
        \<xs:attribute name="type" fixed="OSI-NSAP" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_OSI-TSEL">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:maxLength value="8" />
        \<xs:pattern value="[0-9A-F]+" />
        \<xs:attribute name="type" fixed="OSI-TSEL" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_OSI-SSEL">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:maxLength value="16" />
        \<xs:pattern value="[0-9A-F]+" />
        \<xs:attribute name="type" fixed="OSI-SSEL" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_OSI-PSEL">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:maxLength value="16" />
        \<xs:pattern value="[0-9A-F]+" />
        \<xs:attribute name="type" fixed="OSI-PSEL" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_OSI-AP-Title">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:pattern value="[0-9,]+" />
        \<xs:attribute name="type" fixed="OSI-AP-Title" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_OSI-AP-Invoke">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:maxLength value="5" />
        \<xs:pattern value="[0-9]+" />
        \<xs:attribute name="type" fixed="OSI-AP-Invoke" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_OSI-AE-Qualifier">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:maxLength value="5" />
        \<xs:pattern value="[0-9]+" />
        \<xs:attribute name="type" fixed="OSI-AE-Qualifier" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_OSI-AE-Invoke">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:maxLength value="5" />
        \<xs:pattern value="[0-9]+" />
        \<xs:attribute name="type" fixed="OSI-AE-Invoke" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_MAC-Address">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:pattern value="[0-9A-F]{2}\-[0-9A-F]{2}\-[0-9A-F]{2}\-[0-9A-F]{2}\-[0-9A-F]{2}\-[0-9A-F]{2}" />
        \<xs:attribute name="type" fixed="MAC-Address" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_APPID">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:pattern value="[0-9A-F]{4}" />
        \<xs:attribute name="type" fixed="APPID" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_VLAN-PRIORITY">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:pattern value="[0-7]" />
        \<xs:attribute name="type" fixed="VLAN-PRIORITY" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_VLAN-ID">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:pattern value="[0-9A-F]{3}" />
        \<xs:attribute name="type" fixed="VLAN-ID" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType abstract="true" name="tP\_Port">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:pattern value="0" />
        \<xs:pattern value="[1-9][0-9]{0,3}" />
        \<xs:pattern value="[1-5][0-9]{4,4}" />
        \<xs:pattern value="6[0-4][0-9]{3,3}" />
        \<xs:pattern value="65[0-4][0-9]{2,2}" />
        \<xs:pattern value="655[0-2][0-9]" />
        \<xs:pattern value="6553[0-5]" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_SNTP-Port">
    \<xs:simpleContent>
      \<xs:restriction base="tP\_Port">
        \<xs:attribute name="type" fixed="SNTP-Port" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_MMS-Port">
    \<xs:simpleContent>
      \<xs:restriction base="tP\_Port">
        \<xs:attribute name="type" fixed="MMS-Port" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_UDP-Port">
    \<xs:simpleContent>
      \<xs:restriction base="tP\_Port">
        \<xs:attribute name="type" fixed="IP-UDP-PORT" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_TCP-Port">
    \<xs:simpleContent>
      \<xs:restriction base="tP\_Port">
        \<xs:attribute name="type" fixed="IP-TCP-PORT" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_IPv6ClassOfTraffic">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:pattern id="Values0-255" value="[0-9]\|[1-9][0-9]\|1[0-9]{2}\|2[0-4][0-9]\|25[0-5]" />
        \<xs:attribute name="type" fixed="IPv6ClassOfTraffic" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tP\_C37-118-IP-Port">
    \<xs:simpleContent>
      \<xs:restriction base="tP">
        \<xs:pattern id="Values1025-65535" value="102[5-9]\|10[3-9][0-9]\|1[1-9][0-9][0-9]\|[2-9][0-9]{3}\|[1-5][0-9]{4}\|6[0-4][0-9]{3}\|65[0-4][0-9]{2}\|655[0-2][0-9]\|6553[0-5]" />
        \<xs:attribute name="type" fixed="C37-118-IP-Port" type="tPTypeEnum" use="required" />
      \</xs:restriction>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:element name="Communication" type="tCommunication">
    \<xs:unique name="uniqueSubNetwork">
      \<xs:selector xpath="./scl:SubNetwork" />
      \<xs:field xpath="@name" />
    \</xs:unique>
  \</xs:element>
  \<!--Schema items added from SCL.2007B1.2014-07-18\SCL\_DataTypeTemplates.xsd-->
  \<xs:annotation>
    \<xs:documentation xml:lang="en">
			SCL schema version "2007" revision "B" release 1,  for IEC 61850-6 Ed. 2.1. Draft 2014-07-18.
			
			COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon.
		\</xs:documentation>
  \</xs:annotation>
  \<xs:attributeGroup name="agDATrgOp">
    \<xs:attribute name="dchg" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="qchg" default="false" type="xs:boolean" use="optional" />
    \<xs:attribute name="dupd" default="false" type="xs:boolean" use="optional" />
  \</xs:attributeGroup>
  \<xs:complexType abstract="true" name="tAbstractDataAttribute">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:sequence>
          \<xs:element name="Val" type="tVal" minOccurs="0" maxOccurs="unbounded" />
        \</xs:sequence>
        \<xs:attribute name="name" type="tAttributeNameEnum" use="required" />
        \<xs:attribute name="sAddr" type="xs:normalizedString" use="optional" />
        \<xs:attribute name="bType" type="tBasicTypeEnum" use="required" />
        \<xs:attribute name="valKind" default="Set" type="tValKindEnum" use="optional" />
        \<xs:attribute name="type" type="tAnyName" use="optional" />
        \<xs:attribute name="count" default="0" type="tDACount" use="optional" />
        \<xs:attribute name="valImport" default="false" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tLNodeType">
    \<xs:complexContent>
      \<xs:extension base="tIDNaming">
        \<xs:sequence>
          \<xs:element name="DO" type="tDO" maxOccurs="unbounded" />
        \</xs:sequence>
        \<xs:attribute name="iedType" default="" type="tAnyName" use="optional" />
        \<xs:attribute name="lnClass" type="tLNClassEnum" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tDO">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:attribute name="name" type="tDataName" use="required" />
        \<xs:attribute name="type" type="tName" use="required" />
        \<xs:attribute name="accessControl" type="xs:normalizedString" use="optional" />
        \<xs:attribute name="transient" default="false" type="xs:boolean" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tDOType">
    \<xs:complexContent>
      \<xs:extension base="tIDNaming">
        \<xs:choice minOccurs="0" maxOccurs="unbounded">
          \<xs:element name="SDO" type="tSDO" />
          \<xs:element name="DA" type="tDA">
            \<xs:unique name="uniqueProtNsInDA">
              \<xs:selector xpath="scl:ProtNs" />
              \<xs:field xpath="@type" />
              \<xs:field xpath="." />
            \</xs:unique>
          \</xs:element>
        \</xs:choice>
        \<xs:attribute name="iedType" default="" type="tAnyName" use="optional" />
        \<xs:attribute name="cdc" type="tCDCEnum" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tSDO">
    \<xs:complexContent>
      \<xs:extension base="tUnNaming">
        \<xs:attribute name="name" type="tSubDataName" use="required" />
        \<xs:attribute name="type" type="tName" use="required" />
        \<xs:attribute name="count" default="0" type="tSDOCount" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tDA">
    \<xs:complexContent>
      \<xs:extension base="tAbstractDataAttribute">
        \<xs:sequence>
          \<xs:element name="ProtNs" type="tProtNs" minOccurs="0" maxOccurs="unbounded" />
        \</xs:sequence>
        \<xs:attributeGroup ref="agDATrgOp" />
        \<xs:attribute name="fc" type="tFCEnum" use="required" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tDAType">
    \<xs:complexContent>
      \<xs:extension base="tIDNaming">
        \<xs:sequence>
          \<xs:element name="BDA" type="tBDA" maxOccurs="unbounded" />
          \<xs:element name="ProtNs" type="tProtNs" minOccurs="0" maxOccurs="unbounded" />
        \</xs:sequence>
        \<xs:attribute name="iedType" default="" type="tAnyName" use="optional" />
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tBDA">
    \<xs:complexContent>
      \<xs:extension base="tAbstractDataAttribute" />
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tEnumType">
    \<xs:complexContent>
      \<xs:extension base="tIDNaming">
        \<xs:sequence>
          \<xs:element name="EnumVal" type="tEnumVal" maxOccurs="unbounded" />
        \</xs:sequence>
      \</xs:extension>
    \</xs:complexContent>
  \</xs:complexType>
  \<xs:complexType name="tProtNs">
    \<xs:simpleContent>
      \<xs:extension base="tNamespaceName">
        \<xs:attribute name="type" default="8-MMS" use="optional">
          \<xs:simpleType>
            \<xs:restriction base="xs:normalizedString">
              \<xs:minLength value="1" />
            \</xs:restriction>
          \</xs:simpleType>
        \</xs:attribute>
      \</xs:extension>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tEnumVal">
    \<xs:simpleContent>
      \<xs:extension base="xs:normalizedString">
        \<xs:attribute name="ord" type="xs:int" use="required" />
        \<xs:attributeGroup ref="agDesc" />
      \</xs:extension>
    \</xs:simpleContent>
  \</xs:complexType>
  \<xs:complexType name="tDataTypeTemplates">
    \<xs:sequence>
      \<xs:element name="LNodeType" type="tLNodeType" maxOccurs="unbounded">
        \<xs:unique name="uniqueDOInLNodeType">
          \<xs:selector xpath="scl:DO" />
          \<xs:field xpath="@name" />
        \</xs:unique>
      \</xs:element>
      \<xs:element name="DOType" type="tDOType" maxOccurs="unbounded">
        \<xs:unique name="uniqueDAorSDOInDOType">
          \<xs:selector xpath="./*" />
          \<xs:field xpath="@name" />
        \</xs:unique>
      \</xs:element>
      \<xs:element name="DAType" type="tDAType" minOccurs="0" maxOccurs="unbounded">
        \<xs:unique name="uniqueBDAInDAType">
          \<xs:selector xpath="scl:BDA" />
          \<xs:field xpath="@name" />
        \</xs:unique>
        \<xs:unique name="uniqueProtNs">
          \<xs:selector xpath="scl:ProtNs" />
          \<xs:field xpath="@type" />
          \<xs:field xpath="." />
        \</xs:unique>
      \</xs:element>
      \<xs:element name="EnumType" type="tEnumType" minOccurs="0" maxOccurs="unbounded">
        \<xs:unique name="uniqueOrdInEnumType">
          \<xs:selector xpath="scl:EnumVal" />
          \<xs:field xpath="@ord" />
        \</xs:unique>
        \<xs:unique name="uniqueEnumValue">
          \<xs:selector xpath="scl:EnumVal" />
          \<xs:field xpath="." />
        \</xs:unique>
      \</xs:element>
    \</xs:sequence>
  \</xs:complexType>
  \<xs:element name="DataTypeTemplates" type="tDataTypeTemplates">
    \<xs:unique name="uniqueLNodeType">
      \<xs:selector xpath="scl:LNodeType" />
      \<xs:field xpath="@id" />
    \</xs:unique>
    \<xs:key name="DOTypeKey">
      \<xs:selector xpath="scl:DOType" />
      \<xs:field xpath="@id" />
    \</xs:key>
    \<xs:keyref name="ref2DOType" refer="DOTypeKey">
      \<xs:selector xpath="scl:LNodeType/scl:DO" />
      \<xs:field xpath="@type" />
    \</xs:keyref>
    \<xs:keyref name="ref2DOTypeForSDO" refer="DOTypeKey">
      \<xs:selector xpath="scl:DOType/scl:SDO" />
      \<xs:field xpath="@type" />
    \</xs:keyref>
    \<xs:key name="DATypeKey">
      \<xs:selector xpath="scl:DAType" />
      \<xs:field xpath="@id" />
    \</xs:key>
    \<xs:key name="EnumTypeKey">
      \<xs:selector xpath="scl:EnumType" />
      \<xs:field xpath="@id" />
    \</xs:key>
  \</xs:element>
\</xs:schema>\" = \`\<?xml version="1.0" encoding="utf-8" ?>\<xs:schema xmlns:scl="http://www.iec.ch/61850/2003/SCL" xmlns="http://www.iec.ch/61850/2003/SCL" elementFormDefault="qualified" targetNamespace="http://www.iec.ch/61850/2003/SCL" xmlns:xs="http://www.w3.org/2001/XMLSchema"> \<xs:annotation> \<xs:documentation xml:lang="en"> SCL schema version "2007" revision "B" release 1, for IEC 61850-6 Ed. 2.1. Draft 2014-07-18. COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon. Implemented Ed. 2 Tissues: 658, 668, 687, 768, 779, 789, 804, 806, 807, 822, 824, 845, 853, 855, 856, 857, 886, 936, 1175, 1189, 1208. Tissues not relevant for the SCL schema: 660, 661 (Ed.3), 663, 678, 699, 700, 705, 706 (Ed.3), 718, 719, 721, 731, 733, 752, 769, 787, 788, 815, 823, 825, 837, 847, 865, 873, 883, 884, 885, 901, 914, 915, 918, 927 (Ed.3), 930, 938, 949, 961, 1048, 1054, 1059, 1118, 1130, 1131, 1147, 1161, 1168, 1170 (Ed.3), 1173, 1188, 1195, 1200, 1204, 1207, 1221, 1224, 1241 (Ed.3), 1255, 1257 (Ed.3), 1284. \</xs:documentation> \</xs:annotation> \<xs:element name="SCL"> \<xs:complexType> \<xs:complexContent> \<xs:extension base="tBaseElement"> \<xs:sequence> \<xs:element name="Header" type="tHeader"> \<xs:unique name="uniqueHitem"> \<xs:selector xpath="./scl:History/scl:Hitem" /> \<xs:field xpath="@version" /> \<xs:field xpath="@revision" /> \</xs:unique> \</xs:element> \<xs:element ref="Substation" minOccurs="0" maxOccurs="unbounded" /> \<xs:element ref="Communication" minOccurs="0" /> \<xs:element ref="IED" minOccurs="0" maxOccurs="unbounded" /> \<xs:element ref="DataTypeTemplates" minOccurs="0" /> \<xs:element ref="Line" minOccurs="0" maxOccurs="unbounded" /> \<xs:element ref="Process" minOccurs="0" maxOccurs="unbounded" /> \</xs:sequence> \<xs:attribute name="version" fixed="2007" type="tSclVersion" use="required" /> \<xs:attribute name="revision" fixed="B" type="tSclRevision" use="required" /> \<xs:attribute name="release" fixed="1" type="tSclRelease" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:key name="SubstationKey"> \<xs:selector xpath="./scl:Substation\|./scl:Process\|./scl:Line" /> \<xs:field xpath="@name" /> \</xs:key> \<xs:key name="IEDKey"> \<xs:selector xpath="./scl:IED" /> \<xs:field xpath="@name" /> \</xs:key> \<xs:key name="LNodeTypeKey"> \<xs:selector xpath="./scl:DataTypeTemplates/scl:LNodeType" /> \<xs:field xpath="@id" /> \<xs:field xpath="@lnClass" /> \</xs:key> \<xs:keyref name="ref2LNodeTypeDomain1" refer="LNodeTypeKey"> \<xs:selector xpath="./scl:IED/scl:AccessPoint/scl:LN" /> \<xs:field xpath="@lnType" /> \<xs:field xpath="@lnClass" /> \</xs:keyref> \<xs:keyref name="ref2LNodeTypeDomain2" refer="LNodeTypeKey"> \<xs:selector xpath="./scl:IED/scl:AccessPoint/scl:Server/scl:LDevice/scl:LN" /> \<xs:field xpath="@lnType" /> \<xs:field xpath="@lnClass" /> \</xs:keyref> \<xs:keyref name="ref2LNodeTypeLLN0" refer="LNodeTypeKey"> \<xs:selector xpath="./scl:IED/scl:AccessPoint/scl:Server/scl:LDevice/scl:LN0" /> \<xs:field xpath="@lnType" /> \<xs:field xpath="@lnClass" /> \</xs:keyref> \<xs:keyref name="refConnectedAP2IED" refer="IEDKey"> \<xs:selector xpath="./scl:Communication/scl:SubNetwork/scl:ConnectedAP" /> \<xs:field xpath="@iedName" /> \</xs:keyref> \<xs:keyref name="ref2SubstationFromTerminal" refer="SubstationKey"> \<xs:selector xpath=".//scl:Terminal" /> \<xs:field xpath="@substationName" /> \</xs:keyref> \<xs:key name="ConnectivityNodeKey"> \<xs:selector xpath=".//scl:ConnectivityNode" /> \<xs:field xpath="@pathName" /> \</xs:key> \</xs:element> \<!--Schema items added from SCL.2007B1.2014-07-18\\SCL\_Substation.xsd--> \<xs:annotation> \<xs:documentation xml:lang="en"> SCL schema version "2007" revision "B" release 1, for IEC 61850-6 Ed. 2.1. Draft 2014-07-18. COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon. \</xs:documentation> \</xs:annotation> \<xs:attributeGroup name="agVirtual"> \<xs:attribute name="virtual" default="false" type="xs:boolean" use="optional" /> \</xs:attributeGroup> \<xs:complexType abstract="true" name="tLNodeContainer"> \<xs:complexContent> \<xs:extension base="tNaming"> \<xs:sequence> \<xs:element name="LNode" type="tLNode" minOccurs="0" maxOccurs="unbounded" /> \</xs:sequence> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType abstract="true" name="tPowerSystemResource"> \<xs:complexContent> \<xs:extension base="tLNodeContainer" /> \</xs:complexContent> \</xs:complexType> \<xs:complexType abstract="true" name="tEquipmentContainer"> \<xs:complexContent> \<xs:extension base="tPowerSystemResource"> \<xs:sequence> \<xs:element name="PowerTransformer" type="tPowerTransformer" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInPowerTransformer"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInPTR"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="GeneralEquipment" type="tGeneralEquipment" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInGeneralEquipment"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInGE"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType abstract="true" name="tEquipment"> \<xs:complexContent> \<xs:extension base="tPowerSystemResource"> \<xs:attributeGroup ref="agVirtual" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType abstract="true" name="tAbstractConductingEquipment"> \<xs:complexContent> \<xs:extension base="tEquipment"> \<xs:sequence> \<xs:element name="Terminal" type="tTerminal" minOccurs="0" maxOccurs="2" /> \<xs:element name="SubEquipment" type="tSubEquipment" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInSubEquipment"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInACESubEquipment"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tConductingEquipment"> \<xs:complexContent> \<xs:extension base="tAbstractConductingEquipment"> \<xs:sequence> \<xs:element name="EqFunction" type="tEqFunction" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInFuncForCE"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInFuncForCE"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \<xs:attribute name="type" type="tCommonConductingEquipmentEnum" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tSubEquipment"> \<xs:complexContent> \<xs:extension base="tPowerSystemResource"> \<xs:sequence> \<xs:element name="EqFunction" type="tEqFunction" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInFuncForSubEq"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInFuncForSubEq"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \<xs:attribute name="phase" default="none" type="tPhaseEnum" use="optional" /> \<xs:attributeGroup ref="agVirtual" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tPowerTransformer"> \<xs:complexContent> \<xs:extension base="tEquipment"> \<xs:sequence> \<xs:element name="TransformerWinding" type="tTransformerWinding" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInTransformerWinding"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInPTW"> \<xs:selector xpath="./scl:SubEquipment\|./scl:TapChanger\|./scl:EqFunction" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="SubEquipment" type="tSubEquipment" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInSubEquipmentPTR"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInPTRSubEquipment"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="EqFunction" type="tEqFunction" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInFuncForPTR"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInFuncForPTR"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \<xs:attribute name="type" fixed="PTR" type="tPowerTransformerEnum" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tTransformerWinding"> \<xs:complexContent> \<xs:extension base="tAbstractConductingEquipment"> \<xs:sequence> \<xs:element name="TapChanger" type="tTapChanger" minOccurs="0"> \<xs:unique name="uniqueLNodeInTapChanger"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInLTC"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="NeutralPoint" type="tTerminal" minOccurs="0" /> \<xs:element name="EqFunction" type="tEqFunction" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInFuncForPTW"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInFuncForPTW"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \<xs:attribute name="type" fixed="PTW" type="tTransformerWindingEnum" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tTapChanger"> \<xs:complexContent> \<xs:extension base="tPowerSystemResource"> \<xs:sequence> \<xs:element name="SubEquipment" type="tSubEquipment" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInSubEquipmentLTC"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInLTCSubEquipment"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="EqFunction" type="tEqFunction" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInFuncForLTC"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInFuncForLTC"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \<xs:attribute name="type" fixed="LTC" type="xs:Name" use="required" /> \<xs:attributeGroup ref="agVirtual" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tGeneralEquipment"> \<xs:complexContent> \<xs:extension base="tEquipment"> \<xs:sequence> \<xs:element name="EqFunction" type="tEqFunction" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInFuncForGE"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInFuncForGE"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \<xs:attribute name="type" type="tGeneralEquipmentEnum" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tSubstation"> \<xs:complexContent> \<xs:extension base="tEquipmentContainer"> \<xs:sequence> \<xs:element name="VoltageLevel" type="tVoltageLevel" maxOccurs="unbounded"> \<xs:unique name="uniqueChildNameInVoltageLevel"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:unique name="uniqueLNodeInVoltageLevel"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \</xs:element> \<xs:element name="Function" type="tFunction" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInFunctionSS"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInSubstationFunc"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tVoltageLevel"> \<xs:complexContent> \<xs:extension base="tEquipmentContainer"> \<xs:sequence> \<xs:element name="Voltage" type="tVoltage" minOccurs="0" /> \<xs:element name="Bay" type="tBay" maxOccurs="unbounded"> \<xs:unique name="uniqueChildNameInBay"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:unique name="uniqueLNodeInBay"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \</xs:element> \<xs:element name="Function" type="tFunction" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInFunctionVL"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInVoltageLevelFunc"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \<xs:attribute name="nomFreq" use="optional"> \<xs:simpleType> \<xs:restriction base="xs:decimal"> \<xs:minInclusive value="0" /> \</xs:restriction> \</xs:simpleType> \</xs:attribute> \<xs:attribute name="numPhases" use="optional"> \<xs:simpleType> \<xs:restriction base="xs:unsignedByte"> \<xs:minExclusive value="0" /> \</xs:restriction> \</xs:simpleType> \</xs:attribute> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tBay"> \<xs:complexContent> \<xs:extension base="tEquipmentContainer"> \<xs:sequence> \<xs:element name="ConductingEquipment" type="tConductingEquipment" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInConductingEquipment"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInCE"> \<xs:selector xpath="./scl:SubEquipment\|./scl:EqFunction" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="ConnectivityNode" type="tConnectivityNode" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInConnectivityNode"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \</xs:element> \<xs:element name="Function" type="tFunction" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInFunctionB"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInBayFunc"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tLNode"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:attribute name="iedName" default="None" type="tIEDName" use="optional" /> \<xs:attribute name="ldInst" default="" type="tLDInstOrEmpty" use="optional" /> \<xs:attribute name="prefix" default="" type="tPrefix" use="optional" /> \<xs:attribute name="lnClass" type="tLNClassEnum" use="required" /> \<xs:attribute name="lnInst" default="" type="tLNInstOrEmpty" use="optional" /> \<xs:attribute name="lnType" type="tName" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tFunction"> \<xs:complexContent> \<xs:extension base="tPowerSystemResource"> \<xs:sequence> \<xs:element name="SubFunction" type="tSubFunction" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInSubFunction"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInSubFunc"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="GeneralEquipment" type="tGeneralEquipment" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInGeneralEquipmentOfFunction"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInGEFunc"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="ConductingEquipment" type="tConductingEquipment" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInConductingEquipmentOfFunction"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInCondEq"> \<xs:selector xpath="./scl:SubEquipment\|./scl:EqFunction" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \<xs:attribute name="type" type="xs:normalizedString" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tSubFunction"> \<xs:complexContent> \<xs:extension base="tPowerSystemResource"> \<xs:sequence> \<xs:element name="GeneralEquipment" type="tGeneralEquipment" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInGeneralEquipmentOfSubFunction"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInGESubFunc"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="ConductingEquipment" type="tConductingEquipment" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInConductingEquipmentOfSubFunction"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueSubEquipmentSubFunc"> \<xs:selector xpath="./scl:SubEquipment" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="SubFunction" type="tSubFunction" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInSubSubFunction"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueSubSubFunc"> \<xs:selector xpath="./scl:SubFunction" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \<xs:attribute name="type" type="xs:normalizedString" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType abstract="true" name="tAbstractEqFuncSubFunc"> \<xs:complexContent> \<xs:extension base="tPowerSystemResource"> \<xs:sequence> \<xs:element name="GeneralEquipment" type="tGeneralEquipment" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInGeneralEquipmentOfFuncForEquipment"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInGEFuncForEquipment"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="EqSubFunction" type="tEqSubFunction" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInSubFuncForEquipment"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueSubFuncForEquipment"> \<xs:selector xpath="./scl:EqSubFunction" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \<xs:attribute name="type" type="xs:normalizedString" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tEqFunction"> \<xs:complexContent> \<xs:extension base="tAbstractEqFuncSubFunc" /> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tEqSubFunction"> \<xs:complexContent> \<xs:extension base="tAbstractEqFuncSubFunc" /> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tConnectivityNode"> \<xs:complexContent> \<xs:extension base="tLNodeContainer"> \<xs:attribute name="pathName" type="tRef" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tTerminal"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:attribute name="name" default="" type="tAnyName" use="optional" /> \<xs:attribute name="connectivityNode" type="tRef" use="required" /> \<xs:attribute name="processName" type="tProcessName" use="optional" /> \<xs:attribute name="substationName" type="tName" use="required" /> \<xs:attribute name="voltageLevelName" type="tName" use="required" /> \<xs:attribute name="bayName" type="tName" use="required" /> \<xs:attribute name="cNodeName" type="tName" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType abstract="true" name="tGeneralEquipmentContainer"> \<xs:complexContent> \<xs:extension base="tPowerSystemResource"> \<xs:sequence> \<xs:element name="GeneralEquipment" type="tGeneralEquipment" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInGeneralEquipment2"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInGE2"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="Function" type="tFunction" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueLNodeInFunction"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \<xs:unique name="uniqueChildNameInFunction"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \</xs:sequence> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tLine"> \<xs:complexContent> \<xs:extension base="tGeneralEquipmentContainer"> \<xs:sequence> \<xs:element name="ConductingEquipment" type="tConductingEquipment" maxOccurs="unbounded" /> \<xs:element name="ConnectivityNode" type="tConnectivityNode" minOccurs="0" maxOccurs="unbounded" /> \</xs:sequence> \<xs:attribute name="type" type="tLineType" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tProcess"> \<xs:complexContent> \<xs:extension base="tGeneralEquipmentContainer"> \<xs:sequence> \<xs:element name="ConductingEquipment" type="tConductingEquipment" minOccurs="0" maxOccurs="unbounded" /> \<xs:element name="Substation" type="tSubstation" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueChildNameInProcessSubstation"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:unique name="uniqueLNodeInProcessSubstation"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \</xs:element> \<xs:element name="Line" type="tLine" minOccurs="0" maxOccurs="unbounded" /> \<xs:element name="Process" type="tProcess" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueChildNameInSubProcess"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:unique name="uniqueLNodeInSubProcess"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \</xs:element> \</xs:sequence> \<xs:attribute name="type" type="tProcessType" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:element name="Substation" type="tSubstation"> \<xs:unique name="uniqueChildNameInSubstation"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:unique name="uniqueLNodeInSubstation"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \</xs:element> \<xs:element name="Process" type="tProcess"> \<xs:unique name="uniqueChildNameInProcess"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:unique name="uniqueLNodeInProcess"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \</xs:element> \<xs:element name="Line" type="tLine"> \<xs:unique name="uniqueChildNameInLine"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:unique name="uniqueLNodeInLine"> \<xs:selector xpath="./scl:LNode" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \</xs:unique> \</xs:element> \<!--Schema items added from SCL.2007B1.2014-07-18\\SCL\_BaseTypes.xsd--> \<xs:annotation> \<xs:documentation xml:lang="en"> SCL schema version "2007" revision "B" release 1, for IEC 61850-6 Ed. 2.1. Draft 2014-07-18. COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon. \</xs:documentation> \</xs:annotation> \<xs:attributeGroup name="agDesc"> \<xs:attribute name="desc" default="" type="xs:normalizedString" use="optional" /> \</xs:attributeGroup> \<xs:complexType abstract="true" name="tBaseElement"> \<xs:sequence> \<xs:any minOccurs="0" maxOccurs="unbounded" namespace="##other" processContents="lax" /> \<xs:element name="Text" type="tText" minOccurs="0" /> \<xs:element name="Private" type="tPrivate" minOccurs="0" maxOccurs="unbounded" /> \</xs:sequence> \<xs:anyAttribute namespace="##other" processContents="lax" /> \</xs:complexType> \<xs:complexType abstract="true" name="tUnNaming"> \<xs:complexContent> \<xs:extension base="tBaseElement"> \<xs:attributeGroup ref="agDesc" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType abstract="true" name="tNaming"> \<xs:complexContent> \<xs:extension base="tBaseElement"> \<xs:attribute name="name" type="tName" use="required" /> \<xs:attributeGroup ref="agDesc" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType abstract="true" name="tIDNaming"> \<xs:complexContent> \<xs:extension base="tBaseElement"> \<xs:attribute name="id" type="tName" use="required" /> \<xs:attributeGroup ref="agDesc" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType abstract="true" mixed="true" name="tAnyContentFromOtherNamespace"> \<xs:sequence minOccurs="0" maxOccurs="unbounded"> \<xs:any namespace="##other" processContents="lax" /> \</xs:sequence> \<xs:anyAttribute namespace="##other" processContents="lax" /> \</xs:complexType> \<xs:complexType mixed="true" name="tText"> \<xs:complexContent> \<xs:extension base="tAnyContentFromOtherNamespace"> \<xs:attribute name="source" type="xs:anyURI" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType mixed="true" name="tPrivate"> \<xs:complexContent> \<xs:extension base="tAnyContentFromOtherNamespace"> \<xs:attribute name="type" use="required"> \<xs:simpleType> \<xs:restriction base="xs:normalizedString"> \<xs:minLength value="1" /> \</xs:restriction> \</xs:simpleType> \</xs:attribute> \<xs:attribute name="source" type="xs:anyURI" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tHeader"> \<xs:sequence> \<xs:element name="Text" type="tText" minOccurs="0" /> \<xs:element name="History" minOccurs="0"> \<xs:complexType> \<xs:sequence> \<xs:element name="Hitem" type="tHitem" maxOccurs="unbounded" /> \</xs:sequence> \</xs:complexType> \</xs:element> \</xs:sequence> \<xs:attribute name="id" type="xs:normalizedString" use="required" /> \<xs:attribute name="version" type="xs:normalizedString" use="optional" /> \<xs:attribute name="revision" default="" type="xs:normalizedString" use="optional" /> \<xs:attribute name="toolID" type="xs:normalizedString" use="optional" /> \<xs:attribute name="nameStructure" default="IEDName" use="optional"> \<xs:simpleType> \<xs:restriction base="xs:Name"> \<xs:enumeration value="IEDName" /> \</xs:restriction> \</xs:simpleType> \</xs:attribute> \</xs:complexType> \<xs:complexType mixed="true" name="tHitem"> \<xs:complexContent> \<xs:extension base="tAnyContentFromOtherNamespace"> \<xs:attribute name="version" type="xs:normalizedString" use="required" /> \<xs:attribute name="revision" type="xs:normalizedString" use="required" /> \<xs:attribute name="when" type="xs:normalizedString" use="required" /> \<xs:attribute name="who" type="xs:normalizedString" /> \<xs:attribute name="what" type="xs:normalizedString" /> \<xs:attribute name="why" type="xs:normalizedString" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tVal"> \<xs:simpleContent> \<xs:extension base="xs:normalizedString"> \<xs:attribute name="sGroup" type="xs:unsignedInt" use="optional" /> \</xs:extension> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tValueWithUnit"> \<xs:simpleContent> \<xs:extension base="xs:decimal"> \<xs:attribute name="unit" type="xs:token" use="required" /> \<xs:attribute name="multiplier" default="" type="tUnitMultiplierEnum" use="optional" /> \</xs:extension> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tVoltage"> \<xs:simpleContent> \<xs:restriction base="tValueWithUnit"> \<xs:attribute name="unit" fixed="V" type="xs:token" use="required" /> \<xs:attribute name="multiplier" default="" type="tUnitMultiplierEnum" use="optional" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tDurationInSec"> \<xs:simpleContent> \<xs:restriction base="tValueWithUnit"> \<xs:attribute name="unit" fixed="s" type="xs:token" use="required" /> \<xs:attribute name="multiplier" default="" type="tUnitMultiplierEnum" use="optional" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tDurationInMilliSec"> \<xs:simpleContent> \<xs:extension base="xs:decimal"> \<xs:attribute name="unit" fixed="s" type="xs:token" use="optional" /> \<xs:attribute name="multiplier" fixed="m" type="tUnitMultiplierEnum" use="optional" /> \</xs:extension> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tBitRateInMbPerSec"> \<xs:simpleContent> \<xs:extension base="xs:decimal"> \<xs:attribute name="unit" fixed="b/s" type="xs:normalizedString" use="optional" /> \<xs:attribute name="multiplier" fixed="M" type="tUnitMultiplierEnum" use="optional" /> \</xs:extension> \</xs:simpleContent> \</xs:complexType> \<!--Schema items added from SCL.2007B1.2014-07-18\\SCL\_Enums.xsd--> \<xs:annotation> \<xs:documentation xml:lang="en"> SCL schema version "2007" revision "B" release 1, for IEC 61850-6 Ed. 2.1. Draft 2014-07-18. COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon. \</xs:documentation> \</xs:annotation> \<xs:simpleType name="tPredefinedPTypeEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="IP" /> \<xs:enumeration value="IP-SUBNET" /> \<xs:enumeration value="IP-GATEWAY" /> \<xs:enumeration value="OSI-NSAP" /> \<xs:enumeration value="OSI-TSEL" /> \<xs:enumeration value="OSI-SSEL" /> \<xs:enumeration value="OSI-PSEL" /> \<xs:enumeration value="OSI-AP-Title" /> \<xs:enumeration value="OSI-AP-Invoke" /> \<xs:enumeration value="OSI-AE-Qualifier" /> \<xs:enumeration value="OSI-AE-Invoke" /> \<xs:enumeration value="MAC-Address" /> \<xs:enumeration value="APPID" /> \<xs:enumeration value="VLAN-PRIORITY" /> \<xs:enumeration value="VLAN-ID" /> \<xs:enumeration value="SNTP-Port" /> \<xs:enumeration value="MMS-Port" /> \<xs:enumeration value="DNSName" /> \<xs:enumeration value="IPv6FlowLabel" /> \<xs:enumeration value="IPv6ClassOfTraffic" /> \<xs:enumeration value="C37-118-IP-Port" /> \<xs:enumeration value="IP-UDP-PORT" /> \<xs:enumeration value="IP-TCP-PORT" /> \<xs:enumeration value="IPv6" /> \<xs:enumeration value="IPv6-SUBNET" /> \<xs:enumeration value="IPv6-GATEWAY" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tExtensionPTypeEnum"> \<xs:restriction base="xs:normalizedString"> \<xs:pattern value="[A-Z][0-9A-Za-z\\-]*" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tPTypeEnum"> \<xs:union memberTypes="tPredefinedPTypeEnum tExtensionPTypeEnum" /> \</xs:simpleType> \<xs:simpleType name="tPredefinedPTypePhysConnEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="Type" /> \<xs:enumeration value="Plug" /> \<xs:enumeration value="Cable" /> \<xs:enumeration value="Port" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tPTypePhysConnEnum"> \<xs:union memberTypes="tPredefinedPTypePhysConnEnum tExtensionPTypeEnum" /> \</xs:simpleType> \<xs:simpleType name="tPredefinedAttributeNameEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="T" /> \<xs:enumeration value="Test" /> \<xs:enumeration value="Check" /> \<xs:enumeration value="SIUnit" /> \<xs:enumeration value="Oper" /> \<xs:enumeration value="SBO" /> \<xs:enumeration value="SBOw" /> \<xs:enumeration value="Cancel" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tExtensionAttributeNameEnum"> \<xs:restriction base="tRestrName1stL"> \<xs:maxLength value="60" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tAttributeNameEnum"> \<xs:union memberTypes="tPredefinedAttributeNameEnum tExtensionAttributeNameEnum" /> \</xs:simpleType> \<xs:simpleType name="tPredefinedCommonConductingEquipmentEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="CBR" /> \<xs:enumeration value="DIS" /> \<xs:enumeration value="VTR" /> \<xs:enumeration value="CTR" /> \<xs:enumeration value="GEN" /> \<xs:enumeration value="CAP" /> \<xs:enumeration value="REA" /> \<xs:enumeration value="CON" /> \<xs:enumeration value="MOT" /> \<xs:enumeration value="EFN" /> \<xs:enumeration value="PSH" /> \<xs:enumeration value="BAT" /> \<xs:enumeration value="BSH" /> \<xs:enumeration value="CAB" /> \<xs:enumeration value="GIL" /> \<xs:enumeration value="LIN" /> \<xs:enumeration value="RES" /> \<xs:enumeration value="RRC" /> \<xs:enumeration value="SAR" /> \<xs:enumeration value="TCF" /> \<xs:enumeration value="TCR" /> \<xs:enumeration value="IFL" /> \<xs:enumeration value="FAN" /> \<xs:enumeration value="SCR" /> \<xs:enumeration value="SMC" /> \<xs:enumeration value="PMP" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tExtensionEquipmentEnum"> \<xs:restriction base="xs:Name"> \<xs:minLength value="3" /> \<xs:pattern value="E[A-Z]*" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tCommonConductingEquipmentEnum"> \<xs:union memberTypes="tPredefinedCommonConductingEquipmentEnum tExtensionEquipmentEnum" /> \</xs:simpleType> \<xs:simpleType name="tPowerTransformerEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="PTR" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tTransformerWindingEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="PTW" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tPredefinedGeneralEquipmentEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="AXN" /> \<xs:enumeration value="BAT" /> \<xs:enumeration value="MOT" /> \<xs:enumeration value="FAN" /> \<xs:enumeration value="FIL" /> \<xs:enumeration value="PMP" /> \<xs:enumeration value="TNK" /> \<xs:enumeration value="VLV" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tExtensionGeneralEquipmentEnum"> \<xs:restriction base="xs:Name"> \<xs:minLength value="3" /> \<xs:pattern value="E[A-Z]*" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tGeneralEquipmentEnum"> \<xs:union memberTypes="tPredefinedGeneralEquipmentEnum tExtensionGeneralEquipmentEnum" /> \</xs:simpleType> \<xs:simpleType name="tServiceSettingsNoDynEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="Conf" /> \<xs:enumeration value="Fix" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tServiceSettingsEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="Dyn" /> \<xs:enumeration value="Conf" /> \<xs:enumeration value="Fix" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tRedProtEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="none" /> \<xs:enumeration value="hsr" /> \<xs:enumeration value="prp" /> \<xs:enumeration value="rstp" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tSMVDeliveryEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="unicast" /> \<xs:enumeration value="multicast" /> \<xs:enumeration value="both" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tPhaseEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="A" /> \<xs:enumeration value="B" /> \<xs:enumeration value="C" /> \<xs:enumeration value="N" /> \<xs:enumeration value="all" /> \<xs:enumeration value="none" /> \<xs:enumeration value="AB" /> \<xs:enumeration value="BC" /> \<xs:enumeration value="CA" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tAuthenticationEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="none" /> \<xs:enumeration value="password" /> \<xs:enumeration value="weak" /> \<xs:enumeration value="strong" /> \<xs:enumeration value="certificate" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tAssociationKindEnum"> \<xs:restriction base="xs:token"> \<xs:enumeration value="pre-established" /> \<xs:enumeration value="predefined" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tLPHDEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="LPHD" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tLLN0Enum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="LLN0" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tSystemLNGroupEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="L[A-Z]*" /> \<xs:pattern value="LLN0" /> \<xs:enumeration value="LLN0" /> \<xs:enumeration value="LPHD" /> \<xs:enumeration value="LCCH" /> \<xs:enumeration value="LGOS" /> \<xs:enumeration value="LSVS" /> \<xs:enumeration value="LTIM" /> \<xs:enumeration value="LTMS" /> \<xs:enumeration value="LTRK" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupAEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="A[A-Z]*" /> \<xs:enumeration value="ANCR" /> \<xs:enumeration value="ARCO" /> \<xs:enumeration value="ARIS" /> \<xs:enumeration value="ATCC" /> \<xs:enumeration value="AVCO" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupCEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="C[A-Z]*" /> \<xs:enumeration value="CALH" /> \<xs:enumeration value="CCGR" /> \<xs:enumeration value="CILO" /> \<xs:enumeration value="CPOW" /> \<xs:enumeration value="CSWI" /> \<xs:enumeration value="CSYN" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupFEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="F[A-Z]*" /> \<xs:enumeration value="FCNT" /> \<xs:enumeration value="FCSD" /> \<xs:enumeration value="FFIL" /> \<xs:enumeration value="FLIM" /> \<xs:enumeration value="FPID" /> \<xs:enumeration value="FRMP" /> \<xs:enumeration value="FSPT" /> \<xs:enumeration value="FXOT" /> \<xs:enumeration value="FXUT" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupGEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="G[A-Z]*" /> \<xs:enumeration value="GAPC" /> \<xs:enumeration value="GGIO" /> \<xs:enumeration value="GLOG" /> \<xs:enumeration value="GSAL" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupIEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="I[A-Z]*" /> \<xs:enumeration value="IARC" /> \<xs:enumeration value="IHMI" /> \<xs:enumeration value="ISAF" /> \<xs:enumeration value="ITCI" /> \<xs:enumeration value="ITMI" /> \<xs:enumeration value="ITPC" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupKEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="K[A-Z]*" /> \<xs:enumeration value="KFAN" /> \<xs:enumeration value="KFIL" /> \<xs:enumeration value="KPMP" /> \<xs:enumeration value="KTNK" /> \<xs:enumeration value="KVLV" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupMEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="M[A-Z]*" /> \<xs:enumeration value="MDIF" /> \<xs:enumeration value="MENV" /> \<xs:enumeration value="MFLK" /> \<xs:enumeration value="MHAI" /> \<xs:enumeration value="MHAN" /> \<xs:enumeration value="MHYD" /> \<xs:enumeration value="MMDC" /> \<xs:enumeration value="MMET" /> \<xs:enumeration value="MMTN" /> \<xs:enumeration value="MMTR" /> \<xs:enumeration value="MMXN" /> \<xs:enumeration value="MMXU" /> \<xs:enumeration value="MSQI" /> \<xs:enumeration value="MSTA" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupPEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="P[A-Z]*" /> \<xs:enumeration value="PDIF" /> \<xs:enumeration value="PDIR" /> \<xs:enumeration value="PDIS" /> \<xs:enumeration value="PDOP" /> \<xs:enumeration value="PDUP" /> \<xs:enumeration value="PFRC" /> \<xs:enumeration value="PHAR" /> \<xs:enumeration value="PHIZ" /> \<xs:enumeration value="PIOC" /> \<xs:enumeration value="PMRI" /> \<xs:enumeration value="PMSS" /> \<xs:enumeration value="POPF" /> \<xs:enumeration value="PPAM" /> \<xs:enumeration value="PRTR" /> \<xs:enumeration value="PSCH" /> \<xs:enumeration value="PSDE" /> \<xs:enumeration value="PTEF" /> \<xs:enumeration value="PTHF" /> \<xs:enumeration value="PTOC" /> \<xs:enumeration value="PTOF" /> \<xs:enumeration value="PTOV" /> \<xs:enumeration value="PTRC" /> \<xs:enumeration value="PTTR" /> \<xs:enumeration value="PTUC" /> \<xs:enumeration value="PTUF" /> \<xs:enumeration value="PTUV" /> \<xs:enumeration value="PUPF" /> \<xs:enumeration value="PVOC" /> \<xs:enumeration value="PVPH" /> \<xs:enumeration value="PZSU" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupQEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="Q[A-Z]*" /> \<xs:enumeration value="QFVR" /> \<xs:enumeration value="QITR" /> \<xs:enumeration value="QIUB" /> \<xs:enumeration value="QVTR" /> \<xs:enumeration value="QVUB" /> \<xs:enumeration value="QVVR" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupREnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="R[A-Z]*" /> \<xs:enumeration value="RADR" /> \<xs:enumeration value="RBDR" /> \<xs:enumeration value="RBRF" /> \<xs:enumeration value="RDIR" /> \<xs:enumeration value="RDRE" /> \<xs:enumeration value="RDRS" /> \<xs:enumeration value="RFLO" /> \<xs:enumeration value="RMXU" /> \<xs:enumeration value="RPSB" /> \<xs:enumeration value="RREC" /> \<xs:enumeration value="RSYN" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupSEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="S[A-Z]*" /> \<xs:enumeration value="SARC" /> \<xs:enumeration value="SCBR" /> \<xs:enumeration value="SIMG" /> \<xs:enumeration value="SIML" /> \<xs:enumeration value="SLTC" /> \<xs:enumeration value="SOPM" /> \<xs:enumeration value="SPDC" /> \<xs:enumeration value="SPTR" /> \<xs:enumeration value="SSWI" /> \<xs:enumeration value="STMP" /> \<xs:enumeration value="SVBR" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupTEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="T[A-Z]*" /> \<xs:enumeration value="TANG" /> \<xs:enumeration value="TAXD" /> \<xs:enumeration value="TCTR" /> \<xs:enumeration value="TDST" /> \<xs:enumeration value="TFLW" /> \<xs:enumeration value="TFRQ" /> \<xs:enumeration value="TGSN" /> \<xs:enumeration value="THUM" /> \<xs:enumeration value="TLVL" /> \<xs:enumeration value="TMGF" /> \<xs:enumeration value="TMVM" /> \<xs:enumeration value="TPOS" /> \<xs:enumeration value="TPRS" /> \<xs:enumeration value="TRTN" /> \<xs:enumeration value="TSND" /> \<xs:enumeration value="TTMP" /> \<xs:enumeration value="TTNS" /> \<xs:enumeration value="TVBR" /> \<xs:enumeration value="TVTR" /> \<xs:enumeration value="TWPH" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupXEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="X[A-Z]*" /> \<xs:enumeration value="XCBR" /> \<xs:enumeration value="XSWI" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupYEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="Y[A-Z]*" /> \<xs:enumeration value="YEFN" /> \<xs:enumeration value="YLTC" /> \<xs:enumeration value="YPSH" /> \<xs:enumeration value="YPTR" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNGroupZEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="Z[A-Z]*" /> \<xs:enumeration value="ZAXN" /> \<xs:enumeration value="ZBAT" /> \<xs:enumeration value="ZBSH" /> \<xs:enumeration value="ZCAB" /> \<xs:enumeration value="ZCAP" /> \<xs:enumeration value="ZCON" /> \<xs:enumeration value="ZGEN" /> \<xs:enumeration value="ZGIL" /> \<xs:enumeration value="ZLIN" /> \<xs:enumeration value="ZMOT" /> \<xs:enumeration value="ZREA" /> \<xs:enumeration value="ZRES" /> \<xs:enumeration value="ZRRC" /> \<xs:enumeration value="ZSAR" /> \<xs:enumeration value="ZSCR" /> \<xs:enumeration value="ZSMC" /> \<xs:enumeration value="ZTCF" /> \<xs:enumeration value="ZTCR" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDomainLNEnum"> \<xs:union memberTypes="tDomainLNGroupAEnum tDomainLNGroupCEnum tDomainLNGroupFEnum tDomainLNGroupGEnum tDomainLNGroupIEnum tDomainLNGroupKEnum tDomainLNGroupMEnum tDomainLNGroupPEnum tDomainLNGroupQEnum tDomainLNGroupREnum tDomainLNGroupSEnum tDomainLNGroupTEnum tDomainLNGroupXEnum tDomainLNGroupYEnum tDomainLNGroupZEnum" /> \</xs:simpleType> \<xs:simpleType name="tPredefinedLNClassEnum"> \<xs:union memberTypes="tSystemLNGroupEnum tDomainLNEnum" /> \</xs:simpleType> \<xs:simpleType name="tExtensionLNClassEnum"> \<xs:restriction base="xs:Name"> \<xs:length value="4" /> \<xs:pattern value="[A-Z]+" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tLNClassEnum"> \<xs:union memberTypes="tPredefinedLNClassEnum tExtensionLNClassEnum" /> \</xs:simpleType> \<xs:simpleType name="tPredefinedCDCEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="SPS" /> \<xs:enumeration value="DPS" /> \<xs:enumeration value="INS" /> \<xs:enumeration value="ENS" /> \<xs:enumeration value="ACT" /> \<xs:enumeration value="ACD" /> \<xs:enumeration value="SEC" /> \<xs:enumeration value="BCR" /> \<xs:enumeration value="HST" /> \<xs:enumeration value="VSS" /> \<xs:enumeration value="MV" /> \<xs:enumeration value="CMV" /> \<xs:enumeration value="SAV" /> \<xs:enumeration value="WYE" /> \<xs:enumeration value="DEL" /> \<xs:enumeration value="SEQ" /> \<xs:enumeration value="HMV" /> \<xs:enumeration value="HWYE" /> \<xs:enumeration value="HDEL" /> \<xs:enumeration value="SPC" /> \<xs:enumeration value="DPC" /> \<xs:enumeration value="INC" /> \<xs:enumeration value="ENC" /> \<xs:enumeration value="BSC" /> \<xs:enumeration value="ISC" /> \<xs:enumeration value="APC" /> \<xs:enumeration value="BAC" /> \<xs:enumeration value="SPG" /> \<xs:enumeration value="ING" /> \<xs:enumeration value="ENG" /> \<xs:enumeration value="ORG" /> \<xs:enumeration value="TSG" /> \<xs:enumeration value="CUG" /> \<xs:enumeration value="VSG" /> \<xs:enumeration value="ASG" /> \<xs:enumeration value="CURVE" /> \<xs:enumeration value="CSG" /> \<xs:enumeration value="DPL" /> \<xs:enumeration value="LPL" /> \<xs:enumeration value="CSD" /> \<xs:enumeration value="CST" /> \<xs:enumeration value="BTS" /> \<xs:enumeration value="UTS" /> \<xs:enumeration value="LTS" /> \<xs:enumeration value="GTS" /> \<xs:enumeration value="MTS" /> \<xs:enumeration value="NTS" /> \<xs:enumeration value="STS" /> \<xs:enumeration value="CTS" /> \<xs:enumeration value="OTS" /> \<xs:enumeration value="VSD" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tExtensionCDCEnum"> \<xs:restriction base="xs:Name"> \<xs:minLength value="1" /> \<xs:maxLength value="5" /> \<xs:pattern value="[A-Za-z]+" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tCDCEnum"> \<xs:restriction base="tPredefinedCDCEnum" /> \</xs:simpleType> \<xs:simpleType name="tFCEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="ST" /> \<xs:enumeration value="MX" /> \<xs:enumeration value="CO" /> \<xs:enumeration value="SP" /> \<xs:enumeration value="SG" /> \<xs:enumeration value="SE" /> \<xs:enumeration value="SV" /> \<xs:enumeration value="CF" /> \<xs:enumeration value="DC" /> \<xs:enumeration value="EX" /> \<xs:enumeration value="SR" /> \<xs:enumeration value="BL" /> \<xs:enumeration value="OR" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tPredefinedBasicTypeEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="BOOLEAN" /> \<xs:enumeration value="INT8" /> \<xs:enumeration value="INT16" /> \<xs:enumeration value="INT24" /> \<xs:enumeration value="INT32" /> \<xs:enumeration value="INT64" /> \<xs:enumeration value="INT128" /> \<xs:enumeration value="INT8U" /> \<xs:enumeration value="INT16U" /> \<xs:enumeration value="INT24U" /> \<xs:enumeration value="INT32U" /> \<xs:enumeration value="FLOAT32" /> \<xs:enumeration value="FLOAT64" /> \<xs:enumeration value="Enum" /> \<xs:enumeration value="Dbpos" /> \<xs:enumeration value="Tcmd" /> \<xs:enumeration value="Quality" /> \<xs:enumeration value="Timestamp" /> \<xs:enumeration value="VisString32" /> \<xs:enumeration value="VisString64" /> \<xs:enumeration value="VisString65" /> \<xs:enumeration value="VisString129" /> \<xs:enumeration value="VisString255" /> \<xs:enumeration value="Octet64" /> \<xs:enumeration value="Unicode255" /> \<xs:enumeration value="Struct" /> \<xs:enumeration value="EntryTime" /> \<xs:enumeration value="Check" /> \<xs:enumeration value="ObjRef" /> \<xs:enumeration value="Currency" /> \<xs:enumeration value="PhyComAddr" /> \<xs:enumeration value="TrgOps" /> \<xs:enumeration value="OptFlds" /> \<xs:enumeration value="SvOptFlds" /> \<xs:enumeration value="EntryID" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tBasicTypeEnum"> \<xs:restriction base="tPredefinedBasicTypeEnum" /> \</xs:simpleType> \<xs:simpleType name="tValKindEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="Spec" /> \<xs:enumeration value="Conf" /> \<xs:enumeration value="RO" /> \<xs:enumeration value="Set" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tGSEControlTypeEnum"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="GSSE" /> \<xs:enumeration value="GOOSE" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tUnitMultiplierEnum"> \<xs:restriction base="xs:normalizedString"> \<xs:enumeration value="" /> \<xs:enumeration value="m" /> \<xs:enumeration value="k" /> \<xs:enumeration value="M" /> \<xs:enumeration value="mu" /> \<xs:enumeration value="y" /> \<xs:enumeration value="z" /> \<xs:enumeration value="a" /> \<xs:enumeration value="f" /> \<xs:enumeration value="p" /> \<xs:enumeration value="n" /> \<xs:enumeration value="c" /> \<xs:enumeration value="d" /> \<xs:enumeration value="da" /> \<xs:enumeration value="h" /> \<xs:enumeration value="G" /> \<xs:enumeration value="T" /> \<xs:enumeration value="P" /> \<xs:enumeration value="E" /> \<xs:enumeration value="Z" /> \<xs:enumeration value="Y" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tRightEnum"> \<xs:restriction base="xs:normalizedString"> \<xs:enumeration value="full" /> \<xs:enumeration value="fix" /> \<xs:enumeration value="dataflow" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tSDOCount"> \<xs:union memberTypes="xs:unsignedInt tRestrName1stL" /> \</xs:simpleType> \<xs:simpleType name="tDACount"> \<xs:union memberTypes="xs:unsignedInt tAttributeNameEnum" /> \</xs:simpleType> \<xs:simpleType name="tSmpMod"> \<xs:restriction base="xs:normalizedString"> \<xs:enumeration value="SmpPerPeriod" /> \<xs:enumeration value="SmpPerSec" /> \<xs:enumeration value="SecPerSmp" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tPredefinedPhysConnTypeEnum"> \<xs:restriction base="xs:normalizedString"> \<xs:enumeration value="Connection" /> \<xs:enumeration value="RedConn" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tExtensionPhysConnTypeEnum"> \<xs:restriction base="xs:normalizedString"> \<xs:pattern value="[A-Z][0-9A-Za-z\\-]*" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tPhysConnTypeEnum"> \<xs:union memberTypes="tPredefinedPhysConnTypeEnum tExtensionPhysConnTypeEnum" /> \</xs:simpleType> \<xs:simpleType name="tServiceType"> \<xs:restriction base="xs:Name"> \<xs:enumeration value="Poll" /> \<xs:enumeration value="Report" /> \<xs:enumeration value="GOOSE" /> \<xs:enumeration value="SMV" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tPredefinedTypeOfSecurityEnum"> \<xs:restriction base="xs:normalizedString"> \<xs:enumeration value="None" /> \<xs:enumeration value="Signature" /> \<xs:enumeration value="SignatureAndEncryption" /> \</xs:restriction> \</xs:simpleType> \<!--Schema items added from SCL.2007B1.2014-07-18\\SCL\_BaseSimpleTypes.xsd--> \<xs:annotation> \<xs:documentation xml:lang="en"> SCL schema version "2007" revision "B" release 1, for IEC 61850-6 Ed. 2.1. Draft 2014-07-18. COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon. \</xs:documentation> \</xs:annotation> \<xs:simpleType name="tRef"> \<xs:restriction base="xs:normalizedString"> \<xs:pattern value=".+/.+/.+/.+(/.+)*" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tAnyName"> \<xs:restriction base="xs:normalizedString" /> \</xs:simpleType> \<xs:simpleType name="tName"> \<xs:restriction base="tAnyName"> \<xs:minLength value="1" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tAcsiName"> \<xs:restriction base="xs:Name"> \<xs:pattern value="[A-Za-z][0-9A-Za-z\_]*" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tRestrName1stU"> \<xs:restriction base="xs:Name"> \<xs:pattern value="[A-Z][0-9A-Za-z]*" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tRestrName1stL"> \<xs:restriction base="xs:Name"> \<xs:pattern value="[a-z][0-9A-Za-z]*" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tPAddr"> \<xs:restriction base="xs:normalizedString"> \<xs:minLength value="1" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tSclVersion"> \<xs:restriction base="tName"> \<xs:pattern value="2[0-2][0-9]{2}" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tSclRevision"> \<xs:restriction base="xs:Name"> \<xs:pattern value="[A-Z]" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tSclRelease"> \<xs:restriction base="xs:unsignedByte"> \<xs:minExclusive value="0" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tEmpty"> \<xs:restriction base="xs:normalizedString"> \<xs:maxLength value="0" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tIEDName"> \<xs:restriction base="tAcsiName"> \<xs:maxLength value="64" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tOnlyRelativeIEDName"> \<xs:restriction base="xs:normalizedString"> \<xs:pattern value="@" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tIEDNameOrRelative"> \<xs:union memberTypes="tIEDName tOnlyRelativeIEDName" /> \</xs:simpleType> \<xs:simpleType name="tLDName"> \<xs:restriction base="xs:normalizedString"> \<xs:maxLength value="64" /> \<xs:pattern value="[A-Za-z][0-9A-Za-z\_]*" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tLDInst"> \<xs:restriction base="xs:normalizedString"> \<xs:maxLength value="64" /> \<xs:pattern value="[A-Za-z0-9][0-9A-Za-z\_]*" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tLDInstOrEmpty"> \<xs:union memberTypes="tLDInst tEmpty" /> \</xs:simpleType> \<xs:simpleType name="tPrefix"> \<xs:restriction base="xs:normalizedString"> \<xs:maxLength value="11" /> \<xs:pattern value="[A-Za-z][0-9A-Za-z\_]*" /> \<xs:pattern value="" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tLNInst"> \<xs:restriction base="xs:normalizedString"> \<xs:pattern value="[0-9]{1,12}" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tLNInstOrEmpty"> \<xs:union memberTypes="tLNInst tEmpty" /> \</xs:simpleType> \<xs:simpleType name="tDataName"> \<xs:restriction base="tRestrName1stU"> \<xs:maxLength value="12" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tDataSetName"> \<xs:restriction base="tAcsiName"> \<xs:maxLength value="32" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tCBName"> \<xs:restriction base="tAcsiName"> \<xs:maxLength value="32" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tLogName"> \<xs:restriction base="tAcsiName"> \<xs:maxLength value="32" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tAccessPointName"> \<xs:restriction base="xs:normalizedString"> \<xs:pattern value="[A-Za-z0-9][0-9A-Za-z\_]*" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tAssociationID"> \<xs:restriction base="xs:normalizedString"> \<xs:minLength value="1" /> \<xs:pattern value="[0-9A-Za-z]+" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tVisibleBasicLatin"> \<xs:restriction base="xs:normalizedString"> \<xs:pattern value="[ -~]*" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tMessageID"> \<xs:restriction base="tVisibleBasicLatin"> \<xs:minLength value="1" /> \<xs:maxLength value="129" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tFullAttributeName"> \<xs:restriction base="xs:normalizedString"> \<xs:pattern value="[a-zA-Z][a-zA-Z0-9]*(\\([0-9]+\\))?(\\.[a-zA-Z][a-zA-Z0-9]*(\\([0-9]+\\))?)*" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tFullDOName"> \<xs:restriction base="xs:normalizedString"> \<xs:pattern value="[A-Z][0-9A-Za-z]{0,11}(\\.[a-z][0-9A-Za-z]*(\\([0-9]+\\))?)?" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tSubDataName"> \<xs:restriction base="tRestrName1stL"> \<xs:minLength value="1" /> \<xs:maxLength value="60" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tNamespaceName"> \<xs:restriction base="xs:normalizedString"> \<xs:pattern value="[ -~]+:20\\d\\d[A-Z]?" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tLineType"> \<xs:restriction base="xs:normalizedString"> \<xs:minLength value="1" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tProcessType"> \<xs:restriction base="xs:normalizedString"> \<xs:minLength value="1" /> \</xs:restriction> \</xs:simpleType> \<xs:simpleType name="tProcessName"> \<xs:restriction base="xs:normalizedString"> \<xs:pattern value=".+(/.+)*" /> \</xs:restriction> \</xs:simpleType> \<!--Schema items added from SCL.2007B1.2014-07-18\\SCL\_IED.xsd--> \<xs:annotation> \<xs:documentation xml:lang="en"> SCL schema version "2007" revision "B" release 1, for IEC 61850-6 Ed. 2.1. Draft 2014-07-18. COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon. \</xs:documentation> \</xs:annotation> \<xs:attributeGroup name="agAuthentication"> \<xs:attribute name="none" default="true" type="xs:boolean" use="optional" /> \<xs:attribute name="password" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="weak" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="strong" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="certificate" default="false" type="xs:boolean" use="optional" /> \</xs:attributeGroup> \<xs:attributeGroup name="agSmvOpts"> \<xs:attribute name="refreshTime" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="sampleSynchronized" fixed="true" type="xs:boolean" use="optional" /> \<xs:attribute name="sampleRate" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="dataSet" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="security" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="timestamp" default="false" type="xs:boolean" use="optional" /> \</xs:attributeGroup> \<xs:attributeGroup name="agOptFields"> \<xs:attribute name="seqNum" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="timeStamp" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="dataSet" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="reasonCode" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="dataRef" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="entryID" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="configRef" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="bufOvfl" default="true" type="xs:boolean" use="optional" /> \</xs:attributeGroup> \<xs:attributeGroup name="agLDRef"> \<xs:attributeGroup ref="agDesc" /> \<xs:attribute name="iedName" type="tIEDName" use="required" /> \<xs:attribute name="ldInst" type="tLDInst" use="required" /> \</xs:attributeGroup> \<xs:attributeGroup name="agLNRef"> \<xs:attributeGroup ref="agLDRef" /> \<xs:attribute name="prefix" default="" type="tPrefix" use="optional" /> \<xs:attribute name="lnClass" type="tLNClassEnum" use="required" /> \<xs:attribute name="lnInst" type="tLNInstOrEmpty" use="required" /> \</xs:attributeGroup> \<xs:complexType name="tIED"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:sequence> \<xs:element name="Services" type="tServices" minOccurs="0" /> \<xs:element name="AccessPoint" type="tAccessPoint" maxOccurs="unbounded"> \<xs:unique name="uniqueLNInAccessPoint"> \<xs:selector xpath="./scl:LN" /> \<xs:field xpath="@inst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@prefix" /> \</xs:unique> \</xs:element> \<xs:element name="KDC" type="tKDC" minOccurs="0" maxOccurs="unbounded" /> \</xs:sequence> \<xs:attribute name="name" type="tIEDName" use="required" /> \<xs:attribute name="type" type="xs:normalizedString" use="optional" /> \<xs:attribute name="manufacturer" type="xs:normalizedString" use="optional" /> \<xs:attribute name="configVersion" type="xs:normalizedString" use="optional" /> \<xs:attribute name="originalSclVersion" type="tSclVersion" use="optional" /> \<xs:attribute name="originalSclRevision" type="tSclRevision" use="optional" /> \<xs:attribute name="originalSclRelease" type="tSclRelease" use="optional" /> \<xs:attribute name="engRight" default="full" type="tRightEnum" use="optional" /> \<xs:attribute name="owner" type="xs:normalizedString" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tServices"> \<xs:all> \<xs:element name="DynAssociation" type="tServiceWithOptionalMax" minOccurs="0" /> \<xs:element name="SettingGroups" type="tSettingGroups" minOccurs="0" /> \<xs:element name="GetDirectory" type="tServiceYesNo" minOccurs="0" /> \<xs:element name="GetDataObjectDefinition" type="tServiceYesNo" minOccurs="0" /> \<xs:element name="DataObjectDirectory" type="tServiceYesNo" minOccurs="0" /> \<xs:element name="GetDataSetValue" type="tServiceYesNo" minOccurs="0" /> \<xs:element name="SetDataSetValue" type="tServiceYesNo" minOccurs="0" /> \<xs:element name="DataSetDirectory" type="tServiceYesNo" minOccurs="0" /> \<xs:element name="ConfDataSet" type="tServiceForConfDataSet" minOccurs="0" /> \<xs:element name="DynDataSet" type="tServiceWithMaxAndMaxAttributes" minOccurs="0" /> \<xs:element name="ReadWrite" type="tServiceYesNo" minOccurs="0" /> \<xs:element name="TimerActivatedControl" type="tServiceYesNo" minOccurs="0" /> \<xs:element name="ConfReportControl" type="tServiceConfReportControl" minOccurs="0" /> \<xs:element name="GetCBValues" type="tServiceYesNo" minOccurs="0" /> \<xs:element name="ConfLogControl" type="tServiceWithMaxNonZero" minOccurs="0" /> \<xs:element name="ReportSettings" type="tReportSettings" minOccurs="0" /> \<xs:element name="LogSettings" type="tLogSettings" minOccurs="0" /> \<xs:element name="GSESettings" type="tGSESettings" minOccurs="0" /> \<xs:element name="SMVSettings" type="tSMVSettings" minOccurs="0" /> \<xs:element name="GSEDir" type="tServiceYesNo" minOccurs="0" /> \<xs:element name="GOOSE" type="tGOOSEcapabilities" minOccurs="0" /> \<xs:element name="GSSE" type="tServiceWithMax" minOccurs="0" /> \<xs:element name="SMVsc" type="tSMVsc" minOccurs="0" /> \<xs:element name="FileHandling" type="tFileHandling" minOccurs="0" /> \<xs:element name="ConfLNs" type="tConfLNs" minOccurs="0" /> \<xs:element name="ClientServices" type="tClientServices" minOccurs="0" /> \<xs:element name="ConfLdName" type="tServiceYesNo" minOccurs="0" /> \<xs:element name="SupSubscription" type="tSupSubscription" minOccurs="0" /> \<xs:element name="ConfSigRef" type="tServiceWithMaxNonZero" minOccurs="0" /> \<xs:element name="ValueHandling" type="tValueHandling" minOccurs="0" /> \<xs:element name="RedProt" type="tRedProt" minOccurs="0" /> \<xs:element name="TimeSyncProt" type="tTimeSyncProt" minOccurs="0" /> \<xs:element name="CommProt" type="tCommProt" minOccurs="0" /> \</xs:all> \<xs:attribute name="nameLength" default="32" use="optional"> \<xs:simpleType> \<xs:restriction base="xs:token"> \<xs:pattern value="32" /> \<xs:pattern value="64" /> \<xs:pattern value="6[5-9]" /> \<xs:pattern value="[7-9]\\d" /> \<xs:pattern value="[1-9]\\d\\d+" /> \</xs:restriction> \</xs:simpleType> \</xs:attribute> \</xs:complexType> \<xs:complexType name="tAccessPoint"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:sequence> \<xs:choice minOccurs="0"> \<xs:element name="Server" type="tServer"> \<xs:unique name="uniqueAssociationInServer"> \<xs:selector xpath="./scl:Association" /> \<xs:field xpath="@associationID" /> \</xs:unique> \</xs:element> \<xs:element ref="LN" maxOccurs="unbounded" /> \<xs:element name="ServerAt" type="tServerAt" /> \</xs:choice> \<xs:element name="Services" type="tServices" minOccurs="0" /> \<xs:element name="GOOSESecurity" type="tCertificate" minOccurs="0" maxOccurs="7" /> \<xs:element name="SMVSecurity" type="tCertificate" minOccurs="0" maxOccurs="7" /> \</xs:sequence> \<xs:attribute name="name" type="tAccessPointName" use="required" /> \<xs:attribute name="router" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="clock" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="kdc" default="false" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tCertificate"> \<xs:complexContent> \<xs:extension base="tNaming"> \<xs:sequence> \<xs:element name="Subject" type="tCert" /> \<xs:element name="IssuerName" type="tCert" /> \</xs:sequence> \<xs:attribute name="xferNumber" type="xs:unsignedInt" use="optional" /> \<xs:attribute name="serialNumber" use="required"> \<xs:simpleType> \<xs:restriction base="xs:normalizedString"> \<xs:minLength value="1" /> \<xs:pattern value="[0-9]+" /> \</xs:restriction> \</xs:simpleType> \</xs:attribute> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tCert"> \<xs:attribute name="commonName" use="required"> \<xs:simpleType> \<xs:restriction base="xs:normalizedString"> \<xs:minLength value="4" /> \<xs:pattern value="none" /> \<xs:pattern value="CN=.+" /> \</xs:restriction> \</xs:simpleType> \</xs:attribute> \<xs:attribute name="idHierarchy" use="required"> \<xs:simpleType> \<xs:restriction base="xs:normalizedString"> \<xs:minLength value="1" /> \</xs:restriction> \</xs:simpleType> \</xs:attribute> \</xs:complexType> \<xs:complexType name="tServerAt"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:attribute name="apName" type="tAccessPointName" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tServer"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:sequence> \<xs:element name="Authentication"> \<xs:complexType> \<xs:attributeGroup ref="agAuthentication" /> \</xs:complexType> \</xs:element> \<xs:element name="LDevice" type="tLDevice" maxOccurs="unbounded"> \<xs:unique name="uniqueLNInLDevice"> \<xs:selector xpath="./scl:LN" /> \<xs:field xpath="@inst" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@prefix" /> \</xs:unique> \</xs:element> \<xs:element name="Association" type="tAssociation" minOccurs="0" maxOccurs="unbounded" /> \</xs:sequence> \<xs:attribute name="timeout" default="30" type="xs:unsignedInt" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tLDevice"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:sequence> \<xs:element ref="LN0" /> \<xs:element ref="LN" minOccurs="0" maxOccurs="unbounded" /> \<xs:element name="AccessControl" type="tAccessControl" minOccurs="0" /> \</xs:sequence> \<xs:attribute name="inst" type="tLDInst" use="required" /> \<xs:attribute name="ldName" type="tLDName" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType mixed="true" name="tAccessControl"> \<xs:complexContent> \<xs:extension base="tAnyContentFromOtherNamespace" /> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tAssociation"> \<xs:attributeGroup ref="agLNRef" /> \<xs:attribute name="kind" type="tAssociationKindEnum" use="required" /> \<xs:attribute name="associationID" type="tAssociationID" use="optional" /> \</xs:complexType> \<xs:element name="LN0"> \<xs:complexType> \<xs:complexContent> \<xs:extension base="tLN0" /> \</xs:complexContent> \</xs:complexType> \<xs:unique name="uniqueReportControlInLN0"> \<xs:selector xpath="./scl:ReportControl" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:unique name="uniqueLogControlInLN0"> \<xs:selector xpath="./scl:LogControl" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:unique name="uniqueGSEControlInLN0"> \<xs:selector xpath="./scl:GSEControl" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:unique name="uniqueSampledValueControlInLN0"> \<xs:selector xpath="./scl:SampledValueControl" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:key name="DataSetKeyLN0"> \<xs:selector xpath="./scl:DataSet" /> \<xs:field xpath="@name" /> \</xs:key> \<xs:keyref name="ref2DataSetReportLN0" refer="DataSetKeyLN0"> \<xs:selector xpath="./scl:ReportControl" /> \<xs:field xpath="@datSet" /> \</xs:keyref> \<xs:keyref name="ref2DataSetLogLN0" refer="DataSetKeyLN0"> \<xs:selector xpath="./scl:LogControl" /> \<xs:field xpath="@datSet" /> \</xs:keyref> \<xs:keyref name="ref2DataSetGSELN0" refer="DataSetKeyLN0"> \<xs:selector xpath="./scl:GSEControl" /> \<xs:field xpath="@datSet" /> \</xs:keyref> \<xs:keyref name="ref2DataSetSVLN0" refer="DataSetKeyLN0"> \<xs:selector xpath="./scl:SampledValueControl" /> \<xs:field xpath="@datSet" /> \</xs:keyref> \<xs:unique name="uniqueDOIinLN0"> \<xs:selector xpath="./scl:DOI" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:unique name="uniqueLogInLN0"> \<xs:selector xpath="./scl:Log" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="LN" type="tLN"> \<xs:unique name="uniqueReportControlInLN"> \<xs:selector xpath="./scl:ReportControl" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:unique name="uniqueLogControlInLN"> \<xs:selector xpath="./scl:LogControl" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:key name="DataSetKeyInLN"> \<xs:selector xpath="./scl:DataSet" /> \<xs:field xpath="@name" /> \</xs:key> \<xs:keyref name="ref2DataSetReport" refer="DataSetKeyInLN"> \<xs:selector xpath="./scl:ReportControl" /> \<xs:field xpath="@datSet" /> \</xs:keyref> \<xs:keyref name="ref2DataSetLog" refer="DataSetKeyInLN"> \<xs:selector xpath="./scl:LogControl" /> \<xs:field xpath="@datSet" /> \</xs:keyref> \<xs:unique name="uniqueDOIinLN"> \<xs:selector xpath="./scl:DOI" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:unique name="uniqueLogInLN"> \<xs:selector xpath="./scl:Log" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:complexType abstract="true" name="tAnyLN"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:sequence> \<xs:element name="DataSet" type="tDataSet" minOccurs="0" maxOccurs="unbounded" /> \<xs:element name="ReportControl" type="tReportControl" minOccurs="0" maxOccurs="unbounded" /> \<xs:element name="LogControl" type="tLogControl" minOccurs="0" maxOccurs="unbounded" /> \<xs:element name="DOI" type="tDOI" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueSDI\_DAIinDOI"> \<xs:selector xpath="./scl:DAI\|./scl:SDI" /> \<xs:field xpath="@name" /> \<xs:field xpath="@ix" /> \</xs:unique> \</xs:element> \<xs:element name="Inputs" type="tInputs" minOccurs="0"> \<xs:unique name="uniqueExtRefInInputs"> \<xs:selector xpath="./scl:ExtRef" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@ldInst" /> \<xs:field xpath="@prefix" /> \<xs:field xpath="@lnClass" /> \<xs:field xpath="@lnInst" /> \<xs:field xpath="@doName" /> \<xs:field xpath="@daName" /> \<xs:field xpath="@intAddr" /> \</xs:unique> \</xs:element> \<xs:element name="Log" type="tLog" minOccurs="0" maxOccurs="unbounded" /> \</xs:sequence> \<xs:attribute name="lnType" type="tName" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tLN"> \<xs:complexContent> \<xs:extension base="tAnyLN"> \<xs:attribute name="prefix" default="" type="tPrefix" use="optional" /> \<xs:attribute name="lnClass" type="tLNClassEnum" use="required" /> \<xs:attribute name="inst" type="tLNInst" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tLN0"> \<xs:complexContent> \<xs:extension base="tAnyLN"> \<xs:sequence> \<xs:element name="GSEControl" type="tGSEControl" minOccurs="0" maxOccurs="unbounded" /> \<xs:element name="SampledValueControl" type="tSampledValueControl" minOccurs="0" maxOccurs="unbounded" /> \<xs:element name="SettingControl" type="tSettingControl" minOccurs="0" /> \</xs:sequence> \<xs:attribute name="lnClass" fixed="LLN0" type="tLNClassEnum" use="required" /> \<xs:attribute name="inst" fixed="" type="xs:normalizedString" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tDataSet"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:choice maxOccurs="unbounded"> \<xs:element name="FCDA" type="tFCDA" /> \</xs:choice> \<xs:attribute name="name" type="tDataSetName" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tFCDA"> \<xs:attribute name="ldInst" type="tLDInst" use="optional" /> \<xs:attribute name="prefix" default="" type="tPrefix" use="optional" /> \<xs:attribute name="lnClass" type="tLNClassEnum" use="optional" /> \<xs:attribute name="lnInst" type="tLNInst" use="optional" /> \<xs:attribute name="doName" type="tFullDOName" use="optional" /> \<xs:attribute name="daName" type="tFullAttributeName" use="optional" /> \<xs:attribute name="fc" type="tFCEnum" use="required" /> \<xs:attribute name="ix" type="xs:unsignedInt" use="optional" /> \</xs:complexType> \<xs:complexType abstract="true" name="tControl"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:attribute name="name" type="tCBName" use="required" /> \<xs:attribute name="datSet" type="tDataSetName" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType abstract="true" name="tControlWithTriggerOpt"> \<xs:complexContent> \<xs:extension base="tControl"> \<xs:sequence> \<xs:element name="TrgOps" type="tTrgOps" minOccurs="0" /> \</xs:sequence> \<xs:attribute name="intgPd" default="0" type="xs:unsignedInt" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tTrgOps"> \<xs:attribute name="dchg" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="qchg" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="dupd" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="period" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="gi" default="true" type="xs:boolean" use="optional" /> \</xs:complexType> \<xs:complexType name="tReportControl"> \<xs:complexContent> \<xs:extension base="tControlWithTriggerOpt"> \<xs:sequence> \<xs:element name="OptFields"> \<xs:complexType> \<xs:attributeGroup ref="agOptFields" /> \</xs:complexType> \</xs:element> \<xs:element name="RptEnabled" type="tRptEnabled" minOccurs="0" /> \</xs:sequence> \<xs:attribute name="rptID" type="tMessageID" use="optional" /> \<xs:attribute name="confRev" type="xs:unsignedInt" use="required" /> \<xs:attribute name="buffered" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="bufTime" default="0" type="xs:unsignedInt" use="optional" /> \<xs:attribute name="indexed" default="true" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tRptEnabled"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:sequence> \<xs:element name="ClientLN" type="tClientLN" minOccurs="0" maxOccurs="unbounded" /> \</xs:sequence> \<xs:attribute name="max" default="1" type="xs:unsignedInt" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tClientLN"> \<xs:attributeGroup ref="agLNRef" /> \<xs:attribute name="apRef" type="tAccessPointName" use="optional" /> \</xs:complexType> \<xs:complexType name="tLogControl"> \<xs:complexContent> \<xs:extension base="tControlWithTriggerOpt"> \<xs:attribute name="ldInst" type="tLDInst" use="optional" /> \<xs:attribute name="prefix" default="" type="tPrefix" use="optional" /> \<xs:attribute name="lnClass" default="LLN0" type="tLNClassEnum" use="optional" /> \<xs:attribute name="lnInst" type="tLNInst" use="optional" /> \<xs:attribute name="logName" type="tLogName" use="required" /> \<xs:attribute name="logEna" default="true" type="xs:boolean" use="optional" /> \<xs:attribute name="reasonCode" default="true" type="xs:boolean" use="optional" /> \<xs:attribute name="bufTime" default="0" type="xs:unsignedInt" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tInputs"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:sequence> \<xs:element name="ExtRef" type="tExtRef" maxOccurs="unbounded" /> \</xs:sequence> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tExtRef"> \<xs:attributeGroup ref="agDesc" /> \<xs:attribute name="iedName" type="tIEDNameOrRelative" use="optional" /> \<xs:attribute name="ldInst" type="tLDInst" use="optional" /> \<xs:attribute name="prefix" type="tPrefix" use="optional" /> \<xs:attribute name="lnClass" type="tLNClassEnum" use="optional" /> \<xs:attribute name="lnInst" type="tLNInst" use="optional" /> \<xs:attribute name="doName" type="tFullDOName" use="optional" /> \<xs:attribute name="daName" type="tFullAttributeName" use="optional" /> \<xs:attribute name="intAddr" type="xs:normalizedString" use="optional" /> \<xs:attribute name="serviceType" type="tServiceType" use="optional" /> \<xs:attribute name="srcLDInst" type="tLDInst" use="optional" /> \<xs:attribute name="srcPrefix" type="tPrefix" use="optional" /> \<xs:attribute name="srcLNClass" type="tLNClassEnum" use="optional" /> \<xs:attribute name="srcLNInst" type="tLNInst" use="optional" /> \<xs:attribute name="srcCBName" type="tCBName" use="optional" /> \</xs:complexType> \<xs:complexType name="tLog"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:attribute name="name" type="tLogName" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tControlWithIEDName"> \<xs:complexContent> \<xs:extension base="tControl"> \<xs:sequence> \<xs:element name="IEDName" minOccurs="0" maxOccurs="unbounded"> \<xs:complexType> \<xs:simpleContent> \<xs:extension base="tIEDName"> \<xs:attribute name="apRef" type="tAccessPointName" use="optional" /> \<xs:attribute name="ldInst" type="tLDInst" use="optional" /> \<xs:attribute name="prefix" type="tPrefix" use="optional" /> \<xs:attribute name="lnClass" type="tLNClassEnum" use="optional" /> \<xs:attribute name="lnInst" type="tLNInst" use="optional" /> \</xs:extension> \</xs:simpleContent> \</xs:complexType> \</xs:element> \</xs:sequence> \<xs:attribute name="confRev" type="xs:unsignedInt" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tProtocol"> \<xs:simpleContent> \<xs:extension base="xs:normalizedString"> \<xs:attribute name="mustUnderstand" fixed="true" type="xs:boolean" use="required" /> \</xs:extension> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tGSEControl"> \<xs:complexContent> \<xs:extension base="tControlWithIEDName"> \<xs:sequence> \<xs:element name="Protocol" type="tProtocol" minOccurs="0" fixed="R-GOOSE" /> \</xs:sequence> \<xs:attribute name="type" default="GOOSE" type="tGSEControlTypeEnum" use="optional" /> \<xs:attribute name="appID" type="tMessageID" use="required" /> \<xs:attribute name="fixedOffs" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="securityEnable" default="None" type="tPredefinedTypeOfSecurityEnum" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tSampledValueControl"> \<xs:complexContent> \<xs:extension base="tControlWithIEDName"> \<xs:sequence> \<xs:element name="SmvOpts"> \<xs:complexType> \<xs:attributeGroup ref="agSmvOpts" /> \</xs:complexType> \</xs:element> \<xs:element name="Protocol" type="tProtocol" minOccurs="0" fixed="R-SV" /> \</xs:sequence> \<xs:attribute name="smvID" type="tMessageID" use="required" /> \<xs:attribute name="multicast" default="true" type="xs:boolean" /> \<xs:attribute name="smpRate" type="xs:unsignedInt" use="required" /> \<xs:attribute name="nofASDU" type="xs:unsignedInt" use="required" /> \<xs:attribute name="smpMod" default="SmpPerPeriod" type="tSmpMod" use="optional" /> \<xs:attribute name="securityEnable" default="None" type="tPredefinedTypeOfSecurityEnum" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tSettingControl"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:attribute name="numOfSGs" use="required"> \<xs:simpleType> \<xs:restriction base="xs:unsignedInt"> \<xs:minInclusive value="1" /> \</xs:restriction> \</xs:simpleType> \</xs:attribute> \<xs:attribute name="actSG" default="1" use="optional"> \<xs:simpleType> \<xs:restriction base="xs:unsignedInt"> \<xs:minInclusive value="1" /> \</xs:restriction> \</xs:simpleType> \</xs:attribute> \<xs:attribute name="resvTms" type="xs:unsignedShort" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tDOI"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:choice minOccurs="0" maxOccurs="unbounded"> \<xs:element name="SDI" type="tSDI"> \<xs:unique name="uniqueSDI\_DAIinSDI"> \<xs:selector xpath="./scl:DAI\|./scl:SDI" /> \<xs:field xpath="@name" /> \<xs:field xpath="@ix" /> \</xs:unique> \</xs:element> \<xs:element name="DAI" type="tDAI" /> \</xs:choice> \<xs:attribute name="name" type="tDataName" use="required" /> \<xs:attribute name="ix" type="xs:unsignedInt" use="optional" /> \<xs:attribute name="accessControl" type="xs:normalizedString" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tSDI"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:choice minOccurs="0" maxOccurs="unbounded"> \<xs:element name="SDI" type="tSDI" /> \<xs:element name="DAI" type="tDAI" /> \</xs:choice> \<xs:attribute name="name" type="tAttributeNameEnum" use="required" /> \<xs:attribute name="ix" type="xs:unsignedInt" use="optional" /> \<xs:attribute name="sAddr" type="xs:normalizedString" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tDAI"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:sequence> \<xs:element name="Val" type="tVal" minOccurs="0" maxOccurs="unbounded" /> \</xs:sequence> \<xs:attribute name="name" type="tAttributeNameEnum" use="required" /> \<xs:attribute name="sAddr" type="xs:normalizedString" use="optional" /> \<xs:attribute name="valKind" type="tValKindEnum" use="optional" /> \<xs:attribute name="ix" type="xs:unsignedInt" use="optional" /> \<xs:attribute name="valImport" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tServiceYesNo" /> \<xs:complexType name="tServiceWithOptionalMax"> \<xs:attribute name="max" type="xs:unsignedInt" use="optional" /> \</xs:complexType> \<xs:complexType name="tServiceWithMax"> \<xs:attribute name="max" type="xs:unsignedInt" use="required" /> \</xs:complexType> \<xs:complexType name="tServiceWithMaxNonZero"> \<xs:attribute name="max" use="required"> \<xs:simpleType> \<xs:restriction base="xs:unsignedInt"> \<xs:minExclusive value="0" /> \</xs:restriction> \</xs:simpleType> \</xs:attribute> \</xs:complexType> \<xs:complexType name="tServiceConfReportControl"> \<xs:complexContent> \<xs:extension base="tServiceWithMax"> \<xs:attribute name="bufMode" use="optional"> \<xs:simpleType> \<xs:restriction base="xs:Name"> \<xs:enumeration value="unbuffered" /> \<xs:enumeration value="buffered" /> \<xs:enumeration value="both" /> \</xs:restriction> \</xs:simpleType> \</xs:attribute> \<xs:attribute name="bufConf" default="false" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tServiceWithMaxAndMaxAttributes"> \<xs:complexContent> \<xs:extension base="tServiceWithMax"> \<xs:attribute name="maxAttributes" use="optional"> \<xs:simpleType> \<xs:restriction base="xs:unsignedInt"> \<xs:minExclusive value="0" /> \</xs:restriction> \</xs:simpleType> \</xs:attribute> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tServiceWithMaxAndModify"> \<xs:complexContent> \<xs:extension base="tServiceWithMax"> \<xs:attribute name="modify" default="true" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tServiceForConfDataSet"> \<xs:complexContent> \<xs:extension base="tServiceWithMaxAndMaxAttributes"> \<xs:attribute name="modify" default="true" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tClientServices"> \<xs:sequence> \<xs:element name="TimeSyncProt" type="tTimeSyncProt" minOccurs="0" /> \</xs:sequence> \<xs:attribute name="goose" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="gsse" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="bufReport" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="unbufReport" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="readLog" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="sv" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="supportsLdName" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="maxAttributes" use="optional"> \<xs:simpleType> \<xs:restriction base="xs:unsignedInt" /> \</xs:simpleType> \</xs:attribute> \<xs:attribute name="maxReports" use="optional"> \<xs:simpleType> \<xs:restriction base="xs:unsignedInt" /> \</xs:simpleType> \</xs:attribute> \<xs:attribute name="maxGOOSE" use="optional"> \<xs:simpleType> \<xs:restriction base="xs:unsignedInt" /> \</xs:simpleType> \</xs:attribute> \<xs:attribute name="maxSMV" use="optional"> \<xs:simpleType> \<xs:restriction base="xs:unsignedInt" /> \</xs:simpleType> \</xs:attribute> \</xs:complexType> \<xs:complexType abstract="true" name="tServiceSettings"> \<xs:attribute name="cbName" default="Fix" type="tServiceSettingsNoDynEnum" use="optional" /> \<xs:attribute name="datSet" default="Fix" type="tServiceSettingsEnum" use="optional" /> \</xs:complexType> \<xs:complexType name="tReportSettings"> \<xs:complexContent> \<xs:extension base="tServiceSettings"> \<xs:attribute name="rptID" default="Fix" type="tServiceSettingsEnum" use="optional" /> \<xs:attribute name="optFields" default="Fix" type="tServiceSettingsEnum" use="optional" /> \<xs:attribute name="bufTime" default="Fix" type="tServiceSettingsEnum" use="optional" /> \<xs:attribute name="trgOps" default="Fix" type="tServiceSettingsEnum" use="optional" /> \<xs:attribute name="intgPd" default="Fix" type="tServiceSettingsEnum" use="optional" /> \<xs:attribute name="resvTms" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="owner" default="false" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tLogSettings"> \<xs:complexContent> \<xs:extension base="tServiceSettings"> \<xs:attribute name="logEna" default="Fix" type="tServiceSettingsEnum" use="optional" /> \<xs:attribute name="trgOps" default="Fix" type="tServiceSettingsEnum" use="optional" /> \<xs:attribute name="intgPd" default="Fix" type="tServiceSettingsEnum" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tGSESettings"> \<xs:complexContent> \<xs:extension base="tServiceSettings"> \<xs:attribute name="appID" default="Fix" type="tServiceSettingsEnum" use="optional" /> \<xs:attribute name="dataLabel" default="Fix" type="tServiceSettingsEnum" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tSMVSettings"> \<xs:complexContent> \<xs:extension base="tServiceSettings"> \<xs:choice maxOccurs="unbounded"> \<xs:element name="SmpRate"> \<xs:simpleType> \<xs:restriction base="xs:unsignedInt"> \<xs:minExclusive value="0" /> \</xs:restriction> \</xs:simpleType> \</xs:element> \<xs:element name="SamplesPerSec"> \<xs:simpleType> \<xs:restriction base="xs:unsignedInt"> \<xs:minExclusive value="0" /> \</xs:restriction> \</xs:simpleType> \</xs:element> \<xs:element name="SecPerSamples"> \<xs:simpleType> \<xs:restriction base="xs:unsignedInt"> \<xs:minExclusive value="0" /> \</xs:restriction> \</xs:simpleType> \</xs:element> \</xs:choice> \<xs:attribute name="svID" default="Fix" type="tServiceSettingsEnum" use="optional" /> \<xs:attribute name="optFields" default="Fix" type="tServiceSettingsEnum" use="optional" /> \<xs:attribute name="smpRate" default="Fix" type="tServiceSettingsEnum" use="optional" /> \<xs:attribute name="samplesPerSec" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="pdcTimeStamp" default="false" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tConfLNs"> \<xs:attribute name="fixPrefix" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="fixLnInst" default="false" type="xs:boolean" use="optional" /> \</xs:complexType> \<xs:complexType name="tValueHandling"> \<xs:attribute name="setToRO" default="false" type="xs:boolean" use="optional" /> \</xs:complexType> \<xs:complexType name="tFileHandling"> \<xs:complexContent> \<xs:extension base="tServiceYesNo"> \<xs:attribute name="mms" default="true" type="xs:boolean" use="optional" /> \<xs:attribute name="ftp" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="ftps" default="false" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tGOOSEcapabilities"> \<xs:complexContent> \<xs:extension base="tServiceWithMax"> \<xs:attribute name="fixedOffs" default="false" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tRedProt"> \<xs:attribute name="hsr" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="prp" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="rstp" default="false" type="xs:boolean" use="optional" /> \</xs:complexType> \<xs:complexType name="tTimeSyncProt"> \<xs:complexContent> \<xs:extension base="tServiceYesNo"> \<xs:attribute name="sntp" default="true" type="xs:boolean" use="optional" /> \<xs:attribute name="c37\_238" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="other" default="false" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tSMVsc"> \<xs:complexContent> \<xs:extension base="tServiceWithMax"> \<xs:attribute name="delivery" default="multicast" type="tSMVDeliveryEnum" use="optional" /> \<xs:attribute name="deliveryConf" default="false" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tSupSubscription"> \<xs:attribute name="maxGo" type="xs:unsignedInt" use="required" /> \<xs:attribute name="maxSv" type="xs:unsignedInt" use="required" /> \</xs:complexType> \<xs:complexType name="tCommProt"> \<xs:complexContent> \<xs:extension base="tServiceYesNo"> \<xs:attribute name="ipv6" default="false" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tKDC"> \<xs:attribute name="iedName" type="tIEDName" use="required" /> \<xs:attribute name="apName" type="tAccessPointName" use="required" /> \</xs:complexType> \<xs:complexType name="tSettingGroups"> \<xs:all> \<xs:element name="SGEdit" minOccurs="0"> \<xs:complexType> \<xs:complexContent> \<xs:extension base="tServiceYesNo"> \<xs:attribute name="resvTms" default="false" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \</xs:element> \<xs:element name="ConfSG" minOccurs="0"> \<xs:complexType> \<xs:complexContent> \<xs:extension base="tServiceYesNo"> \<xs:attribute name="resvTms" default="false" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \</xs:element> \</xs:all> \</xs:complexType> \<xs:element name="IED" type="tIED"> \<xs:key name="LDeviceInIEDKey"> \<xs:selector xpath="./scl:AccessPoint/scl:Server/scl:LDevice" /> \<xs:field xpath="@inst" /> \</xs:key> \<xs:keyref name="ref2LDeviceInDataSetForFCDAinLN" refer="LDeviceInIEDKey"> \<xs:selector xpath="./scl:AccessPoint/scl:Server/scl:LDevice/scl:LN/scl:DataSet/scl:FCDA" /> \<xs:field xpath="@ldInst" /> \</xs:keyref> \<xs:keyref name="ref2LDeviceInDataSetForFCDAinLN0" refer="LDeviceInIEDKey"> \<xs:selector xpath="./scl:AccessPoint/scl:Server/scl:LDevice/scl:LN0/scl:DataSet/scl:FCDA" /> \<xs:field xpath="@ldInst" /> \</xs:keyref> \<xs:key name="AccessPointInIEDKey"> \<xs:selector xpath="./scl:AccessPoint" /> \<xs:field xpath="@name" /> \</xs:key> \<xs:keyref name="ServerAtRef2AccessPoint" refer="AccessPointInIEDKey"> \<xs:selector xpath="./scl:AccessPoint/scl:ServerAt" /> \<xs:field xpath="@apName" /> \</xs:keyref> \</xs:element> \<!--Schema items added from SCL.2007B1.2014-07-18\\SCL\_Communication.xsd--> \<xs:annotation> \<xs:documentation xml:lang="en"> SCL schema version "2007" revision "B" release 1, for IEC 61850-6 Ed. 2.1. Draft 2014-07-18. COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon. \</xs:documentation> \</xs:annotation> \<xs:complexType abstract="true" name="tControlBlock"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:sequence> \<xs:element name="Address" type="tAddress" minOccurs="0" /> \</xs:sequence> \<xs:attribute name="ldInst" type="tLDInst" use="required" /> \<xs:attribute name="cbName" type="tCBName" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tCommunication"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:sequence> \<xs:element name="SubNetwork" type="tSubNetwork" maxOccurs="unbounded"> \<xs:unique name="uniqueConnectedAP"> \<xs:selector xpath="./scl:ConnectedAP" /> \<xs:field xpath="@iedName" /> \<xs:field xpath="@apName" /> \</xs:unique> \</xs:element> \</xs:sequence> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tSubNetwork"> \<xs:complexContent> \<xs:extension base="tNaming"> \<xs:sequence> \<xs:element name="BitRate" type="tBitRateInMbPerSec" minOccurs="0" /> \<xs:element name="ConnectedAP" type="tConnectedAP" maxOccurs="unbounded"> \<xs:unique name="uniqueGSEinConnectedAP"> \<xs:selector xpath="./scl:GSE" /> \<xs:field xpath="@cbName" /> \<xs:field xpath="@ldInst" /> \</xs:unique> \<xs:unique name="uniqueSMVinConnectedAP"> \<xs:selector xpath="./scl:SMV" /> \<xs:field xpath="@cbName" /> \<xs:field xpath="@ldInst" /> \</xs:unique> \</xs:element> \</xs:sequence> \<xs:attribute name="type" type="xs:normalizedString" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tConnectedAP"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:sequence> \<xs:element name="Address" type="tAddress" minOccurs="0" /> \<xs:element name="GSE" type="tGSE" minOccurs="0" maxOccurs="unbounded" /> \<xs:element name="SMV" type="tSMV" minOccurs="0" maxOccurs="unbounded" /> \<xs:element name="PhysConn" type="tPhysConn" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniquePTypeInPhysConn"> \<xs:selector xpath="./scl:P" /> \<xs:field xpath="@type" /> \</xs:unique> \</xs:element> \</xs:sequence> \<xs:attribute name="iedName" type="tIEDName" use="required" /> \<xs:attribute name="apName" type="tAccessPointName" use="required" /> \<xs:attribute name="redProt" type="tRedProtEnum" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tAddress"> \<xs:sequence> \<xs:element name="P" type="tP" maxOccurs="unbounded" /> \</xs:sequence> \</xs:complexType> \<xs:complexType name="tGSE"> \<xs:complexContent> \<xs:extension base="tControlBlock"> \<xs:sequence> \<xs:element name="MinTime" type="tDurationInMilliSec" minOccurs="0" /> \<xs:element name="MaxTime" type="tDurationInMilliSec" minOccurs="0" /> \</xs:sequence> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tSMV"> \<xs:complexContent> \<xs:extension base="tControlBlock" /> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tPhysConn"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:sequence> \<xs:element name="P" type="tP\_PhysConn" minOccurs="0" maxOccurs="unbounded" /> \</xs:sequence> \<xs:attribute name="type" type="tPhysConnTypeEnum" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tP\_PhysConn"> \<xs:simpleContent> \<xs:extension base="tPAddr"> \<xs:attribute name="type" type="tPTypePhysConnEnum" use="required" /> \</xs:extension> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP"> \<xs:simpleContent> \<xs:extension base="tPAddr"> \<xs:attribute name="type" type="tPTypeEnum" use="required" /> \</xs:extension> \</xs:simpleContent> \</xs:complexType> \<xs:complexType abstract="true" name="tP\_IPbase"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:pattern id="IPv4" value="([0-9]{1,2}\|1[0-9]{2}\|2[0-4][0-9]\|25[0-5])\\.([0-9]{1,2}\|1[0-9]{2}\|2[0-4][0-9]\|25[0-5])\\.([0-9]{1,2}\|1[0-9]{2}\|2[0-4][0-9]\|25[0-5])\\.([0-9]{1,2}\|1[0-9]{2}\|2[0-4][0-9]\|25[0-5])" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_IP"> \<xs:simpleContent> \<xs:restriction base="tP\_IPbase"> \<xs:attribute name="type" fixed="IP" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_IP-SUBNET"> \<xs:simpleContent> \<xs:restriction base="tP\_IPbase"> \<xs:attribute name="type" fixed="IP-SUBNET" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_IP-GATEWAY"> \<xs:simpleContent> \<xs:restriction base="tP\_IPbase"> \<xs:attribute name="type" fixed="IP-GATEWAY" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType abstract="true" name="tP\_IPv6base"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:pattern id="IPv6" value="([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_IPv6"> \<xs:simpleContent> \<xs:restriction base="tP\_IPv6base"> \<xs:attribute name="type" fixed="IPv6" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_IPv6-SUBNET"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:pattern id="IPv6\_Subnet" value="/[1-9]\|/[1-9][0-9]\|/1[0-1][0-9]\|/12[0-7]" /> \<xs:attribute name="type" fixed="IPv6-SUBNET" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_IPv6-GATEWAY"> \<xs:simpleContent> \<xs:restriction base="tP\_IPv6base"> \<xs:attribute name="type" fixed="IPv6-GATEWAY" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_DNSName"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:pattern value="\\S*" /> \<xs:attribute name="type" fixed="DNSName" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_IPv6FlowLabel"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:pattern value="[0-9a-fA-F]{1,5}" /> \<xs:attribute name="type" fixed="IPv6FlowLabel" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_OSI-NSAP"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:maxLength value="40" /> \<xs:pattern value="[0-9A-F]+" /> \<xs:attribute name="type" fixed="OSI-NSAP" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_OSI-TSEL"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:maxLength value="8" /> \<xs:pattern value="[0-9A-F]+" /> \<xs:attribute name="type" fixed="OSI-TSEL" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_OSI-SSEL"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:maxLength value="16" /> \<xs:pattern value="[0-9A-F]+" /> \<xs:attribute name="type" fixed="OSI-SSEL" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_OSI-PSEL"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:maxLength value="16" /> \<xs:pattern value="[0-9A-F]+" /> \<xs:attribute name="type" fixed="OSI-PSEL" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_OSI-AP-Title"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:pattern value="[0-9,]+" /> \<xs:attribute name="type" fixed="OSI-AP-Title" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_OSI-AP-Invoke"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:maxLength value="5" /> \<xs:pattern value="[0-9]+" /> \<xs:attribute name="type" fixed="OSI-AP-Invoke" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_OSI-AE-Qualifier"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:maxLength value="5" /> \<xs:pattern value="[0-9]+" /> \<xs:attribute name="type" fixed="OSI-AE-Qualifier" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_OSI-AE-Invoke"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:maxLength value="5" /> \<xs:pattern value="[0-9]+" /> \<xs:attribute name="type" fixed="OSI-AE-Invoke" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_MAC-Address"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:pattern value="[0-9A-F]{2}\\-[0-9A-F]{2}\\-[0-9A-F]{2}\\-[0-9A-F]{2}\\-[0-9A-F]{2}\\-[0-9A-F]{2}" /> \<xs:attribute name="type" fixed="MAC-Address" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_APPID"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:pattern value="[0-9A-F]{4}" /> \<xs:attribute name="type" fixed="APPID" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_VLAN-PRIORITY"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:pattern value="[0-7]" /> \<xs:attribute name="type" fixed="VLAN-PRIORITY" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_VLAN-ID"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:pattern value="[0-9A-F]{3}" /> \<xs:attribute name="type" fixed="VLAN-ID" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType abstract="true" name="tP\_Port"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:pattern value="0" /> \<xs:pattern value="[1-9][0-9]{0,3}" /> \<xs:pattern value="[1-5][0-9]{4,4}" /> \<xs:pattern value="6[0-4][0-9]{3,3}" /> \<xs:pattern value="65[0-4][0-9]{2,2}" /> \<xs:pattern value="655[0-2][0-9]" /> \<xs:pattern value="6553[0-5]" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_SNTP-Port"> \<xs:simpleContent> \<xs:restriction base="tP\_Port"> \<xs:attribute name="type" fixed="SNTP-Port" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_MMS-Port"> \<xs:simpleContent> \<xs:restriction base="tP\_Port"> \<xs:attribute name="type" fixed="MMS-Port" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_UDP-Port"> \<xs:simpleContent> \<xs:restriction base="tP\_Port"> \<xs:attribute name="type" fixed="IP-UDP-PORT" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_TCP-Port"> \<xs:simpleContent> \<xs:restriction base="tP\_Port"> \<xs:attribute name="type" fixed="IP-TCP-PORT" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_IPv6ClassOfTraffic"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:pattern id="Values0-255" value="[0-9]\|[1-9][0-9]\|1[0-9]{2}\|2[0-4][0-9]\|25[0-5]" /> \<xs:attribute name="type" fixed="IPv6ClassOfTraffic" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tP\_C37-118-IP-Port"> \<xs:simpleContent> \<xs:restriction base="tP"> \<xs:pattern id="Values1025-65535" value="102[5-9]\|10[3-9][0-9]\|1[1-9][0-9][0-9]\|[2-9][0-9]{3}\|[1-5][0-9]{4}\|6[0-4][0-9]{3}\|65[0-4][0-9]{2}\|655[0-2][0-9]\|6553[0-5]" /> \<xs:attribute name="type" fixed="C37-118-IP-Port" type="tPTypeEnum" use="required" /> \</xs:restriction> \</xs:simpleContent> \</xs:complexType> \<xs:element name="Communication" type="tCommunication"> \<xs:unique name="uniqueSubNetwork"> \<xs:selector xpath="./scl:SubNetwork" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<!--Schema items added from SCL.2007B1.2014-07-18\\SCL\_DataTypeTemplates.xsd--> \<xs:annotation> \<xs:documentation xml:lang="en"> SCL schema version "2007" revision "B" release 1, for IEC 61850-6 Ed. 2.1. Draft 2014-07-18. COPYRIGHT (c) IEC, 2014. All rights reserved. Disclaimer: The IEC disclaims liability for any personal injury, property or other damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly resulting from this software and the document upon which its methods are based, use of, or reliance upon. \</xs:documentation> \</xs:annotation> \<xs:attributeGroup name="agDATrgOp"> \<xs:attribute name="dchg" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="qchg" default="false" type="xs:boolean" use="optional" /> \<xs:attribute name="dupd" default="false" type="xs:boolean" use="optional" /> \</xs:attributeGroup> \<xs:complexType abstract="true" name="tAbstractDataAttribute"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:sequence> \<xs:element name="Val" type="tVal" minOccurs="0" maxOccurs="unbounded" /> \</xs:sequence> \<xs:attribute name="name" type="tAttributeNameEnum" use="required" /> \<xs:attribute name="sAddr" type="xs:normalizedString" use="optional" /> \<xs:attribute name="bType" type="tBasicTypeEnum" use="required" /> \<xs:attribute name="valKind" default="Set" type="tValKindEnum" use="optional" /> \<xs:attribute name="type" type="tAnyName" use="optional" /> \<xs:attribute name="count" default="0" type="tDACount" use="optional" /> \<xs:attribute name="valImport" default="false" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tLNodeType"> \<xs:complexContent> \<xs:extension base="tIDNaming"> \<xs:sequence> \<xs:element name="DO" type="tDO" maxOccurs="unbounded" /> \</xs:sequence> \<xs:attribute name="iedType" default="" type="tAnyName" use="optional" /> \<xs:attribute name="lnClass" type="tLNClassEnum" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tDO"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:attribute name="name" type="tDataName" use="required" /> \<xs:attribute name="type" type="tName" use="required" /> \<xs:attribute name="accessControl" type="xs:normalizedString" use="optional" /> \<xs:attribute name="transient" default="false" type="xs:boolean" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tDOType"> \<xs:complexContent> \<xs:extension base="tIDNaming"> \<xs:choice minOccurs="0" maxOccurs="unbounded"> \<xs:element name="SDO" type="tSDO" /> \<xs:element name="DA" type="tDA"> \<xs:unique name="uniqueProtNsInDA"> \<xs:selector xpath="scl:ProtNs" /> \<xs:field xpath="@type" /> \<xs:field xpath="." /> \</xs:unique> \</xs:element> \</xs:choice> \<xs:attribute name="iedType" default="" type="tAnyName" use="optional" /> \<xs:attribute name="cdc" type="tCDCEnum" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tSDO"> \<xs:complexContent> \<xs:extension base="tUnNaming"> \<xs:attribute name="name" type="tSubDataName" use="required" /> \<xs:attribute name="type" type="tName" use="required" /> \<xs:attribute name="count" default="0" type="tSDOCount" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tDA"> \<xs:complexContent> \<xs:extension base="tAbstractDataAttribute"> \<xs:sequence> \<xs:element name="ProtNs" type="tProtNs" minOccurs="0" maxOccurs="unbounded" /> \</xs:sequence> \<xs:attributeGroup ref="agDATrgOp" /> \<xs:attribute name="fc" type="tFCEnum" use="required" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tDAType"> \<xs:complexContent> \<xs:extension base="tIDNaming"> \<xs:sequence> \<xs:element name="BDA" type="tBDA" maxOccurs="unbounded" /> \<xs:element name="ProtNs" type="tProtNs" minOccurs="0" maxOccurs="unbounded" /> \</xs:sequence> \<xs:attribute name="iedType" default="" type="tAnyName" use="optional" /> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tBDA"> \<xs:complexContent> \<xs:extension base="tAbstractDataAttribute" /> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tEnumType"> \<xs:complexContent> \<xs:extension base="tIDNaming"> \<xs:sequence> \<xs:element name="EnumVal" type="tEnumVal" maxOccurs="unbounded" /> \</xs:sequence> \</xs:extension> \</xs:complexContent> \</xs:complexType> \<xs:complexType name="tProtNs"> \<xs:simpleContent> \<xs:extension base="tNamespaceName"> \<xs:attribute name="type" default="8-MMS" use="optional"> \<xs:simpleType> \<xs:restriction base="xs:normalizedString"> \<xs:minLength value="1" /> \</xs:restriction> \</xs:simpleType> \</xs:attribute> \</xs:extension> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tEnumVal"> \<xs:simpleContent> \<xs:extension base="xs:normalizedString"> \<xs:attribute name="ord" type="xs:int" use="required" /> \<xs:attributeGroup ref="agDesc" /> \</xs:extension> \</xs:simpleContent> \</xs:complexType> \<xs:complexType name="tDataTypeTemplates"> \<xs:sequence> \<xs:element name="LNodeType" type="tLNodeType" maxOccurs="unbounded"> \<xs:unique name="uniqueDOInLNodeType"> \<xs:selector xpath="scl:DO" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="DOType" type="tDOType" maxOccurs="unbounded"> \<xs:unique name="uniqueDAorSDOInDOType"> \<xs:selector xpath="./*" /> \<xs:field xpath="@name" /> \</xs:unique> \</xs:element> \<xs:element name="DAType" type="tDAType" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueBDAInDAType"> \<xs:selector xpath="scl:BDA" /> \<xs:field xpath="@name" /> \</xs:unique> \<xs:unique name="uniqueProtNs"> \<xs:selector xpath="scl:ProtNs" /> \<xs:field xpath="@type" /> \<xs:field xpath="." /> \</xs:unique> \</xs:element> \<xs:element name="EnumType" type="tEnumType" minOccurs="0" maxOccurs="unbounded"> \<xs:unique name="uniqueOrdInEnumType"> \<xs:selector xpath="scl:EnumVal" /> \<xs:field xpath="@ord" /> \</xs:unique> \<xs:unique name="uniqueEnumValue"> \<xs:selector xpath="scl:EnumVal" /> \<xs:field xpath="." /> \</xs:unique> \</xs:element> \</xs:sequence> \</xs:complexType> \<xs:element name="DataTypeTemplates" type="tDataTypeTemplates"> \<xs:unique name="uniqueLNodeType"> \<xs:selector xpath="scl:LNodeType" /> \<xs:field xpath="@id" /> \</xs:unique> \<xs:key name="DOTypeKey"> \<xs:selector xpath="scl:DOType" /> \<xs:field xpath="@id" /> \</xs:key> \<xs:keyref name="ref2DOType" refer="DOTypeKey"> \<xs:selector xpath="scl:LNodeType/scl:DO" /> \<xs:field xpath="@type" /> \</xs:keyref> \<xs:keyref name="ref2DOTypeForSDO" refer="DOTypeKey"> \<xs:selector xpath="scl:DOType/scl:SDO" /> \<xs:field xpath="@type" /> \</xs:keyref> \<xs:key name="DATypeKey"> \<xs:selector xpath="scl:DAType" /> \<xs:field xpath="@id" /> \</xs:key> \<xs:key name="EnumTypeKey"> \<xs:selector xpath="scl:EnumType" /> \<xs:field xpath="@id" /> \</xs:key> \</xs:element>\</xs:schema>\`

*Defined in [src/validate.ts:41](https://github.com/openscd/open-scd/blob/12e7252/src/validate.ts#L41)*

## Functions

### validateSCL

▸ **validateSCL**(`doc`: XMLDocument, `fileName?`: string, `cause?`: [LogEntry](_foundation_.md#logentry)): Promise\<Array\<[InfoDetail](../interfaces/_foundation_.infodetail.md)>>

*Defined in [src/validate.ts:13](https://github.com/openscd/open-scd/blob/12e7252/src/validate.ts#L13)*

Validates `doc` against the `SCL 2007 B1` schema.

#### Parameters:

Name | Type | Default value |
------ | ------ | ------ |
`doc` | XMLDocument | - |
`fileName` | string | "untitled.scd" |
`cause?` | [LogEntry](_foundation_.md#logentry) | - |

**Returns:** Promise\<Array\<[InfoDetail](../interfaces/_foundation_.infodetail.md)>>

___

### validateXML

▸ **validateXML**(`parameters`: [XMLParams](../interfaces/_validate_.xmlparams.md)): string

*Defined in [src/validate.ts:10](https://github.com/openscd/open-scd/blob/12e7252/src/validate.ts#L10)*

#### Parameters:

Name | Type |
------ | ------ |
`parameters` | [XMLParams](../interfaces/_validate_.xmlparams.md) |

**Returns:** string
