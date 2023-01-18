import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { WizardTextField } from '../../../src/wizard-textfield.js';
import {
  isReplace,
  Replace,
  WizardInputElement,
} from '../../../src/foundation.js';
import { createTransformerWindingWizard } from '../../../src/wizards/transformerWinding';
import { WizardCheckbox } from '../../../src/wizard-checkbox.js';

describe('Wizards for SCL TransformerWinding element', () => {
  let doc: XMLDocument;
  let element: MockWizard;
  let inputs: WizardInputElement[];

  let primaryAction: HTMLElement;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch(
      '/test/testfiles/editors/substation/VS869-TransformerWinding.scd'
    )
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('define an create wizard that', () => {
    beforeEach(async () => {
      const wizard = createTransformerWindingWizard(
        doc.querySelector('PowerTransformer')!
      );
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      inputs = Array.from(element.wizardUI.inputs);

      primaryAction = <HTMLElement>(
        element.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      );

      await element.wizardUI.requestUpdate(); // make sure wizard is rendered
    });
  });
});
