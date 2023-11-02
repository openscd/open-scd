import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  isCreate,
  isDelete,
  WizardInputElement,
  isReplace,
  Replace,
  Delete,
  Create,
  patterns,
} from '../../../src/foundation.js';
import {
  createSubNetworkWizard,
  editSubNetworkWizard,
} from '../../../src/wizards/subnetwork.js';

describe('Wizards for SCL element SubNetwork', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let inputs: WizardInputElement[];
  let input: WizardInputElement | undefined;
  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = <MockWizard>await fixture(html`<mock-wizard></mock-wizard>`);

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('include an edit wizard that', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2003.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    });

    describe('with existing BitRate child element', () => {
      beforeEach(async () => {
        const wizard = editSubNetworkWizard(doc.querySelector('SubNetwork')!);
        element.workflow.push(() => wizard);
        await element.requestUpdate();

        inputs = Array.from(element.wizardUI.inputs);

        primaryAction = <HTMLElement>(
          element.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );
      });

      it('looks like the latest snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot({
          ignoreAttributes: [
            {
              tags: ['wizard-textfield'],
              attributes: ['pattern'],
            },
          ],
        });
      });

      //work around, because the escapes get removed in snapshot
      it('should have correct pattern', async () => {
        expect(
          element.wizardUI.dialog!.querySelectorAll(
            'wizard-textfield[pattern]'
          )!.length
        ).to.equal(2);

        expect(
          element.wizardUI
            .dialog!.querySelectorAll('wizard-textfield[pattern]')[0]
            .getAttribute('pattern')
        ).to.equal(patterns.normalizedString);

        expect(
          element.wizardUI
            .dialog!.querySelectorAll('wizard-textfield[pattern]')[1]
            .getAttribute('pattern')
        ).to.equal(patterns.decimal);
      });

      it('does not edit any attributes with unchanged wizard inputs', async () => {
        primaryAction.click();
        await element.requestUpdate();
        expect(actionEvent).to.not.have.been.called;
      });

      it('triggers an editor action to update name attribute', async () => {
        input = <WizardTextField>inputs.find(input => input.label === 'name');
        input.value = 'newSubNetName';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();

        expect(actionEvent).to.be.calledOnce;
        expect(actionEvent.args[0][0].detail.action).to.satisfy(isReplace);

        const updateAction = <Replace>actionEvent.args[0][0].detail.action;
        expect(updateAction.old.element).to.have.a.attribute(
          'name',
          'StationBus'
        );
        expect(updateAction.new.element).to.have.a.attribute(
          'name',
          'newSubNetName'
        );
      });

      it('triggers an editor action to update desc attribute', async () => {
        input = <WizardTextField>inputs.find(input => input.label === 'desc');
        await input.requestUpdate();

        (<WizardTextField>input).nullSwitch?.click();
        input.value = 'myNewSubNetworkDesc';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();

        expect(actionEvent).to.be.calledOnce;
        expect(actionEvent.args[0][0].detail.action).to.satisfy(isReplace);

        const updateAction = <Replace>actionEvent.args[0][0].detail.action;
        expect(updateAction.old.element).to.not.have.a.attribute('desc');
        expect(updateAction.new.element).to.have.a.attribute(
          'desc',
          'myNewSubNetworkDesc'
        );
      });

      it('triggers an editor action to update type attribute', async () => {
        input = <WizardTextField>inputs.find(input => input.label === 'type');
        input.value = 'myNewSubNetType';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();

        expect(actionEvent).to.be.calledOnce;
        expect(actionEvent.args[0][0].detail.action).to.satisfy(isReplace);

        const updateAction = <Replace>actionEvent.args[0][0].detail.action;
        expect(updateAction.old.element).to.have.a.attribute('type', '8-MMS');
        expect(updateAction.new.element).to.have.a.attribute(
          'type',
          'myNewSubNetType'
        );
      });

      it('triggers an editor action to update BitRate element', async () => {
        input = <WizardTextField>(
          inputs.find(input => input.label === 'BitRate')
        );
        input.value = '200.';
        (<WizardTextField>input).multiplier = 'M';
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();

        expect(actionEvent).to.be.calledOnce;
        expect(actionEvent.args[0][0].detail.action).to.satisfy(isReplace);

        const updateAction = <Replace>actionEvent.args[0][0].detail.action;
        expect(updateAction.old.element.innerHTML.trim()).to.equal('100.0');
        expect(updateAction.old.element).to.not.have.attribute('multiplier');
        expect(updateAction.new.element.innerHTML.trim()).to.equal('200.');
        expect(updateAction.new.element).to.have.attribute('multiplier', 'M');
      });

      it('triggers an editor action to remove BitRate element', async () => {
        input = <WizardTextField>(
          inputs.find(input => input.label === 'BitRate')
        );
        await input.requestUpdate();

        (<WizardTextField>input).nullSwitch?.click();
        await input.requestUpdate();

        primaryAction.click();
        await element.requestUpdate();

        expect(actionEvent).to.be.calledOnce;
        expect(actionEvent.args[0][0].detail.action).to.satisfy(isDelete);

        const updateAction = <Delete>actionEvent.args[0][0].detail.action;
        expect(updateAction.old.element.textContent?.trim()).to.equal('100.0');
        expect(updateAction.old.element).to.not.have.attribute('multiplier');
      });
    });

    describe('with missing BitRate child element', () => {
      beforeEach(async () => {
        const wizard = editSubNetworkWizard(
          doc.querySelector('SubNetwork[name="ProcessBus"]')!
        );
        element.workflow.push(() => wizard);
        await element.requestUpdate();

        inputs = Array.from(element.wizardUI.inputs);

        primaryAction = <HTMLElement>(
          element.wizardUI.dialog?.querySelector(
            'mwc-button[slot="primaryAction"]'
          )
        );
      });

      it('looks like the latest snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot({
          ignoreAttributes: [
            {
              tags: ['wizard-textfield'],
              attributes: ['pattern'],
            },
          ],
        });
      });

      //work around, because the escapes get removed in snapshot
      it('should have correct pattern', async () => {
        expect(
          element.wizardUI.dialog!.querySelectorAll(
            'wizard-textfield[pattern]'
          )!.length
        ).to.equal(2);

        expect(
          element.wizardUI
            .dialog!.querySelectorAll('wizard-textfield[pattern]')[0]
            .getAttribute('pattern')
        ).to.equal(patterns.normalizedString);

        expect(
          element.wizardUI
            .dialog!.querySelectorAll('wizard-textfield[pattern]')[1]
            .getAttribute('pattern')
        ).to.equal(patterns.decimal);
      });

      it('triggers an editor action to create a complete BitRate element', async () => {
        input = <WizardTextField>(
          inputs.find(input => input.label === 'BitRate')
        );
        await input.requestUpdate();

        (<WizardTextField>input).nullSwitch?.click();
        (<WizardTextField>input).value = '100.0';
        (<WizardTextField>input).multiplier = 'M';

        primaryAction.click();
        await element.requestUpdate();

        expect(actionEvent).to.be.calledOnce;
        expect(actionEvent.args[0][0].detail.action).to.satisfy(isCreate);

        const updateAction = <Create>actionEvent.args[0][0].detail.action;
        expect(updateAction.new.element.textContent?.trim()).to.equal('100.0');
        expect(updateAction.new.element).to.have.attribute('multiplier', 'M');
      });

      it('triggers an editor action to create BitRate element with multiplier only', async () => {
        input = <WizardTextField>(
          inputs.find(input => input.label === 'BitRate')
        );
        await input.requestUpdate();

        (<WizardTextField>input).nullSwitch?.click();
        (<WizardTextField>input).multiplier = 'M';

        primaryAction.click();
        await element.requestUpdate();

        expect(actionEvent).to.be.calledOnce;
        expect(actionEvent.args[0][0].detail.action).to.satisfy(isCreate);

        const updateAction = <Create>actionEvent.args[0][0].detail.action;
        expect(updateAction.new.element.textContent?.trim()).to.equal('');
        expect(updateAction.new.element).to.have.attribute('multiplier');
      });

      it('triggers an editor action to create BitRate element with bit rate only', async () => {
        input = <WizardTextField>(
          inputs.find(input => input.label === 'BitRate')
        );
        await input.requestUpdate();

        (<WizardTextField>input).nullSwitch?.click();
        (<WizardTextField>input).value = '100.0';

        primaryAction.click();
        await element.requestUpdate();

        expect(actionEvent).to.be.calledOnce;
        expect(actionEvent.args[0][0].detail.action).to.satisfy(isCreate);

        const updateAction = <Create>actionEvent.args[0][0].detail.action;
        expect(updateAction.new.element.textContent?.trim()).to.equal('100.0');
        expect(updateAction.new.element).to.not.have.attribute('multiplier');
      });
    });
  });

  describe('include an create wizard that', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2003.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      const wizard = createSubNetworkWizard(
        doc.querySelector('Communication')!
      );
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      inputs = Array.from(element.wizardUI.inputs);

      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot({
        ignoreAttributes: [
          {
            tags: ['wizard-textfield'],
            attributes: ['pattern'],
          },
        ],
      });
    });

    //work around, because the escapes get removed in snapshot
    it('should have correct pattern', async () => {
      expect(
        element.wizardUI.dialog!.querySelectorAll('wizard-textfield[pattern]')!
          .length
      ).to.equal(2);

      expect(
        element.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[0]
          .getAttribute('pattern')
      ).to.equal(patterns.normalizedString);

      expect(
        element.wizardUI
          .dialog!.querySelectorAll('wizard-textfield[pattern]')[1]
          .getAttribute('pattern')
      ).to.equal(patterns.decimal);
    });

    it('does not allow creating SubNetwork with empty name attribute', async () => {
      input = <WizardTextField>inputs.find(input => input.label === 'name');
      input.value = '';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      expect(actionEvent).to.not.be.called;
    });

    it('triggers an editor action to create SubNetwork element including BitRate', async () => {
      input = <WizardTextField>inputs.find(input => input.label === 'name');
      input.value = 'myNewSubNetworkName';
      await input.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      expect(actionEvent).to.be.calledOnce;
      expect(actionEvent.args[0][0].detail.action).to.satisfy(isCreate);

      const updateAction = <Create>actionEvent.args[0][0].detail.action;
      expect(updateAction.new.element).to.have.a.attribute(
        'name',
        'myNewSubNetworkName'
      );
      expect(updateAction.new.element).to.have.a.attribute('desc', '');
      expect(updateAction.new.element).to.have.a.attribute('type', '8-MMS');
      expect((<Element>updateAction.new.element).querySelector('BitRate')).to
        .exist;
      expect(
        (<Element>updateAction.new.element).querySelector('BitRate')
      ).to.have.attribute('multiplier', 'M');
      expect(
        (<Element>updateAction.new.element)
          .querySelector('BitRate')
          ?.textContent?.trim()
      ).to.equal('100');
    });

    it('triggers an editor action to create SubNetwork element excluding non required /BitRate', async () => {
      const name = <WizardTextField>(
        inputs.find(input => input.label === 'name')
      );
      const desc = <WizardTextField>(
        inputs.find(input => input.label === 'desc')
      );
      const type = <WizardTextField>(
        inputs.find(input => input.label === 'type')
      );
      const bitrate = <WizardTextField>(
        inputs.find(input => input.label === 'BitRate')
      );
      await element.requestUpdate();

      desc.nullSwitch?.click();
      type.nullSwitch?.click();
      bitrate.nullSwitch?.click();
      name.value = 'myNewSubNetworkName';
      await name.requestUpdate();

      primaryAction.click();
      await element.requestUpdate();

      expect(actionEvent).to.be.calledOnce;
      expect(actionEvent.args[0][0].detail.action).to.satisfy(isCreate);

      const updateAction = <Create>actionEvent.args[0][0].detail.action;
      expect(updateAction.new.element).to.have.a.attribute(
        'name',
        'myNewSubNetworkName'
      );
      expect(updateAction.new.element).to.not.have.a.attribute('desc');
      expect(updateAction.new.element).to.not.have.a.attribute('type');
      expect((<Element>updateAction.new.element).querySelector('BitRate')).to
        .not.exist;
    });
  });
});
