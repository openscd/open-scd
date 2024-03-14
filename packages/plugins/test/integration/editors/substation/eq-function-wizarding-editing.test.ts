import { fixture, html, expect } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { MockWizardEditor } from '@openscd/open-scd/test/mock-wizard-editor.js';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '../../../../src/editors/substation/eq-function-editor.js';
import { EqFunctionEditor } from '../../../../src/editors/substation/eq-function-editor.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import { MenuBase } from '@material/mwc-menu/mwc-menu-base.js';

const openAndCancelMenu: (
  parent: MockWizardEditor,
  element: EqFunctionEditor
) => Promise<void> = (
  parent: MockWizardEditor,
  element: EqFunctionEditor
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

describe('eq-function-editor wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let element: EqFunctionEditor | null;

  let primaryAction: HTMLElement;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/zeroline/functions.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    parent = <MockWizardEditor>(
      await fixture(
        html`<mock-wizard-editor
          ><eq-function-editor
            .element=${doc.querySelector(
              'ConductingEquipment[name="QA1"] > EqFunction'
            )}
          ></eq-function-editor
        ></mock-wizard-editor>`
      )
    );

    element = parent.querySelector('eq-function-editor');
  });

  describe('open create wizard for element EqSubFunction', () => {
    let nameField: WizardTextField;

    beforeEach(async () => {
      (<HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-list-item[value="EqSubFunction"]'
        )
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

    it('does not add EqSubFunction if name attribute is not unique', async () => {
      expect(
        doc.querySelector(
          'ConductingEquipment[name="QA1"] EqSubFunction[name="myEqSubFunc"]'
        )
      ).to.exist;

      nameField.value = 'myEqSubFunc';
      primaryAction.click();

      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          'ConductingEquipment[name="QA1"] EqSubFunction[name="myEqSubFunc"]'
        ).length
      ).to.equal(1);
    });

    it('does add EqFunction if name attribute is unique', async () => {
      expect(
        doc.querySelector(
          'ConductingEquipment[name="QA1"] EqSubFunction[name="someNewEqSubFunction"]'
        )
      ).to.not.exist;

      nameField.value = 'someNewEqSubFunction';
      await parent.updateComplete;
      primaryAction.click();

      expect(
        doc.querySelector(
          'ConductingEquipment[name="QA1"] EqSubFunction[name="someNewEqSubFunction"]'
        )
      ).to.exist;
    });
  });

  describe('open edit wizard', () => {
    let nameField: WizardTextField;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      element!.element = doc.querySelector(
        'PowerTransformer[name="myPtr3"] > EqFunction[name="myEqFuncQB3"]'
      )!;

      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
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

    it('does not update Function if name attribute is not unique', async () => {
      expect(
        doc.querySelectorAll(
          'PowerTransformer[name="myPtr3"] > EqFunction[name="myEqFuncQB2"]'
        )
      ).to.lengthOf(1);

      nameField.value = 'myEqFuncQB2';
      primaryAction.click();
      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          'PowerTransformer[name="myPtr3"] > EqFunction[name="myEqFuncQB2"]'
        )
      ).to.lengthOf(1);
    });

    it('does update Function if name attribute is unique', async () => {
      nameField.value = 'someNewFunction';
      await parent.updateComplete;
      primaryAction.click();

      expect(
        doc.querySelector(
          'PowerTransformer[name="myPtr3"] > EqFunction[name="someNewFunction"]'
        )
      ).to.exist;
      expect(
        doc.querySelector(
          'PowerTransformer[name="myPtr3"] > EqFunction[name="myEqFuncQB3"]'
        )
      ).to.not.exist;
    });
  });

  describe('open create wizard for element LNode', () => {
    let listItems: ListItemBase[];

    beforeEach(async () => {
      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-list-item[value="LNode"]')
      )).click();
      await parent.requestUpdate();

      await parent.updateComplete;

      listItems = Array.from(
        parent.wizardUI!.dialog!.querySelectorAll<ListItemBase>(
          'mwc-check-list-item'
        )
      );

      primaryAction = <HTMLElement>(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('add selected LNode instances to SubFcuntion parent', async () => {
      listItems[3].selected = true;
      listItems[5].selected = true;

      await primaryAction.click();

      expect(
        doc.querySelector(
          'ConductingEquipment[name="QA1"] > EqFunction > LNode[iedName="None"][lnClass="CSWI"][lnInst="1"]'
        )
      ).to.exist;
      expect(
        doc.querySelector(
          'ConductingEquipment[name="QA1"] > EqFunction > LNode[iedName="None"][lnClass="CSWI"][lnInst="2"]'
        )
      ).to.exist;
    });
  });

  describe('has a delete icon button that', () => {
    let deleteButton: HTMLElement;

    beforeEach(async () => {
      deleteButton = <HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
      );
      await parent.updateComplete;
    });

    it('removes the attached EqFunction element from the document', async () => {
      expect(
        doc.querySelector(
          'ConductingEquipment[name="QA1"] EqSubFunction[name="myEqSubFunc"]'
        )
      ).to.exist;

      await deleteButton.click();

      expect(
        doc.querySelector(
          'ConductingEquipment[name="QA1"] EqSubFunction[name="myEqSubFunc"]'
        )
      ).to.not.exist;
    });
  });

  describe('Open add wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: EqFunctionEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/zeroline/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><eq-function-editor
              .element=${doc.querySelector(
                'ConductingEquipment[name="QA1"] > EqFunction'
              )}
            ></eq-function-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('eq-function-editor');

      await parent.updateComplete;
    });

    it('Should open the same wizard for the second time', async () => {
      await openAndCancelMenu(parent, element!);
      await openAndCancelMenu(parent, element!);
    });
  });
});
