import { fixture, html, expect } from '@open-wc/testing';

import {
  WizardInputElement,
  isCreate,
  isReplace,
  WizardActor,
  ComplexAction,
  isSimple
} from '../../../src/foundation.js';

import '../../../src/wizard-textfield.js';
import { createAction } from '../../../src/wizards/bay.js';
import { replaceNamingAttributeWithReferencesAction } from '../../../src/wizards/foundation/actions.js';

describe('BayEditor', () => {
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

  function getAndValidComplexAction(wizardActor: WizardActor): ComplexAction {
    const editorActions = wizardActor(inputs, newWizard());
    expect(editorActions.length).to.equal(1);
    expect(editorActions[0]).to.not.satisfy(isSimple);
    return <ComplexAction>editorActions[0];
  }

  describe('createAction', () => {
    let parent: Element;
    beforeEach(() => {
      parent = new DOMParser().parseFromString(
        '<Voltage Level></Voltage Level>',
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
        '<Bay></Bay>',
        'application/xml'
      ).documentElement;
    });

    it('returns a WizardAction which retruns one EditorAction', () => {
      const wizardAction = replaceNamingAttributeWithReferencesAction(element, 'bay.action.updateBay');
      const complexAction = getAndValidComplexAction(wizardAction);
      expect(complexAction.actions.length).to.equal(1);
    });

    it('returns a WizardAction which returns an Update EditorAction', () => {
      const wizardAction = replaceNamingAttributeWithReferencesAction(element, 'bay.action.updateBay');
      const complexAction = getAndValidComplexAction(wizardAction);
      expect(complexAction.actions[0]).to.satisfy(isReplace);
    });

    describe('with no change in element Bay', () => {
      let element: Element;
      beforeEach(() => {
        element = new DOMParser().parseFromString(
          `<Bay name="" desc="">
              </Bay>`,
          'application/xml'
        ).documentElement;
      });

      it('returns a WizardAction which returns empty EditorAction array', () => {
        const wizardAction = replaceNamingAttributeWithReferencesAction(element, 'bay.action.updateBay');
        expect(wizardAction(inputs, newWizard()).length).to.equal(0);
      });
    });
  });
});
