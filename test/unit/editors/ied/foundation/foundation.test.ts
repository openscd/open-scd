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
    function getDAElement(doType: string, doName: string): Element {
      return validSCL.querySelector(`DOType[id="${doType}"] > DA[name="${doName}"]`)!;
    }

    function getDAIElement(daiName: string): Element | null {
      return validSCL.querySelector(`DAI[name="${daiName}"]`);
    }

    it('renders a BOOLEAN field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "booleantest");
      const daiElement = getDAIElement("booleantest");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'BOOLEAN']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('true');
    });

    it('renders a ENUM field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "enumtest");
      const daiElement = getDAIElement("enumtest");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'Enum']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('blocked');
    });

    it('renders a INT8 field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "int8test");
      const daiElement = getDAIElement("int8test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT8']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('5');
    });

    it('renders a INT16 field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "int16test");
      const daiElement = getDAIElement("int16test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT16']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('500');
    });

    it('renders a INT24 field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "int24test");
      const daiElement = getDAIElement("int24test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT24']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('8321');
    });

    it('renders a INT32 field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "int32test");
      const daiElement = getDAIElement("int32test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT32']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('83218');
    });

    it('renders a INT64 field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "int64test");
      const daiElement = getDAIElement("int64test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT64']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('-543923');
    });

    it('renders a INT128 field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "int128test");
      const daiElement = getDAIElement("int128test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT128']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('-8');
    });

    it('renders a INT8U field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "int8utest");
      const daiElement = getDAIElement("int8utest");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT8U']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('99');
    });

    it('renders a INT16U field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "int16utest");
      const daiElement = getDAIElement("int16utest");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT16U']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('20000');
    });

    it('renders a INT24U field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "int24utest");
      const daiElement = getDAIElement("int24utest");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT24U']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('654321');
    });

    it('renders a INT32U field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "int32utest");
      const daiElement = getDAIElement("int32utest");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT32U']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('2');
    });

    it('renders a FLOAT32 field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "float32test");
      const daiElement = getDAIElement("float32test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'INT32U']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('659.3');
    });

    it('renders a FLOAT64 field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "float64test");
      const daiElement = getDAIElement("float64test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'FLOAT64']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('1111659.8');
    });

    it('renders a VisString32 field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "visstring32test");
      const daiElement = getDAIElement("visstring32test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'VisString32']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('pull-ups');
    });

    it('renders a VisString64 field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "visstring64test");
      const daiElement = getDAIElement("visstring64test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'VisString64']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('lat pulldown');
    });

    it('renders a VisString65 field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "visstring65test");
      const daiElement = getDAIElement("visstring65test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'VisString65']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('bench press');
    });

    it('renders a VisString129 field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "visstring129test");
      const daiElement = getDAIElement("visstring129test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'VisString129']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('front squat');
    });

    it('renders a VisString255 field correctly', async () => {
      const daElement = getDAElement("Dummy.LLN0.Beh", "visstring255test");
      const daiElement = getDAIElement("visstring255test");
      const element = await fixture(html`${getCustomField()[<DaiValidationTypes>'VisString255']?.render(daElement, daiElement!)}`);

      await expect(element).shadowDom.to.equalSnapshot();
      expect(element.shadowRoot?.querySelector('input')?.value).to.eql('deadlift');
    });
  });
});
