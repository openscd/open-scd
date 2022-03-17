import { html, fixture, expect } from '@open-wc/testing';
import { spy } from 'sinon';

import '../../../../../src/editors/subscription/elements/ied-element-goose.js'
import { IEDElementGoose } from '../../../../../src/editors/subscription/elements/ied-element-goose.js';
import { SubscribeStatus } from '../../../../../src/editors/subscription/foundation.js';

describe('ied-element', () => {
  let element: IEDElementGoose;
  let validSCL: XMLDocument;

  let iedElement: Element;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    iedElement = validSCL.querySelector('IED[name="IED2"]')!;

    element = await fixture(html`<ied-element-goose
      .element=${iedElement}
    ></ied-element-goose>`);
  });

  it('a newGOOSESelectEvent is fired when clicking the goose message element', async () => {
    const newIEDSubscriptionEvent = spy();
    window.addEventListener('ied-subscription', newIEDSubscriptionEvent);

    const listItem = <HTMLElement>(element.shadowRoot!.querySelector('mwc-list-item'));
    listItem.click();

    await element.requestUpdate();
    expect(newIEDSubscriptionEvent).to.have.been.called;
    expect(newIEDSubscriptionEvent.args[0][0].detail['element']).to.eql(iedElement);
    expect(newIEDSubscriptionEvent.args[0][0].detail['subscribeStatus']).to.eql(SubscribeStatus.None);
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
