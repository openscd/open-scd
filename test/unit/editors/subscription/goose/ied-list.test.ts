import { html, fixture, expect } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../../../../src/editors/subscription/goose/ied-list.js';
import { IedList } from '../../../../../src/editors/subscription/goose/ied-list.js';

describe('ied-list-goose', () => {
  let element: IedList;
  let validSCL: XMLDocument;

  let selectEvent: SinonSpy;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    selectEvent = spy();
    window.addEventListener('ied-select', selectEvent);

    element = await fixture(html`<ied-list-goose
      .doc=${validSCL}
    ></ied-list-goose>`);
  });

  it('looks like the latest snapshot with a document loaded', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('looks like the latest snapshot without a doc loaded', async () => {
    element = await fixture(html`<ied-list-goose></ied-list-goose>`);
    await expect(element).shadowDom.to.equalSnapshot();
  });

  it('sends a newIEDSelectEvent on first update', async () => {
    expect(selectEvent).to.have.be.calledOnce;
    expect(selectEvent.args[0][0].detail.ied).to.be.undefined;
  });

  it('triggers a newIEDSelectEvent when a list item is clicked', async () => {
    selectEvent.resetHistory();

    const listItem = Array.from(
      element.shadowRoot?.querySelectorAll('mwc-list-item') ?? []
    ).filter(a => a.innerHTML.includes('IED2'))[0];

    (<HTMLElement>listItem).click();
    await element.updateComplete;

    expect(selectEvent).to.have.be.calledOnce;
    expect(selectEvent.args[0][0].detail.ied).to.eql(
      validSCL.querySelector('IED[name="IED2"]')
    );
  });
});
