import { expect, fixture, html } from '@open-wc/testing';

import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '../../../../src/editors/substation/transformer-winding-editor.js';
import { TransformerWindingEditor } from '../../../../src/editors/substation/transformer-winding-editor.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';
import { WizardCheckbox } from '../../../../src/wizard-checkbox.js';
import { MenuBase } from '@material/mwc-menu/mwc-menu-base.js';

const openAndCancelMenu: (
  parent: MockWizardEditor,
  element: TransformerWindingEditor
) => Promise<void> = (
  parent: MockWizardEditor,
  element: TransformerWindingEditor
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

describe('transformer-winding-editor wizarding editing integration', () => {
  let doc: XMLDocument;
  let parent: MockWizardEditor;
  let element: TransformerWindingEditor | null;

  describe('edit wizard', () => {
    let nameField: WizardTextField;
    let descField: WizardTextField;
    let primaryAction: HTMLElement;
    let secondaryAction: HTMLElement;

    beforeEach(async () => {
      doc = await fetch(
        'test/testfiles/editors/substation/TransformerWinding.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><transformer-winding-editor
              .element=${doc.querySelector(
                'PowerTransformer[name="pTransVolt"] > TransformerWinding[name="some"]'
              )}
            ></transformer-winding-editor
          ></mock-wizard-editor>`
        )
      );
      element = parent.querySelector('transformer-winding-editor');
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
      nameField.value = 'some1';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector(
            'PowerTransformer[name="pTransVolt"] > TransformerWinding[name="some"]'
          )
          ?.getAttribute('name')
      ).to.equal(oldName);
    });
    it('changes desc attribute on primary action', async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      descField.nullSwitch!.click();
      await parent.updateComplete;
      descField.value = 'newDesc';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector(
            'PowerTransformer[name="pTransVolt"] > TransformerWinding[name="some"]'
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
      virtualCheckbox.maybeValue = 'true';
      primaryAction.click();
      await parent.updateComplete;
      expect(
        doc
          .querySelector(
            'PowerTransformer[name="pTransVolt"] > TransformerWinding[name="some"]'
          )
          ?.getAttribute('virtual')
      ).to.equal('true');
    });

    describe('has a delete icon button that', () => {
      let deleteButton: HTMLElement;

      beforeEach(async () => {
        deleteButton = <HTMLElement>(
          element?.shadowRoot?.querySelector('mwc-icon-button[icon="delete"]')
        );
        await parent.updateComplete;
      });

      it('removes the attached TransformerWinding element from the document', async () => {
        expect(
          doc.querySelector(
            'PowerTransformer[name="pTransVolt"] > TransformerWinding[name="some"]'
          )
        ).to.exist;

        await deleteButton.click();

        expect(
          doc.querySelector(
            'PowerTransformer[name="pTransVolt"] > TransformerWinding[name="some"]'
          )
        ).to.not.exist;
      });
    });
  });

  describe('Open add wizard', () => {
    let doc: XMLDocument;
    let parent: MockWizardEditor;
    let element: TransformerWindingEditor | null;

    beforeEach(async () => {
      doc = await fetch(
        '/test/testfiles/editors/substation/TransformerWinding.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      parent = <MockWizardEditor>(
        await fixture(
          html`<mock-wizard-editor
            ><transformer-winding-editor
              .element=${doc.querySelector(
                'PowerTransformer[name="pTransVolt"] > TransformerWinding[name="some"]'
              )}
            ></transformer-winding-editor
          ></mock-wizard-editor>`
        )
      );

      element = parent.querySelector('transformer-winding-editor');

      await parent.updateComplete;
    });

    it('Should open the same wizard for the second time', async () => {
      await openAndCancelMenu(parent, element!);
      await openAndCancelMenu(parent, element!);
    });
  });
});
