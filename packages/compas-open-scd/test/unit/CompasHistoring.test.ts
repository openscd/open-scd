import { expect, fixture, html } from '@open-wc/testing';

import 'open-scd/test/unit/mock-logger.js';
import { MockLogger } from 'open-scd/test/unit/mock-logger.js';

import { newIssueEvent } from 'open-scd/src/foundation.js';

describe('HistoringElement', () => {
  let element: MockLogger;
  beforeEach(async () => {
    element = <MockLogger>await fixture(html`<mock-logger></mock-logger>`);
  });

  describe('with a CoMPAS issue coming in - CoMPAS validator', () => {
    let substation: Element;
    beforeEach(async () => {
      const doc = await fetch('/test/testfiles/valid2007B4.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));
      substation = doc.querySelector('Substation')!;

      element.dispatchEvent(
        newIssueEvent({
          validatorId: '/src/validators/CompasValidateSchema.js',
          title: 'CoMPAS Run',
          element: substation,
        })
      );
    });

    it('in parallel saves the issues of the CoMPAS validator', () => {
      expect(element.diagnoses.get('/src/validators/CompasValidateSchema.js'))
        .to.exist;
      expect(
        element.diagnoses.get('/src/validators/CompasValidateSchema.js')!.length
      ).to.equal(1);
      const issue = element.diagnoses.get(
        '/src/validators/CompasValidateSchema.js'
      )![0];
      expect(issue.title).to.equal('CoMPAS Run');
      expect(issue.element).to.equal(substation);
    });

    it('diagnostic dialog looks like the latest snapshot', async () => {
      await element.issueUI.querySelector('mwc-button')!.click();
      await element.updateComplete;

      await expect(element.diagnosticUI).to.equalSnapshot();
    });
  });
});
