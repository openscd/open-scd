import { fixture, html, expect } from '@open-wc/testing';
import fc from 'fast-check';

import '@openscd/open-scd/src/addons/Wizards.js';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards.js';

import '../../../../src/editors/substation/conducting-equipment-editor.js';
import { regexString, regExp } from '../../../foundation.js';

describe('conducting-equipment-editor wizarding integration', () => {
  let doc: XMLDocument;
  let parent: OscdWizards;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    parent = await fixture(
      html`<oscd-wizards .host=${document}
        ><conducting-equipment-editor
          .element=${doc.querySelector('ConductingEquipment')}
        ></conducting-equipment-editor
      ></oscd-wizards>`
    );

    (<HTMLElement>(
      parent
        ?.querySelector('conducting-equipment-editor')
        ?.shadowRoot?.querySelector('*[icon="edit"]')
    )).click();
    await parent.updateComplete;
  });
  it('looks like the latest snapshot', async () => {
    await expect(parent.wizardUI.dialog).to.equalSnapshot();
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
