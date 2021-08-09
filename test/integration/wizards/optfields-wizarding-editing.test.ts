import { expect, fixture, html } from '@open-wc/testing';
import { WizardSelect } from '../../../src/wizard-select.js';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import { editOptFieldsWizard } from '../../../src/wizards/optfields.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

describe('optfields wizarding editing', () => {
  let reportCb: Element;
  let element: MockWizardEditor;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
  });

  describe('editOptFieldsWizard', () => {
    let primaryAction: HTMLElement;
    let dataSetField: WizardTextField;

    beforeEach(async () => {
      reportCb = <Element>(
        new DOMParser().parseFromString(
          `<ReportControl name="myRpCB"><OptFields dataSet="true" bufOvfl="true"></OptFields></ReportControl>`,
          'application/xml'
        ).documentElement
      );
      const optFields = reportCb.querySelector('OptFields')!;
      const wizard = editOptFieldsWizard(optFields);
      element.workflow.push(wizard);
      await element.requestUpdate();
      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
      dataSetField = element.wizardUI.dialog!.querySelector(
        'wizard-select[label="dataSet"]'
      )!;
      await dataSetField.updateComplete;
    });

    it('allows to change OptFields attributes on primary action', async () => {
      expect(reportCb.querySelector('OptFields')).to.have.attribute(
        'dataSet',
        'true'
      );
      dataSetField.value = 'false';
      primaryAction.click();
      await element.updateComplete;
      expect(reportCb.querySelector('OptFields')).to.have.attribute(
        'dataSet',
        'false'
      );
    });
    it('returns to editReportControlWizard after update', async () => {
      dataSetField.value = 'false';
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
