import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';
import fc from 'fast-check';

import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards.js';

import {
  identity,
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';
import {
  ComplexAction,
  Replace,
  isSimple
} from '@openscd/core/foundation/deprecated/editor.js';
import { lNodeTypeWizard } from '../../../../src/editors/templates/lnodetype-wizard.js';
import { regExp, regexString } from '../../../foundation.js';

describe('wizards for LNodeType element', () => {
  let doc: XMLDocument;
  let element: OscdWizards;
  let inputs: WizardInputElement[];
  let input: WizardInputElement | undefined;

  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(
      html`<oscd-wizards .host=${document}></oscd-wizards>`
    );

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
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
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      inputs = Array.from(element.wizardUI.inputs);

      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
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

    describe('allows to edit id attribute', () => {
      beforeEach(() => {
        input = inputs.find(input => input.label === 'id');
      });

      it('as wizard input', () => expect(input).to.exist);

      it('triggers a complex action', () => {
        input!.value = 'someTestId';
        primaryAction.click();
        expect(actionEvent).to.be.calledOnce;

        const action = actionEvent.args[0][0].detail.action;
        expect(action).to.not.satisfy(isSimple);
      });

      it('that edits the id attribute of LNodeType', () => {
        input!.value = 'someTestId';
        primaryAction.click();

        const complexAction = <ComplexAction>(
          actionEvent.args[0][0].detail.action
        );
        const actions = <Replace[]>complexAction.actions;
        expect(actions[0].new.element).to.have.attribute('id', 'someTestId');
      });

      it('that edits all referenced lnType attribute as well', () => {
        const oldId = input?.value;
        const numReferences = doc.querySelectorAll(
          `LN0[lnType="${oldId}"], LN[lnType="${oldId}"]`
        ).length;

        input!.value = 'someTestId';
        primaryAction.click();

        const complexAction = <ComplexAction>(
          actionEvent.args[0][0].detail.action
        );
        const actions = <Replace[]>complexAction.actions;
        expect(actions).to.have.lengthOf(numReferences + 1);
        actions.shift(); //the first updates the LNodeType itself and has no 'id'
        for (const action of actions)
          expect(action.new.element).to.have.attribute('lnType', 'someTestId');
      });
    });
  });
});
