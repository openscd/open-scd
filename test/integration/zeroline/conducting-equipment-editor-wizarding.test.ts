import { fixture, expect } from '@open-wc/testing';
import fc from 'fast-check';

import { regexString, regExp } from '../../foundation.js';
import '../../mock-wizard.js';

import { WizardingElement } from '../../../src/Wizarding.js';
import { html } from '../../../src/foundation.js';

describe('conducting-equipment-editor wizarding integration', () => {
  let doc: XMLDocument;
  let parent: WizardingElement;

  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
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
        ?.shadowRoot?.querySelector('*[icon="edit"]')
    )).click();
    await parent.updateComplete;
  });
  it('looks like the latest snapshot', () => {
    expect(parent.wizardUI.dialog).to.equalSnapshot();
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
