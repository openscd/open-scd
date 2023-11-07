import { expect, fixture, html } from '@open-wc/testing';

import '../../../mock-wizard.js';
import { MockWizard } from '../../../mock-wizard.js';
import '../../../mock-wizard-editor.js';
import { MockWizardEditor } from '../../../mock-wizard-editor.js';

import { guessVoltageLevel } from '../../../../src/editors/substation/guess-wizard.js';

describe('guess-wizard-integration', () => {
  let element: MockWizard;
  let validSCL: XMLDocument;
  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    const substation = validSCL.querySelector('Substation')!;
    substation.innerHTML = '';
    element = <MockWizard>await fixture(html`<mock-wizard></mock-wizard>`);

    const wizard = guessVoltageLevel(validSCL, substation);
    element.workflow.push(() => wizard);
    await element.requestUpdate();
  });

  describe('renders one wizard page', () => {
    it('asking which ctlModel the is used for switchgear', async () => {
      expect(element.wizardUI.dialogs.length).to.equal(1);
      expect(
        element.wizardUI.dialog!.querySelectorAll(
          '#ctlModelList > mwc-check-list-item'
        ).length
      ).to.equal(5);
    });

    it('the first one being status-only', async () => {
      expect(
        element.wizardUI.dialog!.querySelector(
          '#ctlModelList > mwc-check-list-item:nth-child(1)'
        )?.innerHTML
      ).to.equal('status-only');
    });

    it('the second one being direct-with-normal-security', async () => {
      expect(
        element.wizardUI.dialog!.querySelector(
          '#ctlModelList > mwc-check-list-item:nth-child(2)'
        )?.innerHTML
      ).to.equal('direct-with-normal-security');
    });

    it('the second one being direct-with-enhanced-security', async () => {
      expect(
        element.wizardUI.dialog!.querySelector(
          '#ctlModelList > mwc-check-list-item:nth-child(3)'
        )?.innerHTML
      ).to.equal('direct-with-enhanced-security');
    });

    it('the second one being sbo-with-normal-security', async () => {
      expect(
        element.wizardUI.dialog!.querySelector(
          '#ctlModelList > mwc-check-list-item:nth-child(4)'
        )?.innerHTML
      ).to.equal('sbo-with-normal-security');
    });

    it('the second one being sbo-with-enhanced-security', async () => {
      expect(
        element.wizardUI.dialog!.querySelector(
          '#ctlModelList > mwc-check-list-item:nth-child(5)'
        )?.innerHTML
      ).to.equal('sbo-with-enhanced-security');
    });
  });
});

