import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { BayEditor } from '../../../../src/editors/substation/bay-editor.js';
import { EditingElement } from '../../../../src/Editing.js';
import { WizardingElement } from '../../../../src/Wizarding.js';

import { getDocument } from '../../../data.js';

import { WizardTextField } from '../../../../src/wizard-textfield.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { Select } from '@material/mwc-select';

describe('bay-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    const doc = getDocument();

    let parent: WizardingElement & EditingElement;
    let element: BayEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><bay-editor .element=${doc.querySelector('Bay')}></bay-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('bay-editor');
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
    describe('edit attributes within a Bay', () => {
      it('does not change name attribute if not unique within parent element', async () => {
        const oldName = parent.wizardUI.inputs[0].value;
        parent.wizardUI.inputs[0].value = 'Bay2';

        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('Bay')?.getAttribute('name')).to.equal(
          oldName
        );
      });
      it('changes name attribute on primary action', async () => {
        parent.wizardUI.inputs[0].value = 'newName';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('Bay')?.getAttribute('name')).to.equal(
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
        expect(doc.querySelector('Bay')?.getAttribute('desc')).to.equal(
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
        expect(doc.querySelector('Bay')?.getAttribute('desc')).to.be.null;
      });
    });
  });
  describe('open add conducting equipment wizard', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: BayEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><bay-editor .element=${doc.querySelector('Bay')}></bay-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('bay-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="playlist_add"]'
        )
      )).click();
      await parent.updateComplete;
    });
    it('opens conducting equipment wizard ', async () => {
      expect(parent.wizardUI).to.exist;
    });
    it('has three wizard inputs', async () => {
      expect(parent.wizardUI.inputs.length).to.equal(3);
    });
    it('the first a selctor for the type attribute', async () => {
      expect(parent.wizardUI.inputs[0]).to.be.instanceOf(Select);
    });
    it('the second one a wizard-textfield for name attribute', async () => {
      expect(parent.wizardUI.inputs[1]).to.be.instanceOf(WizardTextField);
      expect(parent.wizardUI.inputs[1].label).to.equal('name');
    });
    it('the third one a wizard-textfield for desc attribute', async () => {
      expect(parent.wizardUI.inputs[2]).to.be.instanceOf(WizardTextField);
      expect(parent.wizardUI.inputs[2].label).to.equal('desc');
    });
    it('does not add conducting equipment if name attribute is not unique', async () => {
      parent.wizardUI.inputs[0].value = 'CBR';
      parent.wizardUI.inputs[1].value = 'QA1';
      await parent.updateComplete;
      await (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      expect(
        doc.querySelectorAll(
          'VoltageLevel[name="E1"] > Bay[name="COUPLING_BAY"] > ConductingEquipment[name="QA1"]'
        ).length
      ).to.equal(1);
    });
    it('does add conducting equipment if name attribute is unique', async () => {
      (<Select>parent.wizardUI.inputs[0]).value = 'CBR';
      parent.wizardUI.inputs[1].value = 'QA2';
      await parent.updateComplete;
      await (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      expect(
        doc.querySelector(
          'VoltageLevel[name="E1"] > Bay[name="COUPLING_BAY"] > ConductingEquipment[name="QA2"]'
        )
      ).to.exist;
    });
  });
  describe('open lnode wizard', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: BayEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><bay-editor .element=${doc.querySelector('Bay')}></bay-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('bay-editor');

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
          'Bay[name="COUPLING_BAY"] > LNode[iedName=IED2][ldInst="CBSW"][lnClass="LLN0"][lnInst=""]'
        )
      ).to.not.exist;
      (<ListItemBase>(
        parent.wizardUI
          .shadowRoot!.querySelector('mwc-dialog:nth-child(3)')!
          .querySelector('mwc-check-list-item:nth-child(3)')
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
          'Bay[name="COUPLING_BAY"] > LNode[iedName=IED2][ldInst="CBSW"][lnClass="LLN0"][lnInst=""]'
        )
      ).to.exist;
    });
  });
  describe('move action', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: BayEditor | null;
    let element2: BayEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            >${Array.from(doc?.querySelectorAll('Bay') ?? []).map(
              bay => html`<bay-editor .element=${bay}></bay-editor>`
            )}
            ></mock-wizard-editor
          >`
        )
      );
      element = parent.querySelector('bay-editor:nth-child(1)');
      element2 = parent.querySelector('bay-editor:nth-child(2)');
    });
    it('moves Bay within VoltageLevel', async () => {
      expect(doc.querySelector('Bay')?.getAttribute('name')).to.equal(
        'COUPLING_BAY'
      );
      (<HTMLElement>(
        element2?.shadowRoot?.querySelector('mwc-icon-button[icon="forward"]')
      )).click();
      await parent.updateComplete;
      (<HTMLElement>element).click();
      await parent.updateComplete;
      expect(doc.querySelector('Bay')?.getAttribute('name')).to.equal('Bay2');
    });
  });
  describe('remove action', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: BayEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><bay-editor
              .element=${doc.querySelector('Bay[name="COUPLING_BAY"]')}
            ></bay-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('bay-editor');
    });
    it('removes Bay on clicking delete button', async () => {
      expect(doc.querySelector('Bay[name="COUPLING_BAY"]')).to.exist;
      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('Bay[name="COUPLING_BAY"]')).to.not.exist;
    });
  });
  describe('clone action', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: BayEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><bay-editor
              .element=${doc.querySelector('Bay[name="COUPLING_BAY"]')}
            ></bay-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('bay-editor');
    });
    it('duplicates Bay on clicking duplicate button', async () => {
      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="content_copy"]'
        )
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('Bay[name="COUPLING_BAY1')).to.exist;
    });
    it('removes all LNode elements in the copy', async () => {
      expect(
        doc.querySelector('Bay[name="COUPLING_BAY"]')?.querySelector('LNode')
      ).to.exist;
      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="content_copy"]'
        )
      )).click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('Bay[name="COUPLING_BAY - copy"]')
          ?.querySelector('LNode')
      ).to.not.exist;
    });
    it('removes all Terminal elements exepct the grounding in the copy', async () => {
      expect(
        doc
          .querySelector('Bay[name="COUPLING_BAY"]')
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
          .querySelector('Bay[name="COUPLING_BAY - copy"]')
          ?.querySelector('Terminal:not([cNodeName="grounded"])')
      ).to.not.exist;
    });
    it('removes all ConnectivityNode elements in the copy', async () => {
      expect(
        doc
          .querySelector('Bay[name="COUPLING_BAY"]')
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
          .querySelector('Bay[name="COUPLING_BAY - copy"]')
          ?.querySelector('ConnectivityNode')
      ).to.not.exist;
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
          .querySelector('Bay[name="COUPLING_BAY1"]')
          ?.querySelectorAll('ConductingEquipment').length
      ).to.equal(
        doc
          .querySelector('Bay[name="COUPLING_BAY"]')
          ?.querySelectorAll('ConductingEquipment').length
      );
    });
  });
});
