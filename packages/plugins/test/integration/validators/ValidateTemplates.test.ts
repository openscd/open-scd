import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

import ValidateTemplates from '../../../src/validators/ValidateTemplates.js';

describe('ValidateTemplates OpenSCD integration test ', () => {
  if (customElements.get('validate-templates') === undefined)
    customElements.define('validate-templates', ValidateTemplates);

  let parent: MockOpenSCD;
  let element: ValidateTemplates;

  let doc: XMLDocument;

  describe('with a valid DataTypeTemplates section', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/validators/zeroissues.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(html`
        <mock-open-scd .doc=${doc}
          ><validate-templates .doc=${doc}></validate-templates
        ></mock-open-scd>
      `);
      element = parent.getActivePlugin();
      element.pluginId = 'http://localhost:8000/plugins/src/validators/ValidateTemplates.js';

      await element.validate();
      await parent.updateComplete;
    });

    it('shows a "No errors" message in the diagnostics pane', async () => {
      await parent.requestUpdate();
      expect(parent.historyAddon.diagnosticUI).to.contain.text('No errors');
      await expect(parent.historyAddon.diagnosticUI).to.equalSnapshot();
    });
  });

  describe('with issues in the DataTypeTemplates section', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/validators/datatypetemplateerrors.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(html`
        <mock-open-scd .doc=${doc}
          ><validate-templates .doc=${doc}></validate-templates
        ></mock-open-scd>
      `);
      element = parent.getActivePlugin();
      element.pluginId = 'http://localhost:8000/plugins/src/validators/ValidateTemplates.js';

      await element.validate();
      await parent.updateComplete;
    });
    it('generates issues in the diagnistics pane', async () => {
      const issues = parent.historyAddon.diagnoses.get(
        'http://localhost:8000/plugins/src/validators/ValidateTemplates.js'
      );
      expect(issues?.length).to.equal(28);
    }).timeout(1000);
    it('pushes issues to the diagnostics pane that look like the latest snapshot', async () => {
      await parent.requestUpdate();
      await expect(parent.historyAddon.diagnosticUI).to.equalSnapshot();
    });
  });
  describe('with schema version smaller "2007B3"', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(html`
        <mock-open-scd .doc=${doc}
          ><validate-templates .doc=${doc}></validate-templates
        ></mock-open-scd>
      `);
      element = parent.getActivePlugin();
      element.pluginId = 'http://localhost:8000/plugins/src/validators/ValidateTemplates.js';

      await element.validate();
      await parent.updateComplete;
    });
    it('shows only one message in the diagnostics pane', async () => {
      const issues = parent.historyAddon.diagnoses.get(
        'http://localhost:8000/plugins/src/validators/ValidateTemplates.js'
      );
      expect(issues?.length).to.equal(1);
    }).timeout(1000);
    it('looks like the latest snapshot', async () => {
      await parent.requestUpdate();
      await expect(parent.historyAddon.diagnosticUI).to.equalSnapshot();
    });
  });
});
