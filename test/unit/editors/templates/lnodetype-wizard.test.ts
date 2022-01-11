import { expect, fixture, html } from '@open-wc/testing';
import fc from 'fast-check';

import '../../../mock-wizard.js';
import { MockWizard } from '../../../mock-wizard.js';

import { identity, WizardInput } from '../../../../src/foundation.js';
import { lNodeTypeWizard } from '../../../../src/editors/templates/lnodetype-wizard.js';
import { regExp, regexString } from '../../../foundation.js';

describe('wizards for LNodeType element', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let inputs: WizardInput[];
  let input: WizardInput | undefined;

  beforeEach(async () => {
    element = <MockWizard>await fixture(html`<mock-wizard></mock-wizard>`);
  });
  describe('include an edit wizard that', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2003.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      const wizard = lNodeTypeWizard(
        <string>identity(doc.querySelector('LNodeType')),
        doc
      )!;
      element.workflow.push(wizard);
      await element.requestUpdate();

      inputs = Array.from(element.wizardUI.inputs);
    });
    describe('allows to edit lnClass attribute', () => {
      beforeEach(() => {
        input = inputs.find(input => input.label === 'lnClass');
      });

      it('as wizard input', () => expect(input).to.exist);

      it('for valid input', async () =>
        await fc.assert(
          fc.asyncProperty(
            regexString(regExp.lnClass, 4, 4),
            async testValue => {
              input!.value = testValue;
              await element.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            }
          )
        ));

      it('takes the exception LLN0 into account', async () => {
        input!.value = 'LLN0';
        await element.requestUpdate();
        expect(input!.checkValidity()).to.be.true;
      });
    });
  });
});
