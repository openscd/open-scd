import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/wizard-textfield.js';
import { EnumValEditor } from '../../../../src/editors/templates/enum-val-editor.js';
import { isCreate, isUpdate, WizardInput } from '../../../../src/foundation.js';

describe('EnumValEditor', () => {
  let inputs: WizardInput[];
  beforeEach(async () => {
    inputs = await Promise.all(
      ['value', 'desc', 'ord'].map(
        label =>
          <Promise<WizardInput>>(
            fixture(
              html`<wizard-textfield
                nullable
                .maybeValue=${null}
                label=${label}
              ></wizard-textfield>`
            )
          )
      )
    );
  });

  describe('createAction', () => {
    let parent: Element;
    beforeEach(() => {
      parent = new DOMParser().parseFromString(
        `<EnumType id="test">
          <EnumVal ord="41" desc="for testing ord"></EnumVal>
        </EnumType>`,
        'application/xml'
      ).documentElement;
    });

    it('returns a WizardAction generating a single EditorAction', () =>
      expect(
        EnumValEditor.createAction(parent)(inputs, parent)
      ).to.have.lengthOf(1));

    it('returns a WizardAction creating an EnumVal', () =>
      expect(EnumValEditor.createAction(parent)(inputs, parent)[0]).to.satisfy(
        isCreate
      ));

    it('sets ord one higher than highest sibling ord by default', () =>
      expect(EnumValEditor.createAction(parent)(inputs, parent)[0])
        .property('new')
        .property('element')
        .to.have.attribute('ord', '42'));
  });

  describe('updateAction', () => {
    let element: Element;
    beforeEach(() => {
      const parent = new DOMParser().parseFromString(
        `<EnumType id="test">
          <EnumVal ord="42" desc="testDesc">testValue</EnumVal>
          <EnumVal ord="41" desc="for testing ord"></EnumVal>
        </EnumType>`,
        'application/xml'
      ).documentElement;
      element = parent.firstElementChild!;
    });

    it('returns a WizardAction generating a single EditorAction', () =>
      expect(
        EnumValEditor.updateAction(element)(inputs, element)
      ).to.have.lengthOf(1));

    it('returns a WizardAction updating an EnumVal', () =>
      expect(
        EnumValEditor.updateAction(element)(inputs, element)[0]
      ).to.satisfy(isUpdate));

    it('no-ops if no changes have been made', () => {
      element.removeAttribute('desc');
      element.textContent = ''; // same as null according to DOM spec
      expect(EnumValEditor.updateAction(element)(inputs, element)).to.be.empty;
    });
  });
});
