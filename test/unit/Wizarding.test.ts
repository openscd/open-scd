import { expect, fixture, html } from '@open-wc/testing';

import { newWizardEvent } from '../../src/foundation.js';
import { WizardingElement } from '../../src/Wizarding.js';

import './mock-wizard.js';

describe('WizardingElement', () => {
  let element: WizardingElement;
  beforeEach(async () => {
    element = <WizardingElement>(
      await fixture(html`<mock-wizard></mock-wizard>`)
    );
  });

  it('starts out with an empty workflow', () =>
    expect(element).property('workflow').to.be.empty);

  it('shows no wizard-dialog', () => expect(element).shadowDom.to.be.empty);

  it('adds a wizard to the workflow on non-null WizardEvent', () => {
    element.dispatchEvent(newWizardEvent([{ title: 'Test Page 1' }]));
    expect(element).property('workflow').to.have.lengthOf(1);
  });

  describe('with a wizard in its workflow', () => {
    beforeEach(async () => {
      element.dispatchEvent(newWizardEvent([{ title: 'Test Page 1' }]));
      await element.updateComplete;
    });

    it('removes the wizard on receiving a null WizardEvent', () => {
      element.dispatchEvent(newWizardEvent());
      expect(element).property('workflow').to.be.empty;
    });

    it('removes the wizard on wizard-dialog "close" action', async () => {
      await (<HTMLElement>(
        element
          .shadowRoot!.querySelector('wizard-dialog')!
          .shadowRoot!.querySelector('mwc-button[dialogAction="close"]')
      )).click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(element).property('workflow').to.be.empty;
    });
  });
});
