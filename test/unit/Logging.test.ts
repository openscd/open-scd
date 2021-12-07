import { expect, fixture, html } from '@open-wc/testing';

import './mock-logger.js';
import { MockAction } from './mock-actions.js';
import { MockLogger } from './mock-logger.js';

import {
  CommitEntry,
  newIssueEvent,
  newLogEvent,
  newOpenDocEvent,
} from '../../src/foundation.js';

describe('LoggingElement', () => {
  let element: MockLogger;
  beforeEach(async () => {
    element = <MockLogger>await fixture(html`<mock-logger></mock-logger>`);
  });

  it('starts out with an empty history', () =>
    expect(element).property('history').to.be.empty);

  it('cannot undo', () => expect(element).property('canUndo').to.be.false);
  it('cannot redo', () => expect(element).property('canRedo').to.be.false);

  it('cannot undo info messages', () => {
    element.dispatchEvent(newLogEvent({ kind: 'info', title: 'test info' }));
    expect(element).property('history').to.have.lengthOf(1);
    expect(element).property('canUndo').to.be.false;
  });

  it('cannot undo warning messages', () => {
    element.dispatchEvent(
      newLogEvent({ kind: 'warning', title: 'test warning' })
    );
    expect(element).property('history').to.have.lengthOf(1);
    expect(element).property('canUndo').to.be.false;
  });

  it('cannot undo error messages', () => {
    element.dispatchEvent(newLogEvent({ kind: 'error', title: 'test error' }));
    expect(element).property('history').to.have.lengthOf(1);
    expect(element).property('canUndo').to.be.false;
  });

  it('has no previous action', () =>
    expect(element).to.have.property('previousAction', -1));
  it('has no current action', () =>
    expect(element).to.have.property('currentAction', -1));
  it('has no next action', () =>
    expect(element).to.have.property('nextAction', -1));

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
    beforeEach(async () => {
      element.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: 'test MockAction',
          action: MockAction.cre,
        })
      );
      element.requestUpdate();
      await element.updateComplete;
      element.requestUpdate();
      await element.updateComplete;
    });

    it('can undo', () => expect(element).property('canUndo').to.be.true);
    it('cannot redo', () => expect(element).property('canRedo').to.be.false);

    it('has no previous action', () =>
      expect(element).to.have.property('previousAction', -1));
    it('has a current action', () =>
      expect(element).to.have.property('currentAction', 0));
    it('has no next action', () =>
      expect(element).to.have.property('nextAction', -1));

    it('does not log derived actions', () => {
      expect(element).property('history').to.have.lengthOf(1);
      element.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: 'test MockAction',
          action: (<CommitEntry>element.history[0]).action,
        })
      );
      expect(element).property('history').to.have.lengthOf(1);
    });

    it('can reset its history', () => {
      element.dispatchEvent(newLogEvent({ kind: 'reset' }));
      expect(element).property('history').to.be.empty;
      expect(element).to.have.property('currentAction', -1);
    });

    it('renders a log message for the action', () =>
      expect(element.logUI).to.contain.text('test'));

    describe('with a second action logged', () => {
      beforeEach(() => {
        element.dispatchEvent(
          newLogEvent({
            kind: 'info',
            title: 'test info',
          })
        );
        element.dispatchEvent(
          newLogEvent({
            kind: 'action',
            title: 'test MockAction',
            action: MockAction.del,
          })
        );
      });

      it('has a previous action', () =>
        expect(element).to.have.property('previousAction', 0));
      it('has a current action', () =>
        expect(element).to.have.property('currentAction', 2));
      it('has no next action', () =>
        expect(element).to.have.property('nextAction', -1));

      describe('with an action undone', () => {
        beforeEach(() => element.undo());

        it('has no previous action', () =>
          expect(element).to.have.property('previousAction', -1));
        it('has a current action', () =>
          expect(element).to.have.property('currentAction', 0));
        it('has a next action', () =>
          expect(element).to.have.property('nextAction', 2));

        it('can redo', () => expect(element).property('canRedo').to.be.true);

        it('removes the undone action when a new action is logged', () => {
          element.dispatchEvent(
            newLogEvent({
              kind: 'action',
              title: 'test MockAction',
              action: MockAction.mov,
            })
          );
          expect(element).property('history').to.have.lengthOf(3);
          expect(element).to.have.property('currentAction', 2);
          expect(element).to.have.property('nextAction', -1);
        });

        describe('with the second action undone', () => {
          beforeEach(() => element.undo());

          it('cannot undo any funther', () =>
            expect(element.undo()).to.be.false);
        });

        describe('with the action redone', () => {
          beforeEach(() => element.redo());

          it('has a previous action', () =>
            expect(element).to.have.property('previousAction', 0));
          it('has a current action', () =>
            expect(element).to.have.property('currentAction', 2));
          it('has no next action', () =>
            expect(element).to.have.property('nextAction', -1));

          it('cannot redo any further', () =>
            expect(element.redo()).to.be.false);
        });
      });
    });
  });

  describe('when loading file with history items', () => {
    beforeEach(async () => {
      const doc = await fetch('/test/testfiles/history.scd')
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, 'application/xml'));

      element.dispatchEvent(newOpenDocEvent(doc, 'history.scd'));
      await element.requestUpdate();
    });

    it('has 7 items in the history list', () => {
      expect(element.history.length).to.be.equal(7);
    });

    it('expect the correct values of the first line (with valid when and no why)', () => {
      expect(element.history.length).to.be.equal(7);
      expect(element.history[0].kind).to.be.equal('sclhistory');
      expect(element.history[0].title).to.satisfy((msg: string) =>
        msg.startsWith('SCD created from CIM File(s):')
      );
      expect(element.history[0].message).to.be.equal('Test User 1');
      expect(element.history[0].time).to.be.not.null;
    });

    it('expect the correct values of the third line (with no when and no why)', () => {
      expect(element.history.length).to.be.equal(7);
      expect(element.history[2].kind).to.be.equal('sclhistory');
      expect(element.history[2].title).to.satisfy((msg: string) =>
        msg.startsWith('SCD updated, ')
      );
      expect(element.history[2].message).to.be.equal('Test User 1');
      expect(element.history[2].time).to.be.null;
    });

    it('expect the correct values of the forth line (with invalid when, but valid why)', () => {
      expect(element.history.length).to.be.equal(7);
      expect(element.history[3].kind).to.be.equal('sclhistory');
      expect(element.history[3].title).to.satisfy((msg: string) =>
        msg.startsWith('SCD updated, ')
      );
      expect(element.history[3].message).to.be.equal(
        'Test User 1 : Small correction in substation'
      );
      expect(element.history[3].time).to.be.null;
    });

    it('expect the correct message values (with missing who)', () => {
      expect(element.history.length).to.be.equal(7);
      expect(element.history[4].kind).to.be.equal('sclhistory');
      expect(element.history[4].title).to.satisfy((msg: string) =>
        msg.startsWith('SCD updated, ')
      );
      expect(element.history[4].message).to.be.equal(
        'Small correction in substation'
      );
      expect(element.history[4].time).to.be.null;
    });

    it('expect undefined message (with missing who and why)', () => {
      expect(element.history.length).to.be.equal(7);
      expect(element.history[5].kind).to.be.equal('sclhistory');
      expect(element.history[5].title).to.satisfy((msg: string) =>
        msg.startsWith('SCD updated, ')
      );
      expect(element.history[5].message).to.be.undefined;
      expect(element.history[5].time).to.be.null;
    });

    it('expect undefined title (with invalid what)', () => {
      expect(element.history.length).to.be.equal(7);
      expect(element.history[6].kind).to.be.equal('sclhistory');
      expect(element.history[6].title).to.satisfy((msg: string) =>
        msg.startsWith('UNDEFINED')
      );
      expect(element.history[6].message).to.be.equal(
        'Test User 1 : Small correction in substation'
      );
      expect(element.history[6].time).to.be.null;
    });

    it('can reset its history', async () => {
      element.dispatchEvent(newLogEvent({ kind: 'reset' }));
      await element.requestUpdate();
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
