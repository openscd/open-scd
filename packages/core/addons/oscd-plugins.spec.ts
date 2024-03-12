import { expect, fixture } from '@open-wc/testing';

import { html } from 'lit-element';

import { OscdPlugins } from './oscd-plugins.js';

describe('OSCD-PLUGINS', () => {
  let editor: OscdPlugins;

  beforeEach(async () => {
    editor = <OscdPlugins>await fixture(html`<oscd-plugins></oscd-plugins>`);
  });

  it('loads menu plugins', () => {
    editor.plugins = {
      menu: [
        {
          name: 'Test Menu Plugin',
          translations: { de: 'Test Menu Erweiterung' },
          src: 'data:text/javascript;charset=utf-8,export%20default%20class%20TestPlugin%20extends%20HTMLElement%20%7B%0D%0A%20%20async%20run%28%29%20%7B%0D%0A%20%20%20%20return%20true%3B%0D%0A%20%20%7D%0D%0A%7D',
          icon: 'margin',
          active: true,
          requireDoc: false,
        },
        {
          name: 'Test Menu Plugin 2',
          src: 'data:text/javascript;charset=utf-8,export%20default%20class%20TestPlugin%20extends%20HTMLElement%20%7B%0D%0A%20%20async%20run%28%29%20%7B%0D%0A%20%20%20%20return%20true%3B%0D%0A%20%20%7D%0D%0A%7D',
          icon: 'margin',
          active: true,
          requireDoc: false,
        },
      ],
    };
    expect(editor).property('plugins').property('menu').to.have.lengthOf(2);
  });

  it('loads editor plugins', () => {
    editor.plugins = {
      editor: [
        {
          name: 'Test Editor Plugin',
          translations: { de: 'Test Editor Erweiterung' },
          src: 'data:text/javascript;charset=utf-8,export%20default%20class%20TestEditorPlugin%20extends%20HTMLElement%20%7B%0D%0A%20%20constructor%20%28%29%20%7B%20super%28%29%3B%20this.innerHTML%20%3D%20%60%3Cp%3ETest%20Editor%20Plugin%3C%2Fp%3E%60%3B%20%7D%0D%0A%7D',
          icon: 'coronavirus',
          active: true,
        },
        {
          name: 'Test Editor Plugin 2',
          src: 'data:text/javascript;charset=utf-8,export%20default%20class%20TestEditorPlugin%20extends%20HTMLElement%20%7B%0D%0A%20%20constructor%20%28%29%20%7B%20super%28%29%3B%20this.innerHTML%20%3D%20%60%3Cp%3ETest%20Editor%20Plugin%3C%2Fp%3E%60%3B%20%7D%0D%0A%7D',
          icon: 'coronavirus',
          active: true,
        },
      ],
    };
    expect(editor).property('plugins').property('editor').to.have.lengthOf(2);
  });
});
