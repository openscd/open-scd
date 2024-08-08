import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { MockWizardEditor } from '@openscd/open-scd/test/mock-wizard-editor.js';

import { editConnectedApWizard } from '../../../src/wizards/connectedap.js';
import { newWizardEvent } from '@openscd/open-scd/src/foundation.js';

describe('connectedap wizarding editing integration', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
    doc = await fetch('/test/testfiles/valid2003.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  it('does not inherit the VLAN-ID and VLAN-PRIORITY of a child Address element', async () => {
    const parser = new DOMParser();
    const newGSE = `
    <GSE ldInst="CircuitBreaker_CB1" cbName="GCB">
      <Address>
        <P type="MAC-Address">01-0C-CD-01-00-10</P>
        <P type="VLAN-ID">005</P>
        <P type="VLAN-PRIORITY">4</P>
        <P type="APPID">0010</P>
      </Address>
    </GSE>
    `;
    const connectedAP = doc.querySelector('ConnectedAP[iedName="IED1"]')!;
    connectedAP.appendChild(
      parser.parseFromString(newGSE, 'application/xml').documentElement
    );

    const wizard = editConnectedApWizard(connectedAP);
    element.dispatchEvent(newWizardEvent(wizard));
    await element.requestUpdate();
    await element.updateComplete;

    const vlanId = element.wizardUI.shadowRoot!.querySelector(
      'wizard-textfield[label="VLAN-ID"]'
    )!;
    const vlanPriority = element.wizardUI.shadowRoot!.querySelector(
      'wizard-textfield[label="VLAN-PRIORITY"]'
    )!;

    expect(vlanId.hasAttribute('disabled')).to.be.true;
    expect(vlanPriority.hasAttribute('disabled')).to.be.true;
  });
});
