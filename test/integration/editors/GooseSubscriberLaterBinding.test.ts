import { expect, fixture, html } from '@open-wc/testing';
import { Wizarding } from '../../../src/Wizarding.js';
import { Editing } from '../../../src/Editing.js';

import GooseSubscriberLaterBinding from '../../../src/editors/GooseSubscriberLaterBinding.js';
import {
  getExtrefLaterBindingList,
  getFCDALaterBindingList,
} from './test-support.js';

describe('GOOSE Subscribe Later Binding Plugin', () => {
  customElements.define(
    'goose-subscriber-later-binding-plugin',
    Wizarding(Editing(GooseSubscriberLaterBinding))
  );

  let element: GooseSubscriberLaterBinding;
  let doc: XMLDocument;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<goose-subscriber-later-binding-plugin
        .doc="${doc}"
      ></goose-subscriber-later-binding-plugin>`
    );
  });

  it('when unsubscribing a subscribed ExtRef then the lists are changed', async () => {
    const gooseListElement = getFCDALaterBindingList(element);
    const extRefListElement = getExtrefLaterBindingList(element);

    (<HTMLElement>(
      gooseListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Publisher>>QB2_Disconnector>GOOSE2 GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos q (ST)"]'
      )
    )).click();
    await element.requestUpdate();
    await extRefListElement.requestUpdate();

    expect(
      extRefListElement['getSubscribedExtRefElements']().length
    ).to.be.equal(2);
    expect(
      extRefListElement['getAvailableExtRefElements']().length
    ).to.be.equal(2);
    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CSWI 1 Pos q@Pos;CSWI1/Pos/q"]'
      )
    )).click();
    await element.requestUpdate();

    expect(
      extRefListElement['getSubscribedExtRefElements']().length
    ).to.be.equal(1);
    expect(
      extRefListElement['getAvailableExtRefElements']().length
    ).to.be.equal(3);
  });
});
