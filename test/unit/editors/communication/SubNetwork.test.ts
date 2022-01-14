import { fixture, html, expect } from '@open-wc/testing';

import '../../../../src/wizard-textfield.js';
import { WizardInput, isCreate } from '../../../../src/foundation.js';
import { createSubNetworkAction } from '../../../../src/wizards/subnetwork.js';

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
        const wizardAction = createSubNetworkAction(parent);
        expect(wizardAction(inputs, newWizard())[0]).to.satisfy(isCreate);
      });
    });
  });
});
