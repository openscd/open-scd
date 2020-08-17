import { html, fixture, expect } from '@open-wc/testing';

import { SubstationEditor } from '../src/substation-editor.js';
import '../src/substation-editor.js';

import { trainingDocument } from './data.js';

describe('substation-editor', () => {
  const substationSection = trainingDocument.querySelector('Substation')!;
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

  it('renders an "add substation" button if none exists', () => {
    expect(element).to.have.property('name', null);
    expect(element).to.have.property('desc', null);
    expect(element.shadowRoot!.querySelector('mwc-fab'))
      .attribute('icon')
      .to.equal('add');
  });

  it('renders an "edit substation" button if a substation is loaded', async () => {
    element.node = substationSection;
    await element.updateComplete;
    expect(element).to.have.property('name', 'AA1');
    expect(element).to.have.property('desc', 'Substation');
    expect(element.shadowRoot!.querySelector('mwc-fab'))
      .attribute('icon')
      .to.equal('edit');
  });
});
