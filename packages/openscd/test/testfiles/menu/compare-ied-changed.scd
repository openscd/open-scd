<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4">
	<Header id="TrainingIEC61850" version="1" revision="54" toolID="IEC 61850 System Configurator, Version: V5.80 " nameStructure="IEDName">
		<Text>TrainingIEC61850</Text>
		<History>
			<Hitem version="1" revision="54" when="Tuesday, October 2, 2018 5:33:19 PM" who="-" what="-" why="-"/>
		</History>
	</Header>
	<IED name="FieldA_QA1_QB1_QB2_QC9" type="ISIO 200 Circuit Breaker and Disconnector Interface" manufacturer="OMICRON" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="TrainingIEC61850">
		<AccessPoint name="P1">
			<Server>
				<Authentication none="true"/>
				<LDevice inst="CBSW">
					<LN0 lnClass="LLN0" inst="" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0">
						<DataSet name="GooseDataSet1">
							<FCDA ldInst="CBSW" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="3" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="3" doName="Pos" daName="q" fc="ST"/>
						</DataSet>
						<GSEControl type="GOOSE" appID="FieldA_QA1_QB1_QB2_QC9" fixedOffs="false" confRev="1" name="GCB" datSet="GooseDataSet1"/>
					</LN0>
					<LN lnClass="LPHD" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1">
						<DOI name="PhyHealth">
							<DAI name="stVal">
								<Val>Ok</Val>
							</DAI>
						</DOI>
						<DOI name="PhyNam">
							<DAI name="model">
								<Val>Newest model</Val>
							</DAI>
							<DAI name="vendor">
								<Val>Other value</Val>
							</DAI>
						</DOI>
					</LN>
					<LN lnClass="XCBR" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1">
					</LN>
					<LN lnClass="XSWI" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XSWI1">
					</LN>
					<LN lnClass="XSWI" inst="2" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XSWI1">
					</LN>
					<LN lnClass="XSWI" inst="3" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XSWI1">
					</LN>
					<LN lnClass="GGIO" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.GGIO1">
					</LN>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<IED name="FieldB_QA1_QB1_QB2_QC9" type="ISIO 200 Circuit Breaker and Disconnector Interface" manufacturer="OMICRON" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="TrainingIEC61850">
		<AccessPoint name="P1">
			<Server>
				<Authentication/>
				<LDevice inst="CBSW">
					<LN0 lnClass="LLN0" inst="" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0">
						<DataSet name="GooseDataSet1">
							<FCDA ldInst="CBSW" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="3" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="3" doName="Pos" daName="q" fc="ST"/>
						</DataSet>
						<GSEControl appID="FieldB_QA1_QB1_QB2_QC9" confRev="1" name="GCB" datSet="GooseDataSet1"/>
					</LN0>
					<LN lnClass="LPHD" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1">
					</LN>
					<LN lnClass="XCBR" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1">
					</LN>
					<LN lnClass="XSWI" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XSWI1">
					</LN>
					<LN lnClass="XSWI" inst="2" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XSWI1">
					</LN>
					<LN lnClass="XSWI" inst="3" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XSWI1">
					</LN>
					<LN lnClass="GGIO" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.GGIO1">
					</LN>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<IED name="FieldC_QA1_QB1_QB2_QC9" type="ISIO 200 Circuit Breaker and Disconnector Interface" manufacturer="OMICRON" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="TrainingIEC61850">
		<AccessPoint name="P1">
			<Server>
				<Authentication none="true"/>
				<LDevice inst="CBSW">
					<LN0 lnClass="LLN0" inst="" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0">
						<DataSet name="GooseDataSet1">
							<FCDA ldInst="CBSW" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="q" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="3" doName="Pos" daName="stVal" fc="ST"/>
							<FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="3" doName="Pos" daName="q" fc="ST"/>
						</DataSet>
						<GSEControl type="GOOSE" appID="FieldC_QA1_QB1_QB2_QC9" fixedOffs="false" confRev="1" name="GCB" datSet="GooseDataSet1"/>
					</LN0>
					<LN lnClass="LPHD" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1">
					</LN>
					<LN lnClass="XCBR" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1">
					</LN>
					<LN lnClass="XSWI" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XSWI1">
					</LN>
					<LN lnClass="XSWI" inst="2" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XSWI1">
					</LN>
					<LN lnClass="XSWI" inst="3" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XSWI1">
					</LN>
					<LN lnClass="GGIO" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.GGIO1">
					</LN>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
  <IED name="FieldC_QA1_QB1_QB2_QCX" type="ISIO 200 Circuit Breaker and Disconnector Interface" manufacturer="OMICRON" configVersion="1" originalSclVersion="2007" originalSclRevision="B" owner="TrainingIEC61850">
    <AccessPoint name="P1">
      <Server>
        <Authentication none="true"/>
        <LDevice inst="CBSW">
          <LN0 lnClass="LLN0" inst="" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0">
            <DataSet name="GooseDataSet1">
              <FCDA ldInst="CBSW" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
              <FCDA ldInst="CBSW" prefix="" lnClass="XCBR" lnInst="1" doName="Pos" daName="q" fc="ST"/>
              <FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" daName="stVal" fc="ST"/>
              <FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="1" doName="Pos" daName="q" fc="ST"/>
              <FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="stVal" fc="ST"/>
              <FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="2" doName="Pos" daName="q" fc="ST"/>
              <FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="3" doName="Pos" daName="stVal" fc="ST"/>
              <FCDA ldInst="CBSW" prefix="" lnClass="XSWI" lnInst="3" doName="Pos" daName="q" fc="ST"/>
            </DataSet>
            <GSEControl type="GOOSE" appID="FieldC_QA1_QB1_QB2_QC9" fixedOffs="false" confRev="1" name="GCB" datSet="GooseDataSet1"/>
          </LN0>
          <LN lnClass="LPHD" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1">
          </LN>
          <LN lnClass="XCBR" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1">
          </LN>
          <LN lnClass="XSWI" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XSWI1">
          </LN>
          <LN lnClass="XSWI" inst="2" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XSWI1">
          </LN>
          <LN lnClass="XSWI" inst="3" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.XSWI1">
          </LN>
          <LN lnClass="GGIO" inst="1" lnType="FieldA_QA1_QB1_QB2_QC9CBSW.GGIO1">
          </LN>
        </LDevice>
      </Server>
    </AccessPoint>
  </IED>
  	<IED name="IED1" manufacturer="DummyManu">
		<AccessPoint name="A1">
			<Server>
				<Authentication/>
				<LDevice inst="CurrentTransformer_RES">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="" lnClass="TCTR" inst="1" lnType="Dummy.TCTR">
						<DOI name="HzRtg">
							<SDI name="setMag">
								<DAI name="i">
									<Val>60</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="ARtgSec">
							<DAI name="setVal">
								<Val>5</Val>
							</DAI>
						</DOI>
						<DOI name="ARtgNom">
							<SDI name="setMag">
								<DAI name="f">
									<Val>100</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="Rat">
							<SDI name="setMag">
								<DAI name="f">
									<Val>20</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="ARtg">
							<SDI name="setMag">
								<DAI name="f">
									<Val>100</Val>
								</DAI>
							</SDI>
						</DOI>
					</LN>
				</LDevice>
				<LDevice inst="CurrentTransformer_L1">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0">
						<DOI name="NamPlt">
							<DAI name="vendor">
								<Val>SomeOtherVendor</Val>
							</DAI>
						</DOI>
					</LN0>
					<LN prefix="" lnClass="TCTR" inst="1" lnType="Dummy.TCTR">
						<DOI name="HzRtg">
							<SDI name="setMag">
								<DAI name="i">
									<Val>60</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="ARtg">
							<SDI name="setMag">
								<DAI name="f">
									<Val>1000</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="ARtgNom">
							<SDI name="setMag">
								<DAI name="f">
									<Val>1000</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="ARtgSec">
							<DAI name="setVal">
								<Val>5</Val>
							</DAI>
						</DOI>
						<DOI name="Rat">
							<SDI name="setMag">
								<DAI name="f">
									<Val>200</Val>
								</DAI>
							</SDI>
						</DOI>
					</LN>
				</LDevice>
				<LDevice inst="VoltageTransformer_RES">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="" lnClass="TVTR" inst="1" lnType="Dummy.TVTR">
						<DOI name="HzRtg">
							<SDI name="setMag">
								<DAI name="i">
									<Val>60</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="VRtg">
							<SDI name="setMag">
								<DAI name="f">
									<Val>5000</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="VRtgSec">
							<DAI name="setVal">
								<Val>200</Val>
							</DAI>
						</DOI>
						<DOI name="Rat">
							<SDI name="setMag">
								<DAI name="f">
									<Val>25</Val>
								</DAI>
							</SDI>
						</DOI>
					</LN>
				</LDevice>
				<LDevice inst="VoltageTransformer_L1">
					<LN0 lnClass="LLN0" inst="" lnType="Dummy.LLN0"/>
					<LN prefix="" lnClass="TVTR" inst="1" lnType="Dummy.TVTR">
						<DOI name="HzRtg">
							<SDI name="setMag">
								<DAI name="i">
									<Val>60</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="VRtg">
							<SDI name="setMag">
								<DAI name="f">
									<Val>10000</Val>
								</DAI>
							</SDI>
						</DOI>
						<DOI name="VRtgSec">
							<DAI name="setVal">
								<Val>200</Val>
							</DAI>
						</DOI>
						<DOI name="Rat">
							<SDI name="setMag">
								<DAI name="f">
									<Val>500</Val>
								</DAI>
							</SDI>
						</DOI>
					</LN>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
	<DataTypeTemplates>
		<LNodeType lnClass="GGIO" id="FieldA_QA1_QB1_QB2_QC9CBSW.GGIO1">
			<DO name="Beh" type="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Beh"/>
			<DO name="NamPlt" type="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.NamPlt"/>
			<DO name="Ind1" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Proxy"/>
			<DO name="Ind2" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Proxy"/>
			<DO name="Ind3" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Proxy"/>
			<DO name="Ind4" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Proxy"/>
			<DO name="Ind5" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Proxy"/>
			<DO name="Ind6" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Proxy"/>
			<DO name="Ind7" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Proxy"/>
			<DO name="Ind8" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Proxy"/>
			<DO name="SPCSO1" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim"/>
			<DO name="SPCSO2" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim"/>
			<DO name="SPCSO3" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim"/>
			<DO name="SPCSO4" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim"/>
			<DO name="SPCSO5" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim"/>
			<DO name="SPCSO6" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim"/>
			<DO name="SPCSO7" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim"/>
			<DO name="SPCSO8" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim"/>
		</LNodeType>
		<LNodeType lnClass="LLN0" id="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0">
			<DO name="Mod" type="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Mod"/>
			<DO name="Beh" type="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Beh"/>
			<DO name="Health" type="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Health"/>
			<DO name="NamPlt" type="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.NamPlt"/>
		</LNodeType>
		<LNodeType lnClass="LPHD" id="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1">
			<DO name="PhyNam" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.PhyNam"/>
			<DO name="PhyHealth" type="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Health"/>
			<DO name="Proxy" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Proxy"/>
			<DO name="Sim" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim"/>
		</LNodeType>
		<LNodeType lnClass="XCBR" id="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1">
			<DO name="Beh" type="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Beh"/>
			<DO name="NamPlt" type="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.NamPlt"/>
			<DO name="Loc" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Proxy"/>
			<DO name="OpCnt" type="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.OpCnt"/>
			<DO name="Pos" type="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.Pos"/>
			<DO name="BlkOpn" type="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.BlkOpn"/>
			<DO name="BlkCls" type="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.BlkOpn"/>
		</LNodeType>
		<LNodeType lnClass="XSWI" id="FieldA_QA1_QB1_QB2_QC9CBSW.XSWI1">
			<DO name="Beh" type="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Beh"/>
			<DO name="NamPlt" type="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.NamPlt"/>
			<DO name="Loc" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Proxy"/>
			<DO name="OpCnt" type="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.OpCnt"/>
			<DO name="Pos" type="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.Pos"/>
			<DO name="BlkOpn" type="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.BlkOpn"/>
			<DO name="BlkCls" type="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.BlkOpn"/>
		</LNodeType>
		<DOType cdc="DPC" id="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.Pos">
			<DA fc="ST" name="stVal" bType="Dbpos"/>
			<DA fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
			<DA fc="CF" name="ctlModel" bType="Enum" type="SIPROTEC5_Textlist_ctlModel_V07.80.17_V02.00.00"/>
			<DA fc="DC" name="d" bType="VisString255"/>
		</DOType>
		<DOType cdc="DPL" id="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.PhyNam">
			<DA fc="DC" name="vendor" bType="VisString255"/>
			<DA fc="DC" name="hwRev" bType="VisString255"/>
			<DA fc="DC" name="swRev" bType="VisString255"/>
			<DA fc="DC" name="serNum" bType="VisString255"/>
			<DA fc="DC" name="model" bType="VisString255"/>
		</DOType>
		<DOType cdc="ENC" id="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Mod">
			<DA fc="ST" name="stVal" bType="Enum" type="Beh"/>
			<DA fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
			<DA fc="ST" name="stSeld" bType="BOOLEAN"/>
			<DA fc="OR" name="opRcvd" bType="BOOLEAN"/>
			<DA fc="OR" name="opOk" bType="BOOLEAN"/>
			<DA fc="OR" name="tOpOk" bType="Timestamp"/>
			<DA fc="CF" name="ctlModel" bType="Enum" type="SIPROTEC5_Textlist_ctlModel_V07.80.17_V02.00.00"/>
			<DA fc="CF" name="sboTimeout" bType="INT32U"/>
			<DA fc="CF" name="operTimeout" bType="INT32U"/>
			<DA fc="CO" name="SBO" bType="ObjRef"/>
			<DA fc="CO" name="SBOw" bType="Struct" type="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Mod.SBOw"/>
			<DA fc="CO" name="Oper" bType="Struct" type="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Mod.SBOw"/>
			<DA fc="CO" name="Cancel" bType="Struct" type="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Mod.Cancel"/>
		</DOType>
		<DOType cdc="ENS" id="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Beh">
			<DA fc="ST" name="stVal" bType="Enum" type="Beh"/>
			<DA fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
		</DOType>
		<DOType cdc="ENS" id="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Health">
			<DA fc="ST" name="stVal" bType="Enum" type="SIPROTEC5_Textlist_Health_V07.80.17_V02.00.00"/>
			<DA fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
		</DOType>
		<DOType cdc="INS" id="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.OpCnt">
			<DA fc="ST" name="stVal" bType="INT32"/>
			<DA fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
		</DOType>
		<DOType cdc="LPL" id="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.NamPlt">
			<DA fc="DC" name="vendor" bType="VisString255"/>
			<DA fc="DC" name="swRev" bType="VisString255"/>
			<DA fc="DC" name="d" bType="VisString255"/>
			<DA fc="DC" name="configRev" bType="VisString255"/>
			<DA fc="EX" name="ldNs" bType="VisString255"/>
		</DOType>
		<DOType cdc="LPL" id="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.NamPlt">
			<DA fc="DC" name="vendor" bType="VisString255"/>
			<DA fc="DC" name="swRev" bType="VisString255"/>
			<DA fc="DC" name="d" bType="VisString255"/>
		</DOType>
		<DOType cdc="SPC" id="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim">
			<DA fc="ST" name="stVal" bType="BOOLEAN"/>
			<DA fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
			<DA fc="ST" name="stSeld" bType="BOOLEAN"/>
			<DA fc="OR" name="opRcvd" bType="BOOLEAN"/>
			<DA fc="OR" name="opOk" bType="BOOLEAN"/>
			<DA fc="OR" name="tOpOk" bType="Timestamp"/>
			<DA fc="CF" name="ctlModel" bType="Enum" type="SIPROTEC5_Textlist_ctlModel_V07.80.17_V02.00.00"/>
			<DA fc="CF" name="sboTimeout" bType="INT32U"/>
			<DA fc="CF" name="operTimeout" bType="INT32U"/>
			<DA fc="DC" name="d" bType="VisString255"/>
			<DA fc="CO" name="SBO" bType="ObjRef"/>
			<DA fc="CO" name="SBOw" bType="Struct" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim.SBOw"/>
			<DA fc="CO" name="Oper" bType="Struct" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim.SBOw"/>
			<DA fc="CO" name="Cancel" bType="Struct" type="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim.Cancel"/>
		</DOType>
		<DOType cdc="SPC" id="FieldA_QA1_QB1_QB2_QC9CBSW.XCBR1.BlkOpn">
			<DA fc="ST" name="stVal" bType="BOOLEAN"/>
			<DA fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
			<DA fc="CF" name="ctlModel" bType="Enum" type="SIPROTEC5_Textlist_ctlModel_V07.80.17_V02.00.00"/>
			<DA fc="DC" name="d" bType="VisString255"/>
		</DOType>
		<DOType cdc="SPS" id="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Proxy">
			<DA fc="ST" name="stVal" bType="BOOLEAN"/>
			<DA fc="ST" name="q" bType="Quality"/>
			<DA fc="ST" name="t" bType="Timestamp"/>
			<DA fc="DC" name="d" bType="VisString255"/>
		</DOType>
		<DAType id="SIPROTEC5_DAType_origin_V07.80.17_V02.00.00">
			<BDA name="orCat" bType="Enum" type="SIPROTEC5_Textlist_orCategory_V07.80.17_V02.00.00"/>
			<BDA name="orIdent" bType="Octet64"/>
		</DAType>
		<DAType id="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim.SBOw">
			<BDA name="ctlVal" bType="BOOLEAN"/>
			<BDA name="origin" bType="Struct" type="SIPROTEC5_DAType_origin_V07.80.17_V02.00.00"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<BDA name="Check" bType="Check"/>
		</DAType>
		<DAType id="FieldA_QA1_QB1_QB2_QC9CBSW.LPHD1.Sim.Cancel">
			<BDA name="ctlVal" bType="BOOLEAN"/>
			<BDA name="origin" bType="Struct" type="SIPROTEC5_DAType_origin_V07.80.17_V02.00.00"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
		</DAType>
		<DAType id="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Mod.SBOw">
			<BDA name="ctlVal" bType="Enum" type="Beh"/>
			<BDA name="origin" bType="Struct" type="SIPROTEC5_DAType_origin_V07.80.17_V02.00.00"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
			<BDA name="Check" bType="Check"/>
		</DAType>
		<DAType id="FieldA_QA1_QB1_QB2_QC9CBSW.LLN0.Mod.Cancel">
			<BDA name="ctlVal" bType="Enum" type="Beh"/>
			<BDA name="origin" bType="Struct" type="SIPROTEC5_DAType_origin_V07.80.17_V02.00.00"/>
			<BDA name="ctlNum" bType="INT8U"/>
			<BDA name="T" bType="Timestamp"/>
			<BDA name="Test" bType="BOOLEAN"/>
		</DAType>
		<EnumType id="SIPROTEC5_Textlist_Health_V07.80.17_V02.00.00">
			<EnumVal ord="1">Ok</EnumVal>
			<EnumVal ord="2">Warning</EnumVal>
			<EnumVal ord="3">Alarm</EnumVal>
		</EnumType>
		<EnumType id="SIPROTEC5_Textlist_orCategory_V07.80.17_V02.00.00">
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
		<EnumType id="SIPROTEC5_Textlist_ctlModel_V07.80.17_V02.00.00">
			<EnumVal ord="0">status-only</EnumVal>
			<EnumVal ord="1">direct-with-normal-security</EnumVal>
			<EnumVal ord="2">sbo-with-normal-security</EnumVal>
			<EnumVal ord="3">direct-with-enhanced-security</EnumVal>
			<EnumVal ord="4">sbo-with-enhanced-security</EnumVal>
		</EnumType>
		<EnumType id="Beh">
			<EnumVal ord="1">on</EnumVal>
			<EnumVal ord="2">blocked</EnumVal>
			<EnumVal ord="3">test</EnumVal>
			<EnumVal ord="4">test/blocked</EnumVal>
			<EnumVal ord="5">off</EnumVal>
		</EnumType>
	</DataTypeTemplates>
</SCL>
