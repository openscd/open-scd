import { expect, fixture, html } from '@open-wc/testing';
import { Wizarding } from '../../../src/Wizarding.js';
import { Editing } from '../../../src/Editing.js';
import { initializeNsdoc } from '../../../src/foundation/nsdoc.js';

import GooseSubscriberDataBinding from '../../../src/editors/GooseSubscriberDataBinding.js';

import {
  getExtrefDataBindingList,
  getFCDABindingList,
} from './test-support.js';

describe('GOOSE Subscribe Data Binding Plugin', async () => {
  customElements.define(
    'goose-subscriber-data-binding-plugin',
    Wizarding(Editing(GooseSubscriberDataBinding))
  );

  let element: GooseSubscriberDataBinding;
  let doc: XMLDocument;

  const nsdoc = await initializeNsdoc();

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/DataBindingGOOSE2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html` <goose-subscriber-data-binding-plugin
        .doc="${doc}"
        .nsdoc=${nsdoc}
      ></goose-subscriber-data-binding-plugin>`
    );
  });

  it('when subscribing an available ExtRef then the lists are changed', async () => {
    const fcdaListElement = getFCDABindingList(element);
    const extRefListElement = getExtrefDataBindingList(element);

    (<HTMLElement>(
      fcdaListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Publisher>>QB2_Disconnector>GOOSE1 GOOSE_Publisher>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos q (ST)"]'
      )
    )).click();
    await element.requestUpdate();

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      0
    );
    expect(extRefListElement['getAvailableLNElements']().length).to.be.equal(8);

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Subscriber2>>Earth_Switch> XSWI 1"]'
      )
    )).click();
    await element.requestUpdate();

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      1
    );
    expect(extRefListElement['getAvailableLNElements']().length).to.be.equal(7);
  });

  it('when unsubscribing a subscribed ExtRef then the lists are changed', async () => {
    const fcdaListElement = getFCDABindingList(element);
    const extRefListElement = getExtrefDataBindingList(element);

    (<HTMLElement>(
      fcdaListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Publisher>>QB2_Disconnector>GOOSE2 GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos q (ST)"]'
      )
    )).click();
    await element.requestUpdate();
    await extRefListElement.requestUpdate();

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      1
    );
    expect(extRefListElement['getAvailableLNElements']().length).to.be.equal(5);

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Subscriber2>>Earth_Switch"]'
      )
    )).click();
    await element.requestUpdate();

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      0
    );
    expect(extRefListElement['getAvailableLNElements']().length).to.be.equal(6);
  });
});
