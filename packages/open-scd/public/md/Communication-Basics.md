The `Communication` section in a SCL file allows to specify the network, its access points as well as the configuration of each of the access points.

It has as children at least one `SubNetwork`. It can be configured through the child element `BitRate`. Each `SubNetwork` can have multiple `ConnectedAP` elements, which are pointers to IEDs `AccessPoint` - attributes `iedName` and `apName`. Each `ConnectedAP` has one `Address` element and that has as many `P` elements as there are settings for this particular access point. A `P` element is structured as followed:

```xml
<P type="IP">192.168.210.122</P>
```

The `type` attribute defines the setting type and the inner text (here 192.168.210.122) of the element defines the setting value. There are various other optional setting types defined and OpenSCD supports to set those:

- IP
- IP-SUBNET
- IP-GATEWAY
- OSI-TSEL
- OSI-SSEL
- OSI-PSEL
- OSI-AP-Title
- OSI-AP-Invoke
- OSI-AE-Qualifier
- OSI-AE-Invoke
- OSI-NSAP
- VLAN-ID
- VLAN-PRIORITY
- SNTP-Port
- MMS-Port
- DNSName
- UDP-Port
- TCP-Port
- C37-118-IP-Port
- IPv6
- IPv6-SUBNET
- IPv6-GATEWAY
- IPv6FlowLabel
- IPv6ClassOfTraffic
- IPv6-IGMPv3Src
- IP-IGMPv3Sr
- IP-ClassOfTraffic

Each is backed up with pattern check against the pattern defined in the schema (2007B4).

A very typical `Communication` section might look like this:

```xml
<SubNetwork type="8-MMS" name="Stationbus" desc="Subnetwork">
    <BitRate unit="b/s" multiplier="M">10</BitRate>
    <ConnectedAP iedName="AA1E1Q04MU" apName="AP1">
        <Address>
            <P type="IP">192.168.210.142</P>
            <P type="IP-SUBNET">255.255.255.0</P>
            <P type="IP-GATEWAY">192.168.210.1</P>
            <P type="OSI-PSEL">00000001</P>
            <P type="OSI-SSEL">0001</P>
            <P type="OSI-TSEL">0001</P>
            <P type="OSI-AP-Title">1,3,9999,23</P>
            <P type="OSI-AE-Qualifier">23</P>
        </Address>
    </ConnectedAP>
    <ConnectedAP iedName="AA1E1Q02BCU" apName="AP1" redProt="prp">
        <Address>
            <P type="IP">192.168.210.121</P>
            <P type="IP-SUBNET">255.255.255.0</P>
            <P type="IP-GATEWAY">192.168.210.1</P>
            <P type="OSI-PSEL">00000001</P>
            <P type="OSI-SSEL">0001</P>
            <P type="OSI-TSEL">0001</P>
            <P type="OSI-AP-Title">1,3,9999,23</P>
            <P type="OSI-AE-Qualifier">23</P>
        </Address>
    </ConnectedAP>
</SubNetwork>
```

> NOTE: in addition to the namespace `xmlns="http://www.iec.ch/61850/2003/SCL"` SCL files can have `xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"` as well that allows to faster parse a SCL file for communication type configuration. A `P` type element that can look like this:

```xml
<P xsi:type="tP_IP" type="IP">192.168.210.122</P>
```

In OpenSCD you can configure the

- [SubNetwork](https://github.com/openscd/open-scd/wiki/Subnetwork)
- [ConnectedAP](https://github.com/openscd/open-scd/wiki/ConnectedAP)
