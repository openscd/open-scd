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
import { InsertV2 } from '@openscd/core';
import { createElement } from '@openscd/xml';

describe('HistoringElement', () => {
  let mock: MockOpenSCD;
  let element: OscdHistory;
  let scd: XMLDocument;

  beforeEach(async () => {
    scd = new DOMParser().parseFromString(
      `<Substation name="s1">
        <VoltageLevel name="v1">
          <Bay name="b1" kind="bay">
            <LNode name="l1" />
          </Bay>
        </VoltageLevel>
      </Substation>`,
      'application/xml',
    );

    mock = <MockOpenSCD>await fixture(html`<mock-open-scd .doc=${scd}></mock-open-scd>`);
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

  describe('with an action logged', () => {
    const insertTitle = 'Insert bay 2';
    let voltageLevel: Element;

    beforeEach(async () => {
      voltageLevel = scd.querySelector('VoltageLevel')!;
      const bay2 = createElement(scd, 'Bay', { name: 'b2' });
      const insert: InsertV2 = {
        parent: voltageLevel,
        node: bay2,
        reference: null
      };
      element.editor.commit(insert, { title: insertTitle });

      element.requestUpdate();
      await element.updateComplete;
      mock.requestUpdate();
      await mock.updateComplete;
    });

    it('should have a history', () => {
      expect(element.history.length).to.equal(1);
      const insertEntry = element.history[0];
      expect(insertEntry.title).to.equal(insertTitle);
      expect(insertEntry.isActive).to.true;
    });

    it('should keep undone entries in history and set is active accordingly', () => {
      const bay3 = createElement(scd, 'Bay', { name: 'b3' });
      const insert: InsertV2 = {
        parent: voltageLevel,
        node: bay3,
        reference: null
      };

      element.editor.commit(insert);

      let [ bay2Insert, bay3Insert ] = element.history;
      expect(bay2Insert.isActive).to.be.false;
      expect(bay3Insert.isActive).to.be.true;

      element.editor.undo();

      [ bay2Insert, bay3Insert ] = element.history;
      expect(bay2Insert.isActive).to.be.true;
      expect(bay3Insert.isActive).to.be.false;

      element.editor.redo();

      [ bay2Insert, bay3Insert ] = element.history;
      expect(bay2Insert.isActive).to.be.false;
      expect(bay3Insert.isActive).to.be.true;
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
