import { expect, fixture, html } from '@open-wc/testing';
import { Wizarding } from '../../../src/Wizarding.js';
import { Editing } from '../../../src/Editing.js';
import { initializeNsdoc } from '../../../src/foundation/nsdoc.js';

import SMVSubscriberDataBinding from '../../../src/editors/SMVSubscriberDataBinding.js';

import {
  getExtrefDataBindingList,
  getFCDABindingList,
  getSelectedSubItemValue,
} from './test-support.js';

describe('SMV Subscribe Data Binding Plugin', async () => {
  customElements.define(
    'smv-subscriber-data-binding-plugin',
    Wizarding(Editing(SMVSubscriberDataBinding))
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

    (<HTMLElement>(
      fcdaListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Publisher>>CurrentTransformer>fullSmv SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L2 TCTR 1.AmpSv q (MX)"]'
      )
    )).click();
    await element.requestUpdate();

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      1
    );
    expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('1');
    expect(extRefListElement['getAvailableLNElements']().length).to.be.equal(7);

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
  });

  it('when unsubscribing a subscribed ExtRef then the lists are changed', async () => {
    const fcdaListElement = getFCDABindingList(element);
    const extRefListElement = getExtrefDataBindingList(element);

    (<HTMLElement>(
      fcdaListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Publisher>>CurrentTransformer>fullSmv SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L3 TCTR 1.AmpSv instMag.i (MX)"]'
      )
    )).click();
    await element.requestUpdate();
    await extRefListElement.requestUpdate();

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      2
    );
    expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('2');
    expect(extRefListElement['getAvailableLNElements']().length).to.be.equal(6);

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
  });
});
