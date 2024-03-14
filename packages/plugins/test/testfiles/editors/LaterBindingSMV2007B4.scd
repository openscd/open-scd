<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
	<Header id="project"/>
	<Substation name="AA1" desc="">
		<VoltageLevel name="E1" desc="" nomFreq="50" numPhases="3">
			<Voltage unit="V" multiplier="k">110</Voltage>
			<Bay name="Q01" desc="">
				<ConductingEquipment name="B5" type="VTR" desc="">
					<EqFunction name="CurrentTransformer">
						<EqSubFunction name="L3">
							<LNode iedName="None" lnClass="TCTR" lnInst="1" lnType="Dummy.TCTR"/>
						</EqSubFunction>
						<EqSubFunction name="L2">
							<LNode iedName="None" lnClass="TCTR" lnInst="1" lnType="Dummy.TCTR"/>
						</EqSubFunction>
						<EqSubFunction name="RES">
							<LNode iedName="None" lnClass="TCTR" lnInst="1" lnType="Dummy.TCTR"/>
						</EqSubFunction>
						<EqSubFunction name="L1">
							<LNode iedName="None" lnClass="TCTR" lnInst="1" lnType="Dummy.TCTR"/>
						</EqSubFunction>
					</EqFunction>
				</ConductingEquipment>
				<ConductingEquipment name="B1" type="CTR" desc="">
					<EqFunction name="VoltageTransformer">
						<EqSubFunction name="L3">
							<LNode iedName="None" lnClass="TVTR" lnInst="1" lnType="Dummy.TVTR"/>
						</EqSubFunction>
						<EqSubFunction name="L2">
							<LNode iedName="None" lnClass="TVTR" lnInst="1" lnType="Dummy.TVTR"/>
						</EqSubFunction>
						<EqSubFunction name="RES">
							<LNode iedName="None" lnClass="TVTR" lnInst="1" lnType="Dummy.TVTR"/>
						</EqSubFunction>
						<EqSubFunction name="L1">
							<LNode iedName="None" lnClass="TVTR" lnInst="1" lnType="Dummy.TVTR"/>
						</EqSubFunction>
					</EqFunction>
				</ConductingEquipment>
				<Function name="Overvoltage">
					<LNode iedName="None" lnClass="PTRC" lnInst="1" lnType="Summy.PTRC"/>
				</Function>
				<Function name="Overcurrent">
					<LNode iedName="None" lnClass="PTRC" lnInst="1" lnType="Summy.PTRC"/>
				</Function>
			</Bay>
		</VoltageLevel>
	</Substation>
	<Communication>
		<SubNetwork name="ProcessBus" desc="" type="8-MMS">
			<BitRate unit="b/s" multiplier="M">100</BitRate>
			<ConnectedAP iedName="SMV_Subscriber" apName="AP1"/>
			<ConnectedAP iedName="SMV_Publisher" apName="AP1">
				<SMV ldInst="CurrentTransformer" cbName="fullSmv">
					<Address>
						<P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="MAC-Address" xsi:type="tP_MAC-Address">01-0C-CD-04-00-02</P>
						<P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="APPID" xsi:type="tP_APPID">0003</P>
					</Address>
				</SMV>
				<SMV ldInst="CurrentTransformer" cbName="voltageOnly">
					<Address>
						<P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="MAC-Address" xsi:type="tP_MAC-Address">01-0C-CD-04-00-01</P>
						<P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="APPID" xsi:type="tP_APPID">0002</P>
					</Address>
				</SMV>
				<SMV ldInst="CurrentTransformer" cbName="currentOnly">
					<Address>
						<P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="MAC-Address" xsi:type="tP_MAC-Address">01-0C-CD-04-00-00</P>
						<P xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" type="APPID" xsi:type="tP_APPID">0001</P>
					</Address>
				</SMV>
			</ConnectedAP>
		</SubNetwork>
	</Communication>
	<IED name="SMV_Subscriber" manufacturer="Dummy">
		<AccessPoint name="AP1">
			<Server>
				<Authentication/>
				<LDevice inst="Overvoltage">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="" lnClass="PTRC" inst="1" lnType="Summy.PTRC">
						<Inputs>
							<ExtRef intAddr="AmpSv;TCTR1/AmpSv/instMag.i" desc="MeasPoint.CT1" iedName="SMV_Publisher" ldInst="CurrentTransformer" prefix="L1" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="instMag.i" serviceType="SMV" srcLDInst="CurrentTransformer" srcPrefix="" srcLNClass="LLN0" srcCBName="currentOnly"/>
							<ExtRef intAddr="AmpSv;TCTR1/AmpSv/q" desc="MeasPoint.CT1" iedName="SMV_Publisher" ldInst="CurrentTransformer" prefix="L1" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="q" serviceType="SMV" srcLDInst="CurrentTransformer" srcPrefix="" srcLNClass="LLN0" srcCBName="currentOnly"/>
							<ExtRef intAddr="AmpSv;TCTR2/AmpSv/instMag.i" desc="MeasPoint.CT2"/>
							<ExtRef intAddr="AmpSv;TCTR2/AmpSv/q" desc="MeasPoint.CT1" iedName="SMV_Publisher" ldInst="CurrentTransformer" prefix="L1" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="q" serviceType="SMV" srcLDInst="CurrentTransformer" srcPrefix="" srcLNClass="LLN0" srcCBName="currentOnly"/>
							<ExtRef intAddr="AmpSv;TCTR3/AmpSv/instMag.i" desc="MeasPoint.CT3"/>
							<ExtRef intAddr="AmpSv;TCTR3/AmpSv/q" desc="MeasPoint.CT1" iedName="SMV_Publisher" ldInst="CurrentTransformer" prefix="L1" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="q" serviceType="SMV" srcLDInst="CurrentTransformer" srcPrefix="" srcLNClass="LLN0" srcCBName="currentOnly"/>
						</Inputs>
					</LN>
				</LDevice>
				<LDevice inst="Overcurrent">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="" lnClass="PTRC" inst="1" lnType="Summy.PTRC">
						<Inputs>
							<ExtRef intAddr="VolSv;TVTR1/VolSv/instMag.i" desc="MeasPoint.VT1" iedName="SMV_Publisher" ldInst="VoltageTransformer" prefix="L1" lnClass="TVTR" lnInst="1" doName="VolSv" daName="instMag.i" serviceType="SMV" srcLDInst="CurrentTransformer" srcPrefix="" srcLNClass="LLN0" srcCBName="voltageOnly"/>
							<ExtRef intAddr="VolSv;TVTR1/VolSv/q" desc="MeasPoint.VT1"/>
							<ExtRef intAddr="VolSv;TVTR2/VolSv/instMag.i" desc="MeasPoint.VT2"/>
							<ExtRef intAddr="VolSv;TVTR2/VolSv/q" desc="MeasPoint.VT1"/>
							<ExtRef intAddr="VolSv;TVTR3/VolSv/instMag.i" desc="MeasPoint.VT3"/>
							<ExtRef intAddr="VolSv;TVTR3/VolSv/q" desc="MeasPoint.VT1"/>
							<ExtRef intAddr="someRestrictedExtRef" desc="Restricted To AmpSV" pLN="TCTR" pDO="AmpSv" pDA="q" pServT="SMV"/>
							<ExtRef intAddr="someRestrictedExtRef" desc="Restricted To AmpSV" pLN="TCTR" pDO="AmpSv" pDA="instMag.i" pServT="SMV"/>
						</Inputs>
					</LN>
				</LDevice>
				<LDevice inst="CurrentTrans">
					<LN prefix="L1" lnClass="TCTR" inst="1" lnType="Dummy.TCTR"/>
					<LN prefix="L2" lnClass="TCTR" inst="1" lnType="Dummy.TCTR"/>
					<LN prefix="L3" lnClass="TCTR" inst="1" lnType="Dummy.TCTR"/>
					<LN prefix="RES" lnClass="TCTR" inst="1" lnType="Dummy.TCTR"/>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<IED name="SMV_Publisher" manufacturer="Dummy">
		<AccessPoint name="AP1">
			<Server>
				<Authentication/>
				<LDevice inst="CurrentTransformer">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
						<DataSet name="fullSmvsDataSet">
							<FCDA ldInst="CurrentTransformer" prefix="L3" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="CurrentTransformer" prefix="L3" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="CurrentTransformer" prefix="L2" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="CurrentTransformer" prefix="L2" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="CurrentTransformer" prefix="L1" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="CurrentTransformer" prefix="L1" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="VoltageTransformer" prefix="L3" lnClass="TVTR" lnInst="1" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="VoltageTransformer" prefix="L3" lnClass="TVTR" lnInst="1" doName="VolSv" daName="q" fc="MX"/>
							<FCDA ldInst="VoltageTransformer" prefix="L2" lnClass="TVTR" lnInst="1" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="VoltageTransformer" prefix="L2" lnClass="TVTR" lnInst="1" doName="VolSv" daName="q" fc="MX"/>
							<FCDA ldInst="VoltageTransformer" prefix="L1" lnClass="TVTR" lnInst="1" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="VoltageTransformer" prefix="L1" lnClass="TVTR" lnInst="1" doName="VolSv" daName="q" fc="MX"/>
						</DataSet>
						<DataSet name="voltageOnlysDataSet">
							<FCDA ldInst="VoltageTransformer" prefix="L1" lnClass="TVTR" lnInst="1" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="VoltageTransformer" prefix="L1" lnClass="TVTR" lnInst="1" doName="VolSv" daName="q" fc="MX"/>
							<FCDA ldInst="VoltageTransformer" prefix="L2" lnClass="TVTR" lnInst="1" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="VoltageTransformer" prefix="L2" lnClass="TVTR" lnInst="1" doName="VolSv" daName="q" fc="MX"/>
							<FCDA ldInst="VoltageTransformer" prefix="L3" lnClass="TVTR" lnInst="1" doName="VolSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="VoltageTransformer" prefix="L3" lnClass="TVTR" lnInst="1" doName="VolSv" daName="q" fc="MX"/>
						</DataSet>
						<DataSet name="currentOnlysDataSet">
							<FCDA ldInst="CurrentTransformer" prefix="L1" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="CurrentTransformer" prefix="L1" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="CurrentTransformer" prefix="L2" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="CurrentTransformer" prefix="L2" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="q" fc="MX"/>
							<FCDA ldInst="CurrentTransformer" prefix="L3" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="instMag.i" fc="MX"/>
							<FCDA ldInst="CurrentTransformer" prefix="L3" lnClass="TCTR" lnInst="1" doName="AmpSv" daName="q" fc="MX"/>
						</DataSet>
						<SampledValueControl name="fullSmv" multicast="true" smvID="smv3" smpMod="SmpPerPeriod" smpRate="80" nofASDU="1" confRev="1" datSet="fullSmvsDataSet">
							<SmvOpts sampleRate="true" dataSet="true" synchSourceId="true"/>
						</SampledValueControl>
						<SampledValueControl name="voltageOnly" multicast="true" smvID="smv2" smpMod="SmpPerPeriod" smpRate="80" nofASDU="1" confRev="1" datSet="voltageOnlysDataSet">
							<SmvOpts sampleRate="true" dataSet="true" synchSourceId="true"/>
						</SampledValueControl>
						<SampledValueControl name="currentOnly" multicast="true" smvID="firstSMV" smpMod="SmpPerPeriod" smpRate="80" nofASDU="1" confRev="1" datSet="currentOnlysDataSet">
							<SmvOpts sampleRate="true" dataSet="true" synchSourceId="true"/>
						</SampledValueControl>
					</LN0>
					<LN prefix="L3" lnClass="TCTR" inst="1" lnType="Dummy.TCTR"/>
					<LN prefix="L2" lnClass="TCTR" inst="1" lnType="Dummy.TCTR"/>
					<LN prefix="RES" lnClass="TCTR" inst="1" lnType="Dummy.TCTR"/>
					<LN prefix="L1" lnClass="TCTR" inst="1" lnType="Dummy.TCTR"/>
				</LDevice>
				<LDevice inst="VoltageTransformer">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="L3" lnClass="TVTR" inst="1" lnType="Dummy.TVTR"/>
					<LN prefix="L2" lnClass="TVTR" inst="1" lnType="Dummy.TVTR"/>
					<LN prefix="RES" lnClass="TVTR" inst="1" lnType="Dummy.TVTR"/>
					<LN prefix="L1" lnClass="TVTR" inst="1" lnType="Dummy.TVTR"/>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<DataTypeTemplates>
		<LNodeType lnClass="PTRC" id="Summy.PTRC" desc="Trip conditioning: General trip signal">
			<DO name="Mod" type="OpenSCD_ENC_Mod"/>
			<DO name="Beh" type="OpenSCD_ENS_Beh"/>
			<DO name="Health" type="OpenSCD_ENS_Health"/>
			<DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
			<DO name="Tr" type="OpenSCD_ACT_general"/>
			<DO name="Op" transient="true" type="OpenSCD_ACT_general"/>
			<DO name="Str" type="OpenSCD_ACD_general"/>
		</LNodeType>
		<LNodeType lnClass="TVTR" id="Dummy.TVTR" desc="Voltage transformer">
			<DO name="Rat" type="Dummy.ASG"/>
			<DO name="VRtgSec" type="Dummy.ING"/>
			<DO name="Mod" type="OpenSCD_ENC_Mod"/>
			<DO name="Beh" type="OpenSCD_ENS_Beh"/>
			<DO name="Health" type="OpenSCD_ENS_Health"/>
			<DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
			<DO name="VolSv" type="OpenSCD_SAV_VolSv_TVTR"/>
			<DO name="VRtg" type="OpenSCD_ASG_VRtg_TVTR"/>
			<DO name="HzRtg" type="OpenSCD_ASG_HzRtg_TCTR"/>
		</LNodeType>
		<LNodeType lnClass="TCTR" id="Dummy.TCTR" desc="Current transformer">
			<DO name="Rat" type="Dummy.ASG"/>
			<DO name="ARtgSec" type="Dummy.ING"/>
			<DO name="ARtgNom" type="OpenSCD_ASG_ATrg_TCTR"/>
			<DO name="Mod" type="OpenSCD_ENC_Mod"/>
			<DO name="Beh" type="OpenSCD_ENS_Beh"/>
			<DO name="Health" type="OpenSCD_ENS_Health"/>
			<DO name="NamPlt" type="OpenSCD_LPL_noLD"/>
			<DO name="AmpSv" type="OpenSCD_SAV_AmpSv_TCTR"/>
			<DO name="ARtg" type="OpenSCD_ASG_ATrg_TCTR"/>
			<DO name="HzRtg" type="OpenSCD_ASG_HzRtg_TCTR"/>
		</LNodeType>
		<LNodeType lnClass="LLN0" id="Dummy.LLN0" desc="Logical device LN: parent">
			<DO name="Mod" type="OpenSCD_ENC_Mod"/>
			<DO name="Beh" type="OpenSCD_ENS_Beh"/>
			<DO name="Health" type="OpenSCD_ENS_Health"/>
			<DO name="NamPlt" type="OpenSCD_LPL_LD"/>
			<DO name="LocKey" type="OpenSCD_SPS_simple"/>
			<DO name="Loc" type="OpenSCD_SPS_simple"/>
		</LNodeType>
		<DOType cdc="ACD" id="OpenSCD_ACD_general">
			<DA name="general" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="dirGeneral" bType="Enum" dchg="true" type="FaultDirectionKind" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
		</DOType>
		<DOType cdc="ACT" id="OpenSCD_ACT_general">
			<DA name="general" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
		</DOType>
		<DOType id="Dummy.ASG" cdc="ASG">
			<DA name="setMag" bType="Struct" type="Dummy.AnVal32" fc="SP" dchg="true"/>
			<DA name="q" bType="Quality" fc="SP" qchg="true"/>
			<DA name="t" bType="Timestamp" fc="SP"/>
		</DOType>
		<DOType cdc="ING" id="Dummy.ING">
			<DA name="setVal" bType="INT32" dchg="true" fc="SP"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="d" bType="VisString255" fc="DC"/>
		</DOType>
		<DOType cdc="ASG" id="OpenSCD_ASG_VRtg_TVTR">
			<DA name="setMag" bType="Struct" type="Dummy.AnVal32" fc="SP"/>
			<DA name="units" bType="Struct" dchg="true" type="OpenSCD_Unit_V" fc="CF"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
		</DOType>
		<DOType cdc="SAV" id="OpenSCD_SAV_VolSv_TVTR">
			<DA name="instMag" bType="Struct" type="OpenSCD_AnalogueValue_INT32" fc="MX"/>
			<DA name="q" bType="Quality" qchg="true" fc="MX"/>
			<DA name="t" bType="Timestamp" fc="MX"/>
			<DA name="units" bType="Struct" dchg="true" type="Unit" fc="CF"/>
			<DA name="sVC" bType="Struct" dchg="true" type="OpenSCD_ScaledValueConfig_VolSv" fc="CF"/>
		</DOType>
		<DOType cdc="ASG" id="OpenSCD_ASG_HzRtg_TCTR">
			<DA name="setMag" bType="Struct" type="OpenSCD_AnalogueValue_INT32" fc="SP"/>
			<DA name="units" bType="Struct" dchg="true" type="OpenSCD_Unit_Hz" fc="CF"/>
			<DA name="sVC" bType="Struct" dchg="true" type="ScaledValueConfig" fc="CF"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
		</DOType>
		<DOType cdc="ASG" id="OpenSCD_ASG_ATrg_TCTR">
			<DA name="setMag" bType="Struct" type="Dummy.AnVal32" fc="SP"/>
			<DA name="units" bType="Struct" dchg="true" type="OpenSCD_Unit_A" fc="CF"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
		</DOType>
		<DOType cdc="SAV" id="OpenSCD_SAV_AmpSv_TCTR">
			<DA name="instMag" bType="Struct" type="OpenSCD_AnalogueValue_INT32" fc="MX"/>
			<DA name="q" bType="Quality" qchg="true" fc="MX"/>
			<DA name="t" bType="Timestamp" fc="MX"/>
			<DA name="units" bType="Struct" dchg="true" type="Unit" fc="CF"/>
			<DA name="sVC" bType="Struct" dchg="true" type="OpenSCD_ScaledValueConfig_AmpSv" fc="CF"/>
		</DOType>
		<DOType cdc="LPL" id="OpenSCD_LPL_noLD">
			<DA name="vendor" bType="VisString255" fc="DC"/>
			<DA name="swRev" bType="VisString255" fc="DC"/>
			<DA name="d" bType="VisString255" fc="DC"/>
			<DA name="configRev" bType="VisString255" fc="DC"/>
		</DOType>
		<DOType cdc="SPS" id="OpenSCD_SPS_simple">
			<DA name="stVal" bType="BOOLEAN" dchg="true" fc="ST"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="d" bType="VisString255" fc="DC"/>
		</DOType>
		<DOType cdc="LPL" id="OpenSCD_LPL_LD">
			<DA name="vendor" bType="VisString255" fc="DC"/>
			<DA name="swRev" bType="VisString255" fc="DC"/>
			<DA name="d" bType="VisString255" fc="DC"/>
			<DA name="configRev" bType="VisString255" fc="DC"/>
			<DA name="ldNs" bType="VisString255" fc="EX">
				<Val>IEC 61850-7-4:2007B4</Val>
			</DA>
		</DOType>
		<DOType cdc="ENS" id="OpenSCD_ENS_Health">
			<DA name="stVal" bType="Enum" dchg="true" fc="ST" type="HealthKind"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
		</DOType>
		<DOType cdc="ENS" id="OpenSCD_ENS_Beh">
			<DA name="stVal" bType="Enum" dchg="true" fc="ST" type="BehaviourModeKind"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
		</DOType>
		<DOType cdc="ENC" id="OpenSCD_ENC_Mod">
			<DA name="origin" bType="Struct" dchg="true" fc="ST" type="OpenSCD_Originator"/>
			<DA name="stVal" bType="Enum" dchg="true" fc="ST" type="BehaviourModeKind"/>
			<DA name="q" bType="Quality" qchg="true" fc="ST"/>
			<DA name="t" bType="Timestamp" fc="ST"/>
			<DA name="ctlModel" bType="Enum" fc="CF" type="CtlModelKind">
				<Val>sbo-with-enhanced-security</Val>
			</DA>
			<DA name="sboTimeout" bType="INT32U" fc="CF">
				<Val>30000</Val>
			</DA>
			<DA name="operTimeout" bType="INT32U" fc="CF">
				<Val>600</Val>
			</DA>
			<DA name="SBOw" bType="Struct" fc="CO" type="OpenSCD_OperSBOw_BehaviourModeKind"/>
			<DA name="Oper" bType="Struct" fc="CO" type="OpenSCD_OperSBOw_BehaviourModeKind"/>
			<DA name="Cancel" bType="Struct" fc="CO" type="OpenSCD_Cancel_BehaviourModeKind"/>
		</DOType>
		<DAType id="Dummy.AnVal32">
			<BDA name="f" bType="FLOAT32"/>
		</DAType>
		<DAType id="OpenSCD_Unit_V">
			<BDA name="SIUnit" bType="Enum" type="SIUnitKind">
				<Val>A</Val>
			</BDA>
		</DAType>
		<DAType id="OpenSCD_ScaledValueConfig_VolSv">
			<BDA name="scaleFactor" bType="FLOAT32">
				<Val>0.01</Val>
			</BDA>
			<BDA name="offset" bType="FLOAT32">
				<Val>0</Val>
			</BDA>
		</DAType>
		<DAType id="OpenSCD_Unit_Hz">
			<BDA name="SIUnit" bType="Enum" type="SIUnitKind">
				<Val>Hz</Val>
			</BDA>
		</DAType>
		<DAType id="ScaledValueConfig">
			<BDA name="scaleFactor" bType="FLOAT32"/>
			<BDA name="offset" bType="FLOAT32"/>
		</DAType>
		<DAType id="OpenSCD_Unit_A">
			<BDA name="SIUnit" bType="Enum" type="SIUnitKind">
				<Val>A</Val>
			</BDA>
		</DAType>
		<DAType id="OpenSCD_ScaledValueConfig_AmpSv">
			<BDA name="scaleFactor" bType="FLOAT32">
				<Val>0.001</Val>
			</BDA>
			<BDA name="offset" bType="FLOAT32">
				<Val>0</Val>
			</BDA>
		</DAType>
		<DAType id="Unit">
			<BDA name="SIUnit" bType="Enum" type="SIUnitKind"/>
			<BDA name="multiplier" bType="Enum" type="MultiplierKind"/>
		</DAType>
		<DAType id="OpenSCD_AnalogueValue_INT32">
			<BDA name="i" bType="INT32"/>
		</DAType>
		<DAType id="OpenSCD_Cancel_BehaviourModeKind">
			<BDA name="ctlVal" bType="Enum" type="BehaviourModeKind"/>
			<BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<DAType id="OpenSCD_OperSBOw_BehaviourModeKind">
			<BDA name="ctlVal" bType="Enum" type="BehaviourModeKind"/>
			<BDA name="origin" bType="Struct" type="OpenSCD_Originator"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<BDA name="Check" bType="Check"/>
			<ProtNs type="8-MMS">IEC 61850-8-1:2003</ProtNs>
		</DAType>
		<DAType id="OpenSCD_Originator">
			<BDA name="orCat" bType="Enum" type="OriginatorCategoryKind"/>
			<BDA name="orIdent" bType="Octet64"/>
		</DAType>
		<EnumType id="FaultDirectionKind">
			<EnumVal ord="0">unknown</EnumVal>
			<EnumVal ord="1">forward</EnumVal>
			<EnumVal ord="2">backward</EnumVal>
			<EnumVal ord="3">both</EnumVal>
		</EnumType>
		<EnumType id="MultiplierKind">
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
			<EnumVal ord="84">h</EnumVal>
			<EnumVal ord="85">min</EnumVal>
			<EnumVal ord="86">Ohm/m</EnumVal>
			<EnumVal ord="87">percent/s</EnumVal>
		</EnumType>
		<EnumType id="HealthKind">
			<EnumVal ord="1">Ok</EnumVal>
			<EnumVal ord="2">Warning</EnumVal>
			<EnumVal ord="3">Alarm</EnumVal>
		</EnumType>
		<EnumType id="CtlModelKind">
			<EnumVal ord="0">status-only</EnumVal>
			<EnumVal ord="1">direct-with-normal-security</EnumVal>
			<EnumVal ord="2">sbo-with-normal-security</EnumVal>
			<EnumVal ord="3">direct-with-enhanced-security</EnumVal>
			<EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
		</EnumType>
		<EnumType id="BehaviourModeKind">
			<EnumVal ord="1">on</EnumVal>
			<EnumVal ord="2">blocked</EnumVal>
			<EnumVal ord="3">test</EnumVal>
			<EnumVal ord="4">test/blocked</EnumVal>
			<EnumVal ord="5">off</EnumVal>
		</EnumType>
		<EnumType id="OriginatorCategoryKind">
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
	</DataTypeTemplates>
</SCL>
