import { expect, fixture, html } from '@open-wc/testing';

import '../mock-open-scd.js';
import { mockEdits } from '../mock-edits.js';
import { MockOpenSCD } from '../mock-open-scd.js';

import {
  CommitEntry,
  newIssueEvent,
  newLogEvent,
} from '@openscd/core/foundation/deprecated/history.js';
import { OscdHistory } from '../../src/addons/History.js';

describe('HistoringElement', () => {
  let mock: MockOpenSCD;
  let element: OscdHistory;
  beforeEach(async () => {
    mock = <MockOpenSCD>await fixture(html`<mock-open-scd></mock-open-scd>`);
    element = mock.historyAddon;
  });

  it('starts out with an empty log', () => expect(element).property('log').to.be.empty);

  it('renders a placeholder message', () =>
    expect(element.logUI).to.contain('mwc-list-item[disabled]'));
  // dirty hack: ask @open-wc/shadowDomDiff for contains support

  it('shows a snackbar on logging an info', () => {
    expect(element.infoUI).to.have.property('open', false);
    element.dispatchEvent(newLogEvent({ kind: 'info', title: 'test info' }));
    expect(element.infoUI).to.have.property('open', true);
  });

  it('shows a snackbar on logging an warning', () => {
    expect(element.warningUI).to.have.property('open', false);
    element.dispatchEvent(
      newLogEvent({ kind: 'warning', title: 'test warning' })
    );
    expect(element.warningUI).to.have.property('open', true);
  });

  it('shows a snackbar on logging an error', () => {
    expect(element.errorUI).to.have.property('open', false);
    element.dispatchEvent(newLogEvent({ kind: 'error', title: 'test error' }));
    expect(element.errorUI).to.have.property('open', true);
  });

  it('shows a snackbar on an issue', () => {
    expect(element.issueUI).to.have.property('open', false);
    element.dispatchEvent(
      newIssueEvent({
        validatorId: 'val',
        title: 'test issue',
      })
    );
    expect(element.issueUI).to.have.property('open', true);
  });

  it('opens the log dialog on snackbar "Show" button click', async () => {
    expect(element.logUI).to.have.property('open', false);
    await element.errorUI.querySelector('mwc-button')!.click();
    await element.updateComplete;
    expect(element.logUI).to.have.property('open', true);
  });

  it('opens the diagnostics dialog on issue snackbar "Show" button click', async () => {
    expect(element.diagnosticUI).to.have.property('open', false);
    await element.issueUI.querySelector('mwc-button')!.click();
    await element.updateComplete;
    expect(element.diagnosticUI).to.have.property('open', true);
  });

  // TODO: Replace wiht editor -> history tests
  describe('with an action logged', () => {
    beforeEach(async () => {
      element.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: 'test MockAction'
        })
      );
      element.requestUpdate();
      await element.updateComplete;
      mock.requestUpdate();
      await mock.updateComplete;
    });

    it('can reset its log', () => {
      element.dispatchEvent(newLogEvent({ kind: 'reset' }));
      expect(element).property('log').to.be.empty;
      expect(element).property('history').to.be.empty;
    });
  });

  describe('with an issue incoming', () => {
    beforeEach(async () => {
      element.dispatchEvent(
        newIssueEvent({
          validatorId: '/src/validators/ValidateSchema.js',
          title: 'test run 1',
        })
      );
      element.requestUpdate();
      await element.updateComplete;
      element.requestUpdate();
      await element.updateComplete;
    });

    it('saves the issue to diagnose', () => {
      expect(element.diagnoses.get('/src/validators/ValidateSchema.js')).to
        .exist;
      const issue = element.diagnoses.get(
        '/src/validators/ValidateSchema.js'
      )![0];
      expect(issue.title).to.equal('test run 1');
    });

    it('does not contain issues from another validator', () =>
      expect(element.diagnoses.has('/src/validators/ValidateTemplates.js')).to
        .be.false);

    describe('with another issue coming in - new validator', () => {
      beforeEach(() => {
        element.dispatchEvent(
          newIssueEvent({
            validatorId: '/src/validators/ValidateTemplates.js',
            title: 'test run 3',
          })
        );
      });

      it('keeps old issues from the other validator', () => {
        expect(element.diagnoses.get('/src/validators/ValidateSchema.js')).to
          .exist;
        expect(
          element.diagnoses.get('/src/validators/ValidateSchema.js')!.length
        ).to.equal(1);
        const issue = element.diagnoses.get(
          '/src/validators/ValidateSchema.js'
        )![0];
        expect(issue.title).to.equal('test run 1');
      });

      it('in parallel saves the issues of the new validator', () => {
        expect(element.diagnoses.get('/src/validators/ValidateTemplates.js')).to
          .exist;
        expect(
          element.diagnoses.get('/src/validators/ValidateTemplates.js')!.length
        ).to.equal(1);
        const issue = element.diagnoses.get(
          '/src/validators/ValidateTemplates.js'
        )![0];
        expect(issue.title).to.equal('test run 3');
      });
    });
  });
});
