import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

import { createFCDAsWizard } from '../../../src/wizards/fcda.js';
import { FinderList } from '../../../src/finder-list.js';

describe('FCDA editing wizarding integration', () => {
  let doc: XMLDocument;
  let element: MockWizardEditor;
  let finder: FinderList;
  let primaryAction: HTMLElement;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
    doc = await fetch('/test/testfiles/wizards/fcda.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    const wizard = createFCDAsWizard(doc.querySelector('DataSet')!);
    element.workflow.push(() => wizard!);
    await element.requestUpdate();

    finder = element.wizardUI.dialog!.querySelector<FinderList>('finder-list')!;
    primaryAction = <HTMLElement>(
      element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]')
    );
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
    });

    it('adds a new FCDA on primary action', async () => {
      expect(
        doc.querySelector(
          'DataSet > FCDA[ldInst="CircuitBreaker_CB1"]' +
            '[prefix=""][lnClass="LLN0"]:not(lnInst)[doName="Beh"][daName="stVal"][fc="ST"]'
        )
      ).to.not.exist;
      await primaryAction.click();
      expect(
        doc.querySelector(
          'DataSet > FCDA[ldInst="CircuitBreaker_CB1"]' +
            '[prefix=""][lnClass="LLN0"]:not(lnInst)[doName="Beh"][daName="stVal"][fc="ST"]'
        )
      ).to.exist;
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
    });

    it('adds a new FCDA on primary action', async () => {
      expect(
        doc.querySelector(
          'DataSet > FCDA[ldInst="Meas"]' +
            '[prefix="My"][lnClass="MMXU"][lnInst="1"]' +
            '[doName="A.phsA"][daName="cVal.mag.i"][fc="MX"]'
        )
      ).to.not.exist;
      await primaryAction.click();
      expect(
        doc.querySelector(
          'DataSet > FCDA[ldInst="Meas"]' +
            '[prefix="My"][lnClass="MMXU"][lnInst="1"]' +
            '[doName="A.phsA"][daName="cVal.mag.i"][fc="MX"]'
        )
      ).to.exist;
    });
  });
});
