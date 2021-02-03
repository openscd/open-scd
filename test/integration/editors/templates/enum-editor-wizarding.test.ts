import { fixture, html, expect } from '@open-wc/testing';
import fc from 'fast-check';

import '../../../mock-wizard.js';
import '../../../../src/editors/templates/enum-editor.js';
import { EnumEditor } from '../../../../src/editors/templates/enum-editor.js';
import { WizardingElement } from '../../../../src/Wizarding.js';

import { getDocument } from '../../../data.js';
import { regexString, regExp } from '../../../foundation.js';

describe('enum-editor editing wizard', () => {
  const doc = getDocument();
  let parent: WizardingElement;

  beforeEach(async () => {
    parent = <WizardingElement>(
      await fixture(
        html`<mock-wizard
          ><enum-editor .element=${doc.querySelector('EnumType')}></enum-editor
        ></mock-wizard>`
      )
    );

    await (<EnumEditor | undefined>parent?.querySelector('enum-editor'))
      ?.updateComplete;
    (<HTMLElement>(
      parent
        ?.querySelector('enum-editor')
        ?.shadowRoot?.querySelector('mwc-list-item')
    )).click();
    await parent.updateComplete;
  });

  it('consists in a single dialog', () =>
    expect(parent.wizardUI.dialogs.length).to.equal(1));

  it('has exactly two buttons', () =>
    expect(
      parent.wizardUI.dialog?.querySelectorAll('mwc-button').length
    ).to.equal(2));

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

  it('contains a list of five EnumVals', () =>
    expect(
      parent.wizardUI.shadowRoot?.querySelectorAll('mwc-list > mwc-list-item')
    ).to.have.lengthOf(5));

  it('contains two wizard inputs', () =>
    expect(parent.wizardUI.inputs.length).to.equal(2));

  describe('the first input element', () => {
    it('edits the "id" attribute', () =>
      expect(parent.wizardUI.inputs[0].label).to.equal('id'));
    it('checks attribute validity', async () => {
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
    it('edits the attribute desc', () =>
      expect(parent.wizardUI.inputs[1].label).to.equal('desc'));
    it('checks attribute validity', async () => {
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
