import { expect, fixture, html } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '../../../../src/editors/substation/tapchanger-editor';
import { TapChangerEditor } from '../../../../src/editors/substation/tapchanger-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';
import { WizardCheckbox } from '../../../../src/wizard-checkbox.js';
import { MenuBase } from '@material/mwc-menu/mwc-menu-base.js';

describe('tapchanger-editor wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let element: TapChangerEditor | null;

  describe('edit wizard', () => {
    let nameField: WizardTextField;
    let descField: WizardTextField;
    let primaryAction: HTMLElement;
    let secondaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/substation/TapChanger.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><tapchanger-editor
              .element=${doc.querySelector(
                'TransformerWinding[name="withTapChanger1"] > TapChanger[name="tapChComplet"]'
              )}
            ></tapchanger-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('tapchanger-editor');
      await (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();
      await parent.updateComplete;

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      descField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]')
      );

      secondaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="secondaryAction"]'
        )
      );
      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });
    it('closes on secondary action', async () => {
      secondaryAction.click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(parent.wizardUI.dialog).to.not.exist;
    });
    it('does not change name attribute if not unique within parent element', async () => {
      const oldName = nameField.value;
      nameField.value = 'empty';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector(
            'TransformerWinding[name="withTapChanger1"] > TapChanger[name="tapChComplet"]'
          )
          ?.getAttribute('name')
      ).to.equal(oldName);
    });
    it('changes desc attribute on primary action', async () => {
      descField.value = 'newDesc';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector(
            'TransformerWinding[name="withTapChanger1"] > TapChanger[name="tapChComplet"]'
          )
          ?.getAttribute('desc')
      ).to.equal('newDesc');
    });
    it('changes virtual attribute on primary action', async () => {
      const virtualCheckbox = <WizardCheckbox>(
        parent.wizardUI.dialog?.querySelector(
          'wizard-checkbox[label="virtual"]'
        )
      );
      virtualCheckbox.nullSwitch!.click();
      virtualCheckbox.maybeValue = 'false';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector(
            'TransformerWinding[name="withTapChanger1"] > TapChanger[name="tapChComplet"]'
          )
          ?.getAttribute('virtual')
      ).to.equal('false');
    });
  });
});
