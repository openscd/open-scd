import { html, fixture, expect } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../../../src/editors/sampledvalues/smv-publisher-list.js'
import { SmvPublisherList } from '../../../../src/editors/sampledvalues/smv-publisher-list.js';

describe('smv-publisher-list', () => {
  let element: SmvPublisherList;
  let validSCL: XMLDocument;
  
  let selectEvent: SinonSpy;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    selectEvent = spy();
    window.addEventListener('smv-select', selectEvent);

    element = await fixture(html`<smv-publisher-list
      .doc=${validSCL}
    ></smv-publisher-list>`);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot without a doc loaded', async () => {
    element = await fixture(html`<smv-publisher-list></smv-publisher-list>`);

    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('triggers a newSmvSelectEvent when a list item is clicked', async () => {
    selectEvent.resetHistory();

    const listItem = Array.from(
      element.shadowRoot?.querySelectorAll('mwc-list-item[graphic="large"]') ?? []
    ).filter(a =>
      a.innerHTML.includes('MSVCB01')
    )[0];

    (<HTMLElement>(listItem)).click();
    await element.updateComplete;

    expect(selectEvent).to.have.be.calledOnce;
    expect(selectEvent.args[0][0].detail.smvControl).to.eql(
      validSCL.querySelector('IED[name="IED3"] > AccessPoint > Server > LDevice > LN0 > SampledValueControl[name="MSVCB01"]')
    );
    expect(selectEvent.args[0][0].detail.dataset).to.eql(
      validSCL.querySelector('IED[name="IED3"] > AccessPoint > Server > LDevice > LN0 > DataSet[name="PhsMeas1"]')
    );
  });
});
