import { fixture, html, expect } from '@open-wc/testing';
import fc from 'fast-check';

import '../../mock-wizard.js';
import { MockWizard } from '../../mock-wizard.js';

import '../../../src/zeroline/bay-editor.js';
import { regExp, regexString } from '../../foundation.js';

describe('bay-editor wizarding integration', () => {
  let doc: XMLDocument;
  let parent: MockWizard;

  beforeEach(async () => {
    doc = await fetch('/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    parent = <MockWizard>(
      await fixture(
        html`<mock-wizard
          ><bay-editor .element=${doc.querySelector('Bay')}></bay-editor
        ></mock-wizard>`
      )
    );

    (<HTMLElement>(
      parent
        ?.querySelector('bay-editor')
        ?.shadowRoot?.querySelector('mwc-icon-button[icon="edit"]')
    )).click();
    await parent.updateComplete;
  });
  it('looks like the latest snapshot', () => {
    expect(parent.wizardUI.dialog).to.equalSnapshot();
  });
  describe('the first input element', () => {
    it('edits the attribute name', async () => {
      expect(parent.wizardUI.inputs[0].label).to.equal('name');
    });
    it('edits only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.tName, 1), async name => {
          parent.wizardUI.inputs[0].value = name;
          await parent.updateComplete;
          expect(parent.wizardUI.inputs[0].checkValidity()).to.be.true;
        })
      );
    });
  });
  describe('the second input element', () => {
    it('edits the attribute desc', async () => {
      expect(parent.wizardUI.inputs[1].label).to.equal('desc');
    });
    it('edits only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.desc), async desc => {
          parent.wizardUI.inputs[1].value = desc;
          await parent.updateComplete;
          expect(parent.wizardUI.inputs[1].checkValidity()).to.be.true;
        })
      );
    });
  });
});
