import { expect, fixture, html } from '@open-wc/testing';

import { Wizarding } from '../../../src/Wizarding.js';
import { Editing } from '../../../src/Editing.js';
import { Logging } from '../../../src/Logging.js';

import SMVSubscribeLaterBindingPlugin from '../../../src/editors/SMVSubscriberLaterBinding.js';
import {
  getExtrefLaterBindingList,
  getFCDABindingList,
  getSelectedSubItemValue,
  selectFCDAItem,
} from './test-support.js';
import { ExtRefLaterBindingList } from '../../../src/editors/subscription/later-binding/ext-ref-later-binding-list.js';

describe('SMV Subscribe Later Binding plugin', () => {
  customElements.define(
    'smv-subscribe-later-binding-plugin',
    Wizarding(Editing(Logging(SMVSubscribeLaterBindingPlugin)))
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

  it('when selecting an FCDA element with subscriptions it looks like the latest snapshot', async () => {
    doc = await fetch('/test/testfiles/editors/LaterBindingSMV-LSVS.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<smv-subscribe-later-binding-plugin
        .doc="${doc}"
      ></smv-subscribe-later-binding-plugin>`
    );

    const fcdaListElement = getFCDABindingList(element);
    selectFCDAItem(
      fcdaListElement,
      'SMV_Publisher>>CurrentTransformer>currrentOnly',
      'SMV_Publisher>>CurrentTransformer>currrentOnlysDataSet>CurrentTransformer/L1 TCTR 1.AmpSv instMag.i (MX)'
    );
    await element.requestUpdate();

    const extRefListElement = <ExtRefLaterBindingList>(
      element.shadowRoot?.querySelector('extref-later-binding-list')
    );
    await extRefListElement.requestUpdate();

    await expect(extRefListElement).shadowDom.to.equalSnapshot();
  });

  it('when subscribing an available ExtRef then the lists are changed', async () => {
    const fcdaListElement = getFCDABindingList(element);
    const extRefListElement = getExtrefLaterBindingList(element);

    selectFCDAItem(
      fcdaListElement,
      'SMV_Publisher>>CurrentTransformer>currentOnly',
      'SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L2 TCTR 1.AmpSv instMag.i (MX)'
    );
    await element.requestUpdate();
    await extRefListElement.requestUpdate();

    expect(
      extRefListElement['getSubscribedExtRefElements']().length
    ).to.be.equal(0);
    expect(getSelectedSubItemValue(fcdaListElement)).to.be.null;
    expect(
      extRefListElement['getAvailableExtRefElements']().length
    ).to.be.equal(9);

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0]"]'
      )
    )).click();
    await element.requestUpdate();

    expect(
      extRefListElement['getSubscribedExtRefElements']().length
    ).to.be.equal(1);
    expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('1');
    expect(
      extRefListElement['getAvailableExtRefElements']().length
    ).to.be.equal(8);
  });

  it('when subscribing an available ExtRef then a supervision instance is created', async () => {
    doc = await fetch('/test/testfiles/editors/LaterBindingSMV-LSVS.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<smv-subscribe-later-binding-plugin
        .doc="${doc}"
      ></smv-subscribe-later-binding-plugin>`
    );

    const fcdaListElement = getFCDABindingList(element);
    const extRefListElement = getExtrefLaterBindingList(element);

    selectFCDAItem(
      fcdaListElement,
      'SMV_Publisher>>CurrentTransformer>fullSmv',
      'SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L2 TCTR 2.AmpSv instMag.i (MX)'
    );
    await element.requestUpdate();
    await extRefListElement.requestUpdate();

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR1/AmpSv/instMag.i[0]"]'
      )
    )).click();
    await element.requestUpdate();

    const supervisionInstance = element.doc.querySelector(
      'IED[name="SMV_Subscriber"] LN[lnClass="LSVS"][inst="3"]'
    );
    expect(supervisionInstance).to.exist;
    expect(
      supervisionInstance?.previousElementSibling?.getAttribute('lnClass')
    ).to.equal('LSVS');
    expect(
      supervisionInstance?.previousElementSibling?.getAttribute('inst')
    ).to.equal('2');
  });

  it('when unsubscribing a subscribed ExtRef then the lists are changed', async () => {
    const fcdaListElement = getFCDABindingList(element);
    const extRefListElement = getExtrefLaterBindingList(element);

    selectFCDAItem(
      fcdaListElement,
      'SMV_Publisher>>CurrentTransformer>currentOnly',
      'SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L1 TCTR 1.AmpSv q (MX)'
    );
    await element.requestUpdate();
    await extRefListElement.requestUpdate();

    expect(
      extRefListElement['getSubscribedExtRefElements']().length
    ).to.be.equal(3);
    expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('3');
    expect(
      extRefListElement['getAvailableExtRefElements']().length
    ).to.be.equal(9);

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR1/AmpSv/q[0]"]'
      )
    )).click();
    await element.requestUpdate();

    expect(
      extRefListElement['getSubscribedExtRefElements']().length
    ).to.be.equal(2);
    expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('2');
    expect(
      extRefListElement['getAvailableExtRefElements']().length
    ).to.be.equal(10);
  });
});
