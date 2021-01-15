import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { EditingElement } from '../../../../src/Editing.js';
import { WizardingElement } from '../../../../src/Wizarding.js';

import { getDocument } from '../../../data.js';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { SubstationEditor } from '../../../../src/editors/substation/substation-editor.js';

describe('substation-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    const doc = getDocument();

    let parent: WizardingElement & EditingElement;
    let element: SubstationEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('substation-editor');
      await (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
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
    describe('edit attributes within Substation', () => {
      it('changes name attribute on primary action', async () => {
        parent.wizardUI.inputs[0].value = 'newName';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('Substation')?.getAttribute('name')).to.equal(
          'newName'
        );
      });
      it('changes desc attribute on primary action', async () => {
        parent.wizardUI.inputs[1].value = 'newDesc';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('Substation')?.getAttribute('desc')).to.equal(
          'newDesc'
        );
      });
      it('deletes desc attribute if wizard-textfield is deactivated', async () => {
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
        expect(doc.querySelector('Substation')?.getAttribute('desc')).to.be
          .null;
      });
    });
  });
  describe('open add voltage level wizard', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: SubstationEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('substation-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="playlist_add"]'
        )
      )).click();
      await parent.updateComplete;
    });
    it('opens voltage level wizard ', async () => {
      expect(parent.wizardUI).to.exist;
    });
    it('has five wizard inputs', async () => {
      expect(parent.wizardUI.inputs.length).to.equal(5);
    });
    it('does not add voltage level if name attribute is not unique', async () => {
      parent.wizardUI.inputs[0].value = 'E1';
      await parent.updateComplete;
      await (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      expect(doc.querySelectorAll('VoltageLevel[name="E1"]').length).to.equal(
        1
      );
    });
    it('does add voltage level if name attribute is unique', async () => {
      parent.wizardUI.inputs[0].value = 'J1';
      await parent.updateComplete;
      await (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      expect(doc.querySelector('VoltageLevel[name="J1"]')).to.exist;
    });
  });
  describe('open lnode wizard', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: SubstationEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('substation-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="account_tree"]'
        )
      )).click();
      await parent.updateComplete;
    });
    it('opens lnode wizard ', async () => {
      expect(parent.wizardUI).to.exist;
    });
    it('has three wizard pages', async () => {
      expect(parent.wizardUI.dialogs.length).to.equal(3);
    });
    it('adds a LNode element when selecting a logical node', async () => {
      expect(
        doc.querySelector(
          'Substation > LNode[iedName=IED1][ldInst="CircuitBreaker_CB1"][lnClass="LLN0"][lnInst=""]'
        )
      ).to.not.exist;
      (<ListItemBase>(
        parent.wizardUI
          .shadowRoot!.querySelector('mwc-dialog:nth-child(1)')!
          .querySelector('mwc-check-list-item[value="IED1"]')
      )).click();
      await parent.requestUpdate();
      (<ListItemBase>(
        parent.wizardUI
          .shadowRoot!.querySelector('mwc-dialog:nth-child(2)')!
          .querySelector('mwc-check-list-item')
      )).click();
      await parent.requestUpdate();
      (<ListItemBase>(
        parent.wizardUI
          .shadowRoot!.querySelector('mwc-dialog:nth-child(3)')!
          .querySelector('mwc-check-list-item')
      )).click();
      await parent.requestUpdate();
      (<HTMLElement>(
        parent.wizardUI
          .shadowRoot!.querySelector('mwc-dialog:nth-child(3)')!
          .querySelector('mwc-button[slot="primaryAction"]')
      )).click();
      await parent.requestUpdate();
      expect(
        doc.querySelector(
          'Substation > LNode[iedName=IED1][ldInst="CircuitBreaker_CB1"][lnClass="LLN0"][lnInst=""]'
        )
      ).to.exist;
    });
  });
  describe('remove action', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: SubstationEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><substation-editor
              .element=${doc.querySelector('Substation')}
            ></substation-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('substation-editor');
    });
    it('removes Substation on clicking delete button', async () => {
      expect(doc.querySelector('Substation')).to.exist;
      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('Substation')).to.not.exist;
    });
  });
});
