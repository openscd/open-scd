import { html, fixture, expect } from '@open-wc/testing';
import { LoggingElement } from '../src/logging.js';

import './mock-logger.js';
import { cre, del, mov, upd } from './mock-actions.js';

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

  it('cannot undo info, warn, and error messages', () => {
    element.info('test info');
    expect(element).property('history').to.have.lengthOf(1);
    expect(element).property('canUndo').to.be.false;
    element.warn('test warn');
    expect(element).property('history').to.have.lengthOf(2);
    expect(element).property('canUndo').to.be.false;
    element.error('test error');
    expect(element).property('history').to.have.lengthOf(3);
    expect(element).property('canUndo').to.be.false;
  });

  it('can undo and redo committed actions', () => {
    expect(element).property('lastAction').to.equal(-1);
    expect(element).property('previousAction').to.equal(-1);
    expect(element).property('nextAction').to.equal(-1);

    element.commit('test create', cre);
    expect(element).property('canUndo').to.be.true;
    expect(element).property('canRedo').to.be.false;
    expect(element).property('lastAction').to.equal(0);
    expect(element).property('previousAction').to.equal(-1);
    expect(element).property('nextAction').to.equal(-1);

    element.commit('test delete', del);
    expect(element).property('lastAction').to.equal(1);
    expect(element).property('previousAction').to.equal(0);
    expect(element).property('nextAction').to.equal(-1);

    element.commit('test update', upd);
    expect(element).property('previousAction').to.equal(1);
    expect(element).property('lastAction').to.equal(2);
    expect(element).property('nextAction').to.equal(-1);
    expect(element).property('canRedo').to.be.false;

    element.undo();
    expect(element).property('previousAction').to.equal(0);
    expect(element).property('lastAction').to.equal(1);
    expect(element).property('nextAction').to.equal(2);
    expect(element).property('canRedo').to.be.true;

    element.undo();
    expect(element).property('previousAction').to.equal(-1);
    expect(element).property('lastAction').to.equal(0);
    expect(element).property('nextAction').to.equal(1);

    element.undo();
    expect(element).property('previousAction').to.equal(-1);
    expect(element).property('lastAction').to.equal(-1);
    expect(element).property('nextAction').to.equal(0);
    expect(element).property('canUndo').to.be.false;
    expect(element).property('canRedo').to.be.true;

    expect(element.undo()).to.be.false;
    expect(element).property('previousAction').to.equal(-1);
    expect(element).property('lastAction').to.equal(-1);
    expect(element).property('nextAction').to.equal(0);

    element.redo();
    expect(element).property('lastAction').to.equal(0);
    expect(element).property('canUndo').to.be.true;

    element.redo();
    expect(element).property('lastAction').to.equal(1);

    element.redo();
    expect(element).property('previousAction').to.equal(1);
    expect(element).property('lastAction').to.equal(2);
    expect(element).property('nextAction').to.equal(-1);
    expect(element).property('canRedo').to.be.false;

    expect(element.redo()).to.be.false;
    expect(element).property('lastAction').to.equal(2);
  });

  it('does not log derived actions', () => {
    element.commit('test move', mov);
    expect(element).property('history').to.have.lengthOf(1);

    element.commit('the same move', element.history[0].action!);
    expect(element).property('history').to.have.lengthOf(1);
  });
});
