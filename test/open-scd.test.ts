import { html, fixture, expect } from '@open-wc/testing';

import { OpenSCD, emptySCD } from '../src/open-scd.js';
import '../src/open-scd.js';

import { training } from './data.js';

describe('open-scd', () => {
  let element: OpenSCD;
  beforeEach(async () => {
    element = await fixture(html` <open-scd></open-scd> `);
  });

  it('toggles the menu on navigation icon click', async () => {
    const menu = element.shadowRoot!.querySelector('mwc-drawer')!;
    expect(menu).property('open').to.be.false;
    const menuButton = <HTMLElement>(
      element.shadowRoot!.querySelector(
        'mwc-icon-button[slot="navigationIcon"]'
      )
    );
    await menuButton.click();
    expect(menu).property('open').to.be.true;
    await menuButton.click();
    expect(menu).property('open').to.be.false;
  });

  it('renders a progress bar on `waiting`', async () => {
    const progressBar = element.shadowRoot!.querySelector(
      'mwc-linear-progress[indeterminate]'
    );
    expect(progressBar).property('closed').to.be.true;
    element.waiting = true;
    await element.updateComplete;
    expect(progressBar).property('closed').to.be.false;
    element.waiting = false;
    await element.updateComplete;
    expect(progressBar).property('closed').to.be.true;
  });

  it('initially edits an empty SCD document', () => {
    expect(element).property('doc').to.equal(emptySCD);
    expect(element).property('srcName').to.equal('untitled.scd');
  });

  it('revokes `src="blob:..."` URLs after parsing', async () => {
    const emptyBlobURL = URL.createObjectURL(
      new Blob([new XMLSerializer().serializeToString(emptySCD)], {
        type: 'application/xml',
      })
    );
    expect(await fetch(emptyBlobURL)).to.be.ok;
    element.setAttribute('src', emptyBlobURL);
    await element.workDone;
    expect(async () => await fetch(emptyBlobURL)).to.throw;
  });

  it('loads and validates XML data from a `src` URL', async () => {
    element.setAttribute('srcName', 'training.scd');
    expect(element).property('waiting').to.be.false;
    expect(element).property('log').to.have.length(0);
    element.setAttribute('src', training);
    expect(element).property('waiting').to.be.true;
    await element.workDone;
    console.log(element.log);
    expect(element.doc.querySelector('DataTypeTemplates > DOType')).to.have.id(
      'ABBIED600_Rev1_ENC_Mod_OnTestBlock'
    ); // FIXME: testing random DOType's `id` for lack of XML snapshot support
    expect(element.doc.lastElementChild)
      .property('childElementCount')
      .to.equal(21); // FIXME: counting `SCL` children instead of XML snapshot
    expect(element).property('log').to.have.length(25);
  }).timeout(60000);
});
