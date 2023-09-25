import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { createFCDAsWizard } from '../../../src/wizards/fcda.js';
import { isCreate } from '../../../src/foundation.js';
import { FinderList } from '../../../src/finder-list.js';

describe('create wizard for FCDA element', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let finder: FinderList;
  let primaryAction: HTMLElement;
  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('/test/testfiles/wizards/fcda.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('with a valid SCL file', () => {
    beforeEach(async () => {
      const wizard = createFCDAsWizard(doc.querySelector('DataSet')!);
      element.workflow.push(() => wizard!);
      await element.requestUpdate();
      finder =
        element.wizardUI.dialog!.querySelector<FinderList>('finder-list')!;
      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('looks like the last snapshot', async () => {
      await expect(element.wizardUI.dialog).to.equalSnapshot();
    });

    it('indicates error in case children cannot be determined', async () => {
      finder.paths = [['some wrong path']];
      await element.requestUpdate();
      await finder.loaded;
      expect(
        element.wizardUI.dialog
          ?.querySelector('finder-list')
          ?.shadowRoot?.querySelector('p')?.innerText
      ).to.equal('[error]');
    });

    describe('with a specific path', () => {
      const path = [
        'Server: IED1>P1',
        'LDevice: IED1>>CircuitBreaker_CB1',
        'LN0: IED1>>CircuitBreaker_CB1',
        'DO: #Dummy.LLN0>Beh',
        'DA: #Dummy.LLN0.Beh>stVal',
      ];

      beforeEach(async () => {
        finder.paths = [path];
        await element.requestUpdate();
        await primaryAction.click();
      });

      it('returns a non empty create action on primary action click', () => {
        expect(actionEvent).to.have.been.called;
        expect(actionEvent.args[0][0].detail.action).to.satisfy(isCreate);
      });

      it('returns a create action that follows the definition of a FCDA', () => {
        const newElement = <Element>(
          actionEvent.args[0][0].detail.action.new.element
        );
        expect(newElement).to.have.attribute('ldInst', 'CircuitBreaker_CB1');
        expect(newElement).to.have.attribute('prefix', '');
        expect(newElement).to.have.attribute('lnClass', 'LLN0');
        expect(newElement).to.not.have.attribute('lnInst');
        expect(newElement).to.have.attribute('doName', 'Beh');
        expect(newElement).to.have.attribute('daName', 'stVal');
        expect(newElement).to.have.attribute('fc', 'ST');
      });
    });

    describe('with a more complex path including SDOs and BDAs', () => {
      const path = [
        'Server: IED1>P1',
        'LDevice: IED1>>Meas',
        'LN: IED1>>Meas>My MMXU 1',
        'DO: #Dummy.MMXU>A',
        'SDO: #OpenSCD_WYE_phases>phsA',
        'DA: #OpenSCD_CMV_db_i_MagAndAng>cVal',
        'BDA: #OpenSCD_Vector_I_w_Ang>mag',
        'BDA: #OpenSCD_AnalogueValue_INT32>i',
      ];

      beforeEach(async () => {
        finder.paths = [path];
        await element.requestUpdate();
        await primaryAction.click();
      });

      it('returns a non empty create action on primary action click', () => {
        expect(actionEvent).to.have.been.called;
        expect(actionEvent.args[0][0].detail.action).to.satisfy(isCreate);
      });

      it('returns a create action that follows the definition of a FCDA', () => {
        const newElement = <Element>(
          actionEvent.args[0][0].detail.action.new.element
        );
        expect(newElement).to.have.attribute('ldInst', 'Meas');
        expect(newElement).to.have.attribute('prefix', 'My');
        expect(newElement).to.have.attribute('lnClass', 'MMXU');
        expect(newElement).to.have.attribute('lnInst', '1');
        expect(newElement).to.have.attribute('doName', 'A.phsA');
        expect(newElement).to.have.attribute('daName', 'cVal.mag.i');
        expect(newElement).to.have.attribute('fc', 'MX');
      });
    });

    describe('with path being non leaf node', () => {
      const path = [
        'Server: IED1>P1',
        'LDevice: IED1>>Meas',
        'LN: IED1>>Meas>My MMXU 1',
        'DO: #Dummy.MMXU>A',
        'SDO: #OpenSCD_WYE_phases>phsA',
        'DA: #OpenSCD_CMV_db_i_MagAndAng>cVal',
        'BDA: #OpenSCD_Vector_I_w_Ang>mag',
      ];

      beforeEach(async () => {
        finder.paths = [path];
        await element.requestUpdate();
        await primaryAction.click();
      });

      it('returns a non empty create action on primary action click', () =>
        expect(actionEvent).to.not.have.been.called);
    });

    describe('with a incorrect logical node definition in the path', () => {
      const path = [
        'Server: IED1>P1',
        'LDevice: IED1>>Meas',
        'Ln: IED1>>Meas>My MMXU 1',
        'DO: #Dummy.LLN0>Beh',
        'DA: #Dummy.LLN0.Beh>stVal',
      ];

      beforeEach(async () => {
        finder.paths = [path];
        await element.requestUpdate();
        await primaryAction.click();
      });

      it('does not return a empty action on primary action click', () =>
        expect(actionEvent).to.not.have.been.called);
    });

    describe('with a incorrect logical node identity in the path', () => {
      const path = [
        'Server: IED1>P1',
        'LDevice: IED1>>CircuitBreaker_CB1',
        'LN0: some wrong identity',
        'DO: #Dummy.LLN0>Beh',
        'DA: #Dummy.LLN0.Beh>stVal',
      ];

      beforeEach(async () => {
        finder.paths = [path];
        await element.requestUpdate();
        await primaryAction.click();
      });

      it('does not return a empty action on primary action click', () =>
        expect(actionEvent).to.not.have.been.called);
    });

    describe('with a incorrect DO definition in the path', () => {
      const path = [
        'Server: IED1>P1',
        'LDevice: IED1>>CircuitBreaker_CB1',
        'LN0: IED1>>CircuitBreaker_CB1',
        'DO: some wrong identity',
        'DA: #Dummy.LLN0.Beh>stVal',
      ];

      beforeEach(async () => {
        finder.paths = [path];
        await element.requestUpdate();
        await primaryAction.click();
      });

      it('does not return a empty action on primary action click', () =>
        expect(actionEvent).to.not.have.been.called);
    });

    describe('with a missing fc definition in the DA in the SCL file', () => {
      const path = [
        'Server: IED1>P1',
        'LDevice: IED1>>CircuitBreaker_CB1',
        'LN: IED1>>CircuitBreaker_CB1> XCBR 1',
        'DO: #Dummy.XCBR1>Pos',
        'DA: #Dummy.XCBR1.Pos>stVal',
      ];

      beforeEach(async () => {
        finder.paths = [path];
        await element.requestUpdate();
        await primaryAction.click();
      });

      it('does not return a empty action on primary action click', () =>
        expect(actionEvent).to.not.have.been.called);
    });
  });
});
