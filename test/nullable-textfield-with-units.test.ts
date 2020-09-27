import { html, fixture, expect } from '@open-wc/testing';
import { NullableTextFieldWithUnit } from '../src/nullable-textfield-with-unit.js';

describe('Nullable Textfield with Units', () => {
  let element: NullableTextFieldWithUnit;
  beforeEach(async () => {
    element = await fixture(
      html`<nullable-textfield-with-unit></nullable-textfield-with-unit>`
    );
  });

  it('adds a switch element with nullable option', async () => {
    element.nullable = true;
    await element.updateComplete;
    expect(element.switch).to.exist;
  });

  it('does not add a switch element without nullable option', async () => {
    element.nullable = false;
    expect(element.switch).to.not.exist;
  });

  it('adds a select element with non-empty multiplier array and non empty unit', async () => {
    element.multiplierArray = ['G', 'M', 'k', '', 'm'];
    element.unit = 'V';
    await element.updateComplete;
    expect(element.voltageLevelUnitMultiplier).to.exist;
  });

  it('does not add a select element without specified multiplier', async () => {
    element.multiplierArray = [];
    element.unit = 'V';
    await element.updateComplete;
    expect(element.voltageLevelUnitMultiplier).to.not.exist;
  });

  it('does not add a select element on missing unit', async () => {
    element.multiplierArray = ['G', 'M', 'k', '', 'm'];
    await element.updateComplete;
    expect(element.voltageLevelUnitMultiplier).to.not.exist;
  });

  it('combines multiplier and unit in select field', async () => {
    element.multiplierArray = ['G', 'M', 'k', '', 'm'];
    element.unit = 'V';
    await element.updateComplete;
    expect(
      element.voltageLevelUnitMultiplier!.querySelectorAll('mwc-list-item')
        .length
    ).to.equal(5);

    expect(
      element
        .voltageLevelUnitMultiplier!.querySelectorAll('mwc-list-item')
        .item(0).innerText
    ).to.be.equal('GV');
    expect(
      element
        .voltageLevelUnitMultiplier!.querySelectorAll('mwc-list-item')
        .item(1).innerText
    ).to.be.equal('MV');
    expect(
      element
        .voltageLevelUnitMultiplier!.querySelectorAll('mwc-list-item')
        .item(2).innerText
    ).to.be.equal('kV');
    expect(
      element
        .voltageLevelUnitMultiplier!.querySelectorAll('mwc-list-item')
        .item(3).innerText
    ).to.be.equal('V');
    expect(
      element
        .voltageLevelUnitMultiplier!.querySelectorAll('mwc-list-item')
        .item(4).innerText
    ).to.be.equal('mV');
  });

  it('returns selected multiplier on existing multiplier and unit', async () => {
    element.multiplierArray = ['G', 'M', 'k', '', 'm'];
    element.unit = 'V';
    element.preSelectedMultiplier = 'k';
    await element.updateComplete;
    expect(element.getSelectedMultiplier()).to.equal('k');
  });

  it('returns selected empty string on empty multiplier', async () => {
    element.unit = 'V';
    element.preSelectedMultiplier = 'k';
    await element.updateComplete;
    expect(element.getSelectedMultiplier()).to.equal('');
  });

  it('returns selected empty string on empty unit', async () => {
    element.multiplierArray = ['G', 'M', 'k', '', 'm'];
    expect(element.getSelectedMultiplier()).to.equal('');
  });

  it('disables textfield on switch toggle', async () => {
    element.nullable = true;
    element.Value = 'test';
    await element.updateComplete;
    element.switch!.click();
    await element.updateComplete;
    expect(element).to.have.property('Value', null);
    expect(element).to.have.property('disabled', true);
  });

  it('disables mulktiplier select on switch toggle', async () => {
    element.nullable = true;
    element.multiplierArray = ['G', 'M', 'k', '', 'm'];
    element.unit = 'V';
    element.preSelectedMultiplier = 'k';
    await element.updateComplete;
    element.switch!.click();
    await element.updateComplete;
    expect(element.voltageLevelUnitMultiplier).to.have.property(
      'disabled',
      true
    );
    element.switch!.click();
    await element.updateComplete;
    expect(element.voltageLevelUnitMultiplier).to.have.property(
      'disabled',
      false
    );
  });

  it('remebers textfield value on switch toggle', async () => {
    element.nullable = true;
    element.Value = 'test';
    await element.updateComplete;
    element.switch!.click();
    await element.updateComplete;
    element.switch!.click();
    await element.updateComplete;
    expect(element).to.have.property('disabled', false);
    expect(element).to.have.property('Value', 'test');
  });

  describe('with a missing attribute', () => {
    beforeEach(async () => {
      element.Value = null;
    });

    it('has a persistant helper', () => {
      expect(element).to.have.property('helperPersistent', true);
    });

    it('has a disabled textfield', () => {
      expect(element).to.have.property('disabled', true);
    });

    it('does not show anything in the textfield', () => {
      expect(element).to.have.property('value', '');
    });

    it('displays default value of the attribute in the helper if present', async () => {
      element.defaultValue = 'Jakob';
      element.Value = null;
      await element.updateComplete;
      expect(element).to.have.property('helper', 'Default: Jakob');
    });

    it('displays "No default value" in the helper if default value is absent', () => {
      expect(element).to.have.property('helper', 'No default value');
    });

    it('returns null', () => {
      expect(element).to.have.property('Value', null);
    });
  });

  describe('with a non empty attribute', () => {
    beforeEach(async () => {
      element.Value = 'value';
    });

    it('has a non persistant helper', () => {
      expect(element).to.have.property('helperPersistent', false);
    });

    it('has a non disabled textfield', () => {
      expect(element).to.have.property('disabled', false);
    });

    it('displays helper as defined', () => {
      element.helper = 'Describe';
      expect(element).to.have.property('helper', 'Describe');
    });

    it('returns value of textfield', () => {
      element.value = 'Test';
      expect(element.Value).to.be.equal(element.value);
    });
  });
});
