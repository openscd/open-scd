import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/wizard-textfield.js';
import {
  WizardInputElement,
  isCreate,
  isReplace,
} from '../../../../src/foundation.js';
import { updateNamingAction } from '../../../../src/wizards/foundation/actions.js';
import { createAction } from '../../../../src/wizards/substation.js';

describe('SubstationEditor', () => {
  const noOp = () => {
    return;
  };
  const newWizard = (done = noOp) => {
    const element = document.createElement('mwc-dialog');
    element.close = done;
    return element;
  };

  let inputs: WizardInputElement[];
  beforeEach(async () => {
    inputs = await Promise.all(
      ['name', 'desc'].map(
        label =>
          <Promise<WizardInputElement>>(
            fixture(html`<wizard-textfield label=${label}></wizard-textfield>`)
          )
      )
    );
  });

  describe('createAction', () => {
    let parent: Element;
    beforeEach(() => {
      parent = new DOMParser().parseFromString(
        '<SCL></SCL>',
        'application/xml'
      ).documentElement;
    });

    it('returns a WizardAction which returns a Create EditorAction', () => {
      const wizardAction = createAction(parent);
      expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isCreate);
    });
  });

  describe('updateAction', () => {
    let element: Element;
    beforeEach(() => {
      element = new DOMParser().parseFromString(
        '<Substation></Substation>',
        'application/xml'
      ).documentElement;
    });

    it('returns a WizardAction which retruns one EditorAction', () => {
      const wizardAction = updateNamingAction(element);
      expect(wizardAction(inputs, newWizard()).length).to.equal(1);
    });

    it('returns a WizardAction which returns an Update EditorAction', () => {
      const wizardAction = updateNamingAction(element);
      expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isReplace);
    });

    describe('with no change in element Substation', () => {
      let element: Element;
      beforeEach(() => {
        element = new DOMParser().parseFromString(
          `<Substation name="" desc="">
              </Substation>`,
          'application/xml'
        ).documentElement;
      });

      it('returns a WizardAction which returns empty EditorAction array', () => {
        const wizardAction = updateNamingAction(element);
        expect(wizardAction(inputs, newWizard()).length).to.equal(0);
      });
    });
  });
});