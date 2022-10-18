import { expect, fixture, html } from '@open-wc/testing';

import '../../../src/compas/CompasLabelsField.js';

import { CompasLabelsFieldElement } from '../../../src/compas/CompasLabelsField.js';

import { addLabel, removeLabel } from './test-support.js';

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
      await addLabel(element, 'Label1');

      const labelElements = Array.from(
        element.newLabelsElement.querySelectorAll('Label')
      );
      expect(labelElements.length).to.be.equal(1);
    });

    it('when calling updateLabelsInPrivateElement then Private Element is updated', async () => {
      expect(privateElement.querySelectorAll('Label').length).to.be.equal(0);

      await addLabel(element, 'Label1');
      element.updateLabelsInPrivateElement(privateElement);

      expect(privateElement.querySelectorAll('Label').length).to.be.equal(1);
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
      await addLabel(element, 'Label2');

      const labelElements = Array.from(
        element.newLabelsElement.querySelectorAll('Label')
      );
      expect(labelElements.length).to.be.equal(2);
    });

    it('when calling updateLabelsInPrivateElement then Private Element is updated', async () => {
      expect(privateElement.querySelectorAll('Label').length).to.be.equal(1);

      await addLabel(element, 'Label2');
      element.updateLabelsInPrivateElement(privateElement);

      expect(privateElement.querySelectorAll('Label').length).to.be.equal(2);
    });

    it('when removing a label then label element removed', async () => {
      await removeLabel(element, 'Label1');

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
