import { expect, fixture, html } from '@open-wc/testing';

import '../../mock-editor-logger.js';
import { MockEditorLogger } from '../../mock-editor-logger.js';

import ValidateSchema from '../../../src/validators/ValidateSchema.js';
import { IssueDetail, LogEntry } from '../../../src/foundation.js';

import { officialPlugins } from '../../../public/js/plugins.js';

const plugins = officialPlugins
  .map(plugin => ({
    ...plugin,
    default: false,
    installed: false,
    official: true,
  }))
  .concat([
    {
      name: 'Substation',
      src: '/src/editors/Substation.ts',
      icon: 'margin',
      default: true,
      kind: 'editor',
      installed: true,
      official: false,
    },
  ]);

describe('ValidateSchema plugin', () => {
  if (customElements.get('') === undefined)
    customElements.define('validate-schema', ValidateSchema);

  let parent: MockEditorLogger;
  let element: ValidateSchema;

  let valid2007B4: XMLDocument;
  let invalid2007B: XMLDocument;

  describe('for valid SCL files', () => {
    beforeEach(async () => {
      valid2007B4 = await fetch('/test/testfiles/valid2007B.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      localStorage.setItem('plugins', JSON.stringify(plugins));

      parent = await fixture(html`
        <mock-editor-logger
          ><validate-schema
            .doc=${valid2007B4}
            .docName=${'valid2007B4'}
          ></validate-schema
        ></mock-editor-logger>
      `);
      element = <ValidateSchema>parent.querySelector('validate-schema')!;
      element.pluginId = '/src/validators/ValidateSchema.js';
      await element.requestUpdate();
    });

    it('zeroissues indication looks like the latest snapshot', async () => {
      await parent.requestUpdate();
      await expect(parent.diagnosticUI).to.equalSnapshot();
    });

    it('indicates successful schema validation in the diagnoses pane', async () => {
      await element.validate();

      const lastEntry = <IssueDetail[]>(
        parent.diagnoses.get('/src/validators/ValidateSchema.js')
      );
      expect(lastEntry.length).to.equal(1);
      expect(lastEntry[0].title).to.contain('[validator.schema.valid]');
    }).timeout(15000);

    it('indicates successful schema validation in the log', async () => {
      await element.validate();
      const lastEntry = <LogEntry>parent.history.pop();
      expect(lastEntry.kind).to.equal('info');
      expect(lastEntry.title).to.contain('[validator.schema.valid]');
    }).timeout(15000);
  });

  describe('for invalid SCL files', () => {
    beforeEach(async () => {
      invalid2007B = await fetch('/test/testfiles/invalid2007B.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(html`
        <mock-editor-logger
          ><validate-schema
            .doc=${invalid2007B}
            .docName=${'invalid2007B'}
          ></validate-schema
        ></mock-editor-logger>
      `);

      element = <ValidateSchema>parent.querySelector('validate-schema')!;
      element.pluginId = '/src/validators/ValidateSchema.js';
      await element.requestUpdate();

      try {
        await element.validate();
      } catch (e) {
        e;
      }
    });
    it('create issues in diagnose', async () => {
      const issues = parent.diagnoses.get('/src/validators/ValidateSchema.js');
      expect(issues).to.not.be.undefined;
    }).timeout(15000);

    it('pushes issues to the diagnostics pane that look like the latest snapshot', async () => {
      await parent.requestUpdate();
      await expect(parent.diagnosticUI).to.equalSnapshot();
    });

    it('generates error messages in the log', async () => {
      const lastEntry = <LogEntry>parent.history.pop();
      expect(lastEntry.kind).to.equal('warning');
      expect(lastEntry.title).to.contain('[validator.schema.invalid]');
    }).timeout(5000);
  });
});
