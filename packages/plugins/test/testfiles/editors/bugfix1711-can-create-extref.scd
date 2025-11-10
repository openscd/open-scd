<?xml version="1.0" encoding="UTF-8"?>
<SCL xmlns="http://www.iec.ch/61850/2003/SCL" version="2007" revision="B" release="4" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ext="http://www.nrec.com">
	<IED name="IED1" type="PCS-221S" originalSclVersion="2007" originalSclRevision="B">
		<AccessPoint name="S1">
			<Server>
				<Authentication />
				<LDevice inst="LD0">
					<LN0 desc="LLN0" lnType="LLN0_type" lnClass="LLN0" inst="">
						<DataSet name="ds1">
							<FCDA ldInst="LD0" prefix="" lnClass="LLN0" doName="AnIn1"/>
						</DataSet>
						<GSEControl name="gseControl" datSet="ds1" confRev="10001" appID="gse1" />
					</LN0>
				</LDevice>
			</Server>
		</AccessPoint>
	</IED>
</SCL>
