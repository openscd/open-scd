import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { EditingElement } from '../../../../src/Editing.js';
import { WizardingElement } from '../../../../src/Wizarding.js';

import { getDocument } from '../../../data.js';

import '../../../../src/editors/templates/enum-val-editor.js';
import { EnumValEditor } from '../../../../src/editors/templates/enum-val-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';

describe('enum-val-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let editor: EnumValEditor;

    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><enum-val-editor
              .element=${doc.querySelector('EnumVal')}
            ></enum-val-editor
          ></mock-wizard-editor>`
        )
      );
      editor = <EnumValEditor>parent.querySelector('enum-val-editor');

      editor.shadowRoot!.querySelector('mwc-list-item')?.click();
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

    describe('edits attributes within EnumVal', () => {
      it('changes the "ord" attribute on primary action', async () => {
        parent.wizardUI.inputs[0].value = '1';
        await parent.updateComplete;
        (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('EnumVal')?.getAttribute('ord')).to.equal('1');
      });

      it('changes the textContent on primary action', async () => {
        parent.wizardUI.inputs[1].value = 'newValue';
        await parent.updateComplete;
        (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('EnumVal')?.textContent).to.equal('newValue');
      });

      it('changes the "desc" attribute on primary action', async () => {
        (<WizardTextField>parent.wizardUI.inputs[2]).maybeValue = 'newDesc';
        await parent.updateComplete;
        (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('EnumVal')?.getAttribute('desc')).to.equal(
          'newDesc'
        );
      });

      it('nulls the "desc" attribute if the input is deactivated', async () => {
        (<WizardTextField>parent.wizardUI.inputs[2]).maybeValue = 'newDesc';
        await parent.updateComplete;
        (<HTMLElement>(
          parent.wizardUI.inputs[2].shadowRoot?.querySelector('mwc-switch')
        )).click();
        await parent.updateComplete;
        (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        await parent.updateComplete;
        expect(doc.querySelector('EnumVal')?.getAttribute('desc')).to.be.null;
      });
    });

    it('removes EnumVal on delete button click', async () => {
      expect(doc.querySelector('EnumVal')).to.contain.text('status-only');
      (<HTMLElement>(
        parent.wizardUI.dialog!.querySelector('mwc-button[icon="delete"]')
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('EnumVal')).to.not.contain.text('status-only');
    });
  });
});
