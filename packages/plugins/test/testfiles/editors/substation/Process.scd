<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
	<Header id="general_equipment"/>
	<Process name="ProcessGenConduct">	
		<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI" />
		<GeneralEquipment name="genSub" desc="someDesc" type="AXN"/>
		<Function name="someFunction">
			<SubFunction name="someSubFunc"/>
		</Function>
		<ConductingEquipment name="someCondEq" type="CBR">
			<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI" />
		</ConductingEquipment>	
	</Process>
	<Process name="ProcProcSubAA1">	
		<Substation name="AA1" desc="">
		<GeneralEquipment name="genSub" desc="someDesc" type="AXN"/>
		<GeneralEquipment name="genSub2" desc="someDesc" type="AXN"/>
			<VoltageLevel name="E1" desc="" nomFreq="50" numPhases="3">
				<GeneralEquipment name="genVolt1" type="BAT">
					<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI"/>
					<EqFunction name="Eq1"/>
				</GeneralEquipment>
				<Bay name="Q01" desc="">
					<Function name="F1">
						<SubFunction name="Sub1">
							<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI"/>
							<GeneralEquipment name="someGenCon1" desc="someDesc" type="MOT"/>
						</SubFunction>
					</Function>
				</Bay>
		</VoltageLevel>
		</Substation>
		<Process name="ProcessSubAA2">	
			<Substation name="AA2" desc="">
				<GeneralEquipment name="genSub" desc="someDesc" type="AXN"/>
				<GeneralEquipment name="genSub2" desc="someDesc" type="AXN"/>
					<VoltageLevel name="E1" desc="" nomFreq="50" numPhases="3">
						<GeneralEquipment name="genVolt1" type="BAT">
							<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI"/>
							<EqFunction name="Eq1"/>
						</GeneralEquipment>
						<Bay name="Q01" desc="">
							<Function name="F1">
								<SubFunction name="Sub1">
									<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI"/>
									<GeneralEquipment name="someGenCon1" desc="someDesc" type="MOT"/>
								</SubFunction>
							</Function>
						</Bay>
				</VoltageLevel>
			</Substation>			
		</Process>
	</Process>
	<Process name="ProcessLine">
		<Line name="Berlin" desc="" type="test" nomFreq="50" numPhases="3">
			<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI" />
			<GeneralEquipment name="someGenEq" type="BAT">
				<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI" />
    		</GeneralEquipment>
			<Function name="someFunctionToMunich">
				<SubFunction name="someSubFunc">
				</SubFunction>
			</Function>
			<Voltage multiplier="k" unit="V">380.0</Voltage>
			<ConductingEquipment name="someCondEq" type="DIS">
				<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI" />
    		</ConductingEquipment>
   	 	</Line>
	</Process>	
</SCL>
