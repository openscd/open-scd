import { expect, fixture, html } from '@open-wc/testing';
import fc from 'fast-check';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  Create,
  isCreate,
  Replace,
  WizardInputElement,
} from '../../../src/foundation.js';
import { regExp, regexString } from '../../foundation.js';
import { editLNodeWizard, lNodeWizard } from '../../../src/wizards/lnode.js';

describe('Wizards for LNode element', () => {
  let element: MockWizardEditor;
  let doc: Document;

  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;
  let logEvent: SinonSpy;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/lnodewizard.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    element = <MockWizardEditor>(
      await fixture(html`<mock-wizard-editor></mock-wizard-editor>`)
    );

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
    logEvent = spy();
    window.addEventListener('log', logEvent);
  });

  describe('contain a LNode instantiate wizard that', () => {
    describe('with existing LLN0 and LPHD instances', () => {
      beforeEach(async () => {
        const wizard = lNodeWizard(
          doc.querySelector('Function[name="parentFunction"]')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () =>
        await expect(element.wizardUI.dialog).to.equalSnapshot());

      describe('has a primary action that', () => {
        let primaryAction: HTMLElement;
        let listItems: ListItemBase[];

        beforeEach(async () => {
          const wizard = lNodeWizard(
            doc.querySelector('SubFunction[name="disconnector"]')!
          );
          element.workflow.push(() => wizard);
          await element.requestUpdate();

          primaryAction = <HTMLElement>(
            element.wizardUI.dialog?.querySelector(
              'mwc-button[slot="primaryAction"]'
            )
          );

          listItems = Array.from(
            element.wizardUI!.dialog!.querySelectorAll<ListItemBase>(
              'mwc-check-list-item'
            )
          );
        });

        it('triggers error log massage when duplicate LLN0 classes are added', async () => {
          listItems[0].selected = true;

          primaryAction.click();

          expect(logEvent).to.have.be.calledOnce;
          expect(logEvent.args[0][0].detail.message).to.contain(
            'lnode.log.uniqueln0'
          );
        });

        it('triggers error log massage when duplicate LPHD classes are added', async () => {
          listItems[1].selected = true;

          primaryAction.click();

          expect(logEvent).to.have.be.calledOnce;
          expect(logEvent.args[0][0].detail.message).to.contain(
            'lnode.log.uniqueln0'
          );
        });

        it('trigger error log message when not unique lnInst can be find', async () => {
          const parent = doc.querySelector('SubFunction[name="disconnector"]')!
            .parentElement!;
          for (let i = 1; i <= 99; i++) {
            const element = <Element>(
              doc.createElementNS(doc.documentElement.namespaceURI, 'LNode')
            );

            element.setAttribute('lnClass', 'CILO');
            element.setAttribute('lnInst', `${i}`);
            parent.appendChild(element);
          }

          listItems[4].selected = true;

          primaryAction.click();

          expect(logEvent).to.have.be.calledOnce;
          expect(logEvent.args[0][0].detail.message).to.contain(
            'lnode.log.nonuniquelninst'
          );
        });
      });
    });

    describe('with existing LLN0 but missing LPHD instances', () => {
      beforeEach(async () => {
        const wizard = lNodeWizard(
          doc.querySelector('SubFunction[name="circuitBreaker"]')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () =>
        await expect(element.wizardUI.dialog).to.equalSnapshot());
    });

    describe('with missing LLN0 and LPHD instances', () => {
      beforeEach(async () => {
        const wizard = lNodeWizard(
          doc.querySelector('SubFunction[name="disconnector"]')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () =>
        await expect(element.wizardUI.dialog).to.equalSnapshot());
    });

    describe('has a primary action that', () => {
      let primaryAction: HTMLElement;
      let listItems: ListItemBase[];

      beforeEach(async () => {
        const wizard = lNodeWizard(
          doc.querySelector('SubFunction[name="disconnector"]')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();

        primaryAction = <HTMLElement>(
          element.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );

        listItems = Array.from(
          element.wizardUI!.dialog!.querySelectorAll<ListItemBase>(
            'mwc-check-list-item'
          )
        );
      });

      it('triggers Create action for all selected LNodeType', async () => {
        listItems[1].selected = true;
        listItems[2].selected = true;
        listItems[3].selected = true;

        await primaryAction.click();

        expect(actionEvent).to.have.be.calledThrice;
        expect(actionEvent.args[0][0].detail.action).to.satisfy(isCreate);
        expect(actionEvent.args[1][0].detail.action).to.satisfy(isCreate);
        expect(actionEvent.args[2][0].detail.action).to.satisfy(isCreate);
      });

      it('does set iedName, lnCalss, lnInst and lnType', async () => {
        listItems[2].selected = true;

        await primaryAction.click();

        expect(actionEvent).to.have.be.calledOnce;
        const action = <Create>actionEvent.args[0][0].detail.action;
        expect(action.new.element).to.have.attribute('iedName', 'None');
        expect(action.new.element).to.have.attribute('lnClass', 'XCBR');
        expect(action.new.element).to.have.attribute('lnInst', '1');
        expect(action.new.element).to.have.attribute('lnType', 'Dummy.XCBR1');
      });

      it('does not set ldInst and prefix', async () => {
        listItems[4].selected = true;

        await primaryAction.click();

        expect(actionEvent).to.have.be.calledOnce;
        const action = <Create>actionEvent.args[0][0].detail.action;
        expect(action.new.element).to.not.have.attribute('ldInst');
        expect(action.new.element).to.not.have.attribute('prefix');
      });

      it('makes sure that lnInst is unique in case lnClass is existing already', async () => {
        listItems[4].selected = true;

        await primaryAction.click();

        expect(actionEvent).to.have.be.calledOnce;
        const action = <Create>actionEvent.args[0][0].detail.action;
        expect(action.new.element).to.have.attribute('lnInst', '2');
      });

      it('makes sure that lnInst is unique if several LNodeType with same lnClass are selected', async () => {
        listItems[3].selected = true;
        listItems[5].selected = true;

        await primaryAction.click();

        expect(actionEvent).to.have.be.calledTwice;
        const action1 = <Create>actionEvent.args[0][0].detail.action;
        const action2 = <Create>actionEvent.args[1][0].detail.action;
        expect(action1.new.element).to.have.attribute('lnInst', '2');
        expect(action2.new.element).to.have.attribute('lnInst', '4');
      });

      it('does add empty string to LNode with lnClass LLN0', async () => {
        listItems[0].selected = true;

        await primaryAction.click();

        expect(actionEvent).to.have.be.calledOnce;
        const action = <Create>actionEvent.args[0][0].detail.action;
        expect(action.new.element).to.have.attribute('lnInst', '');
      });
    });
  });

  describe('contain a LNode reference create wizard that', () => {
    describe('with references to existing logical nodes', () => {
      beforeEach(async () => {
        const wizard = lNodeWizard(
          doc.querySelector('ConductingEquipment[name="QB1"]')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () =>
        await expect(element.wizardUI.dialog).to.equalSnapshot());
    });

    describe('with missing references to existing logical nodes', () => {
      beforeEach(async () => {
        const wizard = lNodeWizard(doc.querySelector('Substation')!);
        element.workflow.push(() => wizard);
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () =>
        await expect(element.wizardUI.dialog).to.equalSnapshot());
    });
  });

  describe('contain a edit wizard that', () => {
    let inputs: WizardInputElement[];

    describe('for a type reference', () => {
      beforeEach(async () => {
        const wizard = editLNodeWizard(
          doc.querySelector('SubFunction[name="disconnector"] > LNode')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();

        inputs = Array.from(element.wizardUI.inputs);

        primaryAction = <HTMLElement>(
          element.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );

        await element.updateComplete;
      });

      it('looks like the latest snapshot', async () =>
        await expect(element.wizardUI.dialog).to.equalSnapshot());

      it('edits prefix attribute only for valid inputs', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.tAsciName, 1, 11), async name => {
            inputs[2].value = name;
            await (<WizardTextField>inputs[2]).requestUpdate();
            expect(inputs[2].checkValidity()).to.be.true;
          })
        );
      });

      it('rejects name attribute starting with decimals', async () => {
        await fc.assert(
          fc.asyncProperty(regexString(regExp.decimal, 1, 1), async name => {
            inputs[2].value = name;
            await (<WizardTextField>inputs[2]).requestUpdate();
            expect(inputs[2].checkValidity()).to.be.false;
          })
        );
      });

      it('rejects negative integrers for lnInst attribute', async () => {
        inputs[4].value = '-1';
        await (<WizardTextField>inputs[4]).requestUpdate();
        expect(inputs[4].checkValidity()).to.be.false;
      });

      it('rejects 0 for lnInst attribute', async () => {
        inputs[4].value = '0';
        await (<WizardTextField>inputs[4]).requestUpdate();
        expect(inputs[4].checkValidity()).to.be.false;
      });

      it('rejects positve integrers bigger 100 for lnInst attribute', async () => {
        inputs[4].value = '100';
        await (<WizardTextField>inputs[4]).requestUpdate();
        expect(inputs[4].checkValidity()).to.be.false;
      });

      it('rejects non unique lnInst attribute', async () => {
        inputs[4].value = '3';
        await (<WizardTextField>inputs[4]).requestUpdate();
        expect(inputs[4].checkValidity()).to.be.false;
      });

      it('does not update the LNode element when no attribute has changed', async () => {
        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent.notCalled).to.be.true;
      });

      it('update a LNode element on prefix attribute changed', async () => {
        const input = <WizardTextField>inputs[2];

        input.nullSwitch?.click();
        input.value = 'somepref';

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = <Replace>actionEvent.args[0][0].detail.action;

        expect(action.old.element).to.not.have.attribute('prefix');
        expect(action.new.element).to.have.attribute('prefix', 'somepref');
      });

      it('update a ReportControl element when only desc attribute changed', async () => {
        const input = <WizardTextField>inputs[4];
        input.value = '34';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.be.calledOnce;

        const action = <Replace>actionEvent.args[0][0].detail.action;

        expect(action.old.element).to.have.attribute('lnInst', '1');
        expect(action.new.element).to.have.attribute('lnInst', '34');
      });
    });

    describe('for a IED reference', () => {
      beforeEach(async () => {
        const wizard = editLNodeWizard(
          doc.querySelector('Bay[name="COUPLING_BAY"] > LNode')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();
      });

      it('looks like the latest snapshot', async () =>
        await expect(element.wizardUI.dialog).to.equalSnapshot());
    });
  });
});
