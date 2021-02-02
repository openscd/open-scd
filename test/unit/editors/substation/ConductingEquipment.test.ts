import { fixture, html, expect } from '@open-wc/testing';
import { WizardInput, isCreate, isUpdate } from '../../../../src/foundation.js';
import { ConductingEquipmentEditor } from '../../../../src/editors/substation/conducting-equipment-editor.js';
import { updateNamingAction } from '../../../../src/editors/substation/foundation.js';
describe('ConductingEquipmentEditor', () => {
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
      ['name', 'desc', 'type'].map(
        label =>
          <Promise<WizardInput>>(
            fixture(html`<wizard-textfield label=${label}></wizard-textfield>`)
          )
      )
    );
    inputs[2] = await fixture(
      html`<mwc-select value="CBR" label="type">"Circuit Breaker"</mwc-select>`
    );
  });

  describe('createAction', () => {
    let parent: Element;
    beforeEach(() => {
      parent = new DOMParser().parseFromString('<Bay></Bay>', 'application/xml')
        .documentElement;
    });

    it('returns a WizardAction which returns a Create EditorAction', () => {
      const wizardAction = ConductingEquipmentEditor.createAction(parent);
      expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isCreate);
    });

    it('closes the wizard before returning', done => {
      const wizardAction = ConductingEquipmentEditor.createAction(parent);
      wizardAction(inputs, newWizard(done));
    });
  });

  describe('updateAction', () => {
    let element: Element;
    beforeEach(() => {
      element = new DOMParser().parseFromString(
        '<ConductingEquipment></ConductingEquipment>',
        'application/xml'
      ).documentElement;
    });

    it('closes the wizard before returning', done => {
      const wizardAction = ConductingEquipmentEditor.createAction(element);
      wizardAction(inputs, newWizard(done));
    });

    it('returns a WizardAction which retruns one EditorActions', () => {
      const wizardAction = updateNamingAction(element);
      expect(wizardAction(inputs, newWizard()).length).to.equal(1);
    });

    it('returns a WizardAction with returned EditorAction beeing an Update', () => {
      const wizardAction = updateNamingAction(element);
      expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isUpdate);
    });

    describe('with no change in ConductingEquipement', () => {
      let element: Element;
      beforeEach(() => {
        element = new DOMParser().parseFromString(
          '<ConductingEqipment name="" desc="" ></ConductingEqipment>',
          'application/xml'
        ).documentElement;
      });

      it('returns a WizardAction with an empty EditorActions array', () => {
        const wizardAction = updateNamingAction(element);
        expect(wizardAction(inputs, newWizard()).length).to.equal(0);
      });
    });
  });
});
