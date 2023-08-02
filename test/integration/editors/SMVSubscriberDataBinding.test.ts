import { expect, fixture, html } from '@open-wc/testing';
import { Wizarding } from '../../../src/Wizarding.js';
import { Editing } from '../../../src/Editing.js';
import { initializeNsdoc } from '../../../src/foundation/nsdoc.js';

import SMVSubscriberDataBinding from '../../../src/editors/SMVSubscriberDataBinding.js';

import {
  getExtrefDataBindingList,
  getFCDABindingList,
  getSelectedSubItemValue,
  selectFCDAItem,
} from './test-support.js';
import { Logging } from '../../../src/Logging.js';
describe('SMV Subscribe Data Binding Plugin', async () => {
  customElements.define(
    'smv-subscriber-data-binding-plugin',
    Wizarding(Editing(Logging(SMVSubscriberDataBinding)))
  );

  let element: SMVSubscriberDataBinding;
  let doc: XMLDocument;

  const nsdoc = await initializeNsdoc();

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/DataBindingSMV2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html` <smv-subscriber-data-binding-plugin
        .doc="${doc}"
        .nsdoc=${nsdoc}
      ></smv-subscriber-data-binding-plugin>`
    );
  });

  it('when subscribing an available ExtRef then the lists are changed', async () => {
    const fcdaListElement = getFCDABindingList(element);
    const extRefListElement = getExtrefDataBindingList(element);

    selectFCDAItem(
      fcdaListElement,
      'SMV_Publisher>>CurrentTransformer>fullSmv',
      'SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L2 TCTR 1.AmpSv q (MX)'
    );
    await element.requestUpdate();
    await extRefListElement.requestUpdate();

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      1
    );
    expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('1');
    expect(extRefListElement['getAvailableLNElements']().length).to.be.equal(7);
    expect(
      element.doc.querySelectorAll(
        'IED[name="SMV_Subscriber1"] LDevice[inst="Overcurrent"] > LN0[lnClass="LLN0"] > Inputs > ExtRef[iedName="SMV_Publisher"]'
      ).length
    ).to.be.equal(0);

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Subscriber1>>Overcurrent"]'
      )
    )).click();
    await element.requestUpdate();

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      2
    );
    expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('2');
    expect(extRefListElement['getAvailableLNElements']().length).to.be.equal(6);
    expect(
      element.doc.querySelectorAll(
        'IED[name="SMV_Subscriber1"] LDevice[inst="Overcurrent"] > LN0[lnClass="LLN0"] > Inputs > ExtRef[iedName="SMV_Publisher"]'
      ).length
    ).to.be.equal(1);
  });

  it('when unsubscribing a subscribed ExtRef then the lists are changed', async () => {
    const fcdaListElement = getFCDABindingList(element);
    const extRefListElement = getExtrefDataBindingList(element);

    selectFCDAItem(
      fcdaListElement,
      'SMV_Publisher>>CurrentTransformer>fullSmv',
      'SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L3 TCTR 1.AmpSv instMag.i (MX)'
    );
    await element.requestUpdate();
    await extRefListElement.requestUpdate();

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      2
    );
    expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('2');
    expect(extRefListElement['getAvailableLNElements']().length).to.be.equal(6);
    expect(
      element.doc.querySelectorAll(
        'IED[name="SMV_Subscriber1"] LDevice[inst="Overvoltage"] > LN0[lnClass="LLN0"] > Inputs > ExtRef[iedName="SMV_Publisher"]'
      ).length
    ).to.be.equal(3);

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Subscriber1>>Overvoltage"]'
      )
    )).click();
    await element.requestUpdate();

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      1
    );
    expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('1');
    expect(extRefListElement['getAvailableLNElements']().length).to.be.equal(7);
    expect(
      element.doc.querySelectorAll(
        'IED[name="SMV_Subscriber1"] LDevice[inst="Overvoltage"] > LN0[lnClass="LLN0"] > Inputs > ExtRef[iedName="SMV_Publisher"]'
      ).length
    ).to.be.equal(2);
  });

  it('when unsubscribing all subscribed ExtRef then the inputs element is also removed', async () => {
    const fcdaListElement = getFCDABindingList(element);
    const extRefListElement = getExtrefDataBindingList(element);

    expect(
      element.doc.querySelectorAll(
        'IED[name="SMV_Subscriber1"] LDevice[inst="Overvoltage"] > LN0[lnClass="LLN0"] > Inputs'
      ).length
    ).to.be.equal(1);

    selectFCDAItem(
      fcdaListElement,
      'SMV_Publisher>>CurrentTransformer>fullSmv',
      'SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L2 TCTR 1.AmpSv q (MX)'
    );
    await element.requestUpdate();
    await extRefListElement.requestUpdate();

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Subscriber1>>Overvoltage"]'
      )
    )).click();
    await element.requestUpdate();

    selectFCDAItem(
      fcdaListElement,
      'SMV_Publisher>>CurrentTransformer>fullSmv',
      'SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L3 TCTR 1.AmpSv instMag.i (MX)'
    );
    await element.requestUpdate();
    await extRefListElement.requestUpdate();

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Subscriber1>>Overvoltage"]'
      )
    )).click();
    await element.requestUpdate();

    selectFCDAItem(
      fcdaListElement,
      'SMV_Publisher>>CurrentTransformer>fullSmv',
      'SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L3 TCTR 1.AmpSv q (MX)'
    );
    await element.requestUpdate();
    await extRefListElement.requestUpdate();

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Subscriber1>>Overvoltage"]'
      )
    )).click();
    await element.requestUpdate();

    expect(
      element.doc.querySelectorAll(
        'IED[name="SMV_Subscriber1"] LDevice[inst="Overvoltage"] > LN0[lnClass="LLN0"] > Inputs'
      ).length
    ).to.be.equal(0);
  });
});
