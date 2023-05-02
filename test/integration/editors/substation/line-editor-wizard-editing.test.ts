import { expect, fixture, html } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '../../../../src/editors/substation/line-editor.js';
import { LineEditor } from '../../../../src/editors/substation/line-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';
import { MenuBase } from '@material/mwc-menu/mwc-menu-base.js';

const openAndCancelMenu: (
  parent: MockWizardEditor,
  element: LineEditor
) => Promise<void> = (
  parent: MockWizardEditor,
  element: LineEditor
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

describe('line-editor wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let element: LineEditor | null;

  describe('edit wizard', () => {
    let nameField: WizardTextField;

    let primaryAction: HTMLElement;
    let secondaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/substation/Line.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><line-editor
              .element=${doc.querySelector('Line[name="Berlin"]')}
            ></line-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('line-editor');
      await (<HTMLElement>(
        element?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
      )).click();
      await parent.updateComplete;

      nameField = <WizardTextField>(
        parent.wizardUI.dialog?.querySelector('wizard-textfield[label="name"]')
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
      nameField.value = 'Munich';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('Line[name="Berlin"]')?.getAttribute('name')
      ).to.equal(oldName);
    });

    it('changes desc attribute on primary action', async () => {
      parent.wizardUI.inputs[1].value = 'newDesc';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('Line[name="Berlin"]')?.getAttribute('desc')
      ).to.equal('newDesc');
    });

    it('changes type attribute on primary action', async () => {
      parent.wizardUI.inputs[2].value = 'newType';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('Line[name="Berlin"]')?.getAttribute('type')
      ).to.equal('newType');
    });

    it('changes nomFreq attribute on primary action', async () => {
      parent.wizardUI.inputs[3].value = '50';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('Line[name="Berlin"]')?.getAttribute('nomFreq')
      ).to.equal('50');
    });

    it('changes numPhases attribute on primary action', async () => {
      parent.wizardUI.inputs[4].value = '3';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc.querySelector('Line[name="Berlin"]')?.getAttribute('numPhases')
      ).to.equal('3');
    });
    describe('has a delete icon button that', () => {
      let deleteButton: HTMLElement;

      beforeEach(async () => {
        deleteButton = <HTMLElement>(
          element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
        );
        await parent.updateComplete;
      });

      it('removes the Line element from the document', async () => {
        expect(doc.querySelector('Line[name="Berlin"]')).to.exist;
        await deleteButton.click();
        expect(doc.querySelector('Line[name="Berlin"]')).to.not.exist;
      });
    });
  });
  describe('Open add wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: LineEditor | null;

    beforeEach(async () => {
      doc = await fetch('/test/testfiles/editors/substation/Line.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><line-editor
              .element=${doc.querySelector('Line[name="Berlin"]')}
            ></line-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('line-editor');

      await parent.updateComplete;
    });

    it('Should open the same wizard for the second time', async () => {
      await openAndCancelMenu(parent, element!);
      await openAndCancelMenu(parent, element!);
    });
  });
});
