import { expect, fixture, html } from '@open-wc/testing';
import { SinonSpy, spy } from 'sinon';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import { selectSampledValueControlWizard } from '../../../src/wizards/sampledvaluecontrol.js';

describe('Wizards for SCL element SampledValueControl', () => {
  let doc: XMLDocument;
  let element: MockWizard;

  let actionEvent: SinonSpy;

  beforeEach(async () => {
    element = await fixture(html`<mock-wizard></mock-wizard>`);
    doc = await fetch('test/testfiles/wizards/sampledvaluecontrol.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));

    actionEvent = spy();
    window.addEventListener('editor-action', actionEvent);
  });

  describe('define a select wizard that', () => {
    beforeEach(async () => {
      const wizard = selectSampledValueControlWizard(doc.documentElement);
      element.workflow.push(() => wizard);
      await element.requestUpdate();

      await element.wizardUI.requestUpdate(); // make sure wizard is rendered
    });

    it('looks like the latest snapshot', async () => {
      await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
    }).timeout(5000);
  });
});
