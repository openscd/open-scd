As a user of the IEC 61850 I can formulate some of the WHAT I want in the SCL files during specification phase. Very common things to specify are:

- substation structure
- single line diagram
- structure of the data I want to have (DataTypeTemplates)
- allocation of the logical node classes to substation elements (e.g. bay 1 shall have overcurrent protection `PTOC`)

All of this can be done using the `Substation` section and the `DataTypeTemplate` section. Some user even want to be more specific in their specification and want in addition specify:

- allocation of logical nodes to IEDs (e.g. main 1 has distance protection PDIS and main 2 has overcurrent protection PTOC)
- the capability of the IED (e.g. how many GOOSE does it need to subscribe or how many reports can be activated at the same time)

That can only be done in the `IED` element in the SCL. The construction of such a co-called `SPECIFICATION` IED can be done either by hand or though a transformation algorithm based on the function structure in the substation section.

**Automated SPECIFICATION IED creation**

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183670442-f61a3135-77e2-423a-9754-650907d6c9e2.png">

The basic idea behind this algorithm is that function type elements are used to structure logical nodes in the substation section and logical devices in their essence to the same in the IED section. As they are different in structure we need some transformation rules:

1. Logical devices can have only one parent the `Server` function can have multiple parents. This means that multiple functions with the same name might exist in the substation structure e.g. Circuit_Breaker that is potentially in every bay once. To deal with that the logical name can be constructed from the parent names in addition to the function name. The algorithm takes as many parents onto account as it need for a globally unique logical device name
2. If a function or sub-function has only one logical node no new logical device is created but the function/sub-function name is written to the logical nodes `prefix` attribute
3. There must be at least one logical node of the `lnClass = LLN0` in the logical device. A transformation without such a logical node in the `DataTypeTemplates` is not possible. If there are multiple defined one has to be selected.

!!! The input for the automated IED creation is the function structure in the substation thus make sure the SCL file has:

- [existing function(s) in the Substation section](https://github.com/openscd/open-scd/wiki/Function)

To use this automated specification IED creation

- activate menu plugin **Create Virtual IED** is activated. (See TODO)
- open **Menu** and click on **Create Virtual IED**
- make sure to fill in
  - `manufacturer`: this is not the real manufacturer but a tag for the entity that is doing the specification
  - `desc`: allows you differentiate multiple `SPECIFICATION` IED in the file
  - `AccessPoint name`: must be specified for schema validity and is replaced with the real access point name in a later stage
  - select at least one logical node
- do not forget to press **Save**

> NOTE: The name of the logical device is shown above the LLN0 selection field. It is a globally unique logical device name based of the function structure in the substation section.

Below you can see a example project for a typical function structure specified. You can load this into OpenSCD and see the outcome of the transformation yourself. Happy testing :)

