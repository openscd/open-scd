import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { ConductingEquipmentEditor } from '../../../../src/editors/substation/conducting-equipment-editor.js';
import { EditingElement } from '../../../../src/Editing.js';
import { WizardingElement } from '../../../../src/Wizarding.js';

import { getDocument } from '../../../data.js';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

describe('conducting-equipment-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    const doc = getDocument();

    let parent: WizardingElement & EditingElement;
    let element: ConductingEquipmentEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><conducting-equipment-editor
              .element=${doc.querySelector('ConductingEquipment')}
            ></conducting-equipment-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('conducting-equipment-editor');
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
    describe('edit attributes within ConductingEquipment', () => {
      it('does not change name attribute if not unique within parent element', async () => {
        const oldName = parent.wizardUI.inputs[1].value;
        parent.wizardUI.inputs[1].value = 'QA1';

        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(
          doc.querySelector('ConductingEquipment')?.getAttribute('name')
        ).to.equal(oldName);
      });
      it('changes name attribute on primary action', async () => {
        parent.wizardUI.inputs[1].value = 'newName';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(
          doc.querySelector('ConductingEquipment')?.getAttribute('name')
        ).to.equal('newName');
      });
      it('changes desc attribute on primary action', async () => {
        parent.wizardUI.inputs[2].value = 'newDesc';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(
          doc.querySelector('ConductingEquipment')?.getAttribute('desc')
        ).to.equal('newDesc');
      });
      it('deletes desc attribute if wizard-textfield is deactivated', async () => {
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
        expect(doc.querySelector('ConductingEquipment')?.getAttribute('desc'))
          .to.be.null;
      });
    });
  });
  describe('open lnode wizard', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: ConductingEquipmentEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><conducting-equipment-editor
              .element=${doc.querySelector('ConductingEquipment')}
            ></conducting-equipment-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('conducting-equipment-editor');

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
          'ConductingEquipment > LNode[iedName=IED1][ldInst="CircuitBreaker_CB1"][lnClass="LLN0"][lnInst=""]'
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
          'ConductingEquipment > LNode[iedName=IED1][ldInst="CircuitBreaker_CB1"][lnClass="LLN0"][lnInst=""]'
        )
      ).to.exist;
    });
  });
  describe('move action', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: ConductingEquipmentEditor | null;
    let element2: ConductingEquipmentEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            >${Array.from(
              doc?.querySelectorAll(
                'Bay[name="COUPLING_BAY"] > ConductingEquipment'
              ) ?? []
            ).map(
              condEq =>
                html`<conducting-equipment-editor
                  .element=${condEq}
                ></conducting-equipment-editor>`
            )}
            ></mock-wizard-editor
          >`
        )
      );
      element = parent.querySelector(
        'conducting-equipment-editor:nth-child(1)'
      );
      element2 = parent.querySelector(
        'conducting-equipment-editor:nth-child(2)'
      );
    });
    it('moves ConductingEquipment within Bay', async () => {
      expect(
        doc.querySelector('ConductingEquipment')?.getAttribute('name')
      ).to.equal('QA1');
      (<HTMLElement>(
        element2?.shadowRoot?.querySelector('mwc-icon-button[icon="forward"]')
      )).click();
      await parent.updateComplete;
      (<HTMLElement>element).click();
      await parent.updateComplete;
      expect(
        doc.querySelector('ConductingEquipment')?.getAttribute('name')
      ).to.equal('QB1');
    });
  });
  describe('remove action', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: ConductingEquipmentEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><conducting-equipment-editor
              .element=${doc.querySelector('ConductingEquipment')}
            ></conducting-equipment-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('conducting-equipment-editor');
    });
    it('removes ConductingEquipment on clicking delete button', async () => {
      expect(doc.querySelector('ConductingEquipment[name="QA1"]')).to.exist;
      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('ConductingEquipment[name="QA1"]')).to.not.exist;
    });
  });
});
