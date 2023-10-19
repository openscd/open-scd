import { expect, fixture, html } from '@open-wc/testing';

import '../../../src/open-scd.js';
import { OpenSCD } from '../../../src/open-scd.js';
import ValidateTemplates from '../../../src/validators/ValidateTemplates.js';

describe('ValidateTemplates OpenSCD integration test ', () => {
  if (customElements.get('validate-templates') === undefined)
    customElements.define('validate-templates', ValidateTemplates);

  let parent: OpenSCD;
  let element: ValidateTemplates;

  let doc: XMLDocument;

  describe('with a valid DataTypeTemplates section', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/validators/zeroissues.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(html`
        <open-scd .doc=${doc}
          ><validate-templates .doc=${doc}></validate-templates
        ></open-scd>

        <link href="public/google/fonts/roboto-v27.css" rel="stylesheet" />
        <link href="public/google/fonts/roboto-mono-v13.css" rel="stylesheet" />
        <link
          href="public/google/icons/material-icons-outlined.css"
          rel="stylesheet"
        />
      `);
      element = <ValidateTemplates>parent.querySelector('validate-templates')!;
      element.pluginId = '/src/validators/ValidateTemplates.js';

      await element.validate();
      await parent.workDone;
    });

    it('shows a "No errors" message in the diagnostics pane', async () => {
      await parent.requestUpdate();
      expect(parent.diagnosticUI).to.contain.text('No errors');
      await expect(parent.diagnosticUI).to.equalSnapshot();
    });
  });

  describe('with issues in the DataTypeTemplates section', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/validators/datatypetemplateerrors.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(html`
        <open-scd .doc=${doc}
          ><validate-templates .doc=${doc}></validate-templates
        ></open-scd>

        <link href="public/google/fonts/roboto-v27.css" rel="stylesheet" />
        <link href="public/google/fonts/roboto-mono-v13.css" rel="stylesheet" />
        <link
          href="public/google/icons/material-icons-outlined.css"
          rel="stylesheet"
        />
      `);
      element = <ValidateTemplates>parent.querySelector('validate-templates')!;
      element.pluginId = '/src/validators/ValidateTemplates.js';

      await element.validate();
      await parent.workDone;
    });
    it('generates issues in the diagnistics pane', async () => {
      const issues = parent.diagnoses.get(
        '/src/validators/ValidateTemplates.js'
      );
      expect(issues?.length).to.equal(28);
    }).timeout(1000);
    it('pushes issues to the diagnostics pane that look like the latest snapshot', async () => {
      await parent.requestUpdate();
      await parent.updateComplete;
      await expect(parent.diagnosticUI).to.equalSnapshot();
    });
  });
  describe('with schema version smaller "2007B3"', () => {
    beforeEach(async () => {
      doc = await fetch('/test/testfiles/valid2007B.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(html`
        <open-scd .doc=${doc}
          ><validate-templates .doc=${doc}></validate-templates
        ></open-scd>

        <link href="public/google/fonts/roboto-v27.css" rel="stylesheet" />
        <link href="public/google/fonts/roboto-mono-v13.css" rel="stylesheet" />
        <link
          href="public/google/icons/material-icons-outlined.css"
          rel="stylesheet"
        />
      `);
      element = <ValidateTemplates>parent.querySelector('validate-templates')!;
      element.pluginId = '/src/validators/ValidateTemplates.js';

      await element.validate();
      await parent.workDone;
    });
    it('shows only one message in the diagnostics pane', async () => {
      const issues = parent.diagnoses.get(
        '/src/validators/ValidateTemplates.js'
      );
      expect(issues?.length).to.equal(1);
    }).timeout(1000);
    it('looks like the latest snapshot', async () => {
      await parent.requestUpdate();
      await parent.updateComplete;
      await expect(parent.diagnosticUI).to.equalSnapshot();
    });
  });
});
