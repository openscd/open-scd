import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { Checkbox } from '@material/mwc-checkbox';

import '../../../src/editors/communication/connectedap-editor.js';
import { ConnectedAPEditor } from '../../../src/editors/communication/connectedap-editor.js';
import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  ComplexAction,
  Delete,
  isCreate,
  isDelete,
  isSimple,
  Create,
  WizardInput,
} from '../../../src/foundation.js';

describe('Wizards for SCL element ConnectedAP', () => {
  let doc: XMLDocument;
  let parent: MockWizard;
  let element: ConnectedAPEditor;
  let inputs: WizardInput[];
  let input: WizardInput | undefined;
  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    parent = <MockWizard>(
      await fixture(
        html`<mock-wizard
          ><connectedap-editor></connectedap-editor
        ></mock-wizard>`
      )
    );

    element = parent.querySelector<ConnectedAPEditor>('connectedap-editor')!;

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('include an edit wizard that', () => {
    describe('independent of the edition', () => {
      beforeEach(async () => {
        doc = await fetch('/test/testfiles/valid2003.scd')
          .then(response => response.text())
          .then(str => new DOMParser().parseFromString(str, 'application/xml'));

        element.element = doc.querySelector('ConnectedAP')!;
        await element.requestUpdate();

        (<HTMLElement>(
          element?.shadowRoot?.querySelector('mwc-fab[icon="edit"]')
        )).click();
        await parent.requestUpdate();

        inputs = Array.from(parent.wizardUI.inputs);

        primaryAction = <HTMLElement>(
          parent.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );
      });

      it('does not edit any P element with unchanged wizard inputs', async () => {
        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.not.have.been.called;
      });

      it('triggers a complex editor action to update P elements(s)', async () => {
        input = <WizardTextField>inputs.find(input => input.label === 'IP');
        input.value = '192.168.210.158';
        await input.requestUpdate();

        primaryAction.click();
        await parent.requestUpdate();

        expect(actionEvent).to.be.calledOnce;
        expect(actionEvent.args[0][0].detail.action).to.not.satisfy(isSimple);
      });

      it('triggers a complex action as combination of delete and create with prior existing Address field', async () => {
        input = <WizardTextField>inputs.find(input => input.label === 'IP');
        input.value = '192.168.210.158';
        await input.requestUpdate();

        primaryAction.click();
        await parent.requestUpdate();

        const complexAction = <ComplexAction>(
          actionEvent.args[0][0].detail.action
        );
        expect(complexAction.actions).to.have.lengthOf(2);
        expect(complexAction.actions[0]).to.satisfy(isDelete);
        expect(complexAction.actions[1]).to.satisfy(isCreate);
      });

      it('triggers a complex action being a pure create with prior missing Address field', async () => {
        doc
          .querySelector<Element>('ConnectedAP')
          ?.removeChild(doc.querySelector<Element>('ConnectedAP > Address')!);

        input = <WizardTextField>inputs.find(input => input.label === 'IP');
        input.value = '192.168.210.158';
        await input.requestUpdate();

        primaryAction.click();
        await parent.requestUpdate();

        const complexAction = <ComplexAction>(
          actionEvent.args[0][0].detail.action
        );
        expect(complexAction.actions).to.have.lengthOf(1);
        expect(complexAction.actions[0]).to.satisfy(isCreate);
      });

      it('properly updates a P element of type IP', async () => {
        input = <WizardTextField>inputs.find(input => input.label === 'IP');
        input.value = '192.168.210.158';
        await input.requestUpdate();

        primaryAction.click();
        await parent.requestUpdate();

        const complexAction = <ComplexAction>(
          actionEvent.args[0][0].detail.action
        );

        const oldAddress = (<Delete>complexAction.actions[0]).old.element;
        const newAddress = (<Create>complexAction.actions[1]).new.element;

        expect(
          oldAddress.querySelector<Element>('P[type="IP"]')?.textContent
        ).to.equal('192.168.210.111');
        expect(
          newAddress.querySelector<Element>('P[type="IP"]')?.textContent
        ).to.equal('192.168.210.158');
      });

      it('adds type restrictions with selected option type restriction', async () => {
        (<Checkbox>(
          parent.wizardUI.shadowRoot?.querySelector('#typeRestriction')
        )).checked = true;
        await parent.requestUpdate();

        primaryAction.click();
        await parent.requestUpdate();

        const complexAction = <ComplexAction>(
          actionEvent.args[0][0].detail.action
        );

        const oldAddress = (<Delete>complexAction.actions[0]).old.element;
        const newAddress = (<Create>complexAction.actions[1]).new.element;

        const oldIP = oldAddress.querySelector<Element>('P[type="IP"]');
        const newIP = newAddress.querySelector<Element>('P[type="IP"]');

        expect(
          oldIP?.getAttributeNS(
            'http://www.w3.org/2001/XMLSchema-instance',
            'type'
          )
        ).to.not.exist;
        expect(
          newIP?.getAttributeNS(
            'http://www.w3.org/2001/XMLSchema-instance',
            'type'
          )
        ).to.exist;
      });
    });
  });
});
