import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import ExportCommunication from '../../../src/menu/ExportCommunication.js';

describe('Export Communication section functions', () => {
  if (customElements.get('export-communication') === undefined)
    customElements.define('export-communication', ExportCommunication);

  let parent: MockWizardEditor;
  let element: ExportCommunication;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/communication.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = await fixture(html`
      <mock-wizard-editor
        ><export-communication></export-communication
      ></mock-wizard-editor>
    `);

    element = <ExportCommunication>(
      parent.querySelector('export-communication')!
    );

    element.doc = doc;
    element.docName = 'CommunicationTest.scd';
    element.run();
    await parent.requestUpdate();
  });

  it('and produces the correct XML', async () => {
    const docText = await element.exportBlob?.text();
    const lineFeedRemovalRegex = /(?:\r\n|\r|\n|\t)/g;
    const textWithoutLineFeeds = docText!.replace(lineFeedRemovalRegex, '');
    expect(textWithoutLineFeeds).equal(
      `<?xml version="1.0" encoding="UTF-8"?>
<SCL xsi:schemaLocation="http://www.iec.ch/61850/2003/SCL SCL.xsd" release="4" revision="B" version="2007" xmlns:IEC_60870_5_104="http://www.iec.ch/61850-80-1/2007/SCL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:scl="http://www.iec.ch/61850/2003/SCL" xmlns:txy="http://www.iec.ch/61850/2003/Terminal" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:sxy="http://www.iec.ch/61850/2003/SCLcoordinates">
<Header id="TrainingIEC61850" version="1" revision="143" toolID="IEC 61850 System Configurator, Version: V5.90 " nameStructure="IEDName">
<Text>TrainingIEC61850</Text>
<History>
<Hitem version="1" revision="143" when="Wednesday, September 25, 2019 9:11:36 AM" who="Licenced User: OMICRON electronics GmbH JakVog00 Machine: JAKVOG00LW01 User: JakVog00" what="Station is upgraded from IEC 61850 System Configurator, Version: V5.80 HF1 to V5.90 ." why="IEC 61850 System Configurator Automatic Startup: Insert Comment"/>
</History>
</Header>
<Communication>
<SubNetwork name="StationBus" desc="desc" type="8-MMS">
<BitRate unit="b/s">100.0</BitRate>
<ConnectedAP iedName="IED1" apName="P1">
</ConnectedAP>
</SubNetwork>
<SubNetwork name="ProcessBus" type="8-MMS">
<ConnectedAP iedName="IED2" apName="P1">
</ConnectedAP>
<ConnectedAP iedName="IED3" apName="P1">
</ConnectedAP>
<ConnectedAP iedName="IED1" apName="P2">
</ConnectedAP>
</SubNetwork>
</Communication>
</SCL>
`.replace(lineFeedRemovalRegex, '')
    );
  });
});
