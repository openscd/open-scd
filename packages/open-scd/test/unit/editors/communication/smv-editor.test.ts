import { fixture, html, expect } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../../../src/editors/communication/smv-editor.js';
import { SmvEditor } from '../../../../src/editors/communication/smv-editor.js';
import { isDelete } from '../../../../src/foundation.js';

describe('Editor web component for SMV element', () => {
  let element: SmvEditor;

  let wizardEvent: SinonSpy;
  let actionEvent: SinonSpy;

  beforeEach(async () => {
    const doc = await fetch('/test/testfiles/communication/communication.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    const smv = doc.querySelector('SMV')!;

    element = await fixture(
      html`<smv-editor .doc=${doc} .element=${smv}></smv-editor>`
    );

    wizardEvent = spy();
    window.addEventListener('wizard', wizardEvent);
    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  it('looks like its latest snapshot', async () =>
    await expect(element).shadowDom.to.equalSnapshot());

  it('looks like its latest snapshot', async () =>
    await expect(element).shadowDom.to.equalSnapshot());

  it('triggers edit wizard on action button click', async () => {
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
