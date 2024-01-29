import { expect, fixture, html } from '@open-wc/testing';

import { MockWizard } from '../../../../mock-wizard.js';

import {
  ComplexAction,
  isCreate,
  isSimple,
  WizardAction,
  WizardInputElement,
} from '../../../../../src/foundation.js';

import '../../../../mock-wizard.js';

import {
  createAddressesAction,
  createAddressesWizard,
} from '../../../../../src/editors/protocol104/wizards/createAddresses.js';

import { fetchDoc } from '../../../wizards/test-support.js';
import { Switch } from '@material/mwc-switch';
import { WizardSelect } from '../../../../../src/wizard-select.js';
import { WizardTextField } from '../../../../../src/wizard-textfield.js';

describe('Wizards for preparing 104 Address Creation', () => {
  let doc: XMLDocument;
  let lnElement: Element;
  let doElement: Element;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  beforeEach(async () => {
    doc = await fetchDoc('/test/testfiles/104/valid-empty-addresses.scd');
    element = await fixture(html`<mock-wizard></mock-wizard>`);
  });

  async function prepareWizard(
    queryLnSelector: string,
    doName: string
  ): Promise<void> {
    lnElement = doc.querySelector(queryLnSelector)!;
    const lnType = lnElement.getAttribute('lnType')!;
    doElement = doc.querySelector(
      `LNodeType[id="${lnType}"] > DO[name="${doName}"]`
    )!;

    const wizard = createAddressesWizard(lnElement, doElement);
    element.workflow.push(() => wizard);
    await element.requestUpdate();
    inputs = Array.from(element.wizardUI.inputs);
  }

  function expectCreateActions(
    actions: WizardAction[],
    expectedCreateActions: number
  ): void {
    // We always first expect a ComplexAction.
    expect(actions).to.have.length(1);
    expect(actions[0]).to.not.satisfy(isSimple);

    // Next check the number of Actions and if they are all Create Actions.
    const createActions = (<ComplexAction>actions[0]).actions;
    expect(createActions).to.have.length(expectedCreateActions);
    createActions.forEach(createAction => {
      expect(createAction).to.satisfy(isCreate);
    });
  }

  describe('show prepare 104 Address creation (single monitor TI only)', () => {
    beforeEach(async () => {
      await prepareWizard(
        'IED[name="B1"] LN0[lnType="SE_LLN0_SET_V001"]',
        'MltLev'
      );
    });

    it('when processing the request, the expected Create Actions are returned', () => {
      const actions = createAddressesAction(
        lnElement,
        doElement,
        false
      )(inputs, element.wizardUI);

      expectCreateActions(actions, 1);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('show prepare 104 Address creation (multi monitor TI only)', () => {
    const newTiValue = '39';
    beforeEach(async () => {
      await prepareWizard('IED[name="B1"] LN[lnType="SE_GAPC_SET_V001"]', 'Op');
    });

    it('when processing the request, the expected Create Actions are returned', async () => {
      inputs[3].value = newTiValue;

      const actions = createAddressesAction(
        lnElement,
        doElement,
        false
      )(inputs, element.wizardUI);

      expectCreateActions(actions, 1);
    });

    it('TI contains description', async () => {
      const tiDescription = element.wizardUI.dialog!.querySelector(
        `wizard-select[label="monitorTi"] > mwc-list-item[value='${newTiValue}']`
      )!;
      expect(tiDescription.textContent?.trim()).to.equal(
        `${newTiValue} ([protocol104.values.signalNames.tiNumber${newTiValue}])`
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('show prepare 104 Address creation (single monitor TI with CtlModel)', () => {
    beforeEach(async () => {
      await prepareWizard(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"]',
        'SPCSO1'
      );
    });

    it('when processing the request, the expected Create Actions are returned', () => {
      const actions = createAddressesAction(
        lnElement,
        doElement,
        false
      )(inputs, element.wizardUI);

      expectCreateActions(actions, 1);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });

  describe('show prepare 104 Address creation (single monitor TI and single control TI with CtlModel)', () => {
    const newMonitorTiValue = '30';
    const newControlTiValue = '58';

    beforeEach(async () => {
      await prepareWizard(
        'IED[name="B1"] LN[lnType="SE_GGIO_SET_V002"]',
        'SPCSO2'
      );
    });

    it('when processing the request without Check Selected, the expected Create Actions are returned', () => {
      inputs[3].value = newMonitorTiValue;
      inputs[5].value = newControlTiValue;

      const actions = createAddressesAction(
        lnElement,
        doElement,
        true
      )(inputs, element.wizardUI);

      expectCreateActions(actions, 2);
    });

    it('TIs contain descriptions', async () => {
      const monitorTi = element.wizardUI.dialog!.querySelector(
        'wizard-textfield[label="monitorTi"]'
      ) as WizardTextField;
      expect(monitorTi).to.exist;

      const controlTi = element.wizardUI.dialog!.querySelector(
        `wizard-textfield[label="controlTi"]`
      ) as WizardTextField;
      expect(controlTi).to.exist;

      const monitorTiValue = monitorTi.value;
      const controlTiValue = controlTi.value;

      expect(monitorTiValue).to.equal(
        `${newMonitorTiValue} ([protocol104.values.signalNames.tiNumber${newMonitorTiValue}])`
      );
      expect(controlTiValue).to.equal(
        `${newControlTiValue} ([protocol104.values.signalNames.tiNumber${newControlTiValue}])`
      );
    });

    it('when processing the request with Check Selected, the expected Create Actions are returned', async () => {
      const switchElement = element.wizardUI.dialog!.querySelector<Switch>(
        `mwc-switch[id="controlCheck"]`
      )!;
      switchElement.checked = true;
      await element.requestUpdate();

      const actions = createAddressesAction(
        lnElement,
        doElement,
        true
      )(inputs, element.wizardUI);

      expectCreateActions(actions, 3);
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    });
  });
});
