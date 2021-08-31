import { expect, fixture, html } from '@open-wc/testing';
import { WizardSelect } from '../../../src/wizard-select.js';

import { editSmvOptsWizard } from '../../../src/wizards/smvopts.js';
import { MockWizardEditor } from '../../mock-wizard-editor.js';

describe('smvopts wizarding editing', () => {
  let smvCb: Element;
  let element: MockWizardEditor;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard-editor></mock-wizard-editor>`);
  });

  describe('editSmvOptsWizard', () => {
    let primaryAction: HTMLElement;
    let refreshTime: WizardSelect;

    beforeEach(async () => {
      smvCb = <Element>(
        new DOMParser().parseFromString(
          `<SampledValueControl name="myRpCB"><SmvOpts refreshTime="true" timestamp="true"></SmvOpts></SampledValueControl>`,
          'application/xml'
        ).documentElement
      );
      const smvOpts = smvCb.querySelector('SmvOpts')!;
      const wizard = editSmvOptsWizard(smvOpts);
      element.workflow.push(wizard);
      await element.requestUpdate();
      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
      refreshTime = element.wizardUI.dialog!.querySelector(
        'wizard-select[label="refreshTime"]'
      )!;
      await refreshTime.updateComplete;
    });

    it('allows to change SmvOpts attributes on primary action', async () => {
      expect(smvCb.querySelector('SmvOpts')).to.have.attribute(
        'refreshTime',
        'true'
      );
      refreshTime.value = 'false';
      primaryAction.click();
      await element.updateComplete;
      expect(smvCb.querySelector('SmvOpts')).to.have.attribute(
        'refreshTime',
        'false'
      );
    });
    /* it('returns to editReportControlWizard after update', async () => {
      refreshTime.value = 'false';
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
    }); */
    /* it('returns to editReportControlWizard after update', async () => {
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
    }); */
  });
});
