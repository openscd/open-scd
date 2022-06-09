import { fixture, html, expect } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import '../../../../src/editors/substation/sub-function-editor.js';
import { SubFunctionEditor } from '../../../../src/editors/substation/sub-function-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

describe('sub-function-editor wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let element: SubFunctionEditor | null;

  let primaryAction: HTMLElement;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/zeroline/functions.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    parent = <MockWizardEditor>(
      await fixture(
        html`<mock-wizard-editor
          ><sub-function-editor
            .element=${doc.querySelector(
              'Function[name="voltLvName"] > SubFunction'
            )}
          ></sub-function-editor
        ></mock-wizard-editor>`
      )
    );

    element = parent.querySelector('sub-function-editor');
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
          'Function[name="voltLvName"] > SubFunction > SubFunction'
        )
      ).to.exist;

      nameField.value = 'mySubSubFunction';
      primaryAction.click();
      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          'Function[name="voltLvName"] > SubFunction > SubFunction'
        ).length
      ).to.equal(1);
    });

    it('does add SubFunction if name attribute is unique', async () => {
      expect(
        doc.querySelector(
          'Function[name="voltLvName"] > SubFunction > SubFunction[name="someNewSubFunction"]'
        )
      ).to.not.exist;

      nameField.value = 'someNewSubFunction';
      await parent.updateComplete;
      primaryAction.click();

      expect(
        doc.querySelector(
          'Function[name="voltLvName"] > SubFunction > SubFunction[name="someNewSubFunction"]'
        )
      ).to.exist;
    });
  });

  describe('open edit wizard', () => {
    let nameField: WizardTextField;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      element!.element = doc.querySelector<Element>(
        'Bay[name="COUPLING_BAY"] > Function[name="bayName"] > SubFunction[name="myBaySubFunc"]'
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

    it('does not update SubFunction if name attribute is not unique', async () => {
      expect(
        doc.querySelectorAll(
          'Bay[name="COUPLING_BAY"] SubFunction[name="mySubFunc2"]'
        )
      ).to.lengthOf(1);

      nameField.value = 'mySubFunc2';
      primaryAction.click();
      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          'Bay[name="COUPLING_BAY"] SubFunction[name="mySubFunc2"]'
        )
      ).to.lengthOf(1);
    });

    it('does update SubFunction if name attribute is unique', async () => {
      nameField.value = 'someNewFunction';
      await parent.updateComplete;
      primaryAction.click();

      expect(
        doc.querySelector(
          'Bay[name="COUPLING_BAY"] > Function[name="bayName"] > SubFunction[name="someNewFunction"]'
        )
      ).to.exist;
      expect(
        doc.querySelector(
          'Bay[name="COUPLING_BAY"] > Function[name="bayName"] > SubFunction[name="myBaySubFunc"]'
        )
      ).to.not.exist;
    });
  });

  describe('open create wizard for element LNode', () => {
    let listItems: ListItemBase[];

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/zeroline/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><sub-function-editor
              .element=${doc.querySelector(
                'Function[name="voltLvName"] > SubFunction'
              )}
            ></sub-function-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('sub-function-editor');

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

    it('add selected LNode instances to SubFcuntion parent', async () => {
      listItems[3].selected = true;
      listItems[5].selected = true;

      await primaryAction.click();

      expect(
        doc.querySelector(
          'Function[name="voltLvName"] > SubFunction > LNode[iedName="None"][lnClass="CSWI"][lnInst="1"]'
        )
      ).to.exist;
      expect(
        doc.querySelector(
          'Function[name="voltLvName"] > SubFunction > LNode[iedName="None"][lnClass="CSWI"][lnInst="2"]'
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

    it('removes the attached SubFunction element from the document', async () => {
      expect(doc.querySelector('Function[name="voltLvName"] > SubFunction')).to
        .exist;

      await deleteButton.click();

      expect(doc.querySelector('Function[name="voltLvName"] > SubFunction')).to
        .not.exist;
    });
  });
});
