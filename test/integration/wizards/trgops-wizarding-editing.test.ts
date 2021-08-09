import { expect, fixture, html } from '@open-wc/testing';
import { WizardSelect } from '../../../src/wizard-select.js';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import { editOptFieldsWizard } from '../../../src/wizards/optfields.js';
import { editTrgOpsWizard } from '../../../src/wizards/trgopt.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

describe('trgops wizarding editing integration', () => {
  let reportCb: Element;
  let element: MockWizardEditor;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
  });

  describe('editTrgOpsWizard', () => {
    let primaryAction: HTMLElement;
    let dchgField: WizardSelect;
    let periodField: WizardSelect;

    beforeEach(async () => {
      reportCb = <Element>(
        new DOMParser().parseFromString(
          `<ReportControl name="myRpCB"><TrgOps dchg="true"></TrgOps></ReportControl>`,
          'application/xml'
        ).documentElement
      );
      const trgops = reportCb.querySelector('TrgOps')!;
      const wizard = editTrgOpsWizard(trgops);
      element.workflow.push(wizard);
      await element.requestUpdate();
      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
      dchgField = element.wizardUI.dialog!.querySelector(
        'wizard-select[label="dchg"]'
      )!;
      periodField = element.wizardUI.dialog!.querySelector(
        'wizard-select[label="period"]'
      )!;
      await periodField.updateComplete;
    });

    it('allows to change TrgOps attributes on primary action', async () => {
      expect(reportCb.querySelector('TrgOps')).to.have.attribute(
        'dchg',
        'true'
      );
      dchgField.value = 'false';
      primaryAction.click();
      await element.updateComplete;
      expect(reportCb.querySelector('TrgOps')).to.have.attribute(
        'dchg',
        'false'
      );
    });
    it('returns to editReportControlWizard after update', async () => {
      periodField.nullSwitch?.click();
      await periodField.requestUpdate();
      periodField.value = 'false';
      await periodField.requestUpdate();
      primaryAction.click();
      await element.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(
        (<WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="name"]'
          )
        )).maybeValue
      ).to.equal('myRpCB');
    });
    it('updates intgPd of parent report control after update', async () => {
      periodField.nullSwitch?.click();
      await periodField.requestUpdate();
      periodField.value = 'true';
      await periodField.requestUpdate();
      primaryAction.click();
      await element.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(
        (<WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="intgPd"]'
          )
        )).maybeValue
      ).to.equal('1000');
    });
    it('returns to editReportControlWizard after update', async () => {
      (<HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="secondaryAction"]'
        )
      )).click();
      await element.updateComplete;
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      expect(
        (<WizardTextField>(
          element.wizardUI.dialog?.querySelector(
            'wizard-textfield[label="name"]'
          )
        )).maybeValue
      ).to.equal('myRpCB');
    });
  });
});
