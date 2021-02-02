import { fixture, html, expect } from '@open-wc/testing';
import {
  WizardInput,
  isCreate,
  isUpdate,
  isDelete,
} from '../../../../src/foundation.js';
import { VoltageLevelEditor } from '../../../../src/editors/substation/voltage-level-editor.js';

describe('VoltageLevelEditor', () => {
  describe('with no nulled properties', () => {
    const noOp = () => {
      return;
    };
    const newWizard = (done = noOp) => {
      const element = document.createElement('mwc-dialog');
      element.close = done;
      return element;
    };

    let inputs: WizardInput[];
    beforeEach(async () => {
      inputs = await Promise.all(
        ['name', 'desc', 'nomFreq', 'numPhases', 'Voltage'].map(
          label =>
            <Promise<WizardInput>>(
              fixture(
                html`<wizard-textfield label=${label}></wizard-textfield>`
              )
            )
        )
      );
    });

    describe('has a createAction that', () => {
      let parent: Element;
      beforeEach(() => {
        parent = new DOMParser().parseFromString(
          '<Substation></Substation>',
          'application/xml'
        ).documentElement;
      });

      it('returns a WizardAction which returns a Create EditorAction', () => {
        const wizardAction = VoltageLevelEditor.createAction(parent);
        expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      });

      it('closes the wizard before returning', done => {
        const wizardAction = VoltageLevelEditor.createAction(parent);
        wizardAction(inputs, newWizard(done));
      });
    });

    describe('has an updateAction that', () => {
      let element: Element;
      beforeEach(() => {
        element = new DOMParser().parseFromString(
          '<VoltageLevel></VoltageLevel>',
          'application/xml'
        ).documentElement;
      });

      it('closes the wizard before returning', done => {
        const wizardAction = VoltageLevelEditor.createAction(element);
        wizardAction(inputs, newWizard(done));
      });

      describe('with missing child element Voltage', () => {
        let element: Element;
        beforeEach(() => {
          element = new DOMParser().parseFromString(
            '<VoltageLevel></VoltageLevel>',
            'application/xml'
          ).documentElement;
        });

        it('returns a WizardAction which retruns two EditorActions', () => {
          const wizardAction = VoltageLevelEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard()).length).to.equal(2);
        });

        it('returns a WizardAction with the first returned EditorAction beeing an Update', () => {
          const wizardAction = VoltageLevelEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isUpdate);
        });

        it('returns a WizardAction with the second returned EditorAction beeing a Create', () => {
          const wizardAction = VoltageLevelEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard())[1]).to.satisfy(isCreate);
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
          const wizardAction = VoltageLevelEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard()).length).to.equal(2);
        });

        it('returns a WizardAction with the first returned EditorAction beeing an Update', () => {
          const wizardAction = VoltageLevelEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isUpdate);
        });

        it('returns a WizardAction with the second returned EditorAction beeing a Update', () => {
          const wizardAction = VoltageLevelEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard())[1]).to.satisfy(isUpdate);
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
          const wizardAction = VoltageLevelEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard()).length).to.equal(1);
        });

        it('returns a WizardAction with the first returned EditorAction beeing an Update', () => {
          const wizardAction = VoltageLevelEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isUpdate);
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
          const wizardAction = VoltageLevelEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard()).length).to.equal(0);
        });
      });
    });
  });

  describe('with nulled properties', () => {
    const noOp = () => {
      return;
    };
    const newWizard = (done = noOp) => {
      const element = document.createElement('mwc-dialog');
      element.close = done;
      return element;
    };

    let inputs: WizardInput[];
    beforeEach(async () => {
      inputs = await Promise.all(
        ['name', 'desc', 'nomFreq', 'numPhases', 'Voltage'].map(
          label =>
            <Promise<WizardInput>>(
              fixture(
                html`<wizard-textfield label=${label}></wizard-textfield>`
              )
            )
        )
      );
    });

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
          const wizardAction = VoltageLevelEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard()).length).to.equal(2);
        });

        it('returns a WizardAction with the first returned EditorAction beeing an Update', () => {
          const wizardAction = VoltageLevelEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isUpdate);
        });

        it('returns a WizardAction with the second returned EditorAction beeing a Delete', () => {
          const wizardAction = VoltageLevelEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard())[1]).to.satisfy(isDelete);
        });
      });
    });
  });
});
