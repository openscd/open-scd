import { expect } from '@open-wc/testing';

import {
  ComplexAction,
  isSimple
} from '@openscd/core/foundation/deprecated/editor.js';
import {
  WizardActor,
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';

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
