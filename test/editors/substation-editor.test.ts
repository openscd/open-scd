import { html, fixture, expect } from '@open-wc/testing';

import SubstationEditor from '../../src/editors/substation-editor.js';

import { getDocument } from '../data.js';

import { emptySCD } from '../mock-document.js';

import { Button } from '@material/mwc-button';

describe('substation-editor', () => {
  customElements.define('substation-editor', SubstationEditor);
  let element: SubstationEditor;
  beforeEach(async () => {
    element = await fixture(html`<substation-editor
        .doc=${emptySCD()}
      ></substation-editor>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons&display=block"
        rel="stylesheet"
      /> `);
  });

  it('has a null element if no substation exists', () =>
    expect(element).to.have.property('element', null));

  it('has a non null element if substation exists', () => {
    element.doc = getDocument();
    expect(element).property('element').to.not.be.null;
  });

  it('has property parent which is never null', () =>
    expect(element).property('parent').to.not.be.null);

  it('takes its name attribute from the substation section', () => {
    expect(element).to.have.property('name', '');
    element.doc = getDocument();
    expect(element).to.have.property('name', 'AA1');
  });

  it('takes its desc attribute from the substation section', () => {
    expect(element).to.have.property('desc', '');
    element.doc = getDocument();
    expect(element).to.have.property('desc', 'Substation');
  });

  it('renders an "add substation" button if no substation exists', () => {
    expect(element).to.have.property('name', '');
    expect(element).to.have.property('desc', '');
    expect(element.shadowRoot!.querySelector('mwc-fab'))
      .attribute('icon')
      .to.equal('add');
  });

  it('renders an "edit substation" button if a substation is loaded', async () => {
    element.doc = getDocument();
    await element.updateComplete;
    expect(element).to.have.property('name', 'AA1');
    expect(element).to.have.property('desc', 'Substation');
    expect(element.shadowRoot!.querySelector('mwc-fab'))
      .attribute('icon')
      .to.equal('edit');
  });

  it('opens "Add Substation" dialog on mwc-fab button click', async () => {
    expect(element.editUI.open).to.not.be.true;
    await (<Button | null>(
      element.shadowRoot!.querySelector('mwc-fab')
    ))?.click();
    expect(element.editUI.open).to.be.true;
  });

  it('opens "Edit Substation" dialog on mwc-fab button click', async () => {
    element.doc = getDocument();
    await element.updateComplete;
    expect(element.editUI.open).to.not.be.true;
    await (<Button | null>(
      element.shadowRoot!.querySelector('mwc-fab')
    ))?.click();
    expect(element.editUI.open).to.be.true;
  });
});
