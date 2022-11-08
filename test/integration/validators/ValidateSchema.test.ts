import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-editor-logger.js';
import { MockEditorLogger } from '../../mock-editor-logger.js';

import ValidateSchema from '../../../src/validators/ValidateSchema.js';
import { IssueDetail, LogEntry } from '../../../src/foundation.js';

describe('ValidateSchema plugin', () => {
  if (customElements.get('') === undefined)
    customElements.define('validate-schema', ValidateSchema);

  let parent: MockEditorLogger;
  let element: ValidateSchema;

  let valid2007B4: XMLDocument;
  let invalid2007B: XMLDocument;

  before(async () => {
    parent = await fixture(html`
      <mock-editor-logger
        ><validate-schema></validate-schema
      ></mock-editor-logger>
    `);

    element = <ValidateSchema>parent.querySelector('validate-schema')!;
    element.pluginId = '/src/validators/ValidateSchema.js';
    await element.updateComplete;
  });

  describe('for valid SCL files', () => {
    before(async () => {
      valid2007B4 = await fetch('/test/testfiles/valid2007B.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element.doc = valid2007B4;
      element.docName = 'valid2007B';
    });

    beforeEach(async () => {
      parent.diagnoses.clear();
      await parent.updateComplete;

      await element.validate();
      await parent.updateComplete;
    });

    it('zeroissues indication looks like the latest snapshot', async () =>
      await expect(parent.diagnosticUI).to.equalSnapshot());

    it('indicates successful schema validation in the diagnoses pane', async () => {
      const lastEntry = <IssueDetail[]>(
        parent.diagnoses.get('/src/validators/ValidateSchema.js')
      );
      expect(lastEntry.length).to.equal(1);
      expect(lastEntry[0].title).to.contain('[validator.schema.valid]');
    });

    it('indicates successful schema validation in the log', async () => {
      const lastEntry = <LogEntry>parent.history.pop();
      expect(lastEntry.kind).to.equal('info');
      expect(lastEntry.title).to.contain('[validator.schema.valid]');
    });
  });

  describe('for invalid SCL files', () => {
    before(async () => {
      invalid2007B = await fetch('/test/testfiles/invalid2007B.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element.doc = invalid2007B;
      element.docName = 'invalid2007B';

      await element.requestUpdate();
    });

    beforeEach(async () => {
      parent.diagnoses.clear();
      await parent.updateComplete;

      await element.validate();
      await parent.updateComplete;
    });

    it('pushes issues to the diagnostics pane that look like the latest snapshot', async () =>
      await expect(parent.diagnosticUI).to.equalSnapshot());

    it('create issues in diagnose', async () =>
      expect(parent.diagnoses.get('/src/validators/ValidateSchema.js')).to.not
        .be.undefined);

    it('generates error messages in the log', async () => {
      const lastLogEntry = <LogEntry>parent.history.pop();
      expect(lastLogEntry.kind).to.equal('warning');
      expect(lastLogEntry.title).to.contain('[validator.schema.invalid]');
    });
  });
});
