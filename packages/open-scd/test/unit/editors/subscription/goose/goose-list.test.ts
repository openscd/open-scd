import { html, fixture, expect } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../../../../src/editors/subscription/goose/goose-list.js';
import { GooseList } from '../../../../../src/editors/subscription/goose/goose-list.js';

describe('goose-list', () => {
  let element: GooseList;
  let validSCL: XMLDocument;

  let selectEvent: SinonSpy;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    selectEvent = spy();
    window.addEventListener('goose-select', selectEvent);

    element = await fixture(html`<goose-list .doc=${validSCL}></goose-list>`);
  });

  it('looks like the latest snapshot with a document loaded', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot without a doc loaded', async () => {
    element = await fixture(html`<goose-list></goose-list>`);
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('sends a newGOOSESelectEvent on first update', () => {
    expect(selectEvent).to.have.be.calledOnce;
    expect(selectEvent.args[0][0].detail.gseControl).to.be.undefined;
    expect(selectEvent.args[0][0].detail.dataset).to.be.undefined;
  });

  it('triggers a newGOOSESelectEvent when a list item is clicked', () => {
    selectEvent.resetHistory();

    const listItem = Array.from(
      element.shadowRoot?.querySelectorAll('mwc-list-item[graphic="large"]') ??
        []
    ).filter(a => a.innerHTML.includes('GCB'))[0];

    (<HTMLElement>listItem).click();

    expect(selectEvent).to.have.be.calledOnce;
    expect(selectEvent.args[0][0].detail.gseControl).to.eql(
      validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint > Server > LDevice > LN0 > GSEControl[name="GCB"]'
      )
    );
    expect(selectEvent.args[0][0].detail.dataset).to.eql(
      validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint > Server > LDevice > LN0 > DataSet[name="GooseDataSet1"]'
      )
    );
  });

  it('triggers edit wizard when the Edit button of a GOOSE list item is pressed', async () => {
    const wizardEvent = spy();
    window.addEventListener('wizard', wizardEvent);

    expect(
      element.shadowRoot?.querySelector(
        'mwc-list-item[graphic="large"] > mwc-icon-button[class="hidden"]'
      )
    ).to.not.be.null;

    (<HTMLElement>(
      element.shadowRoot?.querySelector('mwc-list-item[graphic="large"]')
    )).click();
    await element.updateComplete;

    expect(
      element.shadowRoot?.querySelector(
        'mwc-list-item[graphic="large"] > mwc-icon-button[class=""]'
      )
    ).to.not.be.null;

    (<HTMLElement>(
      element.shadowRoot?.querySelector(
        'mwc-list-item[graphic="large"] > mwc-icon-button'
      )
    )).click();
    await element.updateComplete;

    const gseControl = validSCL.querySelector(
      'IED[name="IED1"] > AccessPoint > Server > LDevice > LN0 > GSEControl[name="GCB"]'
    );

    expect(wizardEvent).to.have.be.calledOnce;
    expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('edit');
    expect(wizardEvent.args[0][0].detail.wizard()[0].element).to.eql(
      gseControl
    );
  });
});
