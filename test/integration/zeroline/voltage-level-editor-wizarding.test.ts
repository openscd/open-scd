import { fixture, html, expect } from '@open-wc/testing';
import fc from 'fast-check';

import '../../mock-wizard.js';
import { WizardingElement } from '../../../src/Wizarding.js';

import { regexString, regExp, inverseRegExp } from '../../foundation.js';

describe('voltage-level-editor wizarding integration', () => {
  let doc: XMLDocument;
  let parent: WizardingElement;

  beforeEach(async () => {
    doc = await fetch('/base/test/testfiles/valid2007B4.scd')
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, 'application/xml'));
    parent = <WizardingElement>(
      await fixture(
        html`<mock-wizard
          ><voltage-level-editor
            .element=${doc.querySelector('VoltageLevel')}
          ></voltage-level-editor
        ></mock-wizard>`
      )
    );

    (<HTMLElement>(
      parent
        ?.querySelector('voltage-level-editor')
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
  describe('the third input element', () => {
    it('edits the attribute nomFreq', async () => {
      expect(parent.wizardUI.inputs[2].label).to.equal('nomFreq');
    });
    it('edits only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.unsigned, 1), async nomFreq => {
          parent.wizardUI.inputs[2].value = nomFreq;
          await parent.updateComplete;
          expect(parent.wizardUI.inputs[2].checkValidity()).to.be.true;
        })
      );
    });
    it('requires a nonnegative value', async () => {
      parent.wizardUI.inputs[2].value = '';
      await parent.updateComplete;
      expect(parent.wizardUI.inputs[2].checkValidity()).to.be.false;
      parent.wizardUI.inputs[2].value = '-50.';
      await parent.updateComplete;
      expect(parent.wizardUI.inputs[2].checkValidity()).to.be.false;
      parent.wizardUI.inputs[2].value = '+50.';
      await parent.updateComplete;
      expect(parent.wizardUI.inputs[2].checkValidity()).to.be.true;
    });
    it('rejects action for invalid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(
          regexString(inverseRegExp.unsigned, 1),
          async nomFreq => {
            parent.wizardUI.inputs[2].value = nomFreq;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[2].checkValidity()).to.be.false;
          }
        )
      );
    });
  });
  describe('the fourth input element', () => {
    it('edits the attribute ', async () => {
      expect(parent.wizardUI.inputs[3].label).to.equal('numPhases');
    });
    it('edits only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(fc.integer(1, 255), async numPhases => {
          parent.wizardUI.inputs[3].value = String(numPhases);
          await parent.updateComplete;
          expect(parent.wizardUI.inputs[3].checkValidity()).to.be.true;
        })
      );
    });
    it('is of the type unsingedByte', async () => {
      parent.wizardUI.inputs[3].value = '0';
      await parent.updateComplete;
      expect(parent.wizardUI.inputs[3].checkValidity()).to.be.false;
      parent.wizardUI.inputs[3].value = '256';
      await parent.updateComplete;
      expect(parent.wizardUI.inputs[3].checkValidity()).to.be.false;
      parent.wizardUI.inputs[3].value = '-65';
      await parent.updateComplete;
      expect(parent.wizardUI.inputs[3].checkValidity()).to.be.false;
    });
    it('rejects edition for invalid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(
          regexString(inverseRegExp.integer, 1),
          async nomFreq => {
            parent.wizardUI.inputs[3].value = nomFreq;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[3].checkValidity()).to.be.false;
          }
        )
      );
    });
  });
  describe('the fifth input element', () => {
    it('edits the attribute ', async () => {
      expect(parent.wizardUI.inputs[4].label).to.equal('Voltage');
    });
    it('edits only for valid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.decimal), async nomFreq => {
          parent.wizardUI.inputs[4].value = nomFreq;
          await parent.updateComplete;
          expect(parent.wizardUI.inputs[4].checkValidity()).to.be.true;
        })
      );
    });
    it('rejects edition for invalid inputs', async () => {
      await fc.assert(
        fc.asyncProperty(
          regexString(inverseRegExp.decimal, 1),
          async voltage => {
            parent.wizardUI.inputs[4].value = voltage;
            await parent.updateComplete;
            expect(parent.wizardUI.inputs[4].checkValidity()).to.be.false;
          }
        )
      );
    });
  });
});
