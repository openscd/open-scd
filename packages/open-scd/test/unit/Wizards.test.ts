import { expect, fixture, html } from '@open-wc/testing';

import '../../src/addons/Wizards.js';
import { OscdWizards } from '../../src/addons/Wizards.js';

import { newWizardEvent } from '../../src/foundation.js';

describe('OSCD-Wizard', () => {
  let element: OscdWizards;
  beforeEach(async () => {
    element = <OscdWizards>(
      await fixture(html`<oscd-wizards .host=${document}></oscd-wizards>`)
    );
  });

  it('starts out with an empty workflow', () =>
    expect(element).property('workflow').to.be.empty);

  it('shows no wizard-dialog', async () =>
    await expect(element).shadowDom.to.be.empty);

  it('adds a wizard factory to the workflow on non-null WizardEvent', () => {
    element.dispatchEvent(newWizardEvent([{ title: 'Test Page 1' }]));
    expect(element).property('workflow').to.have.lengthOf(1);
  });

  describe('with a wizard factory in its workflow', () => {
    beforeEach(async () => {
      element.dispatchEvent(newWizardEvent([{ title: 'Test Page 1' }]));
      await element.updateComplete;
    });

    it('removes the wizard factory on receiving a null WizardEvent', () => {
      element.dispatchEvent(newWizardEvent());
      expect(element).property('workflow').to.be.empty;
    });

    it('removes the wizard factory on wizard-dialog "close" action', async () => {
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
