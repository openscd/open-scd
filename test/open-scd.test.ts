import { html, fixture, expect } from '@open-wc/testing';

import { OpenSCD } from '../src/open-scd.js';
import '../src/open-scd.js';
import { newEmptySCD } from '../src/editing.js';
import { training, invalidSCL, validSCL, serialize } from './data.js';

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

  it('opens the file selection dialog on open button click', done => {
    element.fileUI.onclick = () => done();
    (<HTMLElement>(
      element.shadowRoot!.querySelector('mwc-icon-button[icon="folder_open"]')!
    )).click();
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

  it('shows a snackbar on logging an error', () => {
    expect(element.messageUI).to.have.property('open', false);
    element.error('test error');
    expect(element.messageUI).to.have.property('open', true);
  });

  it('opens the log on snackbar button click', async () => {
    expect(element.logUI).to.have.property('open', false);
    await element.messageUI.querySelector('mwc-button')!.click();
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

  it('initially edits an empty SCD document', () => {
    expect(serialize(element.doc)).to.equal(serialize(newEmptySCD()));
    expect(element).property('srcName').to.equal('untitled.scd');
  });

  it('revokes `src="blob:..."` URLs after parsing', async () => {
    const emptyBlobURL = URL.createObjectURL(
      new Blob([new XMLSerializer().serializeToString(newEmptySCD())], {
        type: 'application/xml',
      })
    );
    expect(await fetch(emptyBlobURL)).to.be.ok;
    element.setAttribute('src', emptyBlobURL);
    await element.workDone;
    expect(element.src).to.be.a('string').and.equal(emptyBlobURL);
    expect(async () => await fetch(emptyBlobURL)).to.throw;
  });

  it('generates error messages for invalid SCL file', async () => {
    const trainingBlobURL = URL.createObjectURL(
      new Blob([invalidSCL], {
        type: 'application/xml',
      })
    );
    element.setAttribute('src', trainingBlobURL);
    await element.workDone;
    expect(element).property('history').to.have.length(5);
  });

  it('generates no error messages for valid SCL file', async () => {
    const trainingBlobURL = URL.createObjectURL(
      new Blob([validSCL], {
        type: 'application/xml',
      })
    );
    element.setAttribute('src', trainingBlobURL);
    await element.workDone;
    expect(element).property('history').to.have.length(3);
  });

  it('loads and validates XML data from a `src` URL', async () => {
    element.setAttribute('srcName', 'training.scd');
    expect(element).property('waiting').to.be.false;
    expect(element).property('history').to.have.length(0);
    element.setAttribute('src', training);
    expect(element).property('waiting').to.be.true;
    await element.workDone;
    expect(element.doc.querySelector('DataTypeTemplates > DOType')).to.have.id(
      'ABBIED600_Rev1_ENC_Mod_OnTestBlock'
    );
    expect(element.doc.lastElementChild)
      .property('childElementCount')
      .to.equal(21);
    expect(element).property('history').to.have.length(27);
  }).timeout(60000);
});
