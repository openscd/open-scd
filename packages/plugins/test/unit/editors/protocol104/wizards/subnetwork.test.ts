import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards.js';

import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import {
  WizardInputElement,
  patterns,
} from '@openscd/open-scd/src/foundation.js';
import { isCreate, Create } from '@openscd/core/foundation/deprecated/editor.js';
import { createSubNetworkWizard } from '../../../../../src/editors/protocol104/wizards/subnetwork.js';

describe('SubNetwork 104 wizard', () => {
  let doc: XMLDocument;
  let element: OscdWizards;
  let inputs: WizardInputElement[];
  let input: WizardInputElement | undefined;
  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(
      html`<oscd-wizards .host=${document}></oscd-wizards>`
    );

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('include an create wizard that', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/104/valid-subnetwork.scd')
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
      expect(updateAction.new.element).to.have.a.attribute('type', '104');
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
