import { expect, fixture, html } from '@open-wc/testing';
import { LoggingElement } from '../src/logging.js';
import { MockAction } from './mock-actions.js';
import './mock-logger.js';
import { newLogEvent } from '../src/foundation.js';

describe('LoggingElement', () => {
  let element: LoggingElement;
  beforeEach(async () => {
    element = <LoggingElement>await fixture(html`<mock-logger></mock-logger>`);
  });

  it('starts out with an empty history', () =>
    expect(element).property('history').to.be.empty);

  it('cannot undo anything with an empty history', () =>
    expect(element).property('canUndo').to.be.false);

  it('cannot redo anything with an empty history', () =>
    expect(element).property('canRedo').to.be.false);

  it('cannot undo info messages', () => {
    element.dispatchEvent(newLogEvent({ kind: 'info', title: 'testinfo' }));
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

  it('has no current, previous and next actions', () => {
    expect(element).property('currentAction').to.equal(-1);
    expect(element).property('previousAction').to.equal(-1);
    expect(element).property('nextAction').to.equal(-1);
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
    });

    it('can undo', () => {
      expect(element).property('canUndo').to.be.true;
    });

    it('cannot redo', () => {
      expect(element).property('canRedo').to.be.false;
    });

    it('has a current action', () => {
      expect(element).property('currentAction').to.equal(0);
      expect(element).property('previousAction').to.equal(-1);
      expect(element).property('nextAction').to.equal(-1);
    });

    describe('with a second action logged', () => {
      beforeEach(async () => {
        element.dispatchEvent(
          newLogEvent({
            kind: 'action',
            title: 'test MockAction',
            action: MockAction.del,
          })
        );
      });

      it('has a current and previous action', () => {
        expect(element).property('currentAction').to.equal(1);
        expect(element).property('previousAction').to.equal(0);
        expect(element).property('nextAction').to.equal(-1);
      });

      describe('with the second action undone', () => {
        beforeEach(async () => {
          element.undo();
        });

        it('has a current and next action', () => {
          expect(element).property('previousAction').to.equal(-1);
          expect(element).property('currentAction').to.equal(0);
          expect(element).property('nextAction').to.equal(1);
        });

        it('can redo', () => expect(element).property('canRedo').to.be.true);
      });
    });
  });

  /*
    it('can undo and redo committed actions', () => {

      element.undo();
      expect(element).property('previousAction').to.equal(-1);
      expect(element).property('currentAction').to.equal(0);
      expect(element).property('nextAction').to.equal(1);

      element.undo();
      expect(element).property('previousAction').to.equal(-1);
      expect(element).property('currentAction').to.equal(-1);
      expect(element).property('nextAction').to.equal(0);
      expect(element).property('canUndo').to.be.false;
      expect(element).property('canRedo').to.be.true;

      expect(element.undo()).to.be.false;
      expect(element).property('previousAction').to.equal(-1);
      expect(element).property('currentAction').to.equal(-1);
      expect(element).property('nextAction').to.equal(0);

      element.redo();
      expect(element).property('currentAction').to.equal(0);
      expect(element).property('canUndo').to.be.true;

      element.redo();
      expect(element).property('currentAction').to.equal(1);

      element.redo();
      expect(element).property('previousAction').to.equal(1);
      expect(element).property('currentAction').to.equal(2);
      expect(element).property('nextAction').to.equal(-1);
      expect(element).property('canRedo').to.be.false;

      expect(element.redo()).to.be.false;
      expect(element).property('currentAction').to.equal(2);
    });

    it('does not log derived actions', () => {
      element.commit('test MockAction.move', MockAction.mov);
      expect(element).property('history').to.have.lengthOf(1);

      element.commit('the same MockAction.move', element.history[0].action!);
      expect(element).property('history').to.have.lengthOf(1);
    });
    */
});
