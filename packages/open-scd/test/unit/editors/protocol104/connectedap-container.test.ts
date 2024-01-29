import { html, fixture, expect } from '@open-wc/testing';
import { spy } from 'sinon';

import '../../../../src/editors/protocol104/connectedap-editor.js'
import { ConnectedAP104Editor } from '../../../../src/editors/protocol104/connectedap-editor.js';

describe('connectedap-104-editor', () => {
  let element: ConnectedAP104Editor;
  let document: XMLDocument;
  let connectedAP: Element;

  beforeEach(async () => {
    document = await fetch('/test/testfiles/104/valid-subnetwork.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    connectedAP = document.querySelector('SubNetwork[type="104"] > ConnectedAP')!;

    element = await fixture(
      html `<connectedap-104-editor
        .element=${connectedAP}>
      </connectedap-104-editor>`
    );
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
  
  it('has a mwc-fab which deletes the ConnectedAP', () => {
    const editorEvent = spy();
    window.addEventListener('editor-action', editorEvent);

    (<HTMLElement>(element.shadowRoot?.querySelector('mwc-fab[icon="delete"]'))).click();
    expect(editorEvent).to.have.be.calledOnce;
    expect(editorEvent.args[0][0].detail.action.old.element).to.eql(connectedAP);
  });
  
  it('has a mwc-fab which creates an edit wizard for the ConnectedAP', () => {
    const wizardEvent = spy();
    window.addEventListener('wizard', wizardEvent);

    (<HTMLElement>(element.shadowRoot?.querySelector('mwc-fab[icon="edit"]'))).click();
    expect(wizardEvent).to.have.be.calledOnce;
    expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('edit');
    expect(wizardEvent.args[0][0].detail.wizard()[0].element).to.contain(connectedAP);
  });
});
