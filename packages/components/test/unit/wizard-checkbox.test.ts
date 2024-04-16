import { html, fixture, expect } from '@open-wc/testing';

import '../../src/wizard-checkbox.js';
import { WizardCheckbox } from '../../src/wizard-checkbox.js';

describe('wizard-checkbox', () => {
  let element: WizardCheckbox;
  beforeEach(async () => {
    element = await fixture(html`<wizard-checkbox></wizard-checkbox>`);
  });

  describe('with no attribute set', () => {
    it('does not render a null value switch', () =>
      expect(element.nullSwitch).to.not.exist);

    it('is enabled', () =>
      expect(element.checkbox).to.have.property('disabled', false));

    it('is un-checked', () =>
      expect(element.checkbox).to.have.property('checked', false));

    it('returns the checked attribute as maybeValue', () => {
      element.maybeValue = 'true';
      expect(element).to.have.property('maybeValue', 'true');
    });

    it('is un-checked for invalid maybeValue input', () => {
      element.maybeValue = 'someinvalidinput';
      expect(element.checkbox).to.have.property('checked', false);
    });

    it('is un-checked in case input null with non-nullable property', () => {
      element.maybeValue = null;
      expect(element.checkbox).to.have.property('checked', false);
    });
  });

  describe('with nullable set', () => {
    beforeEach(async () => {
      element.nullable = true;
      await element.updateComplete;
    });

    it('renders a null value switch', async () =>
      expect(element.nullSwitch).to.exist);

    it('disables itself on switch toggle', async () => {
      expect(element).to.have.property('maybeValue', 'false');
      expect(element.checkbox).to.have.property('disabled', false);
      element.nullSwitch!.click();
      await element.updateComplete;
      expect(element).to.have.property('maybeValue', null);
      expect(element.checkbox).to.have.property('disabled', true);
    });

    it('remembers its previous value on switch toggle', async () => {
      element.maybeValue = 'true';
      await element.updateComplete;
      element.nullSwitch!.click();
      await element.updateComplete;
      element.nullSwitch!.click();
      await element.updateComplete;
      expect(element.checkbox).to.have.property('disabled', false);
      expect(element).to.have.property('maybeValue', 'true');
    });

    describe('with a null value', () => {
      beforeEach(async () => {
        element.maybeValue = null;
        await element.updateComplete;
      });

      it('enables itself on switch toggle', async () => {
        element.nullSwitch?.click();
        await element.updateComplete;
        expect(element.checkbox).to.have.property('disabled', false);
      });

      it('has a disabled checkbox', () =>
        expect(element.checkbox).to.have.property('disabled', true));

      it('is false per default', () =>
        expect(element.checkbox).to.have.property('checked', false));

      it('is checked with true defaultChecked', async () => {
        element.defaultChecked = true;
        element.nullSwitch?.click();
        await element.requestUpdate();

        element.maybeValue = 'true';
        await element.requestUpdate();

        element.nullSwitch?.click();
        await element.requestUpdate();

        expect(element.checkbox).to.have.property('checked', true);
      });

      it('returns null', () =>
        expect(element).to.have.property('maybeValue', null));
    });
  });

  describe('disabled', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<wizard-checkbox
          value=${'true'}
          nullable
          disabled
        ></wizard-checkbox>`
      );

      await element.updateComplete;
    });

    it('disables checkbox', () =>
      expect(element.checkbox).to.have.property('disabled', true));

    it('disables null switch', () =>
      expect(element.nullSwitch).to.have.property('disabled', true));

    it('turns off null switch', async () => {
      element.nullSwitch?.click();
      await element.updateComplete;
      element.nullSwitch?.click();
      await element.updateComplete;

      expect(element.checkbox).to.have.property('disabled', true);
    });
  });
});
