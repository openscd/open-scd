<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
    <Communication>
        <SubNetwork name="SN1" type="Ethernet">
            <ConnectedAP iedName="IED1" apName="AP1">
            </ConnectedAP>
            <ConnectedAP iedName="IED1" apName="AP3">
            </ConnectedAP>
        </SubNetwork>
        <SubNetwork name="SN2" type="Ethernet">
            <ConnectedAP iedName="IED1" apName="AP2">
                <GSE ldInst="LD1" cbName="GSE1">
                </GSE>
                <SMV ldInst="LD1" cbName="SM1">
                </SMV>
            </ConnectedAP>
            <ConnectedAP iedName="IED1" apName="AP4">
            </ConnectedAP>
        </SubNetwork>
    </Communication>
    <IED name="IED1">
        <AccessPoint name="AP1" type="IED">
            <Server>
                <LDevice inst="LD1">
                    <LN0 lnClass="LLN0" lnInst="INST1">
                        <GSEControl name="GSE1" desc="GSE Control Example" appID="GSEApp1" confRev="1" />
                        <SampledValueControl name="SM1" />
                    </LN0>
                </LDevice>
            </Server>
        </AccessPoint>
        <AccessPoint name="AP2">
           <ServerAt apName="AP1" />
        </AccessPoint>
        <AccessPoint name="AP3">
        </AccessPoint>
        <AccessPoint name="AP4">
           <ServerAt apName="AP1" />
        </AccessPoint>
    </IED>
</SCL>
