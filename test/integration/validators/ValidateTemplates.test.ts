import { expect, fixture, html } from '@open-wc/testing';

import { OpenSCD } from '../../../src/open-scd.js';
import ValidateTemplates from '../../../src/validators/ValidateTemplates.js';

describe('ValidateTemplates plugin', () => {
  customElements.define('validate-templates', ValidateTemplates);
  let parent: OpenSCD;
  let element: ValidateTemplates;

  let doc: XMLDocument;

  describe('with issues in the DataTypeTemplates section', () => {
    beforeEach(async () => {
      doc = await fetch(
        '/base/test/testfiles/validators/datatypetemplateerrors.scd'
      )
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

      await element.validate('', 1);
      await parent.workDone;
    });
    it('generates issues in the diagnistics pane', async () => {
      const issues = parent.diagnoses.get(
        '/src/validators/ValidateTemplates.js'
      );
      expect(issues?.length).to.equal(20);
    }).timeout(1000);
    it('pushes issues to the diagnostics pane that look like the latest snapshot', async () => {
      await parent.requestUpdate();
      expect(parent.diagnosticUI).to.equalSnapshot();
    });
  });
  describe('with schema version smaller "2007B3"', () => {
    beforeEach(async () => {
      doc = await fetch('/base/test/testfiles/valid2007B.scd')
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

      await element.validate('', 1);
      await parent.workDone;
    });
    it('generates only one specific in the diagnostics pane', async () => {
      const issues = parent.diagnoses.get(
        '/src/validators/ValidateTemplates.js'
      );
      expect(issues?.length).to.equal(1);
    }).timeout(1000);
    it('pushes a specific issue to the diagnostics pane that look like the latest snapshot', async () => {
      await parent.requestUpdate();
      expect(parent.diagnosticUI).to.equalSnapshot();
    });
  });
});
