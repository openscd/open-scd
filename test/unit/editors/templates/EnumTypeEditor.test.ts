import { html, fixture, expect } from '@open-wc/testing';

import '../../../../src/wizard-textfield.js';
import { EnumTypeEditor } from '../../../../src/editors/templates/enum-type-editor.js';
import {
  Create,
  isCreate,
  isUpdate,
  WizardInput,
} from '../../../../src/foundation.js';

import { templates } from '../../../data.js';
import { updateIDNamingAction } from '../../../../src/editors/templates/foundation.js';
import { WizardTextField } from '../../../../src/wizard-textfield.js';
describe('EnumTypeEditor', () => {
  let inputs: WizardInput[];
  beforeEach(async () => {
    inputs = await Promise.all(
      ['id', 'desc'].map(
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
    beforeEach(async () => {
      parent = new DOMParser().parseFromString(
        `<DataTypeTemplates></DataTypeTemplates>`,
        'application/xml'
      ).documentElement;
      (<WizardTextField>inputs[0]).maybeValue = 'testID';
      (<WizardTextField>inputs[1]).maybeValue = 'testDesc';
      inputs.push(
        await fixture(
          html`<mwc-select label="values"
            ><mwc-list-item selected value="BehaviourModeKind"
              >BehaviourModeKind</mwc-list-item
            ></mwc-select
          >`
        )
      );
    });

    it('generates no EditorActions given an empty id', () => {
      inputs[0].value = '';
      expect(
        EnumTypeEditor.createAction(parent, templates)(inputs, parent)
      ).to.have.lengthOf(0);
    });

    it('returns a WizardAction generating a single EditorAction', () =>
      expect(
        EnumTypeEditor.createAction(parent, templates)(inputs, parent)
      ).to.have.lengthOf(1));

    it('returns a WizardAction creating an EnumType', () =>
      expect(
        EnumTypeEditor.createAction(parent, templates)(inputs, parent)[0]
      ).to.satisfy(isCreate));

    it('sets the chosen id and desc on the new element', () => {
      const create = <Create>(
        EnumTypeEditor.createAction(parent, templates)(inputs, parent)[0]
      );
      expect(create)
        .property('new')
        .property('element')
        .to.have.attribute('id', 'testID');
      expect(create)
        .property('new')
        .property('element')
        .to.have.attribute('desc', 'testDesc');
    });

    it('appends EnumVal children from the chosen template', () =>
      expect(EnumTypeEditor.createAction(parent, templates)(inputs, parent)[0])
        .property('new')
        .property('element')
        .property('children')
        .to.have.lengthOf(5));
  });

  describe('updateIDNamingAction', () => {
    let element: Element;
    beforeEach(() => {
      const parent = new DOMParser().parseFromString(
        `<EnumType id="test">
          <EnumType ord="42" desc="testDesc">testValue</EnumType>
          <EnumType ord="41" desc="for testing ord"></EnumType>
        </EnumType>`,
        'application/xml'
      ).documentElement;
      element = parent.firstElementChild!;
    });

    it('returns a WizardAction generating a single EditorAction', () =>
      expect(updateIDNamingAction(element)(inputs, element)).to.have.lengthOf(
        1
      ));

    it('returns a WizardAction updating an EnumType', () =>
      expect(updateIDNamingAction(element)(inputs, element)[0]).to.satisfy(
        isUpdate
      ));

    it('no-ops if no changes have been made', () => {
      element.removeAttribute('desc');
      element.textContent = ''; // same as null according to DOM spec
      expect(updateIDNamingAction(element)(inputs, element)).to.be.empty;
    });
  });
});
