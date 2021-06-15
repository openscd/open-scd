import { html, fixture, expect } from '@open-wc/testing';

import { OpenSCD } from '../../src/open-scd.js';
import '../../src/open-scd.js';
import { newEmptySCD } from '../../src/Editing.js';
import { invalidSCL, validSCL } from '../data.js';

describe('open-scd', () => {
  let element: OpenSCD;
  beforeEach(async () => {
    element = await fixture(html`
      <open-scd></open-scd>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons&display=block"
        rel="stylesheet"
      />
    `);
  });

  it('looks like its snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });

  it('opens the New Project Wizard on new project icon click', async () => {
    expect(element.wizardUI.dialog).to.not.exist;
    (<HTMLElement>(
      element.shadowRoot!.querySelector('div > mwc-icon-button:nth-child(1)')
    )).click();
    await element.updateComplete;
    expect(element.wizardUI.dialog).to.exist;
  });

  it('creates an empty Edition 2.1 project on wizard primary button click', async () => {
    (<HTMLElement>(
      element.shadowRoot!.querySelector('div > mwc-icon-button:nth-child(1)')
    )).click();
    await element.updateComplete;
    (<HTMLElement>(
      element.wizardUI.shadowRoot!.querySelector(
        'mwc-button[slot="primaryAction"]'
      )
    )).click();
    expect(element.doc?.querySelector('Header')).to.exist;
    expect(element.doc?.querySelector('Header')?.getAttribute('id')).to.equal(
      element.docName.slice(0, -4)
    );
    expect(element.doc?.querySelector('SCL')?.getAttribute('xmlns')).to.equal(
      'http://www.iec.ch/61850/2003/SCL'
    );
    expect(element.doc?.querySelector('SCL')?.getAttribute('version')).to.equal(
      '2007'
    );
    expect(
      element.doc?.querySelector('SCL')?.getAttribute('revision')
    ).to.equal('B');
    expect(element.doc?.querySelector('SCL')?.getAttribute('release')).to.equal(
      '4'
    );
  });

  it('creates an empty Edition 2 project on wizard primary button click', async () => {
    (<HTMLElement>(
      element.shadowRoot!.querySelector('div > mwc-icon-button:nth-child(1)')
    )).click();
    await element.updateComplete;
    (<HTMLElement>(
      element.wizardUI.dialog!.querySelector('mwc-radio-list-item:nth-child(2)')
    )).click();
    await element.updateComplete;
    (<HTMLElement>(
      element.wizardUI.shadowRoot!.querySelector(
        'mwc-button[slot="primaryAction"]'
      )
    )).click();
    expect(element.doc?.querySelector('Header')).to.exist;
    expect(element.doc?.querySelector('Header')?.getAttribute('id')).to.equal(
      element.docName.slice(0, -4)
    );
    expect(element.doc?.querySelector('SCL')?.getAttribute('xmlns')).to.equal(
      'http://www.iec.ch/61850/2003/SCL'
    );
    expect(element.doc?.querySelector('SCL')?.getAttribute('version')).to.equal(
      '2007'
    );
    expect(
      element.doc?.querySelector('SCL')?.getAttribute('revision')
    ).to.equal('B');
    expect(element.doc?.querySelector('SCL')?.getAttribute('release')).to.be
      .null;
  });

  it('creates an empty Edition 1 project on wizard primary button click', async () => {
    (<HTMLElement>(
      element.shadowRoot!.querySelector('div > mwc-icon-button:nth-child(1)')
    )).click();
    await element.updateComplete;
    (<HTMLElement>(
      element.wizardUI.dialog!.querySelector('mwc-radio-list-item:nth-child(1)')
    )).click();
    await element.updateComplete;
    (<HTMLElement>(
      element.wizardUI.shadowRoot!.querySelector(
        'mwc-button[slot="primaryAction"]'
      )
    )).click();
    expect(element.doc?.querySelector('Header')).to.exist;
    expect(element.doc?.querySelector('Header')?.getAttribute('id')).to.equal(
      element.docName.slice(0, -4)
    );
    expect(element.doc?.querySelector('SCL')?.getAttribute('xmlns')).to.equal(
      'http://www.iec.ch/61850/2003/SCL'
    );
    expect(element.doc?.querySelector('SCL')?.getAttribute('version')).to.be
      .null;
    expect(element.doc?.querySelector('SCL')?.getAttribute('revision')).to.be
      .null;
    expect(element.doc?.querySelector('SCL')?.getAttribute('release')).to.be
      .null;
  });

  it('opens the menu on navigation icon click', async () => {
    const menu = element.shadowRoot!.querySelector('mwc-drawer')!;
    expect(menu).property('open').to.be.false;
    const menuButton = <HTMLElement>(
      element.shadowRoot!.querySelector(
        'mwc-icon-button[slot="navigationIcon"]'
      )
    );
    await menuButton.click();
    expect(menu).property('open').to.be.true;
  });

  it('opens the log on log icon click', async () => {
    expect(element.logUI).to.have.property('open', false);
    await (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button[icon="rule"]')!
    )).click();
    expect(element.logUI).to.have.property('open', true);
  });

  it('opens the log on log menu entry click', async () => {
    await (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-list-item[iconid="rule"]')!
    )).click();
    expect(element.logUI).to.have.property('open', true);
  });

  it('opens the log on snackbar button click', async () => {
    expect(element.logUI).to.have.property('open', false);
    await element.errorUI.querySelector('mwc-button')!.click();
    expect(element.logUI).to.have.property('open', true);
  });

  it('renders a progress indicator on `waiting`', async () => {
    const progressBar = element.shadowRoot!.querySelector(
      'mwc-circular-progress-four-color[indeterminate]'
    );
    expect(progressBar).property('closed').to.be.true;
    element.waiting = true;
    await element.updateComplete;
    expect(progressBar).property('closed').to.be.false;
    element.waiting = false;
    await element.updateComplete;
    expect(progressBar).property('closed').to.be.true;
  });

  it('revokes `src="blob:..."` URLs after parsing', async () => {
    const emptyBlobURL = URL.createObjectURL(
      new Blob(
        [new XMLSerializer().serializeToString(newEmptySCD('id', '2007B'))],
        {
          type: 'application/xml',
        }
      )
    );
    expect(await fetch(emptyBlobURL)).to.be.ok;
    element.setAttribute('src', emptyBlobURL);
    await element.workDone;
    expect(element.src).to.be.a('string').and.equal(emptyBlobURL);
    expect(async () => await fetch(emptyBlobURL)).to.throw;
  });

  it('generates error messages for invalid SCL file', async () => {
    const invalidBlobURL = URL.createObjectURL(
      new Blob([invalidSCL], {
        type: 'application/xml',
      })
    );
    element.setAttribute('src', invalidBlobURL);
    await element.workDone;
    await element.validated;
    expect(element).property('history').to.have.length(4);
    expect(element.doc?.querySelector('Bay[name="COUPLING_BAY"]')).to.exist;
  }).timeout(10000);

  it('generates no error messages for valid SCL file', async () => {
    const validBlobURL = URL.createObjectURL(
      new Blob([validSCL], {
        type: 'application/xml',
      })
    );
    element.setAttribute('src', validBlobURL);
    await element.workDone;
    await element.validated;
  });
}).timeout(4000);
