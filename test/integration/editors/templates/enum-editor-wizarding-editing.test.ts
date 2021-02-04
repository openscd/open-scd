import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { EditingElement } from '../../../../src/Editing.js';
import { WizardingElement } from '../../../../src/Wizarding.js';

import { getDocument } from '../../../data.js';

import { EnumEditor } from '../../../../src/editors/templates/enum-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';
describe('enum-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: EnumEditor | null;

    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><enum-editor
              .element=${doc.querySelector('EnumType')}
            ></enum-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('enum-editor');
      await (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-list-item')
      )).click();
      await parent.updateComplete;
    });

    it('closes on secondary action', async () => {
      await (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="secondaryAction"]'
        )
      )).click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(parent.wizardUI).to.not.exist;
    });

    describe('edit attributes within EnumType', () => {
      it('changes the "id" attribute on primary action', async () => {
        parent.wizardUI.inputs[0].value = 'newID';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('EnumType')?.getAttribute('id')).to.equal(
          'newID'
        );
      });

      it('changes the "desc" attribute on primary action', async () => {
        (<WizardTextField>parent.wizardUI.inputs[1]).maybeValue = 'newDesc';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('EnumType')?.getAttribute('desc')).to.equal(
          'newDesc'
        );
      });

      it('nulls the "desc" attribute if the input is deactivated', async () => {
        (<WizardTextField>parent.wizardUI.inputs[1]).maybeValue = 'newDesc';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.inputs[1].shadowRoot?.querySelector('mwc-switch')
        )).click();
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        await parent.updateComplete;
        expect(doc.querySelector('EnumType')?.getAttribute('desc')).to.be.null;
      });
    });
  });

  describe('remove action', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: EnumEditor | null;

    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><enum-editor
              .element=${doc.querySelector('EnumType')}
            ></enum-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('enum-editor');
    });

    it('removes EnumType on clicking delete button', async () => {
      expect(doc.querySelector('EnumType')).to.exist;
      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('EnumType')).to.not.exist;
    });
  });
});
