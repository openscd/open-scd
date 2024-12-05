import { fixture, html, expect } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { MockWizardEditor } from '@openscd/open-scd/test/mock-wizard-editor.js';

import '../../../../src/editors/substation/conducting-equipment-editor.js';
import { ConductingEquipmentEditor } from '../../../../src/editors/substation/conducting-equipment-editor.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import { MenuBase } from '@material/mwc-menu/mwc-menu-base.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base.js';

const openAndCancelMenu: (
  parent: MockWizardEditor,
  element: ConductingEquipmentEditor
) => Promise<void> = (
  parent: MockWizardEditor,
  element: ConductingEquipmentEditor
): Promise<void> =>
  new Promise(async resolve => {
    expect(parent.wizardUI.dialog).to.be.undefined;

    element?.shadowRoot
      ?.querySelector<MenuBase>("mwc-icon-button[icon='playlist_add']")!
      .click();
    const lnodeMenuItem: ListItemBase =
      element?.shadowRoot?.querySelector<ListItemBase>(
        `mwc-list-item[value='LNode']`
      )!;
    lnodeMenuItem.click();
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation

    expect(parent.wizardUI.dialog).to.exist;

    const secondaryAction: HTMLElement = <HTMLElement>(
      parent.wizardUI.dialog?.querySelector(
        'mwc-button[slot="secondaryAction"]'
      )
    );

    secondaryAction.click();
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation

    expect(parent.wizardUI.dialog).to.be.undefined;

    return resolve();
  });

describe('conducting-equipment-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: ConductingEquipmentEditor | null;

    let nameField: WizardTextField;
    let descField: WizardTextField;
    let secondaryAction: HTMLElement;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
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
        element?.shadowRoot?.querySelector('*[icon="edit"]')
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
    it('changes name attribute on primary action', async () => {
      nameField.value = 'newName';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('ConductingEquipment')?.getAttribute('name')
      ).to.equal('newName');
    });
    it('changes desc attribute on primary action', async () => {
      descField.value = 'newDesc';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('ConductingEquipment')?.getAttribute('desc')
      ).to.equal('newDesc');
    });
    it('deletes desc attribute if wizard-textfield is deactivated', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      descField.nullSwitch!.click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('ConductingEquipment')?.getAttribute('desc')).to
        .be.null;
    });
  });
  describe('open lnode wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: ConductingEquipmentEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
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
        element?.shadowRoot?.querySelector('*[icon="account_tree"]')
      )).click();
      await parent.updateComplete;
    });
    it('opens lnode wizard ', async () => {
      expect(parent.wizardUI).to.exist;
    });
    it('has two wizard pages', async () => {
      expect(parent.wizardUI.dialogs.length).to.equal(2);
    });
  });
  describe('move action', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: ConductingEquipmentEditor | null;
    let element2: ConductingEquipmentEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
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
        element2?.shadowRoot?.querySelector('*[icon="forward"]')
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
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: ConductingEquipmentEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
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
        element?.shadowRoot?.querySelector('*[icon="delete"]')
      )).click();
      await parent.updateComplete;
      expect(doc.querySelector('ConductingEquipment[name="QA1"]')).to.not.exist;
    });
  });

  describe('open create wizard for element EqFunction', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: ConductingEquipmentEditor | null;

    let nameField: WizardTextField;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/zeroline/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><conducting-equipment-editor
              .element=${doc.querySelector('ConductingEquipment')}
              ?showfunctions=${true}
            ></conducting-equipment-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('conducting-equipment-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-list-item[value="EqFunction"]')
      )).click();
      await parent.requestUpdate();

      await parent.updateComplete;

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );

      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('does not add EqFunction if name attribute is not unique', async () => {
      expect(
        doc.querySelector(
          'ConductingEquipment > EqFunction[name="myEqFuncQA1"]'
        )
      ).to.exist;

      nameField.value = 'myEqFuncQA1';
      primaryAction.click();
      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          'ConductingEquipment > EqFunction[name="myEqFuncQA1"]'
        ).length
      ).to.equal(1);
    });

    it('does add EqFunction if name attribute is unique', async () => {
      expect(
        doc.querySelector(
          'ConductingEquipment > EqFunction[name="someNewFunction"]'
        )
      ).to.not.exist;

      nameField.value = 'someNewFunction';
      await parent.updateComplete;
      primaryAction.click();

      expect(
        doc.querySelector(
          'ConductingEquipment > EqFunction[name="someNewFunction"]'
        )
      ).to.exist;
    });
  });

  describe('Open add wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: ConductingEquipmentEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><conducting-equipment-editor
              .element=${doc.querySelector('ConductingEquipment')}
              ?showfunctions=${true}
            ></conducting-equipment-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('conducting-equipment-editor');

      await parent.updateComplete;
    });

    it('Should open the same wizard for the second time', async () => {
      await openAndCancelMenu(parent, element!);
      await openAndCancelMenu(parent, element!);
    });
  });
});
