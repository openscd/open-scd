import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

import ValidateSchema from '../../../src/validators/ValidateSchema.js';
import { IssueDetail, LogEntry } from '@openscd/core/foundation/deprecated/history.js';

describe('ValidateSchema plugin', () => {
  if (customElements.get('') === undefined)
    customElements.define('validate-schema', ValidateSchema);

  let parent: MockOpenSCD;
  let element: ValidateSchema;

  let valid2007B4: XMLDocument;
  let invalid2007B: XMLDocument;

  before(async () => {
    parent = await fixture(html`
      <mock-open-scd><validate-schema></validate-schema></mock-open-scd>
    `);

    element = parent.getActivePlugin();
    element.pluginId = 'http://localhost:8000/plugins/src/validators/ValidateSchema.js';
    await parent.updateComplete;
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
      parent.historyAddon.diagnoses.clear();
      await parent.updateComplete;

      await element.validate();
      await parent.updateComplete;
    });

    it('zeroissues indication looks like the latest snapshot', async () => {
      await parent.requestUpdate();
      await expect(parent.historyAddon.diagnosticUI).to.equalSnapshot();
    });

    it('indicates successful schema validation in the diagnoses pane', async () => {
      const lastEntry = <IssueDetail[]>(
        parent.historyAddon.diagnoses.get('http://localhost:8000/plugins/src/validators/ValidateSchema.js')
      );
      expect(lastEntry.length).to.equal(1);
      expect(lastEntry[0].title).to.contain(
        'valid2007B XML schema validation successful'
      );
    });

    it('indicates successful schema validation in the log', async () => {
      const lastEntry = <LogEntry>parent.historyAddon.log.pop();
      expect(lastEntry.kind).to.equal('info');
      expect(lastEntry.title).to.contain(
        'valid2007B XML schema validation successful'
      );
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
      parent.historyAddon.diagnoses.clear();
      await parent.updateComplete;

      await element.validate();
      await parent.updateComplete;
    });

    it('pushes issues to the diagnostics pane that look like the latest snapshot', async () => {
      await parent.requestUpdate();
      await expect(parent.historyAddon.diagnosticUI).to.equalSnapshot();
    });

    it('create issues in diagnose', async () =>
      expect(parent.historyAddon.diagnoses.get('http://localhost:8000/plugins/src/validators/ValidateSchema.js'))
        .to.not.be.undefined);

    it('generates error messages in the log', async () => {
      const lastLogEntry = <LogEntry>parent.historyAddon.log.pop();
      expect(lastLogEntry.kind).to.equal('warning');
      expect(lastLogEntry.title).to.contain(
        'invalid2007B XML schema validation failed'
      );
    });
  });

});
