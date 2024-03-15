<SCL xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates" release="4" revision="B" version="2007">
	<Header id="927a5b77-5461-454e-a657-cc28aef2c7c6" revision="" version="0.0.1">
	</Header>
	<Substation desc="Substation 1" name="Sub1">
		<PowerTransformer name="T4" sxy:x="1" sxy:y="1" type="PTR">
			<TransformerWinding name="T4_3" type="PTW">
				<Terminal cNodeName="CONNECTIVITY_NODE78" substationName="Sub1" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T4_0/CONNECTIVITY_NODE78" name="T4_0"/>
			</TransformerWinding>
			<TransformerWinding name="T4_2" type="PTW">
				<Terminal cNodeName="CONNECTIVITY_NODE81" substationName="Sub1" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T4_1/CONNECTIVITY_NODE81" name="T4_1"/>
			</TransformerWinding>
			<TransformerWinding name="T4_1" type="PTW">
				<Terminal cNodeName="CONNECTIVITY_NODE85" substationName="Sub1" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T4_2/CONNECTIVITY_NODE85" name="T4_2"/>
				<TapChanger name="T4" type="LTC"/>
			</TransformerWinding>
		</PowerTransformer>
		<PowerTransformer desc="Trafo-5" name="T3" sxy:x="2" sxy:y="2" type="PTR">
			<TransformerWinding name="T3_1" type="PTW">
				<Terminal cNodeName="CONNECTIVITY_NODE88" substationName="Sub1" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T3_0/CONNECTIVITY_NODE88" name="T3_0"/>
				<TapChanger name="T3" type="LTC"/>
			</TransformerWinding>
			<TransformerWinding name="T3_2" type="PTW">
				<Terminal cNodeName="CONNECTIVITY_NODE91" substationName="Sub1" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T3_1/CONNECTIVITY_NODE91" name="T3_1"/>
			</TransformerWinding>
			<TransformerWinding name="T3_3" type="PTW">
				<Terminal cNodeName="CONNECTIVITY_NODE95" substationName="Sub1" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T3_2/CONNECTIVITY_NODE95" name="T3_2"/>
			</TransformerWinding>
		</PowerTransformer>
		<VoltageLevel name="S1 380kV" sxy:x="2" sxy:y="5">
			<Voltage multiplier="k" unit="V">380.0</Voltage>
			<Bay name="BUSBAR10" sxy:x="1" sxy:y="11">
				<ConnectivityNode name="CONNECTIVITY_NODE82" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BUSBAR10/CONNECTIVITY_NODE82"/>
			</Bay>
			<Bay name="BAY_T4_2" sxy:x="1" sxy:y="1">
				<ConductingEquipment name="BREAKER25" sxy:x="6" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE83" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T4_2/CONNECTIVITY_NODE83" name="T4_2_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE84" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T4_2/CONNECTIVITY_NODE84" name="T4_2_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR49" sxy:x="6" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE82" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BUSBAR10/CONNECTIVITY_NODE82" name="T4_2_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE83" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T4_2/CONNECTIVITY_NODE83" name="T4_2_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR50" sxy:x="6" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE84" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T4_2/CONNECTIVITY_NODE84" name="T4_2_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE85" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T4_2/CONNECTIVITY_NODE85" name="T4_2_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE83" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T4_2/CONNECTIVITY_NODE83"/>
				<ConnectivityNode name="CONNECTIVITY_NODE84" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T4_2/CONNECTIVITY_NODE84"/>
				<ConnectivityNode name="CONNECTIVITY_NODE85" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T4_2/CONNECTIVITY_NODE85"/>
			</Bay>
			<Bay name="BAY_T3_0" sxy:x="2" sxy:y="1">
				<ConductingEquipment name="BREAKER26" sxy:x="3" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE86" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T3_0/CONNECTIVITY_NODE86" name="T3_0_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE87" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T3_0/CONNECTIVITY_NODE87" name="T3_0_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR51" sxy:x="3" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE82" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BUSBAR10/CONNECTIVITY_NODE82" name="T3_0_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE86" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T3_0/CONNECTIVITY_NODE86" name="T3_0_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR52" sxy:x="3" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE87" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T3_0/CONNECTIVITY_NODE87" name="T3_0_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE88" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T3_0/CONNECTIVITY_NODE88" name="T3_0_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE86" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T3_0/CONNECTIVITY_NODE86"/>
				<ConnectivityNode name="CONNECTIVITY_NODE87" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T3_0/CONNECTIVITY_NODE87"/>
				<ConnectivityNode name="CONNECTIVITY_NODE88" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_T3_0/CONNECTIVITY_NODE88"/>
			</Bay>
			<Bay name="BAY_68-116_0" sxy:x="3" sxy:y="1">
				<ConductingEquipment name="BREAKER29" sxy:x="1" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE96" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_68-116_0/CONNECTIVITY_NODE96" name="68-116_0_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE97" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_68-116_0/CONNECTIVITY_NODE97" name="68-116_0_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR57" sxy:x="1" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE82" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BUSBAR10/CONNECTIVITY_NODE82" name="68-116_0_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE96" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_68-116_0/CONNECTIVITY_NODE96" name="68-116_0_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR58" sxy:x="1" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE97" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_68-116_0/CONNECTIVITY_NODE97" name="68-116_0_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE98" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_68-116_0/CONNECTIVITY_NODE98" name="68-116_0_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE96" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_68-116_0/CONNECTIVITY_NODE96"/>
				<ConnectivityNode name="CONNECTIVITY_NODE97" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_68-116_0/CONNECTIVITY_NODE97"/>
				<ConnectivityNode name="CONNECTIVITY_NODE98" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 380kV/BAY_68-116_0/CONNECTIVITY_NODE98"/>
			</Bay>
		</VoltageLevel>
		<VoltageLevel name="S1 30kV" sxy:x="11" sxy:y="5">
			<Voltage multiplier="k" unit="V">30.0</Voltage>
			<Bay name="BUSBAR9" sxy:x="1" sxy:y="11">
				<ConnectivityNode name="CONNECTIVITY_NODE75" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BUSBAR9/CONNECTIVITY_NODE75"/>
			</Bay>
			<Bay name="BUSBAR11" sxy:x="1" sxy:y="12">
				<ConnectivityNode name="CONNECTIVITY_NODE92" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BUSBAR11/CONNECTIVITY_NODE92"/>
			</Bay>
			<Bay name="BAY_T4_0" sxy:x="1" sxy:y="1">
				<ConductingEquipment name="BREAKER23" sxy:x="3" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE76" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T4_0/CONNECTIVITY_NODE76" name="T4_0_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE77" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T4_0/CONNECTIVITY_NODE77" name="T4_0_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR45" sxy:x="3" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE75" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BUSBAR9/CONNECTIVITY_NODE75" name="T4_0_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE76" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T4_0/CONNECTIVITY_NODE76" name="T4_0_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR46" sxy:x="3" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE77" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T4_0/CONNECTIVITY_NODE77" name="T4_0_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE78" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T4_0/CONNECTIVITY_NODE78" name="T4_0_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE76" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T4_0/CONNECTIVITY_NODE76"/>
				<ConnectivityNode name="CONNECTIVITY_NODE77" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T4_0/CONNECTIVITY_NODE77"/>
				<ConnectivityNode name="CONNECTIVITY_NODE78" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T4_0/CONNECTIVITY_NODE78"/>
			</Bay>
			<Bay name="BAY_T3_2" sxy:x="2" sxy:y="1">
				<ConductingEquipment name="BREAKER28" sxy:x="1" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE93" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T3_2/CONNECTIVITY_NODE93" name="T3_2_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE94" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T3_2/CONNECTIVITY_NODE94" name="T3_2_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR55" sxy:x="1" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE92" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BUSBAR11/CONNECTIVITY_NODE92" name="T3_2_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE93" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T3_2/CONNECTIVITY_NODE93" name="T3_2_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR56" sxy:x="1" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE94" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T3_2/CONNECTIVITY_NODE94" name="T3_2_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE95" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T3_2/CONNECTIVITY_NODE95" name="T3_2_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE93" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T3_2/CONNECTIVITY_NODE93"/>
				<ConnectivityNode name="CONNECTIVITY_NODE94" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T3_2/CONNECTIVITY_NODE94"/>
				<ConnectivityNode name="CONNECTIVITY_NODE95" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 30kV/BAY_T3_2/CONNECTIVITY_NODE95"/>
			</Bay>
		</VoltageLevel>
		<VoltageLevel name="S1 110kV" sxy:x="18" sxy:y="5">
			<Voltage multiplier="k" unit="V">110.0</Voltage>
			<Bay name="BUSBAR6" sxy:x="1" sxy:y="11">
				<ConnectivityNode name="CONNECTIVITY_NODE24" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BUSBAR6/CONNECTIVITY_NODE24"/>
			</Bay>
			<Bay name="BAY_L1_0" sxy:x="1" sxy:y="1">
				<ConductingEquipment name="BREAKER7" sxy:x="1" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE25" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L1_0/CONNECTIVITY_NODE25" name="L1_0_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE26" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L1_0/CONNECTIVITY_NODE26" name="L1_0_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR13" sxy:x="1" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE24" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BUSBAR6/CONNECTIVITY_NODE24" name="L1_0_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE25" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L1_0/CONNECTIVITY_NODE25" name="L1_0_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR14" sxy:x="1" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE26" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L1_0/CONNECTIVITY_NODE26" name="L1_0_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE27" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L1_0/CONNECTIVITY_NODE27" name="L1_0_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE25" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L1_0/CONNECTIVITY_NODE25"/>
				<ConnectivityNode name="CONNECTIVITY_NODE26" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L1_0/CONNECTIVITY_NODE26"/>
				<ConnectivityNode name="CONNECTIVITY_NODE27" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L1_0/CONNECTIVITY_NODE27"/>
			</Bay>
			<Bay name="BAY_L3_a_0" sxy:x="2" sxy:y="1">
				<ConductingEquipment name="BREAKER11" sxy:x="3" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE37" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_a_0/CONNECTIVITY_NODE37" name="L3_a_0_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE38" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_a_0/CONNECTIVITY_NODE38" name="L3_a_0_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR21" sxy:x="3" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE24" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BUSBAR6/CONNECTIVITY_NODE24" name="L3_a_0_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE37" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_a_0/CONNECTIVITY_NODE37" name="L3_a_0_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR22" sxy:x="3" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE38" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_a_0/CONNECTIVITY_NODE38" name="L3_a_0_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE39" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_a_0/CONNECTIVITY_NODE39" name="L3_a_0_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE37" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_a_0/CONNECTIVITY_NODE37"/>
				<ConnectivityNode name="CONNECTIVITY_NODE38" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_a_0/CONNECTIVITY_NODE38"/>
				<ConnectivityNode name="CONNECTIVITY_NODE39" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_a_0/CONNECTIVITY_NODE39"/>
			</Bay>
			<Bay name="BAY_L3_b_0" sxy:x="3" sxy:y="1">
				<ConductingEquipment name="BREAKER13" sxy:x="6" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE43" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_b_0/CONNECTIVITY_NODE43" name="L3_b_0_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE44" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_b_0/CONNECTIVITY_NODE44" name="L3_b_0_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR25" sxy:x="6" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE24" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BUSBAR6/CONNECTIVITY_NODE24" name="L3_b_0_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE43" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_b_0/CONNECTIVITY_NODE43" name="L3_b_0_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR26" sxy:x="6" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE44" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_b_0/CONNECTIVITY_NODE44" name="L3_b_0_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE45" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_b_0/CONNECTIVITY_NODE45" name="L3_b_0_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE43" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_b_0/CONNECTIVITY_NODE43"/>
				<ConnectivityNode name="CONNECTIVITY_NODE44" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_b_0/CONNECTIVITY_NODE44"/>
				<ConnectivityNode name="CONNECTIVITY_NODE45" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_L3_b_0/CONNECTIVITY_NODE45"/>
			</Bay>
			<Bay name="BAY_T4_1" sxy:x="4" sxy:y="1">
				<ConductingEquipment name="BREAKER24" sxy:x="11" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE79" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T4_1/CONNECTIVITY_NODE79" name="T4_1_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE80" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T4_1/CONNECTIVITY_NODE80" name="T4_1_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR47" sxy:x="11" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE24" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BUSBAR6/CONNECTIVITY_NODE24" name="T4_1_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE79" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T4_1/CONNECTIVITY_NODE79" name="T4_1_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR48" sxy:x="11" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE80" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T4_1/CONNECTIVITY_NODE80" name="T4_1_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE81" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T4_1/CONNECTIVITY_NODE81" name="T4_1_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE79" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T4_1/CONNECTIVITY_NODE79"/>
				<ConnectivityNode name="CONNECTIVITY_NODE80" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T4_1/CONNECTIVITY_NODE80"/>
				<ConnectivityNode name="CONNECTIVITY_NODE81" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T4_1/CONNECTIVITY_NODE81"/>
			</Bay>
			<Bay name="BAY_T3_1" sxy:x="5" sxy:y="1">
				<ConductingEquipment name="BREAKER27" sxy:x="8" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE89" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T3_1/CONNECTIVITY_NODE89" name="T3_1_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE90" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T3_1/CONNECTIVITY_NODE90" name="T3_1_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR53" sxy:x="8" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE24" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BUSBAR6/CONNECTIVITY_NODE24" name="T3_1_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE89" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T3_1/CONNECTIVITY_NODE89" name="T3_1_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR54" sxy:x="8" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE90" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T3_1/CONNECTIVITY_NODE90" name="T3_1_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE91" connectivityNode="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T3_1/CONNECTIVITY_NODE91" name="T3_1_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE89" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T3_1/CONNECTIVITY_NODE89"/>
				<ConnectivityNode name="CONNECTIVITY_NODE90" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T3_1/CONNECTIVITY_NODE90"/>
				<ConnectivityNode name="CONNECTIVITY_NODE91" pathName="_af9a4ae3-ba2e-4c34-8e47-5af894ee20f4/S1 110kV/BAY_T3_1/CONNECTIVITY_NODE91"/>
			</Bay>
		</VoltageLevel>
	</Substation>
	<Substation desc="Substation 2" name="Sub2">
		<PowerTransformer desc="Trafo-3" name="T2" sxy:x="1" sxy:y="1" type="PTR">
			<TransformerWinding name="T2_1" type="PTW">
				<Terminal cNodeName="CONNECTIVITY_NODE63" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_T2_0/CONNECTIVITY_NODE63" name="T2_0"/>
			</TransformerWinding>
			<TransformerWinding name="T2_2" type="PTW">
				<Terminal cNodeName="CONNECTIVITY_NODE67" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 10kV/BAY_T2_1/CONNECTIVITY_NODE67" name="T2_1"/>
			</TransformerWinding>
		</PowerTransformer>
		<VoltageLevel name="S2 10kV" sxy:x="2" sxy:y="4">
			<Voltage multiplier="k" unit="V">10.0</Voltage>
			<Bay name="BUSBAR7" sxy:x="1" sxy:y="11">
				<ConnectivityNode name="CONNECTIVITY_NODE64" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 10kV/BUSBAR7/CONNECTIVITY_NODE64"/>
			</Bay>
			<Bay name="BAY_T2_1" sxy:x="1" sxy:y="1">
				<ConductingEquipment name="BREAKER20" sxy:x="1" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE65" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 10kV/BAY_T2_1/CONNECTIVITY_NODE65" name="T2_1_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE66" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 10kV/BAY_T2_1/CONNECTIVITY_NODE66" name="T2_1_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR39" sxy:x="1" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE64" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 10kV/BUSBAR7/CONNECTIVITY_NODE64" name="T2_1_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE65" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 10kV/BAY_T2_1/CONNECTIVITY_NODE65" name="T2_1_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR40" sxy:x="1" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE66" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 10kV/BAY_T2_1/CONNECTIVITY_NODE66" name="T2_1_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE67" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 10kV/BAY_T2_1/CONNECTIVITY_NODE67" name="T2_1_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE65" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 10kV/BAY_T2_1/CONNECTIVITY_NODE65"/>
				<ConnectivityNode name="CONNECTIVITY_NODE66" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 10kV/BAY_T2_1/CONNECTIVITY_NODE66"/>
				<ConnectivityNode name="CONNECTIVITY_NODE67" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 10kV/BAY_T2_1/CONNECTIVITY_NODE67"/>
			</Bay>
		</VoltageLevel>
		<VoltageLevel name="S2 110kV" sxy:x="6" sxy:y="4">
			<Voltage multiplier="k" unit="V">110.0</Voltage>
			<Bay name="BUSBAR5" sxy:x="1" sxy:y="11">
				<ConnectivityNode name="CONNECTIVITY_NODE20" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BUSBAR5/CONNECTIVITY_NODE20"/>
			</Bay>
			<Bay name="BAY_L4_1" sxy:x="1" sxy:y="1">
				<ConductingEquipment name="BREAKER6" sxy:x="6" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE21" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L4_1/CONNECTIVITY_NODE21" name="L4_1_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE22" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L4_1/CONNECTIVITY_NODE22" name="L4_1_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR11" sxy:x="6" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE20" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BUSBAR5/CONNECTIVITY_NODE20" name="L4_1_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE21" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L4_1/CONNECTIVITY_NODE21" name="L4_1_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR12" sxy:x="6" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE22" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L4_1/CONNECTIVITY_NODE22" name="L4_1_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE23" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L4_1/CONNECTIVITY_NODE23" name="L4_1_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE21" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L4_1/CONNECTIVITY_NODE21"/>
				<ConnectivityNode name="CONNECTIVITY_NODE22" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L4_1/CONNECTIVITY_NODE22"/>
				<ConnectivityNode name="CONNECTIVITY_NODE23" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L4_1/CONNECTIVITY_NODE23"/>
			</Bay>
			<Bay name="BAY_L1_1" sxy:x="2" sxy:y="1">
				<ConductingEquipment name="BREAKER8" sxy:x="1" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE28" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L1_1/CONNECTIVITY_NODE28" name="L1_1_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE29" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L1_1/CONNECTIVITY_NODE29" name="L1_1_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR15" sxy:x="1" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE20" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BUSBAR5/CONNECTIVITY_NODE20" name="L1_1_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE28" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L1_1/CONNECTIVITY_NODE28" name="L1_1_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR16" sxy:x="1" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE29" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L1_1/CONNECTIVITY_NODE29" name="L1_1_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE30" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L1_1/CONNECTIVITY_NODE30" name="L1_1_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE28" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L1_1/CONNECTIVITY_NODE28"/>
				<ConnectivityNode name="CONNECTIVITY_NODE29" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L1_1/CONNECTIVITY_NODE29"/>
				<ConnectivityNode name="CONNECTIVITY_NODE30" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L1_1/CONNECTIVITY_NODE30"/>
			</Bay>
			<Bay name="BAY_L2_0" sxy:x="3" sxy:y="1">
				<ConductingEquipment name="BREAKER9" sxy:x="3" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE31" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L2_0/CONNECTIVITY_NODE31" name="L2_0_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE32" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L2_0/CONNECTIVITY_NODE32" name="L2_0_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR17" sxy:x="3" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE20" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BUSBAR5/CONNECTIVITY_NODE20" name="L2_0_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE31" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L2_0/CONNECTIVITY_NODE31" name="L2_0_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR18" sxy:x="3" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE32" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L2_0/CONNECTIVITY_NODE32" name="L2_0_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE33" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L2_0/CONNECTIVITY_NODE33" name="L2_0_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE31" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L2_0/CONNECTIVITY_NODE31"/>
				<ConnectivityNode name="CONNECTIVITY_NODE32" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L2_0/CONNECTIVITY_NODE32"/>
				<ConnectivityNode name="CONNECTIVITY_NODE33" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_L2_0/CONNECTIVITY_NODE33"/>
			</Bay>
			<Bay name="BAY_T2_0" sxy:x="4" sxy:y="1">
				<ConductingEquipment name="BREAKER19" sxy:x="8" sxy:y="5" type="CBR">
					<Terminal cNodeName="CONNECTIVITY_NODE61" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_T2_0/CONNECTIVITY_NODE61" name="T2_0_ADDB1"/>
					<Terminal cNodeName="CONNECTIVITY_NODE62" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_T2_0/CONNECTIVITY_NODE62" name="T2_0_ADDB2"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR37" sxy:x="8" sxy:y="8" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE20" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BUSBAR5/CONNECTIVITY_NODE20" name="T2_0_ADD_DSC11"/>
					<Terminal cNodeName="CONNECTIVITY_NODE61" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_T2_0/CONNECTIVITY_NODE61" name="T2_0_ADD_DSC12"/>
				</ConductingEquipment>
				<ConductingEquipment name="DISCONNECTOR38" sxy:x="8" sxy:y="4" type="DIS">
					<Terminal cNodeName="CONNECTIVITY_NODE62" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_T2_0/CONNECTIVITY_NODE62" name="T2_0_ADD_DSC21"/>
					<Terminal cNodeName="CONNECTIVITY_NODE63" connectivityNode="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_T2_0/CONNECTIVITY_NODE63" name="T2_0_ADD_DSC22"/>
				</ConductingEquipment>
				<ConnectivityNode name="CONNECTIVITY_NODE61" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_T2_0/CONNECTIVITY_NODE61"/>
				<ConnectivityNode name="CONNECTIVITY_NODE62" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_T2_0/CONNECTIVITY_NODE62"/>
				<ConnectivityNode name="CONNECTIVITY_NODE63" pathName="_3f64f4e2-adfe-4d12-b082-68e7fe4b11c9/S2 110kV/BAY_T2_0/CONNECTIVITY_NODE63"/>
			</Bay>
		</VoltageLevel>
	</Substation>
</SCL>
