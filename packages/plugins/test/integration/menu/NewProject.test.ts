import { expect, fixture, html } from '@open-wc/testing';

import '@openscd/open-scd/test/mock-open-scd.js';
import { MockOpenSCD } from '@openscd/open-scd/test/mock-open-scd.js';

import NewProjectPlugin from '../../../src/menu/NewProject.js';

describe('NewProject loader', () => {
  customElements.define('new-project-plugin', NewProjectPlugin);
  let parent: MockOpenSCD;
  let element: NewProjectPlugin;

  beforeEach(async () => {
    parent = await fixture(html`
      <mock-open-scd><new-project-plugin></new-project-plugin></mock-open-scd>
    `);

    element = parent.getActivePlugin();
  });

  it('creates an empty Edition 2.1 project on wizard primary button click', async () => {
    element.run();
    await element.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
    (<HTMLElement>(
      parent.wizardUI.shadowRoot!.querySelector(
        'mwc-button[slot="primaryAction"]'
      )
    )).click();
    expect(parent.doc?.querySelector('Header')).to.exist;
    expect(parent.doc?.querySelector('Header')?.getAttribute('id')).to.equal(
      parent.docName.slice(0, -4)
    );
    expect(parent.doc?.querySelector('SCL')?.getAttribute('xmlns')).to.equal(
      'http://www.iec.ch/61850/2003/SCL'
    );
    expect(parent.doc?.querySelector('SCL')?.getAttribute('version')).to.equal(
      '2007'
    );
    expect(parent.doc?.querySelector('SCL')?.getAttribute('revision')).to.equal(
      'B'
    );
    expect(parent.doc?.querySelector('SCL')?.getAttribute('release')).to.equal(
      '4'
    );
  });

  it('creates an empty Edition 2 project on wizard primary button click', async () => {
    element.run();
    await parent.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
    (<HTMLElement>(
      parent.wizardUI.dialog!.querySelector('mwc-radio-list-item:nth-child(2)')
    )).click();
    await element.updateComplete;

    (<HTMLElement>(
      parent.wizardUI.shadowRoot!.querySelector(
        'mwc-button[slot="primaryAction"]'
      )
    )).click();

    expect(parent.doc?.querySelector('Header')).to.exist;
    expect(parent.doc?.querySelector('Header')?.getAttribute('id')).to.equal(
      parent.docName.slice(0, -4)
    );
    expect(parent.doc?.querySelector('SCL')?.getAttribute('xmlns')).to.equal(
      'http://www.iec.ch/61850/2003/SCL'
    );
    expect(parent.doc?.querySelector('SCL')?.getAttribute('version')).to.equal(
      '2007'
    );
    expect(parent.doc?.querySelector('SCL')?.getAttribute('revision')).to.equal(
      'B'
    );
    expect(parent.doc?.querySelector('SCL')?.getAttribute('release')).to.be
      .null;
  });

  it('creates an empty Edition 1 project on wizard primary button click', async () => {
    element.run();
    await parent.updateComplete;
    await new Promise(resolve => setTimeout(resolve, 100)); // await animation
    (<HTMLElement>(
      parent.wizardUI.dialog!.querySelector('mwc-radio-list-item:nth-child(1)')
    )).click();
    await parent.updateComplete;
    (<HTMLElement>(
      parent.wizardUI.shadowRoot!.querySelector(
        'mwc-button[slot="primaryAction"]'
      )
    )).click();
    expect(parent.doc?.querySelector('Header')).to.exist;
    expect(parent.doc?.querySelector('Header')?.getAttribute('id')).to.equal(
      parent.docName.slice(0, -4)
    );
    expect(parent.doc?.querySelector('SCL')?.getAttribute('xmlns')).to.equal(
      'http://www.iec.ch/61850/2003/SCL'
    );
    expect(parent.doc?.querySelector('SCL')?.getAttribute('version')).to.be
      .null;
    expect(parent.doc?.querySelector('SCL')?.getAttribute('revision')).to.be
      .null;
    expect(parent.doc?.querySelector('SCL')?.getAttribute('release')).to.be
      .null;
  });
});
