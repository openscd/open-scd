import { fixture, html, expect } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { MockWizardEditor } from '@openscd/open-scd/test/mock-wizard-editor.js';

import '../../../../src/editors/substation/powertransformer-editor.js';
import { PowerTransformerEditor } from '../../../../src/editors/substation/powertransformer-editor.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base.js';
import { MenuBase } from '@material/mwc-menu/mwc-menu-base.js';

const openAndCancelMenu: (
  parent: MockWizardEditor,
  element: PowerTransformerEditor
) => Promise<void> = (
  parent: MockWizardEditor,
  element: PowerTransformerEditor
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
        'mwc-button[slot="secondaryAction"]'
      )
    );

    secondaryAction.click();
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation

    expect(parent.wizardUI.dialog).to.be.undefined;

    return resolve();
  });

describe('powertransformer-editor wizarding editing integration', () => {
  describe('open create wizard for element EqFunction', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: PowerTransformerEditor | null;

    let nameField: WizardTextField;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/zeroline/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><powertransformer-editor
              .element=${doc.querySelector('PowerTransformer[name="myPtr2"]')}
              ?showfunctions=${true}
            ></powertransformer-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('powertransformer-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-list-item[value="EqFunction"]')
      )).click();
      await parent.updateComplete;
      await parent.wizardUI.updateComplete;

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
          'PowerTransformer[name="myPtr2"] > EqFunction[name="myEqFuncPtr2"]'
        )
      ).to.exist;

      nameField.value = 'myEqFuncPtr2';
      primaryAction.click();
      await parent.updateComplete;
      await parent.wizardUI.updateComplete;

      expect(
        doc.querySelectorAll(
          'PowerTransformer[name="myPtr2"] > EqFunction[name="myEqFuncPtr2"]'
        ).length
      ).to.equal(1);
    });

    it('does add EqFunction if name attribute is unique', async () => {
      expect(
        doc.querySelector(
          'PowerTransformer[name="myPtr2"] > EqFunction[name="someNewFunction"]'
        )
      ).to.not.exist;

      nameField.value = 'someNewFunction';
      await parent.updateComplete;
      primaryAction.click();

      expect(
        doc.querySelector(
          'PowerTransformer[name="myPtr2"] > EqFunction[name="someNewFunction"]'
        )
      ).to.exist;
    });
  });

  describe('Open add wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: PowerTransformerEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/zeroline/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><powertransformer-editor
              .element=${doc.querySelector('PowerTransformer[name="myPtr2"]')}
              ?showfunctions=${true}
            ></powertransformer-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('powertransformer-editor');

      await parent.updateComplete;
      await parent.wizardUI.updateComplete;
    });

    it('Should open the same wizard for the second time', async () => {
      await openAndCancelMenu(parent, element!);
      await openAndCancelMenu(parent, element!);
    });

    it('Should add SubEquipment', async () => {
      expect(parent.wizardUI.dialog).to.be.undefined;

      element?.shadowRoot
        ?.querySelector<MenuBase>("mwc-icon-button[icon='playlist_add']")!
        .click();

      element?.shadowRoot
        ?.querySelector<ListItemBase>(`mwc-list-item[value='SubEquipment']`)!
        .click();

      await new Promise(resolve => setTimeout(resolve, 100)); // await animation

      expect(parent.wizardUI.dialog).to.exist;

      const nameTextField: WizardTextField =
        parent.wizardUI!.dialog!.querySelector<WizardTextField>(
          'wizard-textfield[label="name"]'
        )!;

      const subEquipmentName = 'unique-name';

      nameTextField.value = subEquipmentName;

      await parent.updateComplete;

      const primaryAction: HTMLElement = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );

      primaryAction.click();
      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          `PowerTransformer[name="myPtr2"] > SubEquipment[name="${subEquipmentName}"]`
        ).length
      ).to.equal(1);
    });
  });
});
