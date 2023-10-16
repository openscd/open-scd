import { expect, fixture, html } from '@open-wc/testing';

import './mock-history.js';
import { MockAction } from './mock-actions.js';
import { MockHistory } from './mock-history.js';

import { CommitEntry, newLogEvent } from '../../src/foundation.js';

describe('HistoringElement', () => {
  let element: MockHistory;
  beforeEach(async () => {
    element = <MockHistory>await fixture(html`<mock-history></mock-history>`);
  });

  it('starts out with an empty history', () =>
    expect(element).property('history').to.be.empty);

  it('cannot undo', () => expect(element).property('canUndo').to.be.false);
  it('cannot redo', () => expect(element).property('canRedo').to.be.false);

  it('has no previous action', () =>
    expect(element).to.have.property('previousAction', -1));
  it('has no edit count', () =>
    expect(element).to.have.property('editCount', -1));
  it('has no next action', () =>
    expect(element).to.have.property('nextAction', -1));

  it('renders a placeholder message', () =>
    expect(element.historyUI).to.contain('mwc-list-item[disabled]'));
  // dirty hack: ask @open-wc/shadowDomDiff for contains support

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
    it('has an edit count', () =>
      expect(element).to.have.property('editCount', 0));
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
      expect(element).to.have.property('editCount', -1);
    });

    it('renders a log message for the action', () =>
      expect(element.historyUI).to.contain.text('test'));

    describe('with a second action logged', () => {
      beforeEach(() => {
        element.dispatchEvent(
          newLogEvent({
            kind: 'action',
            title: 'test MockAction',
            action: MockAction.cre,
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
        expect(element).to.have.property('previousAction', 1));
      it('has an edit count', () =>
        expect(element).to.have.property('editCount', 2));
      it('has no next action', () =>
        expect(element).to.have.property('nextAction', -1));

      describe('with an action undone', () => {
        beforeEach(() => element.undo());

        it('has a previous action', () => {
          expect(element).to.have.property('previousAction', 0);
        });
        it('has an edit count', () => {
          expect(element).to.have.property('editCount', 1);
        });
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
          expect(element).to.have.property('editCount', 2);
          expect(element).to.have.property('nextAction', -1);
        });

        describe('with the second action undone', () => {
          beforeEach(() => element.undo());
        });

        describe('with the action redone', () => {
          beforeEach(() => element.redo());

          it('has a previous action', () =>
            expect(element).to.have.property('previousAction', 1));
          it('has an edit count', () =>
            expect(element).to.have.property('editCount', 2));
          it('has no next action', () =>
            expect(element).to.have.property('nextAction', -1));

          it('cannot redo any further', () =>
            expect(element.redo()).to.be.false);
        });
      });
    });
  });
});
