<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:lcmtn_ext="https://www.locamation.com/61850/VMU/SCL" version="2007" revision="B" release="4">
	<Header id="IEC station 1" version="1" revision="45" toolID="IEC 61850 System Configurator, Version: 6.60.34" nameStructure="IEDName">
	</Header>
	<Communication>
		<SubNetwork name="Default_subnet" type="8-MMS">
			<ConnectedAP iedName="SIP_Client" apName="E">
				<Address>
					<P type="IP" xsi:type="tP_IP">172.16.0.2</P>
					<P type="IP-SUBNET" xsi:type="tP_IP-SUBNET">255.255.255.0</P>
					<P type="OSI-AP-Title">1,3,9999,23</P>
					<P type="OSI-AE-Qualifier">23</P>
					<P type="OSI-PSEL">00000001</P>
					<P type="OSI-SSEL">0001</P>
					<P type="OSI-TSEL">0001</P>
				</Address>
				<GSE ldInst="VI3p1" cbName="Control_DataSet">
					<Address>
						<P type="MAC-Address" xsi:type="tP_MAC-Address">01-0C-CD-01-00-01</P>
						<P type="VLAN-ID" xsi:type="tP_VLAN-ID">000</P>
						<P type="VLAN-PRIORITY" xsi:type="tP_VLAN-PRIORITY">4</P>
						<P type="APPID" xsi:type="tP_APPID">0002</P>
					</Address>
					<MinTime unit="s" multiplier="m">10</MinTime>
					<MaxTime unit="s" multiplier="m">2000</MaxTime>
				</GSE>
			</ConnectedAP>
			<ConnectedAP iedName="SIP_Merg" apName="E">
				<Address>
					<P type="IP" xsi:type="tP_IP">172.16.0.3</P>
					<P type="IP-SUBNET" xsi:type="tP_IP-SUBNET">255.255.255.0</P>
					<P type="OSI-AP-Title">1,3,9999,23</P>
					<P type="OSI-AE-Qualifier">23</P>
					<P type="OSI-PSEL">00000001</P>
					<P type="OSI-SSEL">0001</P>
					<P type="OSI-TSEL">0001</P>
				</Address>
			</ConnectedAP>
			<ConnectedAP iedName="T_VMU_Alliander" apName="AP1">
				<SMV ldInst="MU01" cbName="MSVCB01">
					<Address>
						<P type="MAC-Address">01-0C-CD-04-00-01</P>
						<P type="VLAN-ID">000</P>
						<P type="VLAN-PRIORITY">4</P>
						<P type="APPID">4000</P>
					</Address>
				</SMV>
			</ConnectedAP>
		</SubNetwork>
	</Communication>
	<IED desc="Merging Unit" name="T_VMU_Alliander" manufacturer="Locamation B.V." configVersion="1.0" originalSclVersion="2007" originalSclRevision="B" owner="IEC station 1" originalSclRelease="4">
		<Services nameLength="64">
			<ConfDataSet max="1" maxAttributes="200" modify="true"/>
			<SMVsc max="2"/>
		</Services>
		<AccessPoint name="AP1">
			<Server>
				<Authentication none="true"/>
				<LDevice desc="Merging Unit" inst="MU01">
					<LN0 lnClass="LLN0" inst="" lnType="LLN0_LCMTN_MU">
						<DataSet name="PhsMeas1">
							<Private type="Siemens-GUID">78da864be40a4f0d95b49dd95d36358a</Private>
							<FCDA ldInst="MU01" prefix="I01A" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MU01" prefix="I01A" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="MU01" prefix="I01B" lnClass="TCTR" lnInst="2" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MU01" prefix="I01B" lnClass="TCTR" lnInst="2" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="MU01" prefix="I01C" lnClass="TCTR" lnInst="3" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MU01" prefix="I01C" lnClass="TCTR" lnInst="3" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="MU01" prefix="I01N" lnClass="TCTR" lnInst="4" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MU01" prefix="I01N" lnClass="TCTR" lnInst="4" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="MU01" prefix="V01A" lnClass="TVTR" lnInst="1" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MU01" prefix="V01A" lnClass="TVTR" lnInst="1" doName="VolSv" daName="q" fc="MX"/>
							<FCDA ldInst="MU01" prefix="V01B" lnClass="TVTR" lnInst="2" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MU01" prefix="V01B" lnClass="TVTR" lnInst="2" doName="VolSv" daName="q" fc="MX"/>
							<FCDA ldInst="MU01" prefix="V01C" lnClass="TVTR" lnInst="3" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MU01" prefix="V01C" lnClass="TVTR" lnInst="3" doName="VolSv" daName="q" fc="MX"/>
							<FCDA ldInst="MU01" prefix="V01N" lnClass="TVTR" lnInst="4" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="MU01" prefix="V01N" lnClass="TVTR" lnInst="4" doName="VolSv" daName="q" fc="MX"/>
						</DataSet>
						<SampledValueControl datSet="PhsMeas1" confRev="1" smvID="MU0101" multicast="true" smpRate="80" nofASDU="1" smpMod="SmpPerPeriod" name="MSVCB01">
							<IEDName apRef="E">SIP_Client</IEDName>
							<SmvOpts refreshTime="false" sampleSynchronized="true" sampleRate="false" dataSet="false" security="false"/>
						</SampledValueControl>
					</LN0>
					<LN lnClass="LPHD" inst="1" lnType="LPHD_LCMTN_MU">
						<DOI name="MaxDl">
							<SDI name="units">
								<DAI name="SIUnit">
									<Val>s</Val>
								</DAI>
								<DAI name="multiplier">
									<Val>µ</Val>
								</DAI>
							</SDI>
							<DAI name="setVal">
								<Val>100</Val>
							</DAI>
						</DOI>
					</LN>
					<LN prefix="I01A" lnClass="TCTR" inst="1" lnType="TCTR_LCMTN">
						<Private type="LCMTN_VMU_SENSOR">
							<lcmtn_ext:P type="VERSION">1</lcmtn_ext:P>
							<lcmtn_ext:P type="IDENTIFIER">10.12.14</lcmtn_ext:P>
							<lcmtn_ext:P type="CHANNEL">0</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-PRIMARY">1000</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-SECONDARY">20</lcmtn_ext:P>
						</Private>
						<DOI name="HzRtg">
							<SDI name="units">
								<DAI name="SIUnit">
									<Val>Hz</Val>
								</DAI>
							</SDI>
							<SDI name="setMag">
								<DAI name="i">
									<Val>50</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="Clip">
							<SDI name="setMag">
								<DAI name="i">
									<Val>100</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="AmpSv">
							<SDI name="sVC">
								<DAI name="scaleFactor">
									<Val>0.001</Val>
								</DAI>
								<DAI name="offset">
									<Val>0</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="ARtg">
							<SDI name="units">
								<DAI name="SIUnit">
									<Val>A</Val>
								</DAI>
							</SDI>
							<SDI name="setMag">
								<DAI name="i">
									<Val>1000</Val>
								</DAI>
							</SDI>
						</DOI>
					</LN>
					<LN prefix="I01B" lnClass="TCTR" inst="2" lnType="TCTR_LCMTN">
						<Private type="LCMTN_VMU_SENSOR">
							<lcmtn_ext:P type="VERSION">1</lcmtn_ext:P>
							<lcmtn_ext:P type="IDENTIFIER">10.12.14</lcmtn_ext:P>
							<lcmtn_ext:P type="CHANNEL">1</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-PRIMARY">1000</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-SECONDARY">20</lcmtn_ext:P>
						</Private>
						<DOI name="HzRtg" desc="">
							<SDI name="units" desc="">
								<DAI desc="" name="SIUnit">
									<Val>Hz</Val>
								</DAI>
							</SDI>
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>50</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="Clip" desc="">
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>100</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="AmpSv" desc="">
							<SDI name="sVC" desc="">
								<DAI desc="" name="scaleFactor">
									<Val>0.001</Val>
								</DAI>
								<DAI desc="" name="offset">
									<Val>0</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="ARtg" desc="">
							<SDI name="units" desc="">
								<DAI desc="" name="SIUnit">
									<Val>A</Val>
								</DAI>
							</SDI>
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>1000</Val>
								</DAI>
							</SDI>
						</DOI>
					</LN>
					<LN prefix="I01C" lnClass="TCTR" inst="3" lnType="TCTR_LCMTN">
						<Private type="LCMTN_VMU_SENSOR">
							<lcmtn_ext:P type="VERSION">1</lcmtn_ext:P>
							<lcmtn_ext:P type="IDENTIFIER">10.12.14</lcmtn_ext:P>
							<lcmtn_ext:P type="CHANNEL">2</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-PRIMARY">1000</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-SECONDARY">20</lcmtn_ext:P>
						</Private>
						<DOI name="HzRtg" desc="">
							<SDI name="units" desc="">
								<DAI desc="" name="SIUnit">
									<Val>Hz</Val>
								</DAI>
							</SDI>
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>50</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="Clip" desc="">
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>100</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="AmpSv" desc="">
							<SDI name="sVC" desc="">
								<DAI desc="" name="scaleFactor">
									<Val>0.001</Val>
								</DAI>
								<DAI desc="" name="offset">
									<Val>0</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="ARtg" desc="">
							<SDI name="units" desc="">
								<DAI desc="" name="SIUnit">
									<Val>A</Val>
								</DAI>
							</SDI>
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>1000</Val>
								</DAI>
							</SDI>
						</DOI>
					</LN>
					<LN prefix="I01N" lnClass="TCTR" inst="4" lnType="TCTR_LCMTN">
						<Private type="LCMTN_VMU_SENSOR">
							<lcmtn_ext:P type="VERSION">1</lcmtn_ext:P>
							<lcmtn_ext:P type="IDENTIFIER">10.12.14</lcmtn_ext:P>
							<lcmtn_ext:P type="SUM">0,1,2</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-PRIMARY">1000</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-SECONDARY">20</lcmtn_ext:P>
						</Private>
						<DOI name="HzRtg" desc="">
							<SDI name="units" desc="">
								<DAI desc="" name="SIUnit">
									<Val>Hz</Val>
								</DAI>
							</SDI>
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>50</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="Clip" desc="">
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>100</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="AmpSv" desc="">
							<SDI name="sVC" desc="">
								<DAI desc="" name="scaleFactor">
									<Val>0.001</Val>
								</DAI>
								<DAI desc="" name="offset">
									<Val>0</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="ARtg" desc="">
							<SDI name="units" desc="">
								<DAI desc="" name="SIUnit">
									<Val>A</Val>
								</DAI>
							</SDI>
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>1000</Val>
								</DAI>
							</SDI>
						</DOI>
					</LN>
					<LN prefix="V01A" lnClass="TVTR" inst="1" lnType="TVTR_LCMTN">
						<Private type="LCMTN_VMU_SENSOR">
							<lcmtn_ext:P type="VERSION">1</lcmtn_ext:P>
							<lcmtn_ext:P type="IDENTIFIER">10.12.16</lcmtn_ext:P>
							<lcmtn_ext:P type="CHANNEL">0</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-PRIMARY">1000</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-SECONDARY">20</lcmtn_ext:P>
						</Private>
						<DOI name="HzRtg">
							<SDI name="setMag">
								<DAI name="i">
									<Val>50</Val>
								</DAI>
							</SDI>
							<SDI name="units">
								<DAI name="SIUnit">
									<Val>Hz</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="Clip">
							<SDI name="setMag">
								<DAI name="i">
									<Val>100</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="VolSv">
							<SDI name="sVC">
								<DAI name="scaleFactor">
									<Val>0.01</Val>
								</DAI>
								<DAI name="offset">
									<Val>0</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="VRtg">
							<SDI name="setMag">
								<DAI name="i">
									<Val>110</Val>
								</DAI>
							</SDI>
							<SDI name="units">
								<DAI name="SIUnit">
									<Val>V</Val>
								</DAI>
								<DAI name="multiplier">
									<Val>k</Val>
								</DAI>
							</SDI>
						</DOI>
					</LN>
					<LN prefix="V01B" lnClass="TVTR" inst="2" lnType="TVTR_LCMTN">
						<Private type="LCMTN_VMU_SENSOR">
							<lcmtn_ext:P type="VERSION">1</lcmtn_ext:P>
							<lcmtn_ext:P type="IDENTIFIER">10.12.16</lcmtn_ext:P>
							<lcmtn_ext:P type="CHANNEL">1</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-PRIMARY">1000</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-SECONDARY">20</lcmtn_ext:P>
						</Private>
						<DOI name="HzRtg" desc="">
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>50</Val>
								</DAI>
							</SDI>
							<SDI name="units" desc="">
								<DAI desc="" name="SIUnit">
									<Val>Hz</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="Clip" desc="">
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>100</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="VolSv" desc="">
							<SDI name="sVC" desc="">
								<DAI desc="" name="scaleFactor">
									<Val>0.01</Val>
								</DAI>
								<DAI desc="" name="offset">
									<Val>0</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="VRtg">
							<SDI name="setMag">
								<DAI name="i">
									<Val>110</Val>
								</DAI>
							</SDI>
							<SDI name="units">
								<DAI name="SIUnit">
									<Val>V</Val>
								</DAI>
								<DAI name="multiplier">
									<Val>k</Val>
								</DAI>
							</SDI>
						</DOI>
					</LN>
					<LN prefix="V01C" lnClass="TVTR" inst="3" lnType="TVTR_LCMTN">
						<Private type="LCMTN_VMU_SENSOR">
							<lcmtn_ext:P type="VERSION">1</lcmtn_ext:P>
							<lcmtn_ext:P type="IDENTIFIER">10.12.16</lcmtn_ext:P>
							<lcmtn_ext:P type="CHANNEL">2</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-PRIMARY">1000</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-SECONDARY">20</lcmtn_ext:P>
						</Private>
						<DOI name="HzRtg" desc="">
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>50</Val>
								</DAI>
							</SDI>
							<SDI name="units" desc="">
								<DAI desc="" name="SIUnit">
									<Val>Hz</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="Clip" desc="">
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>100</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="VolSv" desc="">
							<SDI name="sVC" desc="">
								<DAI desc="" name="scaleFactor">
									<Val>0.01</Val>
								</DAI>
								<DAI desc="" name="offset">
									<Val>0</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="VRtg">
							<SDI name="setMag">
								<DAI name="i">
									<Val>110</Val>
								</DAI>
							</SDI>
							<SDI name="units">
								<DAI name="SIUnit">
									<Val>V</Val>
								</DAI>
								<DAI name="multiplier">
									<Val>k</Val>
								</DAI>
							</SDI>
						</DOI>
					</LN>
					<LN prefix="V01N" lnClass="TVTR" inst="4" lnType="TVTR_LCMTN">
						<Private type="LCMTN_VMU_SENSOR">
							<lcmtn_ext:P type="VERSION">1</lcmtn_ext:P>
							<lcmtn_ext:P type="IDENTIFIER">10.12.16</lcmtn_ext:P>
							<lcmtn_ext:P type="SUM">0,1,2</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-PRIMARY">1000</lcmtn_ext:P>
							<lcmtn_ext:P type="TRANSFORM-SECONDARY">20</lcmtn_ext:P>
						</Private>
						<DOI name="HzRtg" desc="">
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>50</Val>
								</DAI>
							</SDI>
							<SDI name="units" desc="">
								<DAI desc="" name="SIUnit">
									<Val>Hz</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="Clip" desc="">
							<SDI name="setMag" desc="">
								<DAI desc="" name="i">
									<Val>100</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="VolSv" desc="">
							<SDI name="sVC" desc="">
								<DAI desc="" name="scaleFactor">
									<Val>0.01</Val>
								</DAI>
								<DAI desc="" name="offset">
									<Val>0</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="VRtg">
							<SDI name="setMag">
								<DAI name="i">
									<Val>110</Val>
								</DAI>
							</SDI>
							<SDI name="units">
								<DAI name="SIUnit">
									<Val>V</Val>
								</DAI>
								<DAI name="multiplier">
									<Val>k</Val>
								</DAI>
							</SDI>
						</DOI>
					</LN>
				</LDevice>
        <LDevice desc="Merging Unit" inst="MU02">
          <LN0 lnClass="LLN0" inst="" lnType="LLN0_LCMTN_MU">
            <DataSet name="PhsMeas1">
              <Private type="Siemens-GUID">78da864be40a4f0d95b49dd95d36358a</Private>
              <FCDA ldInst="MU01" prefix="I01A" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="instMag.i" fc="MX"/>
              <FCDA ldInst="MU01" prefix="I01A" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="q" fc="MX"/>
              <FCDA ldInst="MU01" prefix="I01B" lnClass="TCTR" lnInst="2" doName="AmpSv" daName="instMag.i" fc="MX"/>
              <FCDA ldInst="MU01" prefix="I01B" lnClass="TCTR" lnInst="2" doName="AmpSv" daName="q" fc="MX"/>
              <FCDA ldInst="MU01" prefix="I01C" lnClass="TCTR" lnInst="3" doName="AmpSv" daName="instMag.i" fc="MX"/>
              <FCDA ldInst="MU01" prefix="I01C" lnClass="TCTR" lnInst="3" doName="AmpSv" daName="q" fc="MX"/>
              <FCDA ldInst="MU01" prefix="I01N" lnClass="TCTR" lnInst="4" doName="AmpSv" daName="instMag.i" fc="MX"/>
              <FCDA ldInst="MU01" prefix="I01N" lnClass="TCTR" lnInst="4" doName="AmpSv" daName="q" fc="MX"/>
              <FCDA ldInst="MU01" prefix="V01A" lnClass="TVTR" lnInst="1" doName="VolSv" daName="instMag.i" fc="MX"/>
              <FCDA ldInst="MU01" prefix="V01A" lnClass="TVTR" lnInst="1" doName="VolSv" daName="q" fc="MX"/>
              <FCDA ldInst="MU01" prefix="V01B" lnClass="TVTR" lnInst="2" doName="VolSv" daName="instMag.i" fc="MX"/>
              <FCDA ldInst="MU01" prefix="V01B" lnClass="TVTR" lnInst="2" doName="VolSv" daName="q" fc="MX"/>
              <FCDA ldInst="MU01" prefix="V01C" lnClass="TVTR" lnInst="3" doName="VolSv" daName="instMag.i" fc="MX"/>
              <FCDA ldInst="MU01" prefix="V01C" lnClass="TVTR" lnInst="3" doName="VolSv" daName="q" fc="MX"/>
              <FCDA ldInst="MU01" prefix="V01N" lnClass="TVTR" lnInst="4" doName="VolSv" daName="instMag.i" fc="MX"/>
              <FCDA ldInst="MU01" prefix="V01N" lnClass="TVTR" lnInst="4" doName="VolSv" daName="q" fc="MX"/>
            </DataSet>
            <SampledValueControl datSet="PhsMeas1" confRev="1" smvID="MU0101" multicast="true" smpRate="80" nofASDU="1" smpMod="SmpPerPeriod" name="MSVCB01">
              <IEDName apRef="E">SIP_Client</IEDName>
              <SmvOpts refreshTime="false" sampleSynchronized="true" sampleRate="false" dataSet="false" security="false"/>
            </SampledValueControl>
          </LN0>
          <LN lnClass="LPHD" inst="1" lnType="LPHD_LCMTN_MU">
            <DOI name="MaxDl">
              <SDI name="units">
                <DAI name="SIUnit">
                  <Val>s</Val>
                </DAI>
                <DAI name="multiplier">
                  <Val>µ</Val>
                </DAI>
              </SDI>
              <DAI name="setVal">
                <Val>100</Val>
              </DAI>
            </DOI>
          </LN>
        </LDevice>
			</Server>
			<Services/>
		</AccessPoint>
	</IED>
	<DataTypeTemplates>
		<LNodeType id="LLN0_LCMTN_MU" lnClass="LLN0">
			<DO name="NamPlt" type="LPL_LD2007"/>
			<DO name="Beh" type="ENS_Beh"/>
			<DO name="Health" type="ENS_Health"/>
			<DO name="LocKey" type="SPS_noSVnoBL"/>
			<DO name="Loc" type="SPS_noSVnoBL"/>
			<DO name="Mod" type="ENC_Mod_direct"/>
			<DO name="LocSta" type="SPC_direct"/>
			<DO name="Diag" type="SPC_direct"/>
			<DO name="LEDRs" type="SPC_direct"/>
			<DO name="MltLev" type="SPG_SP"/>
		</LNodeType>
		<LNodeType id="LPHD_LCMTN_MU" lnClass="LPHD">
			<DO name="PhyNam" type="DPL_Full"/>
			<DO name="PhyHealth" type="ENS_Health"/>
			<DO name="Proxy" type="SPS_noSVnoBL"/>
			<DO name="MaxDl" type="ING_LCMTN_ScndTmms"/>
		</LNodeType>
		<LNodeType id="TCTR_LCMTN" lnClass="TCTR">
			<DO name="Beh" type="ENS_BehaviourModeKind"/>
			<DO name="HoldTmms" type="ING"/>
			<DO name="HzRtg" type="ASG_LCMTN_ARtg"/>
			<DO name="Clip" type="ASG_LCMTN_ARtg"/>
			<DO name="AccMeas" type="ENG_InstrumentTransformerMeasurementRatingKind"/>
			<DO name="AccPro" type="ENG_InstrumentTransformerProtectionRatingKind"/>
			<DO name="AmpSv" type="SAV_LCMTN_AmpSv"/>
			<DO name="ARtg" type="ASG_LCMTN_ARtg"/>
			<DO name="ScndTmms" type="ING_LCMTN_ScndTmms"/>
		</LNodeType>
		<LNodeType id="TVTR_LCMTN" lnClass="TVTR">
			<DO name="Beh" type="ENS_BehaviourModeKind"/>
			<DO name="HoldTmms" type="ING"/>
			<DO name="HzRtg" type="ASG_LCMTN_ARtg"/>
			<DO name="Clip" type="ASG_LCMTN_ARtg"/>
			<DO name="VolSv" type="SAV_LCMTN_AmpSv"/>
			<DO name="VRtg" type="ASG_LCMTN_ARtg"/>
		</LNodeType>
		<LNodeType id="SIPROTEC5_1002" lnClass="LLN0">
			<DO name="Beh" type="SIPROTEC5_DOType_ENS_Behavior_V08.60.05_V08.30.00"/>
			<DO name="MltLev" type="SIPROTEC5_DOType_SPG_readOnly_with_dataNs_V08.60.05_V07.90.00"/>
		</LNodeType>
		<LNodeType id="SIPROTEC5_1004" lnClass="LPHD">
			<DO name="PhyNam" type="SIPROTEC5_DOType_DPL_V08.60.05_V08.00.00"/>
			<DO name="PhyHealth" type="SIPROTEC5_DOType_ENS_Health_V08.60.05_V07.90.00"/>
			<DO name="Proxy" type="SIPROTEC5_DOType_SPS_V08.60.05_V08.40.00"/>
		</LNodeType>
		<LNodeType id="SIPROTEC5_1005" lnClass="LLN0">
			<DO name="Beh" type="SIPROTEC5_DOType_ENS_Behavior_V08.60.05_V08.30.00"/>
			<DO name="GrRef" type="SIPROTEC5_DOType_ORG_V08.60.05_V08.00.00"/>
		</LNodeType>
		<LNodeType id="SIPROTEC5_1006" lnClass="TCTR">
			<DO name="Beh" type="SIPROTEC5_DOType_ENS_Behavior_V08.60.05_V08.30.00"/>
			<DO name="ARtg" type="SIPROTEC5_DOType_ASG_FLOAT32_edit_V08.60.05_V08.60.00"/>
			<DO name="HzRtg" type="SIPROTEC5_DOType_ASG_FLOAT32_readOnly_V08.60.05_V08.60.00"/>
			<DO name="AmpSv" type="SIPROTEC5_DOType_SAV_VDEWChannelNumber_V08.60.05_V08.60.00"/>
			<DO name="Trp" type="SIPROTEC5_DOType_ENG_TextList_Trp_edit_V08.60.05_V08.00.00"/>
			<DO name="ScndTmms" type="SIPROTEC5_DOType_ING_INT32_div_readOnly_V08.60.05_V08.60.00"/>
			<DO name="Clip" type="SIPROTEC5_DOType_ASG_FLOAT32_edit_V08.60.05_V08.60.00"/>
			<DO name="HoldTmms" type="SIPROTEC5_DOType_ING_INT32_div_readOnly_V08.60.05_V08.60.00"/>
			<DO name="NamAccRtg" type="SIPROTEC5_DOType_VSD_readOnly_V08.60.05_V08.00.00"/>
			<DO name="NamARtg" type="SIPROTEC5_DOType_VSD_readOnly_V08.60.05_V08.00.00"/>
			<DO name="NamClipRtg" type="SIPROTEC5_DOType_VSD_readOnly_V08.60.05_V08.00.00"/>
		</LNodeType>
		<LNodeType id="SIPROTEC5_1007" lnClass="TVTR">
			<DO name="Beh" type="SIPROTEC5_DOType_ENS_Behavior_V08.60.05_V08.30.00"/>
			<DO name="VolSv" type="SIPROTEC5_DOType_SAV_VDEWChannelNumber_V08.60.05_V08.60.00"/>
			<DO name="VRtg" type="SIPROTEC5_DOType_ASG_FLOAT32_readOnly_V08.60.05_V08.60.00"/>
			<DO name="HzRtg" type="SIPROTEC5_DOType_ASG_FLOAT32_readOnly_V08.60.05_V08.60.00"/>
			<DO name="Clip" type="SIPROTEC5_DOType_ASG_FLOAT32_edit_V08.60.05_V08.60.00"/>
			<DO name="HoldTmms" type="SIPROTEC5_DOType_ING_INT32_div_readOnly_V08.60.05_V08.60.00"/>
			<DO name="NamAccRtg" type="SIPROTEC5_DOType_VSD_readOnly_V08.60.05_V08.00.00"/>
			<DO name="NamVRtg" type="SIPROTEC5_DOType_VSD_readOnly_V08.60.05_V08.00.00"/>
			<DO name="NamClipRtg" type="SIPROTEC5_DOType_VSD_readOnly_V08.60.05_V08.00.00"/>
		</LNodeType>
		<LNodeType id="SIPROTEC5_1008" lnClass="PTRC">
			<DO name="Beh" type="SIPROTEC5_DOType_ENS_Behavior_V08.60.05_V08.30.00"/>
			<DO name="Op" type="SIPROTEC5_DOType_ACT_1_3pol_GABC_simpleConversions_V08.60.05_V07.90.00"/>
			<DO name="Str" type="SIPROTEC5_DOType_ACD_PhsSel_GABCN_Without_DirRouting_V08.60.05_V07.90.00"/>
		</LNodeType>
		<LNodeType id="SIPROTEC5_1009" lnClass="MMXU">
			<DO name="Beh" type="SIPROTEC5_DOType_ENS_Behavior_V08.60.05_V08.30.00"/>
			<DO name="PhV" type="SIPROTEC5_DOType_WYE_ABCRes_mag_V08.60.05_V08.60.00"/>
			<DO name="A" type="SIPROTEC5_DOType_WYE_ABCRes_mag_V08.60.05_V08.60.00"/>
		</LNodeType>
		<LNodeType id="SIPROTEC5_1010" lnClass="MMXU">
			<DO name="Beh" type="SIPROTEC5_DOType_ENS_Behavior_V08.60.05_V08.30.00"/>
			<DO name="Hz" type="SIPROTEC5_DOType_MV_Float_V08.60.05_V08.60.00"/>
			<DO name="W" type="SIPROTEC5_DOType_WYE_ABC_mag_V08.60.05_V08.60.00"/>
			<DO name="VAr" type="SIPROTEC5_DOType_WYE_ABC_mag_V08.60.05_V08.60.00"/>
			<DO name="VA" type="SIPROTEC5_DOType_WYE_ABC_mag_V08.60.05_V08.60.00"/>
		</LNodeType>
		<LNodeType id="SIPROTEC5_LNType_LLN0_LDevice_Generic" lnClass="LLN0">
			<DO name="Beh" type="SIPROTEC5_DOType_ENS_Behavior_V08.60.05_V08.30.00"/>
			<DO name="GrRef" type="SIPROTEC5_DOType_ORG_V08.60.05_V08.00.00"/>
			<DO name="RxOp" type="SIPROTEC5_DOType_ComProxy_ACT_V08.60.05_V07.90.00"/>
		</LNodeType>
		<LNodeType id="SIPROTEC5_LNType_LLN0_LDevice_Generic_1" lnClass="LLN0">
			<DO name="Beh" type="SIPROTEC5_DOType_ENS_Behavior_V08.60.05_V08.30.00"/>
			<DO name="GrRef" type="SIPROTEC5_DOType_ORG_V08.60.05_V08.00.00"/>
			<DO name="RxStr" type="SIPROTEC5_DOType_ComProxy_ACD_V08.60.05_V07.90.00"/>
		</LNodeType>
		<DOType id="SIPROTEC5_DOType_SPG_readOnly_with_dataNs_V08.60.05_V07.90.00" cdc="SPG">
			<DA fc="SE" name="setVal" bType="BOOLEAN" valKind="RO"/>
			<DA fc="EX" name="dataNs" bType="VisString255" valKind="RO">
				<Val>SIPROTEC5</Val>
			</DA>
		</DOType>
		<DOType id="SIPROTEC5_DOType_ENS_Health_V08.60.05_V07.90.00" cdc="ENS">
			<DA dchg="true" fc="ST" name="stVal" bType="Enum" type="SIPROTEC5_Textlist_Health_V08.60.05_V07.90.00"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
		</DOType>
		<DOType id="SIPROTEC5_DOType_ENS_Behavior_V08.60.05_V08.30.00" cdc="ENS">
			<DA dchg="true" fc="ST" name="stVal" bType="Enum" type="SIPROTEC5_Textlist_Behavior_V08.60.05_V08.30.00"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
		</DOType>
		<DOType id="SIPROTEC5_DOType_SPS_V08.60.05_V08.40.00" cdc="SPS">
			<DA dchg="true" fc="ST" name="stVal" bType="BOOLEAN"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
		</DOType>
		<DOType id="SIPROTEC5_DOType_DPL_V08.60.05_V08.00.00" cdc="DPL">
			<DA fc="DC" name="vendor" bType="VisString255" valKind="RO"/>
			<DA fc="DC" name="hwRev" bType="VisString255" valKind="RO"/>
			<DA fc="DC" name="swRev" bType="VisString255" valKind="RO"/>
			<DA fc="DC" name="serNum" bType="VisString255" valKind="RO"/>
			<DA fc="DC" name="model" bType="VisString255" valKind="RO"/>
			<DA fc="DC" name="location" bType="VisString255" valKind="RO"/>
			<DA fc="DC" name="owner" bType="VisString255" valKind="RO"/>
			<DA fc="DC" name="d" bType="VisString255" valKind="RO"/>
		</DOType>
		<DOType id="SIPROTEC5_DOType_ORG_V08.60.05_V08.00.00" cdc="ORG">
			<DA dchg="true" fc="SP" name="setSrcRef" bType="ObjRef" valKind="RO"/>
		</DOType>
		<DOType id="SIPROTEC5_DOType_ACD_PhsSel_GABCN_Without_DirRouting_V08.60.05_V07.90.00" cdc="ACD">
			<DA dchg="true" fc="ST" name="general" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="dirGeneral" bType="Enum" type="SIPROTEC5_Textlist_DirectionGeneral_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="ST" name="phsA" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="dirPhsA" bType="Enum" type="SIPROTEC5_Textlist_DirectionPhase_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="ST" name="phsB" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="dirPhsB" bType="Enum" type="SIPROTEC5_Textlist_DirectionPhase_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="ST" name="phsC" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="dirPhsC" bType="Enum" type="SIPROTEC5_Textlist_DirectionPhase_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="ST" name="neut" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="dirNeut" bType="Enum" type="SIPROTEC5_Textlist_DirectionPhase_V08.60.05_V07.90.00"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
		</DOType>
		<DOType id="SIPROTEC5_DOType_VSD_readOnly_V08.60.05_V08.00.00" cdc="VSD">
			<DA fc="DC" name="val" bType="VisString255" valKind="RO"/>
		</DOType>
		<DOType id="SIPROTEC5_DOType_ING_INT32_div_readOnly_V08.60.05_V08.60.00" cdc="ING">
			<DA fc="SE" name="setVal" bType="INT32" valKind="RO"/>
			<DA dchg="true" fc="CF" name="minVal" bType="INT32" valKind="RO">
				<Val>0</Val>
			</DA>
			<DA dchg="true" fc="CF" name="maxVal" bType="INT32" valKind="RO">
				<Val>0</Val>
			</DA>
			<DA dchg="true" fc="CF" name="stepSize" bType="INT32U" valKind="RO">
				<Val>0</Val>
			</DA>
		</DOType>
		<DOType id="SIPROTEC5_DOType_ASG_FLOAT32_edit_V08.60.05_V08.60.00" cdc="ASG">
			<DA fc="SE" name="setMag" bType="Struct" type="SIPROTEC5_DAType_AnalogValue_FLOAT32_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="CF" name="units" bType="Struct" type="SIPROTEC5_DAType_Units_1_V08.60.05_V08.60.00"/>
			<DA dchg="true" fc="CF" name="minVal" bType="Struct" type="SIPROTEC5_DAType_AnalogValue_FLOAT32_readOnly_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="CF" name="maxVal" bType="Struct" type="SIPROTEC5_DAType_AnalogValue_FLOAT32_readOnly_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="CF" name="stepSize" bType="Struct" type="SIPROTEC5_DAType_AnalogValue_FLOAT32_readOnly_V08.60.05_V07.90.00"/>
		</DOType>
		<DOType id="SIPROTEC5_DOType_ENG_TextList_Trp_edit_V08.60.05_V08.00.00" cdc="ENG">
			<DA fc="SE" name="setVal" bType="Enum" valKind="Set" type="SIPROTEC5_Textlist_Trp_V08.60.05_V08.00.00"/>
		</DOType>
		<DOType id="SIPROTEC5_DOType_SAV_VDEWChannelNumber_V08.60.05_V08.60.00" cdc="SAV">
			<DA fc="MX" name="instMag" bType="Struct" type="SIPROTEC5_DAType_AnalogValue_INT32_V08.60.05_V07.90.00"/>
			<DA qchg="true" fc="MX" name="q" bType="Quality"/>
			<DA fc="MX" name="t" bType="Timestamp"/>
			<DA dchg="true" fc="CF" name="units" bType="Struct" type="SIPROTEC5_DAType_Units_1_V08.60.05_V08.60.00"/>
			<DA dchg="true" fc="CF" name="sVC" bType="Struct" type="SIPROTEC5_DAType_ScaledValueConfig_readOnly_V08.60.05_V07.90.00"/>
		</DOType>
		<DOType id="SIPROTEC5_DOType_ASG_FLOAT32_readOnly_V08.60.05_V08.60.00" cdc="ASG">
			<DA fc="SE" name="setMag" bType="Struct" type="SIPROTEC5_DAType_AnalogValue_FLOAT32_readOnly_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="CF" name="units" bType="Struct" type="SIPROTEC5_DAType_Units_1_V08.60.05_V08.60.00"/>
			<DA dchg="true" fc="CF" name="minVal" bType="Struct" type="SIPROTEC5_DAType_AnalogValue_FLOAT32_readOnly_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="CF" name="maxVal" bType="Struct" type="SIPROTEC5_DAType_AnalogValue_FLOAT32_readOnly_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="CF" name="stepSize" bType="Struct" type="SIPROTEC5_DAType_AnalogValue_FLOAT32_readOnly_V08.60.05_V07.90.00"/>
		</DOType>
		<DOType id="SIPROTEC5_DOType_ACT_1_3pol_GABC_simpleConversions_V08.60.05_V07.90.00" cdc="ACT">
			<DA dchg="true" fc="ST" name="general" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="phsA" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="phsB" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="phsC" bType="BOOLEAN"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
		</DOType>
		<DOType id="SIPROTEC5_DOType_WYE_ABCRes_mag_V08.60.05_V08.60.00" cdc="WYE">
			<SDO name="phsA" type="SIPROTEC5_DOType_CMV_mag_without_convertions_V08.60.05_V08.60.00"/>
			<SDO name="phsB" type="SIPROTEC5_DOType_CMV_mag_without_convertions_V08.60.05_V08.60.00"/>
			<SDO name="phsC" type="SIPROTEC5_DOType_CMV_mag_without_convertions_V08.60.05_V08.60.00"/>
			<SDO name="res" type="SIPROTEC5_DOType_CMV_mag_without_convertions_V08.60.05_V08.60.00"/>
		</DOType>
		<DOType id="SIPROTEC5_DOType_CMV_mag_without_convertions_V08.60.05_V08.60.00" cdc="CMV">
			<DA fc="MX" name="instCVal" bType="Struct" type="SIPROTEC5_DAType_Vector_mag_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="MX" name="cVal" bType="Struct" type="SIPROTEC5_DAType_Vector_mag_V08.60.05_V07.90.00"/>
			<DA qchg="true" fc="MX" name="q" bType="Quality"/>
			<DA fc="MX" name="t" bType="Timestamp"/>
			<DA dchg="true" fc="CF" name="units" bType="Struct" type="SIPROTEC5_DAType_Units_1_V08.60.05_V08.60.00"/>
			<DA dchg="true" fc="CF" name="db" bType="INT32U" valKind="Set">
				<Val>0</Val>
			</DA>
			<DA dchg="true" fc="CF" name="dbRef" bType="FLOAT32" valKind="RO">
				<Val>0</Val>
			</DA>
		</DOType>
		<DOType id="SIPROTEC5_DOType_WYE_ABC_mag_V08.60.05_V08.60.00" cdc="WYE">
			<SDO name="phsA" type="SIPROTEC5_DOType_CMV_mag_without_convertions_V08.60.05_V08.60.00"/>
			<SDO name="phsB" type="SIPROTEC5_DOType_CMV_mag_without_convertions_V08.60.05_V08.60.00"/>
			<SDO name="phsC" type="SIPROTEC5_DOType_CMV_mag_without_convertions_V08.60.05_V08.60.00"/>
		</DOType>
		<DOType id="SIPROTEC5_DOType_MV_Float_V08.60.05_V08.60.00" cdc="MV">
			<DA fc="MX" name="instMag" bType="Struct" type="SIPROTEC5_DAType_AnalogValue_FLOAT32_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="MX" name="mag" bType="Struct" type="SIPROTEC5_DAType_AnalogValue_FLOAT32_V08.60.05_V07.90.00"/>
			<DA qchg="true" fc="MX" name="q" bType="Quality"/>
			<DA fc="MX" name="t" bType="Timestamp"/>
			<DA dchg="true" fc="CF" name="units" bType="Struct" type="SIPROTEC5_DAType_Units_1_V08.60.05_V08.60.00"/>
			<DA dchg="true" fc="CF" name="db" bType="INT32U" valKind="Set">
				<Val>0</Val>
			</DA>
			<DA dchg="true" fc="CF" name="dbRef" bType="FLOAT32" valKind="RO">
				<Val>0</Val>
			</DA>
		</DOType>
		<DOType id="SIPROTEC5_DOType_ComProxy_ACT_V08.60.05_V07.90.00" cdc="ACT">
			<DA dchg="true" fc="ST" name="general" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="phsA" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="phsB" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="phsC" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="neut" bType="BOOLEAN"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
			<DA fc="EX" name="dataNs" bType="VisString255" valKind="RO">
				<Val>SIPROTEC5</Val>
			</DA>
		</DOType>
		<DOType id="SIPROTEC5_DOType_ComProxy_ACD_V08.60.05_V07.90.00" cdc="ACD">
			<DA dchg="true" fc="ST" name="general" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="dirGeneral" bType="Enum" type="SIPROTEC5_Textlist_DirectionGeneral_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="ST" name="phsA" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="dirPhsA" bType="Enum" type="SIPROTEC5_Textlist_DirectionPhase_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="ST" name="phsB" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="dirPhsB" bType="Enum" type="SIPROTEC5_Textlist_DirectionPhase_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="ST" name="phsC" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="dirPhsC" bType="Enum" type="SIPROTEC5_Textlist_DirectionPhase_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="ST" name="neut" bType="BOOLEAN"/>
			<DA dchg="true" fc="ST" name="dirNeut" bType="Enum" type="SIPROTEC5_Textlist_DirectionPhase_V08.60.05_V07.90.00"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
			<DA fc="EX" name="dataNs" bType="VisString255" valKind="RO">
				<Val>SIPROTEC5</Val>
			</DA>
		</DOType>
		<DOType id="LPL_LD2007" cdc="LPL">
			<DA fc="DC" name="vendor" bType="VisString255">
				<Val>Locamation B.V.</Val>
			</DA>
			<DA fc="DC" name="swRev" bType="VisString255">
				<Val>1.0</Val>
			</DA>
			<DA fc="DC" name="d" bType="VisString255"/>
			<DA fc="DC" name="dU" bType="Unicode255"/>
			<DA fc="DC" name="configRev" bType="VisString255">
				<Val>1.0</Val>
			</DA>
			<DA dchg="true" fc="ST" name="paramRev" bType="INT32">
				<Val>0</Val>
			</DA>
			<DA dchg="true" fc="ST" name="valRev" bType="INT32">
				<Val>0</Val>
			</DA>
			<DA fc="EX" name="ldNs" bType="VisString255">
				<Val>IEC 61850-7-4:2007</Val>
			</DA>
		</DOType>
		<DOType id="ENS_Health" cdc="ENS">
			<DA dchg="true" dupd="true" fc="ST" name="stVal" bType="Enum" type="SIPROTEC5_Textlist_Health_V08.60.05_V07.90.00"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
			<DA fc="DC" name="d" bType="VisString255"/>
			<DA fc="DC" name="dU" bType="Unicode255"/>
		</DOType>
		<DOType id="ENS_Beh" cdc="ENS">
			<DA dchg="true" dupd="true" fc="ST" name="stVal" bType="Enum" type="SIPROTEC5_Textlist_Behavior_V08.60.05_V08.30.00"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
			<DA fc="DC" name="d" bType="VisString255"/>
			<DA fc="DC" name="dU" bType="Unicode255"/>
		</DOType>
		<DOType id="SPS_noSVnoBL" cdc="SPS">
			<DA dchg="true" fc="ST" name="stVal" bType="BOOLEAN"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
			<DA fc="DC" name="d" bType="VisString255"/>
			<DA fc="DC" name="dU" bType="Unicode255"/>
		</DOType>
		<DOType id="ENC_Mod_direct" cdc="ENC">
			<DA fc="ST" name="origin" bType="Struct" type="SIPROTEC5_DAType_origin_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="ST" name="stVal" bType="Enum" type="SIPROTEC5_Textlist_Behavior_V08.60.05_V08.30.00"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
			<DA fc="CF" name="ctlModel" bType="Enum" valKind="RO" type="SIPROTEC5_Textlist_ctlModel_V08.60.05_V07.90.00">
				<Val>direct-with-normal-security</Val>
			</DA>
			<DA fc="DC" name="d" bType="VisString255"/>
			<DA fc="DC" name="dU" bType="Unicode255"/>
			<DA fc="CO" name="Oper" bType="Struct" type="OperBehaviourModeKind"/>
		</DOType>
		<DOType id="SPC_direct" cdc="SPC">
			<DA fc="ST" name="origin" bType="Struct" type="SIPROTEC5_DAType_origin_V08.60.05_V07.90.00"/>
			<DA dchg="true" fc="ST" name="stVal" bType="BOOLEAN"/>
			<DA qchg="true" fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
			<DA dchg="true" fc="CF" name="ctlModel" bType="Enum" valKind="RO" type="SIPROTEC5_Textlist_ctlModel_V08.60.05_V07.90.00">
				<Val>direct-with-normal-security</Val>
			</DA>
			<DA fc="DC" name="d" bType="VisString255"/>
			<DA fc="DC" name="dU" bType="Unicode255"/>
			<DA fc="CO" name="Oper" bType="Struct" type="OperBool"/>
		</DOType>
		<DOType id="SPG_SP" cdc="SPG">
			<DA dchg="true" fc="SP" name="setVal" bType="BOOLEAN"/>
			<DA fc="DC" name="d" bType="VisString255"/>
			<DA fc="DC" name="dU" bType="Unicode255"/>
		</DOType>
		<DOType id="DPL_Full" cdc="DPL">
			<DA fc="DC" name="vendor" bType="VisString255">
				<Val>Locamation B.V.</Val>
			</DA>
			<DA fc="DC" name="hwRev" bType="VisString255"/>
			<DA fc="DC" name="swRev" bType="VisString255"/>
			<DA fc="DC" name="serNum" bType="VisString255"/>
			<DA fc="DC" name="model" bType="VisString255"/>
			<DA fc="DC" name="location" bType="VisString255"/>
			<DA fc="DC" name="name" bType="VisString64"/>
			<DA fc="DC" name="owner" bType="VisString255"/>
			<DA fc="DC" name="ePSName" bType="VisString255"/>
			<DA fc="DC" name="primeOper" bType="VisString255"/>
			<DA fc="DC" name="secondOper" bType="VisString255"/>
			<DA fc="DC" name="latitude" bType="FLOAT32"/>
			<DA fc="DC" name="longitude" bType="FLOAT32"/>
			<DA fc="DC" name="altitude" bType="FLOAT32"/>
			<DA fc="DC" name="mRID" bType="VisString255"/>
			<DA fc="DC" name="d" bType="VisString255"/>
			<DA fc="DC" name="dU" bType="Unicode255"/>
		</DOType>
		<DOType id="ENS_BehaviourModeKind" cdc="ENS">
			<DA fc="ST" name="stVal" bType="Enum" type="SIPROTEC5_Textlist_Behavior_V08.60.05_V08.30.00"/>
			<DA fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
		</DOType>
		<DOType id="ASG_LCMTN_ARtg" cdc="ASG">
			<DA fc="SP" name="setMag" bType="Struct" type="SIPROTEC5_DAType_AnalogValue_INT32_V08.60.05_V07.90.00"/>
			<DA fc="CF" name="units" bType="Struct" type="Unit"/>
		</DOType>
		<DOType id="ING" cdc="ING">
			<DA fc="SP" name="setVal" bType="INT32"/>
		</DOType>
		<DOType id="ENG_InstrumentTransformerMeasurementRatingKind" cdc="ENG">
			<DA fc="SP" name="setVal" bType="Enum" type="SIPROTEC5_EnType_InstrumentTransformerMeasurementRatingKind_V08.60.05_V08.00.00"/>
		</DOType>
		<DOType id="ENG_InstrumentTransformerProtectionRatingKind" cdc="ENG">
			<DA fc="SP" name="setVal" bType="Enum" type="SIPROTEC5_EnType_InstrumentTransformerProtectionRatingKind_V08.60.05_V08.40.00"/>
		</DOType>
		<DOType id="SAV_LCMTN_AmpSv" cdc="SAV">
			<DA fc="MX" name="instMag" bType="Struct" type="SIPROTEC5_DAType_AnalogValue_INT32_V08.60.05_V07.90.00"/>
			<DA fc="MX" name="q" bType="Quality"/>
			<DA fc="CF" name="sVC" bType="Struct" type="ScaledValueConfig"/>
		</DOType>
		<DOType id="ING_LCMTN_ScndTmms" cdc="ING">
			<DA fc="SP" name="setVal" bType="INT32"/>
			<DA fc="CF" name="units" bType="Struct" type="Unit"/>
		</DOType>
		<DAType id="SIPROTEC5_DAType_origin_V08.60.05_V07.90.00">
			<BDA name="orCat" bType="Enum" type="SIPROTEC5_Textlist_orCategory_V08.60.05_V07.90.00"/>
			<BDA name="orIdent" bType="Octet64"/>
		</DAType>
		<DAType id="SIPROTEC5_DAType_AnalogValue_INT32_V08.60.05_V07.90.00">
			<BDA name="i" bType="INT32"/>
		</DAType>
		<DAType id="SIPROTEC5_DAType_Units_1_V08.60.05_V08.60.00">
			<BDA name="SIUnit" bType="Enum" valKind="RO" type="SIPROTEC5_EnType_SIUnit_V08.60.05_V08.60.00"/>
			<BDA name="multiplier" bType="Enum" valKind="RO" type="SIPROTEC5_EnType_Multiplier_V08.60.05_V07.90.00"/>
		</DAType>
		<DAType id="SIPROTEC5_DAType_AnalogValue_FLOAT32_V08.60.05_V07.90.00">
			<BDA name="f" bType="FLOAT32" valKind="Set">
				<Val>0</Val>
			</BDA>
		</DAType>
		<DAType id="SIPROTEC5_DAType_AnalogValue_FLOAT32_readOnly_V08.60.05_V07.90.00">
			<BDA name="f" bType="FLOAT32" valKind="RO">
				<Val>0</Val>
			</BDA>
		</DAType>
		<DAType id="SIPROTEC5_DAType_ScaledValueConfig_readOnly_V08.60.05_V07.90.00">
			<BDA name="scaleFactor" bType="FLOAT32" valKind="RO">
				<Val>1</Val>
			</BDA>
			<BDA name="offset" bType="FLOAT32" valKind="RO">
				<Val>0</Val>
			</BDA>
		</DAType>
		<DAType id="SIPROTEC5_DAType_Vector_mag_V08.60.05_V07.90.00">
			<BDA name="mag" bType="Struct" type="SIPROTEC5_DAType_AnalogValue_FLOAT32_V08.60.05_V07.90.00"/>
		</DAType>
		<DAType id="OperBool">
			<BDA name="ctlVal" bType="BOOLEAN"/>
			<BDA name="origin" bType="Struct" type="SIPROTEC5_DAType_origin_V08.60.05_V07.90.00"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<BDA name="Check" sAddr="" bType="Check"/>
		</DAType>
		<DAType id="OperBehaviourModeKind">
			<BDA name="ctlVal" bType="Enum" type="SIPROTEC5_Textlist_Behavior_V08.60.05_V08.30.00"/>
			<BDA name="origin" bType="Struct" type="SIPROTEC5_DAType_origin_V08.60.05_V07.90.00"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<BDA name="Check" sAddr="" bType="Check"/>
		</DAType>
		<DAType id="ScaledValueConfig">
			<BDA name="scaleFactor" bType="FLOAT32"/>
			<BDA name="offset" bType="FLOAT32"/>
		</DAType>
		<DAType id="Unit">
			<BDA name="SIUnit" bType="Enum" type="SIUnitKind"/>
			<BDA name="multiplier" bType="Enum" type="SIPROTEC5_EnType_Multiplier_V08.60.05_V07.90.00"/>
		</DAType>
		<EnumType id="SIPROTEC5_Textlist_orCategory_V08.60.05_V07.90.00">
			<EnumVal ord="0">not-supported</EnumVal>
			<EnumVal ord="1">bay-control</EnumVal>
			<EnumVal ord="2">station-control</EnumVal>
			<EnumVal ord="3">remote-control</EnumVal>
			<EnumVal ord="4">automatic-bay</EnumVal>
			<EnumVal ord="5">automatic-station</EnumVal>
			<EnumVal ord="6">automatic-remote</EnumVal>
			<EnumVal ord="7">maintenance</EnumVal>
			<EnumVal ord="8">process</EnumVal>
		</EnumType>
		<EnumType id="SIPROTEC5_Textlist_Health_V08.60.05_V07.90.00">
			<EnumVal ord="1">Ok</EnumVal>
			<EnumVal ord="2">Warning</EnumVal>
			<EnumVal ord="3">Alarm</EnumVal>
		</EnumType>
		<EnumType id="SIPROTEC5_Textlist_Behavior_V08.60.05_V08.30.00">
			<EnumVal ord="1">on</EnumVal>
			<EnumVal ord="2">blocked</EnumVal>
			<EnumVal ord="3">test</EnumVal>
			<EnumVal ord="4">test/blocked</EnumVal>
			<EnumVal ord="5">off</EnumVal>
		</EnumType>
		<EnumType id="SIPROTEC5_EnType_Multiplier_V08.60.05_V07.90.00">
			<EnumVal ord="-24">y</EnumVal>
			<EnumVal ord="-21">z</EnumVal>
			<EnumVal ord="-18">a</EnumVal>
			<EnumVal ord="-15">f</EnumVal>
			<EnumVal ord="-12">p</EnumVal>
			<EnumVal ord="-9">n</EnumVal>
			<EnumVal ord="-6">µ</EnumVal>
			<EnumVal ord="-3">m</EnumVal>
			<EnumVal ord="-2">c</EnumVal>
			<EnumVal ord="-1">d</EnumVal>
			<EnumVal ord="0"/>
			<EnumVal ord="1">da</EnumVal>
			<EnumVal ord="2">h</EnumVal>
			<EnumVal ord="3">k</EnumVal>
			<EnumVal ord="6">M</EnumVal>
			<EnumVal ord="9">G</EnumVal>
			<EnumVal ord="12">T</EnumVal>
			<EnumVal ord="15">P</EnumVal>
			<EnumVal ord="18">E</EnumVal>
			<EnumVal ord="21">Z</EnumVal>
			<EnumVal ord="24">Y</EnumVal>
		</EnumType>
		<EnumType id="SIPROTEC5_Textlist_ctlModel_V08.60.05_V07.90.00">
			<EnumVal ord="0">status-only</EnumVal>
			<EnumVal ord="1">direct-with-normal-security</EnumVal>
			<EnumVal ord="2">sbo-with-normal-security</EnumVal>
			<EnumVal ord="3">direct-with-enhanced-security</EnumVal>
			<EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
		</EnumType>
		<EnumType id="SIPROTEC5_EnType_InstrumentTransformerProtectionRatingKind_V08.60.05_V08.40.00">
			<EnumVal ord="1">1</EnumVal>
			<EnumVal ord="2">2</EnumVal>
			<EnumVal ord="3">3</EnumVal>
			<EnumVal ord="4">5</EnumVal>
			<EnumVal ord="5">6</EnumVal>
			<EnumVal ord="6">10</EnumVal>
		</EnumType>
		<EnumType id="SIPROTEC5_EnType_InstrumentTransformerMeasurementRatingKind_V08.60.05_V08.00.00">
			<EnumVal ord="1">0.05</EnumVal>
			<EnumVal ord="2">0.1</EnumVal>
			<EnumVal ord="3">0.2</EnumVal>
			<EnumVal ord="4">0.2S</EnumVal>
			<EnumVal ord="5">0.5</EnumVal>
			<EnumVal ord="6">0.5S</EnumVal>
			<EnumVal ord="7">1</EnumVal>
			<EnumVal ord="8">3</EnumVal>
			<EnumVal ord="9">5</EnumVal>
		</EnumType>
		<EnumType id="SIPROTEC5_EnType_SIUnit_V08.60.05_V08.60.00">
			<EnumVal ord="-38">kV/mA</EnumVal>
			<EnumVal ord="-37">kA/V</EnumVal>
			<EnumVal ord="-36">ohm/m</EnumVal>
			<EnumVal ord="-35">ppm/°C</EnumVal>
			<EnumVal ord="-34">F/m</EnumVal>
			<EnumVal ord="-33">H/m</EnumVal>
			<EnumVal ord="-32">ms/kPa</EnumVal>
			<EnumVal ord="-31">kPa</EnumVal>
			<EnumVal ord="-30">ms/V</EnumVal>
			<EnumVal ord="-29">ms/K</EnumVal>
			<EnumVal ord="-28">V/s</EnumVal>
			<EnumVal ord="-27">I/Ir*s</EnumVal>
			<EnumVal ord="-26">1/week</EnumVal>
			<EnumVal ord="-25">1/d</EnumVal>
			<EnumVal ord="-24">1/h</EnumVal>
			<EnumVal ord="-23">1/min</EnumVal>
			<EnumVal ord="-22">periods</EnumVal>
			<EnumVal ord="-21">GB</EnumVal>
			<EnumVal ord="-19">cycle</EnumVal>
			<EnumVal ord="-18">mile</EnumVal>
			<EnumVal ord="-17">inch</EnumVal>
			<EnumVal ord="-16">°F</EnumVal>
			<EnumVal ord="-15">I/IrObj</EnumVal>
			<EnumVal ord="-14">MB</EnumVal>
			<EnumVal ord="-13">KB</EnumVal>
			<EnumVal ord="-12">Bytes</EnumVal>
			<EnumVal ord="-11">p.u.</EnumVal>
			<EnumVal ord="-10">day(s)</EnumVal>
			<EnumVal ord="-7">%</EnumVal>
			<EnumVal ord="-4">F/mi</EnumVal>
			<EnumVal ord="-3">ohm/mi</EnumVal>
			<EnumVal ord="-2">F/km</EnumVal>
			<EnumVal ord="-1">ohm/km</EnumVal>
			<EnumVal ord="1"/>
			<EnumVal ord="2">m</EnumVal>
			<EnumVal ord="3">kg</EnumVal>
			<EnumVal ord="4">s</EnumVal>
			<EnumVal ord="5">A</EnumVal>
			<EnumVal ord="6">K</EnumVal>
			<EnumVal ord="7">mol</EnumVal>
			<EnumVal ord="8">cd</EnumVal>
			<EnumVal ord="9">deg</EnumVal>
			<EnumVal ord="10">rad</EnumVal>
			<EnumVal ord="11">sr</EnumVal>
			<EnumVal ord="21">Gy</EnumVal>
			<EnumVal ord="23">°C</EnumVal>
			<EnumVal ord="24">Sv</EnumVal>
			<EnumVal ord="25">F</EnumVal>
			<EnumVal ord="26">C</EnumVal>
			<EnumVal ord="27">S</EnumVal>
			<EnumVal ord="28">H</EnumVal>
			<EnumVal ord="29">V</EnumVal>
			<EnumVal ord="30">ohm</EnumVal>
			<EnumVal ord="31">J</EnumVal>
			<EnumVal ord="32">N</EnumVal>
			<EnumVal ord="33">Hz</EnumVal>
			<EnumVal ord="34">lx</EnumVal>
			<EnumVal ord="35">Lm</EnumVal>
			<EnumVal ord="36">Wb</EnumVal>
			<EnumVal ord="37">T</EnumVal>
			<EnumVal ord="38">W</EnumVal>
			<EnumVal ord="39">Pa</EnumVal>
			<EnumVal ord="41">m²</EnumVal>
			<EnumVal ord="42">m³</EnumVal>
			<EnumVal ord="43">m/s</EnumVal>
			<EnumVal ord="44">m/s²</EnumVal>
			<EnumVal ord="45">m³/s</EnumVal>
			<EnumVal ord="46">m/m³</EnumVal>
			<EnumVal ord="47">M</EnumVal>
			<EnumVal ord="48">kg/m³</EnumVal>
			<EnumVal ord="49">m²/s</EnumVal>
			<EnumVal ord="50">W/m K</EnumVal>
			<EnumVal ord="51">J/K</EnumVal>
			<EnumVal ord="52">ppm</EnumVal>
			<EnumVal ord="53">1/s</EnumVal>
			<EnumVal ord="54">rad/s</EnumVal>
			<EnumVal ord="55">W/m²</EnumVal>
			<EnumVal ord="56">J/m²</EnumVal>
			<EnumVal ord="57">S/m</EnumVal>
			<EnumVal ord="58">K/s</EnumVal>
			<EnumVal ord="59">Pa/s</EnumVal>
			<EnumVal ord="60">J/kg K</EnumVal>
			<EnumVal ord="61">VA</EnumVal>
			<EnumVal ord="63">VAr</EnumVal>
			<EnumVal ord="64">phi</EnumVal>
			<EnumVal ord="65">cos(phi)</EnumVal>
			<EnumVal ord="66">Vs</EnumVal>
			<EnumVal ord="67">V²</EnumVal>
			<EnumVal ord="68">As</EnumVal>
			<EnumVal ord="69">A²</EnumVal>
			<EnumVal ord="70">A²t</EnumVal>
			<EnumVal ord="71">VAh</EnumVal>
			<EnumVal ord="72">Wh</EnumVal>
			<EnumVal ord="73">VArh</EnumVal>
			<EnumVal ord="74">V/Hz</EnumVal>
			<EnumVal ord="75">Hz/s</EnumVal>
			<EnumVal ord="76">char</EnumVal>
			<EnumVal ord="77">char/s</EnumVal>
			<EnumVal ord="78">kgm²</EnumVal>
			<EnumVal ord="79">dB</EnumVal>
			<EnumVal ord="80">J/Wh</EnumVal>
			<EnumVal ord="81">W/s</EnumVal>
			<EnumVal ord="82">l/s</EnumVal>
			<EnumVal ord="83">dBm</EnumVal>
			<EnumVal ord="84">h</EnumVal>
			<EnumVal ord="85">min</EnumVal>
			<EnumVal ord="86">'</EnumVal>
		</EnumType>
		<EnumType id="SIPROTEC5_Textlist_DirectionGeneral_V08.60.05_V07.90.00">
			<EnumVal ord="0">unknown</EnumVal>
			<EnumVal ord="1">forward</EnumVal>
			<EnumVal ord="2">backward</EnumVal>
			<EnumVal ord="3">both</EnumVal>
		</EnumType>
		<EnumType id="SIPROTEC5_Textlist_DirectionPhase_V08.60.05_V07.90.00">
			<EnumVal ord="0">unknown</EnumVal>
			<EnumVal ord="1">forward</EnumVal>
			<EnumVal ord="2">backward</EnumVal>
		</EnumType>
		<EnumType id="SIPROTEC5_Textlist_Trp_V08.60.05_V08.00.00">
			<EnumVal ord="1">Unknown</EnumVal>
			<EnumVal ord="2">P</EnumVal>
			<EnumVal ord="3">PR</EnumVal>
			<EnumVal ord="4">PX</EnumVal>
			<EnumVal ord="5">PXR</EnumVal>
			<EnumVal ord="6">TPX</EnumVal>
			<EnumVal ord="7">TPY</EnumVal>
			<EnumVal ord="8">TPZ</EnumVal>
			<EnumVal ord="9">TPE</EnumVal>
			<EnumVal ord="10">TPS</EnumVal>
		</EnumType>
		<EnumType id="SIUnitKind">
			<EnumVal ord="1"/>
			<EnumVal ord="2">m</EnumVal>
			<EnumVal ord="3">kg</EnumVal>
			<EnumVal ord="4">s</EnumVal>
			<EnumVal ord="5">A</EnumVal>
			<EnumVal ord="6">K</EnumVal>
			<EnumVal ord="7">mol</EnumVal>
			<EnumVal ord="8">cd</EnumVal>
			<EnumVal ord="9">deg</EnumVal>
			<EnumVal ord="10">rad</EnumVal>
			<EnumVal ord="11">sr</EnumVal>
			<EnumVal ord="21">Gy</EnumVal>
			<EnumVal ord="22">Bq</EnumVal>
			<EnumVal ord="23">°C</EnumVal>
			<EnumVal ord="24">Sv</EnumVal>
			<EnumVal ord="25">F</EnumVal>
			<EnumVal ord="26">C</EnumVal>
			<EnumVal ord="27">S</EnumVal>
			<EnumVal ord="28">H</EnumVal>
			<EnumVal ord="29">V</EnumVal>
			<EnumVal ord="30">ohm</EnumVal>
			<EnumVal ord="31">J</EnumVal>
			<EnumVal ord="32">N</EnumVal>
			<EnumVal ord="33">Hz</EnumVal>
			<EnumVal ord="34">lx</EnumVal>
			<EnumVal ord="35">Lm</EnumVal>
			<EnumVal ord="36">Wb</EnumVal>
			<EnumVal ord="37">T</EnumVal>
			<EnumVal ord="38">W</EnumVal>
			<EnumVal ord="39">Pa</EnumVal>
			<EnumVal ord="41">m²</EnumVal>
			<EnumVal ord="42">m³</EnumVal>
			<EnumVal ord="43">m/s</EnumVal>
			<EnumVal ord="44">m/s²</EnumVal>
			<EnumVal ord="45">m³/s</EnumVal>
			<EnumVal ord="46">m/m³</EnumVal>
			<EnumVal ord="47">M</EnumVal>
			<EnumVal ord="48">kg/m³</EnumVal>
			<EnumVal ord="49">m²/s</EnumVal>
			<EnumVal ord="50">W/m K</EnumVal>
			<EnumVal ord="51">J/K</EnumVal>
			<EnumVal ord="52">ppm</EnumVal>
			<EnumVal ord="53">1/s</EnumVal>
			<EnumVal ord="54">rad/s</EnumVal>
			<EnumVal ord="55">W/m²</EnumVal>
			<EnumVal ord="56">J/m²</EnumVal>
			<EnumVal ord="57">S/m</EnumVal>
			<EnumVal ord="58">K/s</EnumVal>
			<EnumVal ord="59">Pa/s</EnumVal>
			<EnumVal ord="60">J/kg K</EnumVal>
			<EnumVal ord="61">VA</EnumVal>
			<EnumVal ord="62">Watts</EnumVal>
			<EnumVal ord="63">VAr</EnumVal>
			<EnumVal ord="64">phi</EnumVal>
			<EnumVal ord="65">cos(phi)</EnumVal>
			<EnumVal ord="66">Vs</EnumVal>
			<EnumVal ord="67">V²</EnumVal>
			<EnumVal ord="68">As</EnumVal>
			<EnumVal ord="69">A²</EnumVal>
			<EnumVal ord="70">A²t</EnumVal>
			<EnumVal ord="71">VAh</EnumVal>
			<EnumVal ord="72">Wh</EnumVal>
			<EnumVal ord="73">VArh</EnumVal>
			<EnumVal ord="74">V/Hz</EnumVal>
			<EnumVal ord="75">Hz/s</EnumVal>
			<EnumVal ord="76">char</EnumVal>
			<EnumVal ord="77">char/s</EnumVal>
			<EnumVal ord="78">kgm²</EnumVal>
			<EnumVal ord="79">dB</EnumVal>
			<EnumVal ord="80">J/Wh</EnumVal>
			<EnumVal ord="81">W/s</EnumVal>
			<EnumVal ord="82">l/s</EnumVal>
			<EnumVal ord="83">dBm</EnumVal>
		</EnumType>
	</DataTypeTemplates>
</SCL>
