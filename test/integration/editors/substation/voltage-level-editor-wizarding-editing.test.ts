import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { EditingElement } from '../../../../src/Editing.js';
import { WizardingElement } from '../../../../src/Wizarding.js';
import { VoltageLevelEditor } from '../../../../src/editors/substation/voltage-level-editor.js';

import { getDocument } from '../../../data.js';

import { WizardTextField } from '../../../../src/wizard-textfield.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

describe('voltage-level-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
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
      element = parent.querySelector('voltage-level-editor');
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
    describe('edit attributes within VoltageLevel', () => {
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
          element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
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
  describe('open add bay wizard', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: VoltageLevelEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><voltage-level-editor
              .element=${doc.querySelector('VoltageLevel[name="E1"]')}
            ></voltage-level-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('voltage-level-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="playlist_add"]'
        )
      )).click();
      await parent.updateComplete;
    });
    it('opens bay wizard ', async () => {
      expect(parent.wizardUI).to.exist;
    });
    it('has two wizard-textfield', async () => {
      expect(parent.wizardUI.inputs.length).to.equal(2);
    });
    it('does not add bay if name attribute is not unique', async () => {
      parent.wizardUI.inputs[0].value = 'COUPLING_BAY';
      await parent.updateComplete;
      await (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      expect(
        doc.querySelectorAll('VoltageLevel[name="E1"] > Bay').length
      ).to.equal(2);
    });
    it('does add bay if name attribute is unique', async () => {
      parent.wizardUI.inputs[0].value = 'SecondBay';
      await parent.updateComplete;
      await (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      expect(
        doc.querySelector('VoltageLevel[name="E1"] > Bay[name="SecondBay"]')
      ).to.exist;
    });
  });
  describe('open lnode wizard', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: VoltageLevelEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><voltage-level-editor
              .element=${doc.querySelector('VoltageLevel[name="E1"]')}
            ></voltage-level-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('voltage-level-editor');

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
          'VoltageLevel[name="E1"] > LNode[iedName=IED1][ldInst="CircuitBreaker_CB1"][lnClass="LLN0"][lnInst=""]'
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
          'VoltageLevel[name="E1"] > LNode[iedName=IED1][ldInst="CircuitBreaker_CB1"][lnClass="LLN0"][lnInst=""]'
        )
      ).to.exist;
    });
  });
  describe('move action', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: VoltageLevelEditor | null;
    let element2: VoltageLevelEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            >${Array.from(doc?.querySelectorAll('VoltageLevel') ?? []).map(
              vLevel =>
                html`<voltage-level-editor
                  .element=${vLevel}
                ></voltage-level-editor>`
            )}
            ></mock-wizard-editor
          >`
        )
      );
      element = parent.querySelector('voltage-level-editor:nth-child(1)');
      element2 = parent.querySelector('voltage-level-editor:nth-child(2)');
    });
    it('moves VoltageLevel within Substation', async () => {
      expect(doc.querySelector('VoltageLevel')?.getAttribute('name')).to.equal(
        'E1'
      );
      (<HTMLElement>(
        element2?.shadowRoot?.querySelector('mwc-icon-button[icon="forward"]')
      )).click();
      await parent.updateComplete;
      (<HTMLElement>element).click();
      await parent.updateComplete;
      expect(doc.querySelector('VoltageLevel')?.getAttribute('name')).to.equal(
        'J1'
      );
    });
  });
  describe('remove action', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: VoltageLevelEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><voltage-level-editor
              .element=${doc.querySelector('VoltageLevel[name="E1"]')}
            ></voltage-level-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('voltage-level-editor');
    });
    it('removes VoltageLevel on clicking delete button', async () => {
      expect(doc.querySelector('VoltageLevel[name="E1"]')).to.exist;
      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('VoltageLevel[name="E1"]')).to.not.exist;
    });
  });
  describe('clone action', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: VoltageLevelEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><voltage-level-editor
              .element=${doc.querySelector('VoltageLevel[name="E1"]')}
            ></voltage-level-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('voltage-level-editor');
    });
    it('duplicates VoltageLevel on clicking duplicate button', async () => {
      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="content_copy"]'
        )
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('VoltageLevel[name="E11"]')).to.exist;
    });
    it('removes all LNode elements in the copy', async () => {
      expect(
        doc.querySelector('VoltageLevel[name="E1"]')?.querySelector('LNode')
      ).to.exist;
      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="content_copy"]'
        )
      )).click();
      await parent.updateComplete;
      expect(
        doc.querySelector('VoltageLevel[name="E11"]')?.querySelector('LNode')
      ).to.not.exist;
    });
    it('removes all Terminal elements except the grounding in the copy', async () => {
      expect(
        doc
          .querySelector('VoltageLevel[name="E1"]')
          ?.querySelector('Terminal:not([cNodeName="grounded"])')
      ).to.exist;
      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="content_copy"]'
        )
      )).click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('VoltageLevel[name="E11"]')
          ?.querySelector('Terminal:not([cNodeName="grounded"])')
      ).to.not.exist;
    });
    it('removes all ConnectivityNode elements in the copy', async () => {
      expect(
        doc
          .querySelector('VoltageLevel[name="E1"]')
          ?.querySelector('ConnectivityNode')
      ).to.exist;
      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="content_copy"]'
        )
      )).click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('VoltageLevel[name="E11"]')
          ?.querySelector('ConnectivityNode')
      ).to.not.exist;
    });
    it('keeps all Bay elements in the copy', async () => {
      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="content_copy"]'
        )
      )).click();
      await parent.updateComplete;
      expect(
        doc.querySelector('VoltageLevel[name="E1"]')?.querySelectorAll('Bay')
          .length
      ).to.equal(
        doc.querySelector('VoltageLevel[name="E11"]')?.querySelectorAll('Bay')
          .length
      );
    });
    it('keeps all ConductingEquipment elements in the copy', async () => {
      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="content_copy"]'
        )
      )).click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('VoltageLevel[name="E1"]')
          ?.querySelectorAll('ConductingEquipment').length
      ).to.equal(
        doc
          .querySelector('VoltageLevel[name="E11"]')
          ?.querySelectorAll('ConductingEquipment').length
      );
    });
  });
});
