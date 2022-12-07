<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
	<Header id="general_equipment"/>
	<Substation xmlns="http://www.iec.ch/61850/2003/SCL" name="AA1" desc="">
		<VoltageLevel name="E1" desc="" nomFreq="50" numPhases="3">
			<PowerTransformer name="pTransVolt" type="PTR">
				<TransformerWinding name="empty" type="PTW"/>
				<TransformerWinding name="some" type="PTW">
					<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI" />
					<EqFunction name="eqFunc">
						<EqSubFunction name="eqSubFunc">
							<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI" />
						</EqSubFunction>
					</EqFunction>
				</TransformerWinding>
			</PowerTransformer>
			<Voltage unit="V" multiplier="k">110</Voltage>
			<Bay name="Q01" desc="">
				<PowerTransformer name="pTransBay" type="PTR">
					<TransformerWinding name="some" type="PTW">
						<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI" />
						<EqFunction name="eqFunc">
							<EqSubFunction name="eqSubFunc">
								<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI" />
							</EqSubFunction>
						</EqFunction>
					</TransformerWinding>
				</PowerTransformer>
			</Bay>
			<Bay name="Q02" desc="">
				<Function name="F1">
					<SubFunction name="Sub1">
						<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI"/>
					</SubFunction>
				</Function>
			</Bay>
			<Bay name="Q03" desc="">
				<Function name="F1">
					<SubFunction name="Sub1">
						<LNode iedName="None" lnClass="CSWI" lnInst="1" lnType="OpenSCD_CSWI"/>
					</SubFunction>
				</Function>
			</Bay>
		</VoltageLevel>
	</Substation>
</SCL>