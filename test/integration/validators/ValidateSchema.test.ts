import { expect, fixture, html } from '@open-wc/testing';
import { LogEntry } from '../../../src/foundation.js';

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
      valid2007B4 = await fetch('/base/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      parent = await fixture(html`
        <open-scd .doc=${valid2007B4} .docName=${'valid2007B4'}
          ><validate-schema
            .doc=${valid2007B4}
            .docName=${'valid2007B4'}
          ></validate-schema
        ></open-scd>

        <link href="public/google/fonts/roboto-v27.css" rel="stylesheet">
        <link href="public/google/fonts/roboto-mono-v13.css" rel="stylesheet">
        <link href="public/google/icons/material-icons-outlined.css" rel="stylesheet">
      `);
      element = <ValidateSchema>parent.querySelector('validate-schema')!;
    });
    it('generates error messages in the log', async () => {
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

        <link href="public/google/fonts/roboto-v27.css" rel="stylesheet">
        <link href="public/google/fonts/roboto-mono-v13.css" rel="stylesheet">
        <link href="public/google/icons/material-icons-outlined.css" rel="stylesheet">
      `);

      element = <ValidateSchema>parent.querySelector('validate-schema')!;
    });
    it('generates error messages in the log', async () => {
      try {
        await element.validate();
      } catch (e) {
        e;
      }
      await parent.workDone;

      const lastEntry = <LogEntry>parent.history.pop();
      expect(lastEntry.kind).to.equal('warning');
      expect(lastEntry.title).to.contain('validation failed');
    }).timeout(5000);
  });
});
