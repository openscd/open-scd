import { fixture, html, expect } from '@open-wc/testing';
import {
  WizardInput,
  isCreate,
  isUpdate,
  isDelete,
} from '../../../src/foundation.js';
import { SubNetworkEditor } from '../../../src/editors/communication/subnetwork-editor.js';

describe('SubNetworkEditor', () => {
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
        ['name', 'desc', 'type', 'BitRate'].map(
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
          '<Communication></Communication>',
          'application/xml'
        ).documentElement;
      });

      it('returns a WizardAction which returns a Create EditorAction', () => {
        const wizardAction = SubNetworkEditor.createAction(parent);
        expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      });

      it('closes the wizard before returning', done => {
        const wizardAction = SubNetworkEditor.createAction(parent);
        wizardAction(inputs, newWizard(done));
      });
    });

    describe('has an updateAction that', () => {
      let element: Element;
      beforeEach(() => {
        element = new DOMParser().parseFromString(
          '<SubNetwork></SubNetwork>',
          'application/xml'
        ).documentElement;
      });

      it('closes the wizard before returning', done => {
        const wizardAction = SubNetworkEditor.createAction(element);
        wizardAction(inputs, newWizard(done));
      });

      describe('with missing child element BitRate', () => {
        let element: Element;
        beforeEach(() => {
          element = new DOMParser().parseFromString(
            '<SubNetwork></SubNetwork>',
            'application/xml'
          ).documentElement;
        });

        it('returns a WizardAction which retruns two EditorActions', () => {
          const wizardAction = SubNetworkEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard()).length).to.equal(2);
        });

        it('returns a WizardAction with the first returned EditorAction beeing an Update', () => {
          const wizardAction = SubNetworkEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isUpdate);
        });

        it('returns a WizardAction with the second returned EditorAction beeing a Create', () => {
          const wizardAction = SubNetworkEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard())[1]).to.satisfy(isCreate);
        });
      });

      describe('with present child element BitRate', () => {
        let element: Element;
        beforeEach(() => {
          element = new DOMParser().parseFromString(
            `<SubNetwork>
              <BitRate unit="b/s" multiplier="M">100</BitRate>
              </BitRate>`,
            'application/xml'
          ).documentElement;
        });

        it('returns a WizardAction which returns two EditorActions', () => {
          const wizardAction = SubNetworkEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard()).length).to.equal(2);
        });

        it('returns a WizardAction with the first returned EditorAction beeing an Update', () => {
          const wizardAction = SubNetworkEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isUpdate);
        });

        it('returns a WizardAction with the second returned EditorAction beeing a Update', () => {
          const wizardAction = SubNetworkEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard())[1]).to.satisfy(isUpdate);
        });
      });

      describe('with no change in element SubNetwork but changes in the child element BitRate', () => {
        let element: Element;
        beforeEach(() => {
          element = new DOMParser().parseFromString(
            `<SubNetwork name="" desc="" type="">
              <BitRate unit="b/s" multiplier="M">100</BitRate>
              </SubNetwork>`,
            'application/xml'
          ).documentElement;
        });

        it('returns a WizardAction which returns one EditorActions', () => {
          const wizardAction = SubNetworkEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard()).length).to.equal(1);
        });

        it('returns a WizardAction with the first returned EditorAction beeing an Update', () => {
          const wizardAction = SubNetworkEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isUpdate);
        });
      });

      describe('with no change in SubNetwork nor BitRate', () => {
        let element: Element;
        beforeEach(() => {
          element = new DOMParser().parseFromString(
            '<SubNetwork name="" desc="" type=""><BitRate unit="b/s"></BitRate></SubNetwork>',
            'application/xml'
          ).documentElement;
        });

        it('returns a WizardAction with an empty EditorActions array', () => {
          const wizardAction = SubNetworkEditor.updateAction(element);
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
        ['name', 'desc', 'type', 'BitRate'].map(
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
            `<SubNetwork>
              <BitRate unit="b/s" multiplier="M">100</BitRate>
              </SubNetwork>`,
            'application/xml'
          ).documentElement;

          inputs[3] = await fixture(html`<wizard-textfield
            label="BitRate"
            nullable="true"
            .maybeValue="${null}"
            unit="b/s"
            .multipliers=${[null, 'M']}
            .multiplier="M"
          ></wizard-textfield>`);
        });

        it('returns a WizardAction which returns two EditorActions', () => {
          const wizardAction = SubNetworkEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard()).length).to.equal(2);
        });

        it('returns a WizardAction with the first returned EditorAction beeing an Update', () => {
          const wizardAction = SubNetworkEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isUpdate);
        });

        it('returns a WizardAction with the second returned EditorAction beeing a Delete', () => {
          const wizardAction = SubNetworkEditor.updateAction(element);
          expect(wizardAction(inputs, newWizard())[1]).to.satisfy(isDelete);
        });
      });
    });
  });
});
