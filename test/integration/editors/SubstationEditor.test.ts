import { html, fixture, expect } from '@open-wc/testing';

/*
 * FIXME(c-dinkel): work on substation editor structure in progress
import SubstationEditor from '../../../src/editors/SubstationEditor.js';
import { isCreate, isUpdate } from '../../../src/foundation.js';
import { Editing } from '../../../src/Editing.js';
import { Wizarding } from '../../../src/Wizarding.js';

import { getDocument } from '../../data.js';

describe('SubstationEditor', () => {
  customElements.define(
    'substation-editor',
    Wizarding(Editing(SubstationEditor))
  );
  let element: SubstationEditor;
  beforeEach(async () => {
    element = await fixture(html`<substation-editor></substation-editor>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons&display=block"
        rel="stylesheet"
      /> `);
  });

  describe('without a substation element loaded', () => {
    it('has a null element property', () =>
      expect(element).to.have.property('element', null));
    it('has empty name property', () => {
      expect(element).to.have.property('name', '');
    });
    it('has null desc property', () => {
      expect(element).to.have.property('desc', null);
    });

    it('does not generate newUpdateAction', () =>
      expect(() =>
        element.newUpdateAction('test name', 'test desc')
      ).to.throw());

    it('generates a valid newCreateAction', () =>
      expect(element.newCreateAction('test name', 'test desc')).to.satisfy(
        isCreate
      ));
  });

  describe('with a substation element loaded', () => {
    beforeEach(async () => {
      element.doc = getDocument();
      await element.updateComplete;
    });

    it('has a non null element property if substation exists', () =>
      expect(element).property('element').to.not.be.null);

    it('takes its name attribute from the substation section', () => {
      expect(element).to.have.property('name', 'AA1');
    });

    it('takes its desc attribute from the substation section', () => {
      expect(element).to.have.property('desc', 'Substation');
    });

    it('does not generate newCreateAction if a substation already exists', () =>
      expect(() =>
        element.newCreateAction('test name', 'test desc')
      ).to.throw());

    it('generates a valid newUpdateAction if a substation exists', () =>
      expect(element.newUpdateAction('test name', 'test desc')).to.satisfy(
        isUpdate
      ));
  });
});
*/
