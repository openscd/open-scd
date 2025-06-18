import { expect, fixture } from '@open-wc/testing';
import { initializeNsdoc } from '@openscd/open-scd/src/foundation/nsdoc.js';

import SMVSubscriberDataBinding from '../../../src/editors/SMVSubscriberDataBinding.js';

import {
  getExtrefDataBindingList,
  getFCDABindingList,
  getSelectedSubItemValue,
  selectFCDAItem,
} from './test-support.js';

import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';
import '@openscd/open-scd/test/mock-open-scd.js';

import { customElement, query, TemplateResult, html } from 'lit-element';

customElements.define(
  'smv-subscriber-data-binding-plugin',
  SMVSubscriberDataBinding
);
@customElement('smv-mock-open-scd')
class SMVMockOpenSCD extends MockOpenSCD {
  @query('smv-subscriber-data-binding-plugin')
  plugin!: SMVSubscriberDataBinding;

  renderHosting(): TemplateResult {
    return html`<smv-subscriber-data-binding-plugin
      .doc=${this.doc}
      .editCount=${this.editCount}
      .nsdoc=${this.nsdoc}
    ></smv-subscriber-data-binding-plugin>`;
  }
}

describe('SMV Subscribe Data Binding Plugin', async () => {
  let element: SMVSubscriberDataBinding;
  let parent: SMVMockOpenSCD;
  let doc: XMLDocument;

  const nsdoc = await initializeNsdoc();

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/editors/DataBindingSMV2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = await fixture(
      html`<smv-mock-open-scd .doc=${doc} .nsdoc=${nsdoc}></smv-mock-open-scd>`
    );
    await parent.updateComplete;
    element = parent.plugin;
  });

  it('when subscribing an available ExtRef then the lists are changed', async () => {
    const fcdaListElement = getFCDABindingList(element);
    const extRefListElement = getExtrefDataBindingList(element);

    selectFCDAItem(
      fcdaListElement,
      'SMV_Publisher>>CurrentTransformer>fullSmv',
      'SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L2 TCTR 1.AmpSv q (MX)'
    );
    await element.updateComplete;
    await parent.updateComplete;
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
    await element.updateComplete;
    await parent.requestUpdate();
    await parent.updateComplete;

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      2
    );
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
    await element.updateComplete;
    await parent.updateComplete;
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
    await element.updateComplete;
    await parent.requestUpdate();
    await parent.updateComplete;

    expect(extRefListElement['getSubscribedLNElements']().length).to.be.equal(
      1
    );
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
