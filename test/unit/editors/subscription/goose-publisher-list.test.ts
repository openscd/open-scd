import { html, fixture, expect } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../../../src/editors/subscription/goose-publisher-list.js'
import { GoosePublisherList } from '../../../../src/editors/subscription/goose-publisher-list.js';

describe('goose-publisher-list', () => {
  let element: GoosePublisherList;
  let validSCL: XMLDocument;
  
  let wizardEvent: SinonSpy;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    wizardEvent = spy();
    window.addEventListener('wizard', wizardEvent);

    element = await fixture(html`<goose-publisher-list
      .doc=${validSCL}
    ></goose-publisher-list>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot without a doc loaded', async () => {
    element = await fixture(html`<goose-publisher-list></goose-publisher-list>`);

    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('triggers edit wizard when the Edit button of a GseControl is pressed', async () => {
    expect(element.shadowRoot?.querySelector('mwc-list-item[graphic="large"] > mwc-icon-button[class="hidden"]')).to.not.be.null;

    (<HTMLElement>(
      element.shadowRoot?.querySelector('mwc-list-item[graphic="large"]')
    )).click();
    await element.updateComplete;

    expect(element.shadowRoot?.querySelector('mwc-list-item[graphic="large"] > mwc-icon-button[class=""]')).to.not.be.null;

    (<HTMLElement>(
      element.shadowRoot?.querySelector('mwc-list-item[graphic="large"] > mwc-icon-button')
    )).click();
    await element.updateComplete;

    const gseControl = validSCL.querySelector('IED[name="IED1"] > AccessPoint > Server > LDevice > LN0 > GSEControl[name="GCB"]');

    expect(wizardEvent).to.have.be.calledOnce;
    expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('edit');
    expect(wizardEvent.args[0][0].detail.wizard()[0].element).to.eql(gseControl);
  });
});
