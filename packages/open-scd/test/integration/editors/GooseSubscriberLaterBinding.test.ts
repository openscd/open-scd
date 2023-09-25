import { expect, fixture, html } from '@open-wc/testing';
import { Wizarding } from '../../../src/Wizarding.js';
import { Editing } from '../../../src/Editing.js';
import { Logging } from '../../../src/Logging.js';

import GooseSubscriberLaterBinding from '../../../src/editors/GooseSubscriberLaterBinding.js';
import {
  getExtrefLaterBindingList,
  getFCDABindingList,
  getSelectedSubItemValue,
  selectFCDAItem,
} from './test-support.js';
import { ExtRefLaterBindingList } from '../../../src/editors/subscription/later-binding/ext-ref-later-binding-list.js';

describe('GOOSE Subscribe Later Binding Plugin', () => {
  customElements.define(
    'goose-subscriber-later-binding-plugin',
    Wizarding(Editing(Logging(GooseSubscriberLaterBinding)))
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

  it('when selecting an FCDA element with subscriptions it looks like the latest snapshot', async () => {
    doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE-LGOS.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<goose-subscriber-later-binding-plugin
        .doc="${doc}"
      ></goose-subscriber-later-binding-plugin>`
    );

    const fcdaListElement = getFCDABindingList(element);
    selectFCDAItem(
      fcdaListElement,
      'GOOSE_Publisher>>QB2_Disconnector>GOOSE2',
      'GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos stVal (ST)'
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
      'GOOSE_Publisher>>QB2_Disconnector>GOOSE1',
      'GOOSE_Publisher>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos q (ST)'
    );
    await element.requestUpdate();
    await extRefListElement.requestUpdate();

    expect(
      extRefListElement['getSubscribedExtRefElements']().length
    ).to.be.equal(0);
    expect(getSelectedSubItemValue(fcdaListElement)).to.be.null;
    expect(
      extRefListElement['getAvailableExtRefElements']().length
    ).to.be.equal(5);

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]"]'
      )
    )).click();
    await element.requestUpdate();

    expect(
      extRefListElement['getSubscribedExtRefElements']().length
    ).to.be.equal(1);
    expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('1');
    expect(
      extRefListElement['getAvailableExtRefElements']().length
    ).to.be.equal(4);
  });

  it('when subscribing an available ExtRef then a supervision instance is created', async () => {
    doc = await fetch('/test/testfiles/editors/LaterBindingGOOSE-LGOS.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = await fixture(
      html`<goose-subscriber-later-binding-plugin
        .doc="${doc}"
      ></goose-subscriber-later-binding-plugin>`
    );

    const extRefListElement = getExtrefLaterBindingList(element);

    const fcdaListElement = getFCDABindingList(element);
    selectFCDAItem(
      fcdaListElement,
      'GOOSE_Publisher2>>QB2_Disconnector>GOOSE1',
      'GOOSE_Publisher2>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos stVal (ST)'
    );
    await element.requestUpdate();
    await extRefListElement.requestUpdate();

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Subscriber1>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]"]'
      )
    )).click();
    await element.requestUpdate();

    const supervisionInstance = element.doc.querySelector(
      'IED[name="GOOSE_Subscriber1"] LN[lnClass="LGOS"][inst="4"]'
    );
    expect(supervisionInstance).to.exist;
    expect(
      supervisionInstance?.previousElementSibling?.getAttribute('lnClass')
    ).to.equal('LGOS');
    expect(
      supervisionInstance?.previousElementSibling?.getAttribute('inst')
    ).to.equal('3');
  });

  it('when unsubscribing a subscribed ExtRef then the lists are changed', async () => {
    const fcdaListElement = getFCDABindingList(element);
    const extRefListElement = getExtrefLaterBindingList(element);

    selectFCDAItem(
      fcdaListElement,
      'GOOSE_Publisher>>QB2_Disconnector>GOOSE2',
      'GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos q (ST)'
    );
    await element.requestUpdate();
    await extRefListElement.requestUpdate();

    expect(
      extRefListElement['getSubscribedExtRefElements']().length
    ).to.be.equal(2);
    expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('2');
    expect(
      extRefListElement['getAvailableExtRefElements']().length
    ).to.be.equal(5);

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>Pos;CSWI1/Pos/q[0]"]'
      )
    )).click();
    await element.requestUpdate();

    expect(
      extRefListElement['getSubscribedExtRefElements']().length
    ).to.be.equal(1);
    expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('1');
    expect(
      extRefListElement['getAvailableExtRefElements']().length
    ).to.be.equal(6);
  });
});
