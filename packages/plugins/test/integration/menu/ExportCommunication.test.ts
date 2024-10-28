import { expect, fixture, html } from '@open-wc/testing';
import { spy, stub, useFakeTimers, restore } from 'sinon';

import ExportCommunication from '../../../src/menu/ExportCommunication.js';

if (!customElements.get('export-communication'))
  customElements.define('export-communication', ExportCommunication);

describe('Export Communication section functions', () => {
  let element: ExportCommunication;
  let doc: XMLDocument;
  let clock: { restore: () => void; tick: (ms: number) => void };

  before(() => {
    clock = useFakeTimers();
  });

  after(() => {
    clock.restore();
  });

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/communication.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<export-communication
        .doc=${doc}
        .docName=${'ConnumicationTest.scd'}
      ></export-communication>`
    );

    await element.updateComplete;
  });

  afterEach(() => restore());

  it('Downloads the Communication section as a string', async () => {
    const fakeLink = document.createElement('a');
    const clickSpy = stub(fakeLink, 'click');
    const revokeSpy = spy(URL, 'revokeObjectURL');
    const createSpy = stub(document, 'createElement').callsFake(() => fakeLink);
    const appendSpy = spy(document.body, 'appendChild');
    const removeSpy = spy(document.body, 'removeChild');

    await element.run();
    expect(createSpy).to.have.been.calledWith('a');
    expect(appendSpy).to.have.been.calledWith(fakeLink);
    expect(clickSpy).to.have.been.called;
    expect(removeSpy).to.have.been.calledWith(fakeLink);
    clock.tick(5000);
    expect(revokeSpy).to.have.been.calledWith(fakeLink.href);
  }).timeout(10000);
});
