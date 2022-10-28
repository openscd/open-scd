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

});
