import { fixture, html, expect } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../../../src/editors/substation/ied-editor.js';
import { IedEditor } from '../../../../src/editors/substation/ied-editor.js';

describe('A component to visualize SCL element IED', () => {
  let element: IedEditor;
  let validSCL: XMLDocument;

  let wizardEvent: SinonSpy;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = <IedEditor>(
      await fixture(
        html`<ied-editor
          .element=${validSCL.querySelector('IED')}
        ></ied-editor>`
      )
    );

    wizardEvent = spy();
    window.addEventListener('wizard', wizardEvent);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('renders label UNDEFINED in case IED name attribute is missing', async () => {
    const condEq = validSCL.querySelector('IED');
    condEq?.removeAttribute('name');
    await element.requestUpdate();

    expect(element).to.have.property('name', 'UNDEFINED');
  });

  it('triggers reference wizard for removing IED on action button click', async () => {
    (<HTMLElement>(
      element.shadowRoot?.querySelector('mwc-fab[class="delete"]')
    )).click();

    await element.requestUpdate();

    expect(wizardEvent).to.have.be.calledOnce;
    expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain(
      'delete'
    );
  });

  it('triggers create wizard for ClientLN element on action button click', async () => {
    (<HTMLElement>(
      element.shadowRoot?.querySelector('mwc-fab[class="connectreport"]')
    )).click();

    await element.requestUpdate();

    expect(wizardEvent).to.have.be.calledOnce;
    expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain(
      'connectToIED'
    );
  });

  it('still triggers create wizard for ClientLN element with missing parent', async () => {
    const copyElement: Element = <Element>element.cloneNode(true);
    element.element = copyElement;
    await element.requestUpdate();

    (<HTMLElement>(
      element.shadowRoot?.querySelector('mwc-fab[class="connectreport"]')
    )).click();

    await element.requestUpdate();

    expect(wizardEvent).to.have.been.calledOnce;
    expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain(
      'connectToIED'
    );
  });
});