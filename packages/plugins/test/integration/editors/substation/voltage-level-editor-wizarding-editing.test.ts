import { fixture, html, expect } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { MockWizardEditor } from '@openscd/open-scd/test/mock-wizard-editor.js';

import '../../../../src/editors/substation/voltage-level-editor.js';
import { VoltageLevelEditor } from '../../../../src/editors/substation/voltage-level-editor.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base.js';
import { MenuBase } from '@material/mwc-menu/mwc-menu-base.js';

const openAndCancelMenu: (
  parent: MockWizardEditor,
  element: VoltageLevelEditor
) => Promise<void> = (
  parent: MockWizardEditor,
  element: VoltageLevelEditor
): Promise<void> =>
  new Promise(async resolve => {
    expect(parent.wizardUI.dialog).to.be.undefined;

    element?.shadowRoot
      ?.querySelector<MenuBase>("mwc-icon-button[icon='playlist_add']")!
      .click();
    const powerTransformerMenuItem: ListItemBase =
      element?.shadowRoot?.querySelector<ListItemBase>(
        `mwc-list-item[value='PowerTransformer']`
      )!;

    console.log(powerTransformerMenuItem);
    powerTransformerMenuItem.click();
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

describe('voltage-level-editor wizarding editing integration', () => {
  describe('edit wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: VoltageLevelEditor | null;

    let nameField: WizardTextField;
    let descField: WizardTextField;
    let nomFreqField: WizardTextField;
    let numPhasesField: WizardTextField;
    let voltageField: WizardTextField;
    let secondaryAction: HTMLElement;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor .doc=${doc}
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

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
      );
      descField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="desc"]')
      );
      nomFreqField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector(
          'wizard-textfield[label="nomFreq"]'
        )
      );
      numPhasesField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector(
          'wizard-textfield[label="numPhases"]'
        )
      );
      voltageField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector(
          'wizard-textfield[label="Voltage"]'
        )
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
      expect(doc.querySelector('VoltageLevel')?.getAttribute('name')).to.equal(
        'newName'
      );
    });
    it('changes desc attribute on primary action', async () => {
      descField.value = 'newDesc';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('VoltageLevel')?.getAttribute('desc')).to.equal(
        'newDesc'
      );
    });
    it('deletes desc attribute if wizard-textfield is deactivated', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      descField.nullSwitch!.click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('VoltageLevel')?.getAttribute('desc')).to.be
        .null;
    });
    it('changes nomFreq attribute on primary action', async () => {
      nomFreqField.value = '30';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('VoltageLevel')?.getAttribute('nomFreq')
      ).to.equal('30');
    });
    it('deletes nomFreq attribute if wizard-textfield is deactivated', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      nomFreqField.nullSwitch!.click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('VoltageLevel')?.getAttribute('nomFreq')).to.be
        .null;
    });
    it('changes numPhases attribute on primary action', async () => {
      numPhasesField.value = '3';
      await parent.updateComplete;
      primaryAction.click();
      expect(
        doc.querySelector('VoltageLevel')?.getAttribute('numPhases')
      ).to.equal('3');
    });
    it('deletes numPhases attribute if wizard-textfield is deactivated', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      numPhasesField.nullSwitch!.click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('VoltageLevel')?.getAttribute('numPhases')).to.be
        .null;
    });
    it('changes Voltage value on primary action', async () => {
      voltageField.value = '20.0';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('Voltage')?.innerHTML).to.equal('20.0');
    });
    it('changes Voltage multiplier on primary action', async () => {
      voltageField.multiplier = 'M';
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('Voltage')?.getAttribute('multiplier')).to.equal(
        'M'
      );
      expect(doc.querySelector('Voltage')?.getAttribute('unit')).to.equal('V');
    });
    it('deletes voltage element if voltage wizard-textfield is deactivated', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      voltageField.nullSwitch!.click();
      await parent.updateComplete;
      primaryAction.click();
      await parent.updateComplete;
      expect(doc.querySelector('VoltageLevel')?.querySelector('Voltage')).to.be
        .null;
    });
  });

  describe('Open add wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: VoltageLevelEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><voltage-level-editor
              .element=${doc.querySelector('VoltageLevel[name="E1"]')}
            ></voltage-level-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('voltage-level-editor');

      await parent.updateComplete;
    });

    it('Should open the same wizard for the second time', async () => {
      await openAndCancelMenu(parent, element!);
      await openAndCancelMenu(parent, element!);
    });
  });

  describe('open add bay wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: VoltageLevelEditor | null;

    let nameField: WizardTextField;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
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
        element?.shadowRoot?.querySelector('mwc-list-item[value="Bay"]')
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
    it('does add bay if name attribute is unique', async () => {
      nameField.value = 'SecondBay';
      await new Promise(resolve => setTimeout(resolve, 100)); // update takes some time
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('VoltageLevel[name="E1"] > Bay[name="SecondBay"]')
      ).to.exist;
    });
  });
  describe('open lnode wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: VoltageLevelEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
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
    it('has two wizard pages', async () => {
      expect(parent.wizardUI.dialogs.length).to.equal(2);
    });
  });
  describe('move action', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: VoltageLevelEditor | null;
    let element2: VoltageLevelEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
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
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: VoltageLevelEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
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
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: VoltageLevelEditor | null;
    let copyContentButton: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/zeroline/clone/noUnusedLNode.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><voltage-level-editor
              .element=${doc.querySelector('VoltageLevel[name="E1"]')}
            ></voltage-level-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('voltage-level-editor');
      await parent.updateComplete;

      copyContentButton = <HTMLElement>(
        element?.shadowRoot?.querySelector(
          'mwc-icon-button[icon="content_copy"]'
        )
      );
    });

    it('duplicates VoltageLevel on clicking duplicate button', async () => {
      copyContentButton.click();
      await parent.updateComplete;

      expect(doc.querySelector('VoltageLevel[name="E2"]')).to.exist;
    });

    it('removes all LNode elements in the copy', async () => {
      expect(
        doc.querySelector('VoltageLevel[name="E1"]')?.querySelector('LNode')
      ).to.exist;

      copyContentButton.click();
      await parent.updateComplete;

      expect(
        doc.querySelector('VoltageLevel[name="E2"]')?.querySelector('LNode')
      ).to.not.exist;
    });

    it('removes all Terminal elements except the grounding in the copy', async () => {
      expect(
        doc
          .querySelector('VoltageLevel[name="E1"]')
          ?.querySelector('Terminal:not([cNodeName="grounded"])')
      ).to.exist;

      copyContentButton.click();
      await parent.updateComplete;

      expect(
        doc
          .querySelector('VoltageLevel[name="E2"]')
          ?.querySelector('Terminal:not([cNodeName="grounded"])')
      ).to.not.exist;
    });

    it('removes all ConnectivityNode elements in the copy', async () => {
      expect(
        doc
          .querySelector('VoltageLevel[name="E1"]')
          ?.querySelector('ConnectivityNode')
      ).to.exist;

      copyContentButton.click();
      await parent.updateComplete;

      expect(
        doc
          .querySelector('VoltageLevel[name="E2"]')
          ?.querySelector('ConnectivityNode')
      ).to.not.exist;
    });

    it('keeps all Bay elements in the copy', async () => {
      copyContentButton.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('VoltageLevel[name="E1"]')?.querySelectorAll('Bay')
          .length
      ).to.equal(
        doc.querySelector('VoltageLevel[name="E2"]')?.querySelectorAll('Bay')
          .length
      );
    });

    it('keeps all ConductingEquipment elements in the copy', async () => {
      copyContentButton.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector('VoltageLevel[name="E1"]')
          ?.querySelectorAll('ConductingEquipment').length
      ).to.equal(
        doc
          .querySelector('VoltageLevel[name="E2"]')
          ?.querySelectorAll('ConductingEquipment').length
      );
    });
  });

  describe('open create wizard for element Function', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: VoltageLevelEditor | null;

    let nameField: WizardTextField;
    let primaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/zeroline/functions.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><voltage-level-editor
              .element=${doc.querySelector('VoltageLevel')}
            ></voltage-level-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('voltage-level-editor');

      (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-list-item[value="Function"]')
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

    it('does not add Function if name attribute is not unique', async () => {
      expect(
        doc.querySelector(
          'VoltageLevel[name="E1"] > Function[name="voltLvName"]'
        )
      ).to.exist;

      nameField.value = 'voltLvName';
      primaryAction.click();
      await parent.updateComplete;

      expect(
        doc.querySelectorAll(
          'VoltageLevel[name="E1"] > Function[name="voltLvName"]'
        ).length
      ).to.equal(1);
    });

    it('does add Function if name attribute is unique', async () => {
      expect(
        doc.querySelector(
          'VoltageLevel[name="E1"] > Function[name="someNewFunction"]'
        )
      ).to.not.exist;

      nameField.value = 'someNewFunction';
      await parent.updateComplete;

      primaryAction.click();

      expect(
        doc.querySelector(
          'VoltageLevel[name="E1"] > Function[name="someNewFunction"]'
        )
      ).to.exist;
    });
  });
});
