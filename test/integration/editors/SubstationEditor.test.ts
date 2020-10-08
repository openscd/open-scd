import { html, fixture, expect } from '@open-wc/testing';
import { Button } from '@material/mwc-button';

import SubstationEditor from '../../../src/editors/SubstationEditor.js';
import { isCreate, isUpdate } from '../../../src/foundation.js';
import { Editing } from '../../../src/Editing.js';
import { Wizarding } from '../../../src/Wizarding.js';

import { getDocument } from '../data.js';

describe('SubstationEditor', () => {
  customElements.define(
    'substation-editor',
    Wizarding(Editing(SubstationEditor))
  );
  let element: SubstationEditor;
  beforeEach(async () => {
    element = await fixture(html`<substation-editor></substation-editor>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons&display=block"
        rel="stylesheet"
      /> `);
  });

  it('has a non null parent property', () =>
    expect(element).property('parent').to.not.be.null);

  /*

  describe('checkSubstationValidity', () => {
    it('accepts a valid (i.e. non-empty) name', async () => {
      element.substationNameUI.value = 'test name';
      await element.updateComplete;
      expect(element.checkSubstationValidity()).to.be.true;
    });

    it('does not accept an invalid (i.e. empty) name', () => {
      element.substationNameUI.value = '';
      expect(element.checkSubstationValidity()).to.be.false;
    });
  });

   */

  describe('without a substation element loaded', () => {
    it('has a null element property', () =>
      expect(element).to.have.property('element', null));
    it('has empty name property', () => {
      expect(element).to.have.property('name', '');
    });
    it('has null desc property', () => {
      expect(element).to.have.property('desc', null);
    });

    it('renders an "add substation" button', () => {
      expect(element.shadowRoot!.querySelector('mwc-fab'))
        .attribute('icon')
        .to.equal('add');
    });

    /*

    it('opens the "Add Substation" wizard on FAB click', async () => {
      expect(element).shadowDom.to.not.contain('wizard-dialog');
      await (<Button | null>(
        element.shadowRoot!.querySelector('mwc-fab')
      ))?.click();
      expect(element).shadowDom.to.contain('wizard-dialog');
    });

     */

    it('renders no substation action menu icon', async () => {
      expect(element.menuUI).to.be.null;
      expect(element.menuIconUI).to.be.null;
    });

    it('does not generate newUpdateAction', () =>
      expect(() =>
        element.newUpdateAction('test name', 'test desc')
      ).to.throw());

    it('does not generate newVoltageLevelCreateAction', () =>
      expect(() =>
        element.newVoltageLevelCreateAction(
          'test name',
          'test desc',
          'test nomFreq',
          'test numPhases',
          'test Voltage',
          'test k'
        )
      ).to.throw());

    it('generates a valid newCreateAction', () =>
      expect(element.newCreateAction('test name', 'test desc')).to.satisfy(
        isCreate
      ));

    /*

    it('creates a new substation with null desc correctly', async () => {
      element.editSubstationUI.show();
      element.substationNameUI.value = 'test name';
      await element.substationDescUI.switch?.click();
      await (<Button>(
        element.editSubstationUI.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await element.updateComplete;
      expect(element).to.have.property('desc', null);
      expect(element).to.have.property('name', 'test name');
    });

     */
  });

  describe('with a substation element loaded', () => {
    beforeEach(async () => {
      element.doc = getDocument();
      await element.updateComplete;
    });

    /*

    describe('checkVoltageLevelValidity', () => {
      beforeEach(async () => {
        element.voltageLevelNameUI.value = 'test name';
        element.voltageLevelDescUI.value = 'test desc';
        element.voltageLevelNomFreqUI.value = '50.0';
        element.voltageLevelNumPhasesUI.value = '3';
        element.voltageLevelVoltageUI.value = '110.0';
        await element.updateComplete;
      });

      it('accepts valid VoltageLevel attribute values', () =>
        expect(element.checkVoltageLevelValidity()).to.be.true);

      it('does not accept an invalid (i.e. empty) VoltageLevel name', async () => {
        element.voltageLevelNameUI.value = '';
        await element.updateComplete;
        expect(element.checkVoltageLevelValidity()).to.be.false;
      });

      it('does not accept invalid numPhase values', async () => {
        element.voltageLevelNumPhasesUI.value = '-1';
        await element.updateComplete;
        expect(element.checkVoltageLevelValidity()).to.be.false;

        element.voltageLevelNumPhasesUI.value = '0';
        await element.updateComplete;
        expect(element.checkVoltageLevelValidity()).to.be.false;

        element.voltageLevelNumPhasesUI.value = '256';
        await element.updateComplete;
        expect(element.checkVoltageLevelValidity()).to.be.false;

        element.voltageLevelNumPhasesUI.value = '';
        await element.updateComplete;
        expect(element.checkVoltageLevelValidity()).to.be.false;
      });

      it('does not accept invalid nomFreq values', async () => {
        element.voltageLevelNomFreqUI.value = 'a';
        await element.updateComplete;
        expect(element.checkVoltageLevelValidity()).to.be.false;

        element.voltageLevelNomFreqUI.value = '50.';
        await element.updateComplete;
        expect(element.checkVoltageLevelValidity()).to.be.false;

        element.voltageLevelNomFreqUI.value = '50.000';
        await element.updateComplete;
        expect(element.checkVoltageLevelValidity()).to.be.false;

        element.voltageLevelNomFreqUI.value = '';
        await element.updateComplete;
        expect(element.checkVoltageLevelValidity()).to.be.false;
      });

      it('does not accept invalid voltage values', async () => {
        element.voltageLevelVoltageUI.value = 'a';
        await element.updateComplete;
        expect(element.checkVoltageLevelValidity()).to.be.false;

        element.voltageLevelVoltageUI.value = '110.';
        await element.updateComplete;
        expect(element.checkVoltageLevelValidity()).to.be.false;

        element.voltageLevelVoltageUI.value = '110.0000';
        await element.updateComplete;
        expect(element.checkVoltageLevelValidity()).to.be.false;

        element.voltageLevelVoltageUI.value = '';
        await element.updateComplete;
        expect(element.checkVoltageLevelValidity()).to.be.false;
      });
    });

*/

    it('has a non null element property if substation exists', () =>
      expect(element).property('element').to.not.be.null);

    it('takes its name attribute from the substation section', () => {
      expect(element).to.have.property('name', 'AA1');
    });

    it('takes its desc attribute from the substation section', () => {
      expect(element).to.have.property('desc', 'Substation');
    });

    it('renders an "edit substation" button if a substation is loaded', () => {
      expect(element).to.have.property('name', 'AA1');
      expect(element).to.have.property('desc', 'Substation');
      expect(element.shadowRoot!.querySelector('mwc-fab'))
        .attribute('icon')
        .to.equal('edit');
    });

    /*

    it('opens the "Edit Substation" dialog on FAB click if a substation exists', async () => {
      expect(element.editSubstationUI.open).to.not.be.true;
      await (<Button | null>(
        element.shadowRoot!.querySelector('mwc-fab')
      ))?.click();
      expect(element.editSubstationUI.open).to.be.true;
    });

     */

    it('renders a substation action menu icon only when a substation exists', () => {
      expect(element.menuUI).to.not.be.null;
      expect(element.menuIconUI).to.not.be.null;
    });

    it('opens a substation action menu on menu button click', async () => {
      expect(element.menuUI).to.have.property('open', false);
      await element.menuIconUI.click();
      expect(element.menuUI).to.have.property('open', true);
    });

    /*

    it('opens the "Create Voltage Level" dialog on action menu entry click', async () => {
      expect(element.createVoltageLevelUI).to.have.property('open', false);
      await element.menuIconUI.click();
      await element.menuUI.querySelector('mwc-list-item')?.click();
      expect(element.createVoltageLevelUI).to.have.property('open', true);
    });

     */

    it('does not generate newCreateAction if a substation already exists', () =>
      expect(() =>
        element.newCreateAction('test name', 'test desc')
      ).to.throw());

    it('generates a valid newUpdateAction if a substation exists', () =>
      expect(element.newUpdateAction('test name', 'test desc')).to.satisfy(
        isUpdate
      ));

    it('generates a valid newVoltageLevelCreateAction if a substation exists', () =>
      expect(
        element.newVoltageLevelCreateAction(
          'test name',
          'test desc',
          'test nomFreq',
          'test numPhases',
          'test Voltage',
          'test k'
        )
      ).to.satisfy(isCreate));

    /*

    it('edits a substation with null desc correctly', async () => {
      expect(element).to.have.property('desc', 'Substation');
      element.editSubstationUI.show();
      element.substationNameUI.value = 'test name';
      await element.substationDescUI.switch?.click();
      await (<Button>(
        element.editSubstationUI.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      )).click();
      await element.updateComplete;
      expect(element).to.have.property('desc', null);
      expect(element).to.have.property('name', 'test name');
    });

     */
  });
});
