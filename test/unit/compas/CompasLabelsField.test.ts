import { expect, fixture, html } from '@open-wc/testing';

import { Button } from '@material/mwc-button';

import { WizardTextField } from '../../../src/wizard-textfield.js';

import '../../../src/compas/CompasLabelsField.js';

import { CompasLabelsFieldElement } from '../../../src/compas/CompasLabelsField.js';

describe('compas-labels-field', () => {
  let element: CompasLabelsFieldElement;
  let doc: Document;
  let privateElement: Element;

  describe('with no labels in private section', () => {
    beforeEach(async () => {
      doc = await fetch(
        '/test/testfiles/compas/compas-scl-private-missing-compas-elements.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      privateElement = doc.querySelector('SCL > Private[type="compas_scl"]')!;

      element = await fixture(
        html`<compas-labels-field
          .privateElement="${privateElement}"
        ></compas-labels-field>`
      );

      await element.updateComplete;
    });

    it('when adding a label then label element created', async () => {
      await addLabel(element, 'Label 1');

      const labelElements = Array.from(
        element.newLabelsElement.querySelectorAll('Label')
      );
      expect(labelElements.length).to.be.equal(1);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('with labels in private section', () => {
    beforeEach(async () => {
      doc = await fetch(
        '/test/testfiles/compas/compas-scl-private-update-existing.scd'
      )
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      privateElement = doc.querySelector('SCL > Private[type="compas_scl"]')!;

      element = await fixture(
        html`<compas-labels-field
          .privateElement="${privateElement}"
        ></compas-labels-field>`
      );

      await element.updateComplete;
    });

    it('when adding a label then label element created', async () => {
      await addLabel(element, 'Label 2');

      const labelElements = Array.from(
        element.newLabelsElement.querySelectorAll('Label')
      );
      expect(labelElements.length).to.be.equal(2);
    });

    it('when removing a label then label element removed', async () => {
      await removeLabel(element, 'Label 1');

      const labelElements = Array.from(
        element.newLabelsElement.querySelectorAll('Label')
      );
      expect(labelElements.length).to.be.equal(0);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});

export async function addLabel(
  element: CompasLabelsFieldElement,
  value: string
): Promise<void> {
  const newLabelField = <WizardTextField>(
    element.shadowRoot!.querySelector('wizard-textfield#newLabel')!
  );
  newLabelField.value = value;
  await element.updateComplete;

  const addButton = <Button>(
    element.shadowRoot!.querySelector('mwc-icon-button[icon="new_label"]')!
  );
  await addButton.click();
  await element.updateComplete;
}

export async function removeLabel(
  element: CompasLabelsFieldElement,
  value: string
): Promise<void> {
  const removeButton = <Button>Array.from(
    element.shadowRoot!.querySelectorAll('mwc-list > mwc-list-item')
  )
    .filter(
      item =>
        !!Array.from(item.querySelectorAll('span')).find(element =>
          element.textContent!.includes(value)
        )
    )
    .map(item => item.querySelector('mwc-icon-button[icon="delete"]'))[0];

  removeButton.click();
  await element.updateComplete;
}
