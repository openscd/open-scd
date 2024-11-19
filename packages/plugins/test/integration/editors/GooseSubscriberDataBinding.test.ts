import { expect, fixture, html } from '@open-wc/testing';
import { initializeNsdoc } from '@openscd/open-scd/src/foundation/nsdoc.js';

import GooseSubscriberDataBinding from '../../../src/editors/GooseSubscriberDataBinding.js';
import '@openscd/open-scd/test/mock-open-scd.js';
import {
  getExtrefDataBindingList,
  getFCDABindingList,
  getSelectedSubItemValue,
  selectFCDAItem,
} from './test-support.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

import { TemplateResult } from 'lit-html';
import { customElement, query } from 'lit-element';

customElements.define(
  'goose-subscriber-data-binding-plugin',
  GooseSubscriberDataBinding
);

@customElement('goose-mock-open-scd')
class GooseMockOpenSCD extends MockOpenSCD {
  @query('goose-subscriber-data-binding-plugin')
  plugin!: GooseSubscriberDataBinding;

  renderHosting(): TemplateResult {
    return html`<goose-subscriber-data-binding-plugin
      .doc=${this.doc}
      .editCount=${this.editCount}
      .nsdoc=${this.nsdoc}
    ></goose-subscriber-data-binding-plugin>`;
  }
}

describe('GOOSE Subscribe Data Binding Plugin', async () => {
  let element: GooseSubscriberDataBinding;
  let parent: GooseMockOpenSCD;
  let doc: XMLDocument;

  const nsdoc = await initializeNsdoc();

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/DataBindingGOOSE2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = await fixture(
      html`<goose-mock-open-scd
        .doc=${doc}
        .nsdoc=${nsdoc}
      ></goose-mock-open-scd>`
    );
    element = parent.plugin;
    await parent.updateComplete;
    await element.updateComplete;
  });

  it('when subscribing an available ExtRef then the lists are changed and first ExtRef is added to the LN', async () => {
    const fcdaListElement = getFCDABindingList(element);
    const extRefListElement = getExtrefDataBindingList(element);

    selectFCDAItem(
      fcdaListElement,
      'GOOSE_Publisher>>QB2_Disconnector>GOOSE1',
      'GOOSE_Publisher>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos q (ST)'
    );
    await parent.requestUpdate();

    await parent.updateComplete;
    await element.updateComplete;
    await extRefListElement.updateComplete;
    await fcdaListElement.updateComplete;

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      0
    );
    expect(getSelectedSubItemValue(fcdaListElement)).to.be.null;
    expect(extRefListElement['getAvailableLNElements']().length).to.be.equal(8);
    expect(
      element.doc.querySelectorAll(
        'IED[name="GOOSE_Subscriber2"] LN[lnClass="XSWI"][inst="1"] > Inputs > ExtRef[iedName="GOOSE_Publisher"]'
      ).length
    ).to.be.equal(0);

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Subscriber2>>Earth_Switch> XSWI 1"]'
      )
    )).click();
    await new Promise(resolve => setTimeout(resolve, 250));

    await parent.requestUpdate();
    await parent.updateComplete;
    await element.updateComplete;
    await extRefListElement.updateComplete;
    await fcdaListElement.updateComplete;

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      1
    );
    expect(extRefListElement['getAvailableLNElements']().length).to.be.equal(7);
    expect(
      element.doc.querySelectorAll(
        'IED[name="GOOSE_Subscriber2"] LN[lnClass="XSWI"][inst="1"] > Inputs > ExtRef[iedName="GOOSE_Publisher"]'
      ).length
    ).to.be.equal(1);
  });

  it('when unsubscribing a subscribed ExtRef then the lists are changed', async () => {
    const fcdaListElement = getFCDABindingList(element);
    const extRefListElement = getExtrefDataBindingList(element);

    selectFCDAItem(
      fcdaListElement,
      'GOOSE_Publisher>>QB2_Disconnector>GOOSE2',
      'GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos q (ST)'
    );
    await element.updateComplete;
    await extRefListElement.updateComplete;

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      1
    );
    expect(getSelectedSubItemValue(fcdaListElement)).to.have.text('1');
    expect(extRefListElement['getAvailableLNElements']().length).to.be.equal(7);

    expect(
      element.doc.querySelectorAll(
        'IED[name="GOOSE_Subscriber2"] LN0[lnClass="LLN0"] > Inputs > ExtRef[iedName="GOOSE_Publisher"]'
      ).length
    ).to.be.equal(2);

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Subscriber2>>Earth_Switch"]'
      )
    )).click();
    await element.updateComplete;
    await parent.requestUpdate();
    await parent.updateComplete;

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      0
    );
    expect(extRefListElement['getAvailableLNElements']().length).to.be.equal(8);

    expect(
      element.doc.querySelectorAll(
        'IED[name="GOOSE_Subscriber2"] LN0[lnClass="LLN0"] > Inputs > ExtRef[iedName="GOOSE_Publisher"]'
      ).length
    ).to.be.equal(1);
  });

  it('when unsubscribing all subscribed ExtRef then the inputs element is also removed', async () => {
    const fcdaListElement = getFCDABindingList(element);
    const extRefListElement = getExtrefDataBindingList(element);

    expect(
      element.doc.querySelectorAll(
        'IED[name="GOOSE_Subscriber2"] LN0[lnClass="LLN0"] > Inputs'
      ).length
    ).to.be.equal(1);

    selectFCDAItem(
      fcdaListElement,
      'GOOSE_Publisher>>QB2_Disconnector>GOOSE2',
      'GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos q (ST)'
    );
    await element.updateComplete;
    await extRefListElement.updateComplete;

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Subscriber2>>Earth_Switch"]'
      )
    )).click();
    await element.updateComplete;

    selectFCDAItem(
      fcdaListElement,
      'GOOSE_Publisher>>QB2_Disconnector>GOOSE2',
      'GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos stVal (ST)'
    );
    await element.updateComplete;
    await extRefListElement.updateComplete;

    (<HTMLElement>(
      extRefListElement.shadowRoot!.querySelector(
        'mwc-list-item[value="GOOSE_Subscriber2>>Earth_Switch"]'
      )
    )).click();
    await element.updateComplete;

    expect(
      element.doc.querySelectorAll(
        'IED[name="GOOSE_Subscriber2"] LN0[lnClass="LLN0"] > Inputs'
      ).length
    ).to.be.equal(0);
  });
});
