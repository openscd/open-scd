import { html, fixture, expect } from '@open-wc/testing';

import { OpenScd } from '../src/open-scd.js';
import '../src/open-scd.js';

import { training } from './data.js';

describe('open-scd', () => {
  let element: OpenScd;
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

  it('loads XML data from a `src` URL', async () => {
    expect(element).property('waiting').to.be.false;
    element.setAttribute('src', training);
    await element.updateComplete;
    expect(element).property('waiting').to.be.true;
    await element.workDone;
    expect(element).property('waiting').to.be.false;
    expect(element.doc.querySelector('DataTypeTemplates > DOType')).to.have.id(
      'ABBIED600_Rev1_ENC_Mod_OnTestBlock'
    ); // FIXME: testing random DOType's `id` for lack of XML snapshot support
    expect(element.doc.lastElementChild)
      .property('childElementCount')
      .to.equal(21); // FIXME: counting `SCL` children instead of XML snapshot
  });

  /*
  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
   */
});
