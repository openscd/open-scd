import { expect, fixture, html } from '@open-wc/testing';
import HelpPlugin from '../../../src/menu/Help.js';

import { OpenSCD } from '../../../src/open-scd.js';

describe('Help', () => {
  customElements.define('help-plugin', HelpPlugin);
  let parent: OpenSCD;
  let element: HelpPlugin;

  beforeEach(async () => {
    parent = await fixture(html`
      <open-scd><help-plugin></help-plugin></open-scd>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300&family=Roboto:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons&display=block"
        rel="stylesheet"
      />
    `);

    element = <HelpPlugin>parent.querySelector('help-plugin')!;
  });

  it('looks like its snapshot', () => {
    expect(element).shadowDom.to.equalSnapshot();
  });
});
