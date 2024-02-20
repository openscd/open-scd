<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
	<Header id="project"/>
    <Substation name="AA1" desc="Substation">
        <VoltageLevel name="J1" desc="Voltage Level">
            <Voltage unit="V" multiplier="k">20</Voltage>
            <Bay name="BusBar A">
                <ConnectivityNode pathName="AA1/J1/BusBar A/L1" name="L1"/>
            </Bay>
            <Bay name="BusBar B">
                <ConnectivityNode pathName="AA1/J1/BusBar B/L1" name="L1"/>
            </Bay>
            <Bay name="Bay A" desc="Feld A">
                <ConductingEquipment type="DIS" name="QB1">
                    <Terminal name="T1" connectivityNode="AA1/J1/BusBar B/L1" substationName="AA1" voltageLevelName="J1" bayName="BusBar B" cNodeName="L1"/>
                    <Terminal name="T3" connectivityNode="AA1/J1/Bay A/L1" substationName="AA1" voltageLevelName="J1" bayName="Bay A" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB2">
                    <Terminal name="T1" connectivityNode="AA1/J1/BusBar A/L1" substationName="AA1" voltageLevelName="J1" bayName="BusBar A" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/Bay A/L1" substationName="AA1" voltageLevelName="J1" bayName="Bay A" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="CBR" name="QA1">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay A/L1" substationName="AA1" voltageLevelName="J1" bayName="Bay A" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/Bay A/L2" substationName="AA1" voltageLevelName="J1" bayName="Bay A" cNodeName="L2"/>
                </ConductingEquipment>
                <ConductingEquipment type="CTR" name="T1">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay A/L2" substationName="AA1" voltageLevelName="J1" bayName="Bay A" cNodeName="L2"/>
                    <Terminal name="T3" connectivityNode="AA1/J1/Bay A/L3" substationName="AA1" voltageLevelName="J1" bayName="Bay A" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="VTR" name="T5">
                    <Terminal name="T11" connectivityNode="AA1/J1/Bay A/L3" substationName="AA1" voltageLevelName="J1" bayName="Bay A" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB9">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay A/L3" substationName="AA1" voltageLevelName="J1" bayName="Bay A" cNodeName="L3"/>
                </ConductingEquipment>
                <ConnectivityNode pathName="AA1/J1/Bay A/L1" name="L1"/>
                <ConnectivityNode pathName="AA1/J1/Bay A/L2" name="L2"/>
                <ConnectivityNode pathName="AA1/J1/Bay A/L3" name="L3"/>
            </Bay>
            <Bay name="Bay B" desc="Feld B">
                <ConductingEquipment type="AAA" name="QB1">
                    <Terminal name="T1" connectivityNode="AA1/J1/BusBar B/L1" substationName="AA1" voltageLevelName="J1" bayName="BusBar B" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/Bay B/L1" substationName="AA1" voltageLevelName="J1" bayName="Bay B" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB2">
                    <Terminal name="T1" connectivityNode="AA1/J1/BusBar A/L1" substationName="AA1" voltageLevelName="J1" bayName="BusBar A" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/Bay B/L1" substationName="AA1" voltageLevelName="J1" bayName="Bay B" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="CBR" name="QA1">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay B/L1" substationName="AA1" voltageLevelName="J1" bayName="Bay B" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/Bay B/L2" substationName="AA1" voltageLevelName="J1" bayName="Bay B" cNodeName="L2"/>
                </ConductingEquipment>
                <ConductingEquipment type="CTR" name="T1">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay B/L2" substationName="AA1" voltageLevelName="J1" bayName="Bay B" cNodeName="L2"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/Bay B/L3" substationName="AA1" voltageLevelName="J1" bayName="Bay B" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="VTR" name="T5">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay B/L3" substationName="AA1" voltageLevelName="J1" bayName="Bay B" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB9">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay B/L3" substationName="AA1" voltageLevelName="J1" bayName="Bay B" cNodeName="L3"/>
                </ConductingEquipment>
                <ConnectivityNode pathName="AA1/J1/Bay B/L1" name="L1"/>
                <ConnectivityNode pathName="AA1/J1/Bay B/L2" name="L2"/>
                <ConnectivityNode pathName="AA1/J1/Bay B/L3" name="L3"/>
            </Bay>
            <Bay name="CoupField">
                <ConductingEquipment type="DIS" name="QB1">
                    <Terminal name="T1" connectivityNode="AA1/J1/BusBar B/L1" substationName="AA1" voltageLevelName="J1" bayName="BusBar B" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/CoupField/L1" substationName="AA1" voltageLevelName="J1" bayName="CoupField" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="CBR" name="QA1">
                    <Terminal name="T1" connectivityNode="AA1/J1/CoupField/L1" substationName="AA1" voltageLevelName="J1" bayName="CoupField" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/CoupField/L2" substationName="AA1" voltageLevelName="J1" bayName="CoupField" cNodeName="L2"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB2">
                    <LNode iedName="Relay_FIELDC" ldInst="Disc_QB1" prefix="" lnClass="XSWI" lnInst="1"/>
                    <LNode iedName="Relay_FIELDC" ldInst="Disc_QB1" prefix="" lnClass="CSWI" lnInst="1"/>
                    <LNode iedName="Relay_FIELDC" ldInst="Disc_QB1" prefix="" lnClass="CILO" lnInst="1"/>
                    <Terminal name="T1" connectivityNode="AA1/J1/BusBar A/L1" substationName="AA1" voltageLevelName="J1" bayName="BusBar A" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/CoupField/L2" substationName="AA1" voltageLevelName="J1" bayName="CoupField" cNodeName="L2"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QC11">
                    <Terminal name="T2" cNodeName="grounded"/>
                    <Terminal name="T1" connectivityNode="AA1/J1/BusBar B/L1" substationName="AA1" voltageLevelName="J1" bayName="BusBar B" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QC12">
                    <Terminal name="T2" cNodeName="grounded"/>
                    <Terminal name="T1" connectivityNode="AA1/J1/BusBar A/L1" substationName="AA1" voltageLevelName="J1" bayName="BusBar A" cNodeName="L1"/>
                </ConductingEquipment>
                <ConnectivityNode pathName="AA1/J1/CoupField/L1" name="L1"/>
                <ConnectivityNode pathName="AA1/J1/CoupField/L2" name="L2"/>
            </Bay>
            <Bay name="Bay C" desc="Feld C">
                <ConductingEquipment type="DIS" name="QB1">
                    <Terminal name="T1" connectivityNode="AA1/J1/BusBar B/L1" substationName="AA1" voltageLevelName="J1" bayName="BusBar B" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/Bay C/L1" substationName="AA1" voltageLevelName="J1" bayName="Bay C" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB2">
                    <Terminal name="T1" connectivityNode="AA1/J1/BusBar A/L1" substationName="AA1" voltageLevelName="J1" bayName="BusBar A" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/Bay C/L1" substationName="AA1" voltageLevelName="J1" bayName="Bay C" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="CBR" name="QA1">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay C/L1" substationName="AA1" voltageLevelName="J1" bayName="Bay C" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/Bay C/L2" substationName="AA1" voltageLevelName="J1" bayName="Bay C" cNodeName="L2"/>
                </ConductingEquipment>
                <ConductingEquipment type="CTR" name="T1">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay C/L2" substationName="AA1" voltageLevelName="J1" bayName="Bay C" cNodeName="L2"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/Bay C/L3" substationName="AA1" voltageLevelName="J1" bayName="Bay C" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="VTR" name="T5">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay C/L3" substationName="AA1" voltageLevelName="J1" bayName="Bay C" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB9">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay C/L3" substationName="AA1" voltageLevelName="J1" bayName="Bay C" cNodeName="L3"/>
                </ConductingEquipment>
                <ConnectivityNode pathName="AA1/J1/Bay C/L1" name="L1"/>
                <ConnectivityNode pathName="AA1/J1/Bay C/L2" name="L2"/>
                <ConnectivityNode pathName="AA1/J1/Bay C/L3" name="L3"/>
            </Bay>
            <Bay name="Bay D" desc="Feld D">
                <ConductingEquipment type="DIS" name="QB1">
                    <Terminal name="T1" connectivityNode="AA1/J1/BusBar B/L1" substationName="AA1" voltageLevelName="J1" bayName="BusBar B" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/Bay D/L1" substationName="AA1" voltageLevelName="J1" bayName="Bay D" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB2">
                    <Terminal name="T1" connectivityNode="AA1/J1/BusBar A/L1" substationName="AA1" voltageLevelName="J1" bayName="BusBar A" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/Bay D/L1" substationName="AA1" voltageLevelName="J1" bayName="Bay D" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="CBR" name="QA1">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay D/L1" substationName="AA1" voltageLevelName="J1" bayName="Bay D" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/Bay D/L2" substationName="AA1" voltageLevelName="J1" bayName="Bay D" cNodeName="L2"/>
                </ConductingEquipment>
                <ConductingEquipment type="CTR" name="T1">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay D/L2" substationName="AA1" voltageLevelName="J1" bayName="Bay D" cNodeName="L2"/>
                    <Terminal name="T2" connectivityNode="AA1/J1/Bay D/L3" substationName="AA1" voltageLevelName="J1" bayName="Bay D" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB9">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay D/L3" substationName="AA1" voltageLevelName="J1" bayName="Bay D" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="VTR" name="T5">
                    <Terminal name="T1" connectivityNode="AA1/J1/Bay D/L3" substationName="AA1" voltageLevelName="J1" bayName="Bay D" cNodeName="L3"/>
                </ConductingEquipment>
                <ConnectivityNode pathName="AA1/J1/Bay D/L1" name="L1"/>
                <ConnectivityNode pathName="AA1/J1/Bay D/L2" name="L2"/>
                <ConnectivityNode pathName="AA1/J1/Bay D/L3" name="L3"/>
            </Bay>
        </VoltageLevel>
    </Substation>
    <Substation name="AA2" desc="Substation">
        <VoltageLevel name="J1" desc="Voltage Level">
            <Voltage unit="V" multiplier="k">20</Voltage>
            <Bay name="BusBar A">
                <ConnectivityNode pathName="AA2/J1/BusBar A/L1" name="L1"/>
            </Bay>
            <Bay name="BusBar B">
                <ConnectivityNode pathName="AA2/J1/BusBar B/L1" name="L1"/>
            </Bay>
            <Bay name="Bay A" desc="Feld A">
                <ConductingEquipment type="DIS" name="QB1">
                    <Terminal name="T1" connectivityNode="AA2/J1/BusBar B/L1" substationName="AA2" voltageLevelName="J1" bayName="BusBar B" cNodeName="L1"/>
                    <Terminal name="T3" connectivityNode="AA2/J1/Bay A/L1" substationName="AA2" voltageLevelName="J1" bayName="Bay A" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB2">
                    <Terminal name="T1" connectivityNode="AA2/J1/BusBar A/L1" substationName="AA2" voltageLevelName="J1" bayName="BusBar A" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/Bay A/L1" substationName="AA2" voltageLevelName="J1" bayName="Bay A" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="CBR" name="QA1">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay A/L1" substationName="AA2" voltageLevelName="J1" bayName="Bay A" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/Bay A/L2" substationName="AA2" voltageLevelName="J1" bayName="Bay A" cNodeName="L2"/>
                </ConductingEquipment>
                <ConductingEquipment type="CTR" name="T1">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay A/L2" substationName="AA2" voltageLevelName="J1" bayName="Bay A" cNodeName="L2"/>
                    <Terminal name="T3" connectivityNode="AA2/J1/Bay A/L3" substationName="AA2" voltageLevelName="J1" bayName="Bay A" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="VTR" name="T5">
                    <Terminal name="T11" connectivityNode="AA2/J1/Bay A/L3" substationName="AA2" voltageLevelName="J1" bayName="Bay A" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB9">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay A/L3" substationName="AA2" voltageLevelName="J1" bayName="Bay A" cNodeName="L3"/>
                </ConductingEquipment>
                <ConnectivityNode pathName="AA2/J1/Bay A/L1" name="L1"/>
                <ConnectivityNode pathName="AA2/J1/Bay A/L2" name="L2"/>
                <ConnectivityNode pathName="AA2/J1/Bay A/L3" name="L3"/>
            </Bay>
            <Bay name="Bay B" desc="Feld B">
                <ConductingEquipment type="AAA" name="QB1">
                    <Terminal name="T1" connectivityNode="AA2/J1/BusBar B/L1" substationName="AA2" voltageLevelName="J1" bayName="BusBar B" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/Bay B/L1" substationName="AA2" voltageLevelName="J1" bayName="Bay B" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB2">
                    <Terminal name="T1" connectivityNode="AA2/J1/BusBar A/L1" substationName="AA2" voltageLevelName="J1" bayName="BusBar A" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/Bay B/L1" substationName="AA2" voltageLevelName="J1" bayName="Bay B" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="CBR" name="QA1">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay B/L1" substationName="AA2" voltageLevelName="J1" bayName="Bay B" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/Bay B/L2" substationName="AA2" voltageLevelName="J1" bayName="Bay B" cNodeName="L2"/>
                </ConductingEquipment>
                <ConductingEquipment type="CTR" name="T1">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay B/L2" substationName="AA2" voltageLevelName="J1" bayName="Bay B" cNodeName="L2"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/Bay B/L3" substationName="AA2" voltageLevelName="J1" bayName="Bay B" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="VTR" name="T5">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay B/L3" substationName="AA2" voltageLevelName="J1" bayName="Bay B" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB9">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay B/L3" substationName="AA2" voltageLevelName="J1" bayName="Bay B" cNodeName="L3"/>
                </ConductingEquipment>
                <ConnectivityNode pathName="AA2/J1/Bay B/L1" name="L1"/>
                <ConnectivityNode pathName="AA2/J1/Bay B/L2" name="L2"/>
                <ConnectivityNode pathName="AA2/J1/Bay B/L3" name="L3"/>
            </Bay>
            <Bay name="CoupField">
                <ConductingEquipment type="DIS" name="QB1">
                    <Terminal name="T1" connectivityNode="AA2/J1/BusBar B/L1" substationName="AA2" voltageLevelName="J1" bayName="BusBar B" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/CoupField/L1" substationName="AA2" voltageLevelName="J1" bayName="CoupField" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="CBR" name="QA1">
                    <Terminal name="T1" connectivityNode="AA2/J1/CoupField/L1" substationName="AA2" voltageLevelName="J1" bayName="CoupField" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/CoupField/L2" substationName="AA2" voltageLevelName="J1" bayName="CoupField" cNodeName="L2"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB2">
                    <LNode iedName="Relay_FIELDC" ldInst="Disc_QB1" prefix="" lnClass="XSWI" lnInst="1"/>
                    <LNode iedName="Relay_FIELDC" ldInst="Disc_QB1" prefix="" lnClass="CSWI" lnInst="1"/>
                    <LNode iedName="Relay_FIELDC" ldInst="Disc_QB1" prefix="" lnClass="CILO" lnInst="1"/>
                    <Terminal name="T1" connectivityNode="AA2/J1/BusBar A/L1" substationName="AA2" voltageLevelName="J1" bayName="BusBar A" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/CoupField/L2" substationName="AA2" voltageLevelName="J1" bayName="CoupField" cNodeName="L2"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QC11">
                    <Terminal name="T2" cNodeName="grounded"/>
                    <Terminal name="T1" connectivityNode="AA2/J1/BusBar B/L1" substationName="AA2" voltageLevelName="J1" bayName="BusBar B" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QC12">
                    <Terminal name="T2" cNodeName="grounded"/>
                    <Terminal name="T1" connectivityNode="AA2/J1/BusBar A/L1" substationName="AA2" voltageLevelName="J1" bayName="BusBar A" cNodeName="L1"/>
                </ConductingEquipment>
                <ConnectivityNode pathName="AA2/J1/CoupField/L1" name="L1"/>
                <ConnectivityNode pathName="AA2/J1/CoupField/L2" name="L2"/>
            </Bay>
            <Bay name="Bay C" desc="Feld C">
                <ConductingEquipment type="DIS" name="QB1">
                    <Terminal name="T1" connectivityNode="AA2/J1/BusBar B/L1" substationName="AA2" voltageLevelName="J1" bayName="BusBar B" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/Bay C/L1" substationName="AA2" voltageLevelName="J1" bayName="Bay C" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB2">
                    <Terminal name="T1" connectivityNode="AA2/J1/BusBar A/L1" substationName="AA2" voltageLevelName="J1" bayName="BusBar A" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/Bay C/L1" substationName="AA2" voltageLevelName="J1" bayName="Bay C" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="CBR" name="QA1">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay C/L1" substationName="AA2" voltageLevelName="J1" bayName="Bay C" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/Bay C/L2" substationName="AA2" voltageLevelName="J1" bayName="Bay C" cNodeName="L2"/>
                </ConductingEquipment>
                <ConductingEquipment type="CTR" name="T1">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay C/L2" substationName="AA2" voltageLevelName="J1" bayName="Bay C" cNodeName="L2"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/Bay C/L3" substationName="AA2" voltageLevelName="J1" bayName="Bay C" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="VTR" name="T5">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay C/L3" substationName="AA2" voltageLevelName="J1" bayName="Bay C" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB9">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay C/L3" substationName="AA2" voltageLevelName="J1" bayName="Bay C" cNodeName="L3"/>
                </ConductingEquipment>
                <ConnectivityNode pathName="AA2/J1/Bay C/L1" name="L1"/>
                <ConnectivityNode pathName="AA2/J1/Bay C/L2" name="L2"/>
                <ConnectivityNode pathName="AA2/J1/Bay C/L3" name="L3"/>
            </Bay>
            <Bay name="Bay D" desc="Feld D">
                <ConductingEquipment type="DIS" name="QB1">
                    <Terminal name="T1" connectivityNode="AA2/J1/BusBar B/L1" substationName="AA2" voltageLevelName="J1" bayName="BusBar B" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/Bay D/L1" substationName="AA2" voltageLevelName="J1" bayName="Bay D" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB2">
                    <Terminal name="T1" connectivityNode="AA2/J1/BusBar A/L1" substationName="AA2" voltageLevelName="J1" bayName="BusBar A" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/Bay D/L1" substationName="AA2" voltageLevelName="J1" bayName="Bay D" cNodeName="L1"/>
                </ConductingEquipment>
                <ConductingEquipment type="CBR" name="QA1">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay D/L1" substationName="AA2" voltageLevelName="J1" bayName="Bay D" cNodeName="L1"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/Bay D/L2" substationName="AA2" voltageLevelName="J1" bayName="Bay D" cNodeName="L2"/>
                </ConductingEquipment>
                <ConductingEquipment type="CTR" name="T1">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay D/L2" substationName="AA2" voltageLevelName="J1" bayName="Bay D" cNodeName="L2"/>
                    <Terminal name="T2" connectivityNode="AA2/J1/Bay D/L3" substationName="AA2" voltageLevelName="J1" bayName="Bay D" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="DIS" name="QB9">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay D/L3" substationName="AA2" voltageLevelName="J1" bayName="Bay D" cNodeName="L3"/>
                </ConductingEquipment>
                <ConductingEquipment type="VTR" name="T5">
                    <Terminal name="T1" connectivityNode="AA2/J1/Bay D/L3" substationName="AA2" voltageLevelName="J1" bayName="Bay D" cNodeName="L3"/>
                </ConductingEquipment>
                <ConnectivityNode pathName="AA2/J1/Bay D/L1" name="L1"/>
                <ConnectivityNode pathName="AA2/J1/Bay D/L2" name="L2"/>
                <ConnectivityNode pathName="AA2/J1/Bay D/L3" name="L3"/>
            </Bay>
        </VoltageLevel>
    </Substation>
</SCL>