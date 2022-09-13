import { expect, fixture, html } from '@open-wc/testing';

import { Wizarding } from '../../../src/Wizarding.js';
import { Editing } from '../../../src/Editing.js';

import SMVSubscribeLaterBindingPlugin from '../../../src/editors/SMVSubscriberLaterBinding.js';
import {
  getExtrefLaterBindingList,
  getFCDALaterBindingList,
} from './test-support.js';

describe('SMV Subscribe Later Binding plugin', () => {
  customElements.define(
    'smv-subscribe-later-binding-plugin',
    Wizarding(Editing(SMVSubscribeLaterBindingPlugin))
  );
  let element: SMVSubscribeLaterBindingPlugin;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/LaterBindingSMV2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html` <smv-subscribe-later-binding-plugin
        .doc=${doc}
      ></smv-subscribe-later-binding-plugin>`
    );
    await element.requestUpdate();
  });

  it('when subscribing an available ExtRef then the lists are changed', async () => {
    const svcListElement = getFCDALaterBindingList(element);
    const extRefListElement = getExtrefLaterBindingList(element);

    (<HTMLElement>(
      svcListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Publisher>>CurrentTransformer>currentOnly SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L2 TCTR 1.AmpSv instMag.i (MX)"]'
      )
    )).click();
    await element.requestUpdate();

    expect(
      extRefListElement['getSubscribedExtRefElements']().length
    ).to.be.equal(0);
    expect(
      extRefListElement['getAvailableExtRefElements']().length
    ).to.be.equal(8);

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0]"]'
      )
    )).click();
    await element.requestUpdate();

    expect(
      extRefListElement['getSubscribedExtRefElements']().length
    ).to.be.equal(1);
    expect(
      extRefListElement['getAvailableExtRefElements']().length
    ).to.be.equal(7);
  });

  it('when unsubscribing a subscribed ExtRef then the lists are changed', async () => {
    const svcListElement = getFCDALaterBindingList(element);
    const extRefListElement = getExtrefLaterBindingList(element);

    (<HTMLElement>(
      svcListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Publisher>>CurrentTransformer>currentOnly SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L1 TCTR 1.AmpSv q (MX)"]'
      )
    )).click();
    await element.requestUpdate();

    expect(
      extRefListElement['getSubscribedExtRefElements']().length
    ).to.be.equal(3);
    expect(
      extRefListElement['getAvailableExtRefElements']().length
    ).to.be.equal(8);

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Subscriber>>Overvoltage> PTRC 1>SMV:currentOnly CurrentTransformer/ LLN0  SMV_Publisher CurrentTransformer/L1 TCTR 1 AmpSv q@AmpSv;TCTR1/AmpSv/q"]'
      )
    )).click();
    await element.requestUpdate();

    expect(
      extRefListElement['getSubscribedExtRefElements']().length
    ).to.be.equal(2);
    expect(
      extRefListElement['getAvailableExtRefElements']().length
    ).to.be.equal(9);
  });
});
