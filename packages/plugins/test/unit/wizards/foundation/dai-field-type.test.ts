import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards.js';

import { Wizard, WizardInputElement } from '@openscd/open-scd/src/foundation.js';

import {
  CustomField,
  DaiFieldTypes,
  getCustomField,
  getDateValueFromTimestamp,
  getTimeValueFromTimestamp,
} from '../../../../src/wizards/foundation/dai-field-type.js';

describe('dai-field-type', async () => {
  let validSCL: XMLDocument;

  beforeEach(async () => {
    validSCL = await fetch('/test/testfiles/valid2007B4ForDAIValidation.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
  });

  describe('getCustomField', () => {
    let customField: CustomField;
    let element: OscdWizards;
    let inputs: WizardInputElement[];

    function getDAElement(doType: string, doName: string): Element {
      return validSCL.querySelector(
        `DOType[id="${doType}"] > DA[name="${doName}"]`
      )!;
    }

    function getDAIElement(daiName: string): Element | null {
      return validSCL.querySelector(`DAI[name="${daiName}"]`);
    }

    function wizard(
      customField: CustomField,
      daElement: Element,
      daiElement: Element | null
    ): Wizard {
      return [
        {
          title: 'Custom Field Wizard',
          content: [html`${customField.render(daElement, daiElement!)}`],
        },
      ];
    }

    describe('BOOLEAN field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'booleantest');
        const daiElement = getDAIElement('booleantest');

        customField = getCustomField()[<DaiFieldTypes>'BOOLEAN'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('true');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('true');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('ENUM field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'enumtest');
        const daiElement = getDAIElement('enumtest');

        customField = getCustomField()[<DaiFieldTypes>'Enum'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('blocked');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('blocked');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('FLOAT32 field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'float32test');
        const daiElement = getDAIElement('float32test');

        customField = getCustomField()[<DaiFieldTypes>'FLOAT32'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('659.3');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('659.3');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('FLOAT64 field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'float64test');
        const daiElement = getDAIElement('float64test');

        customField = getCustomField()[<DaiFieldTypes>'FLOAT64'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('1111659.8');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('1111659.8');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('INT8 field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'int8test');
        const daiElement = getDAIElement('int8test');

        customField = getCustomField()[<DaiFieldTypes>'INT8'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('5');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('5');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('INT16 field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'int16test');
        const daiElement = getDAIElement('int16test');

        customField = getCustomField()[<DaiFieldTypes>'INT16'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('500');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('500');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('INT24 field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'int24test');
        const daiElement = getDAIElement('int24test');

        customField = getCustomField()[<DaiFieldTypes>'INT24'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('8321');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('8321');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('INT32 field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'int32test');
        const daiElement = getDAIElement('int32test');

        customField = getCustomField()[<DaiFieldTypes>'INT32'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('83218');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('83218');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('INT64 field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'int64test');
        const daiElement = getDAIElement('int64test');

        customField = getCustomField()[<DaiFieldTypes>'INT64'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('-543923');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('-543923');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('INT128 field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'int128test');
        const daiElement = getDAIElement('int128test');

        customField = getCustomField()[<DaiFieldTypes>'INT128'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('-8');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('-8');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('INT8U field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'int8utest');
        const daiElement = getDAIElement('int8utest');

        customField = getCustomField()[<DaiFieldTypes>'INT8U'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('99');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('99');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('INT16U field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'int16utest');
        const daiElement = getDAIElement('int16utest');

        customField = getCustomField()[<DaiFieldTypes>'INT16U'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('20000');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('20000');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('INT24U field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'int24utest');
        const daiElement = getDAIElement('int24utest');

        customField = getCustomField()[<DaiFieldTypes>'INT24U'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('654321');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('654321');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('INT32U field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'int32utest');
        const daiElement = getDAIElement('int32utest');

        customField = getCustomField()[<DaiFieldTypes>'INT32U'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('2');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('2');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('Timestamp field', async () => {
      async function prepareTimestamp(
        daElement: Element,
        daiElement: Element | null
      ): Promise<void> {
        customField = getCustomField()[<DaiFieldTypes>'Timestamp'];
        element = await fixture(
          html` <oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      }

      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'timestamptest');
        const daiElement = getDAIElement('timestamptest');
        await prepareTimestamp(daElement, daiElement);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('2022-03-24');
        expect(inputs[1].value).to.be.equal('12:34:56');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('2022-03-24T12:34:56.000');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });

      describe('with "null" value', async () => {
        beforeEach(async () => {
          const daElement = getDAElement('Dummy.LLN0.Beh', 'nulltimestamptest');
          const daiElement = getDAIElement('nulltimestamptest');
          await prepareTimestamp(daElement, daiElement);
        });

        it('input fields contain the correct values', () => {
          expect(inputs[0].value).to.be.empty;
          expect(inputs[1].value).to.be.empty;
        });

        it('value returns the expected value', () => {
          expect(customField.value(inputs)).to.eql('0000-00-00T00:00:00.000');
        });
      });
    });

    describe('VisString32 field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'visstring32test');
        const daiElement = getDAIElement('visstring32test');

        customField = getCustomField()[<DaiFieldTypes>'VisString32'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('pull-ups');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('pull-ups');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('VisString64 field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'visstring64test');
        const daiElement = getDAIElement('visstring64test');

        customField = getCustomField()[<DaiFieldTypes>'VisString64'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('lat pulldown');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('lat pulldown');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('VisString65 field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'visstring65test');
        const daiElement = getDAIElement('visstring65test');

        customField = getCustomField()[<DaiFieldTypes>'VisString65'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('bench press');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('bench press');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('VisString129 field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'visstring129test');
        const daiElement = getDAIElement('visstring129test');

        customField = getCustomField()[<DaiFieldTypes>'VisString129'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('front squat');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('front squat');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });

    describe('VisString255 field', async () => {
      beforeEach(async () => {
        const daElement = getDAElement('Dummy.LLN0.Beh', 'visstring255test');
        const daiElement = getDAIElement('visstring255test');

        customField = getCustomField()[<DaiFieldTypes>'VisString255'];
        element = await fixture(
          html`<oscd-wizards .host=${document}></oscd-wizards>`
        );
        element.workflow.push(() => wizard(customField, daElement, daiElement));
        await element.requestUpdate();
        inputs = Array.from(element.wizardUI.inputs);
      });

      it('input fields contain the correct values', () => {
        expect(inputs[0].value).to.be.equal('deadlift');
      });

      it('value returns the expected value', () => {
        expect(customField.value(inputs)).to.eql('deadlift');
      });

      it('render function returns the correct snapshot', async () => {
        await expect(element.wizardUI.dialog).dom.to.equalSnapshot();
      });
    });
  });

  describe('getDateValueFromTimestamp', () => {
    it('when normal timestamp passed then date value is returned', () => {
      const dateValue = getDateValueFromTimestamp('2022-03-24T12:34:56.000');
      expect(dateValue).to.be.equal('2022-03-24');
    });

    it('when only date part passed then date value is returned', () => {
      const dateValue = getDateValueFromTimestamp('2022-03-24');
      expect(dateValue).to.be.equal('2022-03-24');
    });

    it('when null timestamp passed then null is returned', () => {
      const dateValue = getDateValueFromTimestamp('0000-00-00T00:00:00.000');
      expect(dateValue).to.be.null;
    });

    it('when invalid timestamp passed then null is returned', () => {
      const dateValue = getDateValueFromTimestamp('INVA-LI-D2T12:34:56.000');
      expect(dateValue).to.be.null;
    });

    it('when empty string passed then null is returned', () => {
      const dateValue = getDateValueFromTimestamp('');
      expect(dateValue).to.be.null;
    });
  });

  describe('getTimeValueFromTimestamp', () => {
    it('when normal timestamp passed then time value is returned', () => {
      const dateValue = getTimeValueFromTimestamp('2022-03-24T12:34:56.000');
      expect(dateValue).to.be.equal('12:34:56');
    });

    it('when timestamp without milliseconds passed then time value is returned', () => {
      const dateValue = getTimeValueFromTimestamp('2022-03-24T12:34:56');
      expect(dateValue).to.be.equal('12:34:56');
    });

    it('when null timestamp passed then null is returned', () => {
      const dateValue = getTimeValueFromTimestamp('0000-00-00T00:00:00.000');
      expect(dateValue).to.be.null;
    });

    it('when only date part passed then null is returned', () => {
      const dateValue = getTimeValueFromTimestamp('2022-03-24');
      expect(dateValue).to.be.null;
    });

    it('when invalid timestamp passed then null is returned', () => {
      const dateValue = getTimeValueFromTimestamp('2022-03-24TIN:VA:LI.D00');
      expect(dateValue).to.be.null;
    });

    it('when empty string passed then null is returned', () => {
      const dateValue = getTimeValueFromTimestamp('');
      expect(dateValue).to.be.null;
    });
  });
});
