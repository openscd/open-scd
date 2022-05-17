import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  ComplexAction,
  isSimple,
  Replace,
  WizardInputElement,
} from '../../../src/foundation.js';

import {
  fetchDoc,
  newWizard,
  setWizardTextFieldValue,
} from './test-support.js';
import { editDAIWizard, updateValue } from '../../../src/wizards/dai.js';

describe('Wizards for SCL element DAI', () => {
  let doc: XMLDocument;
  let dai: Element;
  let da: Element;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  describe('edit existing DAI', () => {
    beforeEach(async () => {
      doc = await fetchDoc('/test/testfiles/wizards/ied.scd');
      dai = doc.querySelector('IED[name="IED1"] > AccessPoint[name="P1"] > Server > LDevice[inst="CircuitBreaker_CB1"] > LN[prefix="CB"][lnClass="CSWI"] > DOI[name="Beh"] > DAI[name="integer"]')!;
      da = doc.querySelector('DOType[cdc="ENS"][id="Dummy.LLN0.Beh"] > DA[name="integer"]')!;

      element = await fixture(html`<mock-wizard></mock-wizard>`);
      const wizard = editDAIWizard(da, dai);
      element.workflow.push(() => wizard);
      await element.requestUpdate();
      inputs = Array.from(element.wizardUI.inputs);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });

    it('update value should be updated in document', async function () {
      await setWizardTextFieldValue(<WizardTextField>inputs[0], '8');

      const complexAction = updateValue(dai)(inputs, newWizard());
      expect(complexAction.length).to.equal(1);
      expect(complexAction[0]).to.not.satisfy(isSimple);

      expect((<ComplexAction>complexAction[0]).title).to.eql('[dai.action.updatedai]');

      const actions = (<ComplexAction>complexAction[0]).actions;
      expect(actions.length).to.eql(1);

      const replace = (<Replace>actions[0]);
      expect(replace.old.element.textContent).to.eql('5');
      expect(replace.new.element.textContent).to.eql('8');
    });
  });
});
