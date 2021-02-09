import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { EditingElement } from '../../../../src/Editing.js';
import { WizardingElement } from '../../../../src/Wizarding.js';

import { getDocument } from '../../../data.js';

import '../../../../src/editors/templates/enum-type-editor.js';
import { EnumTypeEditor } from '../../../../src/editors/templates/enum-type-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';

describe('enum-type-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;

    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><enum-type-editor
              .element=${doc.querySelector('EnumType')}
            ></enum-type-editor
          ></mock-wizard-editor>`
        )
      );
      await (<EnumTypeEditor | undefined>(
        parent?.querySelector('enum-type-editor')
      ))?.openEditWizard();
      await parent.updateComplete;
    });

    it('closes on secondary action', async () => {
      (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="secondaryAction"]'
        )
      )).click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(parent.wizardUI.dialog).to.not.exist;
    });

    describe('edits attributes within EnumType', () => {
      it('changes the "id" attribute on primary action', async () => {
        parent.wizardUI.inputs[0].value = 'newID';
        await parent.updateComplete;
        (<HTMLElement>(
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
        (<HTMLElement>(
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
        (<HTMLElement>(
          parent.wizardUI.inputs[1].shadowRoot?.querySelector('mwc-switch')
        )).click();
        await parent.updateComplete;
        (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        await parent.updateComplete;
        expect(doc.querySelector('EnumType')?.getAttribute('desc')).to.be.null;
      });
    });

    it('removes EnumType on delete button click', async () => {
      expect(doc.querySelector('EnumType[id="Dummy_ctlModel"]')).to.exist;
      (<HTMLElement>(
        parent.wizardUI.dialog!.querySelector('mwc-button[icon="delete"]')
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('EnumType[id="Dummy_ctlModel"]')).to.not.exist;
    });
  });
});
