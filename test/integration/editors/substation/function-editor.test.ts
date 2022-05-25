import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '../../../../src/editors/substation/function-editor.js';
import { FunctionEditor } from '../../../../src/editors/substation/function-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';

describe('function-editor wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let element: FunctionEditor | null;

  let primaryAction: HTMLElement;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/zeroline/functions.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    parent = <MockWizardEditor>(
      await fixture(
        html`<mock-wizard-editor
          ><function-editor
            .element=${doc.querySelector('Function')}
          ></function-editor
        ></mock-wizard-editor>`
      )
    );

    element = parent.querySelector('function-editor');
  });

  describe('open create wizard for element SubFunction', () => {
    let nameField: WizardTextField;

    beforeEach(async () => {
      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-list-item[value="SubFunction"]')
      )).click();
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

    it('does not add SubFunction if name attribute is not unique', async () => {
      expect(
        doc.querySelector(
          'Substation > Function > SubFunction[name="mySubFunc"]'
        )
      ).to.exist;

      nameField.value = 'mySubFunc';
      primaryAction.click();
      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          'Substation > Function > SubFunction[name="mySubFunc"]'
        ).length
      ).to.equal(1);
    });

    it('does add SubFunction if name attribute is unique', async () => {
      expect(
        doc.querySelector(
          'Substation > Function > SubFunction[name="someNewFunction"]'
        )
      ).to.not.exist;

      nameField.value = 'someNewFunction';
      await parent.updateComplete;
      primaryAction.click();

      expect(
        doc.querySelector(
          'Substation > Function > SubFunction[name="someNewFunction"]'
        )
      ).to.exist;
    });
  });

  describe('open edit wizard', () => {
    let nameField: WizardTextField;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      element!.element = doc.querySelector(
        'Bay[name="COUPLING_BAY"] > Function[name="bayName"]'
      )!;

      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();
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
          'Bay[name="COUPLING_BAY"] > Function[name="bay2Func"]'
        )
      ).to.lengthOf(1);

      nameField.value = 'bay2Func';
      primaryAction.click();
      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          'Bay[name="COUPLING_BAY"] > Function[name="bay2Func"]'
        )
      ).to.lengthOf(1);
    });

    it('does update Function if name attribute is unique', async () => {
      nameField.value = 'someNewFunction';
      await parent.updateComplete;
      primaryAction.click();

      expect(
        doc.querySelector(
          'Bay[name="COUPLING_BAY"] > Function[name="someNewFunction"]'
        )
      ).to.exist;
      expect(
        doc.querySelector('Bay[name="COUPLING_BAY"] > Function[name="bayName"]')
      ).to.not.exist;
    });
  });

  describe('open create wizard for element LNode', () => {
    let listItems: ListItemBase[];

    beforeEach(async () => {
      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-list-item[value="LNode"]')
      )).click();
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

    it('add selected LNode instances to Function parent', async () => {
      listItems[3].selected = true;
      listItems[5].selected = true;

      await primaryAction.click();

      expect(
        doc.querySelector(
          'Function > LNode[iedName="None"][lnClass="CSWI"][lnInst="1"]'
        )
      ).to.exist;
      expect(
        doc.querySelector(
          'Function > LNode[iedName="None"][lnClass="CSWI"][lnInst="2"]'
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

    it('removes the attached Function element from the document', async () => {
      expect(
        doc.querySelector('Substation[name="AA1"] > Function[name="myFunc"]')
      ).to.exist;

      await deleteButton.click();

      expect(
        doc.querySelector('Substation[name="AA1"] > Function[name="myFunc"]')
      ).to.not.exist;
    });
  });
});
