import { fixture, html, expect } from '@open-wc/testing';

import '../../../src/wizard-textfield.js';
import {
  WizardInputElement,
  isCreate,
  isReplace,
  isDelete,
  isSimple,
  ComplexAction,
  WizardActor,
} from '../../../src/foundation.js';
import {
  createAction,
  updateAction,
} from '../../../src/wizards/voltagelevel.js';

describe('VoltageLevelEditor', () => {
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
      ['name', 'desc', 'nomFreq', 'numPhases', 'Voltage'].map(
        label =>
          <Promise<WizardInputElement>>(
            fixture(
              html`<wizard-textfield label=${label}></wizard-textfield>`
            )
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

  describe('with no nulled properties', () => {
    describe('has a createAction that', () => {
      let parent: Element;
      beforeEach(() => {
        parent = new DOMParser().parseFromString(
          '<Substation></Substation>',
          'application/xml'
        ).documentElement;
      });

      it('returns a WizardAction which returns a Create EditorAction', () => {
        const wizardAction = createAction(parent);
        expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      });
    });

    describe('has an updateAction that', () => {
      describe('with missing child element Voltage', () => {
        let element: Element;
        beforeEach(() => {
          element = new DOMParser().parseFromString(
            '<VoltageLevel></VoltageLevel>',
            'application/xml'
          ).documentElement;
        });

        it('returns a WizardAction which returns two EditorActions', () => {
          const wizardAction = updateAction(element);
          const complexAction = getAndValidComplexAction(wizardAction);
          expect(complexAction.actions.length).to.equal(2);
        });

        it('returns a WizardAction with the first returned EditorAction being an Update', () => {
          const wizardAction = updateAction(element);
          const complexAction = getAndValidComplexAction(wizardAction);
          expect(complexAction.actions[0]).to.satisfy(isReplace);
        });

        it('returns a WizardAction with the second returned EditorAction being a Create', () => {
          const wizardAction = updateAction(element);
          const complexAction = getAndValidComplexAction(wizardAction);
          expect(complexAction.actions[1]).to.satisfy(isCreate);
        });
      });

      describe('with present child element Voltage', () => {
        let element: Element;
        beforeEach(() => {
          element = new DOMParser().parseFromString(
            `<VoltageLevel>
              <Voltage unit="V" multiplier="k">110</Voltage>
              </VoltageLevel>`,
            'application/xml'
          ).documentElement;
        });

        it('returns a WizardAction which returns two EditorActions', () => {
          const wizardAction = updateAction(element);
          const complexAction = getAndValidComplexAction(wizardAction);
          expect(complexAction.actions.length).to.equal(2);
        });

        it('returns a WizardAction with the first returned EditorAction being an Update', () => {
          const wizardAction = updateAction(element);
          const complexAction = getAndValidComplexAction(wizardAction);
          expect(complexAction.actions[0]).to.satisfy(isReplace);
        });

        it('returns a WizardAction with the second returned EditorAction being a Update', () => {
          const wizardAction = updateAction(element);
          const complexAction = getAndValidComplexAction(wizardAction);
          expect(complexAction.actions[1]).to.satisfy(isReplace);
        });
      });

      describe('with no change in element VoltageLevel but changes in the child element Voltage', () => {
        let element: Element;
        beforeEach(() => {
          element = new DOMParser().parseFromString(
            `<VoltageLevel name="" desc="" nomFreq="" numPhases="">
              <Voltage unit="V" multiplier="k">110</Voltage>
              </VoltageLevel>`,
            'application/xml'
          ).documentElement;
        });

        it('returns a WizardAction which returns one EditorActions', () => {
          const wizardAction = updateAction(element);
          const complexAction = getAndValidComplexAction(wizardAction);
          expect(complexAction.actions.length).to.equal(1);
        });

        it('returns a WizardAction with the first returned EditorAction beeing an Update', () => {
          const wizardAction = updateAction(element);
          const complexAction = getAndValidComplexAction(wizardAction);
          expect(complexAction.actions[0]).to.satisfy(isReplace);
        });
      });

      describe('with no change in VoltageLevel nor Voltage', () => {
        let element: Element;
        beforeEach(() => {
          element = new DOMParser().parseFromString(
            '<VoltageLevel name="" desc="" nomFreq="" numPhases=""><Voltage unit="V"></Voltage></VoltageLevel>',
            'application/xml'
          ).documentElement;
        });

        it('returns a WizardAction with an empty EditorActions array', () => {
          const wizardAction = updateAction(element);
          expect(wizardAction(inputs, newWizard()).length).to.equal(0);
        });
      });
    });
  });

  describe('with nulled properties', () => {

    describe('has an updateAction that', () => {
      describe('with present child element Voltage', () => {
        let element: Element;
        beforeEach(async () => {
          element = new DOMParser().parseFromString(
            `<VoltageLevel>
              <Voltage unit="V" multiplier="k">110</Voltage>
              </VoltageLevel>`,
            'application/xml'
          ).documentElement;

          inputs[4] = await fixture(html`<wizard-textfield
            label="Voltage"
            nullable
            .maybeValue="${null}"
            unit="V"
            .multipliers=${[null, 'G', 'M', 'k', '', 'm']}
            multiplier="k"
          ></wizard-textfield>`);
        });

        it('returns a WizardAction which returns two EditorActions', () => {
          const wizardAction = updateAction(element);
          const complexAction = getAndValidComplexAction(wizardAction);
          expect(complexAction.actions.length).to.equal(2);
        });

        it('returns a WizardAction with the first returned EditorAction beeing an Update', () => {
          const wizardAction = updateAction(element);
          const complexAction = getAndValidComplexAction(wizardAction);
          expect(complexAction.actions[0]).to.satisfy(isReplace);
        });

        it('returns a WizardAction with the second returned EditorAction beeing a Delete', () => {
          const wizardAction = updateAction(element);
          const complexAction = getAndValidComplexAction(wizardAction);
          expect(complexAction.actions[1]).to.satisfy(isDelete);
        });
      });
    });
  });
});
