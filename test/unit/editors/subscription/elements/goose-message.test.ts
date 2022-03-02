import { html, fixture, expect } from '@open-wc/testing';
import { spy } from 'sinon';

import '../../../../../src/editors/subscription/elements/goose-message.js'
import { GOOSEMessage } from '../../../../../src/editors/subscription/elements/goose-message.js';

describe('goose-message', () => {
  let element: GOOSEMessage;
  let validSCL: XMLDocument;

  let gseControl: Element;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    
    gseControl = validSCL.querySelector('GSEControl[name="GCB"]')!;

    element = await fixture(html`<goose-message
      .element=${gseControl}
    ></goose-message>`);
  });

  it('a newGOOSESelectEvent is fired when clicking the goose message element', async () => {
    const newGOOSESelectEvent = spy();
    window.addEventListener('goose-dataset', newGOOSESelectEvent);

    const listItem = <HTMLElement>(element.shadowRoot!.querySelector('mwc-list-item'));
    listItem.click();

    await element.requestUpdate();
    expect(newGOOSESelectEvent).to.have.been.called;
    expect(newGOOSESelectEvent.args[0][0].detail['gseControl']).to.eql(gseControl);
    expect(newGOOSESelectEvent.args[0][0].detail['dataset']).to.eql(gseControl.closest('IED')?.querySelector('DataSet[name="GooseDataSet1"]'));
  });

  it('looks like the latest snapshot', async () => {
    await expect(element).shadowDom.to.equalSnapshot();
  });
});