```xml
<Substation xmlns="http://www.iec.ch/61850/2003/SCL" name="AA1">
	<VoltageLevel name="E1" desc="" nomFreq="50" numPhases="3">
		<Voltage unit="V" multiplier="k">110</Voltage>
			<Bay name="Q01" desc="">
				<ConductingEquipment name="QC9" type="DIS" desc="">
					<Terminal name="T1" cNodeName="grounded" substationName="AA1" voltageLevelName="E1" bayName="Q01" connectivityNode="AA1/E1/Q01/grounded"/>
					<EqFunction name="Earth_Switch">
						<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI"/>
						<LNode iedName="None" lnClass="CILO" lnInst="1" lnType="OpenSCD_CILO"/>
						<LNode iedName="None" lnClass="XSWI" lnInst="1" lnType="OpenSCD_XSWI_EarthSwitch"/>
					</EqFunction>
				</ConductingEquipment>
				<ConductingEquipment name="QB1" type="DIS" desc="">
					<EqFunction name="Disconnector">
						<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI"/>
						<LNode iedName="None" lnClass="XSWI" lnInst="1" lnType="OpenSCD_XSWI_DIS"/>
						<LNode iedName="None" lnClass="CILO" lnInst="1" lnType="OpenSCD_CILO"/>
					</EqFunction>
				</ConductingEquipment>
				<ConductingEquipment name="QA1" type="CBR" desc="">
					<EqFunction name="Circuit_Breaker">
						<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI"/>
						<LNode iedName="None" lnClass="CILO" lnInst="1" lnType="OpenSCD_CILO"/>
						<LNode iedName="None" lnClass="XCBR" lnInst="1" lnType="OpenSCD_XCBR"/>
					</EqFunction>
				</ConductingEquipment>
				<ConnectivityNode name="grounded" pathName="AA1/E1/Q01/grounded"/>
				<Function name="Timed_Overcurrent">
					<LNode iedName="None" lnClass="LLN0" lnInst="" lnType="OpenSCD_LLN01" prefix=""/>
					<LNode iedName="None" lnClass="PTOC" lnInst="2" lnType="OpenSCD_PTOC" prefix="ID_"/>
					<LNode iedName="None" lnClass="PTOC" lnInst="1" lnType="OpenSCD_PTOC" prefix="IDD_"/>
				</Function>
				<Function name="Distance_Protection">
					<SubFunction name="Zone4">
						<LNode iedName="None" lnClass="PDIS" lnInst="1" lnType="OpenSCD_PDIS"/>
					</SubFunction>
					<SubFunction name="Zon3">
						<LNode iedName="None" lnClass="PDIS" lnInst="1" lnType="OpenSCD_PDIS"/>
					</SubFunction>
					<SubFunction name="Zone2">
						<LNode iedName="None" lnClass="PDIS" lnInst="1" lnType="OpenSCD_PDIS"/>
					</SubFunction>
					<SubFunction name="Zone1">
						<LNode iedName="None" lnClass="PDIS" lnInst="1" lnType="OpenSCD_PDIS"/>
					</SubFunction>
				</Function>
			</Bay>
			<Bay name="Q02" desc="">
				<ConductingEquipment name="QC9" type="DIS" desc="">
					<Terminal name="T1" cNodeName="grounded" substationName="AA1" voltageLevelName="E1" bayName="Q01" connectivityNode="AA1/E1/Q01/grounded"/>
					<EqFunction name="Earth_Switch">
					</EqFunction>
				</ConductingEquipment>
				<ConductingEquipment name="QB1" type="DIS" desc="">
					<EqFunction name="Disconnector">
						<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI"/>
						<LNode iedName="None" lnClass="XSWI" lnInst="1" lnType="OpenSCD_XSWI_DIS"/>
						<LNode iedName="None" lnClass="CILO" lnInst="1" lnType="OpenSCD_CILO"/>
					</EqFunction>
				</ConductingEquipment>
				<ConductingEquipment name="QA1" type="CBR" desc="">
					<EqFunction name="Circuit_Breaker">
					</EqFunction>
				</ConductingEquipment>
			</Bay>
		</VoltageLevel>
		<VoltageLevel name="J1" desc="" nomFreq="50" numPhases="3">
			<Voltage unit="V" multiplier="k">20</Voltage>
			<Bay name="Q01" desc="">
				<ConductingEquipment name="QC9" type="DIS" desc="">
					<Terminal name="T1" cNodeName="grounded" substationName="AA1" voltageLevelName="E1" bayName="Q01" connectivityNode="AA1/E1/Q01/grounded"/>
					<EqFunction name="Earth_Switch">
					<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI"/>
						<LNode iedName="None" lnClass="CILO" lnInst="1" lnType="OpenSCD_CILO"/>
						<LNode iedName="None" lnClass="XSWI" lnInst="1" lnType="OpenSCD_XSWI_EarthSwitch"/>
					</EqFunction>
				</ConductingEquipment>
			</Bay>
		</VoltageLevel>
	</Substation>
```
