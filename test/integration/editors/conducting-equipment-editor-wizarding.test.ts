import { fixture, html, expect } from '@open-wc/testing';
import fc from 'fast-check';

import '../../mock-wizard.js';
import { WizardingElement } from '../../../src/Wizarding.js';

import { getDocument } from '../../data.js';
import { regexString, regExp } from '../../foundation.js';

describe('conducting-equipment-editor wizarding integration', () => {
  const doc = getDocument();
  let parent: WizardingElement;

  beforeEach(async () => {
    parent = <WizardingElement>(
      await fixture(
        html`<mock-wizard
          ><conducting-equipment-editor
            .element=${doc.querySelector('ConductingEquipment')}
          ></conducting-equipment-editor
        ></mock-wizard>`
      )
    );

    (<HTMLElement>(
      parent
        ?.querySelector('conducting-equipment-editor')
        ?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
    )).click();
    await parent.updateComplete;
  });
  it('has one wizard-dialog', async () => {
    expect(parent.wizardUI.dialogs.length).to.equal(1);
  });
  describe('include two buttons', () => {
    it('and only two buttons', () => {
      expect(
        parent.wizardUI.dialog?.querySelectorAll('mwc-button').length
      ).to.equal(2);
    });
    it('a cancel button as secondary action', () => {
      expect(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="secondaryAction"]'
        )
      ).to.exist;
    });
    it('a edit button as primary action', () => {
      expect(
        parent.wizardUI.dialog?.querySelector(
          'mwc-button[slot="primaryAction"]'
        )
      ).to.exist;
    });
  });
  it('include 3 wizard inputs', async () => {
    expect(parent.wizardUI.inputs.length).to.equal(3);
  });
  it('the first input element only displaying the type', () => {
    expect(parent.wizardUI.inputs[0]).to.have.property('disabled', true);
  });
  describe('the second input element', () => {
    it('edits the attribute name', async () => {
      expect(parent.wizardUI.inputs[1].label).to.equal('name');
    });
    it('edits only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.tName, 1), async name => {
          parent.wizardUI.inputs[1].value = name;
          await parent.updateComplete;
          expect(parent.wizardUI.inputs[0].checkValidity()).to.be.true;
        })
      );
    });
  });
  describe('the third input element', () => {
    it('edits the attribute desc', async () => {
      expect(parent.wizardUI.inputs[2].label).to.equal('desc');
    });
    it('edits only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.desc), async desc => {
          parent.wizardUI.inputs[2].value = desc;
          await parent.updateComplete;
          expect(parent.wizardUI.inputs[1].checkValidity()).to.be.true;
        })
      );
    });
  });
});
