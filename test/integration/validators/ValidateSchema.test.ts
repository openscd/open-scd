import { expect, fixture, html } from '@open-wc/testing';

import { IssueDetail, LogEntry } from '../../../src/foundation.js';

import { OpenSCD } from '../../../src/open-scd.js';
import ValidateSchema from '../../../src/validators/ValidateSchema.js';

describe('ValidateSchema plugin', () => {
  customElements.define('validate-schema', ValidateSchema);
  let parent: OpenSCD;
  let element: ValidateSchema;

  let valid2007B4: XMLDocument;
  let invalid2007B: XMLDocument;

  describe('for valid SCL files', () => {
    beforeEach(async () => {
      valid2007B4 = await fetch('/base/test/testfiles/valid2007B.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(html`
        <open-scd .doc=${valid2007B4} .docName=${'valid2007B4'}
          ><validate-schema
            .doc=${valid2007B4}
            .docName=${'valid2007B4'}
          ></validate-schema
        ></open-scd>

        <link href="public/google/fonts/roboto-v27.css" rel="stylesheet" />
        <link href="public/google/fonts/roboto-mono-v13.css" rel="stylesheet" />
        <link
          href="public/google/icons/material-icons-outlined.css"
          rel="stylesheet"
        />
      `);
      element = <ValidateSchema>parent.querySelector('validate-schema')!;
      element.pluginId = '/src/validators/ValidateSchema.js';
      await element.requestUpdate();
    });

    it('zeroissues indication looks like the latest snapshot', async () => {
      await parent.requestUpdate();
      expect(parent.diagnosticUI).to.equalSnapshot();
    });

    it('indicates successful schema validation in the diagnoses pane', async () => {
      await element.validate();
      await parent.workDone;

      const lastEntry = <IssueDetail[]>(
        parent.diagnoses.get('/src/validators/ValidateSchema.js')
      );
      expect(lastEntry.length).to.equal(1);
      expect(lastEntry[0].title).to.contain('validation successful');
    }).timeout(15000);

    it('indicates successful schema validation in the log', async () => {
      await element.validate();
      await parent.workDone;
      const lastEntry = <LogEntry>parent.history.pop();
      expect(lastEntry.kind).to.equal('info');
      expect(lastEntry.title).to.contain('validation successful');
    }).timeout(15000);
  });

  describe('for invalid SCL files', () => {
    beforeEach(async () => {
      invalid2007B = await fetch('/base/test/testfiles/invalid2007B.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(html`
        <open-scd .doc=${invalid2007B} .docName=${'invalid2007B'}
          ><validate-schema
            .doc=${invalid2007B}
            .docName=${'invalid2007B'}
          ></validate-schema
        ></open-scd>

        <link href="public/google/fonts/roboto-v27.css" rel="stylesheet" />
        <link href="public/google/fonts/roboto-mono-v13.css" rel="stylesheet" />
        <link
          href="public/google/icons/material-icons-outlined.css"
          rel="stylesheet"
        />
      `);

      element = <ValidateSchema>parent.querySelector('validate-schema')!;
      element.pluginId = '/src/validators/ValidateSchema.js';
      await element.requestUpdate();

      try {
        await element.validate();
      } catch (e) {
        e;
      }
      await parent.workDone;
    });
    it('create issues in diagnose', async () => {
      const issues = parent.diagnoses.get('/src/validators/ValidateSchema.js');
      expect(issues).to.not.be.undefined;
    }).timeout(15000);

    it('pushes issues to the diagnostics pane that look like the latest snapshot', async () => {
      await parent.requestUpdate();
      expect(parent.diagnosticUI).to.equalSnapshot();
    });

    it('generates error messages in the log', async () => {
      const lastEntry = <LogEntry>parent.history.pop();
      expect(lastEntry.kind).to.equal('warning');
      expect(lastEntry.title).to.contain('validation failed');
    }).timeout(5000);
  });
});