describe('guess-wizarding-editing-integration', () => {
  let element: MockWizardEditor;
  let validSCL: XMLDocument;
  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    const substation = validSCL.querySelector('Substation')!;
    substation.innerHTML = '';
    element = <MockWizardEditor>(
      await fixture(html`<mock-wizard-editor></mock-wizard-editor>`)
    );

    const wizard = guessVoltageLevel(validSCL, substation);
    element.workflow.push(() => wizard);
    await element.requestUpdate();

    (<HTMLElement>(
      element.wizardUI.dialog!.querySelector(
        '#ctlModelList > mwc-check-list-item:nth-child(5)'
      )
    )).click();
    //FIXME: hack as default selected attribute does not work in Karma.
    await element.requestUpdate();
    (<HTMLElement>(
      element.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]')
    )).click();
    await element.requestUpdate();
  });

  it('creates only one voltage level with default name', () => {
    expect(
      validSCL.querySelectorAll(':root > Substation > VoltageLevel').length
    ).to.equal(1);
    expect(
      validSCL
        .querySelector(':root > Substation > VoltageLevel')
        ?.getAttribute('name')
    ).to.equal('E1');
    expect(
      validSCL
        .querySelector(':root > Substation > VoltageLevel')
        ?.getAttribute('desc')
    ).to.equal('guessed by OpenSCD');
  });

  it('creates as many bays as ieds with lnType CSWI and ctlModel sbo-with-enhanced-security', () => {
    expect(
      validSCL.querySelectorAll(':root > Substation > VoltageLevel > Bay')
        .length
    ).to.equal(1);
  });
  it('creates correct number of conducting equipments', () => {
    expect(
      validSCL.querySelectorAll(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment'
      ).length
    ).to.equal(4);
  });
  it('creates only unique conducting equipment names', () => {
    const nameArray: string[] = Array.from(
      validSCL.querySelectorAll(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment'
      )
    ).map(item => item.getAttribute('name')!);
    const nameSet = new Set(nameArray);
    expect(nameArray.length).to.equal(nameSet.size);
  });
  it('creates unique conducting equipment name, if no prefix is there', () => {
    expect(
      validSCL
        .querySelector(
          ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(1)'
        )
        ?.getAttribute('name')
    ).to.equal('QA1');
    expect(
      validSCL
        .querySelector(
          ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(4)'
        )
        ?.getAttribute('name')
    ).to.equal('QB1');
  });
  it('uses prefix for conducting equipment name, if prefix is available', () => {
    expect(
      validSCL
        .querySelector(
          ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(2)'
        )
        ?.getAttribute('name')
    ).to.equal('CB2');
    expect(
      validSCL
        .querySelector(
          ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(3)'
        )
        ?.getAttribute('name')
    ).to.equal('DC1');
  });
  it('automatically adds loginal nodes to the first conducting equipment', () => {
    expect(
      validSCL.querySelectorAll(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(1) > LNode'
      ).length
    ).to.equal(2);
    expect(
      validSCL.querySelector(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(1) > LNode[iedName="IED1"][ldInst="CircuitBreaker_CB1"][lnClass="XCBR"][lnInst="1"]'
      )
    ).to.exist;
    expect(
      validSCL.querySelector(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(1) > LNode[iedName="IED1"][ldInst="CircuitBreaker_CB1"][lnClass="CSWI"][lnInst="1"]'
      )
    ).to.exist;
  });
  it('automatically adds loginal nodes to the second conducting equipment', () => {
    expect(
      validSCL.querySelectorAll(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(2) > LNode'
      ).length
    ).to.equal(2);
    expect(
      validSCL.querySelector(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(2) > LNode[iedName="IED1"][ldInst="CircuitBreaker_CB1"][prefix="CB"][lnClass="XCBR"][lnInst="2"]'
      )
    ).to.exist;
    expect(
      validSCL.querySelector(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(2) > LNode[iedName="IED1"][ldInst="CircuitBreaker_CB1"][prefix="CB"][lnClass="CSWI"][lnInst="2"]'
      )
    ).to.exist;
  });
  it('automatically adds loginal nodes to the third conducting equipment', () => {
    expect(
      validSCL.querySelectorAll(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(3) > LNode'
      ).length
    ).to.equal(3);
    expect(
      validSCL.querySelector(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(3) > LNode[iedName="IED1"][ldInst="Disconnectors"][prefix="DC"][lnClass="XSWI"][lnInst="1"]'
      )
    ).to.exist;
    expect(
      validSCL.querySelector(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(3) > LNode[iedName="IED1"][ldInst="Disconnectors"][prefix="DC"][lnClass="CSWI"][lnInst="1"]'
      )
    ).to.exist;
    expect(
      validSCL.querySelector(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(3) > LNode[iedName="IED1"][ldInst="Disconnectors"][prefix="DC"][lnClass="CILO"][lnInst="1"]'
      )
    ).to.exist;
  });
  it('automatically adds loginal nodes to the fourth conducting equipment', () => {
    expect(
      validSCL.querySelectorAll(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(4) > LNode'
      ).length
    ).to.equal(3);
    expect(
      validSCL.querySelector(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(4) > LNode[iedName="IED1"][ldInst="Disconnectors"][lnClass="XSWI"][lnInst="3"]'
      )
    ).to.exist;
    expect(
      validSCL.querySelector(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(4) > LNode[iedName="IED1"][ldInst="Disconnectors"][lnClass="CSWI"][lnInst="3"]'
      )
    ).to.exist;
    expect(
      validSCL.querySelector(
        ':root > Substation > VoltageLevel > Bay > ConductingEquipment:nth-child(4) > LNode[iedName="IED1"][ldInst="Disconnectors"][lnClass="CILO"][lnInst="3"]'
      )
    ).to.exist;
  });
});
