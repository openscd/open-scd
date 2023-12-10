import { expect } from '@open-wc/testing';

import {
  ComplexAction,
  isSimple,
  WizardActor,
  WizardInputElement,
} from 'open-scd/src/foundation.js';

export function executeWizardComplexAction(
  wizardActor: WizardActor,
  wizard: Element,
  inputs: WizardInputElement[]
): ComplexAction {
  const complexActions = wizardActor(inputs, wizard);
  expect(complexActions.length).to.equal(1);
  expect(complexActions[0]).to.not.satisfy(isSimple);
  return <ComplexAction>complexActions[0];
}
