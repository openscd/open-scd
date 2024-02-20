import { html, fixture, expect } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../../../../src/editors/subscription/sampledvalues/smv-list.js';
import { SmvPublisherList } from '../../../../../src/editors/subscription/sampledvalues/smv-list.js';

describe('smv-list', () => {
  let element: SmvPublisherList;
  let validSCL: XMLDocument;

  let selectEvent: SinonSpy;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    selectEvent = spy();
    window.addEventListener('smv-select', selectEvent);

    element = await fixture(html`<smv-list .doc=${validSCL}></smv-list>`);
  });

  it('looks like the latest snapshot with a document loaded', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot without a doc loaded', async () => {
    element = await fixture(html`<smv-list></smv-list>`);
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('sends a newSmvSelectEvent on first update', () => {
    expect(selectEvent).to.have.be.calledOnce;
    expect(selectEvent.args[0][0].detail.smvControl).to.be.undefined;
    expect(selectEvent.args[0][0].detail.dataset).to.be.undefined;
  });

  it('triggers a newSmvSelectEvent when a list item is clicked', () => {
    selectEvent.resetHistory();

    const listItem = Array.from(
      element.shadowRoot?.querySelectorAll('mwc-list-item[graphic="large"]') ??
        []
    ).filter(listItem => listItem.innerHTML.includes('MSVCB01'))[0];

    (<HTMLElement>listItem).click();

    expect(selectEvent).to.have.be.calledOnce;
    expect(selectEvent.args[0][0].detail.smvControl).to.eql(
      validSCL.querySelector(
        'IED[name="IED3"] > AccessPoint > Server > LDevice > LN0 > SampledValueControl[name="MSVCB01"]'
      )
    );
    expect(selectEvent.args[0][0].detail.dataset).to.eql(
      validSCL.querySelector(
        'IED[name="IED3"] > AccessPoint > Server > LDevice > LN0 > DataSet[name="PhsMeas1"]'
      )
    );
  });
});
