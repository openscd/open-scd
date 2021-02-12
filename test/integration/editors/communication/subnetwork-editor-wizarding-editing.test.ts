import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { EditingElement } from '../../../../src/Editing.js';
import { WizardingElement } from '../../../../src/Wizarding.js';
import { SubNetworkEditor } from '../../../../src/editors/communication/subnetwork-editor.js';

import { getDocument } from '../../../data.js';

import { WizardTextField } from '../../../../src/wizard-textfield.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

describe('subnetwork-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    const doc = getDocument();

    let parent: WizardingElement & EditingElement;
    let element: SubNetworkEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><subnetwork-editor
              .element=${doc.querySelector('SubNetwork')}
            ></subnetwork-editor>
            ></mock-wizard-editor
          >`
        )
      );
      element = parent.querySelector('subnetwork-editor');
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
    describe('edit attributes within SubNetwork', () => {
      it('does not change name attribute if not unique within parent element', async () => {
        const oldName = parent.wizardUI.inputs[0].value;
        parent.wizardUI.inputs[0].value = 'ProcessBus';

        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('SubNetwork')?.getAttribute('name')).to.equal(
          oldName
        );
      });
      it('changes name attribute on primary action', async () => {
        parent.wizardUI.inputs[0].value = 'newSubNetwork';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('SubNetwork')?.getAttribute('name')).to.equal(
          'newSubNetwork'
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
        expect(doc.querySelector('SubNetwork')?.getAttribute('desc')).to.equal(
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
        expect(doc.querySelector('SubNetwork')?.getAttribute('desc')).to.be
          .null;
      });
      it('changes type attribute on primary action', async () => {
        parent.wizardUI.inputs[2].value = 'newType';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('SubNetwork')?.getAttribute('type')).to.equal(
          'newType'
        );
      });
      it('deletes type attribute if wizard-textfield is deactivated', async () => {
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
        expect(doc.querySelector('SubNetwork')?.getAttribute('type')).to.be
          .null;
      });
    });
    describe('edit BitRate', () => {
      beforeEach(async () => {
        await (<HTMLElement>(
          element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
        )).click();
        await parent.updateComplete;
      });
      it('changes value on primary action', async () => {
        parent.wizardUI.inputs[3].value = '20.0';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(doc.querySelector('BitRate')?.innerHTML).to.equal('20.0');
      });
      it('changes multiplier on primary action', async () => {
        (<WizardTextField>parent.wizardUI.inputs[3]).multiplier = 'M';
        await parent.updateComplete;
        await (<HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        )).click();
        expect(
          doc.querySelector('BitRate')?.getAttribute('multiplier')
        ).to.equal('M');
        expect(doc.querySelector('BitRate')?.getAttribute('unit')).to.equal(
          'b/s'
        );
      });
      it('deletes BitRate element if voltage wizard-textfield is deactivated', async () => {
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
        expect(doc.querySelector('SubNetwork')?.querySelector('BitRate')).to.be
          .null;
      });
    });
  });
  describe('remove action', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: SubNetworkEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><subnetwork-editor
              .element=${doc.querySelector('SubNetwork[name="StationBus"]')}
            ></subnetwork-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('subnetwork-editor');
    });
    it('removes SubNetwork on clicking delete button', async () => {
      expect(doc.querySelector('SubNetwork[name="StationBus"]')).to.exist;
      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('SubNetwork[name="StationBus"]')).to.not.exist;
    });
  });
  describe('add ConnectedAP action', () => {
    const doc = getDocument();
    let parent: WizardingElement & EditingElement;
    let element: SubNetworkEditor | null;
    beforeEach(async () => {
      parent = <WizardingElement & EditingElement>(
        await fixture(
          html`<mock-wizard-editor
            ><subnetwork-editor
              .element=${doc.querySelector('SubNetwork[name="StationBus"]')}
            ></subnetwork-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('subnetwork-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="playlist_add"]'
        )
      )).click();
      await parent.updateComplete;
    });
    it('add ConnectedAP on primary action', async () => {
      expect(
        doc.querySelector(
          ':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED3"][apName="P1"]'
        )
      ).to.not.exist;
      (<ListItemBase>(
        parent.wizardUI.dialog!.querySelector(
          'mwc-check-list-item:nth-child(1)'
        )
      )).click();
      await parent.updateComplete;
      await (<HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      expect(
        doc.querySelector(
          ':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED3"][apName="P1"]'
        )
      ).to.exist;
    });
  });
});
