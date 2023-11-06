import { fixture, html, expect } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../../../src/editors/communication/connectedap-editor.js';
import { ConnectedAPEditor } from '../../../../src/editors/communication/connectedap-editor.js';
import { isDelete } from '../../../../src/foundation.js';

describe('A component to visualize SCL element ConnectedAP', () => {
  let element: ConnectedAPEditor;
  let validSCL: XMLDocument;

  let wizardEvent: SinonSpy;
  let actionEvent: SinonSpy;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/communication/communication.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = <ConnectedAPEditor>(
      await fixture(
        html`<connectedap-editor
          .element=${validSCL.querySelector(
            'SubNetwork[name="StationBus"] > ConnectedAP'
          )}
        ></connectedap-editor>`
      )
    );

    wizardEvent = spy();
    window.addEventListener('wizard', wizardEvent);
    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  it('looks like the latest snapshot', async () =>
    await expect(element).shadowDom.to.equalSnapshot());

  it('renders label UNDEFINED in case ConnectedAP apName attribute is missing', async () => {
    const connAp = validSCL.querySelector('ConnectedAP');
    connAp?.removeAttribute('apName');
    await element.requestUpdate();

    expect(element).to.have.property('apName', 'UNDEFINED');
  });

  it('triggers edit wizard for ConnectedAP element on action button click', async () => {
    (<HTMLElement>(
      element.shadowRoot?.querySelector('mwc-fab[icon="edit"]')
    )).click();

    await element.requestUpdate();

    expect(wizardEvent).to.have.be.calledOnce;
    expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('edit');
  });

  it('triggers remove action on action button click', async () => {
    (<HTMLElement>(
      element.shadowRoot?.querySelector('mwc-fab[icon="delete"]')
    )).click();

    await element.requestUpdate();

    expect(wizardEvent).to.not.have.been.called;
    expect(actionEvent).to.have.been.calledOnce;
    expect(actionEvent.args[0][0].detail.action).to.satisfy(isDelete);
  });
});
