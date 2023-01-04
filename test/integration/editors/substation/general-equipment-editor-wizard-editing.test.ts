import { expect, fixture, html } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '../../../../src/editors/substation/general-equipment-editor.js';
import { GeneralEquipmentEditor } from '../../../../src/editors/substation/general-equipment-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';
import { MenuBase } from '@material/mwc-menu/mwc-menu-base.js';

const openAndCancelMenu: (
  parent: MockWizardEditor,
  element: GeneralEquipmentEditor
) => Promise<void> = (
  parent: MockWizardEditor,
  element: GeneralEquipmentEditor
): Promise<void> =>
  new Promise(async resolve => {
    expect(parent.wizardUI.dialog).to.be.undefined;

    element?.shadowRoot
      ?.querySelector<MenuBase>("mwc-icon-button[icon='playlist_add']")!
      .click();
    const lnodMenuItem: ListItemBase =
      element?.shadowRoot?.querySelector<ListItemBase>(
        `mwc-list-item[value='LNode']`
      )!;
    lnodMenuItem.click();
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation

    expect(parent.wizardUI.dialog).to.exist;

    const secondaryAction: HTMLElement = <HTMLElement>(
      parent.wizardUI.dialog?.querySelector(
        'mwc-button[slot="secondaryAction"][dialogaction="close"]'
      )
    );

    secondaryAction.click();
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation

    expect(parent.wizardUI.dialog).to.be.undefined;

    return resolve();
  });

describe('general-equipment-editor wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let element: GeneralEquipmentEditor | null;

  describe('edit wizard', () => {
    let nameField: WizardTextField;
    let descField: WizardTextField;
    let typeField: WizardTextField;
    let secondaryAction: HTMLElement;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch(
        '/test/testfiles/editors/substation/generalequipment.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><general-equipment-editor
              .element=${doc.querySelector('GeneralEquipment')}
            ></general-equipment-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('general-equipment-editor');
      await (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-fab[icon="edit"]')
      )).click();
      await parent.updateComplete;

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      descField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]')
      );
      typeField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="type"]')
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
      nameField.value = 'genSub2';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('GeneralEquipment')?.getAttribute('name')
      ).to.equal(oldName);
    });
    it('changes name attribute on primary action', async () => {
      parent.wizardUI.inputs[0].value = 'newName';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('GeneralEquipment')?.getAttribute('name')
      ).to.equal('newName');
    });
    it('changes type attribute on primary action', async () => {
      parent.wizardUI.inputs[2].value = 'newAXN';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('GeneralEquipment')?.getAttribute('type')
      ).to.equal('newAXN');
    });
    it('changes desc attribute on primary action', async () => {
      descField.value = 'newDesc';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('GeneralEquipment')?.getAttribute('desc')
      ).to.equal('newDesc');
    });
    it('deletes desc attribute if wizard-textfield is deactivated', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      descField.nullSwitch!.click();
      await parent.updateComplete;
      await primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('GeneralEquipment')?.getAttribute('desc')).to.be
        .null;
    });

    describe('has a delete icon button that', () => {
      let deleteButton: HTMLElement;

      beforeEach(async () => {
        deleteButton = <HTMLElement>(
          element?.shadowRoot?.querySelector('mwc-fab[icon="delete"]')
        );
        await parent.updateComplete;
      });

      it('removes the attached GeneralEquipment element from the document', async () => {
        expect(
          doc.querySelector(
            'Substation[name="AA1"] > GeneralEquipment[name="genSub"]'
          )
        ).to.exist;

        await deleteButton.click();

        expect(
          doc.querySelector(
            'Substation[name="AA1"] > GeneralEquipment[name="genSub"]'
          )
        ).to.not.exist;
      });
    });
  });

  describe('Open add wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: GeneralEquipmentEditor | null;

    beforeEach(async () => {
      doc = await fetch(
        '/test/testfiles/editors/substation/generalequipment.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><general-equipment-editor
              .element=${doc.querySelector('GeneralEquipment')}
              ?showfunctions=${true}
            ></general-equipment-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('general-equipment-editor');

      await parent.updateComplete;
    });

    it('Should open the same wizard for the second time', async () => {
      await openAndCancelMenu(parent, element!);
      await openAndCancelMenu(parent, element!);
    });
  });
});
