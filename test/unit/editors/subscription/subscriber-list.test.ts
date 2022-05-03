import { html, fixture, expect } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';
import { newGOOSESelectEvent, newIEDSelectEvent, newViewEvent, View } from '../../../../src/editors/subscription/foundation.js';

import '../../../../src/editors/subscription/subscriber-list.js'
import { SubscriberList } from '../../../../src/editors/subscription/subscriber-list.js';

describe('subscriber-list', () => {
  let element: SubscriberList;
  let validSCL: XMLDocument;
  
  let wizardEvent: SinonSpy;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    wizardEvent = spy();
    window.addEventListener('wizard', wizardEvent);

    element = await fixture(html`<subscriber-list
      .doc=${validSCL}
    ></subscriber-list>`);
  });

  it('initially looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('triggers edit wizard when an IED is selected', async () => {
    const gseControl = validSCL.querySelector('IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice > LN0 > GSEControl[appID="0001"]');
    const dataSet = validSCL.querySelector('IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice > LN0 > DataSet[name="GooseDataSet1"]');

    element['onGOOSEDataSetEvent'](newGOOSESelectEvent(
      gseControl!,
      dataSet!
    ));

    await element.requestUpdate();

    (<HTMLElement>(
      element.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
    )).click();

    expect(wizardEvent).to.have.be.calledOnce;
    expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('edit');
    expect(wizardEvent.args[0][0].detail.wizard()[0].element).to.eql(gseControl);
  });

  it('triggers edit wizard when a GOOSE is selected', async () => {
    element['onViewChange'](newViewEvent(View.GOOSE_SUBSCRIBER));

    const ied = validSCL.querySelector('IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice > LN0 > GSEControl[appID="0001"]');

    element['onIEDSelectEvent'](newIEDSelectEvent(
      ied!,
    ));

    await element.requestUpdate();

    (<HTMLElement>(
      element.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
    )).click();

    expect(wizardEvent).to.have.be.calledOnce;
    expect(wizardEvent.args[0][0].detail.wizard()[0].title).to.contain('edit');
    expect(wizardEvent.args[0][0].detail.wizard()[0].element).to.eql(ied);
  });
});
