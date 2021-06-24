import { html, fixture, expect } from '@open-wc/testing';

import '../../src/wizard-textfield.js';
import '../../src/wizard-dialog.js';
import { WizardDialog } from '../../src/wizard-dialog.js';
import {
  EditorAction,
  Wizard,
  WizardActor,
  WizardInput,
} from '../../src/foundation.js';

describe('wizard-dialog', () => {
  let element: WizardDialog;
  beforeEach(async () => {
    element = await fixture(html`<wizard-dialog></wizard-dialog>`);
  });

  describe('with an empty wizard property', () => {
    it('shows no dialog', () =>
      expect(element).property('dialog').to.not.exist);

    it('is considered valid', () => expect(element.checkValidity()).to.be.true);

    it('has no invalid pages', () =>
      expect(element).to.have.property('firstInvalidPage', -1));
  });

  describe('with a nonempty wizard property', () => {
    beforeEach(async () => {
      element.wizard = [
        {
          title: 'Page 1',
          content: [
            html`<wizard-textfield
              label="Test textfield 1"
            ></wizard-textfield>`,
          ],
          secondary: { icon: 'add', action: () => [], label: 'Test secondary' },
        },
        {
          title: 'Page 2',
          content: [
            html`<wizard-textfield
              type="email"
              label="Test textfield 2"
            ></wizard-textfield>`,
          ],
        },
        {
          title: 'Page 3',
          content: [],
          primary: { icon: 'anchor', action: () => [], label: 'Test primary' },
        },
      ];
      await element.updateComplete;
    });

    it('shows the first dialog', () => {
      expect(element).property('dialog').to.have.property('open', true);
      expect(element.dialog).to.have.property('heading', 'Page 1');
    });

    it('advances to the second page on next button click', async () => {
      await (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-button[dialogaction="next"]')
      )).click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      await element.updateComplete;
      expect(element.dialog).to.have.property('heading', 'Page 2');
    });

    it('returns to the first page on prev button click', async () => {
      element.next();
      await element.updateComplete;
      expect(element.dialog).to.have.property('heading', 'Page 2');
      await (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-button[dialogaction="prev"]')
      )).click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      await element.updateComplete;
      expect(element.dialog).to.have.property('heading', 'Page 1');
    });

    it('executes the secondary action on secondary button click', done => {
      element.wizard[0].secondary!.action = () => {
        done();
        return [];
      };
      (<HTMLElement>(
        element.dialog!.querySelector('mwc-button[slot="secondaryAction"]')
      )).click();
    });

    it('executes the primary action on primary button click', done => {
      element.wizard[2].primary!.action = () => {
        done();
        return [];
      };
      element.next();
      element.next();
      element.updateComplete.then(() =>
        (<HTMLElement>(
          element.dialog!.querySelector('mwc-button[slot="primaryAction"]')
        )).click()
      );
    });

    describe('with invalid inputs', () => {
      beforeEach(async () => {
        element.dialogs[1].querySelector<WizardInput>(
          'wizard-textfield'
        )!.value = 'Peter';
        await element.updateComplete;
      });

      it('is considered invalid', () =>
        expect(element.checkValidity()).to.be.false);

      it('detects the first invalid page', () =>
        expect(element).to.have.property('firstInvalidPage', 1));

      it('does not allow to advance past the invalid page', async () => {
        element.next();
        element.next();
        await element.updateComplete;
        expect(element.dialog).to.have.property('heading', 'Page 2');
      });

      it('jumps to first invalid page on action', async () => {
        element.act(() => []);
        await element.updateComplete;
        expect(element.dialog).to.have.property('heading', 'Page 2');
      });

      it('does nothing on undefined action', async () => {
        element.act();
        await element.updateComplete;
        expect(element.dialog).to.have.property('heading', 'Page 1');
      });
    });

    describe('with valid inputs', () => {
      it('is considered valid', () =>
        expect(element.checkValidity()).to.be.true);

      it('has no invalid pages', () =>
        expect(element).to.have.property('firstInvalidPage', -1));

      it('advances to the next dialog on next()', async () => {
        element.next();
        await element.updateComplete;
        expect(element.dialog).to.have.property('heading', 'Page 2');
        expect(element).property('dialog').to.have.property('open', true);
        element.next();
        await element.updateComplete;
        expect(element.dialog).to.have.property('heading', 'Page 3');
        expect(element).property('dialog').to.have.property('open', true);
      });

      it('returns to the previos dialog on prev()', async () => {
        element.next();
        element.prev();
        await element.updateComplete;
        expect(element.dialog).to.have.property('heading', 'Page 1');
        expect(element).property('dialog').to.have.property('open', true);
      });

      it('does not jump on action', async () => {
        element.act(() => []);
        await element.updateComplete;
        expect(element.dialog).to.have.property('heading', 'Page 1');
      });
    });

    it('removes primary action to prevent multiple trigger during wizard close', async () => {
      element.wizard = [
        {
          title: 'Page 1',
          content: [],
          primary: {
            icon: 'anchor',
            action: (
              inputs: WizardInput[],
              wizard: Element
            ): EditorAction[] => {
              return [
                {
                  new: {
                    parent: element,
                    element: element,
                    reference: null,
                  },
                },
              ];
            },
            label: 'Test primary',
          },
        },
      ];
      await element.updateComplete;
      await (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-button[slot="primaryAction"]')
      )).click();
      expect(element.wizard[0].primary).to.not.exist;
    });
    it('does not remove primary action as long as no editor action is dispatched', async () => {
      element.wizard = [
        {
          title: 'Page 1',
          content: [],
          primary: {
            icon: 'anchor',
            action: () => [],
            label: 'Test primary',
          },
        },
      ];
      await element.updateComplete;
      await (<HTMLElement>(
        element.shadowRoot!.querySelector('mwc-button[slot="primaryAction"]')
      )).click();
      expect(element.wizard[0].primary).to.exist;
    });
  });
});
