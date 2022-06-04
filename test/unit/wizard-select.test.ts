import { html, fixture, expect } from '@open-wc/testing';

import '@material/mwc-list/mwc-list-item';

import '../../src/wizard-select.js';
import { WizardSelect } from '../../src/wizard-select.js';

describe('wizard-select', () => {
  let element: WizardSelect;
  const items = ['one', 'two', 'three'];
  beforeEach(async () => {
    element = await fixture(
      html`<wizard-select
        >${items.map(
          item => html`<mwc-list-item value="${item}">${item}</mwc-list-item>`
        )}</wizard-select
      >`
    );
  });

  it('does not render a null value switch', () =>
    expect(element.nullSwitch).to.not.exist);

  it('is enabled', () => expect(element).to.have.property('disabled', false));

  it('returns the select value as its maybeValue', () => {
    element.value = 'two';
    expect(element.maybeValue).to.equal(element.value);
  });

  describe('nullable', () => {
    beforeEach(async () => {
      element.nullable = true;
      element.value = 'one';
      await element.updateComplete;
    });

    it('renders a null value switch', async () =>
      expect(element.nullSwitch).to.exist);

    it('disables itself on switch toggle', async () => {
      expect(element).to.have.property('maybeValue', 'one');
      expect(element).to.have.property('disabled', false);
      element.nullSwitch!.click();
      await element.updateComplete;
      expect(element).to.have.property('maybeValue', null);
      expect(element).to.have.property('disabled', true);
    });

    it('remebers its previous value on switch toggle', async () => {
      element.maybeValue = 'three';
      await element.updateComplete;
      element.nullSwitch!.click();
      await element.updateComplete;
      element.nullSwitch!.click();
      await element.updateComplete;
      expect(element).to.have.property('disabled', false);
      expect(element).to.have.property('maybeValue', 'three');
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
      element = await fixture(html`<wizard-select
        .maybeValue=${'three'}
        nullable
        disabled
        >${items.map(
          item => html`<mwc-list-item value="${item}">${item}</mwc-list-item>`
        )}</wizard-select
      >`);

      await element.updateComplete;
    });

    it('disables select', () =>
      expect(element).to.have.property('disabled', true));

    it('disables null switch', () =>
      expect(element.nullSwitch).to.have.property('disabled', true));

    it('turns off null switch', async () => {
      element.nullSwitch?.click();
      await element.updateComplete;
      element.nullSwitch?.click();
      await element.updateComplete;

      expect(element).to.have.property('disabled', true);
    });
  });
});
