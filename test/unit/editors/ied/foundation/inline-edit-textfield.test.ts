import { html, fixture, expect } from '@open-wc/testing';

import { InlineEditTextField } from '../../../../../src/editors/ied/foundation/inline-edit-textfield.js';
import '../../../../../src/editors/ied/foundation/inline-edit-textfield.js';
import { SinonSpy, spy } from 'sinon';

describe('inline-edit-textfield', async () => {
  let element: InlineEditTextField;
  let validSCL: XMLDocument;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      
    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);

    element = await fixture(html`<inline-edit-textfield
      .element=${validSCL.querySelector(
        'IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[lnClass="XCBR"] > DOI > DAI[name="ctlModel"]')}
      ></inline-edit-textfield>`);
  });

  it('looks like the latest snapshot', async () => {
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('input is initially disabled', () => {
    expect(element.disabled).to.be.true;
  });

  it('input is enabled when clicking the Edit button, and disabled when clicking the Edit button again', async () => {
    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')
    )).click();
    await element.requestUpdate();
    await element.updateComplete;

    expect(element.disabled).to.be.false;
    
    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')
    )).click();
    await element.requestUpdate();
    await element.updateComplete;

    expect(element.disabled).to.be.true;
  });

  it('dispatches a newActionEvent when the done button is clicked', async () => {
    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button-toggle')
    )).click();
    await element.requestUpdate();
    await element.updateComplete;

    element.value = "Some new Value";

    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button')
    )).click();

    expect(actionEvent).to.be.calledOnce;
    const details = actionEvent.args[0][0].detail.action;
    expect(details.title).to.eql('Replace');
    expect(details.actions[0].new.element.textContent).to.eql('Some new Value');
  });
});
