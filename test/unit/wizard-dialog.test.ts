import { fixture, expect } from '@open-wc/testing';

import { WizardDialog } from '../../src/wizard-dialog.js';
import {
  Button,
  EditorAction,
  html,
  IconButtonToggle,
  WizardInput,
} from '../../src/foundation.js';

import './mock-editor.js';
import { WizardTextField } from '../../src/wizard-textfield.js';

describe('wizard-dialog', () => {
  let element: WizardDialog;
  beforeEach(async () => {
    element = await fixture(html`<${WizardDialog}></${WizardDialog}>`);
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
            html`<${WizardTextField}
              label="Test textfield 1"
            ></${WizardTextField}>`,
          ],
          secondary: { icon: 'add', action: () => [], label: 'Test secondary' },
        },
        {
          title: 'Page 2',
          content: [
            html`<${WizardTextField}
              type="email"
              label="Test textfield 2"
            ></${WizardTextField}>`,
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
      (<HTMLElement>(
        element.shadowRoot!.querySelector('c-button[dialogaction="next"]')
      )).click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      await element.updateComplete;
      expect(element.dialog).to.have.property('heading', 'Page 2');
    });

    it('returns to the first page on prev button click', async () => {
      element.next();
      await element.updateComplete;
      expect(element.dialog).to.have.property('heading', 'Page 2');
      (<HTMLElement>(
        element.shadowRoot!.querySelector('c-button[dialogaction="prev"]')
      )).click();
      await new Promise(resolve => setTimeout(resolve, 100)); // await animation
      await element.updateComplete;
      expect(element.dialog).to.have.property('heading', 'Page 1');
    });

    describe('with invalid inputs', () => {
      beforeEach(async () => {
        element.dialogs[1].querySelector<WizardInput>(
          'wizard-text-field'
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
            action: (): EditorAction[] => {
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
      (<HTMLElement>(
        element.shadowRoot!.querySelector('c-button[slot="primaryAction"]')
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
      (<HTMLElement>(
        element.shadowRoot!.querySelector('c-button[slot="primaryAction"]')
      )).click();
      expect(element.wizard[0].primary).to.exist;
    });

    describe('in pro mode', () => {
      let host: Element;

      beforeEach(async () => {
        element = await fixture(
          html`<mock-editor><${WizardDialog}></${WizardDialog}></mock-editor>`
        ).then(elm => elm.querySelector<WizardDialog>('wizard-dialog')!);
        localStorage.setItem('mode', 'pro');
        element.requestUpdate();
        await element.updateComplete;
        host = new DOMParser().parseFromString(
          '<host><test></test><host>',
          'application/xml'
        ).documentElement;
        element.wizard = [
          {
            title: 'Page 1',
            element: host.firstElementChild!,
            content: [],
            primary: {
              icon: 'anchor',
              action: () => [],
              label: 'Test primary',
            },
          },
        ];
      });

      it('looks like its snapshot', () => expect(element).to.equalSnapshot());

      it('switches to code editor view on code toggle button click', async () => {
        (<IconButtonToggle>(
          element.dialog!.querySelector('icon-button-toggle')
        ))!.on = true;
        element.requestUpdate();
        await element.updateComplete;
        await element.dialog?.updateComplete;
        expect(element).to.equalSnapshot();
      });

      describe('in code editor mode', () => {
        beforeEach(async () => {
          (<IconButtonToggle>(
            element.dialog!.querySelector('icon-button-toggle')
          ))!.on = true;
          element.requestUpdate();
          await element.updateComplete;
          await element.dialog?.updateComplete;
        });

        it('commits the code action on primary button click', async () => {
          element.dialog
            ?.querySelector('ace-editor')
            ?.setAttribute('value', '<success></success>');
          await element.updateComplete;
          element.dialog
            ?.querySelector<Button>('c-button[slot="primaryAction"]')!
            .click();
          await element.updateComplete;
          expect(host.firstElementChild).to.have.property('tagName', 'success');
        });
      });

      after(() => localStorage.removeItem('mode'));
    });
  });
});
