import { fixture, html, expect } from '@open-wc/testing';

import { EditingElement } from '../../../src/Editing.js';
import { WizardingElement } from '../../../src/Wizarding.js';

import '../../mock-wizard-editor.js';
import { getDocument } from '../../data.js';
import { VoltageLevelEditor } from '../../../src/editors/substation/voltage-level-editor.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

describe('voltage-level-editor wizardging editing integration', () => {
  const doc = getDocument();

  let parent: WizardingElement & EditingElement;
  let element: VoltageLevelEditor | null;
  beforeEach(async () => {
    parent = <WizardingElement & EditingElement>(
      await fixture(
        html`<mock-wizard-editor
          ><voltage-level-editor
            .element=${doc.querySelector('VoltageLevel')}
          ></voltage-level-editor
        ></mock-wizard-editor>`
      )
    );
  });

  describe('edit wizard', () => {
    beforeEach(async () => {
      element = parent.querySelector('voltage-level-editor');
      await (<HTMLElement>(
        element?.header.querySelector('mwc-icon-button[icon="edit"]')
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
    describe('edit the attributes within VoltageLevel', () => {
      it('does not change name attribute if not unique within parent element', async () => {
        const oldName = parent.wizardUI.inputs[0].value;
        parent.wizardUI.inputs[0].value = 'J1';

        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(
          doc.querySelector('VoltageLevel')?.getAttribute('name')
        ).to.equal(oldName);
      });
      it('changes name attribute on primary action', async () => {
        parent.wizardUI.inputs[0].value = 'newName';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(
          doc.querySelector('VoltageLevel')?.getAttribute('name')
        ).to.equal('newName');
      });
      it('changes desc attribute on primary action', async () => {
        parent.wizardUI.inputs[1].value = 'newDesc';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(
          doc.querySelector('VoltageLevel')?.getAttribute('desc')
        ).to.equal('newDesc');
      });
      it('deletes nomFreq attribute if wizard-textfield is deactivated', async () => {
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
        expect(doc.querySelector('VoltageLevel')?.getAttribute('desc')).to.be
          .null;
      });
      it('changes nomFreq attribute on primary action', async () => {
        parent.wizardUI.inputs[2].value = '30';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(
          doc.querySelector('VoltageLevel')?.getAttribute('nomFreq')
        ).to.equal('30');
      });
      it('deletes nomFreq attribute if wizard-textfield is deactivated', async () => {
        await (<HTMLElement>(
          parent.wizardUI.inputs[2].shadowRoot?.querySelector('mwc-switch')
        )).click();
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        await parent.updateComplete;
        expect(doc.querySelector('VoltageLevel')?.getAttribute('nomFreq')).to.be
          .null;
      });
      it('changes numPhases attribute on primary action', async () => {
        parent.wizardUI.inputs[3].value = '3';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(
          doc.querySelector('VoltageLevel')?.getAttribute('numPhases')
        ).to.equal('3');
      });
      it('deletes numPhases attribute if wizard-textfield is deactivated', async () => {
        await (<HTMLElement>(
          parent.wizardUI.inputs[3].shadowRoot?.querySelector('mwc-switch')
        )).click();
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        await parent.updateComplete;
        expect(doc.querySelector('VoltageLevel')?.getAttribute('numPhases')).to
          .be.null;
      });
    });
    describe('edit Voltage', () => {
      beforeEach(async () => {
        await (<HTMLElement>(
          element?.header.querySelector('mwc-icon-button[icon="edit"]')
        )).click();
        await parent.updateComplete;
      });
      it('changes value on primary action', async () => {
        parent.wizardUI.inputs[4].value = '20.0';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('Voltage')?.innerHTML).to.equal('20.0');
      });
      it('changes multiplier on primary action', async () => {
        (<WizardTextField>parent.wizardUI.inputs[4]).multiplier = 'M';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(
          doc.querySelector('Voltage')?.getAttribute('multiplier')
        ).to.equal('M');
        expect(doc.querySelector('Voltage')?.getAttribute('unit')).to.equal(
          'V'
        );
      });
      it('deletes voltage element if voltage wizard-textfield is deactivated', async () => {
        await (<HTMLElement>(
          parent.wizardUI.inputs[4].shadowRoot?.querySelector('mwc-switch')
        )).click();
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        await parent.updateComplete;
        expect(doc.querySelector('VoltageLevel')?.querySelector('Voltage')).to
          .be.null;
      });
    });
  });
});
