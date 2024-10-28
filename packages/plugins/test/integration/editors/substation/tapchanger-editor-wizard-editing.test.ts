import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-wizard-editor.js';
import { MockWizardEditor } from '@openscd/open-scd/test/mock-wizard-editor.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '../../../../src/editors/substation/tapchanger-editor.js';
import { TapChangerEditor } from '../../../../src/editors/substation/tapchanger-editor.js';
import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import { WizardCheckbox } from '@openscd/open-scd/src/wizard-checkbox.js';
import { MenuBase } from '@material/mwc-menu/mwc-menu-base.js';

const openAndCancelMenu: (
  parent: MockWizardEditor,
  element: TapChangerEditor
) => Promise<void> = (
  parent: MockWizardEditor,
  element: TapChangerEditor
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

    describe('has a delete icon button that', () => {
      let deleteButton: HTMLElement;

      beforeEach(async () => {
        deleteButton = <HTMLElement>(
          element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
        );
        await parent.updateComplete;
      });

      it('removes the attached TapChanger element from the document', async () => {
        expect(
          doc.querySelector(
            'TransformerWinding[name="withTapChanger1"] > TapChanger[name="tapChComplet"]'
          )
        ).to.exist;

        await deleteButton.click();

        expect(
          doc.querySelector(
            'TransformerWinding[name="withTapChanger1"] > TapChanger[name="tapChComplet"]'
          )
        ).to.not.exist;
      });
    });
  });
  describe('Open add wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: TapChangerEditor | null;

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

      await parent.updateComplete;
    });

    it('Should open the same wizard for the second time', async () => {
      await openAndCancelMenu(parent, element!);
      await openAndCancelMenu(parent, element!);
    });
  });
});
