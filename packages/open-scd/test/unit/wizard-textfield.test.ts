import { html, fixture, expect } from '@open-wc/testing';

import '../../src/wizard-textfield.js';
import { WizardTextField } from '../../src/wizard-textfield.js';

describe('wizard-textfield', () => {
  let element: WizardTextField;
  beforeEach(async () => {
    element = await fixture(html`<wizard-textfield></wizard-textfield>`);
  });

  it('does not render a null value switch', () =>
    expect(element.nullSwitch).to.not.exist);

  it('has a transient helper', () =>
    expect(element).to.have.property('helperPersistent', false));

  it('is enabled', () => expect(element).to.have.property('disabled', false));

  it('returns the textfield value as its maybeValue', () => {
    element.value = 'Test';
    expect(element.maybeValue).to.equal(element.value);
  });

  it('does not render a multiplier menu', () =>
    expect(element.multiplierMenu).to.not.exist);

  describe('with a unit supplied', () => {
    beforeEach(async () => {
      element.unit = 'V';
      await element.updateComplete;
    });

    it('does not allow setting the multiplier property', () => {
      element.multiplier = 'k';
      expect(element).to.have.property('multiplier', null);
    });

    it('renders the unit into its suffix', () =>
      expect(element).to.have.property('suffix', 'V'));
  });

  describe('with multipliers supplied', () => {
    beforeEach(async () => {
      element.multipliers = ['G', 'M', 'k', '', 'm'];
      await element.updateComplete;
    });

    it('does not render a multiplier menu', () =>
      expect(element.multiplierMenu).to.not.exist);

    it('does not render a select multiplier button', () =>
      expect(element.multiplierButton).to.not.exist);

    it('has a null multiplier', () =>
      expect(element).to.have.property('multiplier', null));

    describe('with a unit supplied', () => {
      beforeEach(async () => {
        element.unit = 'V';
        await element.updateComplete;
      });

      it('renders a select multiplier button', () =>
        expect(element.multiplierButton).to.exist);

      it('renders a multiplier menu', () =>
        expect(element.multiplierMenu).to.exist);

      it('anchors its multiplier menu to the multiplier button', () =>
        expect(element.multiplierMenu).to.have.property(
          'anchor',
          element.multiplierButton
        ));

      it('opens the multiplier menu on multiplier button click', async () => {
        await element.multiplierButton?.click();
        await element.updateComplete;
        expect(element.multiplierMenu).to.have.property('open', true);
      });

      it('allows setting the multiplier property', () => {
        element.multiplier = 'k';
        expect(element).to.have.property('multiplier', 'k');
      });

      it('renders multiplier and unit into its suffix', () => {
        element.multiplier = 'k';
        expect(element).to.have.property('suffix', 'kV');
      });

      it('shows all multipliers in the multiplier menu', () => {
        expect(
          element.multiplierMenu!.querySelectorAll('mwc-list-item').length
        ).to.equal(5);

        expect(
          element.multiplierMenu!.querySelectorAll('mwc-list-item').item(0)
            .innerText
        ).to.equal('G');
        expect(
          element.multiplierMenu!.querySelectorAll('mwc-list-item').item(1)
            .innerText
        ).to.equal('M');
        expect(
          element.multiplierMenu!.querySelectorAll('mwc-list-item').item(2)
            .innerText
        ).to.equal('k');
        expect(
          element.multiplierMenu!.querySelectorAll('mwc-list-item').item(3)
            .innerText
        ).to.equal('');
        expect(
          element.multiplierMenu!.querySelectorAll('mwc-list-item').item(4)
            .innerText
        ).to.equal('m');
      });

      it('adds a "none" entry for choosing the null multiplier', async () => {
        element.multipliers.unshift(null);
        element.requestUpdate('multipliers');
        await element.updateComplete;
        expect(
          element.multiplierMenu!.querySelectorAll('mwc-list-item').length
        ).to.equal(6);

        expect(
          element.multiplierMenu!.querySelectorAll('mwc-list-item').item(0)
            .innerText
        ).to.equal('[textfield.noMultiplier]');
      });
    });
  });

  describe('nullable', () => {
    beforeEach(async () => {
      element.nullable = true;
      await element.updateComplete;
    });

    it('renders a null value switch', async () =>
      expect(element.nullSwitch).to.exist);

    it('disables itself on switch toggle', async () => {
      expect(element).to.have.property('maybeValue', '');
      expect(element).to.have.property('disabled', false);
      element.nullSwitch!.click();
      await element.updateComplete;
      expect(element).to.have.property('maybeValue', null);
      expect(element).to.have.property('disabled', true);
    });

    it('disables multiplier button on switch toggle', async () => {
      element.multipliers = [null, 'G', 'M', 'k', '', 'm'];
      element.unit = 'V';
      element.multiplier = 'k';
      await element.updateComplete;
      element.nullSwitch!.click();
      await element.updateComplete;
      expect(element.multiplierButton).to.have.property('disabled', true);
      element.nullSwitch!.click();
      await element.updateComplete;
      expect(element.multiplierButton).to.have.property('disabled', false);
    });

    it('remebers its previous value on switch toggle', async () => {
      element.maybeValue = 'test';
      await element.updateComplete;
      element.nullSwitch!.click();
      await element.updateComplete;
      element.nullSwitch!.click();
      await element.updateComplete;
      expect(element).to.have.property('disabled', false);
      expect(element).to.have.property('maybeValue', 'test');
    });

    describe('with a null value', () => {
      beforeEach(async () => {
        element.maybeValue = null;
        await element.updateComplete;
      });

      it('enables itself on switch toggle', async () => {
        element.nullSwitch?.click();
        await element.updateComplete;
        expect(element).to.have.property('disabled', false);
      });

      it('has a persistent helper', async () =>
        expect(element).to.have.property('helperPersistent', true));

      it('has a disabled textfield', () =>
        expect(element).to.have.property('disabled', true));

      it('does not show anything in the textfield', () =>
        expect(element).to.have.property('value', ''));

      it('returns null', () =>
        expect(element).to.have.property('maybeValue', null));
    });
  });

  describe('disabled', () => {
    beforeEach(async () => {
      element = await fixture(html`<wizard-textfield
        .maybeValue=${'someValue'}
        .multipliers=${[null, 'G', 'M', 'k', '', 'm']}
        .multiplier=${'k'}
        .unit=${'V'}
        nullable
        disabled
      ></wizard-textfield>`);

      await element.updateComplete;
    });

    it('disables text field', () =>
      expect(element).to.have.property('disabled', true));

    it('disables null switch', () =>
      expect(element.nullSwitch).to.have.property('disabled', true));

    it('disables null button', () =>
      expect(element.multiplierButton).to.have.property('disabled', true));

    it('turns off null switch', async () => {
      element.nullSwitch?.click();
      await element.updateComplete;
      element.nullSwitch?.click();
      await element.updateComplete;

      expect(element).to.have.property('disabled', true);
    });
  });
});
