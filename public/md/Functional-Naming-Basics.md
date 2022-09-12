Functional naming is a concept that allows to create a data model structure in a IED based on the function structure in the substation section. The function structure is constructed from four elements `Function`, `SubFunction`, `EqFunction` and `EqSubFunction` where `SubFunction` is a child of `Function` or `SubFunction` itself and `EqSubFunction` is a child of `EqFunction` or `EqSubFunction` itself.

`Function` as an element is used to add functional structure to non-equipment type process elements like `Substation`, `VoltageLevel`, `Bay`, `Line`, `Process` and others. `EqFunction` can be allocated in equipments as `PowerTransformer`, `ConductingEquipment`, `GeneralEquipment` and others.

This type of structure allows the user of the SCL to group and organize [logical node references]() in the `Substation` section. Let's assume one wants to specify a distance protection within bay 1 that in addition to that shall have a general trip one could either directly reference in the bay 1 as

```xml

<Bay name="bay1">
    <LNode iedName="None" lnClass="PTRC" lnInst="1" lnType="somePTRCtype"/>
    <LNode iedName="None" prefix="Zone1" lnClass="PDIS" lnInst="1" lnType="somePDIStype"/>
    <LNode iedName="None" prefix="Zone2" lnClass="PDIS" lnInst="2" lnType="somePDIStype"/>
    <LNode iedName="None" prefix="Zone3" lnClass="PDIS" lnInst="3" lnType="somePDIStype"/>
    <LNode iedName="None" prefix="Zone4" lnClass="PDIS" lnInst="4" lnType="somePDIStype"/>
</Bay>

```

Although perfectly fine with a growing number of logical node references within the same bay it could not be readable any more. As an alternative the distance protection could be implemented as such

```xml
<Bay name="bay1">
    <Function name="DistanceProtection">
        <LNode iedName="None" lnClass="PTRC" lnInst="1" lnType="somePTRCtype"/>
        <SubFunction name="Zone1">
            <LNode iedName="None" lnClass="PDIS" lnInst="1" lnType="somePDIStype"/>
        </SubFunction>
        <SubFunction name="Zone2">
            <LNode iedName="None" lnClass="PDIS" lnInst="1" lnType="somePDIStype"/>
        </SubFunction>
        <SubFunction name="Zone3">
            <LNode iedName="None" lnClass="PDIS" lnInst="1" lnType="somePDIStype"/>
        </SubFunction>
        <SubFunction name="Zone4">
            <LNode iedName="None" lnClass="PDIS" lnInst="1" lnType="somePDIStype"/>
        </SubFunction>
    </Function>
</Bay>

```

An example for the use of `EqFunction` could be something like:

```xml
<ConductingEquipment name="QB1" type="DIS">
    <Function name="BubBarDisconnector">
        <SubFunction name="Disconnector">
            <LNode iedName="None" lnClass="XSWI" lnInst="1" lnType="someXSWItype"/>
        </SubFunction>
        <SubFunction name="Control">
            <LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="someCSWItype"/>
        </SubFunction>
        <SubFunction name="Interlocking">
            <LNode iedName="None" lnClass="CILO" lnInst="1" lnType="someCILOtype"/>
        </SubFunction>
    </Function>
</ConductingEquipment>

```

Can you guess what it is? Would you be able to if these have been directly referenced in the bay in addition to the distance protection.

> NOTE: The element logical device `LDevice` in the IED has a similar purpose as the function structure in the substation section. It has been designed to structure logical nodes to groups. That is why the function structure can be transformed into logical devices! OpenSCD allows you to do so using [Create SPECIFICATION IED]()

**Create function structure in OpenSCD**
[Manipulate function type elements with OpenSCD](https://github.com/openscd/open-scd/wiki/Function)
