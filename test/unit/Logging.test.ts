import { expect, fixture, html } from '@open-wc/testing';

import { LoggingElement } from '../../src/Logging.js';
import { CommitEntry, newLogEvent } from '../../src/foundation.js';

import { MockAction } from './mock-actions.js';
import './mock-logger.js';
import { IconButton } from '@material/mwc-icon-button';

describe('LoggingElement', () => {
  let element: LoggingElement;
  beforeEach(async () => {
    element = <LoggingElement>await fixture(html`<mock-logger></mock-logger>`);
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
    expect(element.logUI).to.contain('mwc-list-item[disabled]')); // dirty hack: ask @open-wc/shadowDomDiff for contains support

  it('shows a snackbar on logging an error', () => {
    expect(element.messageUI).to.have.property('open', false);
    element.dispatchEvent(newLogEvent({ kind: 'error', title: 'test error' }));
    expect(element.messageUI).to.have.property('open', true);
  });

  it('opens the log dialog on snackbar "Show" button click', async () => {
    expect(element.logUI).to.have.property('open', false);
    await element.messageUI.querySelector('mwc-button')!.click();
    await element.updateComplete;
    expect(element.logUI).to.have.property('open', true);
  });

  describe('has filter options', () => {
    beforeEach(async () => {
      element.dispatchEvent(
        newLogEvent({
          kind: 'info',
          title: 'test Info',
        })
      );
      element.requestUpdate();
      await element.updateComplete;
      element.dispatchEvent(
        newLogEvent({
          kind: 'warning',
          title: 'test warning',
        })
      );
      element.requestUpdate();
      await element.updateComplete;
      element.dispatchEvent(
        newLogEvent({
          kind: 'error',
          title: 'test error',
        })
      );
      element.requestUpdate();
      await element.updateComplete;
      element.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: 'test MockAction',
          action: MockAction.cre,
        })
      );
      element.requestUpdate();
      await element.updateComplete;
    });

    it('that can filter for infos', async () => {
      (<IconButton>(
        element.filterContainer.querySelector(
          'mwc-icon-button-toggle:nth-child(1)'
        )
      ))!.click();
      element.requestUpdate();
      await element.updateComplete;
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === 'display:none').length
      ).to.equal(1);
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === '').length
      ).to.equal(3);
      (<IconButton>(
        element.filterContainer.querySelector(
          'mwc-icon-button-toggle:nth-child(1)'
        )
      ))!.click();
      element.requestUpdate();
      await element.updateComplete;
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === 'display:none').length
      ).to.equal(0);
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === '').length
      ).to.equal(4);
    });

    it('that can filter for warnings', async () => {
      (<IconButton>(
        element.filterContainer.querySelector(
          'mwc-icon-button-toggle:nth-child(2)'
        )
      ))!.click();
      element.requestUpdate();
      await element.updateComplete;
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === 'display:none').length
      ).to.equal(1);
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === '').length
      ).to.equal(3);
      (<IconButton>(
        element.filterContainer.querySelector(
          'mwc-icon-button-toggle:nth-child(2)'
        )
      ))!.click();
      element.requestUpdate();
      await element.updateComplete;
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === 'display:none').length
      ).to.equal(0);
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === '').length
      ).to.equal(4);
    });

    it('that can filter for errors', async () => {
      (<IconButton>(
        element.filterContainer.querySelector(
          'mwc-icon-button-toggle:nth-child(3)'
        )
      ))!.click();
      element.requestUpdate();
      await element.updateComplete;
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === 'display:none').length
      ).to.equal(1);
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === '').length
      ).to.equal(3);
      (<IconButton>(
        element.filterContainer.querySelector(
          'mwc-icon-button-toggle:nth-child(3)'
        )
      ))!.click();
      element.requestUpdate();
      await element.updateComplete;
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === 'display:none').length
      ).to.equal(0);
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === '').length
      ).to.equal(4);
    });

    it('that can filter for actions', async () => {
      (<IconButton>(
        element.filterContainer.querySelector(
          'mwc-icon-button-toggle:nth-child(4)'
        )
      ))!.click();
      element.requestUpdate();
      await element.updateComplete;
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === 'display:none').length
      ).to.equal(1);
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === '').length
      ).to.equal(3);
      (<IconButton>(
        element.filterContainer.querySelector(
          'mwc-icon-button-toggle:nth-child(4)'
        )
      ))!.click();
      element.requestUpdate();
      await element.updateComplete;
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === 'display:none').length
      ).to.equal(0);
      expect(
        Array.from(
          element.shadowRoot!.querySelectorAll('#content mwc-list-item')
        ).filter(item => item.getAttribute('style') === '').length
      ).to.equal(4);
    });
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
      element.reset();
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
});
