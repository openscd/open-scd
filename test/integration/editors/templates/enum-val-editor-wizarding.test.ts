import { fixture, html, expect } from '@open-wc/testing';
import fc from 'fast-check';

import '../../../mock-wizard.js';
import '../../../../src/editors/templates/enum-val-editor.js';
import { EnumValEditor } from '../../../../src/editors/templates/enum-val-editor.js';
import { WizardingElement } from '../../../../src/Wizarding.js';

import { getDocument } from '../../../data.js';
import { regexString, regExp } from '../../../foundation.js';

describe('enum-val-editor wizard', () => {
  const doc = getDocument();
  let parent: WizardingElement;
  let editor: EnumValEditor;

  beforeEach(async () => {
    parent = <WizardingElement>(
      await fixture(
        html`<mock-wizard
          ><enum-val-editor
            .element=${doc.querySelector('EnumVal')}
          ></enum-val-editor
        ></mock-wizard>`
      )
    );
    editor = <EnumValEditor>parent.querySelector('enum-val-editor');

    editor.shadowRoot!.querySelector('mwc-list-item')?.click();
    await parent.updateComplete;
  });

  it('consists in a single dialog', () =>
    expect(parent.wizardUI.dialogs.length).to.equal(1));

  it('has exactly three buttons', () =>
    expect(
      parent.wizardUI.dialog?.querySelectorAll('mwc-button').length
    ).to.equal(3));

  it('has a secondary action button', () =>
    expect(
      parent.wizardUI.dialog?.querySelector(
        'mwc-button[slot="secondaryAction"]'
      )
    ).to.exist);

  it('has a primary action button', () =>
    expect(
      parent.wizardUI.dialog?.querySelector('mwc-button[slot="primaryAction"]')
    ).to.exist);

  it('contains three wizard inputs', () =>
    expect(parent.wizardUI.inputs.length).to.equal(3));

  describe('the first input element', () => {
    it('edits the "ord" attribute', () =>
      expect(parent.wizardUI.inputs[0].label).to.equal('ord'));

    it('checks attribute validity', async () => {
      await fc.assert(
        fc.asyncProperty(fc.integer(), async ord => {
          parent.wizardUI.inputs[0].value = ord.toString(10);
          await parent.updateComplete;
          expect(parent.wizardUI.inputs[0].checkValidity()).to.be.true;
        })
      );
    });
  });

  describe('the second input element', () => {
    it('edits the value (textContent)', () =>
      expect(parent.wizardUI.inputs[1].label).to.equal('value'));

    it('checks attribute validity', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.tName, 0, 127), async desc => {
          parent.wizardUI.inputs[1].value = desc;
          await parent.updateComplete;
          expect(parent.wizardUI.inputs[1].checkValidity()).to.be.true;
        })
      );
    });
  });

  describe('the third input element', () => {
    it('edits the attribute desc', () =>
      expect(parent.wizardUI.inputs[2].label).to.equal('desc'));

    it('checks attribute validity', async () => {
      await fc.assert(
        fc.asyncProperty(regexString(regExp.desc), async desc => {
          parent.wizardUI.inputs[2].value = desc;
          await parent.updateComplete;
          expect(parent.wizardUI.inputs[2].checkValidity()).to.be.true;
        })
      );
    });
  });
});
