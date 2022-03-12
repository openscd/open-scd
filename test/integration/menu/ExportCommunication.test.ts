import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import ExportCommunication from '../../../src/menu/ExportCommunication.js';

describe('Export Communication section outputs formatted XML', () => {
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
    element.run();
    await parent.requestUpdate();
  });

  it('and is the correct XML', async () => {
    const text = await element.exportedCommunicationSection?.text();
    const lineFeedRemovalRegex = /(?:\r\n|\r|\n)/g;
    const textWithoutLineFeeds = text!.replace(lineFeedRemovalRegex, '');
    expect(textWithoutLineFeeds).equal(
      `<Communication xmlns="http://www.iec.ch/61850/2003/SCL">
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
</Communication>`.replace(lineFeedRemovalRegex, '')
    );
  });
});
