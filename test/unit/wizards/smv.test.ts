import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';
import fc, { hexaString, integer } from 'fast-check';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import {
  ComplexAction,
  Create,
  Delete,
  WizardInput,
} from '../../../src/foundation.js';
import { editSMvWizard } from '../../../src/wizards/smv.js';
import { invertedRegex, MAC, regExp } from '../../foundation.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';

describe('Wizards for SCL element SMV', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let inputs: WizardInput[];
  let input: WizardInput | undefined;

  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = <MockWizard>await fixture(html`<mock-wizard></mock-wizard>`);

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('include an edit wizard that', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/wizards/sampledvaluecontrol.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      const wizard = editSMvWizard(doc.querySelector('SMV')!);
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );

      inputs = Array.from(element.wizardUI.inputs);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });

    describe('contains an input to edit P element of type MAC-Address', () => {
      beforeEach(() => {
        input = inputs.find(input => input.label === 'MAC-Address');
      });

      it('is always rendered', () => expect(input).to.exist);

      it('allow to edit for valid input', async () =>
        await fc.assert(
          fc.asyncProperty(MAC(), async testValue => {
            input!.value = testValue.toUpperCase();
            await element.requestUpdate();
            expect(input!.checkValidity()).to.be.true;
          })
        ));

      it('does not allow to edit for invalid input', async () =>
        await fc.assert(
          fc.asyncProperty(invertedRegex(regExp.MAC), async testValue => {
            input!.value = testValue;
            await element.requestUpdate();
            expect(input!.checkValidity()).to.be.false;
          })
        ));
    });

    describe('contains an input to edit P element of type APPID', () => {
      beforeEach(() => {
        input = inputs.find(input => input.label === 'APPID');
      });

      it('is always rendered', () => expect(input).to.exist);

      it('allow to edit for valid input', async () =>
        await fc.assert(
          fc.asyncProperty(
            hexaString({ minLength: 4, maxLength: 4 }),
            async testValue => {
              input!.value = testValue.toUpperCase();
              await element.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            }
          )
        ));

      it('does not allow to edit for invalid input', async () =>
        await fc.assert(
          fc.asyncProperty(hexaString({ minLength: 5 }), async testValue => {
            input!.value = testValue.toUpperCase();
            await element.requestUpdate();
            expect(input!.checkValidity()).to.be.false;
          })
        ));

      it('does not allow to edit characters < 4', async () =>
        await fc.assert(
          fc.asyncProperty(
            hexaString({ minLength: 0, maxLength: 3 }),
            async testValue => {
              input!.value = testValue.toUpperCase();
              await element.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            }
          )
        ));
    });

    describe('contains an input to edit P element of type VLAN-ID', () => {
      beforeEach(() => {
        input = inputs.find(input => input.label === 'VLAN-ID');
      });

      it('is always rendered', () => expect(input).to.exist);

      it('allow to edit for valid input', async () =>
        await fc.assert(
          fc.asyncProperty(
            hexaString({ minLength: 3, maxLength: 3 }),
            async testValue => {
              input!.value = testValue.toUpperCase();
              await element.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            }
          )
        ));

      it('does not allow to edit for invalid input', async () =>
        await fc.assert(
          fc.asyncProperty(hexaString({ minLength: 4 }), async testValue => {
            input!.value = testValue.toUpperCase();
            await element.requestUpdate();
            expect(input!.checkValidity()).to.be.false;
          })
        ));

      it('does not allow to edit characters < 3', async () =>
        await fc.assert(
          fc.asyncProperty(
            hexaString({ minLength: 0, maxLength: 2 }),
            async testValue => {
              input!.value = testValue.toUpperCase();
              await element.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            }
          )
        ));
    });

    describe('contains an input to edit P element of type VLAN-PRIORITY', () => {
      beforeEach(() => {
        input = inputs.find(input => input.label === 'VLAN-PRIORITY');
      });

      it('is always rendered', () => expect(input).to.exist);

      it('allow to edit for valid input', async () =>
        await fc.assert(
          fc.asyncProperty(
            integer({ min: 0, max: 7 }).map(num => `${num}`),
            async testValue => {
              input!.value = testValue;
              await element.requestUpdate();
              expect(input!.checkValidity()).to.be.true;
            }
          )
        ));

      it('does not allow to edit for invalid input', async () =>
        await fc.assert(
          fc.asyncProperty(
            integer({ min: 8 }).map(num => `${num}`),
            async testValue => {
              input!.value = testValue;
              await element.requestUpdate();
              expect(input!.checkValidity()).to.be.false;
            }
          )
        ));
    });

    it('does not update SMV element when no P element has changed', async () => {
      primaryAction.click();
      await element.requestUpdate();
      expect(actionEvent.notCalled).to.be.true;
    });

    it('properly updates a P element of type MAC-Address', async () => {
      input = <WizardTextField>(
        inputs.find(input => input.label === 'MAC-Address')
      );
      input.value = '01-0C-CD-01-01-00';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      const complexAction = <ComplexAction>actionEvent.args[0][0].detail.action;

      const oldAddress = (<Delete>complexAction.actions[0]).old.element;
      const newAddress = (<Create>complexAction.actions[1]).new.element;

      expect(
        oldAddress.querySelector<Element>('P[type="MAC-Address"]')?.textContent
      ).to.equal('01-0C-CD-04-00-20');
      expect(
        newAddress.querySelector<Element>('P[type="MAC-Address"]')?.textContent
      ).to.equal('01-0C-CD-01-01-00');
    });

    it('properly updates a P element of type APPID', async () => {
      input = <WizardTextField>inputs.find(input => input.label === 'APPID');
      input.value = '001A';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      const complexAction = <ComplexAction>actionEvent.args[0][0].detail.action;

      const oldAddress = (<Delete>complexAction.actions[0]).old.element;
      const newAddress = (<Create>complexAction.actions[1]).new.element;

      expect(
        oldAddress.querySelector<Element>('P[type="APPID"]')?.textContent
      ).to.equal('4002');
      expect(
        newAddress.querySelector<Element>('P[type="APPID"]')?.textContent
      ).to.equal('001A');
    });

    it('properly updates a P element of type VLAN-ID', async () => {
      input = <WizardTextField>inputs.find(input => input.label === 'VLAN-ID');
      input.value = '07D';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      const complexAction = <ComplexAction>actionEvent.args[0][0].detail.action;

      const oldAddress = (<Delete>complexAction.actions[0]).old.element;
      const newAddress = (<Create>complexAction.actions[1]).new.element;

      expect(
        oldAddress.querySelector<Element>('P[type="VLAN-ID"]')?.textContent
      ).to.equal('007');
      expect(
        newAddress.querySelector<Element>('P[type="VLAN-ID"]')?.textContent
      ).to.equal('07D');
    });

    it('properly updates a P element of type VLAN-PRIORITY', async () => {
      input = <WizardTextField>(
        inputs.find(input => input.label === 'VLAN-PRIORITY')
      );
      input.value = '3';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      const complexAction = <ComplexAction>actionEvent.args[0][0].detail.action;

      const oldAddress = (<Delete>complexAction.actions[0]).old.element;
      const newAddress = (<Create>complexAction.actions[1]).new.element;

      expect(
        oldAddress.querySelector<Element>('P[type="VLAN-PRIORITY"]')
          ?.textContent
      ).to.equal('4');
      expect(
        newAddress.querySelector<Element>('P[type="VLAN-PRIORITY"]')
          ?.textContent
      ).to.equal('3');
    });
  });
});
