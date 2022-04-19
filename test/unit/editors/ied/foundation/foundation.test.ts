import { html, fixture, expect } from '@open-wc/testing';

import { DaiValidationTypes, getCustomField } from '../../../../../src/editors/ied/foundation/foundation.js';

describe('foundation', async () => {
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4ForDAIValidation.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('getCustomField', () => {
    function getValue(daiName: string) {
      return validSCL.querySelector(`DAI[name="${daiName}"] > Val`)?.textContent?.trim()
    }

    it('renders a BOOLEAN field correctly', async () => {
      const value = getValue("booleantest");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'BOOLEAN']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('true');
    });

    it('renders a INT8 field correctly', async () => {
      const value = getValue("int8test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT8']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('5');
    });

    it('renders a INT16 field correctly', async () => {
      const value = getValue("int16test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT16']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('500');
    });

    it('renders a INT24 field correctly', async () => {
      const value = getValue("int24test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT24']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('8321');
    });

    it('renders a INT32 field correctly', async () => {
      const value = getValue("int32test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT32']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('83218');
    });

    it('renders a INT64 field correctly', async () => {
      const value = getValue("int64test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT64']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('-543923');
    });

    it('renders a INT128 field correctly', async () => {
      const value = getValue("int128test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT128']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('-8');
    });

    it('renders a INT8U field correctly', async () => {
      const value = getValue("int8utest");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT8U']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('99');
    });

    it('renders a INT16U field correctly', async () => {
      const value = getValue("int16utest");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT16U']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('20000');
    });

    it('renders a INT24U field correctly', async () => {
      const value = getValue("int24utest");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT24U']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('654321');
    });

    it('renders a INT32U field correctly', async () => {
      const value = getValue("int32utest");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT32U']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('2');
    });

    it('renders a FLOAT32 field correctly', async () => {
      const value = getValue("float32test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT32U']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('659.3');
    });

    it('renders a FLOAT64 field correctly', async () => {
      const value = getValue("float64test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'FLOAT64']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('1111659.8');
    });

    it('renders a VisString32 field correctly', async () => {
      const value = getValue("visstring32test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'VisString32']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('pull-ups');
    });

    it('renders a VisString64 field correctly', async () => {
      const value = getValue("visstring64test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'VisString64']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('lat pulldown');
    });

    it('renders a VisString65 field correctly', async () => {
      const value = getValue("visstring65test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'VisString65']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('bench press');
    });

    it('renders a VisString129 field correctly', async () => {
      const value = getValue("visstring129test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'VisString129']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('front squat');
    });

    it('renders a VisString255 field correctly', async () => {
      const value = getValue("visstring255test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'VisString255']?.render(value!)}`);

      expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('deadlift');
    });
  });
});
