import { html, fixture, expect } from '@open-wc/testing';

import '../src/wizard-textfield.js';
import '../src/wizard-dialog.js';
import { WizardDialog } from '../src/wizard-dialog.js';
import { WizardInput } from '../src/foundation.js';

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

  describe('with a wizard loaded', () => {
    beforeEach(async () => {
      element.wizard = [
        {
          title: 'Page 1',
          content: [
            html`<wizard-textfield
              label="Test textfield 1"
            ></wizard-textfield>`,
          ],
          secondary: { icon: 'add', action: wi => [], label: 'Test secondary' },
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
          content: [
            html`<wizard-textfield
              label="Test textfield 3"
            ></wizard-textfield>`,
          ],
          primary: { icon: 'anchor', action: wi => [], label: 'Test primary' },
        },
      ];
      await element.updateComplete;
    });

    it('shows the first dialog', () => {
      expect(element).property('dialog').to.have.property('open', true);
      expect(element.dialog).to.have.property('heading', 'Page 1');
    });

    describe('with invalid inputs', () => {
      beforeEach(async () => {
        element.dialogs[1].querySelector<WizardInput>(
          'wizard-textfield'
        )!.maybeValue = 'Peter';
        await element.updateComplete;
      });

      it('is considered invalid', () =>
        expect(element.checkValidity()).to.be.false);

      it('detects the first invalid page', () =>
        expect(element).to.have.property('firstInvalidPage', 1));
    });
  });
});
