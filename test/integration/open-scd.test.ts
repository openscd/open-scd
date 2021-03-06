import { html, fixture, expect } from '@open-wc/testing';

import { OpenSCD } from '../../src/open-scd.js';
import '../../src/open-scd.js';
import { newEmptySCD } from '../../src/schemas.js';

describe('open-scd', () => {
  let element: OpenSCD;
  let invalidSCL: string;
  let validSCL: string;

  beforeEach(async () => {
    invalidSCL = await fetch('/base/test/testfiles/invalid2007B.scd').then(
      response => response.text()
    );
    validSCL = await fetch('/base/test/testfiles/valid2007B4.scd').then(
      response => response.text()
    );
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

  /* it('generates error messages for invalid SCL file', async () => {
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
  }); */
}).timeout(4000);
